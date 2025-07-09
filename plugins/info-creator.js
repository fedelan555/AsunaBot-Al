// una versión de `creador.js` que *no utiliza imagen (`jpg`)*, pero mantiene la funcionalidad de enviar el contacto del creador usando la vCard y un mensaje de presentación, sin incluir la vista previa enriquecida con imagen:

import fetch from 'node-fetch';

let handler = async (m, { conn}) => {
  await m.react('👤');

  const username = await conn.getName(m.sender);

  const creador = {
    nombre: "FedeLanyt",
    numero: "5491156178758",
    email: "fedelanyt20@gmail.com",
    pais: "Argentina",
    github: "https://github.com/fedelan555"
};

  // Construcción del vCard
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${creador.nombre}
item1.TEL;waid=${creador.numero}:${creador.numero}
item1.X-ABLabel:WhatsApp
item2.EMAIL;type=INTERNET:${creador.email}
item2.X-ABLabel:Email
item3.URL:${creador.github}
item3.X-ABLabel:GitHub
item4.ADR:;;${creador.pais};;;;
item4.X-ABLabel:Ubicación
END:VCARD`;

  // Enviar contacto sin imagen
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: "📇 Creador del Bot",
      contacts: [{
        displayName: creador.nombre,
        vcard
}]
}
}, {
    quoted: m
});

  // Mensaje personalizado
  const mensaje = `✨ *Hola ${username}*\nEste es el contacto oficial de *${creador.nombre}*, creador del bot.\n📬 Email: ${creador.email}\n🌐 GitHub: ${creador.github}`;
  await conn.sendMessage(m.chat, { text: mensaje});
};

handler.help = ['creador'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;
