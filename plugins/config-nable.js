const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner}) => {
  const imagenTanjiro = 'https://files.catbox.moe/23ebz8.jpg'; // imagen temática Tanjiro

  const miniopcion = `⚔️ *OPCIONES PARA GRUPOS*

${usedPrefix + command} welcome
${usedPrefix + command} autoresponder
${usedPrefix + command} autoaceptar
${usedPrefix + command} autorechazar
${usedPrefix + command} detect
${usedPrefix + command} antidelete
${usedPrefix + command} antilink
${usedPrefix + command} antilink2
${usedPrefix + command} nsfw
${usedPrefix + command} autolevelup
${usedPrefix + command} autosticker
${usedPrefix + command} reaction
${usedPrefix + command} antitoxic
${usedPrefix + command} audios
${usedPrefix + command} modoadmin
${usedPrefix + command} antifake
${usedPrefix + command} antibot

🥷 *OPCIONES PARA MI PROPIETARIO*

${usedPrefix + command} antisubots
${usedPrefix + command} public
${usedPrefix + command} status
${usedPrefix + command} serbot
${usedPrefix + command} restrict
${usedPrefix + command} autoread
${usedPrefix + command} antispam
${usedPrefix + command} antiprivado`.trim();

  const isEnable = /true|enable|(turn)?on|1/i.test(command);
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const type = (args[0] || '').toLowerCase();
  let isAll = false;
  const isUser = false;

  switch (type) {
    case 'welcome':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.welcome = isEnable;
      break;

    case 'autoaceptar':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.autoAceptar = isEnable;
      break;

    case 'autorechazar':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.autoRechazar = isEnable;
      break;

    case 'detect':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.detect = isEnable;
      break;

    case 'antibot':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.antiBot = isEnable;
      break;

    case 'antisubots':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.antiBot2 = isEnable;
      break;

    case 'antidelete':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.delete = isEnable;
      break;

    case 'public':
      isAll = true;
      if (!isROwner) return global.dfail('rowner', m, conn);
      global.opts['self'] =!isEnable;
      break;

    case 'antilink':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.antiLink = isEnable;
      break;

    case 'antilink2':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.antiLink2 = isEnable;
      break;

    case 'status':
      isAll = true;
      if (!isROwner) return global.dfail('rowner', m, conn);
      bot.autobio = isEnable;
      break;

    case 'nsfw':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.nsfw = isEnable;
      break;

    case 'autolevelup':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.autolevelup = isEnable;
      break;

    case 'autosticker':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.autosticker = isEnable;
      break;

    case 'reaction':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.reaction = isEnable;
      break;

    case 'antitoxic':
          if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.antitoxic = isEnable;
      break;

    case 'audios':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.audios = isEnable;
      break;

    case 'modoadmin':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.modoadmin = isEnable;
      break;

    case 'antifake':
      if (m.isGroup &&!(isAdmin || isOwner)) return global.dfail('admin', m, conn);
      chat.antifake = isEnable;
      break;

    case 'serbot':
      isAll = true;
      if (!isROwner) return global.dfail('rowner', m, conn);
      bot.jadibotmd = isEnable;
      break;

    case 'restrict':
      isAll = true;
      if (!isOwner) return global.dfail('owner', m, conn);
      bot.restrict = isEnable;
      break;

    case 'autoread':
      isAll = true;
      if (!isROwner) return global.dfail('rowner', m, conn);
      bot.autoread2 = isEnable;
      global.opts['autoread'] = isEnable;
      break;

    case 'antispam':
      isAll = true;
      if (!isOwner) return global.dfail('owner', m, conn);
      bot.antiSpam = isEnable;
      break;

    case 'antiprivado':
      isAll = true;
      if (!isROwner) return global.dfail('rowner', m, conn);
      bot.antiPrivate = isEnable;
      break;

    default:
      if (!/[01]/.test(command)) {
        return await conn.sendMessage(m.chat, {
          image: { url: imagenTanjiro},
          caption: miniopcion,
          buttons: [
            {
              buttonId: '#menucompleto',
              buttonText: { displayText: '🌸 MENU COMPLETO'},
              type: 1
}
          ],
          viewOnce: true
}, { quoted: m});
}
      throw false;
}

  conn.reply(
    m.chat,
    `⚔️ *La función ${type} se ha ${isEnable? 'activado': 'desactivado'} ${isAll? 'en todo el bot': 'en este chat.'}*`,
    m
);
};

handler.help = ['enable <opción>', 'disable <opción>'];
handler.tags = ['owner', 'grupo'];
handler.command = ['enable', 'disable', 'on', 'off'];
export default handler;
