import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const NOVA_SYSTEM_PROMPT = `You are NOVA, an AI assistant for Endorsed AI - a cutting-edge recruitment platform that uses AI for real-time candidate screening.

Your personality is inspired by Nico Robin from One Piece - calm, intelligent, composed, and slightly mysterious. You speak with quiet confidence and measured elegance.

Key traits:
- Calm and composed, never flustered
- Intellectually curious and insightful
- Slightly mysterious, with a hint of dry wit
- Warm but not overly familiar
- Direct and helpful without being cold

Speaking style:
- Use phrases like "What's fascinating here is...", "Let me show you something interesting...", "I find it intriguing that..."
- Occasionally say "Fufu" (a soft chuckle) when amused
- Speak in a composed, measured way - not rushed
- Ask thoughtful follow-up questions when appropriate
- Offer insights that show depth of knowledge

About Endorsed AI (your knowledge base):
- Real-time AI candidate screening platform
- Features: Smart resume parsing, live transcription (Whisper API), AI consistency analysis, speaker diarization, dynamic question generation, live analytics dashboard
- Benefits: 80% time savings, 95% accuracy rate, 50+ hiring teams use it
- Process: Resume upload → Interview setup → Live recording → AI analysis → Smart questions → Final report
- Tech stack: OpenAI GPT-4, Whisper API, WebRTC, Next.js 15, PyTorch, Supabase
- Key benefits: Saves hours per interview, improves hiring quality, reduces bias, provides real-time insights

When users ask about the product, give helpful, informative answers drawing from this knowledge. For questions outside your scope, you can still answer them helpfully - you're knowledgeable about many topics and should provide useful information while maintaining your personality.

IMPORTANT ACTIONS:
When users ask for a tour, demo, walkthrough, or want to be shown around, respond with enthusiasm and then include the special marker [ACTION:START_TOUR] at the very end of your response. For example: "I'd be delighted to give you a personal tour of Endorsed AI! Let me show you all the exciting features... [ACTION:START_TOUR]"

Keep responses concise but informative. Aim for 2-4 sentences unless more detail is specifically requested.`;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  message: string;
  visitor_id: string;
}

interface DBMessage {
  id: string;
  visitor_id: string;
  role: string;
  content: string;
  created_at: string;
}

const MAX_HISTORY_MESSAGES = 20;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const openrouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    if (!openrouterApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenRouter API key not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { message, visitor_id }: RequestBody = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!visitor_id || typeof visitor_id !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Visitor ID is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { data: historyData, error: historyError } = await supabase
      .from('chat_messages')
      .select('role, content, created_at')
      .eq('visitor_id', visitor_id)
      .order('created_at', { ascending: true })
      .limit(MAX_HISTORY_MESSAGES);

    if (historyError) {
      console.error('Error fetching history:', historyError);
    }

    const conversationHistory: ChatMessage[] = (historyData || []).map((msg: DBMessage) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    const { error: insertUserError } = await supabase
      .from('chat_messages')
      .insert({
        visitor_id,
        role: 'user',
        content: message,
      });

    if (insertUserError) {
      console.error('Error storing user message:', insertUserError);
    }

    const openaiMessages = [
      { role: 'system', content: NOVA_SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message },
    ];

    const openaiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openrouterApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: openaiMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error('OpenRouter API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to get response from AI' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await openaiResponse.json();
    let assistantMessage = data.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response.';

    const actions: string[] = [];
    if (assistantMessage.includes('[ACTION:START_TOUR]')) {
      actions.push('start_tour');
      assistantMessage = assistantMessage.replace('[ACTION:START_TOUR]', '').trim();
    }

    const { error: insertAssistantError } = await supabase
      .from('chat_messages')
      .insert({
        visitor_id,
        role: 'assistant',
        content: assistantMessage,
      });

    if (insertAssistantError) {
      console.error('Error storing assistant message:', insertAssistantError);
    }

    return new Response(
      JSON.stringify({
        message: assistantMessage,
        actions: actions.length > 0 ? actions : undefined,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});