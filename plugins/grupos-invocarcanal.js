let handler = async (m, { conn, isOwner}) => {
  if (!isOwner) return m.reply(`
🧣 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot | Acceso Restringido
⚠️ Sólo el Hashira Maestro puede usar esta técnica.
`)

  const metadata = await conn.groupMetadata(m.chat)
  const grupo = metadata.subject
  const participantes = metadata.participants.map(u => u.id)
  const numeros = participantes.map((id, i) => ` ${i + 1}. +${id.split('@')[0]}`).join('\n')
  const canalOficial = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N'

  const mensajeTanjiro = `
🎴 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 𝗂𝗇𝗏𝗈𝖼𝖺𝖼𝗂𝗈𝗇 𝗀𝗋𝗎𝗉𝖺𝗅 | TanjiroBot 🧣

👥 Grupo: *${grupo}*
🧠 Invocando digitalmente a todos los cazadores...

📦 Números activos detectados:
${numeros}

🧣 Canal oficial de aura:
📡 ${canalOficial}

🌕 “𝗅𝖺 𝗏𝗂𝗌𝗂𝗈𝗇 𝖼𝗈𝗆𝗉𝖺𝗋𝗍𝗂𝖽𝖺 𝗁𝖺𝖼𝖾 𝗊𝗎𝖾 𝗍𝗈𝖽𝗈𝗌 𝗅𝗎𝗰𝗁𝖾𝗇 𝖼𝗈𝗇 𝗁𝗈𝗇𝗈𝗋.” — Tanjiro
`.trim()

  await conn.sendMessage(m.chat, {
    text: mensajeTanjiro,
    mentions: participantes
})
}

handler.command = ['invocarcanal', 'canalinvoke']
handler.group = true
handler.owner = true
export default handler
