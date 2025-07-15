let handler = async (m, { conn}) => {
  const nombre = await conn.getName(m.sender);
  const numero = m.sender.split('@')[0];
  const icono = 'https://files.catbox.moe/sbzc3p.jpg'; // imagen estilo Tanjiro
  const jid = m.chat;

  const text = `
🌸 Hola *${nombre}* (${numero})
Soy *Fedexyz*, el creador del sistema *Tanjiro_Bot* 🗡️

🤖 Este bot ofrece funciones avanzadas, seguridad, soporte y respiración solar digital para grupos y subbots.

🔗 Contacto directo: https://wa.me/5491156178758
💮 Gracias por apoyar GalaxyForge Community 協会
`.trim();

  // Imagen + presentación
  await conn.sendMessage(m.chat, {
    image: { url: icono},
    caption: text,
    viewOnce: true
}, { quoted: m});

  // Producto promocional
  await conn.sendMessage(jid, {
    product: {
      productImage: { url: icono},
      title: "🌸 Tanjiro_Bot by Fedexyz",
      description: "🤖 Alquila o compra Tanjiro_Bot para tus grupos. Incluye funciones avanzadas, sistema estable y soporte técnico personalizado.",
      currencyCode: "USD",
      priceAmount1000: 5000,
      retailerId: "TanjiroBot",
      productId: "24502048122733040",
      productImageCount: 1
},
    businessOwnerJid: "5491156278758@s.whatsapp.net"
}, { messageType: 'product'});
};

handler.command = ['creador', 'developer', 'fedexyz'];
handler.tags = ['info'];
handler.help = ['creador'];
export default handler;
