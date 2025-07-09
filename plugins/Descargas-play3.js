// ¡Hecho! Aquí tienes `downloader.play3.js`, un módulo exclusivo para descargar *videos de YouTube en formato MP4* usando únicamente la URL del video. Todo decorado con espíritu 🔥 _Tanjiro Bot_ 🌊⚔️:

import axios from "axios";

const handler = async (m, { conn, text}) => {
  await m.react("🎬");

  try {
    if (!text.trim()) return m.reply("📹 *TanjiroBot* | Por favor, ingresa el URL de un video de YouTube.");

    const ytUrl = text.trim();
    const validate = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(ytUrl);
    if (!validate) return m.reply("⚠️ Enlace no válido. Asegúrate de que sea un link de YouTube.");

    // Usando y2mate.mcom como fuente confiable
    const api = `https://api.vevioz.com/api/button/mp4?url=${encodeURIComponent(ytUrl)}`;
    const response = await axios.get(api);

    const match = response.data.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/);
    const downloadUrl = match?.[1];

    if (!downloadUrl) return m.reply("⛔ No se pudo obtener el enlace de descarga para el video.");

    await conn.sendMessage(m.chat, {
      video: { url: downloadUrl},
      fileName: "video_tanjiro.mp4",
      mimetype: "video/mp4",
      caption: "🎞️ Video descargado con éxito por *TanjiroBot*. ¡Respira y disfruta el ritmo visual! 🔥"
}, { quoted: m});

    await m.react("✅");

} catch (e) {
    console.error("❌ Error en play3 video:", e.message);
    return m.reply("⚠️ Ocurrió un error al intentar descargar el video. Intenta con otro enlace.");
}
};

handler.command = handler.help = ["play3"];
handler.tags = ["downloader"];
export default handler;
