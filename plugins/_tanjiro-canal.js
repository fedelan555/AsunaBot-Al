import { generateWAMessageFromContent, proto} from '@whiskeysockets/baileys'

const fuenteTanjiro = (text) => {
  const map = {
    a:'𝖺', b:'𝖻', c:'𝖼', d:'𝖽', e:'𝖾', f:'𝖿', g:'𝗀',
    h:'𝗁', i:'𝗂', j:'𝗃', k:'𝗄', l:'𝗅', m:'𝗆', n:'𝗇',
    o:'𝗈', p:'𝗉', q:'𝗊', r:'𝗋', s:'𝗌', t:'𝗍', u:'𝗎',
    v:'𝗏', w:'𝗐', x:'𝗑', y:'𝗒', z:'𝗓'
}
  return text.toLowerCase().split('').map(c => map[c] || c).join('')
}

const handler = async (m, { conn}) => {
  m.react("🌸")

  const texto = `🌐 ${fuenteTanjiro('Pulsa uno de los botones para acceder a opciones exclusivas')}`

  const botones = [
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: fuenteTanjiro('✐ Canal Oficial'),
        url: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N',
        merchant_url: 'https://whatsapp.com/channel/0029VbAfd7zDDmFXm5adcF31'
})
},
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: fuenteTanjiro('💰 Donar'),
        url: 'https://buymeacoffee.com/fede.xyz',
        merchant_url: 'https://buymeacoffee.com/fede.xyz'
gitbook.io/docs'
})
}
  ]

  const messageContent = {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
},
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({ text: texto}),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: `⚙ ${fuenteTanjiro('Tanjiro Bot')} 🌸`
}),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
}),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: botones
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
