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
- Os times do dia (2 a 4 times) são sorteados **no próprio app**, equilibrados pelo nível de cada jogador (Fraco, Médio, Bom). Não tem goleiro fixo. Os times se chamam Time 1, 2, 3 (a cor é só do colete). O app sugere quantos times pelo número de presentes: até 15 → 2 times (sem rodízio), 16 a 23 → 3, 24 ou mais → 4.
- Depois do sorteio dá para trocar jogadores de time (atrasos, substituições).
- Regra de rodízio: o Time 1 começa contra o Time 2. Quem ganha fica, mas **nenhum time joga mais de 2 seguidas**: quem chegou a 2 sai, ganhando ou perdendo. Na prática, depois do 1º jogo quem acabou de entrar sempre fica.
- Empate no 1º jogo: decidem na hora (par ou ímpar) e o app pergunta "Quem passa?".
- O confronto pode sempre ser trocado na mão antes de começar (ex.: Time 1 x Time 3).
- Não precisa de cronômetro: só começar e encerrar o jogo. As mensagens não têm o minuto do gol.
- O app **não** é para outras pessoas acompanharem ao vivo. É a ferramenta de quem organiza; o resultado vai para o grupo do WhatsApp.

## O que já existe
`index.html` é um app de uma página só (HTML, CSS e JS, sem bibliotecas) feito para o celular. Tem 4 abas:
- **Jogo:** placar grande. Toco no nome de quem fez o gol e o placar sobe. Tem gol contra, desfazer e apagar gol. Botões abrem o WhatsApp (`wa.me/?text=`) com a mensagem do gol, do placar ou do resultado já pronta. No empate do 1º jogo aparece "Quem passa?".
- **Times:** sorteio nivelado ou montagem na mão. Mostra a "força" de cada time (soma dos níveis). Também troca jogador de time, adiciona convidados e muda a cor do colete.
- **Resumo:** classificação (vitória vale 3, empate vale 1), artilheiros e jogos do dia, enviar o resumo no grupo, artilharia do mês (com envio no grupo) e encerrar o dia (vai para o histórico).
- **Elenco:** cadastro dos mensalistas (dá para colar uma lista), nível de cada um e total de gols.

Os dados ficam no `localStorage` do aparelho, na chave `rachao.placar.v1` (nome antigo, mantido de propósito para não perder dados salvos). A leitura de print com IA foi removida (não precisa de chave da API).
Para testar no computador: `.claude/launch.json` tem o servidor local "placar" (`py -m http.server 5173`), e o app abre em `http://localhost:5173/`.
É um PWA: `manifest.webmanifest` (nome, cores e ícones da pasta `icones/`) e `sw.js` (guarda o app no celular para abrir com internet ruim). Ao mudar arquivos do app, aumente a versão em `CACHE` no `sw.js`.

## Onde está publicado
- Site: **https://placar-futebas.vercel.app** (projeto `placar-futebas` na equipe `leonardo-rossin` da Vercel).
- Código: **github.com/leonardorossin/placar-futebas** (público), branch `main`.
- Para publicar uma mudança: `git commit`, `git push` e `npx.cmd --yes vercel deploy --prod --yes --scope leonardo-rossin` (a Vercel CLI já está logada neste computador).
- O conector da Vercel no Claude dá 403 para a equipe `leonardo-rossin`; use a Vercel CLI.
- O Git foi instalado pelo winget em `C:\Program Files\Git\cmd\git.exe`. O login do GitHub precisa de terminal interativo (aba do Terminal do app).

## Próximos passos
1. Ligar o GitHub à Vercel (instalar o app da Vercel no GitHub) para cada `git push` publicar sozinho.
2. **Supabase:** às vezes outra pessoa marca os jogos quando eu falto. Os dados precisam ficar na internet, com login só para quem marca (eu e mais um). Isso também serve de cópia de segurança.

Plano antigo, para mais tarde: app nativo com React Native/Expo + Supabase. Também tenho um robô de WhatsApp ("adm") que manda avisos no grupo e talvez possa postar os resultados.
