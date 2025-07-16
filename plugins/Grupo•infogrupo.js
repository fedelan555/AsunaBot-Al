const fuenteTanjiro = (text) => {
  const map = {
    a:'𝖺', b:'𝖻', c:'𝖼', d:'𝖽', e:'𝖾', f:'𝖿', g:'𝗀',
    h:'𝗁', i:'𝗂', j:'𝗃', k:'𝗄', l:'𝗅', m:'𝗆', n:'𝗇',
    o:'𝗈', p:'𝗉', q:'𝗊', r:'𝗋', s:'𝗌', t:'𝗍', u:'𝗎',
    v:'𝗏', w:'𝗐', x:'𝗑', y:'𝗒', z:'𝗓'
}
  return text.toLowerCase().split('').map(c => map[c] || c).join('')
}

const handler = async (m, { conn, participants, groupMetadata}) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => null) || global.icons

  const config = global.db.data.chats[m.chat]
  const {
    antiToxic, reaction, antiTraba, antidelete, antiviewonce,
    welcome, detect, antiLink, antiLink2, modohorny,
    autosticker, audios
} = config

  const groupAdmins = participants.filter(p => p.admin)
  const listAdmin = groupAdmins.map((v, i) => `🌸 ${i + 1}. @${v.id.split('@')[0]}`).join('\n')
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'

  const texto = `
🌸︵˚𓆩⌇ ${fuenteTanjiro("TanjiroBot - Info Grupo")} ⌇𓆪︵˚🌸

╭──〔 ${fuenteTanjiro("𝖯𝗋𝗂𝗇𝖼𝗂𝗉𝖺𝗅")} 〕──────⬣
🆔 𝗜𝗗: ${groupMetadata.id}
🏮 𝗡𝗼𝗺𝗯𝗿𝗲: ${groupMetadata.subject}
📜 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶𝗼́𝗻: ${groupMetadata.desc?.toString() || fuenteTanjiro("Sin descripción")}
👥 𝗠𝗶𝗲𝗺𝗯𝗿𝗼𝘀: ${participants.length}
👑 𝗖𝗿𝗲𝗮𝗱𝗼𝗿: @${owner.split('@')[0]}

╭─〔 ${fuenteTanjiro("𝖠𝖽𝗆𝗂𝗇𝖾𝗌")} 〕──────⬣
${listAdmin}

╭─〔 ${fuenteTanjiro("𝖢𝗈𝗇𝖿𝗂𝗀𝗎𝗋𝖺𝖼𝗂𝗈́𝗇")} 〕──────⬣
🌸 Welcome: ${welcome? '✅': '❌'}
🌸 Detect: ${detect? '✅': '❌'}
🌸 Antilink: ${antiLink? '✅': '❌'}
🌸 Antilink 2: ${antiLink2? '✅': '❌'}
🌸 Modohorny: ${modohorny? '✅': '❌'}
🌸 Autosticker: ${autosticker? '✅': '❌'}
🌸 Audios: ${audios? '✅': '❌'}
🌸 Antiver: ${antiviewonce? '✅': '❌'}
🌸 Reacción: ${reaction? "✅️": "❌️"}
🌸 Delete: ${antidelete? '✅': '❌'}
🌸 Antitóxico: ${antiToxic? '✅': '❌'}
🌸 Antitraba: ${antiTraba? '✅': '❌'}
╰────────────────────────⬣`.trim()

  await conn.sendFile(m.chat, pp, 'infogrupo.jpg', texto, m, false, {
    mentions: [...groupAdmins.map(v => v.id), owner]
})
}

handler.help = ['infogrupo']
handler.tags = ['grupo']
handler.command = ['infogrupo', 'gp']
handler.register = true
handler.group = true

export default handler
