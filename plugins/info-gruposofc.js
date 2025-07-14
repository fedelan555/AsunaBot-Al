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

╭─❖ Comunidad Oficial ─╮
│
│ 🌀 *Canal Tanjiro Oficial*
│   ➤ https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
│
│ 🌟 *Grupo GalaxyForge*
│   ➤ https://chat.whatsapp.com/LINK_DE_TU_GRUPO
│
│ 🧩 *GitHub del creador*
│   ➤ https://github.com/fedelan555
│
│ 🎶 *TikTok*
│   ➤ @frases_isagi
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
