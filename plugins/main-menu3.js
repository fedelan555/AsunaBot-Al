import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
    try {
    let { exp, diamantes, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    exp = exp || 'Desconocida';
    role = role || 'Aldeano';

    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length

        await m.react('🌹')
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/ninsr8.jpg')

const vid = ['https://files.catbox.moe/39rx3n.mp4', 'https://files.catbox.moe/5fbi9s.mp4', 'https://files.catbox.moe/biggyj.mp4']

        let menu = `*☀️ MENÚ - ESPÍRITU DEL SOL ☀️*

👤 Usuario: *Fede Bot*
⚔ Nivel: 
💥 Exp: 
🌙 Modo: Público
👥 Usuarios: 4
⏳ Activo: 00:55:16
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
🌸 ꜱɪꜱᴛᴇᴍᴀ ───────────✦
┃ 🌀 .creador

┃ 🌀 .host

┃ 🌀 .hosting

┃ 🌀 .totalfunciones

┃ 🌀 .menu

┃ 🌀 .menú

┃ 🌀 .menu2

┃ 🌀 .menu3

┃ 🌀 .menú3

┃ 🌀 .afk [alasan]

┃ 🌀 .runtime

┃ 🌀 .blocklist

╰──────────────✦

🌸 ɢʀᴜᴘᴏꜱ ───────────✦
┃ 🌀 .staff

┃ 🌀 .desbanearbot

┃ 🌀 .banearbot

┃ 🌀 .kickall

╰──────────────✦

🌸 ꜱᴜʙ ʙᴏᴛꜱ ───────────✦
┃ 🌀 .qr

┃ 🌀 .code

╰──────────────✦

🌸 ꜰᴜɴ ───────────✦
┃ 🌀 .asuba

┃ 🌀 .asuna-habla

┃ 🌀 .amistad

┃ 🌀 .facto

┃ 🌀 .memev

┃ 🌀 .pajeame

┃ 🌀 .formartrio @usuario1 @usuario2

┃ 🌀 .verdad

┃ 🌀 .acertijo

┃ 🌀 .gay <@tag> | <nombre>

┃ 🌀 .lesbiana <@tag> | <nombre>

┃ 🌀 .pajero <@tag> | <nombre>

┃ 🌀 .pajera <@tag> | <nombre>

┃ 🌀 .puto <@tag> | <nombre>

┃ 🌀 .puta <@tag> | <nombre>

┃ 🌀 .manco <@tag> | <nombre>

┃ 🌀 .manca <@tag> | <nombre>

┃ 🌀 .rata <@tag> | <nombre>

┃ 🌀 .prostituta <@tag> | <nombre>

┃ 🌀 .prostituto <@tag> | <nombre>

┃ 🌀 .apostar *<cantidad>*

┃ 🌀 .consejo

┃ 🌀 .dance *<@user>*

┃ 🌀 .ship

┃ 🌀 .love

┃ 🌀 .simi

┃ 🌀 .bot

┃ 🌀 .top *<texto>*

┃ 🌀 .zodiac *2002 02 25*

╰──────────────✦

🌸 ᴀɪ ───────────✦
┃ 🌀 .chatgpt <texto>

┃ 🌀 .ia <texto>

┃ 🌀 .gemini

╰──────────────✦

🌸 ᴀɴɪᴍᴇ ───────────✦
┃ 🌀 .animelink

┃ 🌀 .infoanime

┃ 🌀 .topwaifus [página]

┃ 🌀 .wvideo <nombre del personaje>

┃ 🌀 .wimage <nombre del personaje>

┃ 🌀 .charinfo <nombre del personaje>

┃ 🌀 .winfo <nombre del personaje>

┃ 🌀 .waifuinfo <nombre del personaje>

┃ 🌀 .alisa

┃ 🌀 .aihoshino

┃ 🌀 .remcham

┃ 🌀 .akira

┃ 🌀 .akiyama

┃ 🌀 .anna

┃ 🌀 .asuna

┃ 🌀 .ayuzawa

┃ 🌀 .boruto

┃ 🌀 .chiho

┃ 🌀 .chitoge

┃ 🌀 .deidara

┃ 🌀 .erza

┃ 🌀 .elaina

┃ 🌀 .eba

┃ 🌀 .emilia

┃ 🌀 .hestia

┃ 🌀 .hinata

┃ 🌀 .inori

┃ 🌀 .isuzu

┃ 🌀 .itachi

┃ 🌀 .itori

┃ 🌀 .kaga

┃ 🌀 .kagura

┃ 🌀 .kaori

┃ 🌀 .keneki

┃ 🌀 .kotori

┃ 🌀 .kurumitokisaki

┃ 🌀 .madara

┃ 🌀 .mikasa

┃ 🌀 .miku

┃ 🌀 .minato

┃ 🌀 .naruto

┃ 🌀 .nezuko

┃ 🌀 .sagiri

┃ 🌀 .sasuke

┃ 🌀 .sakura

╰──────────────✦

🌸 ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ───────────✦
┃ 🌀 .animesearch <nombre>

┃ 🌀 .play

┃ 🌀 .play

┃ 🌀 .play2

┃ 🌀 .play

┃ 🌀 .

┃ 🌀 .ytmp3

┃ 🌀 .yta

┃ 🌀 .ytmp4

┃ 🌀 .ytv

┃ 🌀 .musica *<búsqueda>*

┃ 🌀 .animedl <anime-id> <episode-number>

╰──────────────✦

🌸 ꜱᴇᴀʀᴄʜ ───────────✦
┃ 🌀 .animesearch <nombre>

┃ 🌀 .ytsearch *<texto>*

╰──────────────✦

🌸 ᴀᴜᴅɪᴏ ───────────✦
┃ 🌀 .bass [vn]

┃ 🌀 .blown [vn]

┃ 🌀 .deep [vn]

┃ 🌀 .earrape [vn]

┃ 🌀 .fast [vn]

┃ 🌀 .fat [vn]

┃ 🌀 .nightcore [vn]

┃ 🌀 .reverse [vn]

┃ 🌀 .robot [vn]

┃ 🌀 .slow [vn]

┃ 🌀 .smooth [vn]

┃ 🌀 .tupai [vn]

╰──────────────✦

🌸 ʙᴜꜱᴄᴀᴅᴏʀ ───────────✦
┃ 🌀 .pornhubsearch

┃ 🌀 .xnxxsearch <query>

┃ 🌀 .githubsearch

┃ 🌀 .mercadolibre <búsqueda>

┃ 🌀 .npmjs

┃ 🌀 .tweetposts

╰──────────────✦

🌸 ɪᴍɢ ───────────✦
┃ 🌀 .pinterest <término>

┃ 🌀 .waifu

╰──────────────✦

🌸 ɴᴀʙʟᴇ ───────────✦
┃ 🌀 .enable <option>

┃ 🌀 .disable <option>

╰──────────────✦

🌸 ᴏᴡɴᴇʀ ───────────✦
┃ 🌀 .enable <option>

┃ 🌀 .disable <option>

┃ 🌀 .addcoins *<@user>*

┃ 🌀 .expired *<días>*

┃ 🌀 .groups

┃ 🌀 .grouplist

┃ 🌀 .reunion

┃ 🌀 .meeting

┃ 🌀 .addprem [@user] <days>

┃ 🌀 .autoadmin

┃ 🌀 .copia

┃ 🌀 .banuser <@tag> <razón>

┃ 🌀 .broadcast

┃ 🌀 .bc

┃ 🌀 .broadcastgroup

┃ 🌀 .bcgc

┃ 🌀 .bcgc2

┃ 🌀 .bcg

┃ 🌀 .cheat

┃ 🌀 .cleartmp

┃ 🌀 .delprem <@user>

┃ 🌀 .dsowner

┃ 🌀 > 

┃ 🌀 => 

┃ 🌀 $

┃ 🌀 .fetch

┃ 🌀 .get

┃ 🌀 .ip <alamat ip>

┃ 🌀 .join <link>

┃ 🌀 .grupocrear <nombre>

┃ 🌀 .nuevabiobot <teks>

┃ 🌀 .nuevafotobot *<imagen>*

┃ 🌀 .nuevonombrebot <teks>

┃ 🌀 .resetpersonajes

┃ 🌀 .undefined

┃ 🌀 .restart

┃ 🌀 .unbanuser <@tag>

┃ 🌀 .update

┃ 🌀 .actualizar

╰──────────────✦

🌸 ᴛʀᴀɴꜱꜰᴏʀᴍᴀᴅᴏʀ ───────────✦
┃ 🌀 .tovideo

┃ 🌀 .togifaud

┃ 🌀 .tourl2

╰──────────────✦

🌸 ꜱᴛɪᴄᴋᴇʀ ───────────✦
┃ 🌀 .toimg (reply)

┃ 🌀 .stiker <img>

┃ 🌀 .sticker <url>

┃ 🌀 .qc

┃ 🌀 .take *<nombre>|<autor>*

╰──────────────✦

🌸 ᴛᴏᴏʟꜱ ───────────✦
┃ 🌀 .tts <lang> <teks>

┃ 🌀 .tourl

┃ 🌀 .spamwa <number>|<mesage>|<no of messages>

┃ 🌀 .fake

┃ 🌀 .hd

┃ 🌀 .ssweb

┃ 🌀 .ss

┃ 🌀 .trad

┃ 🌀 .nuevafotochannel

┃ 🌀 .nosilenciarcanal

┃ 🌀 .silenciarcanal

┃ 🌀 .noseguircanal

┃ 🌀 .seguircanal

┃ 🌀 .avisoschannel

┃ 🌀 .resiviravisos

┃ 🌀 .inspect

┃ 🌀 .inspeccionar

┃ 🌀 .eliminarfotochannel

┃ 🌀 .reactioneschannel

┃ 🌀 .reaccioneschannel

┃ 🌀 .nuevonombrecanal

┃ 🌀 .nuevadescchannel

┃ 🌀 .IPdoxx

┃ 🌀 .tourl2

╰──────────────✦

🌸 ᴅᴇꜱᴄᴀʀɢᴀꜱ ───────────✦
┃ 🌀 .hentai

┃ 🌀 .mediafire

┃ 🌀 .facebook

┃ 🌀 .fb

┃ 🌀 .gitclone *<url git>*

┃ 🌀 .instagram

┃ 🌀 .ig

┃ 🌀 .apkmod

╰──────────────✦

🌸 ᴅʟ ───────────✦
┃ 🌀 .tiktok

╰──────────────✦

🌸 ɢᴀᴄʜᴀ ───────────✦
┃ 🌀 .claim

┃ 🌀 .ver

┃ 🌀 .rw

┃ 🌀 .rollwaifu

╰──────────────✦

🌸 ᴇᴍᴏx ───────────✦
┃ 🌀 .agarrarnalgas @tag

┃ 🌀 .anal/culiar @tag

┃ 🌀 .angry/enojado @tag

┃ 🌀 .bath/bañarse @tag

┃ 🌀 .blowjob/mamada @tag

┃ 🌀 .blush/sonrojarse @tag

┃ 🌀 .chuparpata @tag

┃ 🌀 .cry/llorar @tag

┃ 🌀 .cuddle/acurrucarse @tag

┃ 🌀 .sexo/sex @tag

┃ 🌀 .sleep/dormir @tag

┃ 🌀 .violar/perra @tag

╰──────────────✦

🌸 ɢʀᴜᴘᴏ ───────────✦
┃ 🌀 .kick

┃ 🌀 .rentar

┃ 🌀 .add

┃ 🌀 .group open / close

┃ 🌀 .grupo abrir / cerrar

┃ 🌀 .delete

┃ 🌀 .demote

┃ 🌀 .encuesta <text|text2>

┃ 🌀 .undefined

┃ 🌀 .hidetag

┃ 🌀 .infogrupo

┃ 🌀 .invite *<numero>*

┃ 🌀 .link

┃ 🌀 .listadv

┃ 🌀 .promote

┃ 🌀 .revoke

┃ 🌀 .tagall *<mesaje>*

┃ 🌀 .invocar *<mesaje>*

╰──────────────✦

🌸 ɢʀᴜᴘᴏꜱ ───────────✦
┃ 🌀 .rentar2 *<link>*

╰──────────────✦

🌸 ɪɴꜰᴏ ───────────✦
┃ 🌀 .status

┃ 🌀 .grupos

┃ 🌀 reglas

┃ 🌀 .ds

┃ 🌀 .fixmsgespera

┃ 🌀 .ping

┃ 🌀 .sistema

┃ 🌀 .speed

┃ 🌀 .speedtest

┃ 🌀 .script

┃ 🌀 .reportar

╰──────────────✦

🌸 ᴊᴀᴅɪʙᴏᴛ ───────────✦
┃ 🌀 .bots

┃ 🌀 .token

┃ 🌀 .gettoken

┃ 🌀 .serbottoken

╰──────────────✦

🌸 ꜰɪx ───────────✦
┃ 🌀 .dsowner

╰──────────────✦

🌸 ʀᴘɢ ───────────✦
┃ 🌀 .lb

┃ 🌀 .bank

┃ 🌀 .banco

┃ 🌀 .depositar

┃ 🌀 .retirar

┃ 🌀 .transferir @usuario cantidad

┃ 🌀 .daily

┃ 🌀 .claim

┃ 🌀 .levelup

┃ 🌀 .minar

┃ 🌀 .rob2

┃ 🌀 .rob

┃ 🌀 .trabajar

╰──────────────✦

🌸 ʀɢ ───────────✦
┃ 🌀 .profile

┃ 🌀 .reg

┃ 🌀 .unreg

╰──────────────✦

🌸 ᴘʀᴇᴍɪᴜᴍ ───────────✦
┃ 🌀 .comprarpremium <cantidad> <unidad>

╰──────────────✦

🌸 ᴇᴄᴏɴᴏᴍʏ ───────────✦
┃ 🌀 .Buy

┃ 🌀 .Buyall

╰──────────────✦

☀️ Domina el aliento del Sol y sigue adelante...
`.trim()

        await conn.sendMessage(m.chat, {
            video: { url: vid.getRandom() }, // Vid
            caption: menu,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 999,
                externalAdReply: {
                    title: '⏤͟͞ू⃪ ፝͜⁞Sʜᴀᴅᴏᴡ✰⃔࿐\nNᴜᴇᴠᴀ Vᴇʀsɪᴏɴ Uʟᴛʀᴀ 🌤️',
                    thumbnailUrl: perfil,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                },
            },
            gifPlayback: true,
            gifAttribution: 0
        }, { quoted: null })
    } catch (e) {
        await m.reply(`*✖️ Ocurrió un error al enviar el menú.*\n\n${e}`)
    }
}

handler.help = ['menu3'];
handler.tags = ['main'];
handler.command = /^(menu3|menú3|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
handler.fail = null;

export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
          }
