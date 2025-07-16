import pkg from '@whiskeysockets/baileys';
const { prepareWAMessageMedia} = pkg;
import fetch from 'node-fetch';
import { xpRange} from '../lib/levelling.js';

const tags = {
  anime: '≡ 会 ✨ 𝖠𝗋𝗍𝖾 𝖣𝖾𝗆𝗈𝗇í𝖺𝖼𝗈 / 𝖠𝖭𝖨𝖬𝖤',
  juegos: '≡ 会 🎮 𝖤𝗇𝗍𝗋𝖾𝗇𝖺𝗆𝗂𝖾𝗇𝗍𝗈 𝖤𝗇 𝖫𝗎𝖈𝗁𝖺 / 𝖩𝖴𝖤𝖦𝖮𝖲',
  main: '≡ 会 📜 𝖱𝖾𝗀𝗂𝗌𝗍𝗋𝗈 𝖣𝖾𝗅 𝖢𝖺𝗓𝖺𝖽𝗈𝗋 / 𝖨𝖭𝖥𝖮',
  ia: '≡ 会 🌀 𝖳𝖾𝖼𝗇𝗂𝖼𝖺 𝖣𝖾 𝖫𝖾𝖼𝗍𝗎𝗋𝖺 / 𝖨𝖠',
  search: '≡ 会 🔍 𝖱𝖺𝗌𝗍𝗋𝖾𝗈 𝖣𝖾 𝖮𝗇𝗂 / 𝖲𝖤𝖠𝖱𝖢𝖧',
  game: '≡ 会 🕹️ 𝖢𝖺𝗆𝗉𝗈 𝖣𝖾 𝖡𝖺𝗍𝖺𝗅𝗅𝖺 / 𝖦𝖠𝖬𝖤',
  serbot: '≡ 会 🧣 𝖱𝖾𝗌𝗉𝗂𝗋𝖺𝖼𝗂𝗈𝗇 𝖣𝖾𝗅 𝖠𝗅𝗂𝖾𝗇𝗍𝗈 / 𝖲𝖴𝖡 𝖡𝖮𝖳𝖲',
  rpg: '≡ 会 ⚔️ 𝖬𝗂𝗌𝗂𝗈𝗇𝖾𝗌 𝖣𝖾𝗆𝗈𝗇 𝖲𝗅𝖺𝗒𝖾𝗋𝗌 / 𝖱𝖯𝖦',
  sticker: '≡ 会 🎴 𝖳𝖺𝗅𝗂𝗌𝗆𝖺𝗇𝖾𝗌 / 𝖲𝖳𝖨𝖢𝖪𝖤𝖱𝖲',
  group: '≡ 会 ⛩️ 𝖣𝗈𝗃𝗈 𝖧𝖺𝗌𝗁𝗂𝗋𝖺 / 𝖦𝖱𝖮𝖴𝖯𝖲',
  nable: '≡ 会 🔓 𝖡𝗋𝖾𝖼𝗁𝖺 𝖣𝖾𝗅 𝖠𝗎𝗋𝖺 / 𝖮𝖭 / 𝖮𝖥𝖥',
  premium: '≡ 会 💎 𝖯𝗂𝗅𝖺𝗋 𝖫𝖾𝗀𝖾𝗇𝖽𝖺𝗋𝗂𝗈 / 𝖯𝖱𝖤𝖬𝖨𝖴𝖬',
  downloader: '≡ 会 📥 𝖣𝖾𝗌𝖼𝖺𝗋𝗀𝖺 𝖨𝗇𝖿𝖾𝗋𝗇𝖺𝗅 / 𝖣𝖮𝖶𝖭𝖫𝖮𝖠𝖣',
  tools: '≡ 会 🛠️ 𝖠𝗋𝗆𝖺𝗌 𝖭𝗂𝖼𝗁𝗂𝗋𝗂𝗇 / 𝖳𝖮𝖮𝖫𝖲',
  fun: '≡ 会 🌸 𝖤𝗇𝗍𝗋𝖾𝗇𝖺𝗆𝗂𝖾𝗇𝗍𝗈 𝖬𝖾𝗇𝗍𝖺𝗅 / 𝖥𝖴𝖭',
  nsfw: '≡ 会 🚫 𝖹𝗈𝗇𝖺 𝖯𝗋𝗈𝗁𝗂𝖻𝗂𝖽𝖺 / 𝖭𝖲𝖥𝖶',
  cmd: '≡ 会 📦 𝖱𝖾𝗀𝗂𝗌𝗍𝗋𝗈 𝖭𝖾𝗓𝗎𝗄𝗈 / 𝖣𝖠𝖳𝖠𝖡𝖠𝖲𝖤',
  owner: '≡ 会 👑 𝖬𝖺𝖾𝗌𝗍𝗋𝗈 𝖴𝗋𝗈𝗄𝗈𝖽𝖺𝗄𝗂 / 𝖮𝖶𝖭𝖤𝖱',
  audio: '≡ 会 🔊 𝖱𝖾𝗌𝗈𝗇𝖺𝗇𝖼𝗂𝖺 𝖲𝗈𝗇𝗈𝗋𝖺 / 𝖠𝖴𝖣𝖨𝖮𝖲',
  advanced: '≡ 会 🌌 𝖠𝗅𝗂𝖾𝗇𝗍𝗈 𝖲𝗎𝗉𝗋𝖾𝗆𝗈 / 𝖠𝖣𝖵𝖠𝖭𝖢𝖤𝖣',
  weather: '≡ 会 ⛅ 𝖢𝗅𝗂𝗆𝖺 𝖤𝗌𝗉𝗂𝗋𝗂𝗍𝗎𝖺𝗅 / 𝖶𝖤𝖠𝖳𝖧𝖤𝖱',
  news: '≡ 会 📰 𝖭𝗈𝗍𝗂𝖼𝗂𝖺𝗌 𝖧𝖺𝗌𝗁𝗂𝗋𝖺 / 𝖭𝖤𝖶𝖲',
  finance: '≡ 会 💰 𝖤𝗈𝖼𝗈𝗇𝗈𝗆í𝖺 𝖣𝖾𝗅 𝖣𝗈𝗃𝗈 / 𝖥𝖨𝖭𝖠𝖭𝖢𝖤',
  education: '≡ 会 📚 𝖤𝗌𝖼𝗎𝖾𝗅𝖺 𝖪𝖺𝗌𝗎𝗀𝖺𝗂 / 𝖤𝖣𝖴𝖢𝖠𝖳𝖨𝖮𝖭',
  health: '≡ 会 🩺 𝖡𝗂𝖾𝗇𝖾𝗌𝗍𝖺𝗋 𝖲𝗁𝗂𝗇𝗈𝖻𝗎 / 𝖧𝖤𝖠𝖫𝖳𝖧',
  entertainment: '≡ 会 🎭 𝖳𝖾𝖺𝗍𝗋𝗈 𝖣𝖾𝗅 𝖬𝗎𝗇𝖽𝗈 / 𝖤𝖭𝖳𝖤𝖱𝖳𝖠𝖨𝖭𝖬𝖤𝖭𝖳',
  sports: '≡ 会 🏃 𝖠𝗋𝗍𝖾 𝖢𝗈𝗋𝗉𝗈𝗋𝖺𝗅 / 𝖲𝖯𝖮𝖱𝖳𝖲',
  travel: '≡ 会 🧭 𝖱𝗎𝗍𝖺 𝖣𝖾𝗅 𝖢𝖺𝗓𝖺𝖽𝗈𝗋 / 𝖳𝖱𝖠𝖵𝖤𝖫',
  food: '≡ 会 🍱 𝖱𝖺𝖼𝗂𝗈𝗇 𝖣𝖾 𝖬𝗂𝗌𝗂𝗈𝗇𝖾𝗌 / 𝖥𝖮𝖮𝖣',
  shopping: '≡ 会 🧺 𝖳𝗂𝖾𝗇𝖽𝖺 𝖣𝖾𝗅 𝖢𝗎𝖾𝗋𝗏𝗈 / 𝖲𝖧𝖮𝖯𝖯𝖨𝖭𝖦',
  productivity: '≡ 会 📈 𝖣𝗂𝗌𝖼𝗂𝗉𝗅𝗂𝗇𝖺 𝖭𝗂𝖼𝗁𝗂𝗋𝗂𝗇 / 𝖯𝖱𝖮𝖣𝖴𝖢𝖳𝖨𝖵𝖨𝖳𝖸',
  social: '≡ 会 💬 𝖱𝖾𝖽 𝖪𝖺𝗌𝗎𝗀𝖺𝗂 / 𝖲𝖮𝖢𝖨𝖠𝖫',
  security: '≡ 会 🛡️ 𝖳𝖾𝖼𝗇𝗂𝖼𝖺 𝖣𝖾 𝖯𝗋𝗈𝗍𝖾𝗀𝖾𝗋 / 𝖲𝖤𝖢𝖴𝖱𝖨𝖳𝖸',
  custom: '≡ 会 🧩 𝖳𝖾𝖼𝗇𝗂𝖼𝖺 𝖯𝖾𝗋𝗌𝗈𝗇𝖺𝗅𝗂𝗓𝖺𝖽𝖺 / 𝖢𝖴𝖲𝖳𝖮𝖬'
};

let handler = async (m, { conn}) => {
  try {
    const userId = m.sender;
    const user = global.db.data.users[userId] || {};
    const name = await conn.getName(userId);
    const mode = global.opts.self? 'Privado 🔒': 'Público 🌐';
    const totalCommands = Object.keys(global.plugins).length;
    const totalreg = Object.keys(global.db.data.users).length;
    const uptime = clockString(process.uptime() * 1000);
    const { exp = 0, level = 0} = user;
    const { min, xp} = xpRange(level, global.multiplier || 1);

    const help = Object.values(global.plugins)
.filter(p =>!p.disabled)
.map(p => ({
        help: Array.isArray(p.help)? p.help: (p.help? [p.help]: []),
        tags: Array.isArray(p.tags)? p.tags: (p.tags? [p.tags]: []),
        limit: p.limit,
        premium: p.premium
}));

    const tipoBot = conn.user?.jid === '5491137612743@s.whatsapp.net'
? '🌕 Pilar Supremo'
: '🌸 Cazador Aliado';

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

🗡️ “Respira… enfoca el alma. Protege, aunque duela.”${readMore}
`.trim();

    for (let tag in tags) {
      const comandos = help.filter(menu => menu.tags.includes(tag));
      if (!comandos.length) continue;

      menuText += `\n⛩️ *${tags[tag]}* ${getRandomEmoji()}\n`;
      menuText += comandos.map(menu =>
        menu.help.map(cmd =>
          `ര🌸 ׄ  ${cmd}${menu.limit? ' ◜💮◞': ''}${menu.premium? ' ◜🌞◞': ''}`
).join('\n')
).join('\n');
      menuText += `\n═════════════════════`;
}

    const imageTanjiro = 'https://files.catbox.moe/sbzc3p.jpg';
    const imageBuffer = await (await fetch(imageTanjiro)).buffer();

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: menuText,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true
}
}, { quoted: m});

} catch (e) {
    console.error('[✗] Error en TanjiroBot Submenu:', e);
    conn.reply(m.chat, '💨 El aliento se desvaneció... no fue posible invocar el menú.', m);
}
};

handler.help = ['menusub', 'subbotmenu'];
handler.tags = ['main'];
handler.command = ['subbotmenu', 'menusub', 'menutanjiro'];
handler.register = false;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

function getRandomEmoji() {
  const emojis = ['🌸', '🗡️', '💮', '🌀', '🌞'];
  return emojis[Math.floor(Math.random() * emojis.length)];
  }
