import { useCallback, useEffect, useState } from 'react'
import logo from '@slep-colchagua/design-system/assets/logo-slep-colchagua.webp'
import GraphView from './components/GraphView'
import DetailPanel from './components/DetailPanel'
import TourBar from './components/TourBar'
import { CATEGORIAS, NODOS, RECORRIDO } from './data/ley'
import './App.css'

function nodoInicial(): string | null {
  const id = new URLSearchParams(window.location.search).get('nodo')
  return id && NODOS.some((n) => n.id === id) ? id : null
}

export default function App() {
  const [seleccionado, setSeleccionado] = useState<string | null>(nodoInicial)
  const [paso, setPaso] = useState<number | null>(null)

  const nodoActivo = NODOS.find((n) => n.id === seleccionado) ?? null

  const irAlMapa = () => {
    document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const iniciarRecorrido = () => {
    setPaso(0)
    setSeleccionado(RECORRIDO[0])
    irAlMapa()
  }

  const salirRecorrido = useCallback(() => {
    setPaso(null)
    setSeleccionado(null)
  }, [])

  const moverPaso = useCallback((delta: number) => {
    setPaso((actual) => {
      if (actual === null) return actual
      const siguiente = Math.min(Math.max(actual + delta, 0), RECORRIDO.length - 1)
      setSeleccionado(RECORRIDO[siguiente])
      return siguiente
    })
  }, [])

  const seleccionarNodo = (id: string) => {
    setSeleccionado(id)
    // Si hay recorrido activo, sincroniza el paso con el nodo elegido
    const idx = RECORRIDO.indexOf(id)
    setPaso((actual) => (actual === null ? null : idx))
  }

  useEffect(() => {
    const onTecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (paso !== null) salirRecorrido()
        else setSeleccionado(null)
      }
      if (paso !== null && e.key === 'ArrowRight') moverPaso(1)
      if (paso !== null && e.key === 'ArrowLeft') moverPaso(-1)
    }
    window.addEventListener('keydown', onTecla)
    return () => window.removeEventListener('keydown', onTecla)
  }, [paso, moverPaso, salirRecorrido])

  return (
    <div className={`app${paso !== null ? ' app--tour' : ''}`}>
      <a className="skip-link" href="#mapa">
        Saltar al contenido
      </a>

      {/* Masthead institucional */}
      <header>
        <div className="utility">
          <div>Gobierno de Chile · Ministerio de Educación</div>
          <ul>
            <li>Ley 21.040 · D.O. 24-nov-2017</li>
          </ul>
        </div>
        <div className="brand-bar">
          <div className="brand-bar-inner">
            <div className="badge">
              <img src={logo} alt="SLEP Colchagua" />
            </div>
            <div className="wm">
              <div className="ovr">Sistema de Educación Pública</div>
              <div className="nm">Ley 21.040 en un mapa</div>
            </div>
            <div className="ministerial">
              <div className="ovr light">Guía interactiva</div>
              <div className="ovr-strong">Nueva Educación Pública</div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero de presentación */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="eyebrow on-dark">Ley 21.040 · Nueva Educación Pública</div>
            <h1>Un sistema donde todo se conecta</h1>
            <p>
              La Ley 21.040 creó el Sistema de Educación Pública: una arquitectura que va de lo
              nacional a la sala de clases. Recorre el mapa nodo por nodo y descubre qué es un
              SLEP, la ENEP, el PEL, el Plan Anual, el Consejo Local o el Comité Directivo — y
              cómo cada pieza le da sentido a las demás.
            </p>
            <div className="ctas">
              <button className="btn primary-on-dark" onClick={iniciarRecorrido}>
                Iniciar recorrido guiado
                <span className="material-icons-outlined icon-xs" aria-hidden="true">
                  arrow_forward
                </span>
              </button>
              <button className="btn outline-on-dark" onClick={irAlMapa}>
                Explorar el mapa libremente
              </button>
            </div>
          </div>
          <div className="hero-right">
            <div className="stat-grid">
              <div className="stat">
                <div className="stat-n">70</div>
                <div className="stat-l">SLEP que cubren todas las comunas del país</div>
              </div>
              <div className="stat">
                <div className="stat-n">8</div>
                <div className="stat-l">Años de vigencia de la Estrategia Nacional (ENEP)</div>
              </div>
              <div className="stat">
                <div className="stat-n">6</div>
                <div className="stat-l">Años del Plan Estratégico Local y del convenio de gestión</div>
              </div>
              <div className="stat">
                <div className="stat-n">14</div>
                <div className="stat-l">Conceptos clave conectados en este mapa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa interactivo */}
      <main id="mapa" className="mapa-seccion">
        <div className="mapa-cabecera">
          <div>
            <div className="eyebrow">De lo general a lo particular</div>
            <h2>El mapa de la ley</h2>
            <p className="mapa-sub">
              Haz clic en cualquier nodo para conocerlo en detalle. Al seleccionar uno, se
              iluminan sus conexiones: nada en este sistema existe de forma aislada.
            </p>
          </div>
          <div className="leyenda">
            {Object.entries(CATEGORIAS).map(([id, c]) => (
              <span key={id} className="leyenda-item">
                <span className="leyenda-punto" style={{ background: c.color }} />
                {c.nombre}
              </span>
            ))}
          </div>
        </div>

        <div className={`mapa-lienzo${nodoActivo ? ' mapa-lienzo--con-panel' : ''}`}>
          <GraphView seleccionado={seleccionado} onSeleccionar={seleccionarNodo} />
        </div>
      </main>

      {nodoActivo && (
        <DetailPanel
          nodo={nodoActivo}
          onCerrar={() => {
            setSeleccionado(null)
            setPaso(null)
          }}
          onNavegar={seleccionarNodo}
        />
      )}

      {paso !== null && (
        <TourBar
          paso={paso}
          onAnterior={() => moverPaso(-1)}
          onSiguiente={() => moverPaso(1)}
          onSalir={salirRecorrido}
        />
      )}

      <footer className="pie">
        <div>
          Elaborado a partir del texto refundido de la <strong>Ley 21.040</strong> (Biblioteca del
          Congreso Nacional · leychile.cl), última modificación Ley 21.819 (2026).
        </div>
        <div>Sistema de diseño SLEP Colchagua</div>
      </footer>
    </div>
  )
}
