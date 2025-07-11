import pkg from '@whiskeysockets/baileys'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto} = pkg
import fetch from 'node-fetch'
import { xpRange} from '../lib/levelling.js'

const tags = {
  anime: 'ANIME',
  juegos: 'JUEGOS',
  main: 'INFO',
  ia: 'IA',
  search: 'SEARCH',
  game: 'GAME',
  serbot: 'SUB BOTS',
  rpg: 'RPG',
  sticker: 'STICKER',
  group: 'GROUPS',
  nable: 'ON / OFF',
  premium: 'PREMIUM',
  downloader: 'DOWNLOAD',
  tools: 'TOOLS',
  fun: 'FUN',
  nsfw: 'NSFW',
  cmd: 'DATABASE',
  owner: 'OWNER',
  audio: 'AUDIOS',
  advanced: 'ADVANCED',
  weather: 'WEATHER',
  news: 'NEWS',
  finance: 'FINANCE',
  education: 'EDUCATION',
  health: 'HEALTH',
  entertainment: 'ENTERTAINMENT',
  sports: 'SPORTS',
  travel: 'TRAVEL',
  food: 'FOOD',
  shopping: 'SHOPPING',
  productivity: 'PRODUCTIVITY',
  social: 'SOCIAL',
  security: 'SECURITY',
  custom: 'CUSTOM'
}

let handler = async (m, { conn}) => {
  try {
    const userId = m.mentionedJid?.[0] || m.sender
    const user = global.db.data.users[userId] || {}
    const name = await conn.getName(userId)
    const mode = global.opts["self"]? "Privado": "Público"
    const totalCommands = Object.keys(global.plugins).length
    const totalreg = Object.keys(global.db.data.users).length
    const uptime = clockString(process.uptime() * 1000)
    const { exp = 0, level = 0} = user
    const { min, xp, max} = xpRange(level, global.multiplier || 1)

    const help = Object.values(global.plugins)
.filter(p =>!p.disabled)
.map(p => ({
        help: Array.isArray(p.help)? p.help: (p.help? [p.help]: []),
        tags: Array.isArray(p.tags)? p.tags: (p.tags? [p.tags]: []),
        limit: p.limit,
        premium: p.premium
}))

    let menuText = `
╭━━━❖「 🍃 𝚃𝙰𝙉𝙹𝙸𝚁𝙾 𝙱𝙾𝚃 🍃 」❖━━━╮
│ 👤 *Usuario:* @${userId.split('@')[0]}
│ ☀️ *Respira fuerte:* Nivel ${level} | XP: ${exp}
│ 🌸 *Modo actual:* ${mode}
│ ⏱️ *Tiempo activo:* ${uptime}
│ 📂 *Total de técnicas:* ${totalCommands}
│ 👫 *Cazadores conectados:* ${totalreg}
╰━━━━━━━━━━━━━━━━━━━━━━━╯

🌕 *“Aunque sientas miedo, sigue avanzando.”*${readMore}`

    for (let tag in tags) {
      const comandos = help.filter(menu => menu.tags.includes(tag))
      if (!comandos.length) continue

      menuText += `\n🍃 *${tags[tag]}* ${getTanjiroEmoji()}\n`
      menuText += comandos.map(menu =>
        menu.help.map(cmd =>
          `🔸 ${cmd}${menu.limit? ' 🌑': ''}${menu.premium? ' 🔮': ''}`
).join('\n')
).join('\n')
      menuText += `\n━━━━━━━━━━━━━━━━━━━━━━`
}

    menuText += `

🗡️ *Tanjiro Bot — humildad, coraje y protección.*
🌸 *Inspirado por Kimetsu no Yaiba.*`

    const imageUrl = [
      'https://raw.githubusercontent.com/Deylin-Eliac/Pikachu-Bot/main/src/tanjiro.jpg',
      'https://raw.githubusercontent.com/Deylin-Eliac/Pikachu-Bot/main/src/tanjiro_pose.jpg',
      'https://raw.githubusercontent.com/Deylin-Eliac/Pikachu-Bot/main/src/tanjiro_zen.jpg'
    ]
    const selectedImage = imageUrl[Math.floor(Math.random() * imageUrl.length)]
    const imageBuffer = await (await fetch(selectedImage)).buffer()
    const media = await prepareWAMessageMedia({ image: imageBuffer}, { upload: conn.waUploadToServer})

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: menuText,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true
}
}, { quoted: m})

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: '🗡️ Únete al escuadrón cazador de demonios'
}),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: 'Tanjiro Bot by Deylin'
}),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
}),
            
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
  buttons: [
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: '✐ Canal Oficial',
        url: 'https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m',
        merchant_url: 'https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m'
})
},
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: '🎯 Grupo de Soporte',
        url: 'https://chat.whatsapp.com/tu-enlace-grupo',
        merchant_url: 'https://chat.whatsapp.com/tu-enlace-grupo'
})
}
  ]
})
})
}
              ]
})
})
}
}
}, {})

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id})

} catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ Lo sentimos, ocurrió un error al cargar el menú Tanjiro.', m)
}
}

handler.help = ['menu', 'menú', 'help']
handler.tags = ['main']
handler.command = ['menú', 'menu', 'help']
handler.register = true

export default handler

// Extra Configuración
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function getTanjiroEmoji() {
  const emojis = ['🍃', '🔥', '🌊', '🗡️', '🌸']
  return emojis[Math.floor(Math.random() * emojis.length)]
}
