import got from "got"
import moment from "moment-timezone"

const letraTanjiro = (text) => {
  const map = {
    a:'𝖺', b:'𝖻', c:'𝖼', d:'𝖽', e:'𝖾', f:'𝖿', g:'𝗀',
    h:'𝗁', i:'𝗂', j:'𝗃', k:'𝗄', l:'𝗅', m:'𝗆', n:'𝗇',
    o:'𝗈', p:'𝗉', q:'𝗊', r:'𝗋', s:'𝗌', t:'𝗍', u:'𝗎',
    v:'𝗏', w:'𝗐', x:'𝗑', y:'𝗒', z:'𝗓'
}
  return text.toLowerCase().split('').map(l => map[l] || l).join('')
}

const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner}) => {
  const imagenTanjiro = 'https://files.catbox.moe/sbzc3p.jpg' // imagen temática Tanjiro

  const tituloMenu = `${letraTanjiro("𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅")} ⚔️ Configuración`
  const opciones = `
${tituloMenu}

🍃 *Opciones de Grupo*
${usedPrefix + command} welcome
${usedPrefix + command} autoresponder
${usedPrefix + command} autoaceptar
${usedPrefix + command} autorechazar
${usedPrefix + command} detect
${usedPrefix + command} antidelete
${usedPrefix + command} antilink
${usedPrefix + command} antilink2
${usedPrefix + command} nsfw
${usedPrefix + command} autolevelup
${usedPrefix + command} autosticker
${usedPrefix + command} reaction
${usedPrefix + command} antitoxic
${usedPrefix + command} audios
${usedPrefix + command} modoadmin
${usedPrefix + command} antifake
${usedPrefix + command} antibot

🗡️ *Opciones del Cazador Real (owner)*
${usedPrefix + command} antisubots
${usedPrefix + command} public
${usedPrefix + command} status
${usedPrefix + command} serbot
${usedPrefix + command} restrict
${usedPrefix + command} autoread
${usedPrefix + command} antispam
${usedPrefix + command} antiprivado
`.trim()

  const isEnable = /true|enable|(turn)?on|1/i.test(command)
  const chat = global.db.data.chats[m.chat]
  const bot = global.db.data.settings[conn.user.jid] || {}
  const type = (args[0] || '').toLowerCase()
  let isAll = false

  switch (type) {
    case 'welcome': case 'autoaceptar': case 'autorechazar': case 'detect':
    case 'antibot': case 'antisubots': case 'antidelete': case 'antilink':
    case 'antilink2': case 'nsfw': case 'autolevelup': case 'autosticker':
    case 'reaction': case 'antitoxic': case 'audios': case 'modoadmin':
    case 'antifake':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn)
      chat[type] = isEnable
      break

    case 'public':
      isAll = true
      if (!isROwner) return global.dfail('rowner', m, conn)
      global.opts.self =!isEnable
      break

    case 'status':
      isAll = true
      if (!isROwner) return global.dfail('rowner', m, conn)
      bot.autobio = isEnable
      break

    case 'serbot':
      isAll = true
      if (!isROwner) return global.dfail('rowner', m, conn)
      bot.jadibotmd = isEnable
      break

    case 'restrict':
      isAll = true
      if (!isOwner) return global.dfail('owner', m, conn)
      bot.restrict = isEnable
      break

    case 'autoread':
      isAll = true
      if (!isROwner) return global.dfail('rowner', m, conn)
      bot.autoread2 = isEnable
      global.opts.autoread = isEnable
      break

    case 'antispam':
      isAll = true
      if (!isOwner) return global.dfail('owner', m, conn)
      bot.antiSpam = isEnable
      break

    case 'antiprivado':
      isAll = true
      if (!isROwner) return global.dfail('rowner', m, conn)
      bot.antiPrivate = isEnable
      break

    default:
      return await conn.sendMessage(m.chat, {
        image: { url: imagenTanjiro},
        caption: opciones,
        buttons: [
          { buttonId: '#menucompleto', buttonText: { displayText: '🌸 MENÚ COMPLETO'}, type: 1}
        ],
        viewOnce: true
}, { quoted: m})
}

  conn.reply(
    m.chat,
    `⚔️ La función *${type}* se ha ${isEnable? 'activado': 'desactivado'} ${isAll? 'en todo el bot': 'en este chat'} 🌸`,
    m
)
  }
  handler.help = ['enable <opción>', 'disable <opción>']
handler.tags = ['owner', 'grupo']
handler.command = ['enable', 'disable', 'on', 'off']
export default handler
