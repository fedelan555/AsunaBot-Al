import { generateWAMessageFromContent, prepareWAMessageMedia, proto} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

  const media = await prepareWAMessageMedia({ image: imageBuffer}, { upload: conn.waUploadToServer})

  const texto = `
🌸 *¡Bienvenido al canal oficial de Tanjiro-Bot!* 🌸

✨ Aquí encontrarás actualizaciones, comandos legendarios y anuncios de los pilares.
📜 Noticias sobre módulos nuevos, eventos, plugins e ideas del dojo.

🧩 Únete al canal para:
• Conocer las nuevas respiraciones
• Recibir actualizaciones antes que nadie
• Conectar con otros cazadores del código

🗡️ Pulsa el botón para adentrarte en el canal secreto del Sol.

*Frase del día:* _“Un cazador que protege con pasión, nunca se rinde.”_
`.trim()

  const messageContent = {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
},
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({ text: texto}),
          footer: proto.Message.InteractiveMessage.Footer.create({ text: '⚙ Tanjiro Bot • Espíritu del Sol'}),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: true,
            media: media.imageMessage
}),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: '✐ Canal Oficial',
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
