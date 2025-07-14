import fetch from "node-fetch"
import yts from "yt-search"
import axios from "axios"

const handler = async (m, { conn, text, usedPrefix, command}) => {
  await m.react('🌀')

  if (!text.trim()) {
    return conn.reply(m.chat, "⚔ *Tanjiro Bot* | Ingresa el nombre o enlace de la canción/video que deseas buscar.", m)
}

  const search = await yts(text)
  if (!search.all.length) {
    return m.reply("❌ No se encontraron resultados para tu búsqueda. Intenta con algo diferente.")
}

  const videoInfo = search.all[0]
  const { title, thumbnail, timestamp, views, ago, url} = videoInfo
  const vistas = formatViews(views)
  const thumb = (await conn.getFile(thumbnail))?.data

  const infoMessage = `
╔════〘 *TANJIRO BOT* 〙════╗
║ *✦ Título:* ${title}
║ *✦ Duración:* ${timestamp}
║ *✦ Vistas:* ${vistas}
║ *✦ Canal:* ${videoInfo.author?.name || "Desconocido"}
║ *✦ Publicado:* ${ago}
║ *✦ Enlace:* ${url}
╚════════════════════════╝`

  const replyOptions = {
    contextInfo: {
      externalAdReply: {
        title: "⚔ 𝑻𝒂𝒏𝒋𝒊𝒓𝒐 𝑩𝒐𝒕 ⚔",
        body: "𝑵𝒐 𝒉𝒂𝒚 𝒏𝒂𝒅𝒂 𝒎á𝒔 𝒊𝒎𝒑𝒐𝒓𝒕𝒂𝒏𝒕𝒆 𝒒𝒖𝒆 𝒍𝒂 𝒇𝒂𝒎𝒊𝒍𝒊𝒂",
        mediaType: 1,
        previewType: 0,
        mediaUrl: url,
        sourceUrl: url,
        thumbnail: thumb,
        renderLargerThumbnail: true
}
}
}

  await conn.reply(m.chat, infoMessage, m, replyOptions)

  if (["play", "yta", "ytmp3"].includes(command)) {
    try {
      const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${encodeURIComponent(url)}`)
      const json = await res.json()
      if (!json.result?.url) throw new Error("⛔ No se pudo obtener el audio.")

      await conn.sendMessage(m.chat, {
        audio: { url: json.result.url},
        mimetype: "audio/mpeg",
        fileName: `${json.result.title}.mp3`
}, { quoted: m})

} catch (error) {
      console.error("❌ Error al descargar audio:", error.message)
      m.reply("⛔ Error al obtener el audio. Intenta con otro enlace o más tarde.")
}

} else if (["play2", "ytv", "ytmp4"].includes(command)) {
    const sources = [
      `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`,
      `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
      `https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`
    ]

    let success = false
    for (let source of sources) {
      try {
        const res = await fetch(source)
        const json = await res.json()
        const videoUrl = json?.result?.url || json?.data?.dl || json?.downloads?.url

        if (videoUrl) {
          await conn.sendMessage(m.chat, {
            video: { url: videoUrl},
            fileName: `${title}.mp4`,
            mimetype: "video/mp4",
            caption: "⚔ Aquí tienes tu video descargado por *Tanjiro Bot* ⚔",
            thumbnail: thumb
}, { quoted: m})
          success = true
          break
}
} catch (e) {
        console.error(`⚠ Falló fuente: ${source}`, e.message)
}
}

    if (!success) {
      return m.reply("⛔ No se encontró un enlace válido para el video. Intenta más tarde.")
}
} else {
    m.reply("❌ Comando no reconocido. Usa `play`, `yta`, `ytmp3` para audio o `play2`, `ytv`, `ytmp4` para video.")
}
}

handler.command = ["play", "play2"]
handler.help = ["play", "play2"]
handler.tags = ["downloader"]

export default handler

function formatViews(views) {
  if (typeof views!== "number") return "Desconocido"
  return views>= 1000
? (views / 1000).toFixed(1) + "k (" + views.toLocaleString() + ")"
: views.toString()
}
