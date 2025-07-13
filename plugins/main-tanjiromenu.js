let handler = async (m, { conn, args}) => {
  let userId = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]: m.sender;
  let userData = global.db.data.users[userId] || {};
  let name = await conn.getName(userId);
  let _uptime = process.uptime() * 1000;
  let uptime = clockString(_uptime);

  let imgUrl = 'https://qu.ax/FLeXV.jpg'; // Imagen estilo Tanjiro BOT 🇯🇵

  let txt = `
𝐇𝐨𝐥𝐚 *${name}*!
𝐒𝐨𝐲 =͟͟͞🌸 Tanjiro_Bot ≼᳞ׄ
🧠 Espíritu firme, corazón puro.

ᴀǫᴜɪ ᴛɪᴇɴᴇs ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs:
╭┈ ↷
│ ✐ S𝗍ᥲrV᥆іძ-ᥴᥣᥙᑲ🪐​᭄
│ ✐ ꒷ꕤ🌤️ദ ᴄᴏᴍᴀɴᴅᴏs ★
│ https://starvoid-club.vercel.app/commands
│ ✐ ꒷ꕤ🌤️ദ ᴄᴀɴᴀʟ ᴏғɪᴄɪᴀʟ ★
│ https://whatsapp.com/channel/0029Vb1AFK6HbFV9kaB3b13W
╰─────────────────

✐; 🪐→ ᴘᴀʀᴀ ᴄʀᴇᴀʀ ᴜɴ sᴜʙ-ʙᴏᴛ ᴄᴏɴ ᴛᴜ ɴᴜᴍᴇʀᴏ
ᴜᴛɪʟɪᴢᴀ *#sᴇʀʙᴏᴛ* o *#sᴇʀʙᴏᴛ --ᴄᴏᴅᴇ*

=͟͟͞⚔️ Tanjiro_Bot ≼᳞ׄ | Tiempo activo: ${uptime}
`.trim();

  await conn.sendMessage(m.chat, {
    text: txt,
    image: { url: imgUrl},
    footer: 'Haz clic para visitar el canal oficial 🌟',
    buttons: [
      { buttonText: { displayText: '🌐 Ver Comandos'}, type: 1},
      {
        buttonText: { displayText: '📲 Canal Oficial'},
        type: 1,
        urlButton: {
          displayText: 'Visita el Canal 🟣',
          url: 'https://whatsapp.com/channel/0029Vb1AFK6HbFV9kaB3b13W'
}
}
    ],
    contextInfo: {
      mentionedJid: [m.sender, userId],
      externalAdReply: {
        title: 'Tanjiro BOT 🌊',
        body: 'Conoce la bondad y la fuerza',
        thumbnailUrl: imgUrl,
        sourceUrl: 'https://starvoid-club.vercel.app/commands',
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m});
}

handler.help = ['tanjiromenu'];
handler.tags = ['main'];
handler.command = ['tanjiromenu', 'tanjmenu', 'menutanji'];

export default handler;

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return `${hours}h ${minutes}m ${seconds}s`;
}
