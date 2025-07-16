import { WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.isGroup ||!m.messageStubType) return true
  const stubParams = m.messageStubParameters || []
  if (!Array.isArray(stubParams) || stubParams.length === 0) return true

  const userJid = stubParams[0]
  if (!userJid) return true
  const username = userJid.split('@')[0]
  const mention = '@' + username

  let memberCount = groupMetadata.participants?.length || participants.length || 0
  if (m.messageStubType == 27) memberCount++
  if (m.messageStubType == 28 || m.messageStubType == 32) memberCount = Math.max(0, memberCount - 1)

  let avatar
  try {
    avatar = await conn.profilePictureUrl(userJid, 'image')
} catch {
    avatar = 'https://files.catbox.moe/emwtzj.png'
}

  const guildName = encodeURIComponent(groupMetadata.subject)
  const background = encodeURIComponent('https://files.catbox.moe/23ebz8.jpg')
  const apiBase = 'https://api.siputzx.my.id/api/canvas'
  const welcomeApiUrl = `${apiBase}/welcomev2?username=${username}&guildName=${guildName}&memberCount=${memberCount}&avatar=${encodeURIComponent(avatar)}&background=${background}`
  const goodbyeApiUrl = `${apiBase}/goodbyev2?username=${username}&guildName=${guildName}&memberCount=${memberCount}&avatar=${encodeURIComponent(avatar)}&background=${background}`

  async function fetchImage(url, fallback) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Error imagen')
      return await res.buffer()
} catch {
      const fallbackRes = await fetch(fallback)
      return await fallbackRes.buffer()
}
}

  const chat = global.db.data.chats[m.chat] || {}
  if (typeof chat.welcome === 'undefined') chat.welcome = true

  const dev = global.dev || 'TanjiroBot'
  const redes = global.redes || '🌊 Respira. Lucha. Protege.'
  const fkontak = global.fkontak || {}

  const txtWelcome = '≡ 会 🧣𝖢𝖠𝖹𝖠𝖣𝖮𝖱 𝖨𝖭𝖦𝖱𝖤𝖲𝖠 𝖠𝖫 𝖣𝖮𝖩𝖮 🧣 ≡ 会'
  const txtGoodbye = '≡ 会 🧣𝖢𝖠𝖹𝖠𝖣𝖮𝖱 𝖠𝖡𝖠𝖭𝖣𝖮𝖭𝖠 𝖤𝖫 𝖣𝖮𝖩𝖮 🧣 ≡ 会'

  const bienvenida = `
🧣︵˚˖𓆩⌇𓆪˖˚︵🌸︵˚˖𓆩⌇𓆪˖˚︵🧣
🌸 *𝖤𝗅 𝖺𝗆𝖺𝗇𝖾𝖼𝖾𝗋 𝗂𝗅𝗎𝗆𝗂𝗇𝖺 𝗍𝗎 𝗅𝗅𝖾𝗀𝖺𝖽𝖺, ${mention}* 🌸

🏯 𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝗈 𝖺𝗅 𝖽𝗈𝗃𝗈 *${groupMetadata.subject}*
🔥 𝖰𝗎𝖾 𝗍𝗎 𝗋𝖾𝗌𝗉𝗂𝗋𝖺𝖼𝗂𝗈𝗇 𝗌𝖾𝖺 𝖿𝗎𝖾𝗋𝗍𝖾, 𝗍𝗎 𝗏𝗈𝗅𝗎𝗇𝗍𝖺𝖽 𝗂𝗇𝗊𝗎𝖾𝖻𝗋𝖺𝗇𝗍𝖺𝖻𝗅𝖾.
👥 𝖲𝗈𝗆𝗈𝗌 𝗆𝗎𝖼𝗁𝗈𝗌: ${memberCount} 𝖢𝖺𝗓𝖺𝖽𝗈𝗋𝖾𝗌 𝖾𝗇 𝖾𝗌𝗍𝖾 𝖣𝗈𝗃𝗈.

📘 Usa *#help* 𝗉𝖺𝗋𝖺 𝖺𝗉𝗋𝖾𝗇𝖽𝖾𝗋 𝗍𝗎𝗌 𝗍𝖾𝖼𝗇𝗂𝖼𝖺𝗌.
`.trim()

  const despedida = `
🧣︵˚˖𓆩⌇𓆪˖˚︵🌒︵˚˖𓆩⌇𓆪˖˚︵🧣
🍁 *${mention} 𝗁𝖺 𝖼𝗈𝗅𝗀𝖺𝖽𝗈 𝗌𝗎 𝗁𝗈𝗃𝖺 𝖭𝗂𝖼𝗁𝗂𝗋𝗂𝗇.*

🏯 𝖲𝖺𝗅𝗂𝖽𝖺 𝖱𝖾𝗀𝗂𝗌𝗍𝗋𝖺𝖽𝖺 𝖾𝗇 *${groupMetadata.subject}*
👥 𝖰𝗎𝖾𝖽𝖺𝗇 ${memberCount} 𝖢𝖺𝗓𝖺𝖽𝗈𝗋𝖾𝗌 𝗍𝗋𝖺𝗌 𝗌𝗎 𝗂𝗆𝗉𝖺𝗄𝗍𝗈.

🙏 𝖰𝗎𝖾 𝗍𝗎 𝗅𝗅𝖺𝗆𝖺 𝖼𝗈𝗇𝗍𝗂𝗇𝗎𝖾 𝗆𝖺𝗌 𝖺𝗅𝗅á 𝖽𝖾 𝖾𝗌𝗍𝖺𝗌 𝗉𝗎𝖾𝗋𝗍𝖺𝗌.
⚔️ 𝖤𝗅 𝗌𝗈𝗅 𝗍𝖾 𝗀𝗎𝗂𝖺, 𝖼𝖺𝗓𝖺𝖽𝗈𝗋.
`.trim()

  if (chat.welcome) {
    if (m.messageStubType == 27) {
      const imgBuffer = await fetchImage(welcomeApiUrl, avatar)
      try {
        await conn.sendMini?.(m.chat, txtWelcome, dev, bienvenida, imgBuffer, imgBuffer, redes, fkontak)
} catch {
        await conn.sendMessage(m.chat, {
          image: imgBuffer,
          caption: bienvenida,
          mentions: [userJid]
}, { quoted: m})
}
}

    if (m.messageStubType == 28 || m.messageStubType == 32) {
      const imgBuffer = await fetchImage(goodbyeApiUrl, avatar)
      try {
        await conn.sendMini?.(m.chat, txtGoodbye, dev, despedida, imgBuffer, imgBuffer, redes, fkontak)
} catch {
        await conn.sendMessage(m.chat, {
          image: imgBuffer,caption: despedida,
          mentions: [userJid]
}, { quoted: m})
}
}
}
}
