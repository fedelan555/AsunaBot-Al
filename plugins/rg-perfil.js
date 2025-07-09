import fs from 'fs';

const loadMarriages = () => {
  const path = './media/database/marry.json';
  if (fs.existsSync(path)) {
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    global.db.data.marriages = data;
} else {
    global.db.data.marriages = {};
}
};

let handler = async (m, { conn}) => {
  loadMarriages();

  let who = m.quoted?.sender || m.mentionedJid?.[0] || (m.fromMe? conn.user.jid: m.sender);
  const userData = global.db.data.users[who] || {};

  const {
    premium,
    level = 0,
    genre = 'No especificado',
    birth = 'No establecido',
    description = 'Sin descripción',
    estrellas = 0,
    exp = 0,
    registered = false,
    age = 'Sin especificar',
    role = 'Aldeano'
} = userData;

  const isMarried = who in global.db.data.marriages;
  const partner = isMarried? global.db.data.marriages[who]: null;
  const partnerName = partner? await conn.getName(partner): 'Nadie';

  const username = await conn.getName(who);
  const perfilpic = await conn.profilePictureUrl(who, 'image').catch(() => 'https://i.ibb.co/d0sfxs0T/file.jpg');

  const perfilTanjiro = `
🌸 *Perfil del Cazador* 🌸

👤 *Nombre:* ${username}
🎂 *Edad:* ${registered? age: 'Sin registrar'}
⚧️ *Género:* ${genre}
📅 *Cumpleaños:* ${birth}
💞 *Compañero de batalla:* ${partnerName}
📖 *Descripción:* ${description}
📌 *Registrado:* ${registered? '✅': '❌'}

🔰 *Estadísticas Ninja* 🔰
✨ *Estrellas:* ${estrellas}
⚔️ *Nivel:* ${level}
📈 *Experiencia:* ${exp}
🥋 *Rango:* ${role}

🗡️ *Domina tu camino como Tanjiro. Invoca este perfil con #perfil*
`.trim();

  await conn.sendFile(m.chat, perfilpic, 'perfil.jpg', perfilTanjiro, m, { mentions: [who]});
};

handler.help = ['perfil', 'profile'];
handler.tags = ['rg'];
handler.command = ['perfil', 'profile'];
handler.register = true;
handler.group = false;
handler.estrellas = 2;

export default handler;
