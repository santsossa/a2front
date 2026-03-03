import { useState, useEffect } from 'react'
import styles from './Plans.module.css'

/* ═══════════════════════════════════════════════
   Contenido de artículos — estructura de blog
   Tipos de sección: h | p | ul | insight | alert
═══════════════════════════════════════════════ */
const ARTICLES = [
  {
    id: 'soat',
    category: 'Seguro Obligatorio',
    title: '¿Qué cubre el SOAT y cuánto cuesta en Colombia?',
    author: 'Juan Pablo Mora',
    authorInitials: 'JP',
    date: '14 de enero de 2025',
    size: 'normal',
    bg: '#eeeef8',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="16" width="40" height="22" rx="4"/>
        <path d="M10 16l5-9h18l5 9"/>
        <circle cx="14" cy="38" r="4"/>
        <circle cx="34" cy="38" r="4"/>
        <path d="M18 38h12"/><path d="M10 24h4M28 24h10"/>
      </svg>
    ),
    modal: {
      title: '¿Qué cubre el SOAT y cuánto cuesta en Colombia?',
      readTime: '5 min lectura',
      intro: 'El SOAT es el seguro más básico que existe en Colombia y también el más mal entendido. Aquí te explicamos exactamente qué es, qué cubre y por qué tenerlo vigente puede salvarte de multas y de problemas serios.',
      sections: [
        { h: '¿Qué es el SOAT exactamente?' },
        { p: 'El Seguro Obligatorio de Accidentes de Tránsito (SOAT) es un seguro creado por ley colombiana que todo vehículo que circule por vías públicas debe tener vigente. A diferencia de otros seguros, el SOAT no protege el vehículo ni al conductor responsable: su único objetivo es garantizar atención médica inmediata a cualquier víctima de un accidente de tránsito, sin importar quién fue el culpable del siniestro.' },
        { h: 'Coberturas del SOAT en detalle' },
        { ul: [
          'Gastos médicos y quirúrgicos: hasta 800 SMLMV por persona (hospitalizaciones, cirugías, rehabilitación física).',
          'Incapacidad permanente: entre 60 y 180 SMLMV dependiendo del grado de discapacidad certificado.',
          'Muerte del asegurado: hasta 600 SMLMV pagados a los beneficiarios legales del fallecido.',
          'Gastos funerarios: hasta 150 SMLMV para cubrir servicios fúnebres inmediatos.',
          'Atención de urgencias: cualquier hospital o clínica pública o privada está obligada por ley a atender a la víctima presentando el SOAT.',
        ]},
        { insight: 'En 2025, el SOAT para motos oscila entre $130.000 y $230.000, y para automóviles entre $220.000 y $500.000 según tipo de vehículo, cilindraje y modelo. Comparar entre aseguradoras puede ahorrarte hasta un 30%.' },
        { h: 'Lo que el SOAT NO cubre (y mucha gente no sabe)' },
        { ul: [
          'Daños materiales al vehículo propio ni al de terceros involucrados en el accidente.',
          'Responsabilidad civil frente a terceros por daños a propiedad o pérdidas económicas.',
          'Conductores bajo efectos del alcohol o drogas: la aseguradora puede negar el pago.',
          'Actos terroristas, motines o conflictos armados.',
          'Daños ocurridos en propiedades privadas o fuera de la vía pública.',
        ]},
        { h: '¿Dónde comprar o renovar el SOAT?' },
        { p: 'Puedes adquirirlo directamente en aseguradoras autorizadas, puntos de venta físicos o plataformas digitales. Es obligatorio portarlo en el vehículo y presentarlo ante autoridades de tránsito. Con Asegura2 puedes comparar tarifas de todas las aseguradoras en segundos y activarlo sin salir de casa.' },
        { alert: 'Circular sin SOAT vigente genera multa de hasta 30 SMDLV (~$1.400.000 en 2025) y retención inmediata del vehículo por la autoridad de tránsito.' },
      ],
      ctaLabel: 'Cotizar SOAT ahora',
      ctaHref: '#aprende',
    },
  },
  {
    id: 'auto',
    category: 'Seguro de Auto',
    title: 'Seguro de vehículo: coberturas y cómo elegir el mejor plan',
    author: 'Camila Rodríguez',
    authorInitials: 'CR',
    date: '5 de febrero de 2025',
    size: 'wide',
    bg: '#fffbeb',
    icon: (
      <svg viewBox="0 0 140 90" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="32" width="116" height="34" rx="7"/>
        <path d="M24 32l12-20h68l12 20"/>
        <circle cx="36" cy="66" r="12"/><circle cx="104" cy="66" r="12"/>
        <path d="M48 66h56"/><path d="M12 50h116"/>
        <path d="M28 42h18M78 42h34"/>
        <rect x="58" y="34" width="24" height="14" rx="3"/>
      </svg>
    ),
    modal: {
      title: 'Seguro de vehículo: todo lo que debes saber antes de contratar',
      readTime: '7 min lectura',
      intro: 'El SOAT solo cubre víctimas de accidentes. Si quieres proteger tu vehículo, tu bolsillo y tu responsabilidad frente a terceros, necesitas un seguro de auto voluntario. Aquí te explicamos cómo funciona, qué niveles existen y cómo elegir el correcto para tu situación.',
      sections: [
        { h: 'SOAT vs seguro de auto: la diferencia que muchos no entienden' },
        { p: 'El SOAT es obligatorio y cubre únicamente a las víctimas del accidente (gastos médicos, muerte, incapacidad). Un seguro de auto voluntario es distinto: protege tu vehículo, cubre la responsabilidad civil que puedas generar frente a otras personas o vehículos, y puede incluir asistencias en carretera, conductor elegido y más. Tener solo el SOAT es como conducir con cinturón pero sin airbags.' },
        { h: 'Los 3 niveles de cobertura disponibles en Colombia' },
        { ul: [
          'Cobertura básica (RC): Solo responsabilidad civil frente a terceros. Cubre los daños que tú le causes a otras personas, vehículos o propiedades. Es la opción más económica pero deja tu carro sin protección.',
          'Cobertura amplia: Incluye responsabilidad civil más daños propios por colisión, volcamiento, fenómenos naturales (granizo, inundación), cristales y rotura de lunas. El equilibrio ideal entre precio y protección.',
          'Todo riesgo: La cobertura más completa. Incluye hurto total o parcial del vehículo, auto de reemplazo mientras está en el taller, asistencia 24/7 (grúa, cerrajería, taxi), y conductor elegido.',
        ]},
        { insight: 'En Colombia se hurtaron más de 9.000 vehículos en 2024. Si tu carro está financiado, el banco generalmente exige cobertura amplia o todo riesgo como condición del crédito. Compara precios: la diferencia entre aseguradoras puede ser del 35-40%.' },
        { h: 'Factores que determinan el valor de la prima' },
        { ul: [
          'Marca, modelo, año y valor comercial del vehículo.',
          'Ciudad de circulación habitual: Bogotá, Medellín y Cali tienen tarifas más altas.',
          'Perfil del conductor: edad, género y historial de siniestros previos.',
          'Deducible elegido: a mayor deducible asumido, menor es la prima mensual.',
          'Coberturas adicionales seleccionadas: asistencia, conductor elegido, extensión territorial.',
        ]},
        { h: 'Errores frecuentes al contratar un seguro de auto' },
        { ul: [
          'Elegir solo por precio sin revisar qué queda excluido en la póliza.',
          'Declarar mal el uso del vehículo (particular vs transporte por aplicación).',
          'No actualizar el valor asegurado año a año, quedando sub-asegurado.',
          'No revisar los límites de responsabilidad civil: un accidente grave puede superar límites bajos.',
        ]},
        { h: 'Cómo comparar correctamente' },
        { p: 'Los precios varían significativamente entre aseguradoras para la misma cobertura. Asegura2 te muestra cotizaciones de más de 13 aseguradoras al instante con los mismos parámetros, para que la comparación sea justa y puedas elegir con información real.' },
      ],
      ctaLabel: 'Cotizar seguro de auto',
      ctaHref: '#aprende',
    },
  },
  {
    id: 'vida',
    category: 'Seguro de Vida',
    title: '¿Cuánto seguro de vida necesitas según tu situación?',
    author: 'Andrés Vargas',
    authorInitials: 'AV',
    date: '22 de enero de 2025',
    size: 'normal',
    bg: '#fff',
    bordered: true,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 42C24 42 10 33 10 22V12l14-5 14 5v10c0 11-14 20-14 20z"/>
        <path d="M18.5 23c0-2 1.4-3.5 3-3.5 1 0 2 .7 2.5 1.5.5-.8 1.5-1.5 2.5-1.5 1.6 0 3 1.5 3 3.5 0 3-5.5 6.5-5.5 6.5S18.5 26 18.5 23z"/>
      </svg>
    ),
    modal: {
      title: 'Seguro de vida en Colombia: guía práctica para elegir bien',
      readTime: '6 min lectura',
      intro: 'Un seguro de vida no es para ti, es para quienes dependen de ti. En Colombia, millones de familias quedan en situación de vulnerabilidad económica tras la muerte o incapacidad de quien sostenía el hogar. Aquí te explicamos cómo funciona, cuánto necesitas y qué tipos existen.',
      sections: [
        { h: '¿Por qué es importante tener seguro de vida en Colombia?' },
        { p: 'Según la Fasecolda, menos del 25% de los colombianos en edad laboral tiene un seguro de vida voluntario. Sin embargo, el 68% de los hogares colombianos dependen de un solo ingreso. Un seguro de vida garantiza que tus seres queridos puedan cubrir gastos inmediatos, deudas pendientes y mantener su calidad de vida si algo te llega a pasar.' },
        { h: '¿Cuánto deberías asegurar? La regla práctica' },
        { ul: [
          'Sin dependientes económicos: al menos el equivalente a 2 años de salario para cubrir deudas y gastos funerarios.',
          'Con cónyuge y 1 hijo: entre 5 y 7 veces tu ingreso anual para garantizar estabilidad durante su transición.',
          'Con familia numerosa o hipoteca activa: entre 8 y 12 veces el ingreso anual, cubriendo la deuda del inmueble.',
          'Cerca de la jubilación: valorar si los hijos ya son independientes y reducir la cobertura progresivamente.',
        ]},
        { insight: 'La "regla del 10x": muchos asesores financieros recomiendan como punto de partida asegurar 10 veces tu salario anual. Si ganas $3.000.000/mes, tu cobertura base debería ser de $360.000.000.' },
        { h: 'Tipos de seguro de vida disponibles' },
        { ul: [
          'Vida temporal: Cubre por un periodo definido (10, 20 o 30 años). Es el más económico y recomendado para familias jóvenes con deudas.',
          'Vida entera: Cobertura de por vida. Prima más alta pero acumula un valor en efectivo rescatable.',
          'Vida universal o con inversión: Combina protección con un componente de ahorro o inversión. Mayor flexibilidad en primas.',
          'Vida grupo: Ofrecido por empleadores o entidades financieras. Útil pero generalmente insuficiente y no portable si cambias de trabajo.',
        ]},
        { h: 'Errores que debes evitar al contratar' },
        { ul: [
          'Confiar solo en el seguro de vida del empleador: se cancela si cambias o pierdes el trabajo.',
          'No actualizar los beneficiarios después de divorcios, matrimonios o nacimientos.',
          'Comprar sin comparar: las primas pueden variar hasta un 50% entre aseguradoras para la misma cobertura.',
          'No declarar correctamente condiciones de salud preexistentes: puede invalidar el pago al momento del siniestro.',
        ]},
        { h: '¿A qué edad contratar?' },
        { p: 'Cuanto antes, mejor. A los 25 años puedes conseguir una cobertura de $200.000.000 por menos de $30.000 al mes. A los 45 años, la misma cobertura puede costar 3 o 4 veces más. El seguro de vida es uno de los productos financieros donde la juventud y la salud se traducen directamente en ahorro.' },
      ],
      ctaLabel: 'Cotizar seguro de vida',
      ctaHref: '#aprende',
    },
  },
  {
    id: 'medicina',
    category: 'Salud',
    title: 'Medicina prepagada vs seguro de salud: ¿cuál te conviene?',
    author: 'Daniela Ospina',
    authorInitials: 'DO',
    date: '3 de marzo de 2025',
    size: 'normal',
    bg: '#eeeef8',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 10v11a7 7 0 0 0 14 0V10"/>
        <path d="M24 28v8c0 3.3 2.7 6 6 6"/>
        <circle cx="36" cy="38" r="3.5"/>
        <circle cx="16" cy="10" r="2" fill="currentColor" stroke="none"/>
        <circle cx="32" cy="10" r="2" fill="currentColor" stroke="none"/>
      </svg>
    ),
    modal: {
      title: 'Medicina prepagada vs seguro de salud: la guía definitiva para colombianos',
      readTime: '6 min lectura',
      intro: 'Las largas filas en el EPS, las autorizaciones interminables y los tiempos de espera han llevado a muchos colombianos a buscar alternativas. Aquí te explicamos las dos principales opciones y cuál se adapta mejor a tu situación.',
      sections: [
        { h: '¿Cómo funciona el sistema de salud en Colombia?' },
        { p: 'Colombia tiene un sistema de salud de dos niveles. El primero es el EPS (Entidad Promotora de Salud), que es obligatoria para trabajadores formales y afiliados al régimen subsidiado. El segundo nivel son los complementos privados: la medicina prepagada y el seguro de salud. Ninguno reemplaza la EPS, pero ambos mejoran notablemente la experiencia y los tiempos de atención.' },
        { h: 'Medicina prepagada: ¿qué incluye?' },
        { ul: [
          'Acceso directo a una red de clínicas, médicos especialistas y centros diagnósticos sin pasar por la EPS.',
          'Sin necesidad de autorizaciones previas para la mayoría de procedimientos.',
          'Habitaciones individuales o semiprivadas en clínicas de alta complejidad.',
          'Tiempos de respuesta más rápidos para cirugías electivas y especialistas.',
          'Algunos planes incluyen medicina domiciliaria, telemedicina y programas de bienestar.',
        ]},
        { h: 'Seguro de salud: ¿cómo es diferente?' },
        { ul: [
          'Funciona como reembolso o pago directo a la institución médica donde te atiendas.',
          'Mayor flexibilidad: puedes atenderte en casi cualquier clínica o médico, no solo en la red.',
          'Generalmente más económico en prima mensual que la medicina prepagada.',
          'Ideal para personas que viajan frecuentemente o viven fuera de las principales ciudades.',
          'Puede incluir cobertura internacional para viajes al exterior.',
        ]},
        { insight: 'Comparación de costos orientativa 2025: Medicina prepagada para adulto sano (30 años): entre $200.000 y $800.000/mes según plan y aseguradora. Seguro de salud con similar cobertura: entre $80.000 y $300.000/mes. La diferencia está en la conveniencia de acceso.' },
        { h: '¿A quién le conviene cada uno?' },
        { ul: [
          'Medicina prepagada: personas con familia que requieran atención frecuente, ejecutivos con tiempo limitado, personas con condiciones crónicas que necesitan especialistas regularmente.',
          'Seguro de salud: jóvenes sanos que quieren una red de seguridad económica ante hospitalizaciones graves, personas que viajan mucho, independientes con presupuesto ajustado.',
        ]},
        { h: 'Aspectos clave antes de contratar' },
        { ul: [
          'Verifica las enfermedades preexistentes: todas las aseguradoras tienen períodos de carencia o exclusiones.',
          'Revisa la red de clínicas: asegúrate de que haya opciones en tu ciudad y barrio.',
          'Compara los topes máximos de cobertura anual o por evento.',
          'Pregunta por los copagos y deducibles en caso de hospitalización.',
        ]},
      ],
      ctaLabel: 'Cotizar medicina prepagada',
      ctaHref: '#aprende',
    },
  },
  {
    id: 'hogar',
    category: 'Seguro de Hogar',
    title: '¿Qué cubre un seguro de hogar y qué queda excluido?',
    author: 'Juan Pablo Mora',
    authorInitials: 'JP',
    date: '17 de febrero de 2025',
    size: 'normal',
    bg: '#fff',
    bordered: true,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 24L24 8l18 16"/>
        <path d="M11 22v18h26V22"/>
        <path d="M19 40V30h10v10"/>
        <path d="M30 12v-4h4v8"/>
      </svg>
    ),
    modal: {
      title: 'Seguro de hogar en Colombia: coberturas, exclusiones y cómo elegir',
      readTime: '5 min lectura',
      intro: 'Tu hogar probablemente es tu inversión más grande. Un incendio, una rotura de tubería o un robo pueden representar pérdidas de decenas de millones de pesos. El seguro de hogar existe para proteger esa inversión, pero no todos los planes son iguales. Aquí te contamos lo esencial.',
      sections: [
        { h: '¿Por qué asegurar tu hogar en Colombia?' },
        { p: 'Colombia es un país sísmicamente activo, con lluvias torrenciales frecuentes y altas tasas de hurto en algunas ciudades. Sin embargo, según Fasecolda, menos del 15% de los hogares colombianos cuenta con un seguro de hogar. Muchos propietarios asumen que el seguro del edificio o de la propiedad horizontal cubre sus bienes personales, lo cual es un error costoso.' },
        { h: 'Lo que cubre un seguro de hogar' },
        { ul: [
          'Incendio y explosión: daños estructurales y pérdida de contenidos por incendio, rayo o explosión accidental.',
          'Daños por agua: rotura de tuberías, filtraciones e inundaciones que afecten paredes, pisos o muebles.',
          'Fenómenos naturales: terremotos, vendavales, granizadas y deslizamientos de tierra (con o sin cobertura de terremoto según el plan).',
          'Hurto con violencia: robo de electrodomésticos, joyas, equipos de cómputo y enseres domésticos.',
          'Responsabilidad civil: daños que tu hogar cause a vecinos (ejemplo: fuga de agua que daña el apartamento de abajo).',
          'Asistencia en el hogar: plomería, electricidad, cerrajería y vidriería de urgencia según el plan.',
        ]},
        { insight: '¿Cuánto cuesta? Un seguro de hogar básico para un apartamento de $200.000.000 cuesta entre $40.000 y $120.000 al mes, dependiendo de coberturas y deducibles. Es una de las primas más bajas en relación al valor protegido.' },
        { h: 'Qué NO cubre generalmente (exclusiones frecuentes)' },
        { ul: [
          'Bienes bajo construcción o remodelación activa.',
          'Joyas o valores por encima de un límite sin declaración previa.',
          'Daños causados por negligencia del asegurado.',
          'Guerra, terrorismo o actos vandálicos masivos.',
          'Vehículos guardados en el garaje (tienen su propio seguro).',
        ]},
        { h: 'Propietarios vs arrendatarios: ¿quién necesita qué?' },
        { ul: [
          'Si eres propietario: necesitas asegurar tanto la estructura del inmueble como el contenido (muebles, electrodomésticos, etc.).',
          'Si arriendas: el dueño es responsable de la estructura. Tú debes asegurar solo el contenido de tu vivienda.',
          'En propiedad horizontal: el seguro del edificio cubre áreas comunes y la estructura exterior, pero NO el interior de tu apartamento.',
        ]},
        { alert: 'Error frecuente: asumir que el seguro del edificio cubre tus bienes personales. Solo cubre las áreas comunes y la estructura. El interior de tu unidad es tu responsabilidad.' },
      ],
      ctaLabel: 'Cotizar seguro de hogar',
      ctaHref: '#aprende',
    },
  },
  {
    id: 'arriendo',
    category: 'Seguro de Arrendamiento',
    title: 'Arrienda con tranquilidad: protege tu propiedad ante cualquier imprevisto',
    author: 'Santiago Torres',
    authorInitials: 'ST',
    date: '10 de enero de 2025',
    size: 'wide',
    bg: 'navy',
    dark: true,
    icon: (
      <svg viewBox="0 0 140 90" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.22">
        <path d="M70 12L20 46v36h100V46z"/>
        <rect x="52" y="54" width="16" height="28" rx="2"/>
        <rect x="75" y="48" width="20" height="18" rx="2"/>
        <path d="M10 82h120"/>
        <path d="M70 12l-8-6"/>
        <circle cx="104" cy="38" r="10"/>
        <path d="M100 38h8M104 34v8"/>
      </svg>
    ),
    modal: {
      title: 'Seguro de arrendamiento en Colombia: guía completa para propietarios e inquilinos',
      readTime: '6 min lectura',
      intro: 'El 35% de los conflictos entre propietarios e inquilinos en Colombia terminan en procesos jurídicos costosos. Un seguro de arrendamiento protege tanto al dueño del inmueble como al arrendatario, garantizando el pago del canon, cubriendo daños y evitando procesos legales prolongados.',
      sections: [
        { h: '¿Qué cubre un seguro de arrendamiento?' },
        { ul: [
          'Canon de arrendamiento: el seguro paga el canon mensual si el inquilino incumple, hasta por 12 meses.',
          'Daños al inmueble: cubre deterioros causados por el arrendatario más allá del desgaste normal.',
          'Servicios públicos impagos: asume las deudas de agua, luz y gas dejadas por el inquilino.',
          'Asistencia jurídica: incluye representación legal para procesos de restitución de inmueble.',
          'Administración impaga: cubre cuotas de administración no pagadas por el arrendatario.',
        ]},
        { insight: 'El proceso de desalojo en Colombia puede tardar entre 6 y 18 meses sin un seguro. Con él, la aseguradora te paga el canon mientras se resuelve el proceso legal.' },
        { h: '¿Quién necesita un seguro de arrendamiento?' },
        { p: 'Todo propietario que arriende un inmueble, ya sea apartamento, casa, local comercial u oficina. También es útil para arrendatarios que quieren garantizar su permanencia y proteger su historial crediticio ante imprevistos económicos.' },
        { h: 'Tipos de póliza disponibles' },
        { ul: [
          'Póliza para propietario: protege el ingreso del canon y cubre daños al inmueble.',
          'Póliza para arrendatario: actúa como garantía ante el propietario, reemplazando el codeudor.',
          'Póliza mixta o integral: cubre ambas partes con asistencia jurídica incluida.',
        ]},
        { h: 'Cuánto cuesta y cómo se calcula' },
        { p: 'La prima del seguro de arrendamiento generalmente equivale entre el 3% y el 5% del canon mensual anual. Para un apartamento con canon de $1.500.000, el costo del seguro puede estar entre $54.000 y $90.000 al mes, una inversión mínima frente al riesgo de no recibir el pago por varios meses.' },
        { h: 'Cómo contratar el seguro correcto' },
        { ul: [
          'Define si necesitas cobertura solo de canon o también de daños y servicios.',
          'Compara al menos 3 aseguradoras: coberturas, deducibles y límites difieren mucho.',
          'Verifica el tiempo máximo de cobertura por incumplimiento (6, 9 o 12 meses).',
          'Confirma que incluya asistencia jurídica para proceso de restitución.',
          'Solicita asesoría gratuita con Asegura2: te ayudamos a elegir la póliza ideal.',
        ]},
      ],
      ctaLabel: 'Cotizar seguro de arrendamiento',
      ctaHref: '#arriendo',
    },
  },
  {
    id: 'reclamar',
    category: 'Consejos',
    title: 'Guía paso a paso para reclamar tu seguro sin contratiempos',
    author: 'Camila Rodríguez',
    authorInitials: 'CR',
    date: '28 de febrero de 2025',
    size: 'normal',
    bg: '#eeeef8',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v32a2 2 0 0 0 2 2h34a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
        <rect x="13" y="3" width="22" height="6" rx="1"/>
        <line x1="13" y1="20" x2="35" y2="20"/>
        <line x1="13" y1="28" x2="27" y2="28"/>
      </svg>
    ),
    modal: {
      title: 'Cómo reclamar tu seguro en Colombia: guía completa',
      readTime: '5 min lectura',
      intro: 'Muchas personas pagan su seguro por años y cuando lo necesitan, no saben cómo reclamar o cometen errores que retrasan o anulan el pago. Esta guía te explica exactamente qué hacer desde el momento en que ocurre un siniestro hasta que recibes la indemnización.',
      sections: [
        { h: 'Antes del siniestro: lo que debes hacer hoy' },
        { ul: [
          'Guarda una copia digital de tu póliza y los datos de contacto de tu aseguradora en tu celular.',
          'Anota el número de póliza y el número de la línea de siniestros (generalmente disponible 24/7).',
          'Conoce los deducibles de tu póliza: es lo que tú pagas antes de que la aseguradora cubra el resto.',
          'Revisa los plazos de aviso de siniestro indicados en tu póliza (generalmente 24 a 72 horas).',
        ]},
        { h: 'Paso 1: notifica el siniestro de inmediato' },
        { p: 'Llama a la línea de siniestros de tu aseguradora lo antes posible. La mayoría tiene atención 24/7. Darles aviso tardío puede ser causal de rechazo parcial o total de la reclamación según los términos de tu póliza. Ten a mano: número de póliza, fecha y hora del siniestro, descripción de lo ocurrido.' },
        { h: 'Paso 2: documenta todo con evidencia' },
        { ul: [
          'Fotografía y/o video del daño desde múltiples ángulos, con sello de fecha y hora.',
          'Lista detallada de bienes afectados o perdidos con su valor estimado.',
          'Facturas, recibos o pruebas de compra de los bienes dañados o robados.',
          'Datos de testigos si los hay: nombre completo, teléfono y correo.',
          'En caso de robo o accidente: copia de la denuncia ante la Fiscalía o informe de tránsito.',
        ]},
        { h: 'Paso 3: presenta los documentos a la aseguradora' },
        { ul: [
          'Formulario oficial de reclamación de la aseguradora (lo entregan ellos).',
          'Copia de la póliza vigente.',
          'Documentos de identidad del asegurado.',
          'Soportes del siniestro: fotos, facturas, denuncia, informes médicos según el tipo.',
          'Número de cuenta bancaria para el depósito de la indemnización.',
        ]},
        { insight: 'Plazos legales en Colombia: la aseguradora tiene máximo 30 días hábiles para pronunciarse sobre tu reclamación según el Código de Comercio. Si no responden, puedes acudir directamente a la Superintendencia Financiera de Colombia.' },
        { h: 'Errores que pueden retrasar o anular tu reclamación' },
        { ul: [
          'No notificar dentro del plazo establecido en la póliza.',
          'Reparar o disponer de los bienes dañados antes de que el ajustador los inspeccione.',
          'Declarar un valor mayor al real (sobreaseguración fraudulenta).',
          'No tener documentos que prueben la propiedad de los bienes reclamados.',
          'Haber omitido información relevante al contratar la póliza (preexistencias, condiciones del inmueble).',
        ]},
        { h: 'Si la aseguradora rechaza tu reclamación' },
        { p: 'Tienes derecho a pedir el rechazo por escrito con los fundamentos legales. Puedes apelar ante la misma aseguradora, recurrir al Defensor del Consumidor Financiero de esa entidad (gratuito) o interponer queja ante la Superintendencia Financiera de Colombia. Consulta siempre con tu asesor Asegura2 antes de aceptar un rechazo.' },
      ],
      ctaLabel: 'Hablar con un asesor',
      ctaHref: '#contacto',
    },
  },
]

/* ═══════════════════════════════════════════════
   Renderizador de secciones — estilo blog
═══════════════════════════════════════════════ */
function renderSection(s, i) {
  if (s.h)       return <h4 key={i} className={styles.modalH}>{s.h}</h4>
  if (s.p)       return <p  key={i} className={styles.modalP}>{s.p}</p>
  if (s.ul)      return (
    <ul key={i} className={styles.modalUl}>
      {s.ul.map((item, j) => <li key={j}>{item}</li>)}
    </ul>
  )
  if (s.insight) return (
    <blockquote key={i} className={styles.modalQuote}>{s.insight}</blockquote>
  )
  if (s.alert)   return (
    <p key={i} className={styles.modalNote}><strong>Importante:</strong> {s.alert}</p>
  )
  return null
}

/* ═══════════════════════════════════════════════
   Modal — estilo artículo de blog
═══════════════════════════════════════════════ */
function Modal({ article, onClose }) {
  const { modal, category, author, authorInitials, date } = article

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        <button className={styles.modalClose} onClick={onClose} aria-label="Cerrar">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className={styles.modalBody}>

          {/* Cabecera artículo */}
          <span className={styles.modalCategory}>{category}</span>
          <h3 className={styles.modalTitle}>{modal.title}</h3>

          {/* Autoría */}
          <div className={styles.modalByline}>
            <div className={styles.modalAvatar}>{authorInitials}</div>
            <div className={styles.modalBylineText}>
              <span className={styles.modalAuthorName}>{author}</span>
              <span className={styles.modalBylineMeta}>{date}&nbsp;·&nbsp;{modal.readTime}</span>
            </div>
          </div>

          <hr className={styles.modalDivider} />

          {/* Lead con dropcap */}
          <p className={styles.modalLead}>{modal.intro}</p>

          {/* Secciones */}
          <div className={styles.modalContent}>
            {modal.sections.map(renderSection)}
          </div>

        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   Article Card
═══════════════════════════════════════════════ */
function ArticleCard({ article, onClick }) {
  const isDark = article.bg === 'navy'
  const isWide = article.size === 'wide'

  const cardStyle = {
    background: isDark ? 'var(--navy)' : article.bg,
    ...(article.bordered ? { border: '1.5px solid var(--gray-200)' } : {}),
  }

  return (
    <article
      className={`${styles.card} ${isWide ? styles.cardWide : ''} ${isDark ? styles.cardDark : ''}`}
      style={cardStyle}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardIconBox}>{article.icon}</div>
        <span className={styles.cardCategory}>{article.category}</span>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <button className={`${styles.cardBtn} ${isDark ? styles.cardBtnDark : ''}`} onClick={() => onClick(article)}>
          Leer artículo
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
      {isWide && (
        <div className={styles.cardIllustration}>{article.icon}</div>
      )}
    </article>
  )
}

/* ═══════════════════════════════════════════════
   Section export
═══════════════════════════════════════════════ */
export default function Plans() {
  const [activeModal, setActiveModal] = useState(null)
  const activeArticle = ARTICLES.find(a => a.id === activeModal)

  return (
    <section className={styles.section} id="aprende">
      <div className="container">
        <div className={styles.header}>
          <span className="sectionEyebrow">Centro de aprendizaje</span>
          <h2 className={`sectionTitle ${styles.sectionTitle}`}>
            Lo que debes saber antes de <span className="highlight">contratar un seguro</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Guías prácticas sobre los seguros más importantes en Colombia, explicadas por nuestros expertos.
          </p>
        </div>
        <div className={styles.grid}>
          {ARTICLES.map(article => (
            <ArticleCard key={article.id} article={article} onClick={a => setActiveModal(a.id)} />
          ))}
        </div>
      </div>

      {activeArticle && (
        <Modal article={activeArticle} onClose={() => setActiveModal(null)} />
      )}
    </section>
  )
}
