import { xpRange} from '../lib/levelling.js'

// Decorador de texto estilo Tanjiro
const textTanjiro = (text) => {
  const charset = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'ˣ', y: 'ʏ', z: 'ᴢ'
}
  return text.toLowerCase().split('').map(c => charset[c] || c).join('')
}

// Tags por módulo
let tags = {
  main: textTanjiro('sistema del cazador'),
  group: textTanjiro('control de dojo'),
  serbot: textTanjiro('respiraciones clones')
}

// Estructura visual del menú
const defaultMenu = {
  before: `
🌸︵‿︵‿︵‿︵‿︵‿︵
╭━━━ ☀️ ᴛᴀɴᴊɪʀᴏ - ʙᴏᴛ ☀️ ━╮
┃ ᴍᴇɴᴜ ʀᴇsᴘɪʀᴀᴄɪᴏɴ ᴅᴇʟ sᴏʟ
╰━━━━━━━━━━━━━━━━━━━━╯

👤 Usuario: *%name*
⚔ BOT: %botstatus
🌟 Exp: %exp/%maxexp
🌐 Modo: %mode
👥 Registro: %totalreg
⏳ Tiempo activo: %muptime

🌕 “Respira profundo. Lucha con honor.”%readmore`.trim(),

  header: '\n☀️╭ MOD: *%category*',
  body: '🌙 %cmd',
  footer: '╰────────────',
  after: '\n🌸 Usa los botones para más técnicas.'
}

// Función principal
let handler = async (m, { conn, usedPrefix: _p}) => {
  let { exp = 0, level = 0} = global.db.data.users[m.sender]
  let { min, xp} = xpRange(level, global.multiplier)
  let name = await conn.getName(m.sender)
  let _uptime = process.uptime() * 1000
  let muptime = clockString(_uptime)
  let totalreg = Object.keys(global.db.data.users).length
  let mode = global.opts["self"]? "Privado 🔒": "Público 🌐"
  let botstatus = (conn.user.jid === global.conn.user.jid)? '`ᴏғɪᴄɪᴀʟ 🅞`': '`ꜱᴜʙ-ʙᴏᴛ 🅢`'

  let help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
    help: Array.isArray(p.help)? p.help: [p.help],
    tags: Array.isArray(p.tags)? p.tags: [p.tags],
    prefix: 'customPrefix' in p,
    limit: p.limit,
    premium: p.premium,
    enabled:!p.disabled
}))

  for (let plugin of help) {
    for (let t of plugin.tags) {
      if (!(t in tags)) tags[t] = textTanjiro(t)
}
}

  const { before, header, body, footer, after} = defaultMenu

  let _text = [
    before,
...Object.keys(tags).map(tag => {
      const cmds = help.filter(menu => menu.tags.includes(tag))
.map(menu => menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix? cmd: _p + cmd)).join('\n'))
.join('\n')
      return `${header.replace(/%category/g, tags[tag])}\n${cmds}\n${footer}`
}),
    after
  ].join('\n')

  let replace = {
    '%': '%',
    name,
    exp: exp - min,
    maxexp: xp,
    totalreg,
    mode,
    muptime,
    readmore: String.fromCharCode(8206).repeat(4001),
    botstatus
}

  let text = _text.replace(/%(\w+)/g, (_, key) => replace[key] || '')

  // 🌀 Mensaje inicial decorado
  await conn.reply(m.chat, `
╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹*
├ ⚘݄𖠵⃕⁖𖥔.Ƈᴀʀɢᴀɴᴅᴏ, ꪶꪾ❍̵̤̂̂ꫂ
├ Ąɢᴜᴀʀᴅᴇ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ❞
╰ׁ̻─ׅׄ─۪۬─۟─۪─۟─۪۬─۟─۪─۟─۪۬─۟─۪─۟┄۪۬┄۟┄۪┈۟┈۪
`, m, {
    contextInfo: {
      forwardingScore: 2024,
      isForwarded: true,
      externalAdReply: {
        title: namechannel,
        body: '𝐃𝐞𝐯 𝐖𝐨𝐫𝐝 𝐓𝐞𝐚𝐦 𝐎𝐟𝐢𝐜𝐢𝐚𝐥',
        sourceUrl: channel,
        thumbnail: icons
}
}
})

  // 🧷 Menú completo con imagen
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/wav09n.jpg'},
    caption: text,
    buttons: [
      {
        buttonId: `${_p}reg Soygay.999`,
        buttonText: { displayText: '🌸 AUTO VERIFICAR'},
        type: 1
}
    ],
    viewOnce: true
}, { quoted: m})
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']
handler.register = false
export default handler

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000)
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
