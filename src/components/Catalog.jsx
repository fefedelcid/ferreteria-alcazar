import { useMemo, useState } from 'react'
import { CATEGORIAS, PRODUCTOS, peso } from '../data'

export default function Catalog({ agregar, cant }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Todos')
  const lista = useMemo(() => PRODUCTOS.filter((p) =>
    (cat === 'Todos' || p.c === cat) && p.n.toLowerCase().includes(q.trim().toLowerCase())), [q, cat])

  return (
    <div className="md:max-w-4xl md:mx-auto">
      <div className="sticky top-0 z-10 bg-paper px-4 pt-4 pb-2 border-b border-slate-200">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar: taladro, cable, pintura…"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand" />
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-3 pb-1">
          {CATEGORIAS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold ${cat === c ? 'bg-brand text-white' : 'bg-white border border-slate-300 text-ink'}`}>{c}</button>
          ))}
        </div>
      </div>

      {lista.length === 0 ? (
        <p className="text-center text-slate-500 p-10">No encontramos “{q}”. Probá con otra palabra o consultanos por WhatsApp.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4">
          {lista.map((p) => (
            <article key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
              <div className="h-24 bg-slate-100 flex items-center justify-center text-5xl" aria-hidden>{p.e}</div>
              <div className="p-3 flex flex-col flex-1">
                <p className="text-xs text-brand font-semibold">{p.c}</p>
                <h3 className="font-semibold leading-snug mt-0.5 flex-1">{p.n}</h3>
                <p className="mt-2 font-extrabold text-lg">{peso(p.p)}</p>
                <p className="text-[11px] text-slate-400">Precio estimativo</p>
                <button onClick={() => agregar(p.id)} className="mt-2 bg-ink text-white rounded-lg py-2 text-sm font-semibold active:scale-95 transition">
                  {cant[p.id] ? `Agregado (${cant[p.id]}) · sumar otro` : 'Agregar al carrito'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
