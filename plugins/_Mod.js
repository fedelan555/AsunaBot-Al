import { generateWAMessageFromContent, proto} from '@whiskeysockets/baileys'

let handler = async (m, { conn, usedPrefix: _p}) => {
  const text = `*🔧 APIs desarrolladas por Deylin*

_________________________________

[1] https://anime-xi-wheat.vercel.app/api/pinterest?q=
> Pinterest: Buscador de imágenes en Pinterest.

[2] https://anime-xi-wheat.vercel.app/api/ia-img?prompt=
> Generador de imágenes con IA.

[3] https://g-mini-ia.vercel.app/api/gemini
> Gemini IA: Responde preguntas, analiza imágenes y genera contenido visual.

[4] https://mode-ia.onrender.com/mode-ia?prompt=
> Mode-IA: Inteligencia artificial para responder preguntas en formato texto.

[5] https://ytumode-api.vercel.app/api/search?q=
> Buscador de contenido en YouTube.

[6] https://mode-api-sigma.vercel.app/api/mp3?url=
> Descarga de audio desde YouTube.

[7] https://mode-api-sigma.vercel.app/api/mp4?url=
> Descarga de video desde YouTube.

[8] https://g-mini-ia.vercel.app/api/meme
> Buscador de memes aleatorios.

[9] https://g-mini-ia.vercel.app/api/infonumero?numero=
> Información de un número: país y bandera (para welcome y tagall).

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
