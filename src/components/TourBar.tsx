import { NODOS, RECORRIDO } from '../data/ley'

interface Props {
  paso: number
  onAnterior: () => void
  onSiguiente: () => void
  onSalir: () => void
}

export default function TourBar({ paso, onAnterior, onSiguiente, onSalir }: Props) {
  const total = RECORRIDO.length
  const nodo = NODOS.find((n) => n.id === RECORRIDO[paso])!
  const esUltimo = paso === total - 1

  return (
    <div className="tour" role="toolbar" aria-label="Recorrido guiado">
      <div className="tour-progreso" aria-hidden="true">
        <div className="tour-progreso-relleno" style={{ width: `${((paso + 1) / total) * 100}%` }} />
      </div>
      <div className="tour-inner">
        <div className="tour-info">
          <span className="tour-paso">
            Paso {paso + 1} de {total}
          </span>
          <span className="tour-titulo">
            <span className="material-icons-outlined icon-xs" aria-hidden="true">
              {nodo.icono}
            </span>
            {nodo.titulo}
          </span>
        </div>
        <div className="tour-acciones">
          <button className="btn outline-on-dark" onClick={onAnterior} disabled={paso === 0}>
            <span className="material-icons-outlined icon-xs" aria-hidden="true">
              arrow_back
            </span>
            Anterior
          </button>
          <button className="btn primary-on-dark" onClick={esUltimo ? onSalir : onSiguiente}>
            {esUltimo ? 'Finalizar recorrido' : 'Siguiente'}
            {!esUltimo && (
              <span className="material-icons-outlined icon-xs" aria-hidden="true">
                arrow_forward
              </span>
            )}
          </button>
          <button className="tour-salir" onClick={onSalir} aria-label="Salir del recorrido">
            <span className="material-icons-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
