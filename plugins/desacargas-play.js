import fetch from 'node-fetch'

const fuenteTanjiro = (text) => {
  const map = {
    a:'𝖺', b:'𝖻', c:'𝖼', d:'𝖽', e:'𝖾', f:'𝖿', g:'𝗀',
    h:'𝗁', i:'𝗂', j:'𝗃', k:'𝗄', l:'𝗅', m:'𝗆', n:'𝗇',
    o:'𝗈', p:'𝗉', q:'𝗊', r:'𝗋', s:'𝗌', t:'𝗍', u:'𝗎',
    v:'𝗏', w:'𝗐', x:'𝗑', y:'𝗒', z:'𝗓'
}
  return text.toLowerCase().split('').map(c => map[c] || c).join('')
}

let handler = async (m, { conn, args, command, usedPrefix}) => {
  const texto = args.join(" ")
  if (!texto) {
    return m.reply(
      `╭─🎴「 ${fuenteTanjiro('𝖳𝖺𝗇𝗃𝗂𝗋𝗈 𝖡𝗈𝗍')} 」🎴
│ 🌙◦ ${fuenteTanjiro('Uso correcto')}:
│ 🌙◦ ${usedPrefix + command} tanjiro lofi
╰─🌸`
)
}

  await m.react('⌛')

  try {
    const res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(texto)}`)
    const json = await res.json()

    if (!json.status ||!json.result?.downloadUrl) {
      return m.reply(
        `╭─🌸「 ${fuenteTanjiro('𝖳𝖺𝗇𝗃𝗂𝗋𝗈 𝖡𝗈𝗍')} 」🌸
│ ❌ ${fuenteTanjiro('No se encontró resultado para')}: ${texto}
╰─🌸`
)
}

    const { title, artist, duration, cover, url} = json.result.metadata
    const audio = json.result.downloadUrl

    await conn.sendMessage(m.chat, {
      image: { url: cover},
      caption: `╭─🌸「 ${fuenteTanjiro('𝖬𝗎́𝗌𝗂𝖼𝖺 𝖳𝖺𝗇𝗃𝗂𝗋𝗈')} 」🌸
│ 🎵 ${fuenteTanjiro('Título')}: ${title}
│ 👤 ${fuenteTanjiro('Artista')}: ${artist}
│ ⏱️ ${fuenteTanjiro('Duración')}: ${duration}
│ 🌐 ${fuenteTanjiro('Spotify')}: ${url}
╰─🌸`
}, { quoted: m})

    await conn.sendMessage(m.chat, {
      audio: { url: audio},
      mimetype: 'audio/mp4',
      ptt: false,
      fileName: `${title}.mp3`
}, { quoted: m})

    await m.react('✅')

} catch (e) {
    console.error(e)
    return m.reply(
      `╭─🌸「 ${fuenteTanjiro('𝖳𝖺𝗇𝗃𝗂𝗋𝗈 𝖡𝗈𝗍')} 」🌸
│ ⚠️ ${fuenteTanjiro('Error al procesar la solicitud')}
│ 🌙◦ ${fuenteTanjiro('Intenta nuevamente más tarde')}
╰─🌸`
)
}
}

// 🔰 Solución para evitar “✖ Instrucción no reconocida”
handler.command = /^([.#/!])?play$/i
handler.help = ['play <nombre>']
handler.tags = ['descargas']
handler.register = true
handler.rowner = false

export default handler
