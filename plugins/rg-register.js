import { createHash} from 'crypto'

const Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async (m, { conn, text, usedPrefix, command}) => {
  const user = global.db.data.users[m.sender]
  const name2 = await conn.getName(m.sender)
  const perfilPic = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://files.catbox.moe/xr2m6u.jpg')

  // Registro duplicado
  if (user.registered)
    return m.reply(`⚔️ *Ya estás registrado, espadachín.*\n\n¿Deseas renacer como cazador?\nUsa *${usedPrefix}unreg* para borrar tu registro.`)

  // Validación de entrada
  if (!Reg.test(text))
    return m.reply(`⚠️ Formato inválido.\nUsa: *${usedPrefix + command} nombre.edad*\nEjemplo: *${usedPrefix + command} ${name2}.15*`)

  let [_, name, _, age] = text.match(Reg)
  if (!name ||!age) return m.reply('⚠️ Debes ingresar nombre y edad.')
  if (name.length>= 100) return m.reply('📛 Tu nombre es demasiado largo.')

  age = parseInt(age)
  if (isNaN(age) || age < 5 || age> 99) return m.reply('📛 Edad inválida. Usa un valor entre 5 y 99.')

  // Registro exitoso
  user.name = name.trim()
  user.age = age
  user.regTime = +new Date
  user.registered = true
  user.money += 600
  user.estrellas += 10
  user.exp += 250
  user.joincount += 5

  const sn = createHash('md5').update(m.sender).digest('hex')

  const mensajeRegistro = `
🌸 *TanjiroBot - Registro de Respiración* 🌸

🔰 *Nombre:* ${name}
📅 *Edad:* ${age} años
🆔 *Código Hashira:* ${sn.slice(0, 8).toUpperCase()}

🎖️ Recompensas Iniciales:
💰 +600 monedas
✨ +10 estrellas
📈 +250 experiencia

🧭 Invoca tu perfil con el comando *#perfil* para ver tu progreso como espadachín.`

  await conn.sendMessage(m.chat, {
    image: { url: perfilPic},
    caption: mensajeRegistro,
    contextInfo: {
      externalAdReply: {
        title: '⚔️ Registro Completado – TanjiroBot',
        body: 'Tu camino como cazador ha comenzado.',
        thumbnailUrl: perfilPic,
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m})

  // Mensaje silencioso al canal
  const canalTanjiro = '120363402097425674@newsletter'
  const resumen = `
📢 *TanjiroBot – Nuevo Guerrero Registrado*

👤 Usuario: ${user.name}
🎂 Edad: ${user.age}
🆔 ID de registro: ${sn.slice(0, 8).toUpperCase()}
🔗 Desde: ${m.pushName || 'Anónimo'}
`

  await conn.sendMessage(canalTanjiro, {
    text: resumen,
    contextInfo: {
      externalAdReply: {
        title: '🔔 Registro en el dojo digital',
        body: 'Un nuevo guerrero se une al camino del Sol.',
        thumbnailUrl: perfilPic,
        mediaType: 1,
        showAdAttribution: false
}
}
}, { quoted: null})
}

handler.help = ['register', 'reg']
handler.tags = ['rg']
handler.command = ['reg', 'register', 'verify', 'verificar', 'registrar']

export default handler
