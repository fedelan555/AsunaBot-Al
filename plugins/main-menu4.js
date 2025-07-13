import { xpRange} from '../lib/levelling.js'

const textTanjiro = (text) => {
  const charset = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'ˣ', y: 'ʏ', z: 'ᴢ'
}
  return text.toLowerCase().split('').map(c => charset[c] || c).join('')
}

let handler = async (m, { conn}) => {
  try {
    let { exp = 0, level = 0} = global.db.data.users[m.sender]
    let { min, xp} = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let muptime = clockString(_uptime)

    let intro = `
𝐇𝐨𝐥𝐚 ${name}! 𝐒𝐨𝐲 =͟͟͞🄲ꭈׁׅo͓̽ᨰׁׅʙo͓̽tׁׅ ≼᳞ׄ

ᴀǫᴜɪ ᴛɪᴇɴᴇs ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs
╭┈ ↷
│ ✐ S𝗍ᥲrV᥆іძ-ᥴᥣᥙᑲ🪐᭄
│ ✐ ꒷ꕤ🌤️ദ ᴄᴏᴍᴀɴᴅᴏs ★
│   https://starvoid-club.vercel.app/commands
│ ✐ ꒷ꕤ🌤️ദ ᴄᴀɴᴀʟ ᴏғɪᴄɪᴀʟ ★
│   https://whatsapp.com/channel/0029Vb1AFK6HbFV9kaB3b13W
╰─────────────────

✐; 🪐→ ᴘᴀʀᴀ ᴄʀᴇᴀʀ ᴜɴ sᴜʙ-ʙᴏᴛ ᴄᴏɴ ᴛᴜ ɴᴜᴍᴇʀᴏ
ᴜᴛɪʟɪᴢᴀ *#sᴇʀʙᴏᴛ* o *#sᴇʀʙᴏᴛ --ᴄᴏᴅᴇ*
=͟͟͞🄲ꭈׁׅo͓̽ᨰׁׅʙo͓̽tׁׅ ≼᳞ׄ | Tiempo activo: ${muptime}

🌕 “Respira profundo. Lucha con honor.”
`.trim()

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/wav09n.jpg'},
      caption: intro,
      buttons: [
        {
          buttonId: '/info',
          buttonText: { displayText: '🌸 INFO DE TANJIRO'},
          type: 1
}
      ],
      viewOnce: true
}, { quoted: m})

} catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ Error al mostrar el menú de Tanjiro.', m)
}
}

handler.help = ['menu4']
handler.tags = ['main']
handler.command = ['menu4', 'menú', 'help']
handler.register = false

export default handler

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000)
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
