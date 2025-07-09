// ¡Vamos a hacerlo explosivamente épico! Aquí tienes una versión mejorada de `creador.js`

import fetch from 'node-fetch';

let handler = async (m, { conn}) => {
  await m.react('🔥');

  const username = await conn.getName(m.sender);

  const creador = {
    nombre: "FedeLanyt",
    apodo: "El Pilar del Código",
    numero: "5491156178758",
    email: "fedelanyt20@gmail.com",
    pais: "🇦🇷 Argentina",
    github: "https://github.com/fedelan555",
    instagram: "https://instagram.com/fedelan.dev",
    frase: "Respira profundo, como Tanjiro en la batalla.",
    estilo: "🌊 Respiración del Código: Primer Movimiento 🌊"
};

  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${creador.nombre}
NICKNAME:${creador.apodo}
item1.TEL;waid=${creador.numero}:${creador.numero}
item1.X-ABLabel:WhatsApp
item2.EMAIL;type=INTERNET:${creador.email}
item2.X-ABLabel:Email
item3.URL:${creador.github}
item3.X-ABLabel:GitHub
item4.URL:${creador.instagram}
item4.X-ABLabel:Instagram
item5.ADR:;;${creador.pais};;;;
item5.X-ABLabel:Ubicación
END:VCARD`;

  // 1️⃣ Enviar contacto con vCard
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: "🗡️ Creador del Bot – Estilo Tanjiro",
      contacts: [{
        displayName: creador.nombre,
        vcard
}]
}
}, {
    quoted: m
});

  // 2️⃣ Enviar mensaje personalizado
  const mensaje = `🌸 *Hola ${username}*\n` +
    `🔥 Este es el contacto oficial de *${creador.nombre}* (${creador.apodo}), creador del bot con estilo de Tanjiro.\n\n` +
    `📬 *Email:* ${creador.email}\n` +
    `🌐 *GitHub:* ${creador.github}\n` +
    `📸 *Instagram:* ${creador.instagram}\n` +
    `📍 *Ubicación:* ${creador.pais}\n\n` +
    `🗡️ *Frase épica:* _${creador.frase}_\n` +
    `🌊 *Estilo:* ${creador.estilo}`;

  await conn.sendMessage(m.chat, { text: mensaje});

  // 3️⃣ Enviar botones épicos
  const botones = {
    text: `🌟 Accede a los recursos del creador de forma épica 🌟`,
    footer: `Bot inspirado por Tanjiro Kamado`,
    templateButtons: [
      { urlButton: { displayText: "🔗 GitHub", url: creador.github}},
      { urlButton: { displayText: "📸 Instagram", url: creador.instagram}},
      { callButton: { displayText: "📞 WhatsApp", phoneNumber: creador.numero}}
    ]
};

  await conn.sendMessage(m.chat, botones, { quoted: m});
};

handler.help = ['creador'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;
