import fetch from 'node-fetch'

let handler = async (m, { conn}) => {

  // 🧙‍♂️ Datos personalizables
  const namegrupo = '🌊 Dojo Oficial – Respira Código'
  const gp1 = 'https://chat.whatsapp.com/ABC123xyzGrupo'
  const namechannel = '🔥 Canal Alternativo – Técnicas del Sol'
  const channel = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N'
  const gmail = 'mailto:fedelanyt20@gmail.com'
  const github = 'https://github.com/fedelan555'
  const creador = '🧠 *FedeLanyt – Pilar del Código*'
  const imgUrl = 'https://files.catbox.moe/626sjd.jpg'
  const emojis = '🔥'

  // 📥 Descargar imagen personalizada
  const imageBuffer = await fetch(imgUrl).then(res => res.buffer())

  // 📜 Mensaje legendario
  const grupos = `
╭───〔 *⚔️ ALDEA DE CAZADORES DIGITALES* 〕───╮

🌸 *Únete al Dojo Oficial:*
🏯 ${namegrupo}
🔗 ${gp1}

🌀 Respira profundo... El código está vivo.

📡 *Canal del Sol – Alternativa segura:*
🌞 ${namechannel}
🔗 ${channel}

╭───〔 👤 CREADOR DEL ESTILO 〕───╯

${creador}
📧 Gmail: fedelanyt20@gmail.com
💻 GitHub: ${github}
`;

  // 📤 Enviar imagen + texto
  await conn.sendFile(m.chat, imageBuffer, 'tanjiro-dojo.jpg', grupos, m);

  // 🧭 Botones sagrados
  await conn.sendMessage(m.chat, {
    text: '🌟 Conecta con el maestro del código 🔗',
    footer: 'Inspirado en el alma de Tanjiro Kamado',
    templateButtons: [
      { urlButton: { displayText: '📧 Ver Gmail', url: gmail}},
      { urlButton: { displayText: '💻 Visitar GitHub', url: github}}
    ]
}, { quoted: m});

  // ✨ Reacción tipo respiración de agua
  await m.react(emojis);
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler
