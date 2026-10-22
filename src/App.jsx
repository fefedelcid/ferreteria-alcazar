import { useEffect, useState } from 'react'
import Home from './components/Home'
import Catalog from './components/Catalog'
import Budget from './components/Budget'
import Info from './components/Info'
import {NEGOCIO} from './data'

const BASE = import.meta.env.BASE_URL
const ICONS = {
  inicio: 'M3 11l9-8 9 8M5 10v10h14V10',
  catalogo: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  presupuesto: 'M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21zM10 8h4M10 12h4',
  info: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4',
}
const Icon = ({ id }) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={ICONS[id]} /></svg>
)
const TABS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'presupuesto', label: 'Carrito' },
  { id: 'info', label: 'Contacto' },
]

export default function App() {
  const [tab, setTab] = useState('inicio')
  const [cant, setCant] = useState(() => {
    try { return JSON.parse(localStorage.getItem('alcazar-cart')) || {} } catch { return {} }
  })
  useEffect(() => { try { localStorage.setItem('alcazar-cart', JSON.stringify(cant)) } catch {} }, [cant])

  const cambiar = (id, d) => setCant((c) => {
    const n = { ...c, [id]: (c[id] || 0) + d }
    if (n[id] <= 0) delete n[id]
    return n
  })
  const total = Object.values(cant).reduce((a, b) => a + b, 0)
  const ir = (t) => { setTab(t); window.scrollTo(0, 0) }
  const Badge = ({ cls }) => total > 0 && (
    <span className={`bg-brand text-white rounded-full text-[10px] min-w-[18px] h-[18px] flex items-center justify-center font-bold ${cls}`}>{total}</span>
  )

  return (
    <div className="min-h-full flex flex-col pb-20 md:pb-0" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      {/* Barra superior: escritorio */}
      <header className="hidden md:block sticky top-0 z-30 bg-ink/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center">
          <button onClick={() => ir('inicio')} className="flex items-center gap-3" aria-label="Ir al inicio">
            <img src={`${BASE}logo-hexagono.png`} alt="" className="h-9 w-auto" />
            <img src={`${BASE}logo-alcazar.png`} alt="Ferretería Alcázar" className="h-5 w-auto" />
          </button>
          <nav className="ml-auto flex gap-1">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => ir(t.id)} aria-current={tab === t.id ? 'page' : undefined}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t.id ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white'}`}>
                {t.label}{t.id === 'presupuesto' && <Badge />}
              </button>
            ))}
          </nav>
        </div>
      </header>
      {/* Barra superior: móvil, fuera de Inicio */}
      {tab !== 'inicio' && (
        <div className="md:hidden bg-ink border-b-2 border-brand px-4 py-3 flex items-center gap-3">
          <img src={`${BASE}logo-hexagono.png`} alt="" className="h-7 w-auto" />
          <img src={`${BASE}logo-alcazar.png`} alt="Ferretería Alcázar" className="h-4 w-auto" />
        </div>
      )}

      <main className="flex-1">
        {tab === 'inicio' && <Home irA={ir} />}
        {tab === 'catalogo' && <Catalog agregar={(id) => cambiar(id, 1)} cant={cant} />}
        {tab === 'presupuesto' && <Budget cant={cant} cambiar={cambiar} vaciar={() => setCant({})} irA={ir} />}
        {tab === 'info' && <Info />}
      </main>

      <footer className="hidden md:block bg-ink text-slate-400 text-sm">
        <div className="max-w-6xl mx-auto px-8 pr-24 py-6 flex justify-between">
          <span>Av. Libertador Gral. San Martín 3902, Rivadavia, San Juan</span>
          <span>© Ferretería Alcázar</span>
        </div>
      </footer>

      {/* Botón de WhatsApp */}
      <a
        href={`https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent('Hola Ferretería Alcázar, quería hacerles una consulta.')}`}
        target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp"
        className="fixed right-4 bottom-24 md:right-8 md:bottom-8 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center transition hover:scale-105 hover:shadow-2xl active:scale-95"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      {/* Barra inferior: móvil */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-ink text-white grid grid-cols-4 border-t border-white/10"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => ir(t.id)} aria-current={tab === t.id ? 'page' : undefined}
            className={`relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold border-t-2 ${tab === t.id ? 'text-white border-brand' : 'text-slate-400 border-transparent'}`}>
            <Icon id={t.id} />{t.label}
            {t.id === 'presupuesto' && <Badge cls="absolute top-1 right-[24%]" />}
          </button>
        ))}
      </nav>
    </div>
  )
}
