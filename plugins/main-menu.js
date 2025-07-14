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
𝐇𝐨𝐥𝐚 ${name}! s𝐨𝐲 *꒷Tanjiro_Botദ*

╭┈──●
│ ✐ ୨🌸୧˚ Tiempo activo: ${muptime}
│
│ ✐ ୨🌸୧˚ CREADOR OFC
│   https://wa.me/5491156178758
│ ✐ ୨🌸୧˚ GALAXYFORGE UNIT
│   https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
╰─────────────────●

୨🌸୧˚ PARA SER PARTE DEL BOT USA *#CODE* O *#QR*

🌕 “Respira profundo. Lucha con honor.”
`.trim()

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/wav09n.jpg'},
      caption: intro,
      buttons: [
        {
          buttonId: '#menucompleto',
          buttonText: { displayText: '🌸 MENU COMPLETO'},
          type: 1
},
        {
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: '🎩 Creador ofc',
            url: 'https://wa.me/message/KRGGIR7FESQJE1',
            merchant_url: 'https://wa.me/message/KRGGIR7FESQJE1'
})
}
      ],
      viewOnce: true
}, { quoted: m})

} catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ Error al mostrar el menú de Tanjiro.', m)
}
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']
handler.register = false

export default handler

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000)
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
