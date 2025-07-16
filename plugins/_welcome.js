import { WAMessageStubType} from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import canvafy from 'canvafy';

export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.messageStubType ||!m.isGroup) return true;

  const chat = global.db.data.chats[m.chat];
  const who = m.messageStubParameters?.[0];
  const userJid = who + '@s.whatsapp.net';
  const user = global.db.data.users[userJid];
  const userName = user?.name || await conn.getName(userJid);
  const groupName = groupMetadata.subject.trim();
  const memberCount = participants.length +
    (m.messageStubType === 27? 1: m.messageStubType === 28 || m.messageStubType === 32? -1: 0);

  const getAvatar = async () => {
    try {
      return await conn.profilePictureUrl(who, 'image');
} catch {
      return 'https://i.ibb.co/cFzgdNw/file.jpg';
}
};

  const renderBanner = async (title, description, imageBg) => {
    const avatar = await getAvatar();
    return await new canvafy.WelcomeLeave()
.setAvatar(avatar)
.setBackground('image', imageBg)
.setTitle(title)
.setDescription(description)
.setBorder('#222')
.setAvatarBorder('#222')
.setOverlayOpacity(0.25)
.build();
};

  const dojoName = 'TANJIRO | 𝖶𝗁𝖺𝗍𝗌𝖠𝗉𝗉 𝖠𝗂';
  const dojoLink = 'https://chat.whatsapp.com/H5ueOzVRAzhBolt3lczDfG';

  const welcomeText = '≡ 会 ✦ 𝖢𝖠𝖹𝖠𝖣𝖮𝖱 𝖤𝗇𝗍𝗋𝖺 𝖠𝗅 𝖤𝗌𝗍𝗂𝗅𝗈 ✦ 会';
  const goodbyeText = '≡ 会 ✦ 𝖢𝖠𝖹𝖠𝖣𝖮𝖱 𝖲𝖺𝗅𝖾 𝗌𝗂𝗇 𝖾𝖿𝖾𝖼𝗍𝗈 ✦ 会';

  const msgWelcome = `
🌘 *@${who} ha entrado en modo “Galaxy Access”*
🏯 Bienvenido al grupo *${groupName}*
👥 Ahora somos ${memberCount} miembros en la comunidad.
🧠 Usa *#help* para desbloquear tus técnicas.
🔗 ${dojoLink}
`.trim();

  const msgGoodbye = `
🌒 *@${who} ha abandonado el dojo...*
🧠 “Fuiste tan útil como un tutorial en ruso” 🥶
🌑 Grupo: *${groupName}*
👥 Ahora somos ${memberCount} miembros activos.
🔗 ${dojoLink}
`.trim();

  if (chat.welcome && m.messageStubType === 27) {
    const img = await renderBanner('𝖂𝖊𝖑𝖈𝖔𝖒𝖊 🌌', `Acceso otorgado a ${memberCount} miembros.`, 'https://files.catbox.moe/lpragp.jpg');
    await conn.sendMini?.(m.chat, dojoName, null, msgWelcome, img, img, dojoLink, null);
}

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    const img = await renderBanner('𝖇𝖞𝖊 𝗆𝗈𝖽𝖾 💤', `Expulsado. Quedan ${memberCount}.`, 'https://files.catbox.moe/lpragp.jpg');
    await conn.sendMini?.(m.chat, dojoName, null, msgGoodbye, img, img, dojoLink, null);
}
}
