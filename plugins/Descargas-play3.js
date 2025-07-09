import fetch from "node-fetch";
import yts from "yt-search";
import axios from "axios";

const ddownr = {
  descargarMP3: async (url) => {
    const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=mp3&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;
    try {
      const res = await axios.get(apiUrl, {
        headers: { "User-Agent": "Mozilla/5.0"}
});

      if (!res.data?.success) throw new Error("❌ No se pudo iniciar la descarga.");

      const id = res.data.id;
      const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

      while (true) {
        const progressRes = await axios.get(progressUrl, {
          headers: { "User-Agent": "Mozilla/5.0"}
});

        if (progressRes.data?.success && progressRes.data.progress === 1000) {
          return progressRes.data.download_url;
}
        await new Promise(r => setTimeout(r, 3000)); // espera 3s antes de volver a intentar
}
} catch (error) {
      console.error("🧨 Error en descargarMP3:", error.message);
      return null;
}
}
};

const handler = async (m, { conn, text}) => {
  await m.react("🎧");

  try {
    if (!text) return m.reply("🎵 *TanjiroBot* | Escribe el nombre de una canción o pega el enlace de YouTube.");

    const res = await yts(text);
    const song = res?.all?.[0];
    if (!song) return m.reply("⚠️ No se encontró la canción. Intenta con otra búsqueda.");

    const { title, url, thumbnail, timestamp, views, ago, author} = song;
    const thumb = (await conn.getFile(thumbnail))?.data;

    const info = `
🎶 *TanjiroBot – Descarga Musical* ⚔️
─────────────────────────────
🔹 *Título:* ${title}
🔹 *Duración:* ${timestamp}
🔹 *Canal:* ${author?.name || "Desconocido"}
🔹 *Vistas:* ${views.toLocaleString()}
🔹 *Publicado:* ${ago}
🔗 *Enlace:* ${url}
─────────────────────────────
🌀 Descargando música en *MP3*...`;

    await conn.sendMessage(m.chat, { image: thumb, caption: info}, { quoted: m});

    const mp3 = await ddownr.descargarMP3(url);
    if (!mp3) return m.reply("⛔ No se pudo obtener el enlace de descarga.");

    await conn.sendMessage(m.chat, {
      audio: { url: mp3},
      mimetype: "audio/mpeg",
      fileName: `${title}.mp3`,
      caption: "🎧 Música descargada con éxito por *TanjiroBot* 🌊 Respira ritmo.",
}, { quoted: m});

    await m.react("✅");
} catch (e) {
    console.error("🔥 Error global:", e.message);
    m.reply("⚠️ Algo salió mal durante el proceso. Revisa el enlace o intenta de nuevo más tarde.");
}
};

handler.command = handler.help = ["play3"];
handler.tags = ["downloader"];
export default handler;
