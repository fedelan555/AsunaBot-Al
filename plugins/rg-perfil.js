import fs from 'fs'

const loadMarriages = () => {
  const path = './media/database/marry.json'
  if (fs.existsSync(path)) {
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'))
    global.db.data.marriages = data
} else {
    global.db.data.marriages = {}
}
}

let handler = async (m, { conn}) => {
  loadMarriages()

  let who = m.quoted?.sender || m.mentionedJid?.[0] || (m.fromMe? conn.user.jid: m.sender)
  const user = global.db.data.users[who] || {}

  const {
    registered = false,
    level = 0,
    exp = 0,
    age = 'Sin registrar',
    genre = 'No definido',
    role = 'Novato',
    description = '𝖲𝗂𝗇 𝖿𝗋𝖺𝗌𝖾 𝗉𝗈𝗋 𝖺𝗁𝗈𝗋𝖺'
} = user

  const isMarried = global.db.data.marriages?.[who]
  const partnerName = isMarried? await conn.getName(global.db.data.marriages[who]): '𝖲𝗂𝗇 𝖼𝗈𝗆𝗉𝖺ñ𝖾𝗋𝗈/a'

  const username = await conn.getName(who)
  const perfilpic = await conn.profilePictureUrl(who, 'image').catch(() => 'https://files.catbox.moe/sbzc3p.jpg')

  const mensaje = `
🌸 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 𝖯𝖾𝗋𝗋𝖿𝗂𝗅 — 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 🌸

👤 𝗡𝗈𝗆𝖻𝗋𝖾: ${username}
🎂 𝗘𝗗𝗔𝗗: ${registered? age: 'No registrada'}
📌 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗢: ${registered? '✅': '❌'}

🌕 “𝖫𝗈𝗌 𝖿𝗎𝗋𝗂𝗈𝗌𝗈𝗌 𝗋𝖾𝖼𝗂𝗇𝗍𝗈𝗌 𝗌𝖾 𝖿𝗈𝗋𝗃𝖺𝗇 𝖾𝗇 𝗅𝖺 𝖿𝖾 y 𝖾𝗅 𝗋𝖾𝗌𝗉𝖾𝗍𝗈.” — Tanjiro
`.trim()

  await conn.sendFile(m.chat, perfilpic, 'perfil.jpg', mensaje, m, { mentions: [who]})
}

handler.help = ['perfil']
handler.tags = ['rg']
handler.command = ['perfil', 'profile']
handler.register = true

export default handler
