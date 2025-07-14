import { generateWAMessageFromContent, proto} from '@whiskeysockets/baileys'

let handler = async (m, { conn}) => {
  const nombreUsuario = await conn.getName(m.sender)

  const creador = {
    nombre: 'FedeLanyt',
    numero: '5491156178758',
    email: 'fedelanyt20@gmail.com',
    github: 'https://github.com/fedelan555',
    país: 'Argentina 🇦🇷'
}

  const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${creador.nombre}
item1.TEL;waid=${creador.numero}:${creador.numero}
item1.X-ABLabel:WhatsApp
item2.EMAIL;type=INTERNET:${creador.email}
item2.X-ABLabel:Email
item3.URL:${creador.github}
item3.X-ABLabel:GitHub
item4.ADR:;;${creador.país};;;;
item4.X-ABLabel:Ubicación
END:VCARD`.trim()

  const mensaje = `
👋 *Hola ${nombreUsuario}*
Este es el contacto oficial del creador del bot:

👤 Nombre: ${creador.nombre}
📬 Email: ${creador.email}
🌐 GitHub: ${creador.github}
🌍 País: ${creador.país}

Gracias por confiar en Tanjiro BOT ⚔️🌸
`.trim()

  const botonTanjiro = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: '¿Quieres abrir el menú principal?'
}),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Tanjiro BOT • Espíritu Noble'
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
                  id: 'menu' // Sin prefijo
})
}
            ]
})
})
}
}
}, {})

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: '📇 Creador del Bot',
      contacts: [{ displayName: creador.nombre, vcard}]
}
}, { quoted: m})

  await conn.sendMessage(m.chat, { text: mensaje}, { quoted: m})
  await conn.relayMessage(m.chat, botonTanjiro.message, { messageId: botonTanjiro.key.id})
}

handler.help = ['creador']
handler.tags = ['main']
handler.command = ['creador', 'owner', 'creator', 'dueño']
handler.customPrefix = /^creador$|^owner$|^creator$|^dueño$/i
handler.register = false
handler.owner = false
handler.limit = false

export default handler
