-- Execute este SQL no painel do Supabase (SQL Editor)
-- https://supabase.com → seu projeto → SQL Editor

CREATE TABLE teams (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  team_name text NOT NULL,
  member_1 text NOT NULL,
  member_2 text NOT NULL,
  member_3 text NOT NULL,
  member_4 text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Permite leitura pública
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leitura pública" ON teams
  FOR SELECT USING (true);

CREATE POLICY "Inserção pública" ON teams
  FOR INSERT WITH CHECK (true);
