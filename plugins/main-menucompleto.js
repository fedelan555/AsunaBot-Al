import { xpRange} from '../lib/levelling.js'

const defaultMenu = {
  before: `                                ㅤׅ ︵፝֟⏜ᩨ︵ ⋱ ⁝ ׄ ⋰ ︵ᩨ⏜︵፝֟ ׅ

✿𝆬    *𝖧𝗈𝗅𝖺 \`%name\` 𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽@* ☕ ᪲
☕ ᪲  *𝖠𝗅 𝗆𝖾𝗇𝗎 𝖽𝖾 𝖳𝖺𝗇𝗃𝗂𝗋𝗈 𝖡𝗈𝗍* ✿𝆬
ス  *𝖼𝗋𝖾𝖺𝖽𝗈 𝗉𝗈𝗋 ꒰ 𝖨𝗓𝗎𝗆𝗂-𝗄𝗓𝗑 ꒱* 🍮

🍡 *𝖠𝖼𝗍𝗂𝗏𝖺 ➫* _\`[ %muptime ]\`_
🍙 *𝖯𝖺𝗂𝗌 ➫* _\`[ %userNationality ]\`_
🍫 *𝖯𝗋𝖾𝖿𝗂𝗃𝗈 ➫* _\`< %_p>\`_
🍩 *𝖴𝗌𝗎𝖺𝗋𝗂𝗈𝗌 ➫* _\`[ %totalreg ]\`_
🍜 *𝖢𝗈𝗆𝖺𝗇𝖽𝗈𝗌 ➫* _\`[ %totalf ]\`_
%readmore`.trimStart(),

  header: '%category\n',
  body: 'ര ׄ %emoji ׅ %cmd %iscorazones %isPremium',
  footer: '\n',
  after: ''
}

const tags = {
  main: '☁️𐅹 *𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅*',
  info: '🍮𐅹 *𝖨𝗇𝖿𝗈 del 𝖡𝗈𝗍*',
  group: '🍵𐅹 *𝖦𝗋𝗎𝗉𝗈𝗌 y 𝖠𝖽𝗆𝗂𝗇*',
  serbot: '🧣𐅹 *𝖲𝗎𝖻𝗕𝗈𝗍𝖲 disponibles*',
  tools: '🛠️𐅹 *𝖳𝗈𝗈𝗅𝗌 útiles*',
  sticker: '🫓𐅹 *𝖲𝗍𝗂𝖼𝗄𝖾𝗋𝗌 mágicos*',
  search: '🔍𐅹 *𝖡𝗎𝖲𝗊𝗎𝖾𝖽𝖺𝖲*',
  rpg: '🗡️𐅹 *𝖱𝖯𝖦 técnicas*',
  anime: '🍙𐅹 *𝖠𝗇𝗂𝗆𝖾 𝖬𝗈𝖽𝗎𝗅𝗈*',
  fun: '🍫𐅹 *𝖣𝗂𝗏𝗂𝖾𝗋𝗍𝖾𝖙𝖾*',
  nsfw: '🪼𐅹 *𝖬𝖺𝗍𝖾𝗋𝗂𝖺𝗅 restringido*',
  owner: '👑𐅹 *𝖢𝗋𝗂𝗌𝖾𝗌 y soporte*'
}

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    let { exp = 0, level = 0} = global.db.data.users[m.sender]
    let { min, xp} = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let muptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalf = Object.keys(global.plugins).length
    let userNationality = 'Argentina' // Puedes usar PhoneNumber para calcular

    const help = Object.values(global.plugins)
.filter(p =>!p.disabled)
.map(p => ({
        help: Array.isArray(p.help)? p.help: [p.help],
        tags: Array.isArray(p.tags)? p.tags: [p.tags],
        prefix: 'customPrefix' in p,
        limit: p.limit,
        premium: p.premium
}))

    const replace = {
      '%': '%',
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      muptime,
      _p,
      userNationality,
      totalreg,
      totalf,
      readmore: String.fromCharCode(8206).repeat(4001)
}

    const { before, header, body, footer, after} = defaultMenu

    let menuText = [
      before,
...Object.keys(tags).map(tag => {
        const comandos = help
.filter(menu => menu.tags.includes(tag))
.map(menu =>
            menu.help.map(cmd => body
.replace(/%cmd/g, _p + cmd)
.replace(/%emoji/g, (tags[tag].match(/[\p{Emoji}]/gu) || [''])[0])
.replace(/%iscorazones/g, menu.limit? '💖': '')
.replace(/%isPremium/g, menu.premium? '🌟': '')
).join('\n')
).join('\n')
        return `${header.replace(/%category/g, tags[tag])}\n${comandos}\n${footer}`
}),
      after
    ].join('\n').replace(/%(\w+)/g, (_, key) => replace[key] || '')

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/wav09n.jpg'},
      caption: menuText,
      buttons: [
        { buttonId: `${_p}info`, buttonText: { displayText: '🌸 INFO CAZADOR'}, type: 1}
      ],
      viewOnce: true
}, { quoted: m})

} catch (e) {
    console.error('[✗] Error al mostrar menú completo:', e)
    conn.reply(m.chat, '⚠️ Algo falló al desplegar el menú.', m)
}
}

handler.help = ['menu', 'menutanjiro', 'help']
handler.tags = ['main']
handler.command = ['menu', 'menutanjiro', 'menucompleto']
export default handler

function clockString(ms) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor(ms / 60000) % 60
const s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
