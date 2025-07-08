// 🎨 Nueva versión de `creador.js` — estilo más expresivo y personal*

import fetch from 'node-fetch';

let handler = async (m, { conn}) => {
  await m.react('🤖');

  const nombreUsuario = await conn.getName(m.sender);
  const editorTag = `@${m.sender.split('@')[0]}`;

  // Datos del creador
  const infoCreador = {
    nombre: "FedeLanyt",
    numero: "5491156178758",
    email: "fedelanyt20@gmail.com",
    pais: "Argentina",
    foto: "https://files.catbox.moe/ddv9lu.jpg",
    github: "https://github.com/fedelan555",
    mensaje: "Programador de bots, amante del código y explorador del mundo digital 🔧💻"
};

  // Crear vCard con diseño visual
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${infoCreador.nombre}
item1.TEL;waid=${infoCreador.numero}:${infoCreador.numero}
item1.X-ABLabel:WhatsApp
item2.EMAIL;type=INTERNET:${infoCreador.email}
item2.X-ABLabel:Email
item3.URL:${infoCreador.github}
item3.X-ABLabel:GitHub
item4.ADR:;;${infoCreador.pais};;;;
item4.X-ABLabel:Ubicación
END:VCARD`;

  // Enviar contacto con preview enriquecido
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: "📇 Creador del Bot",
      contacts: [{
        displayName: infoCreador.nombre,
        vcard
}]
},
    contextInfo: {
      externalAdReply: {
        title: `🔧 ${infoCreador.nombre} • Creador del Bot Asuna`,
        body: infoCreador.mensaje,
        thumbnailUrl: infoCreador.foto,
        sourceUrl: infoCreador.github,
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true
}
}
}, {
    quoted: m
});

  // Mensaje final
  let mensajeFinal = `👋 *Hola ${nombreUsuario}*\nEste es el contacto oficial de *${infoCreador.nombre}*, creador del bot.
🌍 País: ${infoCreador.pais}
📬 Email: ${infoCreador.email}
📂 Más sobre él: ${infoCreador.github}`;

  await conn.sendMessage(m.chat, { text: mensajeFinal});
};

handler.help = ['creador'];
handler.tags = ['main'];
handler.command = /^(creador|owner|creator|dueño)$/i;

export default handler;
