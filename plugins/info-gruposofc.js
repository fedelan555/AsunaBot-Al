const handler = async (m, { conn}) => {
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/23ebz8.jpg'}, // imagen decorativa de Tanjiro Bot
    caption: global.GruposCFC,
    buttons: [
      {
        buttonId: '#menucompleto',
        buttonText: { displayText: '🌸 MENU COMPLETO'},
        type: 1
}
    
    ],
    viewOnce: true
}, { quoted: m})
}

handler.command = /^(gruposcfc|gruposofc|grupobot)$/i
export default handler

global.GruposCFC = `
🗡️ *TANJIRO BOT — GRUPOS & COMUNIDAD*

╭─❖ Cuentas Oficiales ─╮
│
│ 🌀 *Canal GalaxyForge*
│   ➤ https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
│
│ 🌟 *Grupo Oficial*
│   ➤ https://chat.whatsapp.com/NADA_TODAVIA_XD
│
│ 🧩 *GitHub del creador*
│   ➤ https://github.com/fedelan555
│
│ 🎶 *TikTok*
│   ➤ https://www.tiktok.com/@frases_isagi
│
│ 📮 *Email*
│   ➤ fedelanyt20@gmail.com
│
│ 🎴 *Contacto directo*
│   ➤ wa.me/5491156178758
╰────────────────────────╯

🌸 *Tanjiro Bot* respira honor, estética y energía.
Unirse es como desbloquear una nueva forma de luchar.
🎩 *Powered by Fedexyz*
`
