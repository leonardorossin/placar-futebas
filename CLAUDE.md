# Placar do Futebas

## Quem sou eu
Sou o Leo, de Piracicaba (SP). Tenho pouca experiência com código, terminal, Git e banco de dados, mas quero aprender o básico.
- Sempre responda em português do Brasil.
- Explique cada passo de forma simples, como para um iniciante.
- Antes de rodar comandos ou instalar coisas, diga o que vão fazer e por quê.

## O Futebas
- O grupo se chama **Futebas**. Em textos, telas e mensagens do app, use "Futebas", nunca "rachão" ou outro nome genérico.
- Futebol semanal com um grupo de mensalistas, com grupo no WhatsApp.
- Cada dia tem cerca de 1 hora de jogo, com 5 ou 6 partidas.
- Os times do dia (2 a 4 times) são sorteados **no próprio app**, equilibrados pelo nível de cada jogador (Fraco, Médio, Bom, Pro = 1 a 4 pontos de força). O sorteio distribui por nível e depois faz trocas para deixar a força dos times o mais igual possível, com Pros e Fracos espalhados. Não tem goleiro fixo. Os times se chamam Time 1, 2, 3 (a cor é só do colete). O app sugere quantos times pelo número de presentes: até 15 → 2 times (sem rodízio), 16 a 23 → 3, 24 ou mais → 4.
- Três tipos de jogador: **mensalistas** (no elenco, vêm marcados no sorteio), **avulsos** (no elenco com nível, jogam às vezes, vêm desmarcados no sorteio) e **convidados** (só do dia, adicionados na aba Times; podem virar mensalista ou avulso). Avulso aparece sempre com "(avulso)" depois do nome (telas, gols, mensagens, rankings). Avulsos entram na artilharia; no Resumo tem o filtro "Todos / Só mensalistas", que vale também para o que vai pro WhatsApp.
- Depois do sorteio dá para trocar jogadores de time (atrasos, substituições).
- Regra de rodízio: o Time 1 começa contra o Time 2. Quem ganha fica, mas **nenhum time joga mais de 2 seguidas**: quem chegou a 2 sai, ganhando ou perdendo. Na prática, depois do 1º jogo quem acabou de entrar sempre fica.
- Empate no 1º jogo: decidem na hora (par ou ímpar) e o app pergunta "Quem passa?".
- O confronto pode sempre ser trocado na mão antes de começar (ex.: Time 1 x Time 3).
- Não precisa de cronômetro: só começar e encerrar o jogo. As mensagens não têm o minuto do gol.
- O app **não** é para outras pessoas acompanharem ao vivo. É a ferramenta de quem organiza; o resultado vai para o grupo do WhatsApp.

## O que já existe
`index.html` é um app de uma página só (HTML, CSS e JS, sem bibliotecas) feito para o celular. Tem 5 abas:
- **Jogo:** placar grande. Toco no nome de quem fez o gol e o placar sobe. Tem gol contra, desfazer e apagar gol. Botões abrem o WhatsApp (no celular `whatsapp://send?text=`, que mostra "Enviar para…"; no computador o WhatsApp Web, e o texto também é copiado; o `wa.me` sem número não abre mais a escolha de conversa) com a mensagem do gol, do placar ou do resultado já pronta. No empate do 1º jogo aparece "Quem passa?".
- **Times:** sorteio nivelado ou montagem na mão. Mostra a "força" de cada time (soma dos níveis). Também troca jogador de time, adiciona convidados e muda a cor do colete.
- **Resumo:** classificação (vitória vale 3, empate vale 1), artilheiros e jogos do dia, enviar o resumo no grupo, artilharia do mês (com envio no grupo) e encerrar o dia (vai para o histórico). Tocar num jogo ou artilheiro abre os gols para apagar; também dá para apagar um jogo, todos os jogos de hoje ou um dia anterior.
- **Elenco:** cadastro dos mensalistas (dá para colar uma lista), nível de cada um e total de gols.
- **Futebas:** a história do grupo. Criado em 08/04/2024 em Piracicaba (SP). Estatísticas por jogador (jogos, V/E/D, aproveitamento % com vitória 3 e empate 1, gols e gols por noite; período mês/ano/tudo; ordenação; ficha ao tocar no nome; só jogos encerrados e só quem está no Elenco). Ao encerrar um jogo o app guarda a escalação em `j.elenco` (jogos antigos usam os times do dia). Uniformes por temporada (campo `temporada`; Temporada 2025 com a lista "Jogadores", nome e número da camisa; Temporada 2026 em decisão; o ano é editável; a data de quando ficou pronto não aparece). O quadro "Mensalistas" abre a lista com os nomes (sem níveis), artilheiro de cada mês e artilheiros de todos os tempos. Data, cidade e uniformes são editáveis no app (`S.sobre`, sincroniza). As fotos ficam na pasta `fotos/` (`uniforme-2025.webp`: foto da camisa, frente e costas, fundo transparente, WebP para ficar leve; `uniforme-1-molde.jpg`: molde original, abre ao tocar na foto) e são ligadas em `FOTOS_UNIF` no `index.html`, pelo número do uniforme. Foto nova = arquivo novo + entrada em `FOTOS_UNIF`.

Os dados ficam no `localStorage` do aparelho (e, com login, também no Supabase), na chave `rachao.placar.v1` (nome antigo, mantido de propósito para não perder dados salvos). A leitura de print com IA foi removida (não precisa de chave da API).
Para testar no computador: `.claude/launch.json` tem o servidor local "placar" (`py -m http.server 5173`), e o app abre em `http://localhost:5173/`.
Visual: sempre escuro, nas cores do escudo do Futebas (preto, dourado `--accent` e branco). O escudo fica em `icones/escudo.png` (topo do app e boas-vindas) e também é o ícone da tela inicial.
É um PWA: `manifest.webmanifest` (nome, cores e ícones da pasta `icones/`) e `sw.js` (guarda o app no celular para abrir com internet ruim). Ao mudar arquivos do app, aumente a versão em `CACHE` no `sw.js`.

## Onde está publicado
- Site: **https://placar-futebas.vercel.app** (projeto `placar-futebas` na equipe `leonardo-rossin` da Vercel).
- Código: **github.com/leonardorossin/placar-futebas** (público), branch `main`.
- Para publicar uma mudança: `git commit`, `git push` e `npx.cmd --yes vercel deploy --prod --yes --scope leonardo-rossin` (a Vercel CLI já está logada neste computador).
- O conector da Vercel no Claude dá 403 para a equipe `leonardo-rossin`; use a Vercel CLI.
- O Git foi instalado pelo winget em `C:\Program Files\Git\cmd\git.exe`. O login do GitHub precisa de terminal interativo (aba do Terminal do app).

## Supabase (dados na internet)
- Projeto `futebas` (região São Paulo, plano grátis): `https://tfxengujanfxzzrtsxyt.supabase.co`. A chave publishable fica no `index.html` (é pública; a segurança vem das regras RLS). A chave secret/service_role nunca entra no código nem no chat.
- Tabela `public.futebas`: uma linha só (`id = 'futebas'`) com tudo em `dados` (jsonb), o mesmo objeto do localStorage. RLS: só usuário logado (`authenticated`) lê e escreve. Realtime ligado na tabela.
- Login por e-mail e senha. Usuários são criados pelo Leo no painel (Authentication → Users); cadastro aberto deve ficar desligado.
- No app: sem login funciona só no aparelho, como antes. Com login, cada mudança sobe para a internet e os outros celulares recebem na hora. Vale quem mudou por último (`atualizadoEm`). Sem internet, guarda que tem envio pendente (`rachao.placar.nuvem`) e envia quando volta. No 1º login de um aparelho com dados diferentes, o app pergunta qual lista vale.
- `api/ping.js` + `vercel.json` (cron diário): cutuca o Supabase para o projeto grátis não pausar por falta de uso.

## Próximos passos
1. Ligar o GitHub à Vercel (instalar o app da Vercel no GitHub) para cada `git push` publicar sozinho.
2. Entrada com **Administrador** (login atual do Supabase, pode tudo) ou **Visitante** (um toque, sem senha, só visualiza, nada editável). Visitante vê só 3 abas: Futebas, Resumo e Elenco (sem os níveis). Jogo e Times ficam escondidos (decisão do Leo: os times são mandados no grupo). Plano: o app do admin grava a cada mudança uma cópia "vitrine" sem os níveis numa tabela separada (`futebas_publico`), que o visitante pode ler sem login (RLS de leitura para `anon` só nela). A tabela `futebas` continua só para logado, para os níveis não vazarem. O Leo precisa rodar um SQL no Supabase. Extra: o visitante também pode **sortear times** (para quando os organizadores faltarem): marca quem veio, sorteia nivelado e manda no WhatsApp, mas **nada é salvo** (sem jogo, sem gols, sem mexer nos times do dia). Para os níveis não chegarem ao celular do visitante, o sorteio roda no servidor: uma função da Vercel (`api/sortear.js`) lê os níveis com a chave secreta do Supabase, guardada só numa variável de ambiente da Vercel que o Leo configura no painel (nunca no código nem no chat), e devolve só os times.

Plano antigo, para mais tarde: app nativo com React Native/Expo + Supabase. Também tenho um robô de WhatsApp ("adm") que manda avisos no grupo e talvez possa postar os resultados.
