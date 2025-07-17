import { xpRange} from '../lib/levelling.js'

const textTanjiro = (text) => {
  const charset = {
    a: '𝖺', b: '𝖻', c: '𝖼', d: '𝖽', e: '𝖾', f: '𝖿', g: '𝗀',
    h: '𝗁', i: '𝗂', j: '𝗃', k: '𝗄', l: '𝗅', m: '𝗆', n: '𝗇',
    o: '𝗈', p: '𝗉', q: '𝗊', r: '𝗋', s: '𝗌', t: '𝗍', u: '𝗎',
    v: '𝗏', w: '𝗐', x: '𝗑', y: '𝗒', z: '𝗓'
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
🧣︵˚˖𓆩⌇𓆪˖˚︵🌸︵˚˖𓆩⌇𓆪˖˚︵🧣
🪼𐅹 𝖬𝖾𝗇𝗎 𝖳𝖺𝗇𝗃𝗂𝗋𝗈𝖡𝗈𝗍 𐅹🪼
≡≡≡ 会 ≡≡≡

𝖧𝗈𝗅𝖺 ${name}, 𝖾𝗌𝗍𝖾 𝖾𝗌 𝗍𝗎 𝖻𝗈𝗍 𝖽𝖾 𝖺𝗎𝗋𝖺 𝖼𝗈𝗇𝖿𝗂𝖺𝖽𝖺:

╭──────── 🩸
│ 𝗧𝗂𝖾𝗆𝗉𝗈 𝖺𝖼𝗍𝗂𝗏𝗈: ${muptime}
│ 𝗖𝗋𝖾𝖺𝖽𝗈𝗋: 𝖳𝖺𝗇𝗃𝗂𝗋𝗈 🧣
│ https://wa.me/5491156178758
│ 𝖢𝗈𝗆𝗎𝗇𝗂𝖽𝖺𝖽:
│ https://bit.ly/GalaxyForge_Unit
│ 𝖢𝖺𝗇𝖺𝗅:
│ https://bit.ly/GalaxyForge_Canal
╰──────── 🩸

🧣 𝗉𝖺𝗋𝖺 𝗏𝖾𝗋 𝖼𝗈𝗆𝖺𝗇𝖽𝗈𝗌, 𝗎𝗌𝖺 *#menucompleto*
🌕 “𝖫𝖺 𝖿𝗎𝖾𝗋𝗓𝖺 𝖽𝖾 𝗇𝗎𝖾𝗌𝗍𝗋𝖺 𝗋𝖾𝗌𝗉𝗂𝗋𝖺𝖼𝗂𝗈𝗇 𝖾𝗌 𝗅𝖺 𝖿𝖾.”
🧣︵˚˖𓆩⌇𓆪˖˚︵🌸︵˚˖𓆩⌇𓆪˖˚︵🧣
`.trim()

    // Imagen principal del menú
    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/wav09n.jpg'},
      caption: intro,
      buttons: [
        {
          buttonId: '#menucompleto',
          buttonText: { displayText: '🌸 𝖬𝖤𝖭𝖴 𝖢𝖮𝖬𝖯𝖫𝖤𝖳𝖮'},
          type: 1
}
      ],
      viewOnce: true
}, { quoted: m})

    // Envío del video decorativo
    await conn.sendMessage(m.chat, {
      video: { url: 'https://files.catbox.moe/1x4jzg.mp4'},
      caption: `🎥 𝖵𝗂𝖽𝖾𝗈 𝗍𝖾𝗆𝖺 𝖳𝖺𝗇𝗃𝗂𝗋𝗈 🧣`,
      mimetype: 'video/mp4'
}, { quoted: m})

} catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ 𝖤𝗋𝗋𝗈𝗋 𝖺𝗅 𝗆𝗈𝗌𝗍𝗋𝖺𝗋 𝖾𝗅 𝗆𝖾𝗇𝗎.', m)
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
