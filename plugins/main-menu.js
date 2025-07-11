import pkg from '@whiskeysockets/baileys'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto} = pkg
import fetch from 'node-fetch'
import { xpRange} from '../lib/levelling.js'


const tags = {
  anime: '🎌 ARTE ANIMADO',
  juegos: '🎮 JUEGOS DE COMBATE',
  main: '📜 INFORMACIÓN DEL DOJO',
  ia: '🧠 RESPIRACIÓN NEURAL',
  search: '🔍 BÚSQUEDA DE CONOCIMIENTO',
  game: '🕹️ MINI BATALLAS',
  serbot: '🤖 CLONES TANJIRO',
  rpg: '⚔️ MODO RPG',
  sticker: '🖼️ CREACIÓN DE SELLOS',
  group: '👥 CONTROL DEL DOJO',
  nable: '🎚️ ACTIVAR / DESACTIVAR',
  premium: '💎 ACCESO PREMIUM',
  downloader: '📥 DESCARGAS',
  tools: '🛠️ HERRAMIENTAS DEL CAZADOR',
  fun: '🎭 MOMENTOS DIVERTIDOS',
  nsfw: '🔞 ZONA OCULTA',
  cmd: '📂 BASE DE DATOS',
  owner: '👑 CREADOR DEL BOT',
  audio: '🔊 AUDIO RESPIRADO',
  advanced: '🧬 SISTEMA AVANZADO',
  weather: '🌦️ ESTADO DEL CLIMA',
  news: '📰 MENSAJES DEL MUNDO',
  finance: '💰 FINANZAS Y MONEDAS',
  education: '🏫 EDUCACIÓN Y SABER',
  health: '🩺 SALUD DEL CAZADOR',
  entertainment: '🎉 ENTRETENIMIENTO',
  sports: '⚽ DEPORTES',
  travel: '🛫 VIAJES',
  food: '🍱 GASTRONOMÍA',
  shopping: '🛒 COMPRAS',
  productivity: '📈 PRODUCTIVIDAD',
  social: '🌐 REDES SOCIALES',
  security: '🛡️ SEGURIDAD',
  custom: '✨ COMANDOS PERSONALIZADOS'
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

    let menuText = ` ⚔━━━━━━━━━━━━━━━━━━━━⚔
╭━ 🍃 TANJIRO - BOT ☀️━━
│ 👤 *Usuario:* @${userId.split('@')[0]}
│ ☀️ *Respiración:* Nivel ${level} | XP: ${exp}
│ 🗺️ *Modo:* ${mode}
│ ⌛ *Tiempo activo:* ${uptime}
│ 📜 *Técnicas disponibles:* ${totalCommands}
│ 👥 *Cazadores registrados:* ${totalreg}
╰━━━━━━━━━━━━━━━━━━━━

🌸 *“Mi corazón arde con propósito. No puedo rendirme.”*${readMore}`

    for (let tag in tags) {
      const comandos = help.filter(menu => menu.tags.includes(tag))
      if (!comandos.length) continue

      menuText += `\n🍃 *${tags[tag]}* ${getTanjiroEmoji()}\n`
      menuText += comandos.map(menu =>
        menu.help.map(cmd =>
          `🌙 ${cmd}${menu.limit? ' 🌑': ''}${menu.premium? ' 🔮': ''}`
).join('\n')
).join('\n')
      menuText += `\n╰━━━━━━━━━━━━━━━━━━━🌸`
}

    menuText += `

🌕 *Tanjiro Bot - Inspirado por la llama de la voluntad.*
🗡️ *Respira. Lucha. Protege.*`

    
// Imagen fija para el menú Tanjiro
const imageUrl = 'https://files.catbox.moe/7qo46s.jpg'
const imageBuffer = await (await fetch(imageUrl)).buffer()
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
              text: '🌸 Escoge tu camino como cazador de demonios'
}),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '🌸 Tanjiro Bot ⚙'
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
                    url: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N',
                    merchant_url: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N'
})
},
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: '🎩 Creador ofc',
                    url: 'https://wa.me/message/KRGGIR7FESQJE1',
                    merchant_url: 'https://wa.me/message/KRGGIR7FESQJE1'
})
},
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: '🎯 GP de Soporte',
                    url: 'https://chat.whatsapp.com/tu-enlace-grupo',
                    merchant_url: 'https://chat.whatsapp.com/tu-enlace-grupo'
})
},                   
              ]
})
})
}
}
}, {})

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id})

} catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ Lo sentimos, ocurrió un error en el menú Tanjiro.', m)
}
}

handler.help = ['menu', 'menu', 'help']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']
handler.register = true

export default handler

// Extras
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function getTanjiroEmoji() {
  const emojis = ['🍃', '🔥', '🌊', '🗡️', '🌸', '☀️']
  return emojis[Math.floor(Math.random() * emojis.length)]
                                                                  }
