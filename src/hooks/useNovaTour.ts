import { useState, useCallback, useEffect, useRef } from 'react';
import { tourStops, tourGreeting, TourStop } from '../data/tourData';

export interface TourMessage {
  id: string;
  role: 'assistant';
  content: string;
  stopId?: string;
}

interface OrbPosition {
  x: number;
  y: number;
}

interface TourState {
  isActive: boolean;
  isPaused: boolean;
  currentStopIndex: number;
  hasCompletedTour: boolean;
}

const AUTO_ADVANCE_DELAY = 1500;
const SPEECH_BUFFER_DELAY = 500;

export function useNovaTour() {
  const [tourState, setTourState] = useState<TourState>({
    isActive: false,
    isPaused: false,
    currentStopIndex: -1,
    hasCompletedTour: false,
  });

  const [tourMessages, setTourMessages] = useState<TourMessage[]>([]);
  const [orbPosition, setOrbPosition] = useState<OrbPosition | null>(null);
  const [highlightedElementId, setHighlightedElementId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForSpeech, setWaitingForSpeech] = useState(false);

  const advanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldAdvanceAfterSpeechRef = useRef(false);

  const currentStop = tourState.currentStopIndex >= 0 && tourState.currentStopIndex < tourStops.length
    ? tourStops[tourState.currentStopIndex]
    : null;

  const totalStops = tourStops.length;
  const progress = tourState.currentStopIndex >= 0
    ? ((tourState.currentStopIndex + 1) / totalStops) * 100
    : 0;

  const calculateOrbPosition = useCallback((elementId: string, position: TourStop['position']): OrbPosition | null => {
    const element = document.getElementById(elementId);
    if (!element) return null;

    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    const orbSize = 64;
    const offset = 20;

    let x: number;
    let y: number;

    switch (position) {
      case 'left':
        x = rect.left + scrollX - orbSize - offset;
        y = rect.top + scrollY + rect.height / 2 - orbSize / 2;
        break;
      case 'right':
        x = rect.right + scrollX + offset;
        y = rect.top + scrollY + rect.height / 2 - orbSize / 2;
        break;
      case 'top':
        x = rect.left + scrollX + rect.width / 2 - orbSize / 2;
        y = rect.top + scrollY - orbSize - offset;
        break;
      case 'bottom':
        x = rect.left + scrollX + rect.width / 2 - orbSize / 2;
        y = rect.bottom + scrollY + offset;
        break;
      default:
        x = rect.right + scrollX + offset;
        y = rect.top + scrollY + rect.height / 2 - orbSize / 2;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    x = Math.max(10, Math.min(x, viewportWidth - orbSize - 10 + scrollX));
    y = Math.max(10 + scrollY, Math.min(y, scrollY + viewportHeight - orbSize - 10));

    return { x, y };
  }, []);

  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementTop = rect.top + window.scrollY;
      const targetScroll = elementTop - (viewportHeight / 2) + (rect.height / 2);

      window.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }
  }, []);

  const addTourMessage = useCallback((stop: TourStop | null, greeting?: string) => {
    setIsTyping(true);

    typingTimeoutRef.current = setTimeout(() => {
      const message: TourMessage = {
        id: `tour_${Date.now()}`,
        role: 'assistant',
        content: greeting || (stop?.explanation ?? ''),
        stopId: stop?.id,
      };

      setTourMessages(prev => [...prev, message]);
      setIsTyping(false);
    }, 800);
  }, []);

  const goToStop = useCallback((index: number) => {
    if (index < 0 || index >= tourStops.length) return;

    const stop = tourStops[index];

    scrollToElement(stop.elementId);

    setTimeout(() => {
      const newPosition = calculateOrbPosition(stop.elementId, stop.position);
      setOrbPosition(newPosition);
      setHighlightedElementId(stop.elementId);

      setTourState(prev => ({
        ...prev,
        currentStopIndex: index,
      }));

      addTourMessage(stop);
    }, 600);
  }, [calculateOrbPosition, scrollToElement, addTourMessage]);

  const advanceToNextStop = useCallback(() => {
    const currentIndex = tourState.currentStopIndex;
    const nextIndex = currentIndex + 1;

    if (nextIndex < tourStops.length) {
      goToStop(nextIndex);
    } else {
      setTourState(prev => ({
        ...prev,
        isActive: false,
        hasCompletedTour: true,
      }));
      setHighlightedElementId(null);
      setOrbPosition(null);
    }
    setWaitingForSpeech(false);
    shouldAdvanceAfterSpeechRef.current = false;
  }, [tourState.currentStopIndex, goToStop]);

  const onSpeechComplete = useCallback(() => {
    if (shouldAdvanceAfterSpeechRef.current && tourState.isActive && !tourState.isPaused) {
      setTimeout(() => {
        advanceToNextStop();
      }, SPEECH_BUFFER_DELAY);
    }
  }, [advanceToNextStop, tourState.isActive, tourState.isPaused]);

  const scheduleNextStop = useCallback(() => {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }

    const currentIndex = tourState.currentStopIndex;
    const currentStopData = tourStops[currentIndex];

    if (!currentStopData || tourState.isPaused || !tourState.isActive) return;

    advanceTimeoutRef.current = setTimeout(() => {
      setWaitingForSpeech(true);
      shouldAdvanceAfterSpeechRef.current = true;
    }, currentStopData.duration + AUTO_ADVANCE_DELAY);
  }, [tourState.currentStopIndex, tourState.isPaused, tourState.isActive]);

  useEffect(() => {
    if (tourState.isActive && !tourState.isPaused && tourState.currentStopIndex >= 0) {
      scheduleNextStop();
    }

    return () => {
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, [tourState.currentStopIndex, tourState.isActive, tourState.isPaused, scheduleNextStop]);

  const startTour = useCallback(() => {
    setTourMessages([]);
    setTourState({
      isActive: true,
      isPaused: false,
      currentStopIndex: -1,
      hasCompletedTour: false,
    });

    setIsTyping(true);

    setTimeout(() => {
      addTourMessage(null, tourGreeting);

      setTimeout(() => {
        goToStop(0);
      }, 2500);
    }, 500);
  }, [addTourMessage, goToStop]);

  const pauseTour = useCallback(() => {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }
    setTourState(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resumeTour = useCallback(() => {
    setTourState(prev => ({ ...prev, isPaused: false }));
  }, []);

  const nextStop = useCallback(() => {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }

    const nextIndex = tourState.currentStopIndex + 1;
    if (nextIndex < tourStops.length) {
      goToStop(nextIndex);
    }
  }, [tourState.currentStopIndex, goToStop]);

  const previousStop = useCallback(() => {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }

    const prevIndex = tourState.currentStopIndex - 1;
    if (prevIndex >= 0) {
      goToStop(prevIndex);
    }
  }, [tourState.currentStopIndex, goToStop]);

  const endTour = useCallback(() => {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setTourState(prev => ({
      ...prev,
      isActive: false,
      isPaused: false,
    }));
    setHighlightedElementId(null);
    setOrbPosition(null);
    setIsTyping(false);
  }, []);

  const resetTourCompletion = useCallback(() => {
    setTourState(prev => ({ ...prev, hasCompletedTour: false }));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (currentStop && tourState.isActive) {
        const newPosition = calculateOrbPosition(currentStop.elementId, currentStop.position);
        setOrbPosition(newPosition);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentStop, tourState.isActive, calculateOrbPosition]);

  return {
    isActive: tourState.isActive,
    isPaused: tourState.isPaused,
    hasCompletedTour: tourState.hasCompletedTour,
    currentStop,
    currentStopIndex: tourState.currentStopIndex,
    totalStops,
    progress,
    tourMessages,
    orbPosition,
    highlightedElementId,
    isTyping,
    waitingForSpeech,
    startTour,
    pauseTour,
    resumeTour,
    nextStop,
    previousStop,
    endTour,
    resetTourCompletion,
    goToStop,
    onSpeechComplete,
  };
}
