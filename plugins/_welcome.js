import { WAMessageStubType, proto, generateWAMessageFromContent} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata, usedPrefix: _p}) {
  if (!m.messageStubType ||!m.isGroup ||!m.messageStubParameters?.[0]) return!0

  const jid = m.messageStubParameters[0]
  const user = `@${jid.split('@')[0]}`
  const pp = await conn.profilePictureUrl(jid, 'image').catch(() =>
    'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg'
)
  const img = await fetch(pp).then(r => r.buffer())
  const chat = global.db.data.chats[m.chat] || {}
  const total = m.messageStubType == 27? participants.length + 1: participants.length - 1

  const contacto = {
    key: {
      participants: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'Halo'
},
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD
VERSION:3.0
N:;Bot;;;
FN:Bot
TEL;waid=${jid.split('@')[0]}:${jid.split('@')[0]}
END:VCARD`
}
},
    participant: '0@s.whatsapp.net'
}

  if (!chat.welcome) return

  // 🌸 Bienvenida con botón
  if (m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    const bienvenida = `
🍭 Hola, Bienvenido 👤 ${user}

📍 Grupo: ${groupMetadata.subject}
🔗 Estado: Conectado
👥 Miembros: ${total}

⌬ Usa *#help* para ver los comandos disponibles
`.trim()

    await conn.sendMini(
      m.chat,
      '🚀 CONEXIÓN ESTABLECIDA',
      'ASUNA-BOT',
      bienvenida,
      img,
      img,
      null,
      contacto
)

    // Botón MENU (solo en bienvenida)
    const menuBtn = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
},
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: '🌸 ¿Deseas abrir el Menú principal?'
}),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '🌊 Tanjiro Bot • Respira Solar'
}),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
}),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  name: 'quick_reply',
                  buttonParamsJson: JSON.stringify({
                    display_text: '🌸 MENU',
                    id: `${_p}menu`
})
}
              ]
})
})
}
}
}, {})

    await conn.relayMessage(m.chat, menuBtn.message, { messageId: menuBtn.key.id})
}

  // 🍁 Despedida sin botón
  if ([WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_PARTICIPANT_LEAVE].includes(m.messageStubType)) {
    const despedida = `
🍭 Hasta luego 👤 ${user}

📍 Grupo: ${groupMetadata.subject}
🔌 Estado: Desconectado
👥 Miembros: ${total}

⌬ Datos eliminados correctamente
`.trim()

    await conn.sendMini(
      m.chat,
      '⚠️ DESCONECTADO DEL SISTEMA',
      'ASUNA-BOT',
      despedida,
      img,
      img,
      null,
      contacto
)
}
}
