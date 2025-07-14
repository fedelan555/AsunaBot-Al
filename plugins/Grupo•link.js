var handler = async (m, { conn}) => {
  let group = m.chat;
  let code = await conn.groupInviteCode(group);
  let link = 'https://chat.whatsapp.com/' + code;

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/sbzc3p.jpg'}, // Imagen temática estilo Tanjiro
    caption: `🚩 *Enlace del grupo:*\n${link}\n\n🌸 *Tanjiro Bot* protege tu aliento digital.`,
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

handler.help = ['link'];
handler.tags = ['grupo'];
handler.command = ['link'];

handler.group = true;
handler.botAdmin = true;

export default handler;
