import got from "got"
import moment from "moment-timezone"

const fancyFont = (text) => {
  const map = {
    a:'𝖺', b:'𝖻', c:'𝖼', d:'𝖽', e:'𝖾', f:'𝖿', g:'𝗀',
    h:'𝗁', i:'𝗂', j:'𝗃', k:'𝗄', l:'𝗅', m:'𝗆', n:'𝗇',
    o:'𝗈', p:'𝗉', q:'𝗊', r:'𝗋', s:'𝗌', t:'𝗍', u:'𝗎',
    v:'𝗏', w:'𝗐', x:'𝗑', y:'𝗒', z:'𝗓'
}
  return text.toLowerCase().split('').map(l => map[l] || l).join('')
}

let handler = async (m, { conn}) => {
  m.react("🌸")

  const senderId = m.sender
  const userNumber = senderId.split("@")[0]
  const userName = await conn.getName(senderId)
  const time = moment().tz("America/Mexico_City")
  const formattedDate = time.format("dddd, D [de] MMMM YYYY")
  const formattedTime = time.format("hh:mm A")
  const saludo = ucapan()

  if (!global.menutext) await global.menu()

  const header = `
🧣︵˚𓆩⌇ TanjiroBot Subbot Panel ⌇𓆪˖˚︵🌸
╭───〔 ${fancyFont('Menú 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 de Subbots')} 〕───⬣
┃ 🧑‍💻 Usuario: ${userName}
┃ 📱 Número: +${userNumber}
┃ 📆 Fecha: ${formattedDate}
┃ ⏰ Hora: ${formattedTime}
┃ 💬 Saludo: ${saludo}
╰────────────────────────⬣\n`

  const footer = `
╭───〔 ${fancyFont('𝖠𝗎𝗍𝗈𝗋')} 〕───⬣
┃ 🧧 Nombre: *Tanjiro Project*
┃ 🌐 WhatsApp: wa.me/573162402768
╰────────────────────────⬣`

  const txt = header + global.menutext + footer
  const mention = [m.sender]

  try {
    const imageURL = "https://qu.ax/RkiEC.jpg"
    const imgBuffer = await got(imageURL).buffer()

    await conn.sendMessage(
      m.chat,
      {
        document: imgBuffer,
        fileName: `${fancyFont('TanjiroBot - Menú Subbots')}.pdf`,
        mimetype: 'application/pdf',
        caption: txt,
        fileLength: 99999999,
        contextInfo: {
          mentionedJid: mention,
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: `${fancyFont('𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅')} 🌸 TanjiroBot`,
            body: "Panel visual para cazadores subbot",
            thumbnail: imgBuffer,
            sourceUrl: "",
            mediaType: 1,
            renderLargerThumbnail: true
}
}
},
      { quoted: m}
)
} catch (e) {
    console.error(e)
    conn.reply(m.chat, txt, m, { mentions: mention})
    conn.reply(m.chat, "⚠️ Error al enviar el menú: " + e, m)
}
}

handler.command = /^menusub|sub|helpsuv|comandos|commands|\?$/i
export default handler

function ucapan() {
  const hour = moment().tz("America/Los_Angeles").format("HH")
  if (hour>= 18) return "🌙 Buenas noches"
  if (hour>= 12) return "🌞 Buenas tardes"
  return "🌅 Buenos días"
}

global.menu = async function getMenu() {
  let text = ""
  const help = Object.values(global.plugins)
.filter(plugin =>!plugin.disabled)
.map(plugin => ({
      help: Array.isArray(plugin.help)? plugin.help.filter(Boolean): [],
      tags: Array.isArray(plugin.tags)? plugin.tags.filter(Boolean): []
}))

  const icons = {
    tools: "🛠", fun: "🎲", game: "🎮", admin: "🛡",
    sticker: "🎨", group: "👥", internet: "🌐", download: "📥",
    anime: "🍙", roleplay: "🎭", subbots: "🌸", default: "📂"
}

  const tags = {}
  for (const plugin of help) {
    for (const tag of plugin.tags || []) {
      if (tag) tags[tag] = fancyFont(tag)
}
}

  for (const category of Object.keys(tags)) {
    const commands = help
.filter(menu => menu.tags?.includes(category))
.flatMap(menu => menu.help)
.filter(cmd => typeof cmd === "string" && cmd.trim())

    if (commands.length) {
      const icon = icons[category] || icons.default
      text += `╭──〔 ${icon} ${tags[category]} 〕──⬣\n`
      text += commands.map(cmd => `┃ ⤷ ${cmd}`).join("\n")
      text += `\n╰──────────────────────⬣\n\n`
}
}

  global.menutext = text
        }
