const handler = async (m, { conn, text, usedPrefix, command}) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `📩 Por favor, escribe cuál fue el error o problema que encontraste.\n\nEjemplo:\n${usedPrefix + command} El comando #spotify no respondió.`,
      m
);
}

  const numberCreador = '5491156178758@s.whatsapp.net'; // JID del creador
  const username = await conn.getName(m.sender);

  const reporte = `
🚨 *REPORTE DE USUARIO*
─────────────────────
👤 Usuario: ${username}
📱 Número: wa.me/${m.sender.split('@')[0]}
📝 Reporte:
${text}
─────────────────────
🔔 *Tanjiro Bot - Sistema de reportes*
`;

  // Enviar reporte al creador
  await conn.sendMessage(numberCreador, { text: reporte});

  // Confirmar al usuario
  await conn.reply(
    m.chat,
    `✅ Tu reporte ha sido enviado correctamente al creador *Fedexyz*.\nGracias por ayudar a mejorar Tanjiro Bot 🌸`,
    m
);
};

handler.help = ['reportar <mensaje>'];
handler.tags = ['info'];
handler.command = ['reportar', 'reporte'];
export default handler;
