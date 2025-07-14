const handler = async (m, { conn}) => {
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/sbzc3p.jpg'}, // Puedes cambiar esta imagen si deseas otro estilo
    caption: global.ComprarBot,
    buttons: [
      {
        buttonId: '#menu',
        buttonText: { displayText: '🌸 MENU'},
        type: 1
}
    ],
    viewOnce: true
}, { quoted: m});
};

handler.command = /^(comprarbot|comprar|tanjiropro)$/i;
export default handler;

global.ComprarBot = `
🗡️ *TANJIRO BOT — COMPRAS OFICIALES*

╭── ❖ Servicios Disponibles ❖ ──╮
│
│ 💎 *BOT PARA GRUPO*
│   —> wa.me/5491156178758
│
│ 🎴 *BOT PERSONALIZADO*
│   —> wa.me/5491156178758
│
│ 🔗 *Canal Oficial*
│   —> https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
│
╰─────────────────────────────╯

🌸 *Tanjiro Bot* es forjado con honor, estética y funciones interactivas.
Si deseas adquirir tu bot personalizado, escribe al creador oficial:
🎩 *Powered by Fedexyz*
`;
