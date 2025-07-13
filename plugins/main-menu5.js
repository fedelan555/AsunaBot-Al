import sharp from "sharp";
import { promises as fs} from "fs";
import moment from "moment-timezone";

let handler = async (m, { conn, usedPrefix}) => {
  m.react("🍂"); // Reacción estilo natural
  let username = await conn.getName(m.sender); // Nombre del usuario

  // Intro Tanjiro decorada
  let tanjiroIntro = `
𝐇𝐨𝐥𝐚 ${username} 𝐒𝐨𝐲 =͟͟͞Tanjiro‐Bot≼᳞ׄ

ᴀǫᴜɪ ᴛɪᴇɴᴇs ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs
╭┈ ↷
│ ✐ Tanjiro bot 🌙᭄
│ ✐ ꒷ꕤ🌤️ദ ᴄᴏᴍᴀɴᴅᴏs ★
│   https://starvoid-club.vercel.app/commands
│ ✐ ꒷ꕤ🌤️ദ ᴄᴀɴᴀʟ ᴏғɪᴄɪᴀʟ ★
│   https://whatsapp.com/channel/0029Vb1AFK6HbFV9kaB3b13W
╰─────────────────
`.trim();

  // Estilo de saludo según hora
  const time = moment.tz("America/Los_Angeles").format("HH");
  const ucapan =
    time>= 18? "🌙 Buenas noches":
    time>= 15? "🌇 Buena tarde":
    time>= 10? "🌤️ Buen mediodía":
    time>= 4? "🌅 Buenos días":
                 "🌸 Hola";

  // Composición del texto final
  let txt = `${ucapan}, ${username}!\n\n${tanjiroIntro}\n\n乂 Tanjiro BOT te acompaña con honor.`

  // Imágenes necesarias
  let thumb = await sharp('./src/tanjiro_thumb.jpg').resize(400, 400).toBuffer();
  let docImg = await fs.readFile('./src/tanjiro_menu.jpg'); // imagen menú principal

  // Envío del mensaje estilo documento
  await conn.sendMessage(
    m.chat,
    {
      document: docImg,
      fileName: "Tanjiro_Bot_Menu.pdf",
      mimetype: "image/png",
      caption: txt,
      fileLength: 1950,
      jpegThumbnail: thumb,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: "🌸 Tanjiro BOT",
          body: "Compasión + Voluntad + Aliento de Agua",
          thumbnail: docImg,
          sourceUrl: "https://starvoid-club.vercel.app/commands",
          mediaType: 1,
          renderLargerThumbnail: true,
},
},
},
    { quoted: m}
);
};

handler.command = ["menu5", "help", "menú", "commands", "comandos", "?"];
export default handler;
