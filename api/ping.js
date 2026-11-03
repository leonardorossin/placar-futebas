// Cutucada diária (cron da Vercel, ver vercel.json) para o Supabase grátis não pausar
// o projeto por falta de uso. Só faz uma leitura simples; sem login não volta nenhum dado.
module.exports = async function handler(req, res) {
  try {
    const r = await fetch('https://tfxengujanfxzzrtsxyt.supabase.co/rest/v1/futebas?select=id&limit=1', {
      headers: { apikey: 'sb_publishable_YNuf1AcB_w9WQtpoJRYl5Q_EU_DmRgu' }
    });
    res.status(200).json({ ok: r.ok, status: r.status });
  } catch (e) {
    res.status(200).json({ ok: false, erro: String(e) });
  }
};
