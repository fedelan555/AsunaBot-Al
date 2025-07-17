let handler = async (m, { conn, isOwner}) => {
  if (!isOwner) return await m.reply(`
🚫 *𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot: Acceso restringido*
⛔ Este comando sólo puede ser ejecutado por el 𝖳𝖺𝗇𝗃𝗂𝗋𝗈 𝖠𝖽𝗆𝗂𝗇 del grupo.
🧣 “Respeta los límites. El honor empieza ahí.”
`.trim())

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  const metadata = await conn.groupMetadata(m.chat)
  const allMentions = metadata.participants.map(p => p.id)
  const lastSenders = Object.values(conn.chats?.[m.chat]?.messages || {})
.map(msg => msg.key.participant)
.filter(Boolean)
.reverse()
.filter((v, i, arr) => arr.indexOf(v) === i)
.slice(0, 5)
.map((jid, i) => ` ${i + 1}. @${jid.split('@')[0]}`)

  const miembros = metadata.participants.length
  const admins = metadata.participants.filter(p => p.admin!= null).length

  await m.reply(`
🧣 *𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot | Sistema Overwatch*
┏━━━━━🔐 INICIO DE VIGILANCIA ━━━━━┓
┃ 🔸 Grupo: *${metadata.subject}*
┃ 🔹 Participantes: *${miembros}*
┃ 🔹 Admins detectados: *${admins}*
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

🌕 Frase de conexión:
“𝖫𝖺 𝖿𝗎𝖾𝗋𝗓𝖺 𝖽𝖾 𝗇𝗎𝖾𝗌𝗍𝗋𝗈 𝖻𝗈𝗍 𝖾𝗌 𝖿𝗎𝗇𝖽𝖺𝗆𝖾𝗇𝗍𝖺𝗅: 𝖾𝗅 𝗋𝖾𝗌𝗉𝖾𝗍𝗈.” — Tanjiro
`, null, { mentions: allMentions})

  await sleep(1200)
  await m.reply('📡 Estableciendo enlace con núcleo 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅...')
  await sleep(800)
  await m.reply('🔍 Analizando entorno digital...')
  await sleep(800)

  const barrasyCarga = [
    '[░░░░░░░░░░] 0%',
    '[██░░░░░░░░] 20%',
    '[████░░░░░░] 40%',
    '[██████░░░░] 60%',
    '[████████░░] 80%',
    '[██████████] 100% ✅'
  ]

  for (const barra of barrasyCarga) {
    await m.reply(`⚙️ Cargando módulos... ${barra}`)
    await sleep(500)
}

  await sleep(800)
  await m.reply(`
🧣 *OVERWATCH TANJIRO ACTIVADO*

📜 Usuarios recientemente activos:
${lastSenders.length? lastSenders.join('\n'): ' - Sin actividad reciente'}

✅ Vigilancia activa.
✔️ Reporte registrado en núcleo privado.
`.trim(), null, { mentions: allMentions})

  await sleep(600)
  await m.reply(`
🎴 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot — CyberDojo™
🧠 Escaneo completado exitosamente.
🗡️ La voluntad de los cazadores siempre permanece alerta.
`.trim())
}

handler.command = ['overwatch2', 'vigilar2']
handler.group = true
export default handler
