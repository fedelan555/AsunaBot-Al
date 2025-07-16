import { generateWAMessageFromContent, proto} from '@whiskeysockets/baileys'
import { xpRange} from '../lib/levelling.js'

const fuenteTanjiro = (text) => {
  const map = {
    a:'𝖺', b:'𝖻', c:'𝖼', d:'𝖽', e:'𝖾', f:'𝖿', g:'𝗀',
    h:'𝗁', i:'𝗂', j:'𝗃', k:'𝗄', l:'𝗅', m:'𝗆', n:'𝗇',
    o:'𝗈', p:'𝗉', q:'𝗊', r:'𝗋', s:'𝗌', t:'𝗍', u:'𝗎',
    v:'𝗏', w:'𝗐', x:'𝗑', y:'𝗒', z:'𝗓'
}
  return text.toLowerCase().split('').map(c => map[c] || c).join('')
}

const tags = {
  downloader: fuenteTanjiro('𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣')
}

let handler = async (m, { conn, usedPrefix: _p}) => {
  const userId = m.sender
  const user = global.db.data.users[userId] || {}
  const mode = global.opts.self? 'Privado 🔒': 'Público 🌐'
  const totalCommands = Object.keys(global.plugins).length
  const totalreg = Object.keys(global.db.data.users).length
  const uptime = clockString(process.uptime() * 1000)
  const { exp = 0, level = 0} = user
  const { xp} = xpRange(level, global.multiplier || 1)

  const help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
    help: Array.isArray(p.help)? p.help: (p.help? [p.help]: []),
    tags: Array.isArray(p.tags)? p.tags: (p.tags? [p.tags]: []),
    limit: p.limit,
    premium: p.premium
}))

  const more = String.fromCharCode(8206)
  const readMore = more.repeat(4001)

  let menuText = `
🧣︵˚𓆩⌇𓆪 ˖˚︵🌸︵˚𓆩⌇ TanjiroBot Panel ˖˚︵🌸

🌕 ${fuenteTanjiro('Datos de cazador')}
👤 ${fuenteTanjiro('Usuario')}: @${userId.split('@')[0]}
⚔️ ${fuenteTanjiro('Respiración')}: Nivel ${level} | XP: ${exp}
🗺️ ${fuenteTanjiro('Modo')}: ${mode}
⌛ ${fuenteTanjiro('Tiempo activo')}: ${uptime}
🧠 ${fuenteTanjiro('Comandos activos')}: ${totalCommands}
👥 ${fuenteTanjiro('Cazadores registrados')}: ${totalreg}

🌸 “${fuenteTanjiro('Mi corazón arde con propósito. No puedo rendirme.')}”
${readMore}`.trim()

  for (let tag in tags) {
    const comandos = help.filter(menu => menu.tags.includes(tag))
    if (!comandos.length) continue

    menuText += `\n🍃 *${tags[tag]}*\n`
    menuText += comandos.map(menu =>
      menu.help.map(cmd =>
        `🌙 ${fuenteTanjiro(cmd)}${menu.limit? ' 🌑': ''}${menu.premium? ' 🔮': ''}`
).join('\n')
).join('\n')
    menuText += `\n╰━━━━━━━━━━━━━━━━━━━🌸`
}

  const messageContent = {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
},
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({ text: menuText}),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: `${fuenteTanjiro('Tanjiro Bot')} 🌸`
}),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: true,
            mediaAttachment: {
              url: 'https://files.catbox.moe/wav09n.jpg',
              mimetype: 'image/jpeg',
              caption: fuenteTanjiro('𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 - Menú3 Visual'),
              mediaType: 1
}
}),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                  display_text: fuenteTanjiro('🌸 Menú Completo'),
                  id: `${_p}menucompleto`
})
},
              {
                name: 'cta_copy',
                buttonParamsJson: JSON.stringify({
                  display_text: fuenteTanjiro('📝 Copiar Alias'),
                  copy_code: 'Tanjiro-Bot-Oficial'
})
},
  {
    import { generateWAMessageFromContent, proto} from '@whiskeysockets/baileys'
import { xpRange} from '../lib/levelling.js'

const tags = { downloader: 'DOWNLOAD'}

let handler = async (m, { conn, usedPrefix: _p}) => {
  const userId = m.sender
  const user = global.db.data.users[userId] || {}
  const mode = global.opts.self? 'Privado 🔒': 'Público 🌐'
  const totalCommands = Object.keys(global.plugins).length
  const totalreg = Object.keys(global.db.data.users).length
  const uptime = clockString(process.uptime() * 1000)
  const { exp = 0, level = 0} = user
  const { xp} = xpRange(level, global.multiplier || 1)

  const help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
    help: Array.isArray(p.help)? p.help: (p.help? [p.help]: []),
    tags: Array.isArray(p.tags)? p.tags: (p.tags? [p.tags]: []),
    limit: p.limit,
    premium: p.premium
}))

  const more = String.fromCharCode(8206)
  const readMore = more.repeat(4001)

  let menuText = `⚔━━━━━━━━━━━━━━━━━━━━⚔

👤 *Usuario:* @${userId.split('@')[0]}
☀️ *Respiración:* Nivel ${level} | XP: ${exp}
🗺️ *Modo:* ${mode}
⌛ *Tiempo activo:* ${uptime}
📜 *Técnicas disponibles:* ${totalCommands}
👥 *Cazadores registrados:* ${totalreg}

🌸 *“Mi corazón arde con propósito. No puedo rendirme.”*${readMore}`

  for (let tag in tags) {
    const comandos = help.filter(menu => menu.tags.includes(tag))
    if (!comandos.length) continue

    menuText += `\n🍃 *${tags[tag]}*\n`
    menuText += comandos.map(menu =>
      menu.help.map(cmd =>
        `🌙 ${cmd}${menu.limit? ' 🌑': ''}${menu.premium? ' 🔮': ''}`
).join('\n')
).join('\n')
    menuText += `\n╰━━━━━━━━━━━━━━━━━━━🌸`
}

  const messageContent = {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
},
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({ text: menuText}),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: '🌊 Tanjiro Bot • Sistema Respira'
}),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
}),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                  display_text: '🌸 MENU',
                  id: `${_p}menu`
})
}
            ]
})
})
}
}
}

  const msg = generateWAMessageFromContent(m.chat, messageContent, {})
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id})
}

handler.command = ['menu3', 'help3']
handler.tags = ['main']
handler.help = ['menu3', 'help3']
handler.register = true

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
              }
