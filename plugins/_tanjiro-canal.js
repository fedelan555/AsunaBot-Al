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

  const texto = `
🌐 ${fuenteTanjiro('Pulsa uno de los botones para acceder a opciones exclusivas')}

📜 ${fuenteTanjiro('Sobre Tanjiro Bot')}

🧣 ${fuenteTanjiro('Tanjiro Bot es un sistema temático inspirado en Demon Slayer, con comandos especiales de respiraciones, combate, rol, economía, protección grupal, y secciones visuales únicas.')}
🎴 ${fuenteTanjiro('Creado por Fede.XYZ, este bot está optimizado para subbots, jugabilidad, canal oficial, comunidad e integración TikTok.')}
📆 ${fuenteTanjiro('Desde su inicio en 2023, ha evolucionado como herramienta de gestión con estética japonesa.')}`.trim()

  const botones = [
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: fuenteTanjiro('✐ Canal Oficial'),
        url: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N',
        merchant_url: 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N'
})
},
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: fuenteTanjiro('🌸 Comunidad'),
        url: 'https://chat.whatsapp.com/GgPP07cL54iL6C1lrwX0fz?mode=r_t',
        merchant_url: 'https://chat.whatsapp.com/GgPP07cL54iL6C1lrwX0fz?mode=r_t'
})
},
    {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: fuenteTanjiro('🎴 TikTok Oficial'),
        url: 'https://tiktok.com/@frases_isagi',
        merchant_url: 'https://tiktok.com/@frases_isagi'
})
},
    {
      name: 'cta_copy',
      buttonParamsJson: JSON.stringify({
        display_text: fuenteTanjiro('📝 Copiar Alias'),
        copy_code: 'fedelanyt20@gmail.com'
})
},
    {
      name: 'cta_call',
      buttonParamsJson: JSON.stringify({
        display_text: fuenteTanjiro('📞 Soporte WhatsApp'),
        phone_number: '5491156178758'
})
},
    {
      name: 'cta_email',
      buttonParamsJson: JSON.stringify({
        display_text: fuenteTanjiro('📧 Enviar Correo'),
        email_address: 'fedelanyt20@gmail.com'
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
            hasMediaAttachment: true,
            mediaAttachment: {
              url: 'https://files.catbox.moe/sbzc3p.jpg',
              mimetype: 'image/jpeg',
              caption: fuenteTanjiro('𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 - TanjiroBot Portal'),
              mediaType: 1
}
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
handler.help = ['canal', 'links2']
handler.tags = ['info']

export default handler
