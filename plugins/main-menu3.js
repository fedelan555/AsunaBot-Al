import { xpRange} from '../lib/levelling.js'

let handler = async (m, { conn}) => {
  let userId = m.sender
  let user = global.db.data.users[userId] || {}
  let name = await conn.getName(userId)
  let { exp = 0, level = 0} = user
  let { min, xp, max} = xpRange(level, global.multiplier)
  let uptime = clockString(process.uptime() * 1000)
  let totalreg = Object.keys(global.db.data.users).length
  let mode = global.opts.self? "Privado": "Público"
  let hour = new Date().getHours()

  // Saludos temáticos por hora
  let saludos = {
    madrugada: ["🌙 Buenas madrugadas, alma nocturna...", "🌌 La noche abraza tu espíritu..."],
    mañana: ["🌅 Buenos días, espíritu radiante~", "☀️ La luz matutina te saluda~"],
    tarde: ["🌄 Buenas tardes, viajero astral~", "🍃 La tarde susurra tu nombre~"],
    noche: ["🌃 Buenas noches, guardián de secretos~", "🔮 Bajo el velo de la oscuridad~"]
}
  let periodo = hour < 6? 'madrugada': hour < 12? 'mañana': hour < 18? 'tarde': 'noche'
  let saludo = saludos[periodo][Math.floor(Math.random() * saludos[periodo].length)]

  let rango = level <= 5? "🌱 Novato":
              level <= 15? "🌊 Discípulo de Urokodaki":
              level <= 25? "🔥 Cazador Avanzado":
              "☀️ Hashira del Sol"

  // Mensajes de espera mágicos
  let frasesEspera = [
    '⌜ ⊹ Espera tantito, espíritu curioso... ⊹ ⌟',
    '🌸 Los pilares están preparando tu menú...',
    '✨ Invocando energía espiritual...'
  ]
  let mensajeEspera = frasesEspera[Math.floor(Math.random() * frasesEspera.length)]

  // Comandos por categoría
  let categories = {}
  for (let plugin of Object.values(global.plugins)) {
    if (!plugin.help ||!plugin.tags) continue
    for (let tag of plugin.tags) {
      if (!categories[tag]) categories[tag] = []
      categories[tag].push(...plugin.help.map(cmd => `➤ ${cmd}`))
}
}

  // Emojis por categoría
  let emojis = {
    anime: '🌸', rpg: '🗡️', ia: '🧠', fun: '🎭', sticker: '✨', owner: '👑',
    group: '👥', premium: '🔮', tools: '🔧', downloader: '📥', cmd: '📂'
}
  let emojiRandom = () => ['⭐', '🍃', '🌟', '🌕'][Math.floor(Math.random() * 4)]

  // Construcción del texto del menú
  let menuText = `
╭━━❖「 🍃 TANJIRO BOT 🍃 」❖━━╮

｡ﾟ✧: *${name}*:✧ﾟ｡
> *_${saludo}_*

╰───────❖ INFORMACIÓN ❖───────╯

🗡️ Pilar: @${userId.split('@')[0]}
📜 Respiración: Nivel ${level} | XP: ${exp}/${xp}
📛 Título: ${rango}
🌙 Modo: ${mode}
👥 Cazadores conectados: ${totalreg}
⏳ Tiempo activo: ${uptime}
🕰️ Hora actual: ${hour}:00

🌕 *“No importa cuán difícil sea… sigo adelante.”*

≪════ ⋆ Técnicas ⋆ ────≫
`.trim()

  let categoryText = Object.entries(categories)
.map(([tag, cmds]) => {
      let emoji = emojis[tag] || emojiRandom()
      let tagName = tag.toUpperCase().replace(/_/g, ' ')
      return `
╭━ ${emoji} ${tagName} ${emoji} ━╮
${cmds.map(cmd => `┃ ${cmd}`).join('\n')}
╰━━━━━━━━━━━━━━╯`
}).join('\n\n')

  // Enviar mensaje de espera
  await conn.reply(m.chat, mensajeEspera, m)

  // Enviar video/gif con el menú
  await conn.sendMessage(m.chat, {
    video: { url: global.video2},
    caption: menuText + '\n\n' + categoryText,
    gifPlayback: true,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: global.botname,
        body: 'Tanjiro Bot — Respira, lucha, protege.',
        thumbnailUrl: global.banner2 || 'https://files.catbox.moe/l8ohvs.jpeg',
        sourceUrl: global.channel || 'https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R',
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
}
}
}, { quoted: m})

  // Imagen fija estilo Tanjiro
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/7qo46s.jpg'},
    caption: '🍃 _Que el aliento del sol guíe tu camino._ ',
    contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 777,
      isForwarded: true
}
}, { quoted: m})
}

handler.help = ['menu3']
handler.tags = ['main']
handler.command = ['menu3', 'menú2', 'help', 'ayuda']
handler.register = true
export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return `${h}h ${m}m ${s}s`
}!
