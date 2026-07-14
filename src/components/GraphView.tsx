import { ARISTAS, NODOS } from '../data/ley'
import type { NodoLey } from '../data/ley'

const NODO_W = 216
const NODO_H = 88
const VIEW_W = 1440
const VIEW_H = 1210

interface Punto {
  x: number
  y: number
}

/** Punto de salida sobre el borde del rectángulo del nodo, mirando hacia `hacia` */
function ancla(desde: Punto, hacia: Punto): Punto {
  const dx = hacia.x - desde.x
  const dy = hacia.y - desde.y
  const hw = NODO_W / 2 + 8
  const hh = NODO_H / 2 + 8
  const sx = dx === 0 ? Infinity : hw / Math.abs(dx)
  const sy = dy === 0 ? Infinity : hh / Math.abs(dy)
  const s = Math.min(sx, sy)
  return { x: desde.x + dx * s, y: desde.y + dy * s }
}

interface Banda {
  etiqueta: string
  y: number
  alto: number
}

const BANDAS: Banda[] = [
  { etiqueta: 'Nivel nacional', y: 193, alto: 259 },
  { etiqueta: 'Nivel territorial · el SLEP', y: 520, alto: 415 },
  { etiqueta: 'La escuela y su comunidad', y: 942, alto: 242 },
]

interface Props {
  seleccionado: string | null
  onSeleccionar: (id: string) => void
}

export default function GraphView({ seleccionado, onSeleccionar }: Props) {
  const porId = new Map(NODOS.map((n) => [n.id, n]))
  const vecinos = new Set<string>()
  if (seleccionado) {
    vecinos.add(seleccionado)
    for (const a of ARISTAS) {
      if (a.de === seleccionado) vecinos.add(a.a)
      if (a.a === seleccionado) vecinos.add(a.de)
    }
  }

  return (
    <svg
      className="mapa-svg"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="group"
      aria-label="Mapa de conceptos de la Ley 21.040"
    >
      <defs>
        <marker id="flecha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--neutral-400)" />
        </marker>
        <marker id="flecha-activa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--royal-500)" />
        </marker>
      </defs>

      {/* Bandas de nivel */}
      {BANDAS.map((b) => (
        <g key={b.etiqueta}>
          <rect x={36} y={b.y} width={VIEW_W - 72} height={b.alto} rx={20} className="banda" />
          <text x={64} y={b.y + 34} className="banda-titulo">
            {b.etiqueta.toUpperCase()}
          </text>
        </g>
      ))}

      {/* Aristas */}
      {ARISTAS.map((a) => {
        const n1 = porId.get(a.de)!
        const n2 = porId.get(a.a)!
        const mid = { x: (n1.x + n2.x) / 2, y: (n1.y + n2.y) / 2 }
        let ctrl = mid
        if (a.curva) {
          const len = Math.hypot(n2.x - n1.x, n2.y - n1.y) || 1
          const nx = -(n2.y - n1.y) / len
          const ny = (n2.x - n1.x) / len
          ctrl = { x: mid.x + nx * a.curva, y: mid.y + ny * a.curva }
        }
        const p1 = ancla(n1, ctrl)
        const p2 = ancla(n2, ctrl)
        const t = a.posEtiqueta ?? 0.5
        const etiquetaPos = {
          x: (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * ctrl.x + t * t * p2.x,
          y: (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * ctrl.y + t * t * p2.y,
        }
        const activa = seleccionado !== null && (a.de === seleccionado || a.a === seleccionado)
        const tenue = seleccionado !== null && !activa
        const clase = `arista${activa ? ' arista--activa' : ''}${tenue ? ' arista--tenue' : ''}`
        return (
          <g key={`${a.de}-${a.a}`} className={clase}>
            <path
              d={`M ${p1.x} ${p1.y} Q ${ctrl.x} ${ctrl.y} ${p2.x} ${p2.y}`}
              fill="none"
              markerEnd={activa ? 'url(#flecha-activa)' : 'url(#flecha)'}
            />
            <text x={etiquetaPos.x} y={etiquetaPos.y - 8} className="arista-etiqueta">
              {a.etiqueta}
            </text>
          </g>
        )
      })}

      {/* Nodos */}
      {NODOS.map((n) => (
        <Nodo
          key={n.id}
          nodo={n}
          activo={seleccionado === n.id}
          tenue={seleccionado !== null && !vecinos.has(n.id)}
          onClick={() => onSeleccionar(n.id)}
        />
      ))}
    </svg>
  )
}

function Nodo({
  nodo,
  activo,
  tenue,
  onClick,
}: {
  nodo: NodoLey
  activo: boolean
  tenue: boolean
  onClick: () => void
}) {
  const clase = `nodo nodo--${nodo.categoria}${activo ? ' nodo--activo' : ''}${tenue ? ' nodo--tenue' : ''}`
  return (
    <foreignObject
      x={nodo.x - NODO_W / 2}
      y={nodo.y - NODO_H / 2}
      width={NODO_W}
      height={NODO_H}
      className="nodo-fo"
    >
      <div
        className={clase}
        role="button"
        tabIndex={0}
        aria-pressed={activo}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
      >
        <span className="nodo-icono material-icons-outlined" aria-hidden="true">
          {nodo.icono}
        </span>
        <span className="nodo-textos">
          <span className="nodo-titulo">{nodo.titulo}</span>
          {nodo.sigla && <span className="nodo-sigla">{nodo.sigla}</span>}
        </span>
      </div>
    </foreignObject>
  )
}
