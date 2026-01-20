import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  Search, 
  Filter, 
  X, 
  ChevronRight, 
  Award, 
  Calendar, 
  Hash, 
  Download, 
  Share2,
  CheckCircle,
  Menu,
  Terminal,
  Cpu,
  Database,
  Cloud
} from 'lucide-react';

// --- DATA MODEL & MOCK DATA ---

const PROVIDERS = {
  GOOGLE: { name: 'Google', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', glow: 'shadow-blue-500/20' },
  MICROSOFT: { name: 'Microsoft', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', glow: 'shadow-cyan-500/20' },
  IBM: { name: 'IBM', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', glow: 'shadow-indigo-500/20' },
  AWS: { name: 'AWS', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', glow: 'shadow-orange-500/20' },
  META: { name: 'Meta', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20', glow: 'shadow-pink-500/20' },
  COURSERA: { name: 'Coursera', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/20' },
  OTHER: { name: 'Other', color: 'text-slate-400', bg: 'bg-slate-700/10', border: 'border-slate-700/20', glow: 'shadow-slate-700/20' }
};

const BASE_URL = 'https://1inmortal.github.io/githubpagetest/src/assets/img/Certificados/';

const CERTIFICATES_DATA = [
  { id: 'cert-1', file: 'Full Stack Software Developer Assessment.jpg', fileUrl: BASE_URL + encodeURIComponent('Full Stack Software Developer Assessment.jpg'), verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/H53OONRNYI3V', title: 'Full Stack Software Developer Assessment', platform: 'Meta', provider: 'META', platformIcon: 'M', status: 'completed', issueDate: '2024', priority: 1, category: 'fullstack', skills: ['React','Node.js','Web Architecture'], level: 'Expert', featured: true, description: 'Certificaci?n integral en desarrollo de software, cubriendo frontend y backend.' },
  { id: 'cert-2', file: 'Foundations of Cybersecurity.jpg', fileUrl: BASE_URL + encodeURIComponent('Foundations of Cybersecurity.jpg'), verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/U1B3XIM07AXT', title: 'Foundations of Cybersecurity', platform: 'Google', provider: 'GOOGLE', platformIcon: 'G', status: 'completed', issueDate: '2024', priority: 1, category: 'cybersecurity', skills: ['Network Security','Risk Management','SIEM','Security Ethics'], level: 'Professional', featured: true, description: 'Fundamentos de ciberseguridad, gesti?n de riesgos y herramientas de an?lisis de seguridad.' },
  { id: 'cert-3', file: 'Generative Al_ Elevate your Software Development Career.jpg', fileUrl: BASE_URL + encodeURIComponent('Generative Al_ Elevate your Software Development Career.jpg'), verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/F046JNZ3FUO8', title: 'Generative AI: Elevate your Software Development Career', platform: 'IBM', provider: 'IBM', platformIcon: 'I', status: 'completed', issueDate: '2024', priority: 1, category: 'ai', skills: ['Python','Machine Learning','GenAI'], level: 'Professional', featured: true, description: 'Inmersi?n en IA generativa y aplicaci?n pr?ctica en desarrollo.' },
  { id: 'cert-4', file: 'Python for Data Science, Al & Development.jpg', fileUrl: BASE_URL + encodeURIComponent('Python for Data Science, Al & Development.jpg'), verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/N3KT4NLHCDDK', title: 'Python for Data Science, AI & Development', platform: 'IBM', provider: 'IBM', platformIcon: 'I', status: 'completed', issueDate: '2024', priority: 1, category: 'ai', skills: ['Python','Data Analysis','ML'], level: 'Professional', featured: true, description: 'Uso de Python para an?lisis de datos y aprendizaje autom?tico.' },
  { id: 'cert-5', file: 'Introduction to Modern Al.jpeg', fileUrl: BASE_URL + encodeURIComponent('Introduction to Modern Al.jpeg'), verificationUrl: BASE_URL + encodeURIComponent('Introduction to Modern Al.jpeg'), title: 'Introduction to Modern AI', platform: 'IBM', provider: 'IBM', platformIcon: 'I', status: 'completed', issueDate: '2024', priority: 2, category: 'ai', skills: ['ML','AI Fundamentals'], level: 'Fundamental', featured: false, description: 'Fundamentos modernos de IA y conceptos clave.' },
  { id: 'cert-6', file: '../pdf/Introduction to Secure Networking.pdf', fileUrl: '../pdf/Introduction to Secure Networking.pdf', verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/WAOVD33TJ1BB', title: 'Connect and Protect: Networks and Network Security', platform: 'Google', provider: 'GOOGLE', platformIcon: 'G', status: 'completed', issueDate: '2024', priority: 2, category: 'cybersecurity', skills: ['Networking','Security','Firewall','VPN'], level: 'Professional', featured: false, description: 'Seguridad en redes, protocolos de cifrado y t?cnicas de endurecimiento de sistemas.' },
  { id: 'cert-7', file: 'Introduction to Software Engineering.jpg', fileUrl: BASE_URL + encodeURIComponent('Introduction to Software Engineering.jpg'), verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/140BP1SVUV1P', title: 'Introduction to Software Engineering', platform: 'Meta', provider: 'META', platformIcon: 'M', status: 'completed', issueDate: '2024', priority: 2, category: 'fullstack', skills: ['Software Engineering','Best Practices'], level: 'Professional', featured: false, description: 'Fundamentos de ingenier?a de software y buenas pr?cticas.' },
  { id: 'cert-8', file: '../pdf/Introducci?n a la inform?tica.pdf', fileUrl: '../pdf/Introducci?n a la inform?tica.pdf', verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/6GTGOBRZHARO', title: 'Introducci?n a la inform?tica', platform: 'Coursera', provider: 'COURSERA', platformIcon: 'C', status: 'completed', issueDate: '2024', priority: 2, category: 'fullstack', skills: ['Computing Basics','Algorithms'], level: 'Fundamental', featured: false, description: 'Curso introductorio a conceptos b?sicos de inform?tica.' },
  { id: 'cert-9', file: 'Introduction to HTML, CSS, & JavaScript.jpg', fileUrl: BASE_URL + encodeURIComponent('Introduction to HTML, CSS, & JavaScript.jpg'), verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/C47JJJVM4L9Y', title: 'Introduction to HTML, CSS, & JavaScript', platform: 'Meta', provider: 'META', platformIcon: 'M', status: 'completed', issueDate: '2024', priority: 2, category: 'fullstack', skills: ['HTML','CSS','JavaScript'], level: 'Fundamental', featured: false, description: 'Bases de desarrollo web frontend con HTML, CSS y JS.' },
  { id: 'cert-10', file: 'Play It Safe_ Manage Security Risks.jpg', fileUrl: BASE_URL + encodeURIComponent('Play It Safe_ Manage Security Risks.jpg'), verificationUrl: BASE_URL + encodeURIComponent('Play It Safe_ Manage Security Risks.jpg'), title: 'Play It Safe: Manage Security Risks', platform: 'Google', provider: 'GOOGLE', platformIcon: 'G', status: 'completed', issueDate: '2024', priority: 2, category: 'cybersecurity', skills: ['Risk Management','Security'], level: 'Professional', featured: false, description: 'Gesti?n de riesgos y reducci?n de amenazas.' },
  { id: 'cert-11', file: 'Defensa de la red.jpeg', fileUrl: BASE_URL + encodeURIComponent('Defensa de la red.jpeg'), verificationUrl: BASE_URL + encodeURIComponent('Defensa de la red.jpeg'), title: 'Defensa de la red', platform: 'Google', provider: 'GOOGLE', platformIcon: 'G', status: 'completed', issueDate: '2024', priority: 2, category: 'cybersecurity', skills: ['Network Defense','Forensics'], level: 'Professional', featured: false, description: 'T?cnicas de defensa de redes y an?lisis de incidentes.' },
  { id: 'cert-12', file: 'Getting Started with Git and GitHub.jpg', fileUrl: BASE_URL + encodeURIComponent('Getting Started with Git and GitHub.jpg'), verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/CWRQOJ19Z101', title: 'Getting Started with Git and GitHub', platform: 'Google', provider: 'GOOGLE', platformIcon: 'G', status: 'completed', issueDate: '2024', priority: 3, category: 'fullstack', skills: ['Git','GitHub','Version Control'], level: 'Fundamental', featured: false, description: 'Control de versiones y flujos de trabajo colaborativos.' },
  { id: 'cert-13', file: 'marketing.jpg', fileUrl: BASE_URL + encodeURIComponent('marketing.jpg'), verificationUrl: BASE_URL + encodeURIComponent('marketing.jpg'), title: 'Marketing Digital', platform: 'Coursera', provider: 'COURSERA', platformIcon: 'C', status: 'completed', issueDate: '2024', priority: 3, category: 'other', skills: ['Marketing Digital','Analytics'], level: 'Fundamental', featured: false, description: 'Estrategias y an?lisis en marketing digital.' }
];

const SKILLS_TAXONOMY = [
  { name: 'Cloud Architecture', count: 12, icon: Cloud },
  { name: 'Artificial Intelligence', count: 8, icon: Cpu },
  { name: 'Data Engineering', count: 5, icon: Database },
  { name: 'DevOps & SRE', count: 7, icon: Terminal },
];

const TIMELINE_EVENTS = [
  { year: '2024', title: 'Senior AI Specialist', desc: 'Focus on Generative AI & LLMs integration.' },
  { year: '2023', title: 'Cloud Architecture Shift', desc: 'Achieved Google & Microsoft Expert levels.' },
  { year: '2022', title: 'Data Science Foundation', desc: 'Intensive Python & SQL mastery with IBM.' },
  { year: '2021', title: 'Full Stack Beginnings', desc: 'Started journey with Web Development.' },
];

// --- TRANSLATIONS ---
const translations = {
  es: {
    nav: {
      inicio: 'Inicio',
      experiencia: 'Experiencia',
      stack: 'Stack',
      proyectos: 'Proyectos',
      servicios: 'Servicios',
      contacto: 'Contacto'
    },
    hero: {
      title: 'Construyendo Autoridad a través del',
      titleHighlight: 'Dominio Continuo',
      subtitle: 'Un registro digital verificable de mi trayectoria profesional en Arquitectura Cloud, Ingeniería de IA y Ciencia de Datos.',
      explore: 'Explorar Colección',
      linkedin: 'Ver Perfil LinkedIn'
    },
    certificates: {
      title: 'Bóveda de Certificados',
      subtitle: 'Explora mis credenciales activas verificadas directamente por las organizaciones emisoras.',
      allProviders: 'Todos los Proveedores',
      searchPlaceholder: 'Filtrar por habilidad o título...',
      noResults: 'No se encontraron certificados',
      noResultsDesc: 'Intenta ajustar tus filtros o búsqueda.'
    },
    modal: {
      chip: 'Certificación Oficial',
      description: 'Descripción',
      skills: 'Habilidades Validadas',
      issued: 'Emitido',
      expires: 'Expira',
      credentialId: 'ID de Credencial',
      verify: 'Verificar Credencial',
      share: 'Compartir en LinkedIn',
      download: 'Descargar PDF'
    },
    timeline: {
      title: 'Ruta de Aprendizaje',
      subtitle: 'Mi trayectoria educativa refleja un compromiso de estar a la vanguardia de la tecnología.'
    },
    skills: {
      title: 'Matriz de Competencias',
      verificationsPromise: 'Promesa de Verificación',
      verificationsDesc: 'Todos los certificados mostrados aquí están firmados criptográficamente o verificables mediante IDs únicos en el portal oficial del proveedor.'
    },
    cta: {
      title: '¿Quieres ver estas skills en acción?',
      description: 'Explora mis proyectos donde aplico estas tecnologías y certificaciones en casos de estudio reales.',
      button: 'Ver proyectos'
    },
    footer: {
      copyright: '© 2026 INMORTAL_OS'
    }
  },
  en: {
    nav: {
      inicio: 'Home',
      experiencia: 'Experience',
      stack: 'Stack',
      proyectos: 'Projects',
      servicios: 'Services',
      contacto: 'Contact'
    },
    hero: {
      title: 'Building Authority through',
      titleHighlight: 'Continuous Mastery',
      subtitle: 'A verifiable digital ledger of my professional journey across Cloud Architecture, AI Engineering, and Data Science.',
      explore: 'Explore Collection',
      linkedin: 'View LinkedIn Profile'
    },
    certificates: {
      title: 'Certificate Vault',
      subtitle: 'Browse my active credentials verified directly by issuing organizations.',
      allProviders: 'All Providers',
      searchPlaceholder: 'Filter by skill or title...',
      noResults: 'No certificates found',
      noResultsDesc: 'Try adjusting your filters or search query.'
    },
    modal: {
      chip: 'Official Certification',
      description: 'Description',
      skills: 'Skills Validated',
      issued: 'Issued',
      expires: 'Expires',
      credentialId: 'Credential ID',
      verify: 'Verify Credential',
      share: 'Share on LinkedIn',
      download: 'Download PDF'
    },
    timeline: {
      title: 'Learning Path',
      subtitle: 'My educational journey reflects a commitment to staying ahead of the technology curve.'
    },
    skills: {
      title: 'Competency Matrix',
      verificationsPromise: 'Verification Promise',
      verificationsDesc: 'All certificates displayed here are cryptographically signed or verifiable via unique credential IDs on the provider\'s official portal.'
    },
    cta: {
      title: 'Want to see these skills in action?',
      description: 'Explore my projects where I apply these technologies and certifications in real case studies.',
      button: 'View projects'
    },
    footer: {
      copyright: '© 2026 INMORTAL_OS'
    }
  }
};

// --- COMPONENTS ---

// 1. UI PRIMITIVES
const Badge = ({ children, className = "", variant = "default" }) => {
  const baseStyle = "px-2 py-0.5 rounded-full text-xs font-medium border tracking-wide";
  const variants = {
    default: "bg-slate-800 border-slate-700 text-slate-300",
    glow: "bg-white/5 border-white/10 text-white backdrop-blur-sm",
    outline: "bg-transparent border-slate-600 text-slate-400"
  };
  return <span className={`${baseStyle} ${variants[variant]} ${className}`}>{children}</span>;
};

const Button = ({ children, variant = "primary", className = "", icon: Icon, onClick, ...props }) => {
  const base = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50";
  
  const variants = {
    primary: "bg-white text-slate-900 hover:bg-slate-200 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]",
    secondary: "bg-slate-800 text-white border border-slate-700 hover:border-slate-500 hover:bg-slate-700",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
    link: "bg-transparent text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline p-0 h-auto"
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} onClick={onClick} {...props}>
      {children}
      {Icon && <Icon size={16} />}
    </button>
  );
};

// 2. FEATURED COMPONENTS
const SectionHeading = ({ title, subtitle, align = "center" }) => (
  <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-3">
      {title}
    </h2>
    <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
      {subtitle}
    </p>
  </div>
);

const CertificateModal = ({ cert, isOpen, onClose, t }) => {
  if (!isOpen || !cert) return null;
  const theme = PROVIDERS[cert.provider];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Strip */}
        <div className={`h-2 w-full bg-gradient-to-r ${theme.color.replace('text-', 'from-').replace('400', '500')} to-transparent opacity-50`} />
        
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
               <div className={`p-3 rounded-xl ${theme.bg} ${theme.border} border`}>
                 <ShieldCheck className={theme.color} size={32} />
               </div>
               <div>
                 <h3 className="text-2xl font-bold text-white leading-tight">{cert.title}</h3>
                 <span className={`text-sm font-medium ${theme.color}`}>{theme.name} ? {cert.level}</span>
               </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">{t('modal.description')}</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{cert.description}</p>
              </div>
              <div>
                 <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">{t('modal.skills')}</h4>
                 <div className="flex flex-wrap gap-2">
                   {cert.skills.map(s => (
                     <Badge key={s} variant="outline">{s}</Badge>
                   ))}
                 </div>
              </div>
            </div>

            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 space-y-4">
               <div className="space-y-1">
                 <span className="text-xs text-slate-500 block">{t('modal.issued')}</span>
                 <div className="flex items-center gap-2 text-slate-300 text-sm">
                   <Calendar size={14} /> {cert.issueDate}
                 </div>
               </div>
               {cert.expirationDate && (
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 block">{t('modal.expires')}</span>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Calendar size={14} /> {cert.expirationDate}
                    </div>
                  </div>
               )}
               <div className="space-y-1">
                 <span className="text-xs text-slate-500 block">{t('modal.credentialId')}</span>
                 <div className="flex items-center gap-2 text-slate-300 font-mono text-xs break-all">
                   <Hash size={14} /> {cert.credentialId}
                 </div>
               </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-800">
             <Button className="w-full sm:w-auto" icon={ExternalLink} onClick={() => cert.verificationUrl && window.open(cert.verificationUrl, '_blank')}>{t('modal.verify')}</Button>
             <Button variant="secondary" className="w-full sm:w-auto" icon={Share2}>{t('modal.share')}</Button>
             <Button variant="ghost" className="w-full sm:w-auto" icon={Download}>{t('modal.download')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificateCard = ({ cert, onClick }) => {
  const theme = PROVIDERS[cert.provider];
  
  return (
    <div 
      onClick={() => onClick(cert)}
      className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:border-slate-600 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
    >
      {/* Hover Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.color.replace('text-', 'from-').replace('400', '500')}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
           <div className={`p-2 rounded-lg ${theme.bg} ${theme.border} border`}>
              <ShieldCheck className={theme.color} size={20} />
           </div>
           {cert.featured && (
             <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">
               <Award size={10} /> Featured
             </span>
           )}
        </div>

        <h3 className="text-lg font-bold text-slate-100 group-hover:text-white mb-1 line-clamp-2 leading-tight">
          {cert.title}
        </h3>
        <p className={`text-sm ${theme.color} mb-4 font-medium`}>{theme.name}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
           {cert.skills.slice(0, 2).map(skill => (
             <Badge key={skill} variant="outline" className="text-[10px] text-slate-400 border-slate-700/50">
               {skill}
             </Badge>
           ))}
           {cert.skills.length > 2 && (
             <Badge variant="outline" className="text-[10px] text-slate-500 border-slate-700/50">+{cert.skills.length - 2}</Badge>
           )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
           <span className="text-xs text-slate-500 font-mono">{cert.issueDate.split('-')[0]}</span>
           <span className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-white transition-colors">
             View Details <ChevronRight size={12} />
           </span>
        </div>
      </div>
    </div>
  );
};

// 3. MAIN APPLICATION
const PortfolioApp = () => {
  const [selectedProvider, setSelectedProvider] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState('es');

  // Get translation helper
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
      if (!value) return key;
    }
    return value;
  };

  // Scroll Listener for Header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Logic
  const filteredCerts = useMemo(() => {
    return CERTIFICATES_DATA.filter(cert => {
      const matchProvider = selectedProvider === 'ALL' || cert.provider === selectedProvider;
      const matchSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cert.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchProvider && matchSearch;
    });
  }, [selectedProvider, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-indigo-500/30">
      
      {/* --- A. HEADER --- */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-slate-800 py-3' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <a href="/githubpagetest/#" className="text-slate-100 font-bold tracking-tight text-xl">
            INMORTAL<span className="text-cyan-400">_OS</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="/githubpagetest/#sobre-mi" className="text-slate-400 hover:text-white transition-colors">{t('nav.inicio')}</a>
            <a href="/githubpagetest/#experiencia" className="text-slate-400 hover:text-white transition-colors">{t('nav.experiencia')}</a>
            <a href="/githubpagetest/#stack" className="text-slate-400 hover:text-white transition-colors">{t('nav.stack')}</a>
            <a href="/githubpagetest/public/proyectos.html" className="text-slate-400 hover:text-white transition-colors">{t('nav.proyectos')}</a>
            <a href="/githubpagetest/#servicios" className="text-slate-400 hover:text-white transition-colors">{t('nav.servicios')}</a>
            <a href="/githubpagetest/#contacto" className="text-slate-400 hover:text-white transition-colors">{t('nav.contacto')}</a>
            <div className="flex gap-2 ml-4">
              <span 
                onClick={() => setLanguage('es')}
                className={`px-2 py-1 text-xs cursor-pointer rounded transition-all ${language === 'es' ? 'text-cyan-400 border border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                ES
              </span>
              <span 
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs cursor-pointer rounded transition-all ${language === 'en' ? 'text-cyan-400 border border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                EN
              </span>
            </div>
          </nav>
          
          <button className="md:hidden p-2 text-slate-400 hover:text-white flex flex-col gap-1.5 w-8 h-8 justify-center items-center border border-slate-700 rounded hover:border-cyan-400 transition-all">
            <span className="block w-4 h-0.5 bg-slate-300"></span>
            <span className="block w-4 h-0.5 bg-slate-300"></span>
            <span className="block w-4 h-0.5 bg-slate-300"></span>
          </button>
        </div>
      </header>

      <main className="pt-24 pb-20">
        
        {/* --- B. HERO PREMIUM --- */}
        <section className="relative px-4 sm:px-6 py-12 md:py-24 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container mx-auto max-w-4xl relative z-10 text-center">
             <Badge variant="glow" className="mb-6 inline-block">Verified Professional</Badge>
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
               {t('hero.title')} <br />
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 animate-pulse">{t('hero.titleHighlight')}</span>
             </h1>
             <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
               {t('hero.subtitle')}
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button icon={ChevronRight} onClick={() => document.getElementById('explorer').scrollIntoView({behavior: 'smooth'})}>{t('hero.explore')}</Button>
               <Button variant="ghost" icon={ExternalLink}>{t('hero.linkedin')}</Button>
             </div>
          </div>
        </section>

        {/* --- C. TRUST STRIP --- */}
        <section className="border-y border-slate-900 bg-slate-950/50 py-8">
           <div className="container mx-auto px-6 text-center">
             <p className="text-xs uppercase tracking-widest text-slate-600 mb-6 font-semibold">Certified by industry leaders</p>
             <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                {/* Simulated Logos with Text for this demo */}
                <span className="text-xl font-bold text-slate-300">Google Cloud</span>
                <span className="text-xl font-bold text-slate-300">Microsoft</span>
                <span className="text-xl font-bold text-slate-300">IBM</span>
                <span className="text-xl font-bold text-slate-300">AWS</span>
             </div>
           </div>
        </section>

        {/* --- D. CERTIFICATES EXPLORER (CORE) --- */}
        <section id="explorer" className="container mx-auto px-4 sm:px-6 py-20">
          <SectionHeading 
            title={t('certificates.title')} 
            subtitle={t('certificates.subtitle')}
          />

          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
             {/* Tabs / Switcher */}
             <div className="flex p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto max-w-full">
                {['ALL', 'GOOGLE', 'MICROSOFT', 'IBM', 'AWS'].map((prov) => (
                  <button
                    key={prov}
                    onClick={() => setSelectedProvider(prov)}
                    className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                      selectedProvider === prov 
                      ? 'bg-slate-800 text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {prov === 'ALL' ? t('certificates.allProviders') : PROVIDERS[prov].name}
                  </button>
                ))}
             </div>

             {/* Search */}
             <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder={t('certificates.searchPlaceholder')} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-200 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-600"
                />
             </div>
          </div>

          {/* Grid */}
          {filteredCerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCerts.map((cert) => (
                <CertificateCard 
                  key={cert.id} 
                  cert={cert} 
                  onClick={setSelectedCert} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
              <Filter className="mx-auto text-slate-600 mb-4" size={48} />
              <h3 className="text-lg font-medium text-slate-400">{t('certificates.noResults')}</h3>
              <p className="text-slate-600">{t('certificates.noResultsDesc')}</p>
            </div>
          )}
        </section>

        {/* --- G. LEARNING TIMELINE --- */}
        <section id="timeline" className="py-20 bg-slate-900/30 border-y border-slate-900">
           <div className="container mx-auto px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-16">
                 <div>
                    <h2 className="text-3xl font-bold text-white mb-6">{t('timeline.title')}</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                       {t('timeline.subtitle')}
                    </p>
                    <div className="space-y-8">
                       {TIMELINE_EVENTS.map((event, idx) => (
                         <div key={idx} className="relative pl-8 border-l border-slate-800 last:border-0 pb-1">
                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-slate-950" />
                            <span className="text-xs font-mono text-indigo-400 mb-1 block">{event.year}</span>
                            <h4 className="text-white font-bold mb-1">{event.title}</h4>
                            <p className="text-sm text-slate-500">{event.desc}</p>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* --- F. SKILLS MATRIX --- */}
                 <div id="skills">
                    <h2 className="text-3xl font-bold text-white mb-6">{t('skills.title')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {SKILLS_TAXONOMY.map((skill) => (
                         <div key={skill.name} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex items-center gap-4 hover:border-indigo-500/50 transition-colors group">
                            <div className="p-3 bg-slate-900 rounded-lg text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/20 transition-all">
                               <skill.icon size={24} />
                            </div>
                            <div>
                               <h4 className="font-bold text-slate-200">{skill.name}</h4>
                               <span className="text-xs text-slate-500">{skill.count} Certifications Verified</span>
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="mt-8 p-6 bg-gradient-to-r from-indigo-900/20 to-cyan-900/20 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4 mb-2">
                           <CheckCircle className="text-emerald-400" size={20} />
                           <h4 className="font-bold text-white">{t('skills.verificationsPromise')}</h4>
                        </div>
                        <p className="text-sm text-slate-400">
                           {t('skills.verificationsDesc')}
                        </p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="mt-16 pt-10 border-t border-slate-800/50 text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-3 leading-tight">{t('cta.title')}</h2>
            <p className="text-slate-400 text-base leading-relaxed mb-7">
              {t('cta.description')}
            </p>
            <a 
              href="/githubpagetest/public/proyectos.html" 
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-cyan-400/10 border-2 border-cyan-400 rounded-full text-cyan-400 text-sm font-semibold no-underline cursor-pointer transition-all duration-300 hover:bg-cyan-400/20 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(100,255,218,0.3)] active:translate-y-0"
            >
              {t('cta.button')}
              <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="mt-20 py-6 text-center border-t border-slate-900">
          <div className="container mx-auto px-4">
            <p className="text-xs text-slate-600">{t('footer.copyright')}</p>
          </div>
        </footer>

      </main>

      {/* --- MODAL --- */}
      <CertificateModal 
        cert={selectedCert} 
        isOpen={!!selectedCert} 
        onClose={() => setSelectedCert(null)}
        t={t}
      />
    </div>
  );
};

export default PortfolioApp;
