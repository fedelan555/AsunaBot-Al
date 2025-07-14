import { xpRange} from '../lib/levelling.js';

const textTanjiro = (text) => {
  const charset = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'ˣ', y: 'ʏ', z: 'ᴢ'
};
  return text.toLowerCase().split('').map(c => charset[c] || c).join('');
};

let tags = {
  group: textTanjiro('comandos de dojo'),
  info: textTanjiro('información subbot'),
  media: textTanjiro('descargas ligeras')
};

const defaultMenu = {
  before: `
🌸︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵🌸
╭━━━ ☀️ sᴜʙʙᴏᴛ - ᴍᴇɴᴜ ☀️ ━╮
┃ ᴍᴇɴᴜ ᴀʟɪᴀᴅᴏs ᴅᴇʟ sᴏʟ
╰━━━━━━━━━━━━━━━━━━╯

👤 Usuario: *%name*
🎴 Rango: *Subbot aliado 🅢*
🌟 Exp: %exp/%maxexp
🌐 Modo: %mode
👥 Registro: %totalreg
⏳ Uptime: %muptime

🌕 “Incluso un clon puede luchar con honor.”%readmore`.trim(),

  header: '\n🌸╭ SECCIÓN: *%category*',
  body: '୨🌸୧˚ %cmd',
  footer: '╰────────────',
  after: '\n🌸 Usa los comandos con convicción.'
};

const subbots = [
  '5491156178758@s.whatsapp.net',
  '123456789@s.whatsapp.net'
]; // Puedes agregar más IDs de subbots aquí

let handler = async (m, { conn, usedPrefix: _p}) => {
  if (!subbots.includes(m.sender)) {
    return conn.sendMessage(m.chat, {
      text: '🚫 Este menú es exclusivo para *subbots aliados*. Solicita autorización al creador.',
      footer: '🎩 Contacto: wa.me/5491156178758'
}, { quoted: m});
}

  try {
    let { exp = 0, level = 0} = global.db.data.users[m.sender];
    let { min, xp} = xpRange(level, global.multiplier);
    let name = await conn.getName(m.sender);
    let _uptime = process.uptime() * 1000;
    let muptime = clockString(_uptime);
    let totalreg = Object.keys(global.db.data.users).length;
    let mode = global.opts["self"]? "Privado 🔒": "Público 🌐";

    let help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
      help: Array.isArray(p.help)? p.help: [p.help],
      tags: Array.isArray(p.tags)? p.tags: [p.tags],
      prefix: 'customPrefix' in p,
      enabled:!p.disabled
}));

    for (let plugin of help) {
      if (plugin.tags) {
        for (let t of plugin.tags) {
          if (!(t in tags) && t) tags[t] = textTanjiro(t);
}
}
}

    const { before, header, body, footer, after} = defaultMenu;

    let _text = [
      before,
...Object.keys(tags).map(tag => {
        const cmds = help
.filter(menu => menu.tags.includes(tag))
.map(menu => menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix? cmd: _p + cmd)).join('\n'))
.join('\n');
        return `${header.replace(/%category/g, tags[tag])}\n${cmds}\n${footer}`;
}),
      after
    ].join('\n');

    let replace = {
      '%': '%',
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      totalreg,
      mode,
      muptime,
      readmore: String.fromCharCode(8206).repeat(4001)
};

    let text = _text.replace(/%(\w+)/g, (_, key) => replace[key] || '');

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/sbzc3p.jpg'},
      caption: text,
      buttons: [
        {
          buttonId: `${_p}menucompleto`,
          buttonText: { displayText: '🌸 MENU COMPLETO'},
          type: 1
}
      ],
      viewOnce: true
}, { quoted: m});

} catch (e) {
    console.error(e);
    conn.reply(m.chat, '❎ Error al cargar el menú de subbots.', m);
}
};

handler.help = ['subbotmenu'];
handler.tags = ['main', 'subbotmenu'];
handler.command = ['subbotmenu', 'aliadomenu', 'menualiado'];
handler.register = false;
export default handler;
function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000);
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60;
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
