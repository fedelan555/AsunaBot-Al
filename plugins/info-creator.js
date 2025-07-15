import fetch from 'node-fetch';

let handler = async (m, { conn}) => {
  let contacto = '+5491156178758';
  let nombreEmpresarial = 'fedexyz Tanjiro_Bot';
  let mensaje = `
📇 *Contacto Empresarial: ${nombreEmpresarial}*

Hola 👋, este es el número oficial para consultas, soporte técnico, colaboraciones o integración de nuestro bot a tu grupo.

💬 Puedes escribir directamente a:
📞 *${contacto}*
🌐 Enlace directo: https://wa.me/${contacto.replace('+', '')}

⚠️ Recuerda especificar el motivo de tu mensaje y tu número de grupo si deseas conexión empresarial.
`;

  try {
    const res = await fetch("https://files.catbox.moe/lpragp.jpg");
    const buffer = await res.buffer();

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: mensaje,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        businessMessageForwardedFrom: 'WhatsApp Business Oficial'
}
}, { quoted: m});
} catch (e) {
    console.error('[❌] Error al enviar contacto empresarial:', e);
    m.reply('🚫 No se pudo mostrar la información de contacto en este momento.');
}
};

handler.help = ['owner', 'creador', 'business'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'business', 'empresa'];

export default handler;
