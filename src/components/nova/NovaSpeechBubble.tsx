import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useNovaVoice } from '../../hooks/useNovaVoice';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
}

interface NovaSpeechBubbleProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isLoading: boolean;
  isLoadingHistory?: boolean;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  onSendMessage: (message: string) => void;
}

export function NovaSpeechBubble({
  isOpen,
  onClose,
  messages,
  isLoading,
  isLoadingHistory,
  voiceEnabled,
  onToggleVoice,
  onSendMessage,
}: NovaSpeechBubbleProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant');

  const { isListening, isSpeaking, isSupported, startListening, stopListening, speak, stopSpeaking } = useNovaVoice({
    onTranscript: (text) => {
      setInput(text);
    },
    enabled: voiceEnabled,
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (voiceEnabled && lastAssistantMessage && !isLoading) {
      speak(lastAssistantMessage.content);
    }
  }, [lastAssistantMessage?.id, isLoading, voiceEnabled, speak]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [stopSpeaking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleVolumeClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    onToggleVoice();
  };

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
            <span className="text-sm font-medium text-slate-200">NOVA</span>
          </div>
          <div className="flex items-center gap-2">
            {isSupported && (
              <button
                onClick={handleVolumeClick}
                className={`p-1 rounded-lg transition-colors ${
                  voiceEnabled
                    ? 'text-cyan-400 hover:text-cyan-300 bg-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
                aria-label={voiceEnabled ? 'Disable voice' : 'Enable voice'}
                title={voiceEnabled ? 'Voice enabled' : 'Voice disabled'}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto space-y-3">
          {isLoadingHistory && (
            <div className="flex items-center justify-center gap-2 text-slate-400 py-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Loading conversation...</span>
            </div>
          )}

          {!isLoadingHistory && messages.length === 0 && !isLoading && (
            <p className="text-slate-400 text-sm">
              Ask me anything about Endorsed AI or any topic you're curious about...
            </p>
          )}

          {!isLoadingHistory && messages.map((message) => (
            <div key={message.id} className={message.role === 'user' ? 'mb-3' : 'mb-3'}>
              {message.role === 'user' ? (
                <>
                  <p className="text-xs text-slate-500 mb-1">You:</p>
                  <p className="text-sm text-slate-300 bg-slate-700/30 rounded-lg px-3 py-2">
                    {message.content}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-cyan-500">NOVA:</p>
                    {isSpeaking && message.id === lastAssistantMessage?.id && (
                      <span className="text-xs text-cyan-400 flex items-center gap-1">
                        <Volume2 className="w-3 h-3 animate-pulse" />
                        Speaking...
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {message.content}
                  </p>
                </>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-cyan-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-3 border-t border-slate-700/30">
          <div className="flex items-center gap-2">
            {isSupported && (
              <button
                type="button"
                onClick={handleMicClick}
                disabled={isLoading}
                className={`p-2 rounded-lg transition-all ${
                  isListening
                    ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-slate-100'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                title={isListening ? 'Listening...' : 'Voice input'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? 'Listening...' : 'Type your question...'}
              disabled={isLoading || isListening}
              className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyan-400 hover:to-blue-400 transition-all"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
