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
    (m.messageStubType == 27? 1: m.messageStubType == 28 || m.messageStubType == 32? -1: 0);

  const getAvatar = async () => {
    try {
      return await conn.profilePictureUrl(who, 'image');
} catch {
      return 'https://files.catbox.moe/lpragp.jpg';
}
};

  const renderBanner = async (title, description, imageBg) => {
    const avatar = await getAvatar();
    return await new canvafy.WelcomeLeave()
.setAvatar(avatar)
.setBackground('image', imageBg)
.setTitle(title)
.setDescription(description)
.setBorder('#2a2e35')
.setAvatarBorder('#2a2e35')
.setOverlayOpacity(0.2)
.build();
};

  const dojoName = 'Tanjiro | 𝖶𝗁𝖺𝗍𝗌𝖠𝗉𝗉';
  const dojoLink = 'https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N';

  const welcomeTitle = '≡ 会 🧣 𝖢𝖠𝖹𝖠𝖣𝖮𝖱 𝖨𝖭𝖦𝖱𝖤𝖲𝖠 𝖠𝖫 𝖣𝖮𝖩𝖮 🧣 ≡ 会';
  const goodbyeTitle = '≡ 会 🧣 𝖢𝖠𝖹𝖠𝖣𝖮𝖱 𝖠𝖡𝖠𝖭𝖣𝖮𝖭𝖠 𝖤𝖫 𝖣𝖮𝖩𝖮 🧣 ≡ 会';

  const welcomeMsg = `
🧣︵˚˖𓆩⌇𓆪˖˚︵🌸︵˚˖𓆩⌇𓆪˖˚︵🧣
🌸 *𝖤𝗅 𝖺𝗆𝖺𝗇𝖾𝖼𝖾𝗋 𝗂𝗅𝗎𝗆𝗂𝗇𝖺 𝗍𝗎 𝗅𝗅𝖾𝗀𝖺𝖽𝗈, @${who}* 🌸

🏯 𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝗈 𝖺𝗅 𝖽𝗈𝗃𝗈 *${groupName}*
🔥 𝖰𝗎𝖾 𝗍𝗎 𝗋𝖾𝗌𝗉𝗂𝗋𝖺𝖼𝗂𝗈𝗇 𝗌𝖾𝖺 𝖿𝗎𝖾𝗋𝗍𝖾, 𝗍𝗎 𝗏𝗈𝗅𝗎𝗇𝗍𝖺𝖽 𝗂𝗇𝗊𝗎𝖾𝖻𝗋𝖺𝗇𝗍𝖺𝖻𝗅𝖾.
👥 𝖲𝗈𝗆𝗈𝗌 𝖺𝗁𝗈𝗋𝖺 ${memberCount} cazadores.

📘 Usa *#help* para aprender tus técnicas.
`.trim();

  const goodbyeMsg = `
🧣︵˚˖𓆩⌇𓆪˖˚︵🌒︵˚˖𓆩⌇𓆪˖˚︵🧣
🍁 *@${who} 𝗁𝖺 𝖼𝗈𝗅𝗀𝖺𝖽𝗈 𝗌𝗎 𝗁𝗈𝗃𝖺 𝖭𝗂𝖼𝗁𝗂𝗋𝗂𝗇.*

🏯 𝖲𝖺𝗅𝗂𝖽𝖺 registrada en *${groupName}*
👥 Quedan ${memberCount} cazadores.

🙏 𝖰𝗎𝖾 𝗍𝗎 𝗅𝗅𝖺𝗆𝖺 𝖼𝗈𝗇𝗍𝗂𝗇𝗎𝖾 𝗆𝖺𝗌 𝖺𝗅𝗅á.
⚔️ 𝖤𝗅 𝗌𝗈𝗅 𝗍𝖾 𝗀𝗎𝗂𝖺.
`.trim();

  if (chat.welcome && m.messageStubType === 27) {
    const img = await renderBanner('¡𝖡𝖨𝖤𝖭𝖵𝖤𝖭𝖨𝖣𝖮!', `𝖠𝗁𝗈𝗋𝖺 𝗌𝗈𝗆𝗈𝗌 ${memberCount} 𝗆𝗂𝖾𝗆𝖻𝗋𝗈𝗌.`, 'https://files.catbox.moe/lpragp.jpg');
    await conn.sendMini?.(m.chat, dojoName, null, welcomeMsg, img, img, dojoLink, null);
}

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    const img = await renderBanner('¡𝖧𝖠𝖲𝖳𝖠 𝖫𝖴𝖤𝖦𝖮!', `𝖭𝗈𝗌 𝗏𝖾𝗆𝗈𝗌 𝗉𝗋𝗈𝗇𝗍𝗈. 𝖲𝗈𝗆𝗈𝗌 ${memberCount}`, 'https://files.catbox.moe/lpragp.jpg');
    await conn.sendMini?.(m.chat, dojoName, null, goodbyeMsg, img, img, dojoLink, null);
}
}
