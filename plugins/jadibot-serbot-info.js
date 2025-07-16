async function handler(m, { conn: stars, usedPrefix}) {
  let uniqueUsers = new Map()

  global.conns.forEach((conn) => {
    if (conn.user && conn.ws && conn.ws.socket && conn.ws.socket.readyState === 1) {
      uniqueUsers.set(conn.user.jid, conn)
}
})

  let users = [...uniqueUsers.values()]
  let totalUsers = users.length
  global.totalUsers = totalUsers

  let packname = global.packname || '🤖 𝖲𝖴𝖡‐𝖡𝖮𝖳'
  let title = `🧣︵˚˖𓆩⌇𓆪˖˚︵🌸︵˚˖𓆩⌇𓆪˖˚︵🧣\n≡ 会 ✦ 『 𝖲𝖴𝖡‐𝖡𝖮𝖳𝖲 𝖢𝖮𝖭𝖤𝖢𝖳𝖠𝖣𝖮𝖲 』 ✦ 会`
  let barra = '≡≡≡≡≡≡≡≡≡≡≡≡≡'

  let listado = users.map((v, i) => {
    let jid = v.user.jid.replace(/[^0-9]/g, '')
    let nombre = v.user.name || '👤 𝖲𝖴𝖡‐𝖡𝖮𝖳'
    return `╭─ ✦ ${packname} ✦ ─╮
┃ 🏷️ 𝖭𝖴𝗆𝖾𝗋𝗈: #${i + 1}
┃ ⚙️ 𝖨𝖣: @${jid}
┃ 🔗 𝖫𝗂𝗇𝗄: wa.me/${jid}
┃ 🌙 𝖭𝗈𝗆𝖻𝗋𝖾: ${nombre}
╰─${barra}`
}).join('\n\n')

  let botOficialInfo = `
≡ 会 ✦ 🩸 𝖡𝖮𝖳 𝖮𝖥𝖨𝖢𝖨𝖠𝖫 ✦ 会
👑 𝖢𝖠𝖹𝖠𝖣𝖮𝖱 𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅: wa.me/5491137612743
🧣 𝗎𝗌𝖺 este enlace para soporte y conexión directa.
`

  let responseMessage = `${title}
╭─🔢 𝖳𝗈𝗍𝖺𝗅 𝖲𝗎𝖻𝖡𝗈𝗍𝗌: *${totalUsers}*
╰─${barra}

${listado || '⚠️ 𝖭𝗈 𝗁𝖺𝗒 𝖲𝗎𝖻‐𝖡𝖮𝖳𝗌 𝖺𝖼𝗍𝗂𝗏𝗈𝗌 𝖾𝗇 𝖾𝗌𝗍𝖾 𝗆𝗈𝗆𝖾𝗇𝗍𝗈.'}

${botOficialInfo}`.trim()

  const imageUrl = 'https://files.catbox.moe/sbzc3p.jpg'

  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
},
    message: {
      contactMessage: {
        displayName: "𝖲𝗎𝖻‐𝖡𝖮𝖳",
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;TanjiroBot;;;\nFN:TanjiroBot\nEND:VCARD"
}
}
}

  await stars.sendMessage(m.chat, {
    image: { url: imageUrl},
    caption: responseMessage,
    mentions: stars.parseMention(responseMessage)
}, { quoted: fkontak})
}

handler.command = ['listjadibot', 'bots']
handler.help = ['bots']
handler.tags = ['jadibot']
export default handler
