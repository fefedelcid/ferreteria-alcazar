import { NEGOCIO, PRODUCTOS, peso } from '../data'

export default function Budget({ cant, cambiar, vaciar, irA }) {
  const items = PRODUCTOS.filter((p) => cant[p.id])
  const total = items.reduce((s, p) => s + p.p * cant[p.id], 0)
  const msg = ['Hola Ferretería Alcázar, quiero consultar stock y precio de:', '',
    ...items.map((p) => `• ${cant[p.id]} x ${p.n} (${peso(p.p * cant[p.id])})`), '',
    `Total estimado: ${peso(total)}`].join('\n')
  const wa = `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(msg)}`

  if (!items.length) return (
    <div className="p-10 text-center">
      <p className="text-5xl">🧰</p>
      <h2 className="text-xl font-bold mt-3">Tu carrito está vacío</h2>
      <p className="text-slate-500 mt-1">Elegí productos del catálogo y armá tu lista de materiales.</p>
      <button onClick={() => irA('catalogo')} className="mt-5 bg-brand text-white font-semibold rounded-xl px-6 py-3">Ir al catálogo</button>
    </div>
  )
  return (
    <div className="p-4 md:max-w-xl md:mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Mi carrito</h2>
        <button onClick={vaciar} className="text-sm text-slate-500 underline">Vaciar lista</button>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((p) => (
          <li key={p.id} className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-3">
            <span className="text-3xl" aria-hidden>{p.e}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold leading-tight">{p.n}</p>
              <p className="text-sm text-slate-500">{peso(p.p)} c/u</p>
            </div>
            <div className="flex items-center gap-2">
              <button aria-label="Quitar uno" onClick={() => cambiar(p.id, -1)} className="h-8 w-8 rounded-full bg-slate-100 font-bold">−</button>
              <span className="w-5 text-center font-semibold">{cant[p.id]}</span>
              <button aria-label="Sumar uno" onClick={() => cambiar(p.id, 1)} className="h-8 w-8 rounded-full bg-brand text-white font-bold">+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 bg-ink text-white rounded-2xl p-4">
        <div className="flex justify-between items-baseline"><span>Total estimado</span><span className="text-2xl font-extrabold">{peso(total)}</span></div>
        <p className="text-xs text-slate-400 mt-1">Los precios pueden variar. Confirmá stock y valor final con el local.</p>
        <a href={wa} target="_blank" rel="noreferrer" className="block mt-3 bg-green-500 text-white text-center font-bold rounded-xl py-3 active:scale-95 transition">Enviar pedido por WhatsApp</a>
      </div>
    </div>
  )
}
