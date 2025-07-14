const handler = async (m, { conn, text, usedPrefix, command}) => {
  const imagenTanjiro = 'https://files.catbox.moe/sbzc3p.jpg';
  const numberCreador = '5491156178758@s.whatsapp.net';
  const username = await conn.getName(m.sender);

  if (!text) {
    return conn.sendMessage(m.chat, {
      image: { url: imagenTanjiro},
      caption: `📩 Por favor, escribe cuál fue el error o problema que encontraste.\n\nEjemplo:\n${usedPrefix + command} El comando #spotify no respondió.`,
      buttons: [
        {
          buttonId: '#menucompleto',
          buttonText: { displayText: '🌸 MENU COMPLETO'},
          type: 1
}
      ],
      viewOnce: true
}, { quoted: m});
}

  const reporte = `
╭──●「 🚨 *REPORTE DE USUARIO* 」──●
│
│ 👤 Usuario: ${username}
│ 📱 Número: wa.me/${m.sender.split('@')[0]}
│ 📝 Reporte: ${text}
╰─────────────────────●
🔔 *Tanjiro Bot - Sistema de reportes*
`;

  // Enviar al creador con imagen decorativa
  await conn.sendMessage(numberCreador, {
    image: { url: imagenTanjiro},
    caption: reporte
});

  // Confirmar al usuario
  await conn.sendMessage(m.chat, {
    image: { url: imagenTanjiro},
    caption: `✅ Tu reporte ha sido enviado correctamente al creador *Fedexyz*.\nGracias por ayudar a mejorar *Tanjiro Bot* 🌸`,
    buttons: [
      {
        buttonId: '#menucompleto',
        buttonText: { displayText: '🌸 MENU COMPLETO'},
        type: 1
}
    ],
    viewOnce: true
}, { quoted: m});
};

handler.help = ['reportar <mensaje>'];
handler.tags = ['info'];
handler.command = ['reportar', 'reporte', 'error'];
export default handler;
