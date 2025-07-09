// ¡Está increíble tu versión! Aquí te la ajusto exactamente como pediste: con *dos botones específicos*, uno para abrir Gmail directamente y otro para visitar GitHub. Además, mantengo toda la estética tanjirística 🗡️🔥🌸.


import fetch from 'node-fetch';

let handler = async (m, { conn}) => {
  await m.react('💫');

  const username = await conn.getName(m.sender);

  const creador = {
    nombre: "FedeLanyt",
    apodo: "El Pilar del Código",
    numero: "5491156178758",
    email: "fedelanyt20@gmail.com",
    gmailURL: "mailto:fedelanyt20@gmail.com",
    github: "https://github.com/fedelan555",
    pais: "🇦🇷 Argentina",
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
item4.ADR:;;${creador.pais};;;;
item4.X-ABLabel:Ubicación
END:VCARD`;

  // 🧙‍♂️ Enviar contacto con vCard
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: "🗡️ Creador del Bot – Espíritu Tanjiro",
      contacts: [{
        displayName: creador.nombre,
        vcard
}]
}
}, {
    quoted: m
});

  // 🎴 Mensaje personalizado
  const mensaje = `🌸 *Hola ${username}*\n` +
    `✨ Este es el contacto oficial de *${creador.nombre}* (${creador.apodo}).\n\n` +
    `📬 *Email:* ${creador.email}\n` +
    `🌐 *GitHub:* ${creador.github}\n` +
    `📍 *Ubicación:* ${creador.pais}\n\n` +
    `🗡️ *Frase épica:* _${creador.frase}_\n` +
    `🌊 *Estilo:* ${creador.estilo}`;

  await conn.sendMessage(m.chat, { text: mensaje});

  // 🧩 Botones personalizados
  const botones = {
    text: `🎯 Conecta con el Creador`,
    footer: `Bot guiado por el espíritu de Tanjiro`,
    templateButtons: [
      { urlButton: { displayText: "📧 Ver Gmail", url: creador.gmailURL}},
      { urlButton: { displayText: "💻 Ver GitHub", url: creador.github}}
    ]
};

  await conn.sendMessage(m.chat, botones, { quoted: m});
};

handler.help = ['creador'];
handler.tags = ['main'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;
