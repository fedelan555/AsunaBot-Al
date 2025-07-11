
let handler = async (m, { conn, usedPrefix, command, text}) => {
    if (!text) return m.reply(`*Ejemplo:* ${usedPrefix + command} texto | usuario | [nombre] | [likes] | [txt citado] | [retweets] | [cliente] | [perfil_url] | [tweet_img_url]\n\n*Uso:* ${usedPrefix + command} Hello World! | erickson | erickson | 1000 | 500 | 100 | Twitter | https://files.image/example.jpg | https://files.image/example.jpg\n\nLos que están entre paréntesis son opcionales`)

    const parts = text.split('|').map(part => part.trim())

    const tweet = parts[0]
    const username = parts[1]

    if (!tweet || !username || parts.length < 2) return m.reply(`*Ejemplo:* ${usedPrefix + command} texto | usuario | [nombre] | [likes] | [txt citado] | [retweets] | [cliente] | [perfil_url] | [tweet_img_url]\n\n*Uso:* ${usedPrefix + command} Hello World! | erickson | erickson | 1000 | 500 | 100 | Twitter | https://files.image/example.jpg | https://files.image/example.jpg\n\nLos que están entre paréntesis son opcionales`)

    const usernames = username.replace(/\s/g, '')

    const name = parts.length > 2 && parts[2] ? parts[2] : null
    const likes = parts.length > 3 && parts[3] ? parts[3] : '5000'
    const quotes = parts.length > 4 && parts[4] ? parts[4] : '200'
    const retweets = parts.length > 5 && parts[5] ? parts[5] : '1000'
    const client = parts.length > 6 && parts[6] ? parts[6] : 'Twitter for Android'
    const profile = parts.length > 7 && parts[7] ? parts[7] : null
    const tweet_image = parts.length > 8 && parts[8] ? parts[8] : null


    let profiles = profile
    if (!profiles) {
        try {
            profiles = await conn.profilePictureUrl(m.sender, "image")
        } catch (err) {
            profiles = 'https://files.catbox.moe/wav09n.jpg'
        }
    }

    let names = name
    if (!names) {
        names = m.pushName || "No Name"
    }

    const PARAMS = new URLSearchParams({
        profile: profiles,
        name: names,
        username: usernames,
        tweet: tweet,
        image: tweet_image,
        theme: 'dark',
        retweets: retweets,
        quotes: quotes,
        likes: likes,
        client: client
    })

    try {
        await conn.sendMessage(m.chat, { react: { text: "🔎", key: m.key} })

        conn.sendMessage(m.chat, { image: { url: `https://api.siputzx.my.id/api/m/tweet?${PARAMS.toString()}` }, caption: '' }, { quoted: m })
    } catch (err) {
        console.error('Error:', err)
        m.reply('Error en la api')
    }
}

handler.command = ["tweet"]
handler.tags = ["tools"]
handler.help = [`tweet texto | usuario | [nombre] | [likes] | [txt citado] | [retweets] | [cliente] | [perfil_url] | [tweet_img_url]`]
export default handler
