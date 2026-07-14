import { CATEGORIAS, conexionesDe } from '../data/ley'
import type { NodoLey } from '../data/ley'

interface Props {
  nodo: NodoLey
  onCerrar: () => void
  onNavegar: (id: string) => void
}

export default function DetailPanel({ nodo, onCerrar, onNavegar }: Props) {
  const conexiones = conexionesDe(nodo.id)
  const categoria = CATEGORIAS[nodo.categoria]

  return (
    <aside className={`panel panel--${nodo.categoria}`} aria-label={`Detalle: ${nodo.titulo}`}>
      <div className="panel-cabecera">
        <div className="panel-cabecera-textos">
          <div className="eyebrow">{categoria.nombre}</div>
          <h3 className="panel-titulo">
            {nodo.titulo}
            {nodo.sigla && <span className="panel-sigla"> · {nodo.sigla}</span>}
          </h3>
          <span className="chip chip-neutral panel-articulos">
            <span className="material-icons-outlined icon-xs" aria-hidden="true">
              menu_book
            </span>
            {nodo.articulos}
          </span>
        </div>
        <button className="panel-cerrar" onClick={onCerrar} aria-label="Cerrar panel">
          <span className="material-icons-outlined" aria-hidden="true">
            close
          </span>
        </button>
      </div>

      <div className="panel-cuerpo">
        <p className="panel-resumen">{nodo.resumen}</p>

        {nodo.descripcion.map((p, i) => (
          <p key={i} className="panel-parrafo">
            {p}
          </p>
        ))}

        <h4 className="panel-subtitulo">Puntos clave</h4>
        <ul className="panel-claves">
          {nodo.claves.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>

        {conexiones.length > 0 && (
          <>
            <h4 className="panel-subtitulo">Se conecta con</h4>
            <div className="panel-conexiones">
              {conexiones.map((c) => (
                <button
                  key={c.nodo.id}
                  className="panel-conexion"
                  onClick={() => onNavegar(c.nodo.id)}
                >
                  <span className="material-icons-outlined icon-sm" aria-hidden="true">
                    {c.nodo.icono}
                  </span>
                  <span className="panel-conexion-textos">
                    <span className="panel-conexion-nombre">{c.nodo.titulo}</span>
                    <span className="panel-conexion-relacion">
                      {c.saliente ? `${nodo.titulo} → ${c.etiqueta}` : `← ${c.etiqueta}`}
                    </span>
                  </span>
                  <span className="material-icons-outlined icon-xs panel-conexion-flecha" aria-hidden="true">
                    arrow_forward
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
