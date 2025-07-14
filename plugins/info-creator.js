import fetch from 'node-fetch'
import { generateWAMessageFromContent, proto} from '@whiskeysockets/baileys'

let handler = async (m, { conn, usedPrefix: _p}) => {
  await m.react('👤')

  const username = await conn.getName(m.sender)

  const creador = {
    nombre: 'Fedexyz',
    numero: '5491156178758',
    email: 'fedelanyt20@gmail.com',
    pais: 'Argentina',
    github: 'https://github.com/fedelan555',
    imagen: 'https://files.catbox.moe/sbzc3p.jpg', // Imagen del perfil del creador
    tiktok: '@frases_isagi'
}

  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${creador.nombre}
item1.TEL;waid=${creador.numero}:${creador.numero}
item1.X-ABLabel:WhatsApp
item2.EMAIL;type=INTERNET:${creador.email}
item2.X-ABLabel:Email
item3.URL:${creador.github}
item3.X-ABLabel:GitHub
item4.ADR:;;${creador.pais};;;;
item4.X-ABLabel:Ubicación
END:VCARD`

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: '📇 Creador del Bot',
      contacts: [{ displayName: creador.nombre, vcard}]
}
}, { quoted: m})

  const mensaje = `
✨ *Hola ${username}*
Este es el contacto oficial de *${creador.nombre}*, creador del bot.

📬 Email: ${creador.email}
🎵 TikTok: ${creador.tiktok}
🌐 GitHub: ${creador.github}
🌍 País: ${creador.pais}
📞 Número: wa.me/${creador.numero}
`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: creador.imagen},
    caption: mensaje
}, { quoted: m})

  // Botón interactivo tipo quick_reply
  const menuButton = generateWAMessageFromContent(m.chat, {
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
            text: '🌊 Tanjiro Bot • Espíritu Solar'
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

  await conn.relayMessage(m.chat, menuButton.message, { messageId: menuButton.key.id})
}

handler.help = ['creador']
handler.tags = ['main']
handler.command = /^(owner|creator|creador|dueño)$/i

export default handler
