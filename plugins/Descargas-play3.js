import axios from "axios";
import fetch from "node-fetch";
import yts from "yt-search";

const formatViews = (views) =>
  typeof views!== "number"
? "Desconocido"
: views>= 1000
? (views / 1000).toFixed(1) + "k (" + views.toLocaleString() + ")"
: views.toString();

const handler = async (m, { conn, text, command}) => {
  await m.react("📽️");

  try {
    if (!text.trim()) return m.reply("⚠️ *TanjiroBot* | Ingresa un título o el enlace de YouTube que deseas descargar como video.");

    // Buscar por título o procesar URL directamente
    const query = text.trim();
    const ytURLPattern = /(?:https?:\/\/)?(?:www\.)?(youtube\.com|youtu\.be)\S+/gi;
    const isYTLink = ytURLPattern.test(query);

    let videoInfo = null;
    if (isYTLink) {
      const res = await yts({ videoId: new URL(query).searchParams.get("v") || query});
      videoInfo = res || null;
} else {
      const search = await yts(query);
      if (!search.all.length) return m.reply("❌ No se encontraron resultados. Intenta con otro término.");
      videoInfo = search.all[0];
}

    if (!videoInfo?.url) return m.reply("⛔ No se pudo identificar el video. Verifica el enlace.");

    const { title, url, thumbnail, views, timestamp, ago, author} = videoInfo;
    const thumb = (await conn.getFile(thumbnail))?.data;
    const vistas = formatViews(views);

    const resumen = `
🎬 *TanjiroBot – Descarga de Video* ⚔️
─────────────────────
🎞️ *Título:* ${title}
⏱️ *Duración:* ${timestamp}
🧑‍💻 *Canal:* ${author?.name || "Desconocido"}
👁️ *Vistas:* ${vistas}
📆 *Publicado:* ${ago}
🔗 *Enlace:* ${url}
─────────────────────
⏳ *Buscando enlace de descarga...*`;

    await conn.sendMessage(m.chat, { image: thumb, caption: resumen}, { quoted: m});

    // API PRINCIPAL (oceansaver) – formato mp4 360p
    try {
      const api = `https://p.oceansaver.in/ajax/download.php?format=360&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;
      const resp = await axios.get(api, { headers: { "User-Agent": "Mozilla/5.0"}});

      if (resp.data?.success) {
        const id = resp.data.id;
        const progressURL = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;

        let downloadUrl;
        while (true) {
          const prog = await axios.get(progressURL, { headers: { "User-Agent": "Mozilla/5.0"}});
          if (prog.data?.success && prog.data.progress === 1000) {
            downloadUrl = prog.data.download_url;
            break;
}
          await new Promise((r) => setTimeout(r, 3000));
}

        if (downloadUrl) {
          return await conn.sendMessage(m.chat, {
            video: { url: downloadUrl},
            fileName: `${title}.mp4`,
            mimetype: "video/mp4",
            caption: "🎞️ Video descargado por *TanjiroBot*. Que tu conexión nunca se apague 🔥",
}, { quoted: m});
}
}
} catch (err) {
      console.error("💥 API principal falló:", err.message);
}

    // RESPALDO: ZenKey API
    try {
      const backup = await axios.get(`https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`);
      const downloadUrl = backup?.data?.result?.download?.url;

      if (downloadUrl) {
        return await conn.sendMessage(m.chat, {
          video: { url: downloadUrl},
          fileName: `${title}.mp4`,
          mimetype: "video/mp4",
          caption: "🎞️ Video descargado con fuente secundaria por *TanjiroBot*. ⚔️",
}, { quoted: m});
}
} catch (err) {
      console.error("⚠️ Backup API también falló:", err.message);
}

    return m.reply("❌ No se pudo obtener el enlace de descarga. Intenta con otro video o más tarde.");

} catch (error) {
    console.error("⛔ Error en play3 video:", error.message);
