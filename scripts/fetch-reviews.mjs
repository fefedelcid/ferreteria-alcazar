// Descarga las opiniones de Google Maps al compilar y guarda public/resenas.json
// Requiere secretos: GOOGLE_PLACES_API_KEY y GOOGLE_PLACE_ID. Si faltan, no hace nada.
import { writeFileSync } from 'node:fs'

const MIN_ESTRELLAS = 5 // "superiores a 4" = 5 estrellas. Poné 4 para incluir también las de 4.
const { GOOGLE_PLACES_API_KEY: key, GOOGLE_PLACE_ID: id } = process.env
if (!key || !id) { console.log('Sin credenciales de Google: se usan las opiniones de ejemplo.'); process.exit(0) }

const res = await fetch(`https://places.googleapis.com/v1/places/${id}?languageCode=es`, {
  headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,reviews' },
})
if (!res.ok) { console.error('Error de Places API:', await res.text()); process.exit(0) } // no rompe el deploy

const d = await res.json()
const reviews = (d.reviews || [])
  .filter((r) => r.rating >= MIN_ESTRELLAS && r.text?.text)
  .map((r) => ({
    autor: r.authorAttribution?.displayName || 'Cliente de Google',
    rating: r.rating, texto: r.text.text, cuando: r.relativePublishTimeDescription || '',
  }))
if (!reviews.length) { console.log('Google no devolvió opiniones que cumplan el filtro.'); process.exit(0) }

writeFileSync('public/resenas.json', JSON.stringify({ rating: d.rating, total: d.userRatingCount, reviews }, null, 2))
console.log(`Guardadas ${reviews.length} opiniones.`)
