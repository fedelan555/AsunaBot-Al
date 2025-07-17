let handler = async (m, { isOwner, args}) => {
  if (!isOwner) return m.reply(`
🚫 TanjiroBot | Acceso Denegado
🧣 Sólo el Hashira principal puede ejecutar esta técnica.
`)

  const numero = args[0]
  if (!numero ||!numero.match(/^\+?[0-9]{8,20}$/)) {
    return m.reply('❎ Ingresa un número válido.\n📌 Ejemplo: *sacardesoporte +549123456789*')
}

  const jid = numero.replace(/\D/g, '') + '@s.whatsapp.net'
  const soporte = global.db.data.soporte = global.db.data.soporte || {}

  if (!(jid in soporte)) {
    return m.reply(`⚠️ El número indicado no está registrado en soporte.`)
}

  delete soporte[jid]

  return m.reply(`✅ Eliminado del sistema de soporte.`)
}

handler.command = /^sacardesoporte$/i
handler.owner = true
export default handler
