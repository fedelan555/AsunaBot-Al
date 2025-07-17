let handler = async (m, { conn, isOwner}) => {
  if (!isOwner) return m.reply(`
🚫 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot | Acceso denegado
🧣 Sólo el Maestro Hashira puede ejecutar esta técnica.
  `)

  const usuarios = Object.keys(global.db.data.users || {})
.filter(jid => jid.endsWith('@s.whatsapp.net'))

  const canal = 'https://bit.ly/GalaxyForge_Canal'
  const totalreg = usuarios.length

  // 🧣 Mensaje grupal anunciando el envío
  await m.reply(`
🧣 *𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot | Invocación Universal*

📡 Canal oficial del Dojo Solar:
🔗 ${canal}

📦 Total cazadores registrados: *${totalreg}*
📤 Enviando mensaje privado a cada número...
🌕 Que la llama interior los despierte.
`)

  for (const jid of usuarios) {
    const mensajePrivado = `
🧣 *𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot | Mensaje Oficial*

📡 El Dojo Solar ha activado tu vínculo espiritual.
🔗 Canal oficial para recibir sabiduría:
${canal}

🌕 “Respira. Escucha. Conecta con tu propósito.” — Tanjiro
    `.trim()

    await conn.sendMessage(jid, { text: mensajePrivado})
    await new Promise(resolve => setTimeout(resolve, 500)) // para evitar saturación
}

  await m.reply(`✅ *TanjiroBot completó el envío privado a ${totalreg} cazadores digitales.*
🧣 “Cuando el mensaje es claro, todos lo sienten.”`)
}

handler.command = ['invocacionprivada', 'tanjirocanal', 'canaluniversal']
handler.owner = true
export default handler
