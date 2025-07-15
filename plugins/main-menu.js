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
🪼𐅹 𝐌𝐞𝐧𝐮 𝐓𝐚𝐧𝐣𝐢𝐫𝐨𝐁𝐨𝐭 𐅹🪼
≡≡≡ 会 ≡≡≡

𝖧𝗈𝗅𝖺 ${name}, 𝖾𝗌𝗍𝖾 𝖾𝗌 𝗍𝗎 𝖻𝗈𝗍 𝖽𝖾 𝖺𝗎𝗋𝖺 𝖼𝗈𝗇𝖿𝗂𝖺𝖽𝖺:

╭──────── 🩸
│ 𝗧𝗂𝖾𝗆𝗉𝗈 𝖺𝖼𝗍𝗂𝗏𝗈: ${muptime}
│
│ 𝗖𝗋𝖾𝖺𝖽𝗈𝗋 𝗈𝖿𝗂𝖼𝗂𝖺𝗅:
│   https://wa.me/5491156178758
│ 𝖢𝗈𝗆𝗎𝗇𝗂𝖽𝖺𝖽 𝗈𝖿𝗂𝖼𝗂𝖺𝗅:
│   https://bit.ly/GalaxyForge_Unit
│ 𝖢𝖺𝗇𝖺𝗅 𝗈𝖿𝗂𝖼𝗂𝖺𝗅:
│   https://bit.ly/GalaxyForge_Canal
╰──────── 🩸

☁️ 𝗦𝗂 𝖾𝗅 𝗆𝖾𝗇𝗎 𝗇𝗈 𝖿𝗎𝗇𝖼𝗂𝗈𝗇𝖺 𝖾𝗇 𝗌𝗎𝖻𝖻𝗈𝗍𝗌, 𝗎𝗌𝖺 *#Menusub*
🧣 𝗉𝖺𝗋𝖺 𝗏𝖾𝗋 𝖼𝗈𝗆𝖺𝗇𝖽𝗈𝗌, 𝗎𝗌𝖺 *#menucompleto*
🌕 “𝖱𝖾𝗌𝗉𝗂𝗋𝖺 𝗉𝗋𝗈𝖿𝗎𝗇𝖽𝗈. 𝖫𝗎𝖼𝗁𝖺 𝖼𝗈𝗇 𝗁𝗈𝗇𝗈𝗋.”
🧣︵˚˖𓆩⌇𓆪˖˚︵🌸︵˚˖𓆩⌇𓆪˖˚︵🧣
`.trim()

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
