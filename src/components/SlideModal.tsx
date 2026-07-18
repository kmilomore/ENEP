import { useEffect, useRef, useState } from 'react'
import logo from '@slep-colchagua/design-system/assets/logo-slep-colchagua.webp'
import { CATEGORIAS, RECORRIDO, conexionesDe } from '../data/ley'
import type { NodoLey } from '../data/ley'

interface Props {
  nodo: NodoLey
  onCerrar: () => void
  onNavegar: (id: string) => void
}

function Cabecera({ nodo, claro }: { nodo: NodoLey; claro?: boolean }) {
  const categoria = CATEGORIAS[nodo.categoria]
  return (
    <>
      <span className={`modal-eyebrow${claro ? ' modal-eyebrow--claro' : ''}`}>
        <span className="material-icons-outlined icon-xs" aria-hidden="true">
          {nodo.icono}
        </span>
        {categoria.nombre}
      </span>
      <h1 className={`modal-titulo${claro ? ' modal-titulo--claro' : ''}`}>
        {nodo.titulo}
        {nodo.sigla && <span className="modal-sigla"> · {nodo.sigla}</span>}
      </h1>
      <span className={`chip chip-neutral modal-articulos${claro ? ' modal-articulos--claro' : ''}`}>
        <span className="material-icons-outlined icon-xs" aria-hidden="true">
          menu_book
        </span>
        {nodo.articulos}
      </span>
    </>
  )
}

function Detalle({
  nodo,
  conexiones,
  abierto,
  onToggle,
  onNavegar,
  claro,
}: {
  nodo: NodoLey
  conexiones: ReturnType<typeof conexionesDe>
  abierto: boolean
  onToggle: () => void
  onNavegar: (id: string) => void
  claro?: boolean
}) {
  return (
    <>
      <button
        className={`modal-detalle-toggle${claro ? ' modal-detalle-toggle--claro' : ''}`}
        onClick={onToggle}
        aria-expanded={abierto}
      >
        <span className="material-icons-outlined icon-xs" aria-hidden="true">
          {abierto ? 'expand_less' : 'expand_more'}
        </span>
        {abierto ? 'Ocultar texto legal y conexiones' : 'Ver texto legal y conexiones'}
      </button>

      {abierto && (
        <div className="modal-detalle">
          {nodo.descripcion.map((p, i) => (
            <p key={i} className="modal-parrafo">
              {p}
            </p>
          ))}

          {conexiones.length > 0 && (
            <>
              <h4 className="modal-subtitulo">Se conecta con</h4>
              <div className="modal-conexiones">
                {conexiones.map((c) => (
                  <button
                    key={c.nodo.id}
                    className="modal-conexion"
                    onClick={() => onNavegar(c.nodo.id)}
                    title={c.saliente ? `${nodo.titulo} → ${c.etiqueta}` : `← ${c.etiqueta}`}
                  >
                    <span className="material-icons-outlined icon-xs" aria-hidden="true">
                      {c.nodo.icono}
                    </span>
                    {c.nodo.titulo}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default function SlideModal({ nodo, onCerrar, onNavegar }: Props) {
  const [detalleAbierto, setDetalleAbierto] = useState(false)
  const conexiones = conexionesDe(nodo.id)
  const categoria = CATEGORIAS[nodo.categoria]

  const paso = RECORRIDO.indexOf(nodo.id)
  const total = RECORRIDO.length
  const esPrimero = paso === 0
  const esUltimo = paso === total - 1

  // Compara con el paso previo para animar la diapositiva entrando desde el lado correcto
  const pasoAnteriorRef = useRef(paso)
  const direccion = paso < pasoAnteriorRef.current ? 'izq' : 'der'
  useEffect(() => {
    pasoAnteriorRef.current = paso
    setDetalleAbierto(false)
  }, [paso])

  const irAnterior = () => !esPrimero && onNavegar(RECORRIDO[paso - 1])
  const irSiguiente = () => (esUltimo ? onCerrar() : onNavegar(RECORRIDO[paso + 1]))

  const toggleDetalle = () => setDetalleAbierto((v) => !v)
  const esPortada = categoria.plantilla === 'portada'

  return (
    <div
      className={`modal modal--${nodo.categoria} modal--plantilla-${categoria.plantilla}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Diapositiva: ${nodo.titulo}`}
    >
      <div className="modal-progreso" aria-hidden="true">
        <div className="modal-progreso-relleno" style={{ width: `${((paso + 1) / total) * 100}%` }} />
      </div>

      <div className="modal-patron" aria-hidden="true" />
      <div className="modal-marca-agua" aria-hidden="true">
        {String(paso + 1).padStart(2, '0')}
      </div>

      <div className="modal-topbar">
        <div className={`modal-marca${esPortada ? ' modal-marca--claro' : ''}`}>
          <img src={logo} alt="" />
          <span className="modal-marca-texto">
            Ley 21.040
            <small>Nueva Educación Pública</small>
          </span>
        </div>
        <div className="modal-topbar-derecha">
          <span className={`modal-paso${esPortada ? ' modal-paso--claro' : ''}`}>{categoria.nombre}</span>
          <button
            className={`modal-cerrar${esPortada ? ' modal-cerrar--claro' : ''}`}
            onClick={onCerrar}
            aria-label="Salir de la presentación"
          >
            <span className="material-icons-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>
      </div>

      <div className="modal-escenario">
        <div key={nodo.id} className={`modal-slide modal-slide--${direccion}`}>
          {/* ---------- Portada: apertura de capítulo a página completa ---------- */}
          {categoria.plantilla === 'portada' && (
            <div className="tpl-portada">
              <Cabecera nodo={nodo} claro />
              <p className="tpl-portada-resumen">{nodo.resumen}</p>
              <ul className="tpl-portada-claves">
                {nodo.claves.map((c, i) => (
                  <li key={i} style={{ animationDelay: `${Math.min(i, 5) * 60}ms` }}>
                    {c}
                  </li>
                ))}
              </ul>
              <Detalle
                nodo={nodo}
                conexiones={conexiones}
                abierto={detalleAbierto}
                onToggle={toggleDetalle}
                onNavegar={onNavegar}
                claro
              />
            </div>
          )}

          {/* ---------- Panel: columna clara de puntos + columna oscura de cita ---------- */}
          {categoria.plantilla === 'panel' && (
            <div className="tpl-panel">
              <Cabecera nodo={nodo} />
              <div className="tpl-panel-grid">
                <ul className="tpl-panel-claves">
                  {nodo.claves.map((c, i) => (
                    <li key={i} style={{ animationDelay: `${Math.min(i, 5) * 60}ms` }}>
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="tpl-panel-oscuro">
                  <span className="tpl-panel-oscuro-label">En una frase</span>
                  <p className="tpl-panel-cita">{nodo.resumen}</p>
                </div>
              </div>
              <Detalle nodo={nodo} conexiones={conexiones} abierto={detalleAbierto} onToggle={toggleDetalle} onNavegar={onNavegar} />
            </div>
          )}

          {/* ---------- Pasos: instrumentos como secuencia numerada ---------- */}
          {categoria.plantilla === 'pasos' && (
            <div className="tpl-pasos">
              <Cabecera nodo={nodo} />
              <p className="tpl-pasos-resumen">{nodo.resumen}</p>
              <div className="tpl-pasos-lista">
                {nodo.claves.map((c, i) => (
                  <div key={i} className="tpl-paso" style={{ animationDelay: `${Math.min(i, 5) * 70}ms` }}>
                    <span className="tpl-paso-num">{i + 1}</span>
                    <p>{c}</p>
                  </div>
                ))}
              </div>
              <Detalle nodo={nodo} conexiones={conexiones} abierto={detalleAbierto} onToggle={toggleDetalle} onNavegar={onNavegar} />
            </div>
          )}

          {/* ---------- Tarjetas: competencias de gobernanza como grilla ---------- */}
          {categoria.plantilla === 'tarjetas' && (
            <div className="tpl-tarjetas">
              <Cabecera nodo={nodo} />
              <p className="tpl-tarjetas-resumen">{nodo.resumen}</p>
              <div className="tpl-tarjetas-grid">
                {nodo.claves.map((c, i) => (
                  <div key={i} className="tpl-tarjeta" style={{ animationDelay: `${Math.min(i, 5) * 60}ms` }}>
                    {c}
                  </div>
                ))}
              </div>
              <Detalle nodo={nodo} conexiones={conexiones} abierto={detalleAbierto} onToggle={toggleDetalle} onNavegar={onNavegar} />
            </div>
          )}

          {/* ---------- Cierre: banner cálido con cita y lista de logros ---------- */}
          {categoria.plantilla === 'cierre' && (
            <div className="tpl-cierre">
              <Cabecera nodo={nodo} />
              <div className="tpl-cierre-banner">{nodo.resumen}</div>
              <ul className="tpl-cierre-claves">
                {nodo.claves.map((c, i) => (
                  <li key={i} style={{ animationDelay: `${Math.min(i, 5) * 60}ms` }}>
                    {c}
                  </li>
                ))}
              </ul>
              <Detalle nodo={nodo} conexiones={conexiones} abierto={detalleAbierto} onToggle={toggleDetalle} onNavegar={onNavegar} />
            </div>
          )}
        </div>
      </div>

      <div className="modal-pie">
        <div className="modal-pie-accent">
          <span className="modal-pie-barra" />
          <span className="modal-pie-accent-texto">Recorrido guiado</span>
        </div>
        <div className="modal-status">
          <button onClick={irAnterior} disabled={esPrimero} aria-label="Diapositiva anterior">
            <span className="material-icons-outlined icon-xs" aria-hidden="true">
              chevron_left
            </span>
          </button>
          <span className="modal-status-conteo">
            <strong>{paso + 1}</strong> / {total}
          </span>
          <button onClick={irSiguiente} aria-label={esUltimo ? 'Finalizar' : 'Diapositiva siguiente'}>
            {esUltimo ? (
              <span className="material-icons-outlined icon-xs" aria-hidden="true">
                done
              </span>
            ) : (
              <span className="material-icons-outlined icon-xs" aria-hidden="true">
                chevron_right
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
