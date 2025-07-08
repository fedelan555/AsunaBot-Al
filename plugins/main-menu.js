// ¡Con gusto! Aquí te dejo un menú totalmente nuevo con temática inspirada en _Tanjiro Kamado_, el protagonista de _Kimetsu no Yaiba_. Tiene toques de katakana estilizado, detalles de espada nichirin y mantiene una estética elegante, lista para integrarse a tu bot:

import { xpRange} from '../lib/levelling.js'

const tanjiroFont = (text) => {
  const charset = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'ˣ', y: 'ʏ', z: 'ᴢ'
}
  return text.toLowerCase().split('').map(c => charset[c] || c).join('')
}

let tags = {
  'main': tanjiroFont('sistema'),
  'kitsu': tanjiroFont('anime'),
  'group': tanjiroFont('grupo'),
  'fun': tanjiroFont('diversión'),
}

const tanjiroMenu = {
  before: `*☀️ MENÚ - ESPÍRITU DEL SOL ☀️*

🗡 *Tanjiro Kamado te acompaña...*

👤 Usuario: *%name*
🔥 Nivel: %level
💎 Exp: %exp/%maxexp
🌙 Modo: %mode
👥 Cazadores registrados: %totalreg
⏳ Tiempo activo: %muptime

%readmore
`.trim(),

  header: `\n🌸 %category\n╭──────────`,
  body: '┃ 🌀 %cmd\n',
  footer: '╰───────────',
  after: '\n🗡 Domina el aliento del Sol y sigue adelante.'
}

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    let { exp, level} = global.db.data.users[m.sender]
    let { min, xp, max} = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let muptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let mode = global.opts["self"]? "Privado": "Público"

    let help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
      help: Array.isArray(p.help)? p.help: [p.help],
      tags: Array.isArray(p.tags)? p.tags: [p.tags],
      prefix: 'customPrefix' in p,
      limit: p.limit,
      premium: p.premium,
}))

    for (let plugin of help) {
      for (let tag of plugin.tags || []) {
        if (!(tag in tags)) tags[tag] = tanjiroFont(tag)
}
}

    const { before, header, body, footer, after} = tanjiroMenu

    let text = [
      before,
...Object.keys(tags).map(tag => {
        const cmds = help
.filter(menu => menu.tags.includes(tag))
.map(menu => menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix? cmd: _p + cmd)).join('\n'))
.join('\n')
        return `${header.replace(/%category/g, tags[tag])}\n${cmds}\n${footer}`
}),
      after
    ].join('\n')

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
}

    text = text.replace(/%(\w+)/g, (_, key) => replace[key] || '')

    await conn.sendMessage(m.chat, {
      image: { url: 'https://i.imgur.com/zZ62Mx9.jpg'}, // Imagen temática de Tanjiro
      caption: text,
      buttons: [
        { buttonId: `${_p}owner`, buttonText: { displayText: '👺 CREADOR'}, type: 1},
        { buttonId: `${_p}anime`, buttonText: { displayText: '🎴 ANIME'}, type: 1}
      ],
      viewOnce: true
}, { quoted: m})

} catch (e) {
    console.error(e)
    conn.reply(m.chat, '☠️ Ha ocurrido un error al invocar el aliento del menú.', m)
}
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'tanjiromenu']
handler.register = true
export default handler

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000)
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
