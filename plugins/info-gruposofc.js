let handler = async (m, { conn}) => {
  const nombre = await conn.getName(m.sender);
  const numero = m.sender.split('@')[0];
  
  const texto = `
🌸 Hola *${nombre}*, bienvenido a la comunidad Tanjiro Bot 🌕

📡 *Canal Oficial:*
https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N

👥 *Grupos Oficiales:*
- Tanjiro Clan Dojo: https://chat.whatsapp.com/FUoKxlGZ6fOLjH2GhMrA4E
- Subbots Community: https://chat.whatsapp.com/GfBTA3pYHxn8cPoVdCSLkn

🧑‍💻 *Creador Oficial:*
- Fedexyz: https://wa.me/5491156178758
- Gmail: fedexyzbot@gmail.com
- Proyecto: https://github.com/Fedexyz/TanjiroBot

💮 Respira profundo. Comparte con convicción.`.trim();

  await conn.sendMessage(m.chat, {
    image: { url: icono},
    caption: texto,
    buttons: [
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: '🎵 Ver TikTok Oficial',
          url: 'https://www.tiktok.com/@fedexyzbot',
          merchant_url: 'https://www.tiktok.com/@fedexyzbot'
})
}
    ],
    viewOnce: true
}, { quoted: m});
};

handler.command = ['grupos', 'l8nkw', 'grupofc'];
handler.tags = ['info'];
handler.help = ['grupos'];
export default handler;
