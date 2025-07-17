let handler = async (m, { conn, isOwner, args}) => {
  if (!isOwner) return m.reply(`
🚫 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot | Acceso denegado
🧣 Sólo el Hashira Supremo puede ejecutar esta técnica.
  `)

  const soporte = '5219992222487@s.whatsapp.net' // Número del equipo de soporte
  const numero = args[0]

  if (!numero ||!numero.match(/^\+?[0-9]{8,20}$/)) {
    return m.reply('❎ Por favor proporciona un número válido.\n📌 Ejemplo: *enviarasoporte +549123456789*')
}

  const mensaje = `
📥 *𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot | Solicitud de retiro*

🧣 Se solicita quitar este número del sistema:
📞 Número: ${numero}

🗂️ Solicitud registrada por el Hashira principal.

🌕 “Cuando el respeto guía la acción, todo se alinea.” — Tanjiro
  `.trim()

  await conn.sendMessage(soporte, { text: mensaje})

  await m.reply('✅ Solicitud enviada a soporte correctamente.')
}

handler.help = ['enviarasoporte <número>']
handler.tags = ['tanjiro']
handler.command = /^enviarasoporte$/i
handler.owner = true

export default handler
