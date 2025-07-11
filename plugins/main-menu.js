import { xpRange} from '../lib/levelling.js'

let handler = async (m, { conn}) => {
  let userId = m.sender
  let user = global.db.data.users[userId] || {}
  let name = await conn.getName(userId)
  let { exp = 0, level = 0} = user
  let { min, xp, max} = xpRange(level, global.multiplier)
  let muptime = clockString(process.uptime() * 1000)
  let totalreg = Object.keys(global.db.data.users).length
  let mode = global.opts.self? "Privado": "Público"

  let hour = new Date().getHours()
  let saludo = hour < 6? "🌌 Buenas madrugadas, cazador nocturno...":
               hour < 12? "🌅 Buenos días, guerrero del alba~":
               hour < 18? "🌄 Buenas tardes, espadachín solar~":
               "🌃 Buenas noches, alma errante..."

  let rango = level <= 5? "🌱 Novato":
              level <= 15? "🌊 Discípulo de Urokodaki":
              level <= 25? "🔥 Cazador Avanzado":
              "☀️ Hashira del Sol"

  let menuText = `
╭━━❖「 🍃 𝚃𝙰𝙉𝙹𝙸𝚁𝙾 𝙱𝙾𝚃 🍃 」❖━━╮

｡ﾟ✧: *${name}*:✧ﾟ｡
> *_${saludo}_*

╰───────❖ MENÚ ❖───────╯

✦ 𝙸𝙽𝙵𝙾 𝙳𝙴 𝙲𝙾𝙼𝘽𝘼𝙏𝙀 ✦

🗡️ Pilar: @${userId.split('@')[0]}
📜 Respiración: Nivel ${level} | XP: ${exp}/${xp}
📛 Título: ${rango}
🕰️ Tiempo activo: ${muptime}
🌸 Cazadores conectados: ${totalreg}
⌛ Hora actual: ${hour}:00
🌐 Modo: ${mode}

🔥 *“No importa cuán difíciles sean los tiempos... seguiré adelante.”*
💖 *Forjado por:* *_${global.apodo}_* y *_SoyMaycol <3_*

≪════ ⋆ Respira ⋆ ────≫

*Selecciona una técnica:*
`.trim()

  let buttons = [
    { buttonId: '.code', buttonText: { displayText: '🗡️ SubBot 🗡️'}, type: 1},
    { buttonId: '.staff', buttonText: { displayText: '🌸 Staff 🌸'}, type: 1},
    { buttonId: '.menucompleto', buttonText: { displayText: '🔥 Menú Completo 🔥'}, type: 1}
  ]

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/7qo46s.jpg'},
    caption: menuText,
    buttons,
    headerType: 4,
    contextInfo: {
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        title: global.botname,
        body: "Tanjiro Bot — Respira, lucha, protege.",
        thumbnailUrl: global.banner,
        sourceUrl: global.redes,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
}
}
}, { quoted: m})
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
