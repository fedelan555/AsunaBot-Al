let handler = async (m) => {
  const tienda = `
🎒 *DOJO DE SUMINISTROS - Tanjiro Bot* 🎒

🌸 Usa: *.comprar [objeto] [cantidad]*

🧭 Objetos disponibles:

🍃 *hierba_medicinal* – 💰 20 monedas
▸ Restaura un 10% de energía espiritual.

🍱 *bento* – 💰 15 monedas
▸ Alimento básico para cazadores. (uso futuro)

🔥 *flor_llama* – 💰 50 monedas
▸ Revive al cazador si fue abatido. (uso futuro)

📿 *foco_respiracion* – 💰 35 monedas
▸ Aumenta el XP de pelea durante 1 combate.

🛡️ *tela_nichirin* – 💰 60 monedas
▸ Reduce el daño recibido por técnicas demoníacas. (futuro)

🔋 *piedra_sol* – 💰 40 monedas
▸ Restaura la llama interior si está agotada. (uso futuro)

🎎 *amuletos_nezuko* – 💰 25 monedas
▸ Mejora el vínculo espiritual y la lealtad. (uso futuro)

💰 Ejemplo: *.comprar hierba_medicinal 3*

📦 Usa *.inventario* para revisar tus pertenencias.
`.trim()

  m.reply(tienda)
}

handler.help = ['tienda']
handler.tags = ['rpg']
handler.command = ['tienda']
handler.register = true

export default handler
