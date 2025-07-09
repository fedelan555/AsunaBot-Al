// ¡Con todo gusto! Aquí tienes una versión renovada del módulo `register.js` al estilo *TanjiroBot*, con narrativa inspirada en _Kimetsu no Yaiba_, formato armonizado, frases más épicas, y mejoras visuales para que el registro se sienta como entrar en un dojo espiritual:

import { createHash} from 'crypto'

const Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command}) {
  let user = global.db.data.users[m.sender];
  let name2 = await conn.getName(m.sender);
  let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg');

  // Ya está registrado
  if (user.registered)
    return m.reply(`⚔️ *Ya estás registrado como discípulo del código.*\n\n¿Deseas volver a iniciar tu camino?\nUsa *${usedPrefix}unreg* para renacer desde cero.`);

  // Validación de formato
  if (!Reg.test(text))
    return m.reply(`⚠️ *Formato incorrecto.*\nUsa el siguiente formato para ingresar al dojo:\n\n*${usedPrefix + command} Nombre.edad*\nEjemplo: *${usedPrefix + command} ${name2}.15*`);

  let [_, name, _, age] = text.match(Reg);
  if (!name) return m.reply('🚫 *Debes ingresar un nombre.*');
  if (!age) return m.reply('🚫 *La edad no puede estar vacía.*');
  if (name.length> 100) return m.reply('🚫 *Tu nombre es demasiado largo.*');

  age = parseInt(age);
  if (isNaN(age) || age < 5 || age> 99) return m.reply('📛 *Edad no válida. Usa un número entre 5 y 99.*');

  // Registro completado
  user.name = name.trim();
  user.age = age;
  user.regTime = +new Date;
  user.registered = true;
  user.money += 600;
  user.exp += 250;
  user.estrellas += 10;
  user.joincount += 5;

  const id = createHash('md5').update(m.sender).digest('hex');
  const hash = id.slice(0, 8).toUpperCase();

  const texto = `
🌊 *REGISTRO COMPLETADO – DOJO TANJIROBOT* 🌊

👤 *Nombre:* ${name}
🎂 *Edad:* ${age} años
🔐 *ID Hashira:* ${hash}

🎖️ *Tu recompensa inicial:*
🟡 +600 monedas
✨ +10 estrellas
📈 +250 experiencia

🔎 Usa *#perfil* para consultar tu progreso y avanzar con honor.
`;

  await conn.sendMessage(m.chat, {
    image: { url: perfil},
    caption: texto,
    contextInfo: {
      externalAdReply: {
        title: '⚔️ Registro de Cazador – TanjiroBot',
        body: 'Respira... el código es tu espada.',
        thumbnailUrl: perfil,
        mediaType: 1,
        renderLargerThumbnail: true
}
}
}, { quoted: m});

  // Notificación al canal del dojo
  const canalID = '120363402097425674@newsletter';
  const resumen = `
🆕 *NUEVO DISCÍPULO REGISTRADO EN EL DOJO*

👤 Usuario: ${user.name}
🧭 Edad: ${user.age}
🆔 Código: ${hash}
📍 Invocado desde: ${m.pushName || 'Anónimo'}
`;

  await conn.sendMessage(canalID, {
    text: resumen,
    contextInfo: {
      externalAdReply: {
        title: '📢 Registro TanjiroBot',
        body: 'Un nuevo guerrero se une a la batalla.',
        thumbnailUrl: perfil,
        mediaType: 1
}
}
}, { quoted: null});
};

handler.help = ['register'];
handler.tags = ['rg'];
handler.command = ['reg', 'register', 'verify', 'verificar', 'registrar'];

export default handler;
