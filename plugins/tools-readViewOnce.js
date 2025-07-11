let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
  if (!m.quoted) return conn.reply(m.chat, `*${xtools} Por favor, responde a una imagen ViewOnce (ver una sola vez)*.`, m);
  if (!m?.quoted || !m?.quoted?.viewOnce) return conn.reply(m.chat, `*${xtools} Responde a una imagen ViewOnce (ver una sola vez)*`, m);

  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } }); // reacción de espera

  try {
    let buffer = await m.quoted.download(false);
    if (/videoMessage/.test(m.quoted.mtype)) {
      await conn.sendFile(m.chat, buffer, 'media.mp4', m.quoted.caption || '', m);
    } else if (/imageMessage/.test(m.quoted.mtype)) {
      await conn.sendFile(m.chat, buffer, 'media.jpg', m.quoted?.caption || '', m);
    } else if (/audioMessage/.test(m.quoted.mtype)) {
      await conn.sendFile(m.chat, buffer, 'audio.mp3', '', m, { mimetype: 'audio/mp3' });
    }

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } }); // reacción de éxito
  } catch (e) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } }); // reacción de error
    conn.reply(m.chat, '*Ocurrió un error al procesar el mensaje.*', m);
    console.error(e);
  }
}

handler.help = ['read']
handler.tags = ['herramientas']
handler.command = ['readviewonce', 'read', 'readvo', 'ver'] 

export default handler;
