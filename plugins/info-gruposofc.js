// nueva versión de gruposcfc.js

import fetch from 'node-fetch'

let handler = async (m, { conn}) => {

  // 🌊 Configuración Tanjiresca
  const namegrupo = '🌸 Dojo Oficial – Respira Código'
  const gp1 = 'https://chat.whatsapp.com/ABC123xyzGrupo'
  const namechannel = '🔥 Canal Alternativo – Técnicas del Sol'
  const channel = 'https://chat.whatsapp.com/DEF456xyzCanal'
  const dev = '🗡️ Forjado por *FedeLanyt – Pilar del Código*'
  const catalogo = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/grupos.jpg'
  const emojis = '🌪️'

  // 📜 Mensaje con energía de cazador
  const grupos = `
╭─── 〔 *🌊 RESPIRACIÓN DEL CÓDIGO* 〕 ───╮

🌀 *Únete a nuestro dojo de cazadores:*
👺 *${namegrupo}*
🔗 ${gp1}

✨ Aprende, crece y lucha con tu teclado como tu espada 🗡️

╭───────〔 ☀ ALTERNATIVA DEL SOL ☀ 〕──────╯

🔥 *Si la niebla oculta el enlace principal:*
🌞 *${namechannel}*
🔗 ${channel}

╭───────〔 ⚒ SOPORTE TANJIRO 〕──────╯
${dev}
`;

  // 🖼️ Enviar imagen + texto Tanjiro Style
  await conn.sendFile(m.chat, catalogo, "dojo.jpg", grupos, m);

  // ✨ Reacción estilo respiración
  await m.react(emojis);
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler
