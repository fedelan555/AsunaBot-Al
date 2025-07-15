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
  anime: '🍙𐅹 *𝖠𝗇𝗂𝗆𝖾 𝖬𝗈𝖽𝗎𝗅𝗈*',
  juegos: '🎮𐅹 *𝖩𝗎𝖾𝗀𝗈𝗌 interactivos*',
  main: '☁️𐅹 *𝖨𝗇𝗂𝖼𝗂𝗈 | Información*',
  ia: '🤖𐅹 *𝖨𝖭𝖳𝖤𝖫𝖨𝖦𝖤𝖭𝖢𝖨𝖠 Artificial*',
  search: '🔍𐅹 *𝖡𝗎𝖲𝗊𝗎𝖾𝖽𝖺𝖲 inteligentes*',
  game: '🕹️𐅹 *𝖦𝖠𝖬𝖤 challenges*',
  serbot: '🧣𐅹 *𝖲𝗎𝖻𝖡𝗈𝗍𝖲 disponibles*',
  rpg: '🗡️𐅹 *𝖱𝖯𝖦 técnicas legendarias*',
  sticker: '🫓𐅹 *𝖲𝗍𝗂𝖼𝗄𝖾𝗋𝗌 mágicos*',
  group: '🍵𐅹 *𝖦𝗋𝗎𝗉𝗈𝗌 y 𝖠𝖽𝗆𝗂𝗇*',
  nable: '🍚𐅹 *𝖬𝗈𝖽𝗈 ON / OFF*',
  premium: '💎𐅹 *𝖯𝖱𝖤𝖬𝖨𝖴𝖬 access*',
  downloader: '⬇️𐅹 *𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 content*',
  tools: '🛠️𐅹 *𝖳𝗈𝗈𝗅𝗌 útiles*',
  fun: '🍫𐅹 *𝖣𝗂𝗏𝗂𝖾𝗋𝗍𝖾𝖙𝖾*',
  nsfw: '🪼𐅹 *𝖭𝗌𝖿𝗐 restringido*',
  cmd: '🗂️𐅹 *𝖣𝖠𝖳𝖠𝖡𝖠𝖲𝖤 & comandos*',
  owner: '👑𐅹 *𝖢𝗋𝖾𝖺𝖽𝗈𝗋 & soporte*',
  audio: '🔊𐅹 *𝖠𝗎𝖽𝗂𝗈𝗌 generados*',
  advanced: '🌌𐅹 *𝖠𝗏𝖺𝗇𝖼𝖾𝗌 técnicos*',
  weather: '⛅𐅹 *𝖢𝗅𝗂𝗆𝖺 global*',
  news: '📰𐅹 *𝖭𝗈𝗍𝗂𝖼𝗂𝖺𝗌 recientes*',
  finance: '💰𐅹 *𝖥𝗂𝗇𝖺𝗇𝗓𝖺𝗌 y mercado*',
  education: '📚𐅹 *𝖤𝖽𝗎𝖼𝖺𝗇𝗈 y estudios*',
  health: '🩺𐅹 *𝖲𝖺𝗅𝗎𝗗 y bienestar*',
  entertainment: '🎭𐅹 *𝖤𝗇𝗍𝗋𝖾𝗍𝖾𝗇𝗂𝗆𝗂𝖾𝗇𝗍𝗈*',
  sports: '🏃𐅹 *𝖣𝖾𝗉𝗈𝗋𝗍𝖾𝗌 y actividad*',
  travel: '🧭𐅹 *𝖵𝗂𝖺𝗃𝖾𝗌 y destinos*',
  food: '🍱𐅹 *𝖬𝖾𝗇𝗎 & comida*',
  shopping: '🛍️𐅹 *𝖢𝗈𝗆𝗉𝗋𝖺𝗌 online*',
  productivity: '📈𐅹 *𝖣𝗂𝗌𝖼𝗂𝗉𝗅𝗂𝗇𝖺 & foco*',
  social: '💬𐅹 *𝖱𝖾𝖽𝖾𝗌 𝗌𝗈𝖼𝗂𝖺𝗅𝖾𝗌*',
  security: '🛡️𐅹 *𝖲𝖾𝗀𝗎𝗋𝗂𝖽𝖺𝗱 y control*',
  custom: '🧩𐅹 *𝖢𝗈𝗇𝖿𝗂𝗀𝗎𝗋𝖺𝖼𝗂𝗈𝗇 personal*'
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
