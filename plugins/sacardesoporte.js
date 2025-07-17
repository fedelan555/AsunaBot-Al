let handler = async (m, { conn, isOwner, args}) => {
  if (!isOwner) return m.reply(`
🚫 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot | Acceso denegado
🧣 Sólo el Hashira Supremo puede ejecutar esta técnica.
`)

  const numero = args[0]
  if (!numero ||!numero.match(/^\+?[0-9]{8,20}$/)) {
    return m.reply('❎ Debes proporcionar un número válido.\n📌 Ejemplo: *sacardesoporte +549123456789*')
}

  const jid = numero.replace(/\D/g, '') + '@s.whatsapp.net'
  const soporteList = global.db.data.soporte || {}

  if (!(jid in soporteList)) {
    return m.reply(`⚠️ El número *${numero}* no está registrado en el sistema de soporte.`)
}

  delete soporteList[jid]
  global.db.data.soporte = soporteList

  await m.reply(`✅ Número *${numero}* eliminado del sistema de soporte correctamente.
🧣 “El respeto por los caminos elegidos es también parte del honor.” — Tanjiro`)
}

handler.help = ['sacardesoporte <número>']
handler.tags = ['soporte']
handler.command = /^sacardesoporte$/i
handler.owner = true

export default handler
