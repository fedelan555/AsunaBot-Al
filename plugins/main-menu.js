//  🧩 Nuevo `menu.js`
import { xpRange} from '../lib/levelling.js'

const textCyberpunk = (text) => {
  const charset = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
}
  return text.toLowerCase().split('').map(c => map[c] || c).join('')
}

let tags  = {
  main: cyberpunkText('Sistema'),
  group: cyberpunkText('Grupos'),
  serbot: cyberpunkText('Sub Bots')
}

const defaultMenu = {
  before: `*ㅤ︵⏜ᩨ︵  ⋱   ⁝  ⋰  ︵ᩨ⏜︵*

╭─────────────✦
│🍃 ᴍᴇɴᴜ - ᴛᴀɴᴊɪʀᴏ ʙᴏᴛ
╰─────────────✦

👤 Usuario: *%name*
⚔ Nivel: %level
💥 Exp: %exp/%maxexp
🌐 Modo: %mode
👥 Usuarios: %totalreg
⏳ Activo: %muptime
%readmore
`.trim(),

  sectionHeader: '\n╭──〔 %category 〕───',
  commandLine: '│➛ %cmd',
  sectionFooter: '╰───────────────',
  outro: '\n💡 Usa los botones para explorar más opciones.'
}

const handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    const name = await conn.getName(m.sender)
    const userData = global.db.data.users[m.sender]
    const { exp, level} = userData
    const { min, xp, max} = xpRange(level, global.multiplier)
    const muptime = clockString(process.uptime() * 1000)
    const totalreg = Object.keys(global.db.data.users).length
    const mode = global.opts.self? 'Privado': 'Público'

    const plugins = Object.values(global.plugins).filter(p =>!p.disabled)
    const menuMap = {}

    plugins.forEach(plugin => {
      const cmds = Array.isArray(plugin.help)? plugin.help: [plugin.help]
      const tags = Array.isArray(plugin.tags)? plugin.tags: [plugin.tags]
      tags.forEach(tag => {
        if (!menuMap[tag]) menuMap[tag] = []
        menuMap[tag].push(...cmds)
        if (!(tag in categories)) categories[tag] = cyberpunkText(tag)
})
})

    const body = Object.entries(menuMap).map(([tag, cmds]) => {
      const lines = cmds.map(cmd => menuTemplate.commandLine.replace(/%cmd/g, _p + cmd)).join('\n')
      return `${menuTemplate.sectionHeader.replace(/%category/g, categories[tag])}\n${lines}\n${menuTemplate.sectionFooter}`
}).join('\n')

    const text = [
      menuTemplate.intro,
      body,
      menuTemplate.outro
    ].join('\n').replace(/%(\w+)/g, (_, key) => ({
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      totalreg,
      mode,
      muptime,
      readmore: String.fromCharCode(8206).repeat(4001)
}[key] || ''))

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/7qo46s.jpg'},
      caption: text,
      buttons: [
        { buttonId: `${_p}owner`, buttonText: { displayText: '👑 CREADOR'}, type: 1},
        { buttonId: `${_p}grupos`, buttonText: { displayText: '🧩 GRUPOS'}, type: 1},
      ],
      viewOnce: true
}, { quoted: m})

} catch (e) {
    console.error(e)
    await conn.reply(m.chat, '❌ Error al mostrar el menú.', m)
}
}

handler.help = ['menu', 'menú']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']
handler.register = true
export default handler

function clockString(ms) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor(ms / 60000) % 60
  const s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
  }
