import { WAMessageStubType, proto} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.messageStubType ||!m.isGroup ||!m.messageStubParameters?.[0]) return

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
      id: 'Tanjiro'
},
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD
VERSION:3.0
N:;Tanjiro;;;
FN:Tanjiro
TEL;waid=${jid.split('@')[0]}:${jid.split('@')[0]}
END:VCARD`
}
},
    participant: '0@s.whatsapp.net'
}

  if (!chat.welcome) return

  const soporteBtn = {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
},
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: '🎯 ¿Deseas acceder al grupo de soporte de Tanjiro-Bot?'
}),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: '🌊 Tanjiro Bot • Espíritu del Sol'
}),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
}),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: '🎯 GP de Soporte',
                  url: 'https://chat.whatsapp.com/tu-enlace-grupo',
                  merchant_url: 'https://chat.whatsapp.com/tu-enlace-grupo'
})
}
            ]
})
})
}
}
}

  // ➕ Bienvenida
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    const bienvenida = `
🌸 *¡Bienvenido al campo de batalla, ${user}!* 🌸

🏯 *Grupo:* ${groupMetadata.subject}
👥 *Miembros ahora:* ${total}
🔥 *Respiración del Código: Primer Movimiento*

💌 Usa *#help* para desbloquear las técnicas de este dojo.
⚔️ Que tu llama nunca se apague, como la voluntad de Tanjiro.
`.trim()

    await conn.sendMini(
      m.chat,
      '🌀 UN NUEVO CAZADOR HA LLEGADO',
      '🌊 Tanjiro-Bot • Espíritu del Sol',
      bienvenida,
      img,
      img,
      null,
      contacto
)

    const msg = generateWAMessageFromContent(m.chat, soporteBtn, {})
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id})
}

  // ➖ Despedida
  if ([WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_PARTICIPANT_LEAVE].includes(m.messageStubType)) {
    const despedida = `
🍁 *${user} ha colgado su espada y se ha retirado del grupo* 🍁

🏯 *Grupo:* ${groupMetadata.subject}
👥 *Miembros restantes:* ${total}
🌒 *Último aliento registrado...*

🙏 Que tu viaje continúe con honor y propósito, como el de un pilar caído.
`.trim()

    await conn.sendMini(
      m.chat,
      '🌑 UN ESPADACHÍN HA PARTIDO',
      '🌊 Tanjiro-Bot • Guardián del Amanecer',
      despedida,
      img,
      img,
      null,
      contacto
)

    const msg = generateWAMessageFromContent(m.chat, soporteBtn, {})
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id})
}
                  }
