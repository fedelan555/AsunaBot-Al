import { createHash} from 'crypto'
import { xpRange} from '../lib/levelling.js'

const grupoNotificacion = '120363422310535661@g.us' // Grupo de notificación estilo Tanjiro

let handler = async (m, { conn, text, usedPrefix, command}) => {
  let user = global.db.data.users[m.sender]
  if (user.registered) return m.reply(`🌸 Ya te encuentras registrado.\nUsa *${usedPrefix}unreg* para eliminar tu registro si deseas volver a empezar.`)

  let match = /\|?(.*)([.|] *?)([0-9]*)$/i
  if (!match.test(text)) return m.reply(`🌸 Formato incorrecto\n📌 Ejemplo: *${usedPrefix + command} Tanjiro.16*`)

  let [_, name, __, age] = text.match(match)
  if (!name ||!age) return m.reply('🌸 Debes ingresar un nombre y edad válidos.')
  age = parseInt(age)
  if (age < 5 || age> 1000) return m.reply('🌸 La edad ingresada no es válida.')

  user.name = name.trim()
  user.age = age
  user.regTime = +new Date
  user.registered = true
  user.money += 600
  user.exp += 245
  user.estrellas += 10
  user.joincount += 5

  let sn = createHash('md5').update(m.sender).digest('hex')

  // 🧧 Mensaje épico estilo Tanjiro
  let regbot = `
╭─ׅ─ׅ┈─๋︩︪──ׅ─ׅ┈─๋︩︪╮
     🌸 *REGISTRADO/A EN TANJIRO-BOT* 🌸
┃
┃ 🗂️ *Nombre:* ${user.name}
┃ 🎂 *Edad:* ${user.age} años
┃ 📜 *ID de Cazador:* ${sn}

┃🌙 *ve tu registro aquí:* https://chat.whatsapp.com/KiaWNR6YqUp3KeXoeMP7qO
╰──────────────────────────╯

✨ Usa el comando *#perfil* para ver tu progreso
🍃 Recuerda: *"Respira profundo. Lucha con honor."*
`

  await m.react('📩') // Confirmación de registro

  await conn.sendMessage(m.chat, {
    text: regbot,
    contextInfo: {
      externalAdReply: {
        title: '🌸 Registro exitoso en Tanjiro-Bot',
        body: '¡Bienvenido al Dojo del Sol!',
        thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
        sourceUrl: 'https://chat.whatsapp.com/GHhOeix2sTY32wIO85pNgd',
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m})

  // 📢 Notificación al grupo de cazadores
  let notificacion = `
🌀 *Registro detectado en Tanjiro-Bot*

👤 Usuario: ${m.pushName}
🆔 Número: ${m.sender}
🌸 Nombre: ${user.name}
🎂 Edad: ${user.age}
🗂 ID: ${sn}
🔔 Evento: Nuevo cazador registrado
`
  await conn.sendMessage(grupoNotificacion, {
    text: notificacion,
    contextInfo: {
      externalAdReply: {
        title: '🔖 Tanjiro-Bot | Registro de Cazador',
        body: '📍 Registro automático del Dojo',
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
