async function handler(m, { conn: stars, usedPrefix}) {
  let uniqueUsers = new Map();

  global.conns.forEach(conn => {
    if (conn.user && conn.ws?.socket?.readyState === 1) {
      uniqueUsers.set(conn.user.jid, conn);
}
});

  let users = [...uniqueUsers.values()];
  let totalUsers = users.length;
  global.totalUsers = totalUsers;

  let packname = '🌸 TanjiroBot — Corazón y Respeto';
  let title = `⛩『 *Respiración Conectada* 』⛩`;
  let barra = '⎯⎯⎯⎯⎯⎯⎯⎯';

  let listado = users.map((v, i) => {
    let jid = v.user.jid.replace(/[^0-9]/g, '');
    let nombre = v.user.name || '👤 Cazador';
    return `🔰 ${packname}
🔖 #${i + 1} — @${jid}
🕊️ Enlace directo: wa.me/${jid}
🧣 Identidad: ${nombre}
🌸 Respiración: Activa`;
}).join('\n\n');

  let responseMessage = `
🌄 ${title}
🍃 Conectados: *${totalUsers}*
${barra}

${listado || '⚠️ No se detectan cazadores conectados en este momento.'}`.trim();

  const imageUrl = 'https://files.catbox.moe/i8hj9e.png'; // 🖼️ Puedes reemplazar con una imagen estilo Tanjiro o fondo anime

  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Tanjiro"
},
    message: {
      contactMessage: {
        displayName: "TanjiroBot",
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;TanjiroBot;;;\nFN:TanjiroBot\nEND:VCARD"
}
}
};

  await stars.sendMessage(m.chat, {
    image: { url: imageUrl},
    caption: responseMessage,
    mentions: stars.parseMention(responseMessage)
}, { quoted: fkontak});
}

handler.command = ['Bots2', 'TanjiroBot', 'listaBots'];
handler.help = ['Bots2', 'TanjiroBot', 'listaBots'];
handler.tags = ['info'];
export default handler;
