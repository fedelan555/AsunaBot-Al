import fetch from 'node-fetch'

const CLIENT_ID = 'TU_CLIENT_ID'
const CLIENT_SECRET = 'TU_CLIENT_SECRET'

const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
},
    body: 'grant_type=client_credentials'
})

  const data = await response.json()
  return data.access_token
}

const searchTrack = async (query) => {
  const token = await getAccessToken()
  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
    headers: {
      'Authorization': `Bearer ${token}`
}
})

  const data = await response.json()
  if (!data.tracks ||!data.tracks.items.length) throw new Error('🎵 No se encontraron resultados.')

  const track = data.tracks.items[0]
  return {
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    album: track.album.name,
    preview_url: track.preview_url,
    image: track.album.images[0]?.url,
    spotify_url: track.external_urls.spotify
}
}

// Ejemplo de uso
const handler = async (m, { conn, text}) => {
  try {
    if (!text) return m.reply('🔍 Ingresa el nombre de una canción para buscar en Spotify.')

    const result = await searchTrack(text)
    let message = `🎶 *${result.title}*\n👤 Artista: ${result.artist}\n💿 Álbum: ${result.album}\n🔗 Spotify: ${result.spotify_url}`

    await conn.sendMessage(m.chat, {
      image: { url: result.image},
      caption: message,
      audio: result.preview_url? { url: result.preview_url}: undefined
}, { quoted: m})

} catch (e) {
    console.error(e)
    m.reply('❌ Error al buscar en Spotify o la pista no tiene preview disponible.')
}
}

handler.help = ['spotify2']
handler.tags = ['Descargas']
handler.command = ['spotify2', 'spot2']

export default handler
```

---

*🔐 Requisitos*

- Crea una app en [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) para obtener tu `CLIENT_ID` y `CLIENT_SECRET`.
- Las previews son solo fragmentos de 30 segundos. No es posible descargar la canción completa legalmente desde la API oficial.

---

¿Quieres combinar este resultado con YouTube para obtener versiones completas automáticamente? Puedo ayudarte a crear un puente entre ambos 🔗🎧.
