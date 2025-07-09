import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const handler = async (m, { conn, text}) => {
  await m.react("🎧");

  try {
    if (!text.trim()) return m.reply("🎵 *TanjiroBot* | Escribe el nombre de una canción o pega el enlace de YouTube.");

    const search = await yts(text);
    const song = search.all?.[0];
    if (!song) return m.reply("⚠️ No encontré la canción. Prueba con otro título.");

    const { title, url, thumbnail, timestamp, views, ago, author} = song;
    const thumb = (await conn.getFile(thumbnail))?.data;

    const info = `
🎶 *TanjiroBot – Modo Respiración Musical* 🌊
─────────────────────
📌 *Título:* ${title}
📌 *Duración:* ${timestamp}
📌 *Canal:* ${author.name}
📌 *Vistas:* ${views.toLocaleString()}
📌 *Publicado:* ${ago}
🔗 *Enlace:* ${url}
─────────────────────
⏳ Preparando audio en *MP3*...`;

    await conn.sendMessage(m.chat, { image: thumb, caption: info}, { quoted: m});

    const link = `https://api.vevioz.com/api/button/mp3?url=${encodeURIComponent(url)}`;
    const response = await axios.get(link);
    const matches = response.data.match(/href="(https:\/\/[^"]+\.mp3[^"]*)"/);
    const downloadUrl = matches?.[1];

    if (!downloadUrl) return m.reply("⛔ No se pudo extraer el enlace de audio. Intenta con otro video.");

    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl},
      mimetype: "audio/mpeg",
      fileName: `${title}.mp3`,
      caption: "🎧 Música descargada por *TanjiroBot*. Que tu código vibre al ritmo del alma 🌀"
}, { quoted: m});

    await m.react("✅");

} catch (error) {
    console.error("⛔ Error en play3:", error.message);
    m.reply("⚠️ Algo salió mal. Verifica el enlace o prueba de nuevo más tarde.");
}
};

handler.command = handler.help = ["play3"];
handler.tags = ["downloader"];
export default handler;
