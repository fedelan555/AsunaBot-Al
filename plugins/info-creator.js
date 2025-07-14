import { generateWAMessageFromContent, proto} from '@whiskeysockets/baileys'

let handler = async (m, { conn, usedPrefix: _p}) => {
  const username = await conn.getName(m.sender)

  const creador = {
    nombre: 'FedeLanyt',
    numero: '5491156178758',
    email: 'fedelanyt20@gmail.com',
    pais: 'Argentina',
    github: 'https://github.com/fedelan555'
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

  const mensaje = `✨ *Hola ${username}*\nEste es el contacto oficial de *${creador.nombre}*\n📬 Email: ${creador.email}\n🌐 GitHub: ${creador.github}`

  const menuBoton = generateWAMessageFromContent(m.chat, {
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

  return {
    nombre: creador.nombre,
    vcard,
    mensaje,
    menuBoton
}
}

handler.help = ['creador']
handler.tags = ['main']
handler.command = /^(owner|creator|creador|dueño)$/i

export default handler
