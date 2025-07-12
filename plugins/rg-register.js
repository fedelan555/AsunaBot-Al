import { createHash} from 'crypto'
import { xpRange} from '../lib/levelling.js'

const grupoNotificacion = '120363422310535661@g.us' // Grupo destino

let handler = async (m, { conn, text, usedPrefix, command}) => {
  let user = global.db.data.users[m.sender]
  if (user.registered) return m.reply(`Ya estás registrado. Usa *${usedPrefix}unreg* para anular tu registro.`)

  let nameMatch = /\|?(.*)([.|] *?)([0-9]*)$/i
  if (!nameMatch.test(text)) return m.reply(`Formato incorrecto\nEjemplo: *${usedPrefix + command} John.20*`)

  let [_, name, __, age] = text.match(nameMatch)
  if (!name ||!age) return m.reply('Nombre o edad inválidos.')
  age = parseInt(age)
  if (age < 5 || age> 1000) return m.reply('Edad fuera de rango.')

  user.name = name.trim()
  user.age = age
  user.regTime = +new Date
  user.registered = true
  user.money += 600
  user.exp += 245
  user.estrellas += 10
  user.joincount += 5

  let sn = createHash('md5').update(m.sender).digest('hex')
  let regbot = `╭─✦ Registro Completado ✦\n│\n├ 👤 Nombre: *${name}*\n├ 🎂 Edad: *${age} años*\n│\n╰ Usa *#perfil* para ver tu registro`

  await m.react('📩')

  await conn.sendMessage(m.chat, {
    text: regbot,
    contextInfo: {
      externalAdReply: {
        title: '✧ Registro Completado ✧',
        body: '¡Únete al grupo oficial!',
        thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
        sourceUrl: 'https://chat.whatsapp.com/GHhOeix2sTY32wIO85pNgd',
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m})

  // Notificación al grupo principal
  let registro = `
📥 *Nuevo Registro Detectado*

👤 Usuario: ${m.pushName}
🆔 Número: ${m.sender}
🌟 Nombre: ${user.name}
🎂 Edad: ${user.age}
🔒 ID registro: ${sn}
`
  await conn.sendMessage(grupoNotificacion, {
    text: registro,
    contextInfo: {
      externalAdReply: {
        title: '📋 Registro de Usuario',
        body: 'Notificación automática',
        thumbnailUrl: 'https://files.catbox.moe/xr2m6u.jpg',
        sourceUrl: 'https://chat.whatsapp.com/GHhOeix2sTY32wIO85pNgd',
        mediaType: 1
}
}
}, { quoted: null})
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']
export default handler
