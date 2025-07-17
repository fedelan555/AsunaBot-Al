const codigosArabes = [
  '+212', '+971', '+20', '+966', '+964', '+963', '+973', '+968', '+974',
  '+961', '+962', '+90', '+967', '+269', '+218', '+886', '+882', '+998', '+960'
];

const regexArabe = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
const regexComando = /^[\/!#.]/;

global.advertenciasArabes = global.advertenciasArabes || {};

export async function before(m, { conn, isOwner, isROwner}) {
  try {
    if (
      m.isBaileys || m.isGroup ||!m.message ||!m.sender ||
      typeof m.text!== 'string' || isOwner || isROwner
) return false;

    const numero = m.sender;
    const texto = m.text;
    const numeroLimpio = numero.replace(/[^0-9]/g, '');

    const esArabe = regexArabe.test(texto) || codigosArabes.some(pref => numeroLimpio.startsWith(pref.replace('+', '')));
    const esComando = regexComando.test(texto);

    if (esArabe &&!esComando) {
      global.advertenciasArabes[numero] = (global.advertenciasArabes[numero] || 0) + 1;
      const advertencias = global.advertenciasArabes[numero];

      if (advertencias>= 3) {
        await m.reply(`
☣〘𝖼𝗋𝖾𝖺𝖽𝗈𝗋 CyberShield™〙☣
🟥 ⛔ *[BLOQUEO DEFINITIVO]* ⛔ 🟥
══════════════════════
🛡️ *Modo Tanjiro activado* 🧣
📛 Usuario: ${numero}
💬 Detalle: Texto prohibido (3/3)

⚔️ *“Protéger a los demás es nuestra misión.” — Tanjiro Kamado*
💢 Protocolo AUTOBLOCK-ΣX3 ejecutado
🔒 Usuario bloqueado por seguridad

🔗 Acceso eliminado.
══════════════════════`);
        await conn.updateBlockStatus(m.chat, 'block');
        console.log(`[⛔ BLOQUEO TOTAL] ${numero}`);
        delete global.advertenciasArabes[numero];
} else {
        await m.reply(`
☣〘𝖼𝗋𝖾𝖺𝖽𝗈𝗋 CyberShield™〙☣
⚠️ ADVERTENCIA ${advertencias}/3 ⚠️
══════════════════════
🧣 *Sistema en alerta estilo Tanjiro*
💬 Texto árabe detectado ❌

📎 Solo comandos permitidos:
✦ */menu* ◈ */help* ◈ */code*

🧬 “La fuerza nace del respeto.” — Tanjiro
⚡ Próxima violación activará *bloqueo automático*
══════════════════════`);
        console.log(`[⚠️ ADVERTENCIA ${advertencias}/3] ${numero}`);
}

      return false;
}

    return true;

} catch (e) {
    console.error('[❌ ERROR EN SISTEMA CyberShield 𝖼𝗋𝖾𝖺𝖽𝗈𝗋]', e);
    return true;
}
}
