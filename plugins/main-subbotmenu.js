import pkg from '@whiskeysockets/baileys';
const { prepareWAMessageMedia} = pkg;
import fetch from 'node-fetch';
import { xpRange} from '../lib/levelling.js';

// Lista de JIDs autorizados como subbots
const subbots = [
  '5491156178758@s.whatsapp.net',
  '1234567890@s.whatsapp.net',
  '987654321@s.whatsapp.net'
];

// JID del bot oficial que NO debe ejecutar este menú
const botOficial = '5491137612743@s.whatsapp.net';

const tags = {
  group: 'DOJO',
  info: 'SUBBOT INFO',
  media: 'DESCARGAS',
  serbot: 'SUBBOTS',
  sticker: 'STICKER',
  tools: 'UTILIDADES'
};

let handler = async (m, { conn}) => {
  // Si el bot es el oficial, no ejecuta el menú
  if (conn.user?.jid === botOficial) {
    return conn.sendMessage(m.chat, {
      text: `❎ Este comando está desactivado en el *Bot Oficial*.\n\n🧩 Usa un subbot aliado para acceder a este menú.\n🔗 https://wa.me/5491137612743`,
      footer: '🌸 Tanjiro Bot — Sistema Solar',
}, { quoted: m});
}

  // Verifica si el usuario es un subbot autorizado
  if (!subbots.includes(m.sender)) {
    return conn.sendMessage(m.chat, {
      text: `🚫 Este menú es exclusivo para *Subbots Aliados*.\nSolicita autorización al creador: https://wa.me/5491156178758`,
      footer: '🎴 Sistema Tanjiro',
}, { quoted: m});
}

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

    const help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
      help: Array.isArray(p.help)? p.help: (p.help? [p.help]: []),
      tags: Array.isArray(p.tags)? p.tags: (p.tags? [p.tags]: []),
      limit: p.limit,
      premium: p.premium
}));

    let menuText = `
╭━━━ ☀️ ꜱᴜʙʙᴏᴛ ꜱᴏʟᴀʀ ꜱʏꜱᴛᴇᴍ ☀️ ━╮
┃ Usuario: *@${userId.split('@')[0]}*
┃ Rango: *Subbot Aliado 🅢*
┃ Modo: ${mode}
┃ Exp: ${exp}/${xp}
┃ Registrados: ${totalreg}
┃ Uptime: ${uptime}
┃ Comandos activos: ${totalCommands}
╰━━━━━━━━━━━━━━━━━━━━━━╯
📋 *MENÚ POR CATEGORÍA:* ${readMore}`;

    for (let tag in tags) {
      const comandos = help.filter(menu => menu.tags.includes(tag));
      if (!comandos.length) continue;

      menuText += `\n╭─💠 *${tags[tag]}* ${getRandomEmoji()}\n`;
      menuText += comandos.map(menu =>
        menu.help.map(cmd =>
          `│ ✦ ${cmd}${menu.limit? ' ◜⭐◞': ''}${menu.premium? ' ◜🪪◞': ''}`
).join('\n')
).join('\n');
      menuText += `\n╰────────────────────────────╯`;
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
    console.error('[✗] Error en subbotmenu:', e);
    await conn.reply(m.chat, '❎ Ocurrió un error al cargar el menú de subbots.', m);
}
};

handler.help = ['subbotmenu'];
handler.tags = ['main'];
handler.command = ['subbotmenu', 'aliadomenu', 'menualiado'];
handler.register = false;
export default handler;

// Utilidades
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
  }

 function getRandomEmoji() {
  const emojis = ['🐉', '🍃', '🔥', '💠'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}
.
