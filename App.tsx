import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, MapPin, ArrowRight, CheckCircle, 
  Leaf, Zap, Activity, Instagram, 
  Facebook, Youtube, MessageCircle, Play, Quote, BookOpen, Gift, Shield, AlertCircle
} from 'lucide-react';
import { Button } from './components/Button';
import { SelahAssistant } from './components/SelahAssistant';

// --- TYPES ---
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  content: React.ReactNode;
  ctaText?: string;
  ctaAction?: () => void;
}

// --- HELPER COMPONENTS ---
const TikTokIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// --- MAIN COMPONENT ---
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Modals State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>("Valoración Inicial");

  // Lead Gen Forms
  const [isIntensiveFormOpen, setIsIntensiveFormOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [isRecoveryFormOpen, setIsRecoveryFormOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  
  // Content Modals
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState<'privacy' | 'terms' | 'medical' | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [showAllPosts, setShowAllPosts] = useState(false);
  
  // Lead Magnet
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(true);
  const [leadEmail, setLeadEmail] = useState("");
  const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // WhatsApp Helper
  const openWhatsApp = (message: string) => {
    const phone = "50650111177";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero Carousel
  const heroSlides = [
    {
      image: "https://i.postimg.cc/sxPRCZ4Z/grounding.jpg",
      title: "Mi camino hacia la salud integral empieza aquí"
    },
    {
      image: "https://i.postimg.cc/DZKjkpjQ/helioterapia.jpg",
      title: "Renuevo mi cuerpo y mente con terapias naturales"
    },
    {
      image: "https://i.postimg.cc/BQtdCydv/vitamin-b12-4796944-1280.jpg",
      title: "Medicina ancestral + tecnología moderna = bienestar"
    },
    {
      image: "https://i.postimg.cc/CLfqkMLn/estres-(2).jpg",
      title: "Selah Thera House no es una clínica, es el lugar donde mi cuerpo recordó cómo sanarse a sí mismo"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // --- HANDLERS ---
  const handleBookingOpen = (service: string) => {
    setPreselectedService(service);
    setIsBookingOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const date = (form.elements.namedItem('date') as HTMLInputElement).value;
    const time = (form.elements.namedItem('time') as HTMLInputElement).value;
    const service = (form.elements.namedItem('service') as HTMLSelectElement).value;
    const message = `Hola, quisiera agendar mi ${service} para el día ${date} a las ${time}.`;
    openWhatsApp(message);
    setIsBookingOpen(false);
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const date = (form.elements.namedItem('date') as HTMLInputElement).value;
    const time = (form.elements.namedItem('time') as HTMLInputElement).value;
    const message = `Hola, mi nombre es ${name}. Me interesa aplicar al Programa Recovery. Me gustaría iniciar el ${date} a las ${time}. Quedo atento a la confirmación.`;
    openWhatsApp(message);
    setIsRecoveryFormOpen(false);
  };

  const handleLeadSubmit = (e: React.FormEvent, type: 'Intensive' | 'Recovery') => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const symptom = (form.elements.namedItem('symptom') as HTMLInputElement).value;
    const date = (form.elements.namedItem('date') as HTMLInputElement).value;
    const companion = (form.elements.namedItem('companion') as HTMLSelectElement).value;
    const therapy = (form.elements.namedItem('therapy') as HTMLSelectElement).value;
    const programName = type === 'Intensive' ? 'Retreat Intensive (10 Días)' : 'Retreat Recovery (21 Días)';
    const message = `Hola, soy ${name}. Me interesa aplicar al ${programName}.\n\nFecha deseada: ${date}\nViajo: ${companion}\nAtención Terapéutica: ${therapy}\n\nMi principal desafío de salud es: ${symptom}.\n\nQuisiera saber si soy candidato/a para el programa.`;
    openWhatsApp(message);
    if(type === 'Intensive') setIsIntensiveFormOpen(false);
    else setIsLeadFormOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
    const message = `CONSULTA GENERAL\nCliente: ${name}\nCorreo: ${email}\nMensaje: ${subject}`;
    openWhatsApp(message);
    setIsContactFormOpen(false);
  };

  const handleMagnetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(leadEmail) {
      setIsLeadSubmitted(true);
    }
  };

  // --- DATA ---
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Helioterapia: Luz Solar como medicina",
      excerpt: "Descubre cómo la exposición controlada al sol potencia tu sistema inmune.",
      image: "https://i.postimg.cc/DZKjkpjQ/helioterapia.jpg",
      category: "Naturaleza",
      content: (
        <div className="space-y-4">
          <p>La helioterapia, o terapia solar, es mucho más que simplemente "tomar el sol". Es el uso terapéutico de la luz solar para tratar diversas condiciones físicas y psicológicas, regulando nuestros ritmos circadianos y estimulando la producción de Vitamina D.</p>
          <h4 className="font-bold text-brand-primary">Beneficios Clínicos:</h4>
          <ul className="list-disc pl-5 space-y-2">
             <li>Estimulación de la Vitamina D3: Crucial para la salud ósea e inmunológica.</li>
             <li>Regulación del Sueño: La luz natural regula la producción de melatonina.</li>
             <li>Mejora del Estado de Ánimo: Aumenta la serotonina, combatiendo la depresión estacional.</li>
          </ul>
          <h4 className="font-bold text-brand-primary">Sinergia Selah:</h4>
          <p>En nuestros protocolos, combinamos la Helioterapia matutina con el <strong>Grounding</strong> (conexión a tierra) y posteriormente con la <strong>Cama de Luz Roja</strong>. Mientras el sol provee el espectro completo, la luz roja concentra las longitudes de onda regenerativas, acelerando la reparación tisular iniciada por el sol.</p>
        </div>
      ),
      ctaText: "Ver Day Pass",
      ctaAction: () => handleBookingOpen("Therapeutic Day Pass")
    },
    {
      id: 2,
      title: "Talasoterapia: El poder curativo del mar",
      excerpt: "El agua de mar contiene minerales idénticos a nuestro plasma sanguíneo.",
      image: "https://i.postimg.cc/Fs6HFnjr/talasoterapia.jpg",
      category: "Terapia Natural",
      content: (
        <div className="space-y-4">
          <p>La talasoterapia utiliza el agua de mar, las algas y el clima marino con fines terapéuticos. El plasma marino es 98% idéntico a nuestro plasma sanguíneo, lo que permite una absorción mineral casi inmediata a través de la piel.</p>
          <h4 className="font-bold text-brand-primary">Aplicaciones:</h4>
          <ul className="list-disc pl-5 space-y-2">
             <li>Problemas dermatológicos (Psoriasis, Eczema).</li>
             <li>Reumatismo y dolores articulares.</li>
             <li>Fatiga crónica y agotamiento mineral.</li>
          </ul>
          <h4 className="font-bold text-brand-primary">Sinergia Selah:</h4>
          <p>Potenciamos la absorción de los minerales marinos aplicando previamente <strong>PEMF (Campos Electromagnéticos Pulsados)</strong>. El PEMF abre los canales celulares, permitiendo que el magnesio y el yodo del mar penetren profundamente en los tejidos durante la inmersión.</p>
        </div>
      ),
      ctaText: "Ver Retreat Recovery",
      ctaAction: () => scrollToSection("planes")
    },
    {
      id: 3,
      title: "Apiterapia: El oro líquido de la salud",
      excerpt: "Propóleo, jalea real y veneno de abeja para la regeneración celular.",
      image: "https://i.postimg.cc/1XjstfN1/apiterapia.jpg",
      category: "Medicina Ancestral",
      content: (
        <div className="space-y-4">
          <p>La apiterapia es el uso medicinal de los productos de la colmena. Desde la potente acción antibiótica del propóleo hasta el efecto antiinflamatorio de la apitoxina (veneno de abeja), estos productos son verdaderas joyas de la naturaleza.</p>
          <h4 className="font-bold text-brand-primary">Propiedades:</h4>
          <ul className="list-disc pl-5 space-y-2">
             <li>Inmunomodulación potente.</li>
             <li>Acción antiviral y bactericida natural.</li>
             <li>Regeneración de tejidos y cicatrización.</li>
          </ul>
          <h4 className="font-bold text-brand-primary">Sinergia Selah:</h4>
          <p>Utilizamos la Apiterapia en conjunto con el <strong>Escáner 4D</strong> para monitorear la respuesta inmunológica. Además, combinamos la ingesta de Jalea Real con la <strong>Terapia de Ondas Escalares</strong>, lo que parece potenciar la distribución de estos nutrientes a nivel sistémico.</p>
        </div>
      ),
      ctaText: "Agendar Valoración",
      ctaAction: () => handleBookingOpen("Valoración Inicial")
    },
    {
      id: 4,
      title: "Desintoxicación Iónica: Limpieza Profunda",
      excerpt: "Elimina toxinas acumuladas mediante electrólisis y ósmosis.",
      image: "https://i.postimg.cc/9M9qvqSK/detox.jpg",
      category: "Tecnología",
      content: (
        <div className="space-y-4">
          <p>La desintoxicación iónica es un tratamiento que utiliza un baño de pies con agua ionizada para extraer toxinas del cuerpo. El proceso bioeléctrico resuena con los canales iónicos del cuerpo, facilitando la excreción de metales pesados y desechos ácidos.</p>
          <h4 className="font-bold text-brand-primary">Sinergia Selah:</h4>
          <p>En Selah Thera House, <strong>NUNCA</strong> realizamos una sesión de <strong>Zapper</strong> (eliminación de patógenos) sin una sesión posterior de Desintoxicación Iónica. El Zapper neutraliza virus y bacterias, y el Detox Iónico se encarga de sacar esos desechos del cuerpo inmediatamente, evitando crisis curativas.</p>
        </div>
      ),
      ctaText: "Ver Programa Recovery",
      ctaAction: () => { setIsRecoveryFormOpen(true); }
    },
    {
      id: 5,
      title: "Electrolitos y Bioelectricidad",
      excerpt: "Por qué la hidratación es la base de toda terapia energética.",
      image: "https://i.postimg.cc/rFwkrC8p/hidratacion-(2).jpg",
      category: "Fundamentos",
      content: (
        <div className="space-y-4">
          <p>Somos seres eléctricos. Cada célula funciona como una pequeña batería. Para que las terapias como el PEMF o las Ondas Escalares funcionen, tu cuerpo debe ser un buen conductor. El agua pura no conduce electricidad; el agua con electrolitos (minerales) sí.</p>
          <h4 className="font-bold text-brand-primary">Sinergia Selah:</h4>
          <p>Antes de cualquier sesión tecnológica en Selah, administramos una bebida <strong>Alcalina e Ionizada</strong> rica en electrolitos. Esto aumenta la conductividad de tus tejidos hasta en un 60%, asegurando que recibas el máximo beneficio de cada onda terapéutica.</p>
        </div>
      ),
      ctaText: "Ver Day Pass",
      ctaAction: () => handleBookingOpen("Therapeutic Day Pass")
    },
    {
      id: 6,
      title: "Alimentación Sanadora vs. Comida Sana",
      excerpt: "La diferencia crítica entre mantener la salud y reparar el daño biológico.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
      category: "Nutrición",
      content: (
        <div className="space-y-4">
          <p>Comer 'sano' (balanceado) es excelente para el mantenimiento. Pero cuando hay enfermedad crónica o inflamación aguda, el cuerpo necesita <strong>Alimentación Sanadora</strong>: una intervención nutricional estratégica diseñada para reparar.</p>
          <h4 className="font-bold text-brand-primary">Sinergia Selah:</h4>
          <p>No importa qué tan buenos nutrientes ingieras si tu célula está cerrada e inflamada. En Selah, utilizamos <strong>PEMF y Ondas Escalares</strong> para aumentar la permeabilidad de la membrana celular. Esto permite que los nutrientes de nuestra alimentación sanadora entren realmente a la célula, donde ocurre la magia.</p>
        </div>
      ),
      ctaText: "Descargar Guía",
      ctaAction: () => { setIsGuideOpen(true); }
    },
     {
      id: 7,
      title: "Fototerapia Luz Roja e Infrarroja",
      excerpt: "Revitaliza tu cuerpo con la luz: Energía mitocondrial pura.",
      image: "https://i.postimg.cc/qRTF328j/Fototerapia.jpg",
      category: "Tecnología",
      content: (
        <div className="space-y-4">
          <p>Utilizamos el equipo <strong>Magique Power LUM-5500</strong> de grado médico. Esta luz penetra en los tejidos estimulando las mitocondrias para producir más ATP (energía celular).</p>
          <p><strong>Dato:</strong> 15 minutos de esta terapia equivalen metabólicamente a 35 minutos de correr.</p>
          <h4 className="font-bold text-brand-primary">Sinergia Selah:</h4>
          <p>Combinamos la Luz Roja con la <strong>Vitamina C Liposomal</strong>. La luz estimula al fibroblasto, y la Vitamina C le da los ladrillos para construir colágeno nuevo. Es el dúo perfecto para regeneración de tejidos y piel.</p>
        </div>
      ),
      ctaText: "Ver Day Pass",
      ctaAction: () => handleBookingOpen("Therapeutic Day Pass")
    },
    {
      id: 8,
      title: "Physio Magneto (PEMF)",
      excerpt: "Recarga celular y alivio del dolor profundo.",
      image: "https://i.postimg.cc/CKyP3brt/magnetorerapia.jpg",
      category: "Tecnología",
      content: (
        <div className="space-y-4">
          <p>La tecnología PEMF (Campo Electromagnético Pulsado) recarga las células enfermas que tienen bajo voltaje. Mejora la microcirculación al separar los glóbulos rojos (efecto Rouleaux), permitiendo que el oxígeno llegue a zonas de dolor profundo.</p>
          <h4 className="font-bold text-brand-primary">Sinergia Selah:</h4>
          <p>Usamos PEMF como el <strong>'Abrelatas Biológico'</strong>. Lo aplicamos antes de la nutrición o el Detox, ya que abre las membranas celulares, permitiendo que las toxinas salgan y los nutrientes entren con mucha mayor facilidad.</p>
        </div>
      ),
      ctaText: "Ver Programa Recovery",
      ctaAction: () => { setIsRecoveryFormOpen(true); }
    },
    {
      id: 9,
      title: "Desintoxicación Iónica + Zapper",
      excerpt: "El dúo dinámico para la limpieza de patógenos.",
      image: "https://i.postimg.cc/9M9qvqSK/detox.jpg",
      category: "Protocolos",
      content: (
        <div className="space-y-4">
          <p>El Zapper emite frecuencias que neutralizan virus, bacterias y parásitos. Sin embargo, al morir, estos patógenos liberan toxinas. Aquí entra la Desintoxicación Iónica.</p>
          <h4 className="font-bold text-brand-primary">Sinergia Selah:</h4>
          <p>Nunca aplicamos Zapper solo. Siempre lo seguimos inmediatamente con 30 minutos de Detox Iónico para drenar los residuos metabólicos. Esto previene la 'crisis curativa' y deja al paciente con energía en lugar de fatiga.</p>
        </div>
      ),
      ctaText: "Ver Programa Recovery",
      ctaAction: () => { setIsRecoveryFormOpen(true); }
    },
    {
      id: 10,
      title: "Fisioterapia Bioeléctrica",
      excerpt: "Desbloqueo de meridianos y alivio del dolor.",
      image: "https://i.postimg.cc/s2kM9gXM/masaje-bioenergetico.jpg",
      category: "Terapia",
      content: (
        <div className="space-y-4">
          <p>Utiliza corrientes suaves para estimular puntos de acupuntura y meridianos, promoviendo el flujo de energía vital (Qi). Ideal para contracturas y estrés.</p>
          <h4 className="font-bold text-brand-primary">Sinergia Selah:</h4>
          <p>Combinamos esta terapia con el <strong>Oscilador Tesla</strong>. La fisioterapia limpia los 'cables' (meridianos) y el Tesla envía la 'electricidad' (energía) para recargar el sistema. Juntos restablecen el equilibrio nervioso.</p>
        </div>
      ),
      ctaText: "Agendar Cita",
      ctaAction: () => handleBookingOpen("Valoración Inicial")
    },
    {
      id: 11,
      title: "Ondas Escalares",
      excerpt: "Restauración del ADN y armonización del campo.",
      image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=80&w=800",
      category: "Tecnología Cuántica",
      content: (
        <div className="space-y-4">
          <p>Las ondas escalares son ondas longitudinales capaces de atravesar la materia sin perder fuerza. Se utilizan para reparar la comunicación celular y el ADN. Es como 'afinar' la orquesta de tu cuerpo.</p>
          <h4 className="font-bold text-brand-primary">Sinergia Selah:</h4>
          <p>Las combinamos con <strong>Grounding (Conexión a Tierra)</strong>. Las ondas escalares cargan el cuerpo, y el Grounding permite descargar el exceso de estática inflamatoria, creando un flujo de energía perfecto.</p>
        </div>
      ),
      ctaText: "Ver Retreat Recovery",
      ctaAction: () => scrollToSection("planes")
    },
    {
      id: 12,
      title: "Escaneo 4D Metaterapia",
      excerpt: "El mapa preciso de tu salud celular.",
      image: "https://i.postimg.cc/bJGj5qBM/digitization-7261158-1280.jpg",
      category: "Diagnóstico",
      content: (
        <div className="space-y-4">
          <p>Analiza el estado de entropía de cada órgano y tejido. No adivinamos qué tienes, lo vemos. Detecta patógenos, alérgenos y desequilibrios energéticos antes de que se manifiesten físicamente.</p>
          <h4 className="font-bold text-brand-primary">Sinergia Selah:</h4>
          <p>Es la brújula de todo tratamiento. Usamos el Escaneo 4D para determinar exactamente qué frecuencia usar en el Zapper y qué protocolo aplicar en el PEMF. Sin diagnóstico preciso, no hay tratamiento eficiente.</p>
        </div>
      ),
      ctaText: "Agendar Valoración",
      ctaAction: () => handleBookingOpen("Valoración Inicial")
    },
    {
      id: 13,
      title: "Oscilador Tesla",
      excerpt: "Tecnología de Nikola Tesla para la regeneración.",
      image: "https://i.postimg.cc/qMzsqSCX/osilador-tesla.jpg",
      category: "Tecnología",
      content: (
        <div className="space-y-4">
          <p>Basado en la bobina bifilar de Tesla y las ondas de Lakhovsky. Genera un campo que obliga a las células a vibrar en su frecuencia sana original.</p>
          <h4 className="font-bold text-brand-primary">Sinergia Selah:</h4>
          <p>Este equipo permite realizar <strong>Terapias a Distancia (Remotas)</strong> gracias a la física cuántica (entrelazamiento). Es ideal para mantener el tratamiento de nuestros pacientes internacionales después de que regresan a casa.</p>
        </div>
      ),
      ctaText: "Ver Day Pass",
      ctaAction: () => handleBookingOpen("Therapeutic Day Pass")
    },
    {
      id: 14,
      title: "Sinergia de Protocolos",
      excerpt: "Por qué 1+1=3 en Selah Thera House.",
      image: "https://i.postimg.cc/rwWXRVBc/teamwork-5266864-1280.jpg",
      category: "Filosofía",
      content: (
        <div className="space-y-4">
          <p>En Selah, no vendemos sesiones de máquinas sueltas. Vendemos <strong>Protocolos de Sinergia</strong>. Entendemos que el cuerpo es un sistema complejo.</p>
          <p>Nuestra fórmula <strong>Abrir (PEMF) + Limpiar (Detox) + Reparar (Luz/Tesla)</strong> garantiza resultados superiores a la suma de las partes individuales.</p>
        </div>
      ),
      ctaText: "Conocer el Método",
      ctaAction: () => scrollToSection("servicios")
    }
  ];

  const faqs = [
    {
      question: "Todo lo que necesitas saber sobre nuestros programas VIP",
      answer: "Información detallada sobre nuestros servicios premium."
    },
    {
      question: "En qué consiste el Programa Recovery?",
      answer: "Es un programa VIP para la Regeneración Corporal y Estabilización Fisiológica y Neurológica. “Recovery” hace énfasis en la desintoxicación, la relajación profunda y la reconexión personal."
    },
    {
      question: "Para quién es el Programa Recovery?",
      answer: (
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Profesionales y Empresarios:</strong> Si trabajas largas horas y sientes que el estrés está afectando tu salud.</li>
          <li><strong>Personas que buscan descanso:</strong> Si necesitas desconectar de la rutina y recargar energías.</li>
          <li><strong>Buscadores de bienestar:</strong> Si quieres mejorar tu salud física y mental.</li>
        </ul>
      )
    },
    {
      question: "¿Qué hace especial al programa Recovery?",
      answer: (
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Diagnóstico preciso:</strong> Evaluación exhaustiva para plan personalizado.</li>
          <li><strong>Terapias naturales + Tecnología Quántica:</strong> Lo mejor de ambos mundos.</li>
          <li><strong>Desintoxicación profunda:</strong> Eliminar toxinas para mejorar función celular.</li>
          <li><strong>Alimentación sanadora:</strong> Nutrición sugerida para energía y recuperación.</li>
        </ul>
      )
    },
    {
      question: "Beneficios del Programa Recovery",
      answer: (
        <ul className="list-disc pl-4 space-y-1">
          <li>Mejora de la conciencia corporal.</li>
          <li>Reducción del dolor y la inflamación.</li>
          <li>Mejora de digestión y eliminación de toxinas.</li>
          <li>Mayor claridad mental y enfoque.</li>
          <li>Fortalecimiento inmunológico.</li>
        </ul>
      )
    },
    {
      question: "En qué consiste el Programa Retreat Recovery Costa Rica?",
      answer: "Si has probado múltiples tratamientos y buscas una alternativa natural y personalizada para recuperar tu salud, este retiro de 21 días en Playa Nosara es la respuesta."
    },
    {
      question: "Para quién es el Programa Retreat Recovery?",
      answer: (
        <ul className="list-disc pl-4 space-y-1">
          <li>Diagnosticados con enfermedad crónica buscando recuperación profunda.</li>
          <li>Post-cirugías o tratamientos médicos sin resultados.</li>
          <li>Buscando alternativa natural a medicamentos.</li>
          <li>Necesidad de enfoque holístico.</li>
        </ul>
      )
    },
    {
      question: "¿Qué hace especial al Programa Retreat Recovery?",
      answer: "Diagnóstico profundo, Terapias integrales (Natural + Cuántica), Detox profundo (metales, parásitos), Desinflamación sistémica, Alimentación sanadora y Bienestar emocional."
    },
    {
      question: "Qué está incluido en el Programa Retreat Recovery?",
      answer: (
        <ul className="list-disc pl-4 space-y-1">
          <li>Traslados Aeropuerto - Thera House.</li>
          <li>Alojamiento de lujo en ocupación doble.</li>
          <li>Alimentación y suplementación personalizada.</li>
          <li>Protocolo personalizado de terapias naturales y avanzadas.</li>
          <li>Servicio de Concierge y Limpieza diaria.</li>
          <li><strong>Pre-Retiro:</strong> Coaching remoto, Sesión Cuántica remota, Plan nutricional.</li>
          <li><strong>Post-Retiro:</strong> Terapia remota 30 días, Kit Thera House, Suvenir.</li>
        </ul>
      )
    },
    {
      question: "Porqué Elegir Selah Thera House?",
      answer: "Porque entendemos que cada persona es única. Ofrecemos Biorresonancia, Detox Iónico, Zapper, PEMF, Tesla, y más, todo integrado en un sistema exclusivo para tu bienestar integral."
    }
  ];

  return (
    <div className="font-sans text-stone-800">
      {/* --- HEADER --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo Section */}
            <div className={`flex flex-col items-center transition-all duration-500 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
              <img 
                src="https://i.postimg.cc/jd7SnQJH/ai-generated-8608179-1280-(1).png" 
                alt="Selah Thera House" 
                className={`transition-all duration-500 object-contain ${isScrolled ? 'h-16 w-16 mb-0' : 'h-32 w-32 mb-2'}`}
              />
              <div className="text-center">
                <span className={`block font-bold tracking-widest text-white transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-xl'}`}>
                  SELAH THERA HOUSE
                </span>
                <span className={`block font-light text-brand-light tracking-wider uppercase transition-all duration-300 ${isScrolled ? 'text-[0.6rem]' : 'text-xs'}`}>
                  MEDICINA DEL FUTURO CON RAÍCES ANCESTRALES
                </span>
                 <span className={`block font-medium text-brand-accent tracking-widest uppercase mt-1 transition-all duration-300 ${isScrolled ? 'text-[0.5rem]' : 'text-[0.65rem]'}`}>
                  HEREDIA, COSTA RICA
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('beneficios')} className="text-white hover:text-brand-accent transition-colors font-medium text-base">Beneficios</button>
              <button onClick={() => scrollToSection('servicios')} className="text-white hover:text-brand-accent transition-colors font-medium text-base">El Método</button>
              <button onClick={() => scrollToSection('planes')} className="text-white hover:text-brand-accent transition-colors font-medium text-base">Planes</button>
              <button onClick={() => scrollToSection('blog')} className="text-white hover:text-brand-accent transition-colors font-medium text-base">Blog</button>
              <Button 
                variant="secondary" 
                className="!py-2 !px-6 !text-base shadow-lg shadow-brand-accent/20"
                onClick={() => handleBookingOpen("Valoración Inicial")}
              >
                Agendar Cita
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-dark/95 backdrop-blur-md absolute w-full border-t border-brand-primary/20">
            <div className="px-4 pt-2 pb-6 space-y-4 text-center">
              <button onClick={() => scrollToSection('beneficios')} className="block w-full text-white hover:text-brand-accent py-2 text-lg">Beneficios</button>
              <button onClick={() => scrollToSection('servicios')} className="block w-full text-white hover:text-brand-accent py-2 text-lg">Servicios</button>
              <button onClick={() => scrollToSection('planes')} className="block w-full text-white hover:text-brand-accent py-2 text-lg">Planes</button>
               <button onClick={() => scrollToSection('blog')} className="block w-full text-white hover:text-brand-accent py-2 text-lg">Blog</button>
              <Button fullWidth variant="secondary" onClick={() => handleBookingOpen("Valoración Inicial")}>
                Agendar Cita
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION (REBUILT) --- */}
      <section className="relative min-h-screen flex items-center pt-56 md:pt-72 overflow-hidden bg-brand-dark">
        {/* Background Carousel - CLEANED UP LOGIC */}
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
             {/* Image at 100% Opacity for vividness */}
            <img 
              src={slide.image} 
              alt="Selah Thera House" 
              className="w-full h-full object-cover"
            />
            {/* Separate Gradient Overlay for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          </div>
        ))}

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center gap-12">
          
          <div className="md:w-1/2 space-y-8 animate-fade-in text-center md:text-left">
            {/* Title with Slide Transition - HEIGHT INCREASED TO PREVENT CLIPPING */}
             <div className="h-72 md:h-60 relative overflow-hidden">
                {heroSlides.map((slide, index) => (
                    <h1 
                        key={index}
                        className={`text-4xl md:text-6xl font-extrabold text-white leading-tight absolute top-0 left-0 transition-all duration-700 transform ${
                            index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                    >
                      {slide.title}
                    </h1>
                ))}
             </div>
            
            <p className="text-xl text-brand-beige/90 max-w-lg mx-auto md:mx-0 font-light pt-4">
              Donde la ciencia natural moderna y la sabiduría ancestral se unen para recuperar tu vitalidad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
               <div className="flex flex-col items-center sm:items-start gap-1">
                  <Button 
                    className="shadow-brand-accent/30 min-w-[280px]" 
                    icon 
                    onClick={() => handleBookingOpen("Valoración Inicial")}
                  >
                    Agendar Valoración Gratis
                  </Button>
                  <span className="text-xs text-white italic pl-1">* Cupos limitados por atención personalizada</span>
               </div>
              
              {/* Button "Ver Planes" fixed style: Green Solid -> Hover White */}
              <button 
                  onClick={() => scrollToSection('planes')}
                  className="py-4 px-8 rounded-lg font-bold text-lg min-w-[280px] flex items-center justify-center gap-2 uppercase tracking-wide transition-all duration-300 transform hover:-translate-y-1 shadow-lg bg-brand-dark text-white hover:bg-white hover:text-brand-dark"
              >
                  Ver Planes
              </button>
            </div>
          </div>

          {/* Carousel Controls (Right Side) */}
          <div className="md:w-1/2 flex justify-end">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-right">
                  <div className="flex gap-2 justify-end mb-4">
                      {heroSlides.map((_, idx) => (
                          <button 
                              key={idx}
                              onClick={() => setCurrentSlide(idx)}
                              className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-brand-accent' : 'w-2 bg-white/50'}`}
                          />
                      ))}
                  </div>
                   {/* Quote hidden but present in DOM */}
                  <p className="text-white/80 italic text-sm max-w-xs ml-auto hidden">
                    "Selah Thera House no es solo una clínica, es el lugar donde mi cuerpo recordó cómo sanarse a sí mismo."
                  </p>
              </div>
          </div>

        </div>
      </section>

      {/* --- VIDEO INTRO SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">Nuestra Filosofía</span>
              <h2 className="text-4xl font-bold text-brand-dark leading-tight">Selah Thera House: <br/>Tu Retorno al Equilibrio</h2>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                ¿Sientes que a pesar de tu éxito, tu energía ya no es la misma? 
                El estrés moderno, la fatiga, la inflamación y el dolor crónico no son 'normales'. 
                Son señales de tu cuerpo pidiendo auxilio.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Integramos la sabiduría ancestral de la Medicina Tradicional China, Ayurveda y Árabe (Apiterapia, Fitoterapia, Hidroterapia, Helioterapia, Talasoterapia) con tecnología avanzada y un sistema de alimentación sanadora.
              </p>

              <p className="text-brand-dark font-bold text-xl leading-relaxed border-l-4 border-brand-accent pl-4 py-2 bg-brand-light/10">
                 El resultado: El Método Selah. 100% Natural, 100% Indoloro y sin efectos secundarios.
              </p>

               {/* Medical Disclaimer Note */}
              <div className="mt-6 p-4 bg-brand-beige/30 rounded-lg border border-brand-primary/20 text-sm text-brand-dark/80 italic">
                <div className="flex items-start gap-2">
                   <AlertCircle className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                   <p>Nuestros protocolos tienen fundamento científico y tecnológico, actuando como un poderoso complemento a la medicina tradicional. Sin embargo, no constituyen un diagnóstico médico ni sustituyen las recomendaciones de su médico personal.</p>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => scrollToSection('beneficios')}
                  className="text-brand-accent font-bold hover:text-[#B5952F] flex items-center gap-2 transition-all transform active:scale-95"
                >
                  Conoce nuestra filosofía <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Video Placeholder - UPDATED with Beach Sunset */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
               <img 
                 src="https://images.unsplash.com/photo-1616061039163-56e8894b3764?auto=format&fit=crop&q=80&w=1000" 
                 alt="Atardecer en la Playa Selah Thera House" 
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 flex items-center justify-center z-20">
                 <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-brand-accent ml-1" fill="currentColor" />
                 </div>
               </div>
               <div className="absolute bottom-6 left-6 z-20 text-white">
                 <p className="font-bold text-lg">Descubre el Santuario</p>
                 <p className="text-sm opacity-90">Ver experiencia (1:30)</p>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BENEFITS SECTION --- */}
      <section id="beneficios" className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 relative h-[600px] w-full">
               {/* Mosaic Grid */}
               <div className="grid grid-cols-2 gap-4 h-full">
                  {/* Left Column (Tall) */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                     <img 
                       src="https://i.postimg.cc/bJGj5qBM/digitization-7261158-1280.jpg" 
                       alt="Diagnóstico Digital 4D" 
                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                     />
                     <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white font-bold text-sm uppercase tracking-wider">Diagnóstico 4D</p>
                     </div>
                  </div>
                  
                  {/* Right Column (Stacked) */}
                  <div className="flex flex-col gap-4 h-full">
                     <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src="https://i.postimg.cc/qMzsqSCX/osilador-tesla.jpg" 
                          alt="Tecnología Tesla" 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                           <p className="text-white font-bold text-sm uppercase tracking-wider">Tecnología Tesla</p>
                        </div>
                     </div>
                     <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src="https://i.postimg.cc/Fs6HFnjr/talasoterapia.jpg" 
                          alt="Naturaleza y Mar" 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                           <p className="text-white font-bold text-sm uppercase tracking-wider">Naturaleza</p>
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Floating Badge */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-brand-dark px-6 py-3 rounded-full font-bold shadow-xl border-4 border-brand-dark z-20 whitespace-nowrap">
                  SINERGIA TOTAL
               </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <span className="text-brand-accent font-bold tracking-widest uppercase text-sm">Selah Thera House</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2 leading-tight">
                  Donde la Ciencia y la <br/> Naturaleza convergen
                </h2>
              </div>
              
              <div className="space-y-6 text-gray-300 text-lg">
                <p>
                  No somos un spa convencional ni una clínica fría. <br />
                  Somos un centro de optimización biológica donde cada terapia está respaldada por principios fisiológicos y biofísicos.
                </p>
                <p>
                  Imagina un lugar donde tu cuerpo es escuchado, no solo analizado. Frecuencias Tesla, Bio-resonancia, Plantas Medicinales, Energía del Sol y del Mar en perfecta sincronía con tu organismo, más la atención personalizada y confidencial que mereces.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                    <Zap className="text-brand-accent" /> Seguro y Natural
                  </h4>
                  <p className="text-sm text-gray-400">Tratamientos 100% indoloros, 0% invasivos y sin efectos secundarios negativos.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                    <Activity className="text-brand-accent" /> Tecnología Avanzada
                  </h4>
                  <p className="text-sm text-gray-400">Diseño de protocolos personalizados para la optimización y recuperación de la salud por medio de escaneo 4D y biofrecuencias.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                    <Leaf className="text-brand-accent" /> Energía Vital
                  </h4>
                  <p className="text-sm text-gray-400">Recupera la vitalidad perdida por el estrés y los padecimientos agudos o crónicos.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                    <Shield className="text-brand-accent" /> Sanación Profunda
                  </h4>
                  <p className="text-sm text-gray-400">Encontramos el origen físico y emocional de cada condición y sus síntomas para procurar la sanidad.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SERVICES STEPS --- */}
      <section id="servicios" className="py-24 bg-brand-beige/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-primary font-bold tracking-wider uppercase">Metodología Única</span>
            <h2 className="text-4xl font-bold text-brand-dark mt-2">El Método Selah</h2>
            <p className="text-gray-600 mt-4">Un protocolo integral de 3 pasos diseñado para desbloquear, regenerar y sostener tu salud.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-brand-primary hover:-translate-y-2 transition-transform">
              <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-brand-primary">01</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Diagnóstico de Precisión & Limpieza</h3>
              <p className="text-gray-600 mb-6 text-sm">Descubre el estado real de tus órganos con el Análisis Bioenergético NLS (imprimible) y elimina toxinas y patógenos.</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Escaneo 4D</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Detox Iónico</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Zapper Anti-patógenos</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Fototerapia</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Fitoterapia</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-brand-accent hover:-translate-y-2 transition-transform relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">CORE</div>
              <div className="bg-brand-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-brand-accent">02</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Bio-Optimización Celular</h3>
              <p className="text-gray-600 mb-6 text-sm">Restauramos la vibración celular y la capacidad de autocuración del organismo. No más dolor, no más inflamación.</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Ondas Escalares</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Oscilador Tesla</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Masaje Bioenergético</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Fototerapia Infrarroja</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Terapia PEMF</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-brand-primary hover:-translate-y-2 transition-transform">
              <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-brand-primary">03</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">Consolidación & Estilo de Vida</h3>
              <p className="text-gray-600 mb-6 text-sm">Mantenimiento en casa con planes sugeridos, personalizados e imprimibles para sostener los resultados.</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Terapia Remota Tesla</li>
                 <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Plan de Alimentación Sanadora</li>
                 <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Suplementación Personalizada</li>
                 <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Guía de Hábitos y Ejercicios</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent" /> Helioterapia & Talasoterapia</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION (FIXED TEXTS) --- */}
      <section id="planes" className="py-24 bg-white relative">
         <div className="absolute top-0 left-0 w-full h-1/2 bg-gray-50 skew-y-3 transform -translate-y-20 z-0" />
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold tracking-wider uppercase">Inversión en ti</span>
            <h2 className="text-4xl font-bold text-brand-dark mt-2">Tu Camino a la Sanación</h2>
            <p className="text-gray-600 mt-4">Elige el nivel de profundidad que tu cuerpo necesita hoy.</p>
          </div>

          {/* GROUP 1: CLINICAL PROGRAMS (HEREDIA) */}
          <div className="mb-8 pl-4 border-l-4 border-brand-primary">
             <h3 className="text-2xl font-bold text-brand-dark">Programas Clínicos en Heredia</h3>
             <p className="text-gray-500 text-sm">Atención presencial personalizada en nuestra sede principal.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
             {/* Therapeutic Day Pass */}
             <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">Therapeutic Day Pass</h3>
                <p className="text-sm text-brand-primary font-bold mb-1 uppercase tracking-wider">en Heredia</p>
                <p className="text-gray-600 mb-6 text-sm font-bold">Un día para detener el mundo y escuchar lo que tu cuerpo necesita y dárselo.</p>
                
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-brand-dark">US$77</span>
                  <span className="text-xl text-gray-400 line-through mb-1">US$99</span>
                </div>
                <div className="inline-block bg-brand-light/20 text-brand-dark text-xs font-bold px-2 py-1 rounded mb-6 self-start">
                  Tasa Cero BAC | 0% Interés
                </div>

                <Button fullWidth onClick={() => handleBookingOpen("Therapeutic Day Pass")}>
                  Reservar Cita
                </Button>
                
                <div className="mt-8 space-y-4 text-sm text-gray-600 flex-grow">
                   <div>
                     <p className="font-bold text-brand-dark mb-1">Ideal para:</p>
                     <p className="text-xs">Personas sanas, Ejecutivos, Empresarios, con gran demanda de energía y alto nivel de estrés que requieren recarga rápida y claridad mental.</p>
                   </div>
                   <div>
                     <p className="font-bold text-brand-dark mb-1">Objetivo:</p>
                     <p>Desbloqueo energético inmediato y recarga mitocondrial.</p>
                   </div>
                   <div>
                     <p className="font-bold text-brand-dark mb-1">Duración:</p>
                     <p>3 horas terapéuticas</p>
                   </div>
                   <div>
                     <p className="font-bold text-brand-dark mb-1">Incluye:</p>
                     <ul className="space-y-2 mt-2">
                         <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> Terapias Naturales y Tecnológicas combinadas</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Bebida alcalina, ionizante</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Suplementación durante la terapia</li>
                     </ul>
                   </div>
                </div>
                 <div className="bg-brand-dark/90 text-white p-4 rounded-lg mt-6 text-center italic text-sm">
                  "El reset que tu cuerpo pide, en el tiempo que tu agenda permite."
                </div>
            </div>

            {/* Recovery Program */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-brand-primary/20 hover:shadow-xl transition-shadow relative flex flex-col h-full">
                <div className="absolute top-0 right-0 bg-brand-primary text-white text-xs font-bold px-4 py-1 rounded-bl-lg">MÁS POPULAR</div>
                <h3 className="text-2xl font-bold text-brand-dark mb-2">Programa Recovery</h3>
                <p className="text-sm text-brand-primary font-bold mb-1 uppercase tracking-wider">10 Sesiones en Heredia</p>
                <p className="text-gray-600 mb-6 text-sm font-bold">Transformación Total de Condiciones Agudas a Alto Desempeño</p>
                
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-brand-dark">US$770</span>
                  <span className="text-xl text-gray-400 line-through mb-1">US$950</span>
                </div>
                 <div className="inline-block bg-brand-light/20 text-brand-dark text-xs font-bold px-2 py-1 rounded mb-6 self-start">
                  Tasa Cero BAC | 0% Interés
                </div>

                <Button variant="secondary" fullWidth onClick={() => setIsRecoveryFormOpen(true)}>
                  APLICAR AL PROGRAMA
                </Button>

                <div className="mt-8 space-y-4 text-sm text-gray-600 flex-grow">
                   <div>
                     <p className="font-bold text-brand-dark mb-1">Ideal para:</p>
                     <p className="text-xs">Personas con problemas de salud agudos, dolor específico (espalda, migraña), inflamación, problemas digestivos; que buscan evitar fármacos.</p>
                   </div>
                   <div>
                     <p className="font-bold text-brand-dark mb-1">Objetivo:</p>
                     <p>Apagar el "incendio" inflamatorio, eliminar patógenos y aliviar dolor.</p>
                   </div>
                   <div>
                     <p className="font-bold text-brand-dark mb-1">Duración:</p>
                     <p>10 Sesiones de 3 horas terapéuticas, 2 o 3 veces por semana.</p>
                   </div>
                   <div>
                     <p className="font-bold text-brand-dark mb-1">Incluye:</p>
                     <ul className="space-y-2 mt-2">
                         <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> 10 Sesiones Terapéuticas Completas</li>
                         <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> Protocolo Completo (NLS, Detox, Zapper, Luz)</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Bebida alcalina, ionizante</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Suplementación durante la terapia</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Guía de Hábitos y Ritmos Circadianos</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Plan de Alimentación Sanadora en casa</li>
                     </ul>
                   </div>
                </div>
                 <div className="bg-brand-primary/10 text-brand-dark p-4 rounded-lg mt-6 text-center italic text-sm font-medium">
                  "Vuelve a ser tú mismo, sin dolor y sin fármacos."
                </div>
            </div>
          </div>

          {/* GROUP 2: IMMERSION RETREATS (PLAYA) */}
          <div className="mb-8 pl-4 border-l-4 border-brand-accent">
             <h3 className="text-2xl font-bold text-brand-dark">Retiros de Salud en Playa Nosara</h3>
             <p className="text-gray-500 text-sm">Experiencias inmersivas de transformación total.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             {/* Retreat Intensive 10 Days */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">Retreat Intensive</h3>
                <p className="text-sm text-brand-primary font-bold mb-1 uppercase tracking-wider">10 Días en Playa Nosara</p>
                <p className="text-gray-600 mb-6 text-sm font-bold">Bootcamp de Salud - 10 días de Terapia Intensiva sin pausa</p>
                
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-brand-dark">US$4,250</span>
                  <span className="text-xl text-gray-400 line-through mb-1">US$5,500</span>
                </div>
                <div className="inline-block bg-brand-light/20 text-brand-dark text-xs font-bold px-2 py-1 rounded mb-6 self-start">
                  Tasa Cero BAC | 0% Interés
                </div>

                <Button variant="secondary" fullWidth onClick={() => setIsIntensiveFormOpen(true)}>
                  APLICAR AL PROGRAMA
                </Button>

                <div className="mt-8 space-y-4 text-sm text-gray-600 flex-grow">
                   <div>
                     <p className="font-bold text-brand-dark mb-1">Ideal para ti si:</p>
                     <ul className="list-disc pl-4 space-y-1 text-xs">
                       <li>Eres Ejecutivo con tiempo limitado.</li>
                       <li>Estás en Post-Operatorio o Crisis de Estrés Agudo.</li>
                     </ul>
                  </div>
                  <div>
                     <p className="font-bold text-brand-dark mb-1">Objetivo:</p>
                     <p>Lograr un reseteo metabólico y energético profundo mediante la inmersión continua en terapias de alta tecnología.</p>
                  </div>
                  <div>
                     <p className="font-bold text-brand-dark mb-1">Estrategia:</p>
                     <p>"Protocolos de carga y limpieza simultánea para maximizar el tiempo."</p>
                  </div>
                  <div>
                     <p className="font-bold text-brand-dark mb-1">Duración:</p>
                     <p>11 Días / 10 noches.</p>
                  </div>
                  <div>
                     <p className="font-bold text-brand-dark mb-1">Incluye:</p>
                     <ul className="space-y-2 mt-2">
                         <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> Programa nutricional antiinflamatorio sugerido: 5 días de preparación (en casa) previo a su llegada</li>
                         <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> 10 días de Terapias Naturales y Tecnológicas</li>
                         <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> Hospedaje de Lujo en Ocupación Doble</li>
                         <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> Alimentación Sanadora + Suplementación</li>
                         <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> Tour de 1 día</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Transporte Aeropuerto - Selah - Aeropuerto</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Guía de Hábitos y Ritmos Circadianos</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Plan de Alimentación Sanadora en casa</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Precio Especial para acompañantes</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Tarjeta de Regalo</li>
                     </ul>
                  </div>
                </div>
                <p className="text-brand-accent font-bold italic pt-6 text-center mt-auto">"Máxima potencia terapéutica en tiempo récord."</p>
            </div>

            {/* Retreat Recovery 21 Days */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-brand-accent/30 hover:shadow-xl transition-shadow relative flex flex-col h-full">
                <div className="absolute top-0 right-0 bg-brand-accent text-white text-xs font-bold px-4 py-1 rounded-bl-lg">EXPERIENCIA COMPLETA</div>
                <h3 className="text-2xl font-bold text-brand-dark mb-2">Retreat Recovery</h3>
                <p className="text-sm text-brand-primary font-bold mb-1 uppercase tracking-wider">21 Días en Playa Nosara</p>
                <p className="text-gray-600 mb-6 text-sm font-bold">Experiencia Todo Incluido - 21 días de Inmersión Total</p>
                
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-brand-dark">US$7,875</span>
                  <span className="text-xl text-gray-400 line-through mb-1">US$10,237</span>
                </div>
                <div className="inline-block bg-brand-light/20 text-brand-dark text-xs font-bold px-2 py-1 rounded mb-6 self-start">
                  Tasa Cero BAC | 0% Interés
                </div>

                <Button variant="secondary" fullWidth onClick={() => setIsLeadFormOpen(true)}>
                  APLICAR AL PROGRAMA
                </Button>

                <div className="mt-8 space-y-4 text-sm text-gray-600 flex-grow">
                   <div>
                     <p className="font-bold text-brand-dark mb-1">Ideal para ti si:</p>
                     <ul className="list-disc pl-4 space-y-1 text-xs">
                       <li>Tienes enfermedad crónica, autoinmune o fatiga adrenal.</li>
                       <li>Eres sobreviviente de cáncer o post-quirúrgico.</li>
                       <li>Sistema colapsado, buscando alternativa natural.</li>
                     </ul>
                  </div>
                  <div>
                     <p className="font-bold text-brand-dark mb-1">Objetivo:</p>
                     <p>Reprogramación celular total pasando de "sobrevivir" a "plenitud".</p>
                  </div>
                  <div>
                     <p className="font-bold text-brand-dark mb-1">Estrategia:</p>
                     <p>"Biological Reset" (3 Ciclos de 7 días)</p>
                  </div>
                  <div>
                     <p className="font-bold text-brand-dark mb-1">Duración:</p>
                     <p>21 Días (Inmersivo).</p>
                  </div>
                  <div>
                     <p className="font-bold text-brand-dark mb-1">Incluye:</p>
                     <ul className="space-y-2 mt-2">
                         <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> Programa nutricional antiinflamatorio sugerido: 10 días de preparación (en casa) previo a su llegada</li>
                         <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> 20 días de Terapias Naturales + Tecnológicas</li>
                         <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> Hospedaje de Lujo en Ocupación Doble</li>
                         <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> Alimentación Sanadora + Suplementación</li>
                         <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> Tour de 1 día</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Transporte Aeropuerto - Selah - Aeropuerto</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Servicio diario de limpieza, lavado y planchado</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> 2 Terapias Remotas Tesla</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Programa de Alimentación 30 días posteriores</li>
                         <li className="flex items-start gap-2"><Gift className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" /> <span className="font-bold text-brand-accent">Bono:</span> Precio Especial acompañantes</li>
                     </ul>
                  </div>
                </div>
                <p className="text-brand-accent font-bold italic pt-6 text-center mt-auto">"La metamorfosis biológica que cambia tu vida para siempre."</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-20 bg-brand-beige/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark">Preguntas Frecuentes</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left font-bold text-brand-dark flex justify-between items-center hover:bg-gray-50"
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  {faq.question}
                  {activeAccordion === index ? <div className="text-brand-accent">-</div> : <div className="text-brand-primary">+</div>}
                </button>
                {activeAccordion === index && (
                  <div className="px-6 py-4 text-gray-600 border-t border-gray-100 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="testimonios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold tracking-wider uppercase">Historias Reales</span>
            <h2 className="text-4xl font-bold text-brand-dark mt-2">Transformación de Vida</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos M.",
                role: "Director Ejecutivo",
                text: "Llegué con fatiga crónica y migrañas diarias. En solo 10 sesiones recuperé la claridad mental y la energía que tenía hace 20 años. El equipo es de otro mundo.",
                img: "https://i.pravatar.cc/150?img=11"
              },
              {
                name: "Ana S.",
                role: "Arquitecta",
                text: "Había probado todo para mi dolor de espalda. La combinación de PEMF y Detox fue mágica. Lo mejor es que no tuve que tomar ni una pastilla.",
                img: "https://i.pravatar.cc/150?img=5"
              },
              {
                name: "Roberto L.",
                role: "Empresario",
                text: "El retiro de 21 días me salvó. Estaba al borde del colapso por estrés. Regresé renovado, con nuevos hábitos y una paz mental que no tiene precio.",
                img: "https://i.pravatar.cc/150?img=3"
              }
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl relative">
                <Quote className="absolute top-6 right-6 text-brand-accent/20 w-10 h-10" />
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full border-2 border-brand-accent" />
                  <div>
                    <h4 className="font-bold text-brand-dark">{t.name}</h4>
                    <p className="text-xs text-brand-primary uppercase">{t.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-4">★★★★★</div>
                <p className="text-gray-600 italic text-sm">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BLOG SECTION --- */}
      <section id="blog" className="py-24 bg-brand-dark text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-brand-accent font-bold tracking-wider uppercase flex items-center gap-2">
                <BookOpen size={18} /> Blog de Bienestar
              </span>
              <h2 className="text-4xl font-bold mt-2">Ciencia para tu Salud</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(showAllPosts ? blogPosts : blogPosts.slice(0, 3)).map((post) => (
              <div 
                key={post.id} 
                className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-brand-accent/50 transition-all group cursor-pointer"
                onClick={() => setSelectedArticle(post)}
              >
                <div className="h-48 overflow-hidden relative">
                   <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <span className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-2 block">{post.category}</span>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-accent transition-colors">{post.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
                  <button className="mt-4 text-sm font-bold underline decoration-brand-accent underline-offset-4">Leer artículo completo</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              className="!border-white !text-white hover:!bg-white hover:!text-brand-dark"
              onClick={() => setShowAllPosts(!showAllPosts)}
            >
              {showAllPosts ? "Ver menos artículos" : "Ver todos los artículos"}
            </Button>
          </div>
        </div>
      </section>

      {/* --- LEAD MAGNET (FREE GUIDE) --- */}
      {isLeadMagnetOpen && (
        <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-dark text-white">
           <div className="max-w-4xl mx-auto px-4 text-center">
             {!isLeadSubmitted ? (
               <>
                 <div className="relative">
                   <button 
                     onClick={() => setIsLeadMagnetOpen(false)}
                     className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 text-white/50 hover:text-white"
                   >
                     <X size={24} />
                   </button>
                   <div className="inline-block p-3 bg-white/10 rounded-full mb-6">
                     <Gift size={32} className="text-brand-accent" />
                   </div>
                   <h2 className="text-3xl font-bold mb-4">Regalo de Bienvenida</h2>
                   <p className="text-lg text-brand-beige mb-8">Descarga GRATIS nuestra "Guía de Alimentación Anti-inflamatoria" y empieza a sanar desde tu cocina hoy mismo.</p>
                   
                   <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm max-w-lg mx-auto mb-8 text-left">
                      <p className="font-bold text-brand-accent mb-2 uppercase text-sm tracking-wider">Lo que encontrarás dentro:</p>
                      <ul className="space-y-2 text-sm text-gray-200">
                         <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent"/> Lista de alimentos recomendados</li>
                         <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent"/> Lista de alimentos prohibidos</li>
                         <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent"/> Recetas de batidos sanadores</li>
                         <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-accent"/> Plan de 3 días detox</li>
                      </ul>
                   </div>

                   <form onSubmit={handleMagnetSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                     <input 
                       type="email" 
                       placeholder="Tu correo electrónico" 
                       required
                       className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-accent w-full"
                       value={leadEmail}
                       onChange={(e) => setLeadEmail(e.target.value)}
                     />
                     <Button variant="secondary" type="submit" className="whitespace-nowrap">
                       Descargar Guía
                     </Button>
                   </form>
                   <p className="text-xs text-white/50 mt-4">Respetamos tu privacidad. Cero SPAM.</p>
                 </div>
               </>
             ) : (
                <div className="animate-fade-in bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-brand-accent/30 relative">
                  <button 
                     onClick={() => setIsLeadMagnetOpen(false)}
                     className="absolute top-4 right-4 text-white/50 hover:text-white"
                   >
                     <X size={24} />
                   </button>
                  <CheckCircle size={48} className="text-brand-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">¡Suscripción Exitosa!</h3>
                  <p className="text-brand-beige mb-6">La guía ha sido enviada a tu correo. También puedes abrirla ahora mismo.</p>
                  <Button variant="secondary" onClick={() => setIsGuideOpen(true)}>
                    ABRIR GUÍA DIGITAL
                  </Button>
                </div>
             )}
           </div>
        </section>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-stone-900 text-stone-400 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
            
            {/* Brand & Pyme Logo */}
            <div className="flex flex-col items-center justify-center">
               <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                 <h3 className="text-white text-xl font-bold tracking-wider">SELAH THERA HOUSE</h3>
                 <div className="bg-white p-1 rounded-md shadow-lg">
                    <img 
                      src="https://i.postimg.cc/CKk7Q0PQ/logo-pymes.png" 
                      alt="Sello Pyme" 
                      className="h-20 w-auto object-contain" 
                    />
                 </div>
              </div>
              <p className="text-sm leading-relaxed max-w-xs mx-auto text-center">
                Fundado con la visión de ofrecer un refugio para la salud en medio del caos moderno. 
                Especialistas en terapias naturales y medicina bioenergética. 
                Ayudamos a las personas a recuperar su salud sin procedimientos invasivos y sin los efectos secundarios de los fármacos.
              </p>
            </div>

            {/* Director Profile */}
            <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0">
               <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-accent mb-4">
                  <img 
                    src="https://i.postimg.cc/MK20MN9K/augusto-cesar-romero.jpg" 
                    alt="Augusto César Romero" 
                    className="w-full h-full object-cover"
                  />
               </div>
               <h4 className="text-white font-bold text-lg">Augusto César Romero</h4>
               <p className="text-brand-accent text-sm uppercase tracking-wider font-medium">Director & Fundador</p>
               <p className="text-xs mt-1">Naturópata - Coach de Salud y Bienestar</p>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0">
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contacto</h4>
              <ul className="space-y-3 text-sm flex flex-col items-center">
                <li className="flex items-center gap-2 justify-center">
                   <MapPin size={16} className="text-brand-accent" /> Heredia, Costa Rica
                </li>
                <li className="flex items-center gap-2 justify-center">
                   <Calendar size={16} className="text-brand-accent" /> Lunes a Viernes
                </li>
              </ul>
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="!py-2 !px-4 !text-sm !border-brand-accent !text-brand-accent hover:!bg-brand-accent hover:!text-stone-900"
                  onClick={() => setIsContactFormOpen(true)}
                >
                  <MessageCircle size={16} className="mr-2" /> Escríbenos
                </Button>
              </div>
              
              {/* Social Icons */}
              <div className="flex gap-4 mt-8 justify-center">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><TikTokIcon className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube size={20} /></a>
              </div>
            </div>

          </div>
          
          <div className="border-t border-white/5 mt-12 pt-8 text-center text-xs text-white/60 flex flex-col sm:flex-row justify-center gap-4">
            <p>&copy; {new Date().getFullYear()} Selah Thera House. Todos los derechos reservados.</p>
            <div className="flex gap-4 justify-center">
               <button onClick={() => setIsLegalOpen('privacy')} className="hover:text-white transition-colors">Política de Privacidad</button>
               <button onClick={() => setIsLegalOpen('terms')} className="hover:text-white transition-colors">Términos de Uso</button>
               <button onClick={() => setIsLegalOpen('medical')} className="hover:text-white transition-colors">Descargo Médico</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals render below */}
      {/* 1. Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setIsVideoOpen(false)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <button className="absolute top-4 right-4 text-white hover:text-brand-accent z-10" onClick={() => setIsVideoOpen(false)}>
               <X size={32} />
            </button>
            <video 
              src="https://videos.pexels.com/video-files/3209048/3209048-hd_1920_1080_25fps.mp4" 
              controls 
              autoPlay 
              className="w-full h-full object-cover"
              playsInline
              preload="auto"
            >
               Tu navegador no soporta el tag de video.
            </video>
          </div>
        </div>
      )}

      {/* 2. Blog Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm" onClick={() => setSelectedArticle(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
             <button 
               className="absolute top-4 right-4 bg-white/50 hover:bg-white rounded-full p-2 text-gray-800 transition-all z-10"
               onClick={() => setSelectedArticle(null)}
             >
               <X size={24} />
             </button>
             
             <div className="h-64 sm:h-80 relative">
               <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                  <div>
                    <span className="bg-brand-accent text-brand-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                      {selectedArticle.category}
                    </span>
                    <h2 className="text-3xl font-bold text-white leading-tight">{selectedArticle.title}</h2>
                  </div>
               </div>
             </div>
             
             <div className="p-8 sm:p-12">
               <div className="prose prose-stone max-w-none text-gray-600 leading-relaxed text-lg">
                 {selectedArticle.content}
               </div>
               
               {/* Contextual CTA Box */}
               <div className="mt-12 p-6 bg-brand-light/10 rounded-xl border border-brand-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                 <div>
                   <h4 className="font-bold text-brand-dark text-lg mb-1">¿Te interesa esta terapia?</h4>
                   <p className="text-sm text-gray-500">Agenda una sesión hoy mismo y experimenta los beneficios.</p>
                 </div>
                 {selectedArticle.ctaText && selectedArticle.ctaAction && (
                   <Button onClick={() => {
                     selectedArticle.ctaAction!();
                     setSelectedArticle(null);
                   }}>
                     {selectedArticle.ctaText}
                   </Button>
                 )}
               </div>
             </div>
          </div>
        </div>
      )}

      {/* 3. Booking Modal (Unified for Day Pass & Assessment) */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative border-t-4 border-brand-primary">
            <button 
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-brand-dark mb-2">Reserva tu Cita</h3>
            <p className="text-gray-500 mb-6 text-sm">Selecciona el servicio y la fecha que prefieres.</p>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Servicio</label>
                <select 
                   name="service" 
                   className="w-full p-3 bg-stone-100 rounded-lg text-brand-dark border-none focus:ring-2 focus:ring-brand-primary font-medium"
                   defaultValue={preselectedService}
                >
                  <option value="Valoración Inicial">Valoración Inicial (Gratis)</option>
                  <option value="Therapeutic Day Pass">Therapeutic Day Pass ($77)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Fecha Preferida</label>
                <input 
                  type="date" 
                  name="date"
                  required 
                  className="w-full p-3 bg-stone-800 rounded-lg text-white border-none focus:ring-2 focus:ring-brand-primary [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Hora Preferida</label>
                <input 
                  type="time" 
                  name="time"
                  required 
                  className="w-full p-3 bg-stone-800 rounded-lg text-white border-none focus:ring-2 focus:ring-brand-primary [color-scheme:dark]"
                />
              </div>
              <Button fullWidth type="submit" className="mt-2">
                 Solicitar Confirmación
              </Button>
              <p className="text-xs text-center text-gray-400 mt-3">
                Te confirmaremos la disponibilidad exacta por WhatsApp.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* 4. Recovery Program Application Modal */}
      {isRecoveryFormOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative border-t-4 border-brand-accent">
            <button 
              onClick={() => setIsRecoveryFormOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-brand-dark mb-2">Aplicar a Recovery</h3>
            <p className="text-gray-500 mb-6 text-sm">Programa de 10 sesiones para recuperación profunda.</p>
            
            <form onSubmit={handleRecoverySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Tu nombre"
                  required 
                  className="w-full p-3 bg-stone-100 rounded-lg text-brand-dark border-none focus:ring-2 focus:ring-brand-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Fecha de Inicio Deseada</label>
                <input 
                  type="date" 
                  name="date"
                  required 
                  className="w-full p-3 bg-stone-800 rounded-lg text-white border-none focus:ring-2 focus:ring-brand-accent [color-scheme:dark]"
                />
              </div>
               <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Hora Preferida</label>
                <input 
                  type="time" 
                  name="time"
                  required 
                  className="w-full p-3 bg-stone-800 rounded-lg text-white border-none focus:ring-2 focus:ring-brand-accent [color-scheme:dark]"
                />
              </div>
              <Button variant="secondary" fullWidth type="submit" className="mt-2">
                 Enviar Solicitud
              </Button>
            </form>
          </div>
        </div>
      )}

       {/* 5. Contact Form Modal */}
       {isContactFormOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
            <button 
              onClick={() => setIsContactFormOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-brand-dark mb-2">Contáctanos</h3>
            <p className="text-gray-500 mb-6 text-sm">Envíanos tu consulta y te responderemos a la brevedad.</p>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre</label>
                <input type="text" name="name" required className="w-full p-3 bg-stone-100 rounded-lg text-brand-dark" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
                <input type="email" name="email" required className="w-full p-3 bg-stone-100 rounded-lg text-brand-dark" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Mensaje / Asunto</label>
                <input type="text" name="subject" required className="w-full p-3 bg-stone-100 rounded-lg text-brand-dark" />
              </div>
              <Button variant="outline" fullWidth type="submit" className="mt-2">
                 Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* 6. Lead Gen Form (High Ticket Retreats) */}
      {(isIntensiveFormOpen || isLeadFormOpen) && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative border-t-4 border-brand-accent overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => { setIsIntensiveFormOpen(false); setIsLeadFormOpen(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-brand-dark mb-2">
              {isIntensiveFormOpen ? 'Postulación Retreat Intensive' : 'Postulación Retreat Recovery'}
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Debido a la alta demanda y personalización, requerimos conocer tu caso para asegurar que el programa es adecuado para ti.
            </p>
            
            <form onSubmit={(e) => handleLeadSubmit(e, isIntensiveFormOpen ? 'Intensive' : 'Recovery')} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
                <input type="text" name="name" required className="w-full p-3 bg-stone-100 rounded-lg text-brand-dark focus:ring-2 focus:ring-brand-accent outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Fecha Ideal de Viaje</label>
                    <input type="month" name="date" required className="w-full p-3 bg-stone-100 rounded-lg text-brand-dark outline-none" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Acompañantes</label>
                    <select name="companion" className="w-full p-3 bg-stone-100 rounded-lg text-brand-dark outline-none">
                       <option value="Solo/a">Viajo Solo/a</option>
                       <option value="Con Acompañante">Con Acompañante</option>
                    </select>
                 </div>
              </div>

               <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Atención Terapéutica</label>
                <select name="therapy" className="w-full p-3 bg-stone-100 rounded-lg text-brand-dark outline-none">
                   <option value="Solo Yo">Solo para mí</option>
                   <option value="Ambos">Para ambos (Acompañante también)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Principal Desafío de Salud</label>
                <textarea 
                  name="symptom" 
                  rows={3}
                  placeholder="Ej: Dolor lumbar crónico, Fatiga extrema, Post-operatorio..."
                  required 
                  className="w-full p-3 bg-stone-100 rounded-lg text-brand-dark focus:ring-2 focus:ring-brand-accent outline-none resize-none"
                />
              </div>

              <div className="bg-brand-light/20 p-4 rounded-lg text-xs text-brand-dark/80">
                 <p className="font-bold mb-1">Confidencialidad Médica:</p>
                 <p>Esta información será revisada únicamente por el Director Clínico para evaluar tu candidatura.</p>
              </div>
              
              <Button variant="secondary" fullWidth type="submit" className="mt-2">
                 Enviar Postulación
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* 7. Anti-inflammatory Guide Modal */}
      {isGuideOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsGuideOpen(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full h-[90vh] overflow-y-auto relative shadow-2xl" onClick={e => e.stopPropagation()}>
             <button className="absolute top-6 right-6 text-gray-400 hover:text-brand-dark z-20" onClick={() => setIsGuideOpen(false)}>
               <X size={32} />
             </button>

             {/* Header */}
             <div className="bg-brand-dark text-white p-12 text-center relative overflow-hidden">
                <div className="relative z-10">
                   <img 
                    src="https://i.postimg.cc/jd7SnQJH/ai-generated-8608179-1280-(1).png" 
                    alt="Logo" 
                    className="h-16 w-16 object-contain mx-auto mb-4 brightness-0 invert opacity-80"
                   />
                   <span className="text-brand-accent uppercase tracking-widest text-xs font-bold">Recurso Exclusivo Selah Thera House</span>
                   <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-2">Guía de Alimentación <br/> Anti-inflamatoria</h2>
                   <p className="text-brand-light/80 text-lg">La base química para sanar tu cuerpo desde adentro.</p>
                </div>
             </div>

             <div className="p-8 md:p-12 space-y-12">
                
                {/* Introduction */}
                <div className="prose prose-stone max-w-none">
                   <p className="text-xl text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
                     "La inflamación es la raíz de casi todas las enfermedades crónicas. Antes de curar, debemos dejar de herir. Esta guía no es una dieta, es un protocolo de reparación."
                   </p>
                </div>

                {/* The Lists */}
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
                      <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
                         <CheckCircle className="text-green-600" /> Alimentos Sanadores
                      </h3>
                      <ul className="space-y-3 text-green-900">
                         <li><strong>Grasas Buenas:</strong> Aguacate, Aceite de Oliva Extra Virgen, Aceite de Coco.</li>
                         <li><strong>Pescados Azules:</strong> Salmón salvaje, Sardinas (Omega 3).</li>
                         <li><strong>Vegetales Crucíferos:</strong> Brócoli, Coliflor, Kale (Sulforafano).</li>
                         <li><strong>Especias Medicina:</strong> Cúrcuma, Jengibre, Orégano.</li>
                         <li><strong>Frutos Rojos:</strong> Arándanos, Moras (Bajo índice glucémico).</li>
                         <li><strong>Fermentados:</strong> Chucrut, Kimchi, Kéfir (Probióticos).</li>
                      </ul>
                   </div>

                   <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                      <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-2">
                         <X className="text-red-600" /> Alimentos Inflamatorios
                      </h3>
                      <ul className="space-y-3 text-red-900">
                         <li><strong>Azúcar Refinada:</strong> El combustible del cáncer y la inflamación.</li>
                         <li><strong>Aceites Vegetales:</strong> Soya, Maíz, Girasol, Canola (Omega 6 pro-inflamatorio).</li>
                         <li><strong>Gluten Moderno:</strong> Pan blanco, pastas, galletas.</li>
                         <li><strong>Lácteos Pasteurizados:</strong> Leche comercial (caseína inflamatoria).</li>
                         <li><strong>Procesados:</strong> Todo lo que tenga más de 5 ingredientes en la etiqueta.</li>
                      </ul>
                   </div>
                </div>

                {/* Recipes */}
                <div>
                   <h3 className="text-2xl font-bold text-brand-dark mb-6 text-center">Batido Verde Sanador Selah</h3>
                   <div className="bg-brand-beige/20 p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=600" 
                        alt="Smoothie" 
                        className="w-full md:w-1/3 rounded-xl shadow-lg object-cover h-64"
                      />
                      <div className="flex-1">
                         <h4 className="font-bold text-lg mb-4">Ingredientes:</h4>
                         <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-6">
                            <li>• 1 taza Agua de Coco</li>
                            <li>• 2 tallos de Apio</li>
                            <li>• 1/2 Pepino</li>
                            <li>• 1 puñado Espinaca</li>
                            <li>• 1 trozo Jengibre</li>
                            <li>• 1/2 Manzana Verde</li>
                            <li>• 1/4 Aguacate</li>
                            <li>• Jugo de 1/2 Limón</li>
                         </ul>
                         <p className="text-sm italic text-gray-500 bg-white p-4 rounded-lg border border-gray-200">
                            <strong>Tip Selah:</strong> Tómalo inmediatamente después de prepararlo. Idealmente después de tu sesión de PEMF para máxima absorción celular.
                         </p>
                      </div>
                   </div>
                </div>

                 {/* 3 Day Plan */}
                 <div className="border-t border-gray-200 pt-12">
                    <h3 className="text-2xl font-bold text-brand-dark mb-8 text-center">Plan Detox de 3 Días (Reset Rápido)</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                       {[1, 2, 3].map(day => (
                          <div key={day} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                             <div className="text-brand-accent font-bold text-sm uppercase mb-2">Día {day}</div>
                             <div className="space-y-4 text-sm">
                                <div><span className="font-bold block">Desayuno:</span> Batido Verde Sanador.</div>
                                <div><span className="font-bold block">Almuerzo:</span> Ensalada gigante con salmón/pollo y mucho aceite de oliva.</div>
                                <div><span className="font-bold block">Cena:</span> Caldo de huesos o crema de vegetales (sin lácteos).</div>
                                <div className="text-xs text-gray-400 mt-2">* Beber 2.5 litros de agua al día.</div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* CTAs */}
                 <div className="bg-brand-dark text-white p-8 rounded-2xl text-center space-y-6">
                    <h3 className="text-2xl font-bold">¿Listo para llevar esto al siguiente nivel?</h3>
                    <p className="text-brand-light">La alimentación es el 50%. La tecnología es el otro 50%. Ven a Selah y acelera tu recuperación.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                       <Button variant="secondary" onClick={() => { setIsGuideOpen(false); handleBookingOpen("Therapeutic Day Pass"); }}>
                          Reservar Day Pass ($77)
                       </Button>
                       <Button variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-brand-dark" onClick={() => { setIsGuideOpen(false); setIsRecoveryFormOpen(true); }}>
                          Aplicar a Recovery
                       </Button>
                    </div>
                 </div>

             </div>
          </div>
        </div>
      )}

      {/* 8. Legal Modals */}
      {isLegalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsLegalOpen(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={() => setIsLegalOpen(null)}>
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-brand-dark mb-6">
              {isLegalOpen === 'privacy' && 'Política de Privacidad'}
              {isLegalOpen === 'terms' && 'Términos de Uso'}
              {isLegalOpen === 'medical' && 'Descargo Médico'}
            </h3>
            <div className="prose prose-sm prose-stone text-gray-600">
               {isLegalOpen === 'privacy' && (
                 <p>En Selah Thera House, nos tomamos muy en serio su privacidad. Toda la información médica y personal compartida a través de nuestros formularios o consultas es estrictamente confidencial y se utiliza únicamente para fines de evaluación terapéutica. No compartimos sus datos con terceros bajo ninguna circunstancia.</p>
               )}
               {isLegalOpen === 'terms' && (
                 <p>Al reservar nuestros servicios, usted acepta cumplir con los horarios establecidos. Las cancelaciones deben realizarse con al menos 24 horas de antelación. Nos reservamos el derecho de admisión para garantizar un ambiente de paz y respeto para todos nuestros pacientes.</p>
               )}
               {isLegalOpen === 'medical' && (
                 <p>La información y terapias ofrecidas por Selah Thera House tienen fines de bienestar y optimización biológica. No sustituyen el consejo, diagnóstico o tratamiento médico profesional. Siempre busque el consejo de su médico u otro proveedor de salud calificado ante cualquier duda sobre una condición médica.</p>
               )}
            </div>
          </div>
        </div>
      )}

      {/* AI Chatbot Component */}
      <SelahAssistant />

    </div>
  );
}

export default App;
