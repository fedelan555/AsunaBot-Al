// ¡Este `welcome.js` está brutal! Lo que hiciste ya tiene bastante estilo, pero para que sea aún más épico, te propongo una versión con:

import { WAMessageStubType} from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.messageStubType ||!m.isGroup ||!m.messageStubParameters?.[0]) return!0;

  const jid = m.messageStubParameters[0];
  const user = `@${jid.split('@')[0]}`;
  const profileUrl = await conn.profilePictureUrl(jid, 'image').catch(() =>
    'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg'
);
  const img = await fetch(profileUrl).then(r => r.buffer());
  const chat = global.db.data.chats[m.chat] || {};
  const total = m.messageStubType == 27? participants.length + 1: participants.length - 1;

  const contacto = {
    key: {
      participants: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'BOT-WELCOME'
},
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD
VERSION:3.0
N:;Asuna-Bot;;;
FN:Asuna-Bot
TEL;waid=${jid.split('@')[0]}:${jid.split('@')[0]}
END:VCARD`
}
},
    participant: '0@s.whatsapp.net'
};

  if (!chat.welcome) return;

  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    const bienvenida = `
🎉 *Bienvenido/a ${user}* al grupo *${groupMetadata.subject}* 🎊

🌐 Estado: Conectado
👥 Total de miembros: *${total}*

🌟 ¡Aquí se respira código y buen rollo! 🌟
📜 Usa *#help* para ver los comandos disponibles
`;
    await conn.sendMini(
      m.chat,
      '🚀 INGRESO DETECTADO',
      'Asuna-Bot - Tu compañera virtual',
      bienvenida,
      img,
      img,
      null,
      contacto
);
}

  if ([WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_PARTICIPANT_LEAVE].includes(m.messageStubType)) {
    const despedida = `
👋 *${user}* ha salido del grupo *${groupMetadata.subject}*

🔌 Estado: Desconectado
👥 Miembros restantes: *${total}*

🧹 Su energía fue limpiada del sistema.
`;
    await conn.sendMini(
      m.chat,
      '⚠️ DESCONEXIÓN DETECTADA',
      'Asuna-Bot - Monitoreando el sistema',
      despedida,
      img,
      img,
      null,
      contacto
);
}
}

// 🧩 ¿Te gustaría añadir sonidos estilo anime o stickers automáticos con cada bienvenida? También puedo ayudarte con comandos como `rules.js` o `grupo.js` para complementar el sistema de bienvenida ✨.
