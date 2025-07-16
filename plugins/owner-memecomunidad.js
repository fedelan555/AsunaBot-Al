import axios from 'axios'

const fuenteTanjiro = (text) => {
  const map = {
    a:'𝖺', b:'𝖻', c:'𝖼', d:'𝖽', e:'𝖾', f:'𝖿', g:'𝗀',
    h:'𝗁', i:'𝗂', j:'𝗃', k:'𝗄', l:'𝗅', m:'𝗆', n:'𝗇',
    o:'𝗈', p:'𝗉', q:'𝗊', r:'𝗋', s:'𝗌', t:'𝗍', u:'𝗎',
    v:'𝗏', w:'𝗐', x:'𝗑', y:'𝗒', z:'𝗓'
}
  return text.toLowerCase().split('').map(c => map[c] || c).join('')
}

const handler = async (m, { conn}) => {
  m.react('📸')

  try {
    const res = await axios.get('https://g-mini-ia.vercel.app/api/meme')
    const memeUrl = res.data.url

    if (!memeUrl) {
      return m.reply('❌ No se pudo obtener el meme.')
}

    const texto = `
╭─〔 ${fuenteTanjiro('🧣 TanjiroBot - Meme Oficial para la Comunidad')} 〕─⬣
│💬 ${fuenteTanjiro('Humor en medio de la batalla, para los cazadores conectados.')}
╰────────────────────────⬣`.trim()

    await conn.sendMessage('120363421472190172@g.us', {
      image: { url: memeUrl},
      caption: texto
})

    m.reply(`✅ ${fuenteTanjiro('Meme enviado a la comunidad oficial 🌸')}`)
} catch (e) {
    console.error(e)
    m.reply(`❌ ${fuenteTanjiro('Hubo un error al intentar enviar el meme a la comunidad')}`)
}
}

handler.command = ['enviarmeme2']
handler.tags = ['owner']
handler.rowner = true

export default handler
