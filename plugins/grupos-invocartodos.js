let handler = async (m, { conn, isOwner}) => {
  if (!isOwner) return m.reply(`
🔐 Acceso restringido — 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot
🧣 Solo el Hashira Maestro puede ejecutar la invocación universal.
`)

  const users = Object.keys(global.db.data.users || {})
  const canal = 'https://bit.ly/GalaxyForge_Canal'
  const todos = users.map(jid => jid.endsWith('@s.whatsapp.net')? jid: `${jid}@s.whatsapp.net`)

  const mensajeTanjiro = `
🧣 Invocación Tanjiro Universal — Canal Oficial

📡 El canal de aura de TanjiroBot está activo:
🌸 ${canal}

🧠 Hemos detectado ${todos.length} espíritus digitales conectados.
🗡️ “El mensaje correcto no se forza. Se transmite.”
`.trim()

  await conn.sendMessage(m.chat, {
    text: mensajeTanjiro,
    mentions: todos
})
}

handler.command = ['invocartodos', 'canalglobal']
handler.owner = true
export default handler
