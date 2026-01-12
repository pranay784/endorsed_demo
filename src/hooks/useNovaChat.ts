import { useState, useCallback, useEffect } from 'react';
import { supabase, ChatMessage } from '../lib/supabase';
import { getVisitorId } from '../lib/visitorSession';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
}

interface ChatResponse {
  message: string;
  actions?: string[];
}

export function useNovaChat(onAction?: (action: string) => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [visitorId] = useState(() => getVisitorId());

  const loadConversationHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('visitor_id', visitorId)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) throw error;

      if (data && data.length > 0) {
        const loadedMessages: Message[] = data.map((msg: ChatMessage) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          created_at: msg.created_at,
        }));
        setMessages(loadedMessages);
      }
    } catch (error) {
      console.error('Error loading conversation history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [visitorId]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      loadConversationHistory();
    }
  }, [isOpen, messages.length, loadConversationHistory]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const toggleVoice = useCallback(() => {
    setVoiceEnabled(prev => !prev);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const optimisticUserMessage: Message = {
      id: `temp_user_${Date.now()}`,
      role: 'user',
      content,
    };

    setMessages(prev => [...prev, optimisticUserMessage]);
    setIsLoading(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nova-chat`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          visitor_id: visitorId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Edge function error:', errorData);
        throw new Error('Failed to get response from NOVA');
      }

      const data: ChatResponse = await response.json();
      const assistantContent = data.message;
      const actions = data.actions || [];

      const assistantMessage: Message = {
        id: `temp_assistant_${Date.now()}`,
        role: 'assistant',
        content: assistantContent,
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (actions.length > 0 && onAction) {
        actions.forEach(action => {
          setTimeout(() => onAction(action), 1000);
        });
      }
    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I seem to be having trouble connecting right now. Please try again in a moment.',
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [visitorId, onAction]);

  return {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    isLoadingHistory,
    voiceEnabled,
    visitorId,
    toggleChat,
    closeChat,
    clearMessages,
    sendMessage,
    toggleVoice,
    loadConversationHistory,
  };
}
