import { useEffect, useState } from 'react'
import Home from './components/Home'
import Catalog from './components/Catalog'
import Budget from './components/Budget'
import Info from './components/Info'

const TABS = [
  { id: 'inicio', label: 'Inicio', icon: '🏠' },
  { id: 'catalogo', label: 'Catálogo', icon: '🧰' },
  { id: 'carrito', label: 'Carrito', icon: '🧾' },
  { id: 'info', label: 'Contacto', icon: '📍' },
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

  return (
    <div className="min-h-full pb-24" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      {tab !== 'inicio' && (
        <div className="bg-ink border-b-2 border-brand px-4 py-3 flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}logo-hexagono.png`} alt="" className="h-7 w-auto" />
          <img src={`${import.meta.env.BASE_URL}logo-alcazar.png`} alt="Ferretería Alcázar" className="h-4 w-auto" />
        </div>
      )}
      <main>
        {tab === 'inicio' && <Home irA={ir} />}
        {tab === 'catalogo' && <Catalog agregar={(id) => cambiar(id, 1)} cant={cant} />}
        {tab === 'carrito' && <Budget cant={cant} cambiar={cambiar} vaciar={() => setCant({})} irA={ir} />}
        {tab === 'info' && <Info />}
      </main>
      <nav className="fixed bottom-0 inset-x-0 bg-ink text-white grid grid-cols-4 border-t border-slate-700"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => ir(t.id)} aria-current={tab === t.id ? 'page' : undefined}
            className={`relative flex flex-col items-center py-2.5 text-xs font-semibold border-t-2 ${tab === t.id ? 'text-white border-brand' : 'text-slate-400 border-transparent'}`}>
            <span className="text-xl" aria-hidden>{t.icon}</span>{t.label}
            {t.id === 'carrito' && total > 0 && (
              <span className="absolute top-1 right-[22%] bg-brand text-white rounded-full text-[10px] min-w-[18px] h-[18px] flex items-center justify-center">{total}</span>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}
