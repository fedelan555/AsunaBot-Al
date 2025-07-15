import fetch from 'node-fetch';

let handler = async (m, { conn}) => {
  // 🌸 Datos empresariales y espirituales
  let contacto = '+5491156178758';
  let nombreEmpresarial = 'TanjiroBot 🌸 Aliento de Confianza';
  let mensaje = `
🧣 *Contacto Empresarial: ${nombreEmpresarial}*

🕯️ Con respeto y nobleza, este es el canal oficial para contactar al equipo de desarrollo, soporte técnico, o gestionar la integración del *TanjiroBot* en tu grupo.

💬 Puedes enviar un mensaje directo a:
📞 *${contacto}*
🌐 Enlace: https://wa.me/${contacto.replace('+', '')}

⛩️ Por favor, indica claramente el motivo de tu solicitud:
- 🗡️ Tipo de grupo
- 📍 País o región
- 🎴 Razón de integración (Soporte / Colaboración / Partner)

🌸 _TanjiroBot promueve la armonía, el respeto y el buen uso de la tecnología._
`;

  try {
    // 🖼️ Imagen representativa de Tanjiro estilo Business
    const res = await fetch("https://files.catbox.moe/lpragp.jpg"); // Cambia si deseas otro banner
    const buffer = await res.buffer();

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: mensaje,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        businessMessageForwardedFrom: 'TanjiroBot Enterprise 🌸'
}
}, { quoted: m});

} catch (e) {
    console.error('[❌] Error al enviar contacto TanjiroBot:', e);
    m.reply('🚫 El aliento se ha desvanecido... no fue posible mostrar el contacto en este momento.');
}
};

handler.help = ['owner', 'creador', 'tanjirobusiness'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'business', 'tanjiroempresa'];

export default handler;
