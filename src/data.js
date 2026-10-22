export const NEGOCIO = {
  nombre: 'Ferretería Alcázar',
  direccion: 'Av. Libertador Gral. San Martín 3902, Rivadavia, San Juan',
  tel: '02645069902',
  whatsapp: '5492645069902', // formato internacional: 54 9 + área 264 + número
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Ferretería Alcázar, Av. Libertador Gral. San Martín 3902, Rivadavia, San Juan'),
  mapsEmbed: 'https://www.google.com/maps?q=' +
    encodeURIComponent('Av. Libertador Gral. San Martín 3902, Rivadavia, San Juan') + '&output=embed',
}

// Horarios según Google Maps. 0 = domingo. Formato: [apertura, cierre] en horas decimales (19.5 = 19:30)
export const HORARIOS = {
  1: [[9, 19.5]], 2: [[9, 19.5]], 3: [[9, 19.5]],
  4: [[9, 19.5]], 5: [[9, 19.5]], 6: [[9, 13]], 0: [],
}

export const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const fmt = (h) => `${Math.floor(h)}:${h % 1 ? '30' : '00'}`
export const textoDia = (d) => HORARIOS[d].length ? HORARIOS[d].map(([a, b]) => `${fmt(a)} a ${fmt(b)}`).join(' y ') : 'Cerrado'

export function estadoAhora() {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Argentina/San_Juan', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date())
  const get = (t) => p.find((x) => x.type === t).value
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  const h = (parseInt(get('hour')) % 24) + parseInt(get('minute')) / 60
  const abierto = HORARIOS[dia].some(([a, b]) => h >= a && h < b)
  return { abierto, dia }
}

export const CATEGORIAS = ['Todos', 'Herramientas', 'Electricidad', 'Plomería', 'Pinturería', 'Tornillería', 'Jardín']

// Precios ilustrativos de demo
export const PRODUCTOS = [
  { id: 1, n: 'Martillo carpintero 500 g', c: 'Herramientas', p: 8900, e: '🔨' },
  { id: 2, n: 'Taladro percutor 650 W', c: 'Herramientas', p: 68500, e: '🛠️' },
  { id: 3, n: 'Juego destornilladores x6', c: 'Herramientas', p: 12400, e: '🪛' },
  { id: 4, n: 'Cinta métrica 5 m', c: 'Herramientas', p: 4300, e: '📏' },
  { id: 5, n: 'Cable unipolar 2,5 mm (rollo 100 m)', c: 'Electricidad', p: 52000, e: '🔌' },
  { id: 6, n: 'Lámpara LED 12 W', c: 'Electricidad', p: 2900, e: '💡' },
  { id: 7, n: 'Tomacorriente doble', c: 'Electricidad', p: 3800, e: '⚡' },
  { id: 8, n: 'Canilla de cocina cromada', c: 'Plomería', p: 21900, e: '🚰' },
  { id: 9, n: 'Cinta teflón x10', c: 'Plomería', p: 3600, e: '🔧' },
  { id: 10, n: 'Flexible de agua 40 cm', c: 'Plomería', p: 4800, e: '🚿' },
  { id: 11, n: 'Látex interior 20 L', c: 'Pinturería', p: 74000, e: '🎨' },
  { id: 12, n: 'Rodillo antigota 22 cm', c: 'Pinturería', p: 6900, e: '🖌️' },
  { id: 13, n: 'Esmalte sintético 1 L', c: 'Pinturería', p: 17500, e: '🪣' },
  { id: 14, n: 'Tornillos autoperforantes x100', c: 'Tornillería', p: 5200, e: '🔩' },
  { id: 15, n: 'Tarugos nylon 8 mm x50', c: 'Tornillería', p: 3100, e: '📌' },
  { id: 16, n: 'Bulones y tuercas surtidos', c: 'Tornillería', p: 6400, e: '⚙️' },
  { id: 17, n: 'Manguera de riego 25 m', c: 'Jardín', p: 24500, e: '🌱' },
  { id: 18, n: 'Tijera de podar', c: 'Jardín', p: 11800, e: '✂️' },
  { id: 19, n: 'Pala ancha con cabo', c: 'Jardín', p: 14300, e: '⛏️' },
]
export const peso = (n) => '$' + n.toLocaleString('es-AR')

// ⚠️ RESEÑAS DE EJEMPLO: reemplazar por textos reales copiados de Google Maps (con permiso)
export const RESENAS = [
  { a: 'Cliente de Google Maps', t: 'Muy buena atención, te explican bien qué llevar para cada arreglo.', s: 5 },
  { a: 'Cliente de Google Maps', t: 'Buenos precios y siempre tienen lo que busco.', s: 5 },
  { a: 'Cliente de Google Maps', t: 'Atención amable y rápida. Los recomiendo.', s: 5 },
]
