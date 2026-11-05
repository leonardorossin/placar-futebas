// Sorteio nivelado para o VISITANTE, feito aqui no servidor (Vercel).
// O celular do visitante manda só "quem veio" e "quantos times"; este código lê os níveis
// no Supabase com a chave secreta e devolve só os times prontos. Os níveis nunca saem daqui.
// A chave secreta fica na variável de ambiente SUPABASE_SECRET_KEY da Vercel (nunca no código).
// É o mesmo sorteio do app: distribui por nível (Pro, Bom, Médio, Fraco) e depois faz trocas
// para deixar a força dos times o mais igual possível, com Pros e Fracos espalhados.
const crypto = require('crypto');

const SUPABASE_URL = 'https://tfxengujanfxzzrtsxyt.supabase.co';

function sorteioAleatorio(n) { return crypto.randomInt(n); }
function embaralhar(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const k = sorteioAleatorio(i + 1); [a[i], a[k]] = [a[k], a[i]]; }
  return a;
}

function sortear(ids, nivel, n) {
  const forca = (t) => t.reduce((s, id) => s + nivel[id], 0);
  const qtd = (nv) => (t) => t.filter((id) => nivel[id] === nv).length;
  function dif(times, f) { const v = times.map(f); return Math.max(...v) - Math.min(...v); }
  function nota(times) { return dif(times, forca) * 100 + dif(times, qtd(4)) * 10 + dif(times, qtd(1)); }

  const times = Array.from({ length: n }, () => []);
  const soma = times.map(() => 0);
  let ordem = [];
  [4, 3, 2, 1].forEach((nv) => { ordem = ordem.concat(embaralhar(ids.filter((id) => nivel[id] === nv))); });
  ordem.forEach((id) => {
    const i = embaralhar(times.map((t, k) => k)).sort((a, b) => times[a].length - times[b].length || soma[a] - soma[b])[0];
    times[i].push(id); soma[i] += nivel[id];
  });

  // Ajuste fino: troca jogadores de nível diferente enquanto a troca deixar tudo mais parelho
  let atual = nota(times);
  for (let volta = 0; volta < 60 && atual > 0; volta++) {
    let melhorou = false;
    const pares = [];
    times.forEach((a, i) => times.forEach((b, k) => { if (i < k) pares.push([a, b]); }));
    embaralhar(pares).forEach(([a, b]) => {
      embaralhar(a.slice()).forEach((x) => {
        embaralhar(b.slice()).forEach((y) => {
          if (melhorou || nivel[x] === nivel[y]) return;
          const ia = a.indexOf(x), ib = b.indexOf(y);
          a[ia] = y; b[ib] = x;
          const nova = nota(times);
          if (nova < atual) { atual = nova; melhorou = true; } else { a[ia] = x; b[ib] = y; }
        });
      });
    });
    if (!melhorou) break;
  }
  return times;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Use POST' });
  const chave = process.env.SUPABASE_SECRET_KEY;
  if (!chave) return res.status(503).json({ erro: 'sem-chave' });

  let corpo = req.body;
  if (typeof corpo === 'string') { try { corpo = JSON.parse(corpo); } catch (e) { corpo = {}; } }
  corpo = corpo || {};
  const n = parseInt(corpo.n, 10);
  const ids = Array.isArray(corpo.ids) ? corpo.ids.filter((x) => typeof x === 'string').slice(0, 80) : [];
  const convidados = Array.isArray(corpo.convidados)
    ? corpo.convidados.filter((x) => typeof x === 'string').map((x) => x.trim().slice(0, 40)).filter(Boolean).slice(0, 15)
    : [];
  if (!(n >= 2 && n <= 4)) return res.status(400).json({ erro: 'quantidade' });

  let dados;
  try {
    const r = await fetch(SUPABASE_URL + '/rest/v1/futebas?select=dados&id=eq.futebas', { headers: { apikey: chave } });
    if (!r.ok) return res.status(502).json({ erro: 'banco', status: r.status });
    const linhas = await r.json();
    dados = linhas[0] && linhas[0].dados;
  } catch (e) {
    return res.status(502).json({ erro: 'banco' });
  }
  if (!dados || !Array.isArray(dados.jogadores)) return res.status(502).json({ erro: 'sem-dados' });

  const nivel = {}, nome = {};
  dados.jogadores.forEach((p) => {
    if (!p || !p.id) return;
    nivel[p.id] = [1, 2, 3, 4].includes(+p.nivel) ? +p.nivel : 2;
    nome[p.id] = p.nome;
  });
  const lista = [...new Set(ids)].filter((id) => nivel[id]);
  // Convidado não tem nível guardado: entra como Médio
  convidados.forEach((c, i) => { const id = 'conv:' + i; nivel[id] = 2; nome[id] = c; lista.push(id); });
  if (lista.length < n) return res.status(400).json({ erro: 'poucos' });

  const times = sortear(lista, nivel, n);
  // Devolve só os nomes de cada time: nada de nível nem de força
  return res.status(200).json({
    times: times.map((t) => t.map((id) => ({ id: id.startsWith('conv:') ? null : id, nome: nome[id] }))),
  });
};
