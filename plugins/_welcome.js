import { WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.messageStubType ||!m.isGroup) return true

  const who = m.messageStubParameters[0]
  const taguser = `@${who.split('@')[0]}`
  const chat = global.db.data.chats[m.chat]
  const defaultImage = 'https://files.catbox.moe/sbzc3p.jpg'

  if (chat.welcome) {
    let img
    try {
      const pp = await conn.profilePictureUrl(who, 'image')
      img = await (await fetch(pp)).buffer()
} catch {
      img = await (await fetch(defaultImage)).buffer()
}

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      const bienvenida = `
🧣 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 | 𝖶𝖾𝗅𝖼𝗈𝗆𝖾

🎋 Usuario: ${taguser}
👥 Grupo: *${groupMetadata.subject}*

“𝖫𝖺 𝖿𝗎𝖾𝗋𝗓𝖺 𝗇𝗈 𝗇𝖺𝖼𝖾 𝖽𝖾 𝗅𝖺 𝗋𝖺𝖻𝗂𝖺, 𝗌𝗂𝗇𝗈 𝖽𝖾 𝗅𝖺 𝖽𝖾𝗍𝖾𝗋𝗆𝗂𝗇𝖺𝖼𝗂𝗈𝗇.” — Tanjiro

📘 Usa *#menu* para descubrir comandos.
🥋 Que el Dojo te fortalezca.
`.trim()

      await conn.sendMessage(m.chat, {
        image: img,
        caption: bienvenida,
        mentions: [who]
})

} else if (
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE
) {
      const despedida = `
🧣 𝖳𝖺𝗇𝗃𝗂𝗋𝗈_𝖡𝗈𝗍 | 𝖦𝗈𝗈𝖽𝖻𝗒𝖾

🍂 Usuario: ${taguser}
👥 Grupo: *${groupMetadata.subject}*

“𝖤𝗅 𝗋𝖾𝗌𝗉𝖾𝗍𝗈 𝗁𝖺𝖼𝖾 𝗊𝗎𝖾 𝗁𝗈𝗉𝗂𝗍𝖺𝗅 𝗌𝖾 𝗌𝗂𝗇𝗍𝖺 𝖼𝗈𝗆𝗈 𝗁𝗈𝗀𝖺𝗋.” — Tanjiro

🌸 Te recordaremos con cariño.
`.trim()

      await conn.sendMessage(m.chat, {
        image: img,
        caption: despedida,
        mentions: [who]
})
}
}

  return true
}
