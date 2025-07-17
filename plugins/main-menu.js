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
│ 𝗇𝗂𝗏𝖾𝗅: ${level}
│ 𝖤𝗑𝗉: ${exp} / ${xp}
│ 𝖳𝗂𝖾𝗆𝗉𝗈 𝖺𝖼𝗍𝗂𝗏𝗈: ${muptime}
│
│ 𝗖𝗋𝖾𝖺𝖽𝗈𝗋:
│   https://wa.me/5491156178758
│ 𝖢𝗈𝗆𝗎𝗇𝗂𝖽𝖺𝖽:
│   https://bit.ly/GalaxyForge_Unit
│ 𝖢𝖺𝗇𝖺𝗅:
│   https://bit.ly/GalaxyForge_Canal
╰──────── 🩸

🌸 𝗖𝗈𝗆𝗌. 𝗋𝖺𝗉𝗂𝖽𝗈𝗌:
✦ *#menucompleto*  ➤ Todos los comandos
✦ *#ayuda*         ➤ Centro de ayuda
✦ *#perfil*        ➤ Tu info personal
✦ *#level*         ➤ Progreso de nivel
✦ *#tiempo*        ➤ Tiempo activo

🧣 “𝖫𝖺 𝖿𝗎𝖾𝗋𝗓𝖺 𝗇𝗈 𝗏𝗂𝖾𝗇𝖾 𝗌𝗈𝗅𝗈 𝖽𝖾 𝗅𝖺 𝖿𝗎𝗋𝗂𝖺… 𝗌𝗂𝗇𝗈 𝖽𝖾 𝗅𝖺 𝖽𝖾𝗍𝖾𝗋𝗆𝗂𝗇𝖺𝖼𝗂𝗈𝗇.”
🧣︵˚˖𓆩⌇𓆪˖˚︵🌸︵˚˖𓆩⌇𓆪˖˚︵🧣
`.trim()

    // 📸 Enviar imagen arriba
    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/wav09n.jpg'},
      caption: intro,
      buttons: [
        {
          buttonId: '#menucompleto',
          buttonText: { displayText: '🌸 Ver Menú Completo'},
          type: 1
}
      ],
      viewOnce: true
}, { quoted: m})

    // 🕒 Pausa breve para mantener orden visual
    await new Promise(resolve => setTimeout(resolve, 500))

    // 🎥 Enviar video debajo
    await conn.sendMessage(m.chat, {
      video: { url: 'https://files.catbox.moe/1x4jzg.mp4'},
      caption: `🎥 𝖵𝗂𝖽𝖾𝗈 𝗍𝖾𝗆𝖺𝖼𝗈: 𝖳𝖺𝗇𝗃𝗂𝗋𝗈 𝖾𝗇 𝗆𝗈𝖽𝗈 𝗌𝖾𝗋𝗂𝗈 🧣`,
      mimetype: 'video/mp4'
}, { quoted: m})

} catch (e) {
    console.error(e)
    conn.reply(m.chat, '❎ Hubo un problema al enviar el menú completo.', m)
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
