const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {
  const imagenTanjiro = 'https://files.catbox.moe/23ebz8.jpg'; // puedes cambiar la imagen por otra temática

  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    return;
}

  const mensaje = args.join(' ') || '🌸 ¡Atención grupo!';
  const invocacion = `
╭──❖「 💥 *INVOCANDO AL GRUPO* 」❖──╮
│
│ 💌 *Mensaje:* ${mensaje}
│ 👥 *Miembros:* ${participants.length}
│ 🗡️ *Tanjiro Bot* invoca con elegancia...
│
╰─────────────────────────────╯
☁️ *Tags:*
`;

  let textoTags = invocacion;
  for (const user of participants) {
    textoTags += `@${user.id.split('@')[0]}\n`;
}

  await conn.sendMessage(m.chat, {
    image: { url: imagenTanjiro},
    caption: textoTags,
    mentions: participants.map(a => a.id),
    buttons: [
      {
        buttonId: '#menucompleto',
        buttonText: { displayText: '🌸 MENU COMPLETO'},
        type: 1
}
    ],
    viewOnce: true
}, { quoted: m});
};

handler.help = ['tagall <mensaje>', 'invocar <mensaje>'];
handler.tags = ['grupo'];
handler.command = ['tagall', 'invocar'];
handler.admin = true;
handler.group = true;
export default handler;
