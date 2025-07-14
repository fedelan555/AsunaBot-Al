let handler = async (m, { conn, participants, groupMetadata}) => {
  const imagenTanjiro = 'https://files.catbox.moe/sbzc3p.jpg'; // imagen decorativa estilo Tanjiro
  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n▢ ');
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

  let text = `
≡ *STAFF DEL GRUPO* _${groupMetadata.subject}_

┌─⊷ *ADMINS*
▢ ${listAdmin}
└─────────────
`.trim();

  await conn.sendMessage(m.chat, {
    image: { url: imagenTanjiro},
    caption: text,
    mentions: [...groupAdmins.map(v => v.id), owner],
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

handler.help = ['staff'];
handler.tags = ['group'];
handler.command = ['staff', 'admins', 'listadmin'];
handler.group = true;
export default handler;
