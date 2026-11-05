-- Futebas: "vitrine" para os visitantes.
-- É uma cópia dos dados SEM os níveis dos jogadores. O app do administrador
-- atualiza essa cópia sozinho a cada mudança. O visitante só consegue LER ela.
-- A tabela "futebas" (com os níveis) continua fechada: só quem tem login lê e grava.
-- Rodar uma vez no Supabase: SQL Editor → New query → colar tudo → Run.

create table if not exists public.futebas_publico (
  id text primary key,
  dados jsonb not null,
  atualizado_em timestamptz not null default now()
);

alter table public.futebas_publico enable row level security;

-- Qualquer pessoa (visitante, sem login) pode LER a vitrine
drop policy if exists "vitrine: todos leem" on public.futebas_publico;
create policy "vitrine: todos leem" on public.futebas_publico
  for select to anon, authenticated using (true);

-- Só quem tem login (administrador) grava a vitrine
drop policy if exists "vitrine: admin cria" on public.futebas_publico;
create policy "vitrine: admin cria" on public.futebas_publico
  for insert to authenticated with check (true);

drop policy if exists "vitrine: admin atualiza" on public.futebas_publico;
create policy "vitrine: admin atualiza" on public.futebas_publico
  for update to authenticated using (true) with check (true);

grant select on public.futebas_publico to anon;
grant select, insert, update on public.futebas_publico to authenticated;

-- Visitante recebe as mudanças na hora (tempo real)
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'futebas_publico') then
    alter publication supabase_realtime add table public.futebas_publico;
  end if;
end $$;
