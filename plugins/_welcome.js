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
      let pp = await conn.profilePictureUrl(who, 'image')
      img = await (await fetch(pp)).buffer()
} catch {
      img = await (await fetch(defaultImage)).buffer()
}

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      const bienvenida = `
🌸 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot 🌸

🧣 Bienvenido/a ${taguser}
📍 Grupo: *${groupMetadata.subject}*

“𝖫𝖺 𝖿𝗈𝗋𝗍𝖺𝗅𝖾𝗓𝖺 𝗇𝗈 𝗇𝖺𝖼𝖾 𝖽𝖾 𝗅𝖺 𝗋𝖺𝖻𝗂𝖺, 𝗌𝗂𝗇𝗈 𝖽𝖾 𝗅𝖺 𝖽𝖾𝗍𝖾𝗋𝗆𝗂𝗇𝖺𝖼𝗂𝗈𝗇.” — Tanjiro

📘 Usa *#menu* para descubrir comandos.
🧘 Respira profundo y sigue tu camino en el grupo.
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
🌸 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot 🌸

🧣 ${taguser} ha dejado *${groupMetadata.subject}*

“𝖤𝗅 𝗈𝗋𝗀𝗎𝗅𝗅𝗈 𝗇𝗈 𝗍𝖾 𝗌𝗈𝗌𝗍𝖾𝗇𝗍𝖺. 𝖤𝗅 𝗋𝖾𝗌𝗉𝖾𝗍𝗈 𝗌𝗂.” — Tanjiro

🍃 Gracias por compartir tu energía. Si vuelves, el Dojo te espera.
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
