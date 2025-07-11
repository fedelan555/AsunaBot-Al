import { generateWAMessageFromContent, proto} from '@whiskeysockets/baileys'

let handler = async (m, { conn, usedPrefix: _p}) => {
  const text = `*🌸 TANJIRO-BOT BY FEDE*

_________________________________

[1] https://anime-xi-wheat.vercel.app/api/pinterest?q=
> Pinterest: Buscador de imágenes en Pinterest.


🔒 *Nota:* Usa estas APIs con precaución. No hagas spam de peticiones.
`.trim()

  const messageContent = {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
},
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({ text}),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Pikachu Bot by Deylin'
}),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
}),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                  display_text: '👑 CREADOR',
                  id: `${_p}owner`
})
}
            ]
})
})
}
}
}

  const msg = generateWAMessageFromContent(m.chat, messageContent, {})
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id})
}

handler.command = ['mod', 'Mod', 'servicios']
handler.tags = ['main']
handler.help = ['mod', 'servicios']
handler.register = true

export default handler
