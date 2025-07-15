import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn}) => {
  const icono = 'https://files.catbox.moe/sbzc3p.jpg';
  const jid = m.chat;
  const suittag = '5491156178758'; // Creador
  const botname = 'Tanjiro_Bot';
  const packname = 'Tanjiro Solar System';
  const dev = 'Fedexyz';
  const correo = 'fedexyzbot@gmail.com';
  const md = 'https://github.com/Fedexyz/TanjiroBot';
  const channel = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';

  m.react('📦');

  const bioCreator = await conn.fetchStatus(`${suittag}@s.whatsapp.net`).catch(_ => ({}));
  const bioBot = await conn.fetchStatus(`${conn.user.jid}`).catch(_ => ({}));
  const nameCreator = await conn.getName(`${suittag}@s.whatsapp.net`);
  const nameBot = await conn.getName(conn.user.jid);

  // vCards extendidas
  await sendContactArray(conn, m.chat, [
    [suittag, '🌸 Propietario — Fedexyz', botname, '🌸 No hacer spam', correo, '🌍 Argentina', md, bioCreator.status || 'Sin Biografía'],
    [conn.user.jid.split('@')[0], '🌀 Tanjiro_Bot Oficial', packname, dev, correo, '🌕 Sistema Solar', channel, bioBot.status || 'Sin Biografía']
  ], m);

  // Producto promocional estilo WhatsApp Business
  await conn.sendMessage(jid, {
    product: {
      productImage: { url: icono},
      title: "🌸 Tanjiro_Bot - by Fedexyz",
      description: "🤖 Alquila o compra Tanjiro_Bot para tus grupos. Incluye funciones avanzadas, sistema estable y soporte técnico personalizado.",
      currencyCode: "pesos",
      priceAmount1000: 4000,
      retailerId: "Tanjiro_Bot",
      productId: "24407065218931451",
      productImageCount: 1
},
    businessOwnerJid: "5491156178758@s.whatsapp.net"
}, { messageType: 'product'});
};

handler.help = ['creador', 'developer', 'owner'];
handler.tags = ['info'];
handler.command = ['creador', 'creator', 'fedexyz', 'dueño'];
export default handler;

async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];
  let contacts = [];
  for (let [number, name, org, label1, email, region, website, note] of data) {
    number = number.replace(/[^0-9]/g, '');
    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
item.ORG:${org}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${label1}
item2.EMAIL;type=INTERNET:${email}
item2.X-ABLabel:Email
item3.ADR:;;${region};;;;
item3.X-ABADR:ac
item3.X-ABLabel:Region
item4.URL:${website}
item4.X-ABLabel:Website
item5.NOTE:${note}
item5.X-ABLabel:Perfil
END:VCARD`.trim();
    contacts.push({ vcard, displayName: name});
}
  return await conn.sendMessage(jid, {
    contacts: {
      displayName: contacts.length> 1? 'Contactos del sistema Tanjiro': contacts[0].displayName,
      contacts
}
}, { quoted,...options});
}
