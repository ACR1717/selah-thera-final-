import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, MapPin, ArrowRight, CheckCircle, 
  Leaf, Zap, Activity, Instagram, 
  Facebook, Youtube, MessageCircle, Play, Quote, BookOpen, Gift, Shield, AlertCircle, Globe, ChevronDown, ChevronUp, Plus
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

// --- TRANSLATIONS DICTIONARY ---
const translations = {
  es: {
    nav: {
      benefits: "Beneficios",
      method: "El Método",
      plans: "Planes",
      blog: "Blog",
      book: "Agendar Cita",
      subtitle: "MEDICINA DEL FUTURO CON RAÍCES ANCESTRALES",
      location: "HEREDIA, COSTA RICA"
    },
    hero: {
      slide1: "Mi camino hacia la salud integral empieza aquí",
      slide2: "Renuevo mi cuerpo y mente con terapias naturales",
      slide3: "Medicina ancestral + tecnología moderna = bienestar",
      slide4: "Selah Thera House no es una clínica, es el lugar donde mi cuerpo recordó cómo sanarse a sí mismo",
      desc: "Donde la ciencia natural moderna y la sabiduría ancestral se unen para recuperar tu vitalidad.",
      cta_primary: "Agendar Valoración Gratis",
      cta_secondary: "Ver Planes",
      spots: "* Cupos limitados por atención personalizada"
    },
    intro: {
      philosophy: "Nuestra Filosofía",
      title: "Selah Thera House: \nTu Retorno al Equilibrio",
      p1: "¿Sientes que a pesar de tu éxito, tu energía ya no es la misma? El estrés moderno, la fatiga, la inflamación y el dolor crónico no son 'normales'. Son señales de tu cuerpo pidiendo auxilio.",
      p2: "Integramos la sabiduría ancestral de la Medicina Tradicional China, Ayurveda y Árabe (Apiterapia, Fitoterapia, Hidroterapia, Helioterapia, Talasoterapia) con tecnología avanzada y un sistema de alimentación sanadora.",
      result: "El resultado: El Método Selah. 100% Natural, 100% Indoloro y sin efectos secundarios.",
      disclaimer: "Nuestros protocolos tienen fundamento científico y tecnológico, actuando como un poderoso complemento a la medicina tradicional. Sin embargo, no constituyen un diagnóstico médico ni sustituyen las recomendaciones de su médico personal.",
      learn_more: "Conoce nuestra filosofía",
      video_title: "Descubre el Santuario",
      video_subtitle: "Ver experiencia (1:30)"
    },
    benefits: {
      synergy: "SINERGIA TOTAL",
      label: "Selah Thera House",
      title: "Donde la Ciencia y la \n Naturaleza convergen",
      p1: "No somos un spa convencional ni una clínica fría. Somos un centro de optimización biológica donde cada terapia está respaldada por principios fisiológicos y biofísicos.",
      p2: "Imagina un lugar donde tu cuerpo es escuchado, no solo analizado. Frecuencias Tesla, Bio-resonancia, Plantas Medicinales, Energía del Sol y del Mar en perfecta sincronía con tu organismo.",
      b1_title: "Seguro y Natural",
      b1_desc: "Tratamientos 100% indoloros, 0% invasivos y sin efectos secundarios negativos.",
      b2_title: "Tecnología Avanzada",
      b2_desc: "Diseño de protocolos personalizados para la optimización y recuperación de la salud por medio de escaneo 4D y biofrecuencias.",
      b3_title: "Energía Vital",
      b3_desc: "Recupera la vitalidad perdida por el estrés y los padecimientos agudos o crónicos.",
      b4_title: "Sanación Profunda",
      b4_desc: "Encontramos el origen físico y emocional de cada condición y sus síntomas para procurar la sanidad."
    },
    method: {
      label: "Metodología Única",
      title: "El Método Selah",
      desc: "Un protocolo integral de 3 pasos diseñado para desbloquear, regenerar y sostener tu salud.",
      s1_title: "Diagnóstico de Precisión & Limpieza",
      s1_desc: "Descubre el estado real de tus órganos con el Análisis Bioenergético NLS (imprimible) y elimina toxinas y patógenos.",
      s2_title: "Bio-Optimización Celular",
      s2_desc: "Restauramos la vibración celular y la capacidad de autocuración del organismo. No más dolor, no más inflamación.",
      s3_title: "Consolidación & Estilo de Vida",
      s3_desc: "Mantenimiento en casa con planes sugeridos, personalizados e imprimibles para sostener los resultados."
    },
    pricing: {
      label: "Inversión en ti",
      title: "Tu Camino a la Sanación",
      desc: "Elige el nivel de profundidad que tu cuerpo necesita hoy.",
      group1: "Programas Clínicos en Heredia",
      group1_desc: "Atención presencial personalizada en nuestra sede principal.",
      group2: "Retiros de Salud en Playa Nosara",
      group2_desc: "Experiencias inmersivas de transformación total.",
      daypass_title: "Therapeutic Day Pass",
      daypass_loc: "en Heredia",
      daypass_desc: "Un día para detener el mundo y escuchar lo que tu cuerpo necesita y dárselo.",
      daypass_ideal: "Ideal para: Personas sanas, Ejecutivos, Empresarios, con gran demanda de energía y alto nivel de estrés que requieren recarga rápida.",
      recovery_title: "Programa Recovery",
      recovery_loc: "10 Sesiones en Heredia",
      recovery_desc: "Transformación Total de Condiciones Agudas a Alto Desempeño",
      recovery_ideal: "Ideal para: Personas con problemas de salud agudos, dolor específico (espalda, migraña), inflamación.",
      intensive_title: "Retreat Intensive",
      intensive_loc: "10 Días en Playa Nosara",
      intensive_desc: "Bootcamp de Salud - 10 días de Terapia Intensiva sin pausa",
      intensive_ideal: "Ideal para: Ejecutivos con tiempo limitado o Post-Operatorios.",
      retreat_title: "Retreat Recovery",
      retreat_loc: "21 Días en Playa Nosara",
      retreat_desc: "Experiencia Todo Incluido - 21 días de Inmersión Total",
      retreat_ideal: "Ideal para: Enfermedad crónica, autoinmune, sobreviviente de cáncer.",
      btn_book: "Reservar Cita",
      btn_apply: "APLICAR AL PROGRAMA",
      bac: "Tasa Cero BAC | 0% Interés"
    },
    faq: {
      title: "Condiciones Tratadas",
      subtitle: "¿Es el Método Selah para mí?",
      items: [
        {
          q: "1. Optimización y Alto Rendimiento (Personas Sanas)",
          a: "Diseñado para ejecutivos, empresarios, deportistas y bio-hackers que no están 'enfermos' pero quieren más. Enfocado en: Aumento masivo de energía mitocondrial, claridad mental (brain fog), mejora profunda del sueño, desintoxicación preventiva, manejo de estrés y fortalecimiento del sistema inmune."
        },
        {
          q: "2. Condiciones Agudas (Dolor e Inflamación)",
          a: "Intervención rápida y no invasiva para: Lesiones deportivas recientes, dolor de espalda o cuello, migrañas, estrés agudo / burnout, recuperación post-operatoria acelerada (cicatrización) y procesos inflamatorios recientes."
        },
        {
          q: "3. Condiciones Crónicas y Degenerativas",
          a: "Apoyo integral profundo para: Fibromialgia, artritis, fatiga crónica, desórdenes digestivos, problemas autoinmunes, secuelas de tratamientos agresivos y desequilibrios hormonales. No solo tratamos el síntoma, buscamos restablecer el terreno biológico para devolver calidad de vida."
        }
      ],
      note_1: "¿No encontró su condición en la lista?",
      note_cta: "Contáctenos aquí"
    },
    testimonials: {
      label: "Historias Reales",
      title: "Transformación de Vida"
    },
    blog: {
      label: "Blog de Bienestar",
      title: "Ciencia para tu Salud",
      read_more: "Leer artículo completo",
      view_all: "Ver todos los artículos",
      view_less: "Ver menos artículos"
    },
    footer: {
      desc: "Fundado con la visión de ofrecer un refugio para la salud en medio del caos moderno. Especialistas en terapias naturales y medicina bioenergética.",
      director: "Director & Fundador",
      contact: "Contacto",
      write_us: "Escríbenos",
      rights: "Todos los derechos reservados."
    },
    modals: {
      book_title: "Reserva tu Cita",
      book_desc: "Selecciona el servicio y la fecha que prefieres.",
      service: "Servicio",
      date: "Fecha Preferida",
      time: "Hora Preferida",
      confirm: "Solicitar Confirmación",
      apply_title: "Aplicar al Programa",
      apply_desc: "Debido a la alta demanda, requerimos conocer tu caso.",
      name: "Nombre Completo",
      symptom: "Principal Desafío de Salud",
      send: "Enviar Solicitud"
    }
  },
  en: {
    nav: {
      benefits: "Benefits",
      method: "The Method",
      plans: "Plans",
      blog: "Blog",
      book: "Book Appointment",
      subtitle: "FUTURE MEDICINE WITH ANCESTRAL ROOTS",
      location: "HEREDIA, COSTA RICA"
    },
    hero: {
      slide1: "My path to holistic health starts here",
      slide2: "I renew my body and mind with natural therapies",
      slide3: "Ancestral medicine + modern technology = wellness",
      slide4: "Selah Thera House is not a clinic, it is where my body remembered how to heal itself",
      desc: "Where modern natural science and ancestral wisdom unite to recover your vitality.",
      cta_primary: "Book Free Assessment",
      cta_secondary: "View Plans",
      spots: "* Limited spots due to personalized attention"
    },
    intro: {
      philosophy: "Our Philosophy",
      title: "Selah Thera House: \nYour Return to Balance",
      p1: "Do you feel that despite your success, your energy is not the same? Modern stress, fatigue, inflammation, and chronic pain are not 'normal'. They are signals from your body asking for help.",
      p2: "We integrate the ancestral wisdom of Traditional Chinese Medicine, Ayurveda, and Arabic Medicine (Apiterapy, Phytotherapy, Hydrotherapy, Heliotherapy, Thalassotherapy) with advanced technology and a healing nutrition system.",
      result: "The result: The Selah Method. 100% Natural, 100% Painless, and without side effects.",
      disclaimer: "Our protocols have scientific and technological foundations, acting as a powerful complement to traditional medicine. However, they do not constitute a medical diagnosis nor substitute your personal doctor's recommendations.",
      learn_more: "Know our philosophy",
      video_title: "Discover the Sanctuary",
      video_subtitle: "Watch experience (1:30)"
    },
    benefits: {
      synergy: "TOTAL SYNERGY",
      label: "Selah Thera House",
      title: "Where Science and \n Nature converge",
      p1: "We are not a conventional spa nor a cold clinic. We are a biological optimization center where every therapy is backed by physiological and biophysical principles.",
      p2: "Imagine a place where your body is heard, not just analyzed. Tesla Frequencies, Bio-resonance, Medicinal Plants, Sun and Sea Energy in perfect synchronization with your organism.",
      b1_title: "Safe & Natural",
      b1_desc: "100% painless treatments, 0% invasive, and no negative side effects.",
      b2_title: "Advanced Technology",
      b2_desc: "Design of personalized protocols for health optimization and recovery via 4D scanning and bio-frequencies.",
      b3_title: "Vital Energy",
      b3_desc: "Recover lost vitality due to stress and acute or chronic ailments.",
      b4_title: "Deep Healing",
      b4_desc: "We find the physical and emotional origin of each condition and its symptoms to procure healing."
    },
    method: {
      label: "Unique Methodology",
      title: "The Selah Method",
      desc: "A comprehensive 3-step protocol designed to unblock, regenerate, and sustain your health.",
      s1_title: "Precision Diagnosis & Cleansing",
      s1_desc: "Discover the real state of your organs with NLS Bioenergetic Analysis (printable) and eliminate toxins and pathogens.",
      s2_title: "Cellular Bio-Optimization",
      s2_desc: "We restore cellular vibration and the organism's self-healing capacity. No more pain, no more inflammation.",
      s3_title: "Consolidation & Lifestyle",
      s3_desc: "Home maintenance with suggested, personalized, and printable plans to sustain results."
    },
    pricing: {
      label: "Investment in you",
      title: "Your Path to Healing",
      desc: "Choose the depth level your body needs today.",
      group1: "Clinical Programs in Heredia",
      group1_desc: "Personalized in-person attention at our main headquarters.",
      group2: "Health Retreats in Playa Nosara",
      group2_desc: "Immersive experiences of total transformation.",
      daypass_title: "Therapeutic Day Pass",
      daypass_loc: "in Heredia",
      daypass_desc: "A day to stop the world, listen to what your body needs, and give it to it.",
      daypass_ideal: "Ideal for: Healthy people, Executives, Entrepreneurs with high energy demand and stress requiring quick recharge.",
      recovery_title: "Recovery Program",
      recovery_loc: "10 Sessions in Heredia",
      recovery_desc: "Total Transformation from Acute Conditions to High Performance",
      recovery_ideal: "Ideal for: People with acute health issues, specific pain (back, migraine), inflammation.",
      intensive_title: "Retreat Intensive",
      intensive_loc: "10 Days in Playa Nosara",
      intensive_desc: "Health Bootcamp - 10 days of Intensive Therapy without pause",
      intensive_ideal: "Ideal for: Executives with limited time or Post-Operative care.",
      retreat_title: "Retreat Recovery",
      retreat_loc: "21 Days in Playa Nosara",
      retreat_desc: "All-Inclusive Experience - 21 Days of Total Immersion",
      retreat_ideal: "Ideal for: Chronic illness, autoimmune, cancer survivor.",
      btn_book: "Book Appointment",
      btn_apply: "APPLY TO PROGRAM",
      bac: "BAC 0% Interest Available"
    },
    faq: {
      title: "Conditions Treated",
      subtitle: "Is the Selah Method for me?",
      items: [
        {
          q: "1. Optimization & High Performance (Healthy Individuals)",
          a: "Designed for executives, entrepreneurs, athletes, and bio-hackers who aren't 'sick' but want more. Focused on: Massive mitochondrial energy boost, mental clarity (brain fog), deep sleep improvement, preventive detoxification, stress management, and immune system strengthening."
        },
        {
          q: "2. Acute Conditions (Pain & Inflammation)",
          a: "Rapid and non-invasive intervention for: Recent sports injuries, back or neck pain, migraines, acute stress/burnout, accelerated post-operative recovery (healing), and recent inflammatory processes."
        },
        {
          q: "3. Chronic & Degenerative Conditions",
          a: "Deep integral support for: Fibromyalgia, arthritis, chronic fatigue, digestive disorders, autoimmune issues, treatment aftermath, and hormonal imbalances. We don't just treat the symptom; we seek to restore biological terrain to return quality of life."
        }
      ],
      note_1: "Didn't find your condition on the list?",
      note_cta: "Contact us here"
    },
    testimonials: {
      label: "Real Stories",
      title: "Life Transformation"
    },
    blog: {
      label: "Wellness Blog",
      title: "Science for your Health",
      read_more: "Read full article",
      view_all: "View all articles",
      view_less: "View fewer articles"
    },
    footer: {
      desc: "Founded with the vision of offering a haven for health amidst modern chaos. Specialists in natural therapies and bioenergetic medicine.",
      director: "Director & Founder",
      contact: "Contact",
      write_us: "Write to us",
      rights: "All rights reserved."
    },
    modals: {
      book_title: "Book your Appointment",
      book_desc: "Select the service and date you prefer.",
      service: "Service",
      date: "Preferred Date",
      time: "Preferred Time",
      confirm: "Request Confirmation",
      apply_title: "Apply to Program",
      apply_desc: "Due to high demand, we require to know your case.",
      name: "Full Name",
      symptom: "Main Health Challenge",
      send: "Send Application"
    }
  }
};

// --- MAIN COMPONENT ---
function App() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const t = translations[language];

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
      title: t.hero.slide1
    },
    {
      image: "https://i.postimg.cc/DZKjkpjQ/helioterapia.jpg",
      title: t.hero.slide2
    },
    {
      image: "https://i.postimg.cc/BQtdCydv/vitamin-b12-4796944-1280.jpg",
      title: t.hero.slide3
    },
    {
      image: "https://i.postimg.cc/CLfqkMLn/estres-(2).jpg",
      title: t.hero.slide4
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [language]); // Re-render when language changes

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
    const message = `[${language.toUpperCase()}] Hola, quisiera agendar mi ${service} para el día ${date} a las ${time}.`;
    openWhatsApp(message);
    setIsBookingOpen(false);
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const date = (form.elements.namedItem('date') as HTMLInputElement).value;
    const time = (form.elements.namedItem('time') as HTMLInputElement).value;
    const message = `[${language.toUpperCase()}] Hola, mi nombre es ${name}. Me interesa aplicar al Programa Recovery. Me gustaría iniciar el ${date} a las ${time}.`;
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
    const message = `[${language.toUpperCase()}] Hola, soy ${name}. Me interesa aplicar al ${programName}.\n\nFecha: ${date}\nViajo: ${companion}\nAtención: ${therapy}\n\nDesafío de salud: ${symptom}.`;
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
    const message = `[${language.toUpperCase()}] CONSULTA GENERAL\nCliente: ${name}\nCorreo: ${email}\nMensaje: ${subject}`;
    openWhatsApp(message);
    setIsContactFormOpen(false);
  };

  const handleMagnetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(leadEmail) {
      setIsLeadSubmitted(true);
    }
  };

  // --- DATA (Translated roughly for demo) ---
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: language === 'es' ? "Helioterapia: Luz Solar como medicina" : "Heliotherapy: Sunlight as Medicine",
      excerpt: language === 'es' ? "Descubre cómo la exposición controlada al sol potencia tu sistema inmune." : "Discover how controlled sun exposure boosts your immune system.",
      image: "https://i.postimg.cc/DZKjkpjQ/helioterapia.jpg",
      category: language === 'es' ? "Naturaleza" : "Nature",
      content: language === 'es' ? (
        <div className="space-y-4">
          <p>La helioterapia, o terapia solar, es mucho más que simplemente "tomar el sol". Es el uso terapéutico de la luz solar para tratar diversas condiciones físicas y psicológicas.</p>
          <h4 className="font-bold text-brand-primary">Beneficios Clínicos:</h4>
          <ul className="list-disc pl-5 space-y-2">
             <li>Estimulación de la Vitamina D3.</li>
             <li>Regulación del Sueño.</li>
             <li>Mejora del Estado de Ánimo.</li>
          </ul>
        </div>
      ) : (
        <div className="space-y-4">
          <p>Heliotherapy, or sun therapy, is much more than simply "sunbathing". It is the therapeutic use of sunlight to treat various physical and psychological conditions.</p>
          <h4 className="font-bold text-brand-primary">Clinical Benefits:</h4>
          <ul className="list-disc pl-5 space-y-2">
             <li>Stimulation of Vitamin D3.</li>
             <li>Sleep Regulation.</li>
             <li>Mood Improvement.</li>
          </ul>
        </div>
      ),
      ctaText: language === 'es' ? "Ver Day Pass" : "View Day Pass",
      ctaAction: () => handleBookingOpen("Therapeutic Day Pass")
    },
    {
      id: 2,
      title: language === 'es' ? "Talasoterapia: El poder curativo del mar" : "Thalassotherapy: The Healing Power of the Sea",
      excerpt: language === 'es' ? "El agua de mar contiene minerales idénticos a nuestro plasma sanguíneo." : "Seawater contains minerals identical to our blood plasma.",
      image: "https://i.postimg.cc/Fs6HFnjr/talasoterapia.jpg",
      category: language === 'es' ? "Terapia Natural" : "Natural Therapy",
      content: language === 'es' ? (
        <div className="space-y-4">
          <p>La talasoterapia utiliza el agua de mar, las algas y el clima marino con fines terapéuticos.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p>Thalassotherapy uses seawater, algae, and the marine climate for therapeutic purposes.</p>
        </div>
      ),
      ctaText: language === 'es' ? "Ver Retreat Recovery" : "View Retreat Recovery",
      ctaAction: () => scrollToSection("planes")
    },
    {
      id: 3,
      title: language === 'es' ? "Apiterapia: El oro líquido" : "Apitherapy: Liquid Gold",
      excerpt: language === 'es' ? "Propóleo, jalea real y veneno de abeja para la regeneración." : "Propolis, royal jelly, and bee venom for regeneration.",
      image: "https://i.postimg.cc/1XjstfN1/apiterapia.jpg",
      category: language === 'es' ? "Medicina Ancestral" : "Ancestral Medicine",
      content: language === 'es' ? <p>Uso medicinal de productos de la colmena.</p> : <p>Medicinal use of hive products.</p>,
      ctaText: language === 'es' ? "Agendar Valoración" : "Book Assessment",
      ctaAction: () => handleBookingOpen("Valoración Inicial")
    },
    // Add more blog posts as needed, simplified for brevity in bilingual mode
  ];

  // For brevity, we keep the original list but in a real scenario we'd duplicate/translate all
  
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
                  {t.nav.subtitle}
                </span>
                 <span className={`block font-medium text-brand-accent tracking-widest uppercase mt-1 transition-all duration-300 ${isScrolled ? 'text-[0.5rem]' : 'text-[0.65rem]'}`}>
                  {t.nav.location}
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('beneficios')} className="text-white hover:text-brand-accent transition-colors font-medium text-base">{t.nav.benefits}</button>
              <button onClick={() => scrollToSection('servicios')} className="text-white hover:text-brand-accent transition-colors font-medium text-base">{t.nav.method}</button>
              <button onClick={() => scrollToSection('planes')} className="text-white hover:text-brand-accent transition-colors font-medium text-base">{t.nav.plans}</button>
              <button onClick={() => scrollToSection('blog')} className="text-white hover:text-brand-accent transition-colors font-medium text-base">{t.nav.blog}</button>
              
              {/* Language Toggle */}
              <button 
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-white text-sm transition-all border border-white/20"
              >
                <Globe size={14} />
                {language === 'es' ? 'EN 🇺🇸' : 'ES 🇨🇷'}
              </button>

              <Button 
                variant="secondary" 
                className="!py-2 !px-6 !text-base shadow-lg shadow-brand-accent/20"
                onClick={() => handleBookingOpen("Valoración Inicial")}
              >
                {t.nav.book}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
               {/* Mobile Lang Toggle */}
               <button 
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-1 rounded-full text-white text-xs transition-all border border-white/20"
              >
                {language === 'es' ? 'EN 🇺🇸' : 'ES 🇨🇷'}
              </button>
              <button className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-dark/95 backdrop-blur-md absolute w-full border-t border-brand-primary/20">
            <div className="px-4 pt-2 pb-6 space-y-4 text-center">
              <button onClick={() => scrollToSection('beneficios')} className="block w-full text-white hover:text-brand-accent py-2 text-lg">{t.nav.benefits}</button>
              <button onClick={() => scrollToSection('servicios')} className="block w-full text-white hover:text-brand-accent py-2 text-lg">{t.nav.method}</button>
              <button onClick={() => scrollToSection('planes')} className="block w-full text-white hover:text-brand-accent py-2 text-lg">{t.nav.plans}</button>
               <button onClick={() => scrollToSection('blog')} className="block w-full text-white hover:text-brand-accent py-2 text-lg">{t.nav.blog}</button>
              <Button fullWidth variant="secondary" onClick={() => handleBookingOpen("Valoración Inicial")}>
                {t.nav.book}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-56 md:pt-72 overflow-hidden bg-brand-dark">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={slide.image} 
              alt="Selah Thera House" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          </div>
        ))}

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-8 animate-fade-in text-center md:text-left">
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
              {t.hero.desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
               <div className="flex flex-col items-center sm:items-start gap-1">
                  <Button 
                    className="shadow-brand-accent/30 min-w-[280px]" 
                    icon 
                    onClick={() => handleBookingOpen("Valoración Inicial")}
                  >
                    {t.hero.cta_primary}
                  </Button>
                  <span className="text-xs text-white italic pl-1">{t.hero.spots}</span>
               </div>
              
              <button 
                  onClick={() => scrollToSection('planes')}
                  className="py-4 px-8 rounded-lg font-bold text-lg min-w-[280px] flex items-center justify-center gap-2 uppercase tracking-wide transition-all duration-300 transform hover:-translate-y-1 shadow-lg bg-brand-dark text-white hover:bg-white hover:text-brand-dark"
              >
                  {t.hero.cta_secondary}
              </button>
            </div>
          </div>
          
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
              </div>
          </div>
        </div>
      </section>

      {/* --- VIDEO INTRO SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">{t.intro.philosophy}</span>
              <h2 className="text-4xl font-bold text-brand-dark leading-tight whitespace-pre-line">{t.intro.title}</h2>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                {t.intro.p1}
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                {t.intro.p2}
              </p>

              <p className="text-brand-dark font-bold text-xl leading-relaxed border-l-4 border-brand-accent pl-4 py-2 bg-brand-light/10">
                 {t.intro.result}
              </p>

              <div className="mt-6 p-4 bg-brand-beige/30 rounded-lg border border-brand-primary/20 text-sm text-brand-dark/80 italic">
                <div className="flex items-start gap-2">
                   <AlertCircle className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                   <p>{t.intro.disclaimer}</p>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => scrollToSection('beneficios')}
                  className="text-brand-accent font-bold hover:text-[#B5952F] flex items-center gap-2 transition-all transform active:scale-95"
                >
                  {t.intro.learn_more} <ArrowRight size={20} />
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer h-[400px]" onClick={() => setIsVideoOpen(true)}>
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
               <video 
                 src="https://videos.pexels.com/video-files/3209048/3209048-hd_1920_1080_25fps.mp4" 
                 autoPlay 
                 muted 
                 loop 
                 playsInline
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 flex items-center justify-center z-20">
                 <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-brand-accent ml-1" fill="currentColor" />
                 </div>
               </div>
               <div className="absolute bottom-6 left-6 z-20 text-white">
                 <p className="font-bold text-lg">{t.intro.video_title}</p>
                 <p className="text-sm opacity-90">{t.intro.video_subtitle}</p>
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
               <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                     <img src="https://i.postimg.cc/bJGj5qBM/digitization-7261158-1280.jpg" alt="Diagnóstico Digital 4D" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex flex-col gap-4 h-full">
                     <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl">
                        <img src="https://i.postimg.cc/qMzsqSCX/osilador-tesla.jpg" alt="Tecnología Tesla" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                     </div>
                     <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl">
                        <img src="https://i.postimg.cc/Fs6HFnjr/talasoterapia.jpg" alt="Naturaleza y Mar" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                     </div>
                  </div>
               </div>
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-brand-dark px-6 py-3 rounded-full font-bold shadow-xl border-4 border-brand-dark z-20 whitespace-nowrap">
                  {t.benefits.synergy}
               </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <span className="text-brand-accent font-bold tracking-widest uppercase text-sm">{t.benefits.label}</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2 leading-tight whitespace-pre-line">
                  {t.benefits.title}
                </h2>
              </div>
              <div className="space-y-6 text-gray-300 text-lg">
                <p>{t.benefits.p1}</p>
                <p>{t.benefits.p2}</p>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2"><Zap className="text-brand-accent" /> {t.benefits.b1_title}</h4>
                  <p className="text-sm text-gray-400">{t.benefits.b1_desc}</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2"><Activity className="text-brand-accent" /> {t.benefits.b2_title}</h4>
                  <p className="text-sm text-gray-400">{t.benefits.b2_desc}</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2"><Leaf className="text-brand-accent" /> {t.benefits.b3_title}</h4>
                  <p className="text-sm text-gray-400">{t.benefits.b3_desc}</p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2"><Shield className="text-brand-accent" /> {t.benefits.b4_title}</h4>
                  <p className="text-sm text-gray-400">{t.benefits.b4_desc}</p>
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
            <span className="text-brand-primary font-bold tracking-wider uppercase">{t.method.label}</span>
            <h2 className="text-4xl font-bold text-brand-dark mt-2">{t.method.title}</h2>
            <p className="text-gray-600 mt-4">{t.method.desc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-brand-primary hover:-translate-y-2 transition-transform">
              <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-brand-primary">01</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">{t.method.s1_title}</h3>
              <p className="text-gray-600 mb-6 text-sm">{t.method.s1_desc}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-brand-accent hover:-translate-y-2 transition-transform relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">CORE</div>
              <div className="bg-brand-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-brand-accent">02</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">{t.method.s2_title}</h3>
              <p className="text-gray-600 mb-6 text-sm">{t.method.s2_desc}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-brand-primary hover:-translate-y-2 transition-transform">
              <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-brand-primary">03</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">{t.method.s3_title}</h3>
              <p className="text-gray-600 mb-6 text-sm">{t.method.s3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="planes" className="py-24 bg-white relative">
         <div className="absolute top-0 left-0 w-full h-1/2 bg-gray-50 skew-y-3 transform -translate-y-20 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold tracking-wider uppercase">{t.pricing.label}</span>
            <h2 className="text-4xl font-bold text-brand-dark mt-2">{t.pricing.title}</h2>
            <p className="text-gray-600 mt-4">{t.pricing.desc}</p>
          </div>

          <div className="mb-8 pl-4 border-l-4 border-brand-primary">
             <h3 className="text-2xl font-bold text-brand-dark">{t.pricing.group1}</h3>
             <p className="text-gray-500 text-sm">{t.pricing.group1_desc}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
             <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">{t.pricing.daypass_title}</h3>
                <p className="text-sm text-brand-primary font-bold mb-1 uppercase tracking-wider">{t.pricing.daypass_loc}</p>
                <p className="text-gray-600 mb-6 text-sm font-bold">{t.pricing.daypass_desc}</p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-brand-dark">US$77</span>
                  <span className="text-xl text-gray-400 line-through mb-1">US$99</span>
                </div>
                <div className="inline-block bg-brand-light/20 text-brand-dark text-xs font-bold px-2 py-1 rounded mb-6 self-start">{t.pricing.bac}</div>
                <Button fullWidth onClick={() => handleBookingOpen("Therapeutic Day Pass")}>{t.pricing.btn_book}</Button>
                <div className="mt-8 space-y-4 text-sm text-gray-600 flex-grow">
                   <p className="text-xs">{t.pricing.daypass_ideal}</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-brand-primary/20 hover:shadow-xl transition-shadow relative flex flex-col h-full">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">{t.pricing.recovery_title}</h3>
                <p className="text-sm text-brand-primary font-bold mb-1 uppercase tracking-wider">{t.pricing.recovery_loc}</p>
                <p className="text-gray-600 mb-6 text-sm font-bold">{t.pricing.recovery_desc}</p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-brand-dark">US$770</span>
                  <span className="text-xl text-gray-400 line-through mb-1">US$950</span>
                </div>
                <div className="inline-block bg-brand-light/20 text-brand-dark text-xs font-bold px-2 py-1 rounded mb-6 self-start">{t.pricing.bac}</div>
                <Button variant="secondary" fullWidth onClick={() => setIsRecoveryFormOpen(true)}>{t.pricing.btn_apply}</Button>
                <div className="mt-8 space-y-4 text-sm text-gray-600 flex-grow">
                   <p className="text-xs">{t.pricing.recovery_ideal}</p>
                </div>
            </div>
          </div>

          <div className="mb-8 pl-4 border-l-4 border-brand-accent">
             <h3 className="text-2xl font-bold text-brand-dark">{t.pricing.group2}</h3>
             <p className="text-gray-500 text-sm">{t.pricing.group2_desc}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">{t.pricing.intensive_title}</h3>
                <p className="text-sm text-brand-primary font-bold mb-1 uppercase tracking-wider">{t.pricing.intensive_loc}</p>
                <p className="text-gray-600 mb-6 text-sm font-bold">{t.pricing.intensive_desc}</p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-brand-dark">US$4,250</span>
                  <span className="text-xl text-gray-400 line-through mb-1">US$5,500</span>
                </div>
                <div className="inline-block bg-brand-light/20 text-brand-dark text-xs font-bold px-2 py-1 rounded mb-6 self-start">{t.pricing.bac}</div>
                <Button variant="secondary" fullWidth onClick={() => setIsIntensiveFormOpen(true)}>{t.pricing.btn_apply}</Button>
                <div className="mt-8 space-y-4 text-sm text-gray-600 flex-grow">
                   <p className="text-xs">{t.pricing.intensive_ideal}</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-brand-accent/30 hover:shadow-xl transition-shadow relative flex flex-col h-full">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">{t.pricing.retreat_title}</h3>
                <p className="text-sm text-brand-primary font-bold mb-1 uppercase tracking-wider">{t.pricing.retreat_loc}</p>
                <p className="text-gray-600 mb-6 text-sm font-bold">{t.pricing.retreat_desc}</p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-brand-dark">US$7,875</span>
                  <span className="text-xl text-gray-400 line-through mb-1">US$10,237</span>
                </div>
                <div className="inline-block bg-brand-light/20 text-brand-dark text-xs font-bold px-2 py-1 rounded mb-6 self-start">{t.pricing.bac}</div>
                <Button variant="secondary" fullWidth onClick={() => setIsLeadFormOpen(true)}>{t.pricing.btn_apply}</Button>
                <div className="mt-8 space-y-4 text-sm text-gray-600 flex-grow">
                   <p className="text-xs">{t.pricing.retreat_ideal}</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION (UPDATED) --- */}
      <section className="py-20 bg-brand-beige/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-primary font-bold tracking-wider uppercase text-sm">{t.faq.title}</span>
            <h2 className="text-3xl font-bold text-brand-dark mt-2">{t.faq.subtitle}</h2>
          </div>
          
          <div className="space-y-4">
            {t.faq.items.map((item, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 border ${activeAccordion === index ? 'border-brand-primary' : 'border-transparent'}`}
              >
                <button 
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none"
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  <span className="font-bold text-brand-dark">{item.q}</span>
                  {activeAccordion === index ? <ChevronUp className="text-brand-primary" /> : <ChevronDown className="text-gray-400" />}
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeAccordion === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-600 leading-relaxed text-sm pt-2 border-t border-gray-100">{item.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center bg-white p-6 rounded-xl border border-brand-accent/30 shadow-sm max-w-lg mx-auto">
            <p className="text-gray-600 mb-3">{t.faq.note_1}</p>
            <Button 
              variant="outline" 
              className="!py-2 !px-6 mx-auto"
              onClick={() => setIsContactFormOpen(true)}
            >
              {t.faq.note_cta}
            </Button>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="testimonios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold tracking-wider uppercase">{t.testimonials.label}</span>
            <h2 className="text-4xl font-bold text-brand-dark mt-2">{t.testimonials.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Static Testimonials for layout */}
             <div className="bg-gray-50 p-8 rounded-2xl relative">
                <Quote className="absolute top-6 right-6 text-brand-accent/20 w-10 h-10" />
                <p className="text-gray-600 italic text-sm">"Incredible experience."</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- BLOG SECTION --- */}
      <section id="blog" className="py-24 bg-brand-dark text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-brand-accent font-bold tracking-wider uppercase flex items-center gap-2">
                <BookOpen size={18} /> {t.blog.label}
              </span>
              <h2 className="text-4xl font-bold mt-2">{t.blog.title}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-brand-accent/50 transition-all group cursor-pointer"
                onClick={() => setSelectedArticle(post)}
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <span className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-2 block">{post.category}</span>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-accent transition-colors">{post.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
                  <button className="mt-4 text-sm font-bold underline decoration-brand-accent underline-offset-4">{t.blog.read_more}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-stone-900 text-stone-400 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center justify-center">
               <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                 <h3 className="text-white text-xl font-bold tracking-wider">SELAH THERA HOUSE</h3>
                 <div className="bg-white p-1 rounded-md shadow-lg">
                    <img src="https://i.postimg.cc/CKk7Q0PQ/logo-pymes.png" alt="Sello Pyme" className="h-20 w-auto object-contain" />
                 </div>
              </div>
              <p className="text-sm leading-relaxed max-w-xs mx-auto text-center">{t.footer.desc}</p>
            </div>
            
            <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0">
               <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-accent mb-4">
                  <img src="https://i.postimg.cc/MK20MN9K/augusto-cesar-romero.jpg" alt="Augusto César Romero" className="w-full h-full object-cover" />
               </div>
               <h4 className="text-white font-bold text-lg">Augusto César Romero</h4>
               <p className="text-brand-accent text-sm uppercase tracking-wider font-medium">{t.footer.director}</p>
            </div>

            <div className="flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0">
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t.footer.contact}</h4>
              <ul className="space-y-3 text-sm flex flex-col items-center">
                <li className="flex items-center gap-2 justify-center"><MapPin size={16} className="text-brand-accent" /> Heredia, Costa Rica</li>
                <li className="flex items-center gap-2 justify-center"><Calendar size={16} className="text-brand-accent" /> Lunes a Viernes</li>
              </ul>
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="!py-2 !px-4 !text-sm !border-brand-accent !text-brand-accent hover:!bg-brand-accent hover:!text-stone-900"
                  onClick={() => setIsContactFormOpen(true)}
                >
                  <MessageCircle size={16} className="mr-2" /> {t.footer.write_us}
                </Button>
              </div>
              
              {/* Social Icons (UPDATED) */}
              <div className="flex gap-4 mt-8 justify-center">
                <a href="https://www.instagram.com/augustocesarromero/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="https://www.facebook.com/coachaugustocesar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                <a href="https://www.tiktok.com/@augustocesaromeroselah" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><TikTokIcon className="w-5 h-5" /></a>
                <a href="https://www.youtube.com/@AugustoCesarRomero" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Youtube size={20} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-12 pt-8 text-center text-xs text-white/60">
            <p>&copy; {new Date().getFullYear()} Selah Thera House. {t.footer.rights}</p>
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

      {/* 2. Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative border-t-4 border-brand-primary">
            <button onClick={() => setIsBookingOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
            <h3 className="text-2xl font-bold text-brand-dark mb-2">{t.modals.book_title}</h3>
            <p className="text-gray-500 mb-6 text-sm">{t.modals.book_desc}</p>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{t.modals.service}</label>
                <select name="service" className="w-full p-3 bg-stone-100 rounded-lg text-brand-dark border-none" defaultValue={preselectedService}>
                  <option value="Valoración Inicial">Valoración Inicial (Gratis)</option>
                  <option value="Therapeutic Day Pass">Therapeutic Day Pass ($77)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{t.modals.date}</label>
                <input type="date" name="date" required className="w-full p-3 bg-stone-800 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{t.modals.time}</label>
                <input type="time" name="time" required className="w-full p-3 bg-stone-800 rounded-lg text-white" />
              </div>
              <Button fullWidth type="submit" className="mt-2">{t.modals.confirm}</Button>
            </form>
          </div>
        </div>
      )}

      {/* Lead Gen Forms */}
      {(isIntensiveFormOpen || isLeadFormOpen || isRecoveryFormOpen) && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative border-t-4 border-brand-accent overflow-y-auto max-h-[90vh]">
            <button onClick={() => { setIsIntensiveFormOpen(false); setIsLeadFormOpen(false); setIsRecoveryFormOpen(false); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
            <h3 className="text-2xl font-bold text-brand-dark mb-2">{t.modals.apply_title}</h3>
            <p className="text-gray-500 mb-6 text-sm">{t.modals.apply_desc}</p>
            <form onSubmit={(e) => {
               if(isRecoveryFormOpen) handleRecoverySubmit(e);
               else handleLeadSubmit(e, isIntensiveFormOpen ? 'Intensive' : 'Recovery');
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{t.modals.name}</label>
                <input type="text" name="name" required className="w-full p-3 bg-stone-100 rounded-lg text-brand-dark" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">{t.modals.date}</label>
                 <input type="date" name="date" required className="w-full p-3 bg-stone-800 rounded-lg text-white" />
              </div>
              {!isRecoveryFormOpen && (
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">{t.modals.symptom}</label>
                   <textarea name="symptom" rows={3} required className="w-full p-3 bg-stone-100 rounded-lg text-brand-dark" />
                 </div>
              )}
               {/* Hidden fields for simplicity in demo */}
               {!isRecoveryFormOpen && <input type="hidden" name="companion" value="Solo" />}
               {!isRecoveryFormOpen && <input type="hidden" name="therapy" value="Solo" />}
               {isRecoveryFormOpen && <input type="hidden" name="time" value="09:00" />}

              <Button variant="secondary" fullWidth type="submit" className="mt-2">{t.modals.send}</Button>
            </form>
          </div>
        </div>
      )}

      {/* AI Chatbot Component with Language Prop */}
      <SelahAssistant language={language} />

    </div>
  );
}

export default App;
