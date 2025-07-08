// 🔧 Nuevo código `creador.js` en formato alternativo...

import fetch from 'node-fetch';

const creadorInfo = {
  nombre: "fedelanyt",
  numero: "5491156178758",
  email: "fedelanyt20@gmail.com",
  pais: "Argentina",
  imagen: "https://files.catbox.moe/ddv9lu.jpg",
  link: "https://github.com/fedelan555"
};

const generarVCard = (info) => {
  return `BEGIN:VCARD
VERSION:3.0
FN:${info.nombre}
item1.TEL;waid=${info.numero}:${info.numero}
item1.X-ABLabel:WhatsApp
item2.EMAIL;type=INTERNET:${info.email}
item2.X-ABLabel:Email
item3.URL:${info.link}
item3.X-ABLabel:GitHub
item4.ADR:;;${info.pais};;;;
item4.X-ABLabel:Ubicación
END:VCARD`;
};

let handler = async (m, { conn}) => {
  await m.react('👨‍💻');

  let username = await conn.getName(m.sender);
  let contacto = {
    displayName: "Contacto del Creador",
    vcard: generarVCard(creadorInfo)
};

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: "1 contacto",
      contacts: [contacto]
},
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: '🎯 Creador del Bot Asuna',
        body: `Solicitado por ${username}`,
        thumbnailUrl: creadorInfo.imagen,
        sourceUrl: creadorInfo.link,
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, {
    quoted: m
});

  let texto = `✨ *Hola ${username}*\nAquí tienes el contacto del creador del bot.`;
  await conn.sendMessage(m.chat, { text: texto});
};

handler.help = ['creador'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;
