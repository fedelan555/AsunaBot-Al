const handler = async (m, { conn}) => {
  const icono = 'https://files.catbox.moe/sbzc3p.jpg' // 🖼️ Imagen decorativa estilo TanjiroBot

  const texto = `
≡ 会 🧣︵˚˖𓆩⌇𓆪˖˚︵🌸︵˚˖𓆩⌇𓆪˖˚︵🧣 会 ≡

🗡️ *𝖳𝖠𝖭𝖩𝖨𝖱𝖮 𝖡𝖮𝖳 — 𝖢𝖴𝖤𝖭𝖳𝖠𝖲 𝖮𝖥𝖨𝖢𝖨𝖠𝖫𝖤𝖲*

╭─✦ 𝖢𝖠𝖹𝖠𝖣𝖮𝖱𝖤𝖲 𝖣𝖤 𝖫𝖠 𝖱𝖤𝖣 ✦─╮
│ 🌀 *𝖢𝖠𝖭𝖠𝖫 𝖦𝖠𝖫𝖠𝖷𝖸𝖥𝖮𝖱𝖦𝖤*
│     ↯ https://whatsapp.com/channel/0029VbApe6jG8l5Nv43dsC2N
│
│ 🌟 *𝖢𝖮𝖬𝖴𝖭𝖨𝖣𝖠𝖣 𝖮𝖥𝖨𝖢𝖨𝖠𝖫*
│     ↯ https://chat.whatsapp.com/GgPP07cL54iL6C1lrwX0fz
│
│ 🎶 *𝖳𝖨𝖪𝖳𝖮𝖪*
│     ↯ https://www.tiktok.com/@frases_isagi
│
│ 📮 *𝖤𝖬𝖠𝖨𝖫*
│     ↯ fedelanyt20@gmail.com
│
│ 🎴 *𝖢𝖮𝖭𝖳𝖠𝖢𝖳𝖮 𝖣𝖨𝖱𝖤𝖢𝖳𝖮*
│     ↯ https://wa.me/5491156178758
╰─────────────────────────────╯

🧣 *𝖡𝖮𝖳 𝖯𝖱𝖨𝖭𝖢𝖨𝖯𝖠𝖫: wa.me/5491137612743*
🎩 *𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 𝖥𝖾𝖽𝖾𝗑𝗒𝗓*
`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: icono},
    caption: texto,
    buttons: [
      {
        buttonId: '#menucompleto',
        buttonText: { displayText: '🌸 𝖬𝖤𝖭𝖴 𝖢𝖮𝖬𝖯𝖫𝖤𝖳𝖮'},
        type: 1
}
    ],
    viewOnce: true
}, { quoted: m})
}

handler.command = /^(grupos|links|grupobot|creador)$/i
export default handler
