import { useEffect, useState } from 'react'
import { NEGOCIO, RESENAS, estadoAhora, textoDia } from '../data'

const BASE = import.meta.env.BASE_URL

function Estado({ irA }) {
  const { abierto, dia } = estadoAhora()
  return (
    <div className="bg-white text-ink rounded-2xl shadow-2xl p-5 md:p-7">
      <div className="flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${abierto ? 'bg-green-500' : 'bg-red-500'}`} />
        <p className="font-bold text-lg">{abierto ? 'Abierto ahora' : 'Cerrado ahora'}</p>
        <p className="ml-auto text-sm text-slate-500">Hoy: {textoDia(dia)}</p>
      </div>
      <p className="text-sm text-slate-600 mt-2">{NEGOCIO.direccion}</p>
      <div className="grid grid-cols-2 gap-3 mt-5">
        <a href={`tel:${NEGOCIO.tel}`} className="bg-brand text-white font-semibold rounded-xl py-3 text-center transition hover:brightness-110 active:scale-95">Llamar por teléfono</a>
        <a href={NEGOCIO.mapsUrl} target="_blank" rel="noreferrer" className="bg-ink text-white font-semibold rounded-xl py-3 text-center transition hover:bg-slate-700 active:scale-95">Cómo llegar</a>
      </div>
      <button onClick={() => irA('catalogo')} className="w-full mt-3 border-2 border-brand text-brand font-semibold rounded-xl py-3 transition hover:bg-brand hover:text-white">Ver catálogo</button>
    </div>
  )
}

export default function Home({ irA }) {
  const [items, setItems] = useState(RESENAS)
  const [meta, setMeta] = useState(null)

  // Opiniones reales de Google: las genera scripts/fetch-reviews.mjs al compilar
  useEffect(() => {
    fetch(`${BASE}resenas.json`).then((r) => (r.ok ? r.json() : null)).then((d) => {
      if (d?.reviews?.length) { setItems(d.reviews); setMeta({ rating: d.rating, total: d.total }) }
    }).catch(() => {})
  }, [])

  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-white border-b-4 border-brand"
        style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,.025) 0 2px, transparent 2px 16px)' }}>
        <img src={`${BASE}logo-hexagono.png`} alt="" aria-hidden className="hidden md:block absolute -right-24 -bottom-28 h-[30rem] w-auto opacity-[0.05]" />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-10 pb-14 md:py-24 md:grid md:grid-cols-2 md:gap-16 md:items-center">
          <div>
            <img src={`${BASE}logo-hexagono.png`} alt="" className="h-16 md:h-24 w-auto" />
            <h1 className="mt-5 md:mt-7">
              <img src={`${BASE}logo-alcazar.png`} alt="Ferretería Alcázar" className="h-9 md:h-14 w-auto" />
            </h1>
            <p className="text-slate-300 mt-5 max-w-md md:text-xl md:leading-relaxed">Todo lo que necesitás para tus arreglos y construcción, cerca tuyo.</p>
            <p className="text-slate-400 text-sm mt-2">Rivadavia, San Juan</p>
          </div>
          <div className="hidden md:block"><Estado irA={irA} /></div>
        </div>
      </section>
      <div className="md:hidden -mt-8 mx-4 relative"><Estado irA={irA} /></div>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-2xl md:text-3xl font-extrabold">Lo que dicen nuestros clientes</h2>
          {meta && (
            <p className="text-sm text-slate-500"><span className="font-bold text-ink">★ {Number(meta.rating).toFixed(1)}</span> · {meta.total} opiniones en Google</p>
          )}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
          {items.map((r, i) => (
            <figure key={i} className="bg-white rounded-2xl p-6 border border-slate-200 border-t-2 border-t-brand flex flex-col">
              <div className="text-brand tracking-wider" aria-label={`${r.s ?? r.rating} estrellas`}>{'★'.repeat(r.s ?? r.rating)}</div>
              <blockquote className="mt-2 text-slate-700 leading-relaxed flex-1 line-clamp-6">{r.t ?? r.texto}</blockquote>
              <figcaption className="text-sm text-slate-500 mt-4 font-semibold">{r.a ?? r.autor}
                {r.cuando && <span className="font-normal text-slate-400"> · {r.cuando}</span>}</figcaption>
            </figure>
          ))}
        </div>
        {meta && <p className="text-xs text-slate-400 mt-4">Opiniones publicadas en Google Maps.</p>}
      </section>
    </div>
  )
}
