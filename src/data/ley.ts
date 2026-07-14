/**
 * Contenido de la presentación interactiva de la Ley 21.040
 * (Crea el Sistema de Educación Pública, D.O. 24-nov-2017,
 * última modificación Ley 21.819, mayo 2026).
 * Fuente: texto refundido de LeyChile / BCN.
 */

export type Categoria =
  | 'origen'
  | 'nacional'
  | 'territorial'
  | 'instrumento'
  | 'escuela'

export interface NodoLey {
  id: string
  titulo: string
  sigla?: string
  categoria: Categoria
  icono: string
  articulos: string
  resumen: string
  descripcion: string[]
  claves: string[]
  x: number
  y: number
}

export interface Arista {
  de: string
  a: string
  etiqueta: string
  /** curvatura perpendicular en px del punto de control (+ derecha / − izquierda respecto a la dirección) */
  curva?: number
  /** posición de la etiqueta a lo largo de la curva (0 a 1, por defecto 0.5) */
  posEtiqueta?: number
}

export const CATEGORIAS: Record<Categoria, { nombre: string; color: string }> = {
  origen: { nombre: 'La ley', color: 'var(--coral-500)' },
  nacional: { nombre: 'Nivel nacional', color: 'var(--navy-500)' },
  territorial: { nombre: 'Nivel territorial', color: 'var(--royal-500)' },
  instrumento: { nombre: 'Instrumentos de gestión', color: 'var(--neutral-500)' },
  escuela: { nombre: 'La escuela y su comunidad', color: '#1F8A5B' },
}

export const NODOS: NodoLey[] = [
  {
    id: 'ley21040',
    titulo: 'Ley 21.040',
    sigla: 'Nueva Educación Pública',
    categoria: 'origen',
    icono: 'gavel',
    articulos: 'Publicada el 24-nov-2017',
    resumen:
      'La ley que crea el Sistema de Educación Pública: el traspaso de la educación escolar desde las municipalidades a un nuevo sistema estatal, descentralizado y especializado en lo educativo.',
    descripcion: [
      'La Ley 21.040 crea el Sistema de Educación Pública, establece las instituciones que lo componen y regula su funcionamiento (art. 1). Su propósito es que el Estado provea, a través de establecimientos de su propiedad y administración, una educación pública, gratuita y de calidad, laica y pluralista, que promueva la inclusión, la equidad y el respeto a la diversidad, en todo el territorio nacional (art. 3).',
      'La educación pública se orienta al pleno desarrollo de los estudiantes: una formación integral que abarca lo espiritual, social, ético, moral, afectivo, intelectual, artístico y físico, estimulando la creatividad, la capacidad crítica, la participación ciudadana y los valores democráticos (art. 2).',
      'Todo lo que verás en este mapa nace de esta ley y se conecta entre sí: una conducción nacional (DEP y ENEP), una gestión territorial (los SLEP con sus órganos de gobernanza) y, en el centro de todo, la escuela y su comunidad.',
    ],
    claves: [
      'Reemplaza la administración municipal de escuelas, liceos y jardines por Servicios Locales de Educación Pública (SLEP).',
      'Crea la Dirección de Educación Pública (DEP), dependiente del Mineduc.',
      'Encadena instrumentos de gestión: ENEP (nacional) → PEL (territorial, 6 años) → Plan Anual (operativo).',
      'Última modificación: Ley 21.819 (mayo de 2026), que perfeccionó la gobernanza del Sistema.',
    ],
    x: 720,
    y: 95,
  },
  {
    id: 'sistema',
    titulo: 'Sistema de Educación Pública',
    categoria: 'nacional',
    icono: 'hub',
    articulos: 'Arts. 1 al 5',
    resumen:
      'El conjunto de instituciones mediante las cuales el Estado provee educación pública: los establecimientos, los SLEP y el Ministerio de Educación a través de la DEP.',
    descripcion: [
      'Son integrantes del Sistema los establecimientos educacionales dependientes de los Servicios Locales, los propios Servicios Locales de Educación Pública y el Ministerio de Educación, a través de la Dirección de Educación Pública (art. 4).',
      'Los establecimientos son la unidad básica y fundamental del Sistema: cuentan con autonomía para definir y desarrollar sus proyectos educativos según la identidad de sus comunidades. Los SLEP proveen el servicio educativo y la DEP coordina y conduce estratégicamente el conjunto.',
      'El Sistema se rige por principios propios (art. 5) que ordenan la acción de todos sus integrantes, de lo nacional a lo local.',
    ],
    claves: [
      'Calidad integral y mejora continua de la calidad.',
      'Cobertura nacional y garantía de acceso al derecho a la educación.',
      'Desarrollo equitativo e igualdad de oportunidades.',
      'Colaboración y trabajo en red entre sus integrantes.',
      'Proyectos educativos inclusivos, laicos y de formación ciudadana.',
      'Pertinencia local, diversidad y participación de la comunidad.',
      'Integración con el entorno y valores republicanos.',
    ],
    x: 720,
    y: 245,
  },
  {
    id: 'mineduc',
    titulo: 'Ministerio de Educación',
    sigla: 'Mineduc',
    categoria: 'nacional',
    icono: 'account_balance',
    articulos: 'Arts. 4, 6 y 39',
    resumen:
      'El órgano rector del sistema educativo: establece la Estrategia Nacional por decreto supremo y suscribe los convenios de gestión con cada Director Ejecutivo.',
    descripcion: [
      'El Ministerio de Educación es el órgano rector del sistema educativo y promueve la articulación entre el Sistema de Educación Pública y el Sistema de Aseguramiento de la Calidad (art. 4).',
      'En este marco, establece la Estrategia Nacional de Educación Pública mediante decreto supremo, a propuesta de la DEP, oyendo a las Comisiones de Educación del Congreso y previa aprobación del Consejo Nacional de Educación (art. 6).',
      'A través del Ministro de Educación, suscribe el convenio de gestión educacional con cada Director Ejecutivo de SLEP (art. 39) y dicta los reglamentos que desarrollan la ley.',
    ],
    claves: [
      'Conduce el Sistema a través de la Dirección de Educación Pública.',
      'Establece la ENEP por decreto supremo (8 años).',
      'Sanciona los convenios de gestión propuestos por la DEP.',
    ],
    x: 330,
    y: 330,
  },
  {
    id: 'dep',
    titulo: 'Dirección de Educación Pública',
    sigla: 'DEP',
    categoria: 'nacional',
    icono: 'explore',
    articulos: 'Arts. 59 al 63',
    resumen:
      'El servicio público que conduce estratégicamente y coordina el Sistema, velando por que los SLEP provean educación de calidad en todo el país.',
    descripcion: [
      'La DEP es un servicio público centralizado, dependiente del Ministerio de Educación (art. 59). Le corresponde la conducción estratégica y la coordinación del Sistema, velando por que los Servicios Locales provean una educación de calidad en todo el territorio nacional (art. 60).',
      'Es la bisagra entre el nivel nacional y el territorial: elabora la Estrategia Nacional de Educación Pública y vigila su cumplimiento, evalúa el desempeño de los SLEP a través de los convenios de gestión de sus Directores Ejecutivos y les presta apoyo técnico y administrativo.',
    ],
    claves: [
      'Propone la ENEP y vela por su cumplimiento (art. 61 a).',
      'Elabora, sigue y evalúa los convenios de gestión educacional (art. 61 b).',
      'Asigna recursos a los SLEP según la Ley de Presupuestos (art. 61 e).',
      'Presta asistencia técnica pedagógica, administrativa y financiera.',
      'Coordina a los SLEP promoviendo su trabajo colaborativo y en red.',
    ],
    x: 720,
    y: 400,
  },
  {
    id: 'enep',
    titulo: 'Estrategia Nacional de Educación Pública',
    sigla: 'ENEP',
    categoria: 'instrumento',
    icono: 'flag',
    articulos: 'Art. 6',
    resumen:
      'La brújula del Sistema: orientaciones y lineamientos de ocho años para mejorar la calidad de la educación pública en todo el país.',
    descripcion: [
      'La ENEP contiene orientaciones y lineamientos dirigidos a mejorar la calidad de la educación pública provista por los establecimientos del Sistema. Se establece por decreto supremo y dura ocho años, con evaluación a la mitad del período (art. 6).',
      'Considera objetivos, metas y acciones en áreas como cobertura, inclusión, revinculación y seguimiento de estudiantes, convivencia educativa y bienestar socioemocional, apoyos para el aprendizaje, implementación curricular, desarrollo profesional docente y colaboración entre niveles.',
      'Todos los integrantes del Sistema deben orientar sus acciones a su cumplimiento: por eso la ENEP orienta los Planes Estratégicos Locales de cada SLEP y, a través de ellos, los planes anuales.',
    ],
    claves: [
      'Duración: 8 años, con evaluación a mitad de período.',
      'La DEP evalúa su avance cada año e informa al Congreso cada dos años.',
      'Su elaboración incluye participación de las comunidades educativas.',
      'Aprobada por el Consejo Nacional de Educación antes del decreto.',
    ],
    x: 1110,
    y: 330,
  },
  {
    id: 'slep',
    titulo: 'Servicios Locales de Educación Pública',
    sigla: 'SLEP',
    categoria: 'territorial',
    icono: 'domain',
    articulos: 'Arts. 16 al 19',
    resumen:
      'Los nuevos sostenedores públicos: órganos descentralizados y especializados que proveen el servicio educativo en un territorio determinado, cubriendo entre todos las 346 comunas del país.',
    descripcion: [
      'Los SLEP son órganos públicos funcional y territorialmente descentralizados, con personalidad jurídica y patrimonio propios, que se relacionan con el Presidente de la República a través del Ministerio de Educación y con éste a través de la DEP (art. 16). La ley los distribuye por regiones para cubrir, en conjunto, la totalidad de las comunas de Chile.',
      'Su objeto es proveer, a través de los establecimientos de su dependencia, el servicio educacional en los niveles y modalidades que corresponda, velando por la calidad, la mejora continua y la equidad, y entregando apoyo técnico-pedagógico y de gestión a sus establecimientos, con respeto a su autonomía (art. 17).',
      'Cada SLEP administra los recursos humanos, financieros y materiales del servicio, desarrolla la oferta pública del territorio, vela por la continuidad de las trayectorias educativas desde la educación inicial hasta la media, y se vincula con la educación superior regional (art. 18).',
    ],
    claves: [
      'Sostenedor público especializado: reemplaza a municipalidades y corporaciones.',
      'Descentralizado, con personalidad jurídica y patrimonio propios.',
      'Provee apoyo técnico-pedagógico y de gestión a sus establecimientos.',
      'Puede crear oficinas locales en territorios extensos o dispersos (art. 16 bis).',
      'Su gobernanza combina dirección profesional (Director Ejecutivo) y participación (Comité Directivo y Consejo Local).',
    ],
    x: 720,
    y: 570,
  },
  {
    id: 'comite',
    titulo: 'Comité Directivo Local',
    categoria: 'territorial',
    icono: 'groups',
    articulos: 'Arts. 29 al 38',
    resumen:
      'El órgano de gobernanza estratégica del SLEP: vincula al servicio con las comunas y la región, propone la terna presidencial para Director Ejecutivo y ante él se rinde cuenta.',
    descripcion: [
      'En cada SLEP existe un Comité Directivo Local que vela por el adecuado desarrollo estratégico del servicio y contribuye a su vinculación con las instituciones de gobierno de las comunas y la región. Ante este Comité, el Director Ejecutivo rinde cuenta a la comunidad local (art. 29).',
      'Lo integran uno o dos representantes designados por los alcaldes del territorio, dos representantes de los centros de padres y apoderados, y dos representantes del gobierno regional designados por el Gobernador con aprobación del Consejo Regional (art. 31). Sus miembros duran seis años, renovándose por mitades cada tres, y sus sesiones son públicas.',
    ],
    claves: [
      'Propone al Presidente de la República la terna o cuaterna para nombrar al Director Ejecutivo (art. 30 d).',
      'Propone prioridades para el convenio de gestión educacional (art. 30 c).',
      'Hace recomendaciones al PEL y al Plan Anual (art. 30 f y h).',
      'Puede solicitar la remoción del Director Ejecutivo con 2/3 de sus miembros (art. 30 e).',
      'Puede requerir fiscalización de la Superintendencia de Educación (art. 30 i).',
    ],
    x: 330,
    y: 616,
  },
  {
    id: 'consejo',
    titulo: 'Consejo Local de Educación Pública',
    categoria: 'territorial',
    icono: 'forum',
    articulos: 'Arts. 49 al 58',
    resumen:
      'La voz de las comunidades educativas dentro del SLEP: estudiantes, apoderados, docentes, asistentes y directivos representan sus intereses ante el Director Ejecutivo.',
    descripcion: [
      'En cada SLEP existe un Consejo Local de Educación Pública que colabora con el Director Ejecutivo representando ante él los intereses de las comunidades educativas, para que el servicio considere adecuadamente sus necesidades y particularidades (art. 49).',
      'Lo integran representantes electos de los centros de estudiantes (2), centros de padres y apoderados (2), profesionales de la educación (2), asistentes de la educación (2) y equipos directivos o técnico-pedagógicos (2), más representantes de las universidades regionales, de los CFT e IP, de la educación parvularia y de las escuelas rurales cuando corresponde (art. 50). Duran tres años y participan ad honorem.',
    ],
    claves: [
      'Representa los intereses de la comunidad educativa ante el SLEP (art. 52 a).',
      'Comunica al Director Ejecutivo y al Comité Directivo cualquier asunto que afecte la calidad del servicio (art. 52 b).',
      'Opina sobre el PEL y hace recomendaciones al Plan Anual.',
      'Asesora en comunidades de aprendizaje, convivencia, formación ciudadana e inclusión (art. 52 d).',
      'Su presidente es recibido por el Comité Directivo al menos dos veces al año.',
    ],
    x: 1110,
    y: 616,
  },
  {
    id: 'director',
    titulo: 'Director/a Ejecutivo/a',
    categoria: 'territorial',
    icono: 'badge',
    articulos: 'Arts. 21 al 24',
    resumen:
      'El jefe superior del SLEP: un directivo profesional seleccionado por Alta Dirección Pública, nombrado por el Presidente a partir de la terna del Comité Directivo Local.',
    descripcion: [
      'La dirección y administración de cada Servicio Local está a cargo de un Director Ejecutivo, seleccionado mediante el Sistema de Alta Dirección Pública: el Consejo de ADP elabora una nómina, el Comité Directivo Local entrevista a los candidatos y remite una terna o cuaterna al Presidente de la República, quien nombra (art. 21).',
      'Dura seis años en el cargo, renovable por una sola vez, con dedicación exclusiva. Es el punto de encuentro entre la conducción nacional (firma el convenio de gestión con el Ministro) y la gestión territorial (elabora el PEL y el Plan Anual con participación de las comunidades).',
    ],
    claves: [
      'Dirige, organiza y administra el SLEP velando por la mejora continua (art. 22 a).',
      'Elabora e implementa el PEL y el Plan Anual con participación de las comunidades (art. 22 b).',
      'Suscribe el convenio de gestión educacional con el Ministro de Educación (art. 39).',
      'Celebra convenios de desempeño con los directores de establecimientos (art. 22 c).',
      'Rinde cuenta pública cada abril, en audiencia pública (art. 22 h).',
    ],
    x: 720,
    y: 725,
  },
  {
    id: 'convenio',
    titulo: 'Convenio de Gestión Educacional',
    categoria: 'instrumento',
    icono: 'handshake',
    articulos: 'Arts. 39 al 43',
    resumen:
      'El contrato de desempeño del Director Ejecutivo: firmado con el Ministro de Educación, fija por seis años los objetivos, indicadores y resultados esperados de su gestión.',
    descripcion: [
      'Dentro de los tres meses siguientes a su nombramiento, el Director Ejecutivo suscribe con el Ministro de Educación un convenio de gestión educacional, cuyo principal objetivo es evaluar su desempeño como jefe superior del SLEP (art. 39).',
      'El convenio dura seis años y fija los objetivos del cargo, los indicadores de procesos, los resultados educativos esperados, los medios de verificación y los supuestos de cumplimiento. Sus objetivos consideran las políticas nacionales, las especificidades del territorio y los informes del Sistema de Aseguramiento de la Calidad.',
      'La propuesta la elabora la DEP —considerando las prioridades que propone el Comité Directivo Local— y su seguimiento y evaluación también corresponden a la DEP, con criterios objetivos y públicos (arts. 40 y 41).',
    ],
    claves: [
      'Se firma dentro de 3 meses desde el nombramiento; dura 6 años.',
      'Sus objetivos deben ser concordantes con la ENEP y el territorio.',
      'La DEP lo propone, le hace seguimiento y lo evalúa.',
      'Es público: debe publicarse en el sitio del SLEP (art. 43).',
    ],
    x: 330,
    y: 740,
  },
  {
    id: 'pel',
    titulo: 'Plan Estratégico Local',
    sigla: 'PEL',
    categoria: 'instrumento',
    icono: 'timeline',
    articulos: 'Art. 45',
    resumen:
      'La hoja de ruta de seis años de cada SLEP: diagnóstico del territorio, objetivos y prioridades de mediano plazo, y las estrategias para lograrlos.',
    descripcion: [
      'Cada Servicio Local debe contar con un Plan Estratégico Local de Educación Pública, cuyo objeto es el desarrollo de la educación pública y la mejora permanente de su calidad en el territorio. Lo elabora el Director Ejecutivo y dura seis años (art. 45).',
      'Contiene al menos: un diagnóstico de la prestación del servicio en el territorio, los objetivos y prioridades de mediano plazo —concordantes con el convenio de gestión y con la ENEP— y las estrategias y acciones para cumplirlos.',
      'Para elaborarlo se consideran la ENEP, la Estrategia Regional de Desarrollo, los proyectos educativos institucionales y los planes de mejoramiento de los establecimientos, y los informes de la Agencia de Calidad. El Director Ejecutivo abre un proceso de consultas al Consejo Local, al Comité Directivo y a los directores de establecimientos.',
    ],
    claves: [
      'Duración: 6 años; se presenta 6 meses antes de que venza el anterior.',
      'Baja la ENEP al territorio: sus objetivos deben ser concordantes con ella.',
      'Se construye con consulta al Consejo Local, Comité Directivo y directores.',
      'Se publica en el sitio del SLEP y se registra en la DEP.',
    ],
    x: 1110,
    y: 740,
  },
  {
    id: 'pal',
    titulo: 'Plan Anual',
    categoria: 'instrumento',
    icono: 'event_note',
    articulos: 'Art. 46',
    resumen:
      'El instrumento operativo del SLEP: cada año concreta el PEL en dotaciones, apoyos técnico-pedagógicos y acciones, con recomendaciones del Comité Directivo y el Consejo Local.',
    descripcion: [
      'A más tardar el 15 de octubre de cada año, el Director Ejecutivo presenta al Comité Directivo Local y al Consejo Local un plan anual para el año siguiente (art. 46).',
      'El plan contiene los resultados del convenio de gestión y la evaluación del PEL, la dotación de docentes y asistentes requerida por cada establecimiento —fundada en razones técnico-pedagógicas—, las acciones de apoyo técnico-pedagógico para cada establecimiento y las acciones de vinculación institucional regional y comunal.',
      'El Comité Directivo y el Consejo Local tienen quince días hábiles para hacer recomendaciones, que el Director Ejecutivo integra o rechaza fundadamente; luego la DEP puede recomendar también. El plan se sanciona a más tardar el 15 de diciembre, ajustado a la Ley de Presupuestos.',
    ],
    claves: [
      'Presentación: 15 de octubre · sanción: 15 de diciembre de cada año.',
      'Define la dotación docente y de asistentes de cada establecimiento.',
      'Recibe recomendaciones del Comité Directivo, el Consejo Local y la DEP.',
      'Su ejecución se informa en la cuenta pública anual del Director Ejecutivo.',
    ],
    x: 1110,
    y: 885,
  },
  {
    id: 'establecimientos',
    titulo: 'Establecimientos educacionales',
    categoria: 'escuela',
    icono: 'school',
    articulos: 'Arts. 4, 7 y 9 al 15',
    resumen:
      'Jardines, escuelas y liceos: la unidad básica y fundamental del Sistema, con autonomía para definir sus proyectos educativos y organizados en la red de cada SLEP.',
    descripcion: [
      'Los establecimientos educacionales son la unidad básica y fundamental del Sistema de Educación Pública: toda la acción de sus integrantes se orienta en función de ellos (art. 7). Forman parte de la red de cada Servicio Local y cuentan con autonomía para definir y desarrollar sus proyectos educativos institucionales (PEI).',
      'Su director lidera el PEI y los procesos de mejora, ejerce el liderazgo técnico-pedagógico y propone al Director Ejecutivo el PEI y el plan de mejoramiento educativo (PME), atendiendo a las orientaciones del PEL (arts. 9 y 10).',
      'Los SLEP fomentan el trabajo en red de sus establecimientos —desarrollo profesional, intercambio de buenas prácticas, redes de aprendizaje— y cada comunidad realiza una jornada anual de evaluación de su PME (arts. 8 y 14).',
    ],
    claves: [
      'Unidad básica y fundamental del Sistema (arts. 4 y 7).',
      'Autonomía para su proyecto educativo institucional (PEI).',
      'El PME de cada establecimiento conversa con el PEL del SLEP.',
      'Trabajo colaborativo y en red dentro del territorio.',
    ],
    x: 720,
    y: 990,
  },
  {
    id: 'comunidad',
    titulo: 'Comunidad educativa',
    categoria: 'escuela',
    icono: 'diversity_3',
    articulos: 'Art. 8',
    resumen:
      'Estudiantes, familias, docentes, asistentes y equipos directivos: las personas para quienes existe todo el Sistema, con participación garantizada en cada nivel.',
    descripcion: [
      'Cada establecimiento está conformado por su comunidad educativa: estudiantes, padres y apoderados, profesionales de la educación, asistentes de la educación y equipos docentes directivos (art. 8). El órgano que la reúne es el consejo escolar.',
      'La ley promueve la organización de la comunidad: centros de alumnos y centros de padres con funcionamiento independiente, y consejos de profesores como organismos técnicos donde se expresa la opinión profesional de los docentes.',
      'La participación no termina en la escuela: las comunidades educativas eligen representantes al Consejo Local del SLEP y participan en la elaboración de la ENEP, del PEL y del Plan Anual. Así se cierra el círculo: el Sistema completo existe para ellas.',
    ],
    claves: [
      'Consejo escolar: el órgano que reúne a toda la comunidad.',
      'Centros de alumnos y de padres con constitución e independencia promovidas.',
      'Eligen representantes al Consejo Local del SLEP.',
      'Participan en la evaluación anual del PME y del reglamento interno.',
    ],
    x: 720,
    y: 1130,
  },
]

export const ARISTAS: Arista[] = [
  { de: 'ley21040', a: 'sistema', etiqueta: 'crea' },
  { de: 'sistema', a: 'mineduc', etiqueta: 'órgano rector' },
  { de: 'mineduc', a: 'dep', etiqueta: 'conduce a través de' },
  { de: 'dep', a: 'enep', etiqueta: 'elabora y propone' },
  { de: 'dep', a: 'slep', etiqueta: 'coordina, apoya y evalúa' },
  { de: 'comite', a: 'slep', etiqueta: 'gobernanza estratégica' },
  { de: 'consejo', a: 'slep', etiqueta: 'voz de las comunidades' },
  { de: 'slep', a: 'director', etiqueta: 'dirigido por' },
  { de: 'comite', a: 'director', etiqueta: 'propone la terna', curva: -60 },
  { de: 'director', a: 'convenio', etiqueta: 'suscribe con el Mineduc' },
  { de: 'director', a: 'pel', etiqueta: 'elabora cada 6 años' },
  { de: 'enep', a: 'pel', etiqueta: 'orienta', curva: -260 },
  { de: 'pel', a: 'pal', etiqueta: 'se concreta en' },
  { de: 'slep', a: 'establecimientos', etiqueta: 'provee educación a través de', curva: -300, posEtiqueta: 0.7 },
  { de: 'pal', a: 'establecimientos', etiqueta: 'define dotación y apoyos' },
  { de: 'establecimientos', a: 'comunidad', etiqueta: 'conformados por' },
]

/** Orden del recorrido guiado: de lo general a lo particular */
export const RECORRIDO: string[] = [
  'ley21040',
  'sistema',
  'mineduc',
  'dep',
  'enep',
  'slep',
  'comite',
  'consejo',
  'director',
  'convenio',
  'pel',
  'pal',
  'establecimientos',
  'comunidad',
]

export interface Conexion {
  nodo: NodoLey
  etiqueta: string
  saliente: boolean
}

export function conexionesDe(id: string): Conexion[] {
  const porId = new Map(NODOS.map((n) => [n.id, n]))
  const res: Conexion[] = []
  for (const a of ARISTAS) {
    if (a.de === id) res.push({ nodo: porId.get(a.a)!, etiqueta: a.etiqueta, saliente: true })
    else if (a.a === id) res.push({ nodo: porId.get(a.de)!, etiqueta: a.etiqueta, saliente: false })
  }
  return res
}
