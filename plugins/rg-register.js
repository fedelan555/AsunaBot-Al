import { createHash} from 'crypto'
import { xpRange} from '../lib/levelling.js'

const grupoNotificacion = '120363422310535661@g.us' // Grupo de notificación estilo Tanjiro

let handler = async (m, { conn, text, usedPrefix, command}) => {
  let user = global.db.data.users[m.sender]
  if (user.registered) return m.reply(`🌸 Ya estás registrado.\nUsa *${usedPrefix}unreg* para comenzar de nuevo.`)

  let match = /\|?(.*)([.|] *?)([0-9]*)$/i
  if (!match.test(text)) return m.reply(`🌸 Formato inválido.\n📌 Ejemplo: *${usedPrefix + command} Tanjiro.16*`)

  let [_, name, __, age] = text.match(match)
  if (!name ||!age) return m.reply('🌸 Debes ingresar nombre y edad válidos.')
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

  let regbot = `
╭─ׅ─ׅ┈─๋︩︪──ׅ─ׅ┈─๋︩︪╮
     🌸 *REGISTRADO/A EN TANJIRO-BOT* 🌸
┃ 🗂️ *Nombre:* ${user.name}
┃ 🎂 *Edad:* ${user.age} años
┃ 📜 *ID de Cazador:* ${sn}
╰───────────────────────────╯

✨ Usa *#perfil* para ver tu progreso
📨 Puedes ver tu registro aquí:
🔗 https://chat.whatsapp.com/KiaWNR6YqUp3KeXoeMP7qO
🍃 *“Respira profundo. Lucha con honor.”*
`

  await m.react('📩')

  await conn.sendMessage(m.chat, {
    text: regbot,
    contextInfo: {
      externalAdReply: {
        title: '🌸 Registro exitoso en Tanjiro-Bot',
        body: '¡Bienvenido al Dojo del Sol!',
        thumbnailUrl: 'https://files.catbox.moe/wav09n.jpg',
        sourceUrl: 'https://chat.whatsapp.com/KiaWNR6YqUp3KeXoeMP7qO',
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m})

  let notificacion = `
🌀 *Registro detectado en Tanjiro-Bot*

👤 Usuario: ${m.pushName}
🆔 Número: ${m.sender}
🌸 Nombre: ${user.name}
🎂 Edad: ${user.age}
🗂 ID: ${sn}
📌 Registro visible en: https://chat.whatsapp.com/KiaWNR6YqUp3KeXoeMP7qO
`

  await conn.sendMessage(grupoNotificacion, {
    text: notificacion,
    contextInfo: {
      externalAdReply: {
        title: '🔖 Tanjiro-Bot | Registro de Cazador',
        body: 'Registro automático del Dojo',
        thumbnailUrl: 'https://files.catbox.moe/xr2m6u.jpg',
        sourceUrl: 'https://chat.whatsapp.com/KiaWNR6YqUp3KeXoeMP7qO',
        mediaType: 1
}
}
}, { quoted: null})
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']
export default handler
