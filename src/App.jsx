import { useEffect, useState } from 'react'
import Home from './components/Home'
import Catalog from './components/Catalog'
import Budget from './components/Budget'
import Info from './components/Info'

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
        <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between">
          <span>Av. Libertador Gral. San Martín 3902, Rivadavia, San Juan</span>
          <span>© Ferretería Alcázar</span>
        </div>
      </footer>

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
