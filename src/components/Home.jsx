import { NEGOCIO, RESENAS, estadoAhora, textoDia } from '../data'

export default function Home({ irA }) {
  const { abierto, dia } = estadoAhora()
  return (
    <div>
      <header className="bg-ink text-white px-5 pt-10 pb-14 rounded-b-[2rem] border-b-4 border-brand">
  <img src={`${import.meta.env.BASE_URL}logo-hexagono.png`} alt="" className="h-16 w-auto" />
  <h1 className="mt-4">
    <img src={`${import.meta.env.BASE_URL}logo-alcazar.png`} alt="Ferretería Alcázar" className="h-9 w-auto" />
  </h1>
  <p className="text-slate-300 mt-4 max-w-sm">Todo lo que necesitás para tus arreglos y construcción, cerca tuyo.</p>
  <p className="text-slate-400 text-sm mt-1">Rivadavia, San Juan</p>
</header>

      <section className="-mt-8 mx-4 bg-white rounded-2xl shadow-lg p-4 md:max-w-xl md:mx-auto">
        <div className="flex items-center gap-3">
          <span className={`h-3 w-3 rounded-full ${abierto ? 'bg-green-500' : 'bg-red-500'}`} />
          <p className="font-bold text-lg">{abierto ? 'Abierto ahora' : 'Cerrado ahora'}</p>
          <p className="ml-auto text-sm text-slate-500">Hoy: {textoDia(dia)}</p>
        </div>
        <p className="text-sm text-slate-600 mt-2">{NEGOCIO.direccion}</p>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <a href={`tel:${NEGOCIO.tel}`} className="bg-brand text-white font-semibold rounded-xl py-3 text-center active:scale-95 transition">Llamar por teléfono</a>
          <a href={NEGOCIO.mapsUrl} target="_blank" rel="noreferrer" className="bg-ink text-white font-semibold rounded-xl py-3 text-center active:scale-95 transition">Cómo llegar</a>
        </div>
        <button onClick={() => irA('catalogo')} className="w-full mt-3 border-2 border-brand text-brand font-semibold rounded-xl py-3">Ver catálogo</button>
      </section>

      <section className="px-4 mt-8 md:max-w-xl md:mx-auto">
        <h2 className="text-xl font-bold">Lo que dicen nuestros clientes</h2>
        <div className="mt-3 space-y-3">
          {RESENAS.map((r, i) => (
            <figure key={i} className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-brand" aria-label={`${r.s} estrellas`}>{'★'.repeat(r.s)}</div>
              <blockquote className="mt-1 text-slate-700">{r.t}</blockquote>
              <figcaption className="text-xs text-slate-400 mt-2">{r.a}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}
