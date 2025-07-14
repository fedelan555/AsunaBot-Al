const handler = async (m, { conn}) => {
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/23ebz8.jpg'}, // imagen del perfil del creador
    caption: global.CreadorTanjiro,
    buttons: [
      {
        buttonId: '#menucompleto',
        buttonText: { displayText: '🌸 MENU COMPLETO'},
        type: 1
},
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: '🎩 Contactar al Creador',
          url: 'https://wa.me/5491156178758',
          merchant_url: 'https://wa.me/5491156178758'
})
}
    ],
    viewOnce: true
}, { quoted: m})
}

handler.command = /^(creador|autor|fedexyz)$/i
export default handler

global.CreadorTanjiro = `
🗡️ *TANJIRO BOT — CREADOR OFICIAL*

╭─❖ Información de Contacto ─╮
│
│ 🎩 *Nombre:* Fedexyz
│ 📨 *Correo:* fedelanyt20@gmail.com
│ 💫 *GitHub:* https://github.com/fedelan555
│ 🎥 *TikTok:* @frases_isagi
│ 📞 *WhatsApp:* https://wa.me/5491156178758
│ 🌀 *Canal Oficial:* https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
│
╰──────────────────────────╯

🌸 *Tanjiro Bot* fue forjado con creatividad, energía y un alma digital que vibra con nobleza.

🔥 “Hasta el más débil puede encontrar fuerza si respira con convicción.”
🎴 *Powered by Fedexyz*
`
