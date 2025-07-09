// ¡Excelente trabajo con ese módulo! Ahora, aquí tienes una variante llamada `downloader.play3.js`, optimizada y enfocada únicamente en *descargar música en MP3*, sin soporte para video. Todo decorado con energía Tanjiro 🔥🌸🗡️

import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const handler = async (m, { conn, text, command}) => {
  await m.react('🎶');

  try {
    if (!text.trim()) {
      return m.reply("⚠️ *TanjiroBot* | Escribe el nombre de una canción o pega un enlace de YouTube.");
}

    const search = await yts(text);
    if (!search.all.length) {
      return m.reply("❌ No encontré ninguna canción. Prueba con otro título.");
}

    const song = search.all[0];
    const { title, url, timestamp, views, thumbnail, ago, author} = song;
    const thumb = (await conn.getFile(thumbnail))?.data;

    const msg = `
🎵 *Tanjiro Descargador – Modo Respira Sonido* 🎧
─────────────────────
🔸 *Título:* ${title}
🔸 *Duración:* ${timestamp}
🔸 *Canal:* ${author?.name || "Desconocido"}
🔸 *Vistas:* ${views.toLocaleString()}
🔸 *Publicado:* ${ago}
🔗 *URL:* ${url}
─────────────────────
🔁 Descargando en *MP3*...`;

    await conn.sendMessage(m.chat, { image: thumb, caption: msg}, { quoted: m});

    const { downloadUrl} = await descargarAudioTanjiro(url);
    if (!downloadUrl) return m.reply("⛔ No se pudo obtener el enlace de descarga.");

    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl},
      mimetype: "audio/mpeg",
      fileName: `${title}.mp3`,
      caption: "🎧 Aquí está tu canción lista para invocar la respiración musical 🌀",
}, { quoted: m});

} catch (err) {
    console.error("⛔ Error en downloader.play3.js:", err);
    m.reply("⚠️ Ocurrió un error inesperado al procesar tu solicitud.");
}
};

async function descargarAudioTanjiro(url) {
  try {
    const api = `https://p.oceansaver.in/ajax/download.php?format=mp3&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;
    const headers = {
      "User-Agent": "Mozilla/5.0"
};

    const resp = await axios.get(api, { headers});
    if (!resp.data?.success) throw "❌ No se pudo iniciar la descarga";

    const progress = await esperarProgreso(resp.data.id);
    return { downloadUrl: progress};
} catch (e) {
    console.error("❌ Error en descargarAudioTanjiro:", e);
    return {};
}
}

async function esperarProgreso(id) {
  const url = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;
  const headers = { "User-Agent": "Mozilla/5.0"};

  while (true) {
    const res = await axios.get(url, { headers});
    if (res.data?.success && res.data.progress === 1000) {
      return res.data.download_url;
}
    await new Promise(r => setTimeout(r, 3000));
}
}

handler.command = handler.help = ["play3"];
handler.tags = ["downloader"];
export default handler;
