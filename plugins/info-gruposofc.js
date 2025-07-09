import fetch from 'node-fetch'

let handler = async (m, { conn}) => {

  // 🌟 Datos configurables
  const namegrupo = '🌊 Dojo Oficial – Respira Código'
  const gp1 = 'https://chat.whatsapp.com/ABC123xyzGrupo'
  const namechannel = '🔥 Canal Alternativo – Técnicas del Sol'
  const channel = 'https://chat.whatsapp.com/DEF456xyzCanal'
  const gmail = 'mailto:fedelanyt20@gmail.com'
  const github = 'https://github.com/fedelan555'
  const creador = '🧠 *FedeLanyt – Pilar del Código*'
  const catalogo = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/grupos.jpg'
  const emojis = '🌸'

  // 📜 Mensaje inspirado por Tanjiro
  const grupos = `
╭━━━〔 *📡 RESPIRACIÓN DEL GRUPO* 〕━━━╮

🌀 *Únete a la aldea tecnológica:*
🏯 *${namegrupo}*
🔗 ${gp1}

✨ Aquí el código fluye como la katana de Tanjiro.

╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

🌞 *Canal de Refuerzo Solar:*
🔥 *${namechannel}*
🔗 ${channel}

╭━━━〔 🧙‍♂️ CREADOR DEL DOJO 〕━━━╯

🧠 ${creador}
📧 Gmail: fedelanyt20@gmail.com
💻 GitHub: ${github}
`;

  // 📤 Enviar imagen + mensaje
  await conn.sendFile(m.chat, catalogo, "tanjiro-links.jpg", grupos, m);

  // 🎯 Botones épicos para conexión directa
  await conn.sendMessage(m.chat, {
    text: `🎴 Conecta con el creador y su aldea virtual 👺`,
    footer: "Respira profundo... ¡y pulsa!",
    templateButtons: [
      { urlButton: { displayText: "📧 Ver Gmail", url: gmail}},
      { urlButton: { displayText: "💻 Visitar GitHub", url: github}}
    ]
}, { quoted: m});

  // 🌸 Reacción estilo Tanjiro
  await m.react(emojis);
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler
