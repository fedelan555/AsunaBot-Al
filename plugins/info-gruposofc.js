const handler = async (m, { conn}) => {
  const icono = 'https://files.catbox.moe/sbzc3p.jpg'; // Imagen decorativa Tanjiro Bot
  const texto = `
🗡️ *TANJIRO BOT — CUENTAS OFICIALES*

╭─❖ *Cuentas Oficiales* ─╮
│
│ 🌀 *Canal GalaxyForge*
│   ➤ https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
│
│ 🌟 *Comunidad Oficial*
│   ➤ https://chat.whatsapp.com/NADA_XD
│
│ 🧩 *GitHub del creador*
│   ➤ https://github.com/fedelan555
│
│ 🎶 *TikTok*
│   ➤ https://www.tiktok.com/@frases_isagi
│
│ 📮 *Email*
│   ➤ fedelanyt20@gmail.com
│
│ 🎴 *Contacto directo*
│   ➤ https://wa.me/5491156178758
╰────────────────────────╯

🎩 *Powered by Fedexyz*
`.trim();

  await conn.sendMessage(m.chat, {
    image: { url: icono},
    caption: texto,
    buttons: [
      {
        buttonId: '#menucompleto',
        buttonText: { displayText: '🌸 MENU COMPLETO'},
        type: 1
},
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: '🎶 TikTok Oficial',
          url: 'https://www.tiktok.com/@frases_isagi',
          merchant_url: 'https://www.tiktok.com/@frases_isagi'
})
}
    ],
    viewOnce: true
}, { quoted: m});
};

handler.command = /^(grupos|links|grupobot|creador)$/i;
export default handler;
