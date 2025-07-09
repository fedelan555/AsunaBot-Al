import { xpRange} from '../lib/levelling.js'

let tags = {
  main: '🧩 Sistema',
  group: '👥 Grupos',
  serbot: '🛰️ Sub Bots',
  tools: '🔧 Herramientas',
  anime: '🌸 Anime',
  downloader: '📥 Descargas',
  info: '📚 Información',
}

const defaultMenu = {
  before: `*☀️ MENÚ - ESPÍRITU DEL SOL ☀️*

👤 Usuario: *%name*
⚔️ Nivel: %level
💥 Exp: %exp/%maxexp
🌙 Modo: %mode
📈 Usuarios registrados: %totalreg
⏱️ Tiempo activo: %muptime

%readmore
`.trim(),

  header: '\n🌊 %category\n─────────────────────',
  body: '📌 %cmd',
  footer: '\n─────────────────────',
  after: '\n🌞 Sigue dominando la respiración del código...\n',
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
      enabled:!p.disabled,
}))

    const { before, header, body, footer, after} = defaultMenu

    let _text = [
      before,
...Object.keys(tags).map(tag => {
        const cmds = help
.filter(menu => menu.tags.includes(tag))
.map(menu => menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix? cmd: _p + cmd)).join('\n'))
.join('\n')
        return `${header.replace(/%category/g, tags[tag])}\n${cmds}${footer}`
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

    let menuText = _text.replace(/%(\w+)/g, (_, key) => replace[key] || '')

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/7qo46s.jpg'},
      caption: menuText
}, { quoted: m})

} catch (e) {
    console.error(e)
    conn.reply(m.chat, '⚔️ Error al desplegar el menú respiratorio...', m)
}
}

handler.help = ['menu3', 'menú3']
handler.tags = ['main']
handler.command = ['menu3', 'menú3']
handler.register = false
export default handler

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000)
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
