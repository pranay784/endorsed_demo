import { useState, useEffect, useCallback, useRef } from 'react';

interface UseNovaVoiceProps {
  onTranscript?: (text: string) => void;
  onSpeechEnd?: () => void;
  enabled?: boolean;
}

export function useNovaVoice({ onTranscript, onSpeechEnd, enabled = true }: UseNovaVoiceProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const onSpeechEndRef = useRef(onSpeechEnd);

  useEffect(() => {
    onSpeechEndRef.current = onSpeechEnd;
  }, [onSpeechEnd]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;

    setIsSupported(!!SpeechRecognition && !!speechSynthesis);

    if (SpeechRecognition && enabled && onTranscript) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    if (speechSynthesis) {
      synthRef.current = speechSynthesis;

      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
          setVoicesLoaded(true);
        }
      };

      loadVoices();

      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [onTranscript, enabled]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  const speak = useCallback((text: string) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 0.85;
    utterance.volume = 1.0;

    const voices = synthRef.current.getVoices();

    if (voices.length > 0) {
      const preferredVoice = voices.find(voice =>
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Serena') ||
        voice.name.includes('Ava') ||
        (voice.name.includes('Google UK English Female')) ||
        (voice.name.includes('Google US English') && voice.name.includes('Female')) ||
        voice.name.includes('Microsoft Zira') ||
        voice.name.includes('Karen')
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      } else {
        const femaleVoice = voices.find(v =>
          v.lang.startsWith('en') && v.name.toLowerCase().includes('female')
        );
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        } else {
          const englishVoice = voices.find(v => v.lang.startsWith('en'));
          if (englishVoice) {
            utterance.voice = englishVoice;
          }
        }
      }
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onSpeechEndRef.current) {
        onSpeechEndRef.current();
      }
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      if (onSpeechEndRef.current) {
        onSpeechEndRef.current();
      }
    };

    synthRef.current.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isListening,
    isSpeaking,
    isSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
}
