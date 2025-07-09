// ¡una versión decorada y funcional de `gruposcfc.js` con mejoras estilísticas y estructura limpia. Incluye emojis, sangrados visuales y variables fáciles de configurar para mantener la estética épica del bot 😎🌐:

import fetch from 'node-fetch'

let handler = async (m, { conn}) => {

  // 📝 Configura aquí tus datos de enlaces
  const namegrupo = 'Grupo Oficial – Código Sin Fin'
  const gp1 = 'https://chat.whatsapp.com/ABC123xyzGrupo'
  const namechannel = 'Canal Alternativo – CFC Updates'
  const channel = 'https://chat.whatsapp.com/DEF456xyzCanal'
  const dev = '👨‍💻 Creado por FedeLanyt'
  const catalogo = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/grupos.jpg'
  const emojis = '📡'

  // 🌟 Mensaje con los enlaces
  const grupos = `
╭━━━〔 *🌐 LINKS OFICIALES* 〕━━━╮

📲 *Únete al grupo principal:*
🌀 *${namegrupo}*
↪️ ${gp1}

╰━━━━━━━━━━━━━━━━━━━━━━━╯

🔁 *¿Enlace roto? Úsalo alternativo:*
📣 *${namechannel}*
↪️ ${channel}

╭───────〔 ⚒️ SOPORTE 〕───────╯
${dev}
`;

  // 📤 Enviar imagen + texto
  await conn.sendFile(m.chat, catalogo, "grupos.jpg", grupos, m);

  // 🌀 Reacción visual
  await m.react(emojis);
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler
