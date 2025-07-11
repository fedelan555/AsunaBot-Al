import { generateWAMessageFromContent, prepareWAMessageMedia, proto} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

const handler = async (m, { conn}) => {
  const texto = `✨ Pulsa el botón para unirte al canal oficial`.trim()
  const imageUrl = 'https://files.catbox.moe/7qo46s.jpg'
  const imageBuffer = await (await fetch(imageUrl)).buffer()
  const media = await prepareWAMessageMedia({ image: imageBuffer}, { upload: conn.waUploadToServer})

  const messageContent = {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
},
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({ text: texto}),
          footer: proto.Message.InteractiveMessage.Footer.create({ text: '⚙ Tanjiro Bot 🌸'}),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: true,
            media: media.imageMessage
}),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: '✐ Canal oficial',
                  url: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N',
                  merchant_url: 'https://whatsapp.com/channel/0029VbAfd7zDDmFXm5adcF31'
})
}
            ]
})
})
}
}
}

  const msg = generateWAMessageFromContent(m.chat, messageContent, {
    userJid: m.sender,
    quoted: m
})

  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id})
}

handler.command = /^([.#/!])?canal$/i
handler.register = true
handler.help = ['canal']
handler.tags = ['info']

export default handler
