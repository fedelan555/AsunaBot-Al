import { xpRange} from '../lib/levelling.js'

let handler = async (m, { conn}) => {
  try {
    let userId = m.sender
    let user = global.db.data.users[userId] || {}
    let name = await conn.getName(userId)
    let { exp = 0, level = 0} = user
    let { min, xp, max} = xpRange(level, global.multiplier)
    let muptime = clockString(process.uptime() * 1000)
    let totalreg = Object.keys(global.db.data.users).length
    let mode = global.opts["self"]? "Privado": "Público"

    let menuText = `
👤 Usuario: *${name}*
⚔ Nivel: ${level}
💥 Exp: ${exp}/${xp}
🌙 Modo: ${mode}
👥 Usuarios: ${totalreg}
⏳ Activo: ${muptime}
`.trim()

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/7qo46s.jpg'},
      caption: menuText,
      buttons: [
          { buttonId: `${_p}owner`, buttonText: { displayText: '👑 CREADOR' }, type: 1 },
      ],
      headerType: 4,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true
}
}, { quoted: m})

} catch (e) {
    console.error(e)
    conn.reply(m.chat, '⚔ Ha ocurrido un error al mostrar el menú.', m)
}
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']
handler.register = true

export default handler

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000)
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
