let handler = async (m, { conn, isOwner}) => {
  if (!isOwner) return m.reply(`
🚫 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot | Acceso denegado
🧣 Solo el Hashira Supremo puede usar esta técnica.
`)

  const usuarios = Object.keys(global.db.data.users || {})
  const contactos = usuarios
.filter(jid => jid.endsWith('@s.whatsapp.net'))
.map((jid, i) => ` ${i + 1}. @${jid.split('@')[0]}`)

  const menciones = usuarios.filter(jid => jid.endsWith('@s.whatsapp.net'))

  const canal = 'https://bit.ly/GalaxyForge_Canal'

  const mensaje = `
🧣 *𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot | Invocación Universal*

📡 Canal oficial del Dojo de la Respiración Solar:
🌸 ${canal}

🔔 Se ha convocado a todos los cazadores registrados:
${contactos.join('\n')}

🌕 “𝖰𝗎𝖾 𝗍𝗎 𝗏𝗂𝗌𝗂𝗈𝗇 𝗌𝖾𝖺 𝗏𝖺𝗅𝗂𝖾𝗇𝗍𝖾, 𝗒 𝗍𝗎 𝖺𝗎𝗋𝖺 𝖿𝗎𝖾𝗋𝗍𝖾.” — Tanjiro
`.trim()

  await conn.sendMessage(m.chat, {
    text: mensaje,
    mentions: menciones
})
}

handler.command = ['invocartodos', 'canalglobal', 'tanjirocall']
handler.owner = true
export default handler
