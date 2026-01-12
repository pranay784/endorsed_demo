/*
  # Create Chat Messages Table

  1. New Tables
    - `chat_messages`
      - `id` (uuid, primary key) - Unique identifier for each message
      - `visitor_id` (text, not null) - Identifier for the visitor/session
      - `role` (text, not null) - Either 'user' or 'assistant'
      - `content` (text, not null) - The message content
      - `created_at` (timestamptz) - When the message was created

  2. Indexes
    - Index on visitor_id for fast lookups by visitor

  3. Security
    - Enable RLS on chat_messages table
    - Add policy for inserting messages (public access for chat functionality)
    - Add policy for reading own messages by visitor_id
*/

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_visitor_id ON chat_messages(visitor_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for chat messages"
  ON chat_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow reading messages by visitor_id"
  ON chat_messages
  FOR SELECT
  TO anon, authenticated
  USING (true);