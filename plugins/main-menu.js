let handler = async (m, { conn, args}) => {
  let userId = m.mentionedJid?.[0] || m.sender
  let user = global.db.data.users[userId]
  let name = await conn.getName(userId)
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
  let totalreg = Object.keys(global.db.data.users).length

  // Saludo estilo Tanjiro
  let hour = new Intl.DateTimeFormat('es-PE', {
    hour: 'numeric',
    hour12: false,
    timeZone: 'America/Lima'
}).format(new Date())

  let saludo = hour < 6? "🌌 Buenas madrugadas, cazador nocturno...":
               hour < 12? "🌅 Buenos días, guerrero del alba~":
               hour < 18? "🌄 Buenas tardes, espadachín solar~":
               "🌃 Buenas noches, alma errante..."

  // Texto del menú con estilo Tanjiro
  let menuText = `
╭━━❖「 🍃 TANJIRO BOT 🍃 」❖━━╮

 ｡ﾟ✧: *.${name}.*:✧ﾟ｡
> *_${saludo}_*

╰───────❖ MENU ❖───────╯

✦ 𝙸𝙽𝙵𝙾 𝙳𝙴 𝙲𝙾𝙼𝘽𝘼𝙏𝙀 ✦

🗡️ Pilar: @${userId.split('@')[0]}
📜 Respiración: Nivel ${user.level || 0} | XP ${user.exp || 0}
🕰️ Tiempo activo: ${uptime}
🌸 Cazadores conectados: ${totalreg}
⌛ Hora: ${hour}

🔥 *“No importa cuán difíciles sean los tiempos... Seguiré avanzando.”*
💖 *Hecho con honor por:* *_${global.apodo}_* y *_SoyMaycol <3_*

≪════ ⋆ Respira ⋆ ────≫

*Selecciona una técnica:*
`.trim()

  // Botones de acción al estilo Tanjiro
  let buttons = [
    { buttonId: '.code', buttonText: { displayText: '🗡️ SubBot 🗡️'}, type: 1},
    { buttonId: '.staff', buttonText: { displayText: '🌸 Staff 🌸'}, type: 1},
    { buttonId: '.menucompleto', buttonText: { displayText: '🔥 Menu Completo 🔥'}, type: 1}
  ]

  await conn.sendMessage(m.chat, {
    video: { url: global.video, gifPlayback: true},
    caption: menuText,
    gifPlayback: true,
    buttons,
    headerType: 4,
    contextInfo: {
      mentionedJid: [m.sender, userId],
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: global.canalIdM,
        newsletterName: global.botname,
        serverMessageId: -1,
},
      forwardingScore: 999,
      externalAdReply: {
        title: global.botname,
        body: "Tanjiro Bot — Respira, lucha, protege.",
        thumbnailUrl: global.banner,
        sourceUrl: global.redes,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
},
}
}, { quoted: m})
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return `${h}h ${m}m ${s}s`
}
