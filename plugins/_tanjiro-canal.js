import fetch from 'node-fetch'

const handler = async (m, { conn}) => {
  const imageUrl = 'https://files.catbox.moe/7qo46s.jpg'
  const imageBuffer = await (await fetch(imageUrl)).buffer()

  const caption = `
🌸 *Tanjiro Bot - Canal Oficial* 🌸

🗡️ Noticias, actualizaciones y respiraciones nuevas.
✨ Únete al canal oficial para no perderte nada.

🔗 Canal: https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
`.trim()

  await conn.sendMessage(m.chat, {
    image: imageBuffer,
    caption,
    buttons: [
      {
        buttonId: '.menucompleto',
        buttonText: { displayText: '🔥 Menú Completo'},
        type: 1
},
      {
        buttonId: '.owner',
        buttonText: { displayText: '👑 Creador'},
        type: 1
}
    ],
    headerType: 4
}, { quoted: m})
}

handler.command = /^canal$/i
handler.help = ['canal']
handler.tags = ['info']
handler.register = true

export default handler
