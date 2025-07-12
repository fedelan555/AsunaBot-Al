import { WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.messageStubType ||!m.isGroup) return true

  let insta = 'https://instagram.com/dev.criss_vx'
  let groupSize = participants.length + (m.messageStubType == 27? 1: m.messageStubType == 28 || m.messageStubType == 32? -1: 0)
  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  let img = await (await fetch(pp)).buffer()
  let chat = global.db.data.chats[m.chat]

  const groupName = groupMetadata.subject
  const groupDesc = groupMetadata.desc || 'sin descripción'

  if (chat.welcome && m.messageStubType == 27) {
    const txt = `🌸 ¡Bienvenido ${await conn.getName(who)}!\nAhora somos ${groupSize} cazadores en el dojo.`
    const label = `☀️ Tanjiro Bot - Espíritu Solar`
    const body = chat.sWelcome
? chat.sWelcome.replace(/@user/g, taguser).replace(/@group/g, groupName).replace(/@desc/g, groupDesc)
: `⚔ 𝑬𝒍 𝑨𝒍𝒊𝒆𝒏 𝒉𝒂 𝒍𝒍𝒆𝒈𝒂𝒅𝒐.\n\n🍃 Bienvenid@ al dojo *${groupName}*, ${taguser}.\nRespira con honor. Usa *#menu* para ver tus técnicas.`

    await conn.sendLuffy(m.chat, txt, label, body, img, img, insta, fkontak)
}

  if (chat.welcome && m.messageStubType == 28) {
    const txt = `🌪 ${await conn.getName(who)} ha sido expulsado.\nAhora somos ${groupSize} cazadores en el dojo.`
    const label = `🌑 Tanjiro Bot - Juicio Solar`
    const body = chat.sKick
? chat.sKick.replace(/@user/g, taguser).replace(/@group/g, groupName).replace(/@desc/g, groupDesc)
: `⚔ *El cazador ha perdido su hoja.*\n\n${taguser} fue eliminado de *${groupName}* por romper la armonía.\nRespira. Aprende. Regresa si la voluntad lo permite.`

    await conn.sendLuffy(m.chat, txt, label, body, img, img, insta, fkontak)
}

  if (chat.welcome && m.messageStubType == 32) {
    const txt = `🍂 ${await conn.getName(who)} ha dejado el dojo.\nAhora somos ${groupSize} cazadores.`
    const label = `🍃 Tanjiro Bot - Partida Silenciosa`
    const body = chat.sBye
? chat.sBye.replace(/@user/g, taguser).replace(/@group/g, groupName).replace(/@desc/g, groupDesc)
: `🌕 *Un cazador partió bajo la lluvia solar.*\n\nGracias por formar parte de *${groupName}*, ${taguser}.\nQue el sol ilumine tu camino más allá.`

    await conn.sendLuffy(m.chat, txt, label, body, img, img, insta, fkontak)
}
}
