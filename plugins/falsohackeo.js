let handler = async (m, { conn, isOwner}) => {
  if (!isOwner) {
    return await m.reply(`
🚫 *Acceso bloqueado por 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot*
🧣 Solo el 🗡️ *Hashira Supremo* puede ejecutar esta técnica.
🔒 Intento de intrusión registrado.
    `.trim())
}

  const sleep = ms => new Promise(res => setTimeout(res, ms))

  const hackeoFrases = []
  for (let i = 1; i <= 100; i++) {
    hackeoFrases.push(`🔻 Hackeo falso [${i}/100] ejecutando secuencia Tanjiro_Overcore...`)
}

  await m.reply(`
🎴 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 𝖧𝖺𝖼𝗄𝖾𝗈™ — *TanjiroBot Overdrive Mode*
🧠 “Respira. Confía. Rompe el código.”

🔍 Simulación iniciada...
`.trim())

  for (const frase of hackeoFrases) {
    await m.reply(frase)
    await sleep(100)
}

  await sleep(1000)
  await m.reply(`
✅ Finalizado: *Secuencia falsa completada*
🎯 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅 TanjiroBot ha registrado el sistema.

🧣 “El respeto a la amenaza revela la verdadera fortaleza.” — Tanjiro
`.trim())
}

handler.command = ['hackear', 'fakehack', 'tanjirohack']
handler.owner = true
handler.group = true

export default handler
