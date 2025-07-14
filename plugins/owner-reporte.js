const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    return conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/23ebz8.jpg'}, // imagen decorativa al estilo Tanjiro
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
} else {
    const numberCreador = '5491156178758@s.whatsapp.net';
    const username = await conn.getName(m.sender);

    const reporte = `
╭──●「 🚨 *REPORTE DE USUARIO* 」──●
│
│ 👤 Usuario: ${username}
│ 📱 Número: wa.me/${m.sender.split('@')[0]}
│ 📝 Reporte: ${text}
╰─────────────────────●
🔔 *Tanjiro Bot - Sistema de reportes*
`;

    // Enviar al creador
    await conn.sendMessage(numberCreador, { text: reporte});

    // Confirmar al usuario con imagen + botón
    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/23ebz8.jpg'},
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
}
};

handler.help = ['reportar <mensaje>'];
handler.tags = ['info'];
handler.command = ['reportar', 'reporte', 'error'];
export default handler;
