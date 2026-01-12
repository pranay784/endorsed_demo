import { useEffect, useCallback, useRef, useState } from 'react';
import { NovaCharacter } from './NovaCharacter';
import { NovaSpeechBubble } from './NovaSpeechBubble';
import { TourHighlight } from './TourHighlight';
import { useNovaChat } from '../../hooks/useNovaChat';
import { useNovaTour } from '../../hooks/useNovaTour';
import { useNovaVoice } from '../../hooks/useNovaVoice';

export function Nova() {
  const hasAutoStartedRef = useRef(false);

  const {
    isActive: isTourActive,
    isPaused: isTourPaused,
    hasCompletedTour,
    tourMessages,
    orbPosition,
    highlightedElementId,
    isTyping: isTourTyping,
    waitingForSpeech,
    startTour,
    pauseTour,
    resumeTour,
    endTour,
    resetTourCompletion,
    onSpeechComplete,
  } = useNovaTour();

  const { speak: speakTour, stopSpeaking: stopTourSpeaking } = useNovaVoice({
    enabled: true,
    onSpeechEnd: onSpeechComplete,
  });

  const [chatActionCallback, setChatActionCallback] = useState<((action: string) => void) | undefined>();

  const { isOpen, messages, isLoading, isLoadingHistory, voiceEnabled, toggleChat, closeChat, sendMessage, setIsOpen, clearMessages, toggleVoice } = useNovaChat(chatActionCallback);

  useEffect(() => {
    setChatActionCallback(() => (action: string) => {
      if (action === 'start_tour') {
        closeChat();
        setTimeout(() => {
          startTour();
        }, 500);
      }
    });
  }, [closeChat, startTour]);

  const handleOrbClick = useCallback(() => {
    if (isTourActive) {
      if (isTourPaused) {
        resumeTour();
      } else {
        stopTourSpeaking();
        pauseTour();
      }
    } else {
      if (!isOpen) {
        clearMessages();
      }
      toggleChat();
    }
  }, [isTourActive, isTourPaused, isOpen, toggleChat, pauseTour, resumeTour, clearMessages, stopTourSpeaking]);

  const handleEndTour = useCallback(() => {
    stopTourSpeaking();
    endTour();
    closeChat();
  }, [endTour, closeChat, stopTourSpeaking]);

  const handleRestartTour = useCallback(() => {
    resetTourCompletion();
    startTour();
  }, [resetTourCompletion, startTour]);

  useEffect(() => {
    if (isTourActive && !isOpen) {
      setIsOpen(true);
    }
  }, [isTourActive, isOpen, setIsOpen]);

  useEffect(() => {
    if (!hasAutoStartedRef.current) {
      hasAutoStartedRef.current = true;
      const timer = setTimeout(() => {
        setIsOpen(true);
        startTour();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [setIsOpen, startTour]);

  const currentTourMessage = tourMessages[tourMessages.length - 1];

  useEffect(() => {
    if (isTourActive && currentTourMessage && !isTourTyping) {
      speakTour(currentTourMessage.content);
    }
  }, [isTourActive, currentTourMessage, isTourTyping, speakTour]);

  useEffect(() => {
    return () => {
      stopTourSpeaking();
    };
  }, [stopTourSpeaking]);

  return (
    <>
      <TourHighlight
        elementId={highlightedElementId}
        isActive={isTourActive}
      />

      <div className={`fixed bottom-6 right-6 z-50 ${isTourActive && orbPosition ? 'pointer-events-none' : ''}`}>
        {isTourActive ? (
          <TourBubble
            isOpen={isOpen}
            message={currentTourMessage?.content || ''}
            isTyping={isTourTyping}
            isPaused={isTourPaused}
            onClose={handleEndTour}
            onPause={() => {
              stopTourSpeaking();
              pauseTour();
            }}
            onResume={resumeTour}
            onRestart={handleRestartTour}
            hasCompleted={!isTourActive && hasCompletedTour}
          />
        ) : (
          <NovaSpeechBubble
            isOpen={isOpen}
            onClose={closeChat}
            messages={messages}
            isLoading={isLoading}
            isLoadingHistory={isLoadingHistory}
            voiceEnabled={voiceEnabled}
            onToggleVoice={toggleVoice}
            onSendMessage={sendMessage}
          />
        )}

        {(!isTourActive || !orbPosition) && (
          <NovaCharacter
            onClick={handleOrbClick}
            isOpen={isOpen}
            isSpeaking={isLoading || isTourTyping}
          />
        )}
      </div>

      {isTourActive && orbPosition && (
        <NovaCharacter
          onClick={handleOrbClick}
          isOpen={isOpen}
          isSpeaking={isTourTyping}
          tourPosition={orbPosition}
          isTourActive={isTourActive}
        />
      )}
    </>
  );
}

interface TourBubbleProps {
  isOpen: boolean;
  message: string;
  isTyping: boolean;
  isPaused: boolean;
  onClose: () => void;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
  hasCompleted: boolean;
}

function TourBubble({
  isOpen,
  message,
  isTyping,
  isPaused,
  onClose,
  onPause,
  onResume,
}: TourBubbleProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-20 right-0 w-80 animate-fadeIn">
      <div className="relative bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-900/50 border border-slate-700/50 overflow-hidden">
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-slate-800/95 border-r border-b border-slate-700/50 transform rotate-45" />

        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/30">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-teal-500 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">N</span>
            </div>
            <span className="text-sm font-medium text-slate-200">Guided Tour</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            Skip tour
          </button>
        </div>

        <div className="p-4">
          {isTyping ? (
            <div className="flex items-center gap-2 text-cyan-400">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-200 leading-relaxed">{message}</p>
          )}
        </div>

        <div className="px-4 pb-3 flex justify-end">
          <button
            onClick={isPaused ? onResume : onPause}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-colors"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  );
}
