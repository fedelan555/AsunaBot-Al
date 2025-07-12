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
  const apiBase = 'https://api.siputzx.my.id/api/canvas'
  const background = encodeURIComponent('https://files.catbox.moe/7nnjg5.jpg')
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

  const dev = global.dev || 'Tanjiro Bot'
  const redes = global.redes || '🌊 Respira. Lucha. Protege.'
  const fkontak = global.fkontak || {}

  const txtWelcome = '🌀 ✦ CAZADOR INGRESANDO AL DOJO ✦'
  const txtGoodbye = '🌒 ✦ CAZADOR ABANDONA EL DOJO ✦'

  const bienvenida = `
🌸 *El amanecer ilumina tu llegada, ${mention}.* 🌸

🏯 Bienvenid@ al dojo *${groupMetadata.subject}*
🔥 Que tu respiración sea fuerte, tu voluntad inquebrantable.
👥 Somos ahora ${memberCount} cazadores en este grupo.

📘 Usa *#help* para aprender tus técnicas.
☀️ Tanjiro te honra desde el pilar solar.
`.trim()

  const despedida = `
🍁 *${mention} ha colgado su hoja Nichirin.*

🏯 Salida registrada en *${groupMetadata.subject}*
👥 Quedan ${memberCount} miembros en el dojo.

🙏 Que tu llama continúe más allá de estas puertas.
⚔️ El sol te guía, cazador.
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
          image: imgBuffer,
          caption: despedida,
          mentions: [userJid]
}, { quoted: m})
}
}
}
}
