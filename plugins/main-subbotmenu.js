let handler = async (m, { conn, usedPrefix}) => {
  const userId = m.sender;
  const user = global.db.data.users[userId] || {};
  const name = await conn.getName(userId);
  const uptime = clockString(process.uptime() * 1000);
  const mode = global.opts.self? 'Privado 🔒': 'Público 🌐';
  const totalreg = Object.keys(global.db.data.users).length;
  const totalCommands = Object.keys(global.plugins).length;
  const { exp = 0, level = 0} = user;
  const { min, xp} = xpRange(level, global.multiplier || 1);

  const tipoBot = conn.user?.jid === '5491137612743@s.whatsapp.net'
? '🌕 𝖯𝗂𝗅𝖺𝗋 Supremo'
: '🌸 𝖢𝖺𝗓𝖺𝖽𝗈𝗋 Aliado';

  const readMore = String.fromCharCode(8206).repeat(4001);

  let menuText = `
🪼𐅹
≡≡≡
🧣︵˚˖𓆩⌇𓆪˖˚︵🌸︵˚˖𓆩⌇𓆪˖˚︵🧣
会 𝖬𝖾𝗇𝗎 𝖣𝖾𝖼𝗈𝗋𝖺𝖽𝗈 TanjiroBot 会

╭─ 🎋 𝖴𝗌𝗎𝖺𝗋𝗂𝗈: @${userId.split('@')[0]}
├ ⚔️ 𝖳𝗂𝗉𝗈: ${tipoBot}
├ 🔐 𝖬𝗈𝖽𝗈: ${mode}
├ ✨ 𝖭𝗂𝗏𝖾𝗅: ${level} • 𝖤𝗑𝗉: ${exp}/${xp}
├ 📚 𝖱𝖾𝗀𝗂𝗌𝗍𝗋𝗈: ${totalreg}
├ 🕰️ 𝖴𝗉𝗍𝗂𝗆𝖾: ${uptime}
├ 📜 𝖢𝗈𝗆𝖺𝗇𝖽𝗈𝗌: ${totalCommands}
╰──────────────────────────

🗡️ “𝖱𝖾𝗌𝗉𝗂𝗋𝖺 𝗉𝗋𝗈𝖿𝗎𝗇𝖽𝗈. 𝖫𝗎𝖈𝗁𝖺 𝖼𝗈𝗇 𝗁𝗈𝗇𝗈𝗋.”${readMore}
`;

  const sections = {
    '☁️𐅹 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅': ['menu', 'help', 'estado'],
    '👑𐅹 𝖢𝗋𝖾𝖺𝖽𝗈𝗋': ['owner', 'creator', 'report'],
    '🧣𐅹 𝖲𝗎𝖻𝗕𝗈𝗍𝗌': ['jadibot', 'listjadibot'],
    '⛩️𐅹 𝖦𝗋𝗎𝗉𝗈𝗌': ['welcome', 'group', 'promote'],
    '🍙𐅹 𝖠𝗇𝗂𝗆𝖾': ['anime', 'waifu', 'manga'],
    '🗡️𐅹 𝖱𝖯𝖦': ['mine', 'adventure'],
    '🌀𐅹 𝖨𝖠': ['chatgpt', 'brainai'],
    '🔍𐅹 𝖲𝖾𝖺𝗋𝖼𝗁': ['google', 'ytsearch'],
    '📦𐅹 𝖣𝖠𝖳𝖠𝖡𝖠𝖲𝖤': ['blockcmd', 'unblockcmd'],
    '📥𐅹 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽': ['play', 'tiktok'],
    '🎭𐅹 𝖥𝗎𝗇': ['meme', 'ship'],
    '🚫𐅹 𝖭𝗌𝖿𝗐': ['nsfw', 'hentai'],
    '💎𐅹 𝖯𝗋𝖾𝗆𝗂𝗎𝗆': ['premiumlist', 'premiumadd'],
    '🛠️𐅹 𝖳𝗈𝗈𝗅𝗌': ['calc', 'shortlink'],
    '🔊𐅹 𝖠𝗎𝖽𝗂𝗈𝗌': ['audios', 'bass'],
    '🌌𐅹 𝖠𝖽𝗏𝖺𝗇𝖼𝖾𝗌': ['ban', 'join'],
    '🛡️𐅹 𝖲𝖾𝗀𝗎𝗋𝗂𝖽𝖺𝗱': ['antifake', 'antispam'],
    '🧩𐅹 𝖢𝗎𝗌𝗍𝗈𝗆': ['setname', 'setbanner']
};

  for (let category in sections) {
    menuText += `\n${category}\n`;
    menuText += sections[category].map(cmd => `🎴 ${usedPrefix + cmd}`).join('\n');
    menuText += `\n≡≡≡≡≡≡≡≡≡≡≡`;
}

  const image = 'https://files.catbox.moe/sbzc3p.jpg';
  const buffer = await (await fetch(image)).buffer();

  await conn.sendMessage(m.chat, {
    image: buffer,
    caption: menuText,
    buttons: [
      {
        buttonId: `${usedPrefix}info`,
        buttonText: { displayText: '🧣 VER INFO'},
        type: 1
}
    ],
    viewOnce: true
}, { quoted: m});
};

handler.help = ['menusub', 'subbotmenu'];
handler.tags = ['main'];
handler.command = ['menusub', 'subbotmenu'];
handler.register = false;
export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
