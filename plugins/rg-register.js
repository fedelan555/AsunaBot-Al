import { createHash} from 'crypto'

const grupoNotificacion = '120363422310535661@g.us'

function generarID(sender) {
  return createHash('md5').update(sender).digest('hex')
}

let handler = async (m, { conn, text, usedPrefix, command}) => {
  let user = global.db.data.users[m.sender]
  if (user.registered) return m.reply(`🌸 Ya estás registrado.\nUsa *${usedPrefix}unreg* para reiniciar.`)

  let match = /\|?(.*)([.|] *?)([0-9]*)$/i
  let [_, name, __, age] = text.match(match) || []

  if (!name ||!age) return m.reply(`🌸 Formato inválido.\nEjemplo: *${usedPrefix + command} Tanjiro.16*`)
  age = parseInt(age)
  if (isNaN(age) || age < 5 || age> 100) return m.reply('🌸 Ingresa una edad válida (5-100 años).')

  user.name = name.trim()
  user.age = age
  user.regTime = Date.now()
  user.registered = true
  user.exp += 300

  const sn = generarID(m.sender)

  const mensaje = `
🌸 *Registro exitoso en TanjiroBot* 🌸

🗂️ Nombre: ${user.name}
🎂 Edad: ${user.age}
🧣 ID de Cazador: ${sn}

Usa *#perfil* para ver tu progreso.
`.trim()

  await m.react('✅')

  await conn.sendMessage(m.chat, {
    text: mensaje,
    contextInfo: {
      externalAdReply: {
        title: '🌸 TanjiroBot | Registro exitoso',
        body: 'Bienvenido al Dojo del Sol',
        thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
        sourceUrl: 'https://chat.whatsapp.com/KiaWNR6YqUp3KeXoeMP7qO',
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m})

  const noti = `
🌀 Registro nuevo en TanjiroBot

👤 Usuario: ${m.pushName}
🆔 Número: ${m.sender}
🧣 Nombre: ${user.name}
🎂 Edad: ${user.age}
🗂 ID: ${sn}
`

  await conn.sendMessage(grupoNotificacion, { text: noti})
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['register', 'reg', 'registrar']
export default handler
