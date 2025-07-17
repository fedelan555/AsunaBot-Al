let handler = async (m, { conn, isOwner}) => {
  if (!isOwner) return await m.reply(`
🚫 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot | Acceso denegado
🧣 Este comando sólo puede ser ejecutado por el *Hashira Raíz del Sistema*
`)

  const metadata = await conn.groupMetadata(m.chat)
  const todos = metadata.participants.map(p => p.id)

  const mensajeTanjiro = i => `
🧣 [${i}/100] 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot | Respira.
📡 Mensaje digital: "El respeto no se pide. Se gana."
📍 Registro simulado: ID-${i} // Segmento-${m.chat}
`.trim()

  const mensajes = []
  for (let i = 1; i <= 100; i++) {
    mensajes.push(mensajeTanjiro(i))
}

  for (const msg of mensajes) {
    await conn.sendMessage(m.chat, { text: msg, mentions: todos})
}

  await conn.sendMessage(m.chat, {
    text: `
✅ 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot | Simulación finalizada
🧠 Se enviaron 100 registros falsos digitales
🗂️ Escaneo global completado con éxito
`.trim(),
    mentions: todos
})
}

handler.command = ['fakespam', 'tanjirospam']
handler.group = true
handler.owner = true
export default handler
