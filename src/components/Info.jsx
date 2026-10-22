import { DIAS, NEGOCIO, textoDia, estadoAhora } from '../data'

export default function Info() {
  const { dia } = estadoAhora()
  const orden = [1, 2, 3, 4, 5, 6, 0]
  return (
    <div className="p-4 space-y-5 md:max-w-xl md:mx-auto">
      <section>
        <h2 className="text-xl font-bold">Dónde estamos</h2>
        <p className="text-slate-600 mt-1">{NEGOCIO.direccion}</p>
        <iframe title="Mapa de Ferretería Alcázar" src={NEGOCIO.mapsEmbed} loading="lazy"
          className="w-full h-56 rounded-2xl border border-slate-200 mt-3" />
        <div className="grid grid-cols-2 gap-3 mt-3">
          <a href={NEGOCIO.mapsUrl} target="_blank" rel="noreferrer" className="bg-ink text-white rounded-xl py-3 text-center font-semibold">Abrir en Maps</a>
          <a href={`tel:${NEGOCIO.tel}`} className="bg-brand text-white rounded-xl py-3 text-center font-semibold">Llamar</a>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold">Horarios de atención</h2>
        <ul className="mt-2 bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
          {orden.map((d) => (
            <li key={d} className={`flex justify-between px-4 py-2.5 ${d === dia ? 'font-bold text-brand' : ''}`}>
              <span>{DIAS[d]}</span><span>{textoDia(d)}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-bold">Medios de pago</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {['💳 Tarjetas de crédito', '💳 Tarjetas de débito', '📱 Pagos móviles NFC', '💵 Efectivo'].map((m) => (
            <span key={m} className="bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-semibold">{m}</span>
          ))}
        </div>
      </section>
    </div>
  )
}
