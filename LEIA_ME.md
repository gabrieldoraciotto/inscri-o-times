# Inscrição de Times — Como colocar no ar com Railway

## O que você vai precisar (tudo gratuito)
- Conta no Supabase (banco de dados): https://supabase.com
- Conta no GitHub (para guardar o código): https://github.com
- Sua conta já existente no Railway: https://railway.app

---

## Passo 1 — Criar o banco de dados no Supabase

1. Acesse https://supabase.com e crie uma conta
2. Clique em **New Project**, dê um nome e crie
3. Aguarde o projeto subir (1-2 minutos)
4. No menu lateral, clique em **SQL Editor**
5. Cole o conteúdo do arquivo `SETUP_SUPABASE.sql` e clique em **Run**

Agora pegue suas credenciais:
- Vá em **Settings → API**
- Copie a **Project URL** (algo como `https://xxxx.supabase.co`)
- Copie a **anon public key** (começa com `eyJ...`)

---

## Passo 2 — Subir o código no GitHub

1. Acesse https://github.com e crie uma conta (se ainda não tiver)
2. Clique em **New repository**, dê um nome (ex: `inscricao-times`), deixe Público, clique em **Create**
3. Na página do repositório, clique em **uploading an existing file**
4. Arraste todos os arquivos desta pasta (inclusive a pasta `src/`) e confirme

---

## Passo 3 — Publicar no Railway

1. Acesse https://railway.app e faça login
2. Clique em **New Project → Deploy from GitHub repo**
3. Selecione o repositório `inscricao-times`
4. Railway vai detectar o projeto automaticamente
5. Clique em **Add Variables** e adicione:
   - `VITE_SUPABASE_URL` → cole a Project URL do Supabase
   - `VITE_SUPABASE_ANON_KEY` → cole a anon key do Supabase
6. O deploy começa automaticamente

Após o deploy, vá em **Settings → Networking → Generate Domain** para gerar seu link público.

---

## Como compartilhar
Mande o link do Railway para os times se inscreverem.
Para ver todos os times, acesse o mesmo link e clique em "Times inscritos".
Você também pode ver os dados diretamente no Supabase em **Table Editor → teams**.
