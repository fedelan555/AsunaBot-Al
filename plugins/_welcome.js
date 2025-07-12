import { WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.messageStubType ||!m.isGroup) return true

  const insta = 'https://instagram.com/dev.criss_vx'
  const who = m.messageStubParameters[0]
  const taguser = `@${who.split('@')[0]}`
  const pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  const img = await fetch(pp).then(res => res.buffer())
  const chat = global.db.data.chats[m.chat]
  const groupName = groupMetadata.subject
  const groupDesc = groupMetadata.desc || 'sin descripción'
  const groupSize = m.messageStubType === 27
? participants.length + 1
: m.messageStubType === 28 || m.messageStubType === 32
? participants.length - 1
: participants.length

  if (!chat.welcome) return

  // 🌸 Bienvenida
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    const header = '🌊 Tanjiro Bot • Espíritu del Sol'
    const title = `🌀 UN CAZADOR HA LLEGADO`
    const mensaje = chat.sWelcome
? chat.sWelcome.replace(/@user/g, taguser).replace(/@group/g, groupName).replace(/@desc/g, groupDesc)
: `🌸 *Bienvenid@ ${taguser}*\nRespira profundo, cazador. Este es el dojo *${groupName}*.\n👥 Miembros actuales: ${groupSize}\n💬 Usa *#help* para ver tus técnicas.`

    await conn.sendLuffy(m.chat, mensaje, title, header, img, img, insta, fkontak)
}

  // 🔥 Expulsión
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
    const header = '🌑 Tanjiro Bot • Juicio del Sol'
    const title = '⚔️ CAZADOR EXPULSADO'
    const mensaje = chat.sKick
? chat.sKick.replace(/@user/g, taguser).replace(/@group/g, groupName).replace(/@desc/g, groupDesc)
: `🗡️ ${taguser} ha sido retirado de *${groupName}*.\n👥 Cazadores restantes: ${groupSize}\n🌪️ Que encuentre equilibrio en otro sendero.`

    await conn.sendLuffy(m.chat, mensaje, title, header, img, img, insta, fkontak)
}

  // 🍂 Salida
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
    const header = '🌕 Tanjiro Bot • Partida Solar'
    const title = '🍁 UN CAZADOR SE RETIRA'
    const mensaje = chat.sBye
? chat.sBye.replace(/@user/g, taguser).replace(/@group/g, groupName).replace(/@desc/g, groupDesc)
: `🍃 ${taguser} ha dejado el dojo *${groupName}*.\n👥 Miembros restantes: ${groupSize}\n🙏 Que el sol acompañe su camino.`

    await conn.sendLuffy(m.chat, mensaje, title, header, img, img, insta, fkontak)
}}
