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
  GOOGLE: { name: 'Google Cloud', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', glow: 'shadow-blue-500/20' },
  MICROSOFT: { name: 'Microsoft', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', glow: 'shadow-cyan-500/20' },
  IBM: { name: 'IBM', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', glow: 'shadow-indigo-500/20' },
  AWS: { name: 'AWS', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', glow: 'shadow-orange-500/20' }
};

const CERTIFICATES_DATA = [
  // 1. Fundamentos de Computación y TI
  {
    id: 'c1',
    title: 'Introduction to Computers',
    provider: 'MICROSOFT',
    issueDate: '2025-01-15',
    credentialId: 'COURSERA-INTRO-COMP',
    verificationUrl: 'https://coursera.org/share/adb31f5906c1dea242868c483ac59664',
    skills: ['Computer Basics', 'Hardware', 'Software', 'IT Fundamentals'],
    level: 'Beginner',
    area: 'IT Fundamentals',
    featured: false,
    description: {
      en: 'Introduction to computers covering basic concepts of hardware, software, and computing systems. Provides foundational knowledge for understanding how computers work and their role in modern technology.',
      es: 'Introducción a las computadoras que cubre conceptos básicos de hardware, software y sistemas informáticos. Proporciona conocimientos fundamentales para comprender cómo funcionan las computadoras y su papel en la tecnología moderna.'
    }
  },
  {
    id: 'c2',
    title: 'Essential Aspects of Software, Hardware, and Data Backup',
    provider: 'MICROSOFT',
    issueDate: '2025-02-10',
    credentialId: 'COURSERA-SHDB-BACKUP',
    verificationUrl: 'https://coursera.org/share/8b626890d0b3e6056f6d80df58802724',
    skills: ['Software Management', 'Hardware Configuration', 'Data Backup', 'System Maintenance'],
    level: 'Beginner',
    area: 'IT Fundamentals',
    featured: false,
    description: {
      en: 'Comprehensive overview of software and hardware essentials, including data backup strategies and best practices for maintaining system integrity and data security.',
      es: 'Visión general completa de los aspectos esenciales de software y hardware, incluyendo estrategias de respaldo de datos y mejores prácticas para mantener la integridad del sistema y la seguridad de los datos.'
    }
  },
  
  // 2. Ingeniería de Software y Desarrollo
  {
    id: 'c3',
    title: 'Introduction to Software Engineering',
    provider: 'IBM',
    issueDate: '2025-03-05',
    credentialId: 'COURSERA-IBM-SE-INTRO',
    verificationUrl: 'https://coursera.org/share/7491949eacd3e6adc48e06e4c03fef39',
    skills: ['Software Engineering', 'SDLC', 'Requirements Analysis', 'System Design'],
    level: 'Intermediate',
    area: 'Software Development',
    featured: true,
    description: {
      en: 'Foundational course covering software engineering principles, methodologies, and best practices. Introduces the software development lifecycle, requirements gathering, and system design concepts.',
      es: 'Curso fundamental que cubre principios de ingeniería de software, metodologías y mejores prácticas. Introduce el ciclo de vida del desarrollo de software, recopilación de requisitos y conceptos de diseño de sistemas.'
    }
  },
  {
    id: 'c4',
    title: 'Introduction to HTML, CSS, & JavaScript',
    provider: 'IBM',
    issueDate: '2025-03-20',
    credentialId: 'COURSERA-IBM-WEB-DEV',
    verificationUrl: 'https://coursera.org/share/af180c47d747d439a930e625181bf532',
    skills: ['HTML', 'CSS', 'JavaScript', 'Web Development', 'Frontend'],
    level: 'Beginner',
    area: 'Web Development',
    featured: true,
    description: {
      en: 'Comprehensive introduction to web development fundamentals. Covers HTML structure, CSS styling, and JavaScript programming to build interactive and responsive web applications.',
      es: 'Introducción completa a los fundamentos del desarrollo web. Cubre estructura HTML, estilos CSS y programación JavaScript para construir aplicaciones web interactivas y responsivas.'
    }
  },
  {
    id: 'c5',
    title: 'Full Stack Software Developer Assessment',
    provider: 'IBM',
    issueDate: '2025-04-12',
    credentialId: 'COURSERA-IBM-FULLSTACK',
    verificationUrl: 'https://coursera.org/share/c62f0378affc1863cc71ef618795c52d',
    skills: ['Full Stack Development', 'Frontend', 'Backend', 'Database', 'API Development'],
    level: 'Professional',
    area: 'Software Development',
    featured: true,
    description: {
      en: 'Professional assessment validating comprehensive full-stack development skills. Demonstrates proficiency in both frontend and backend technologies, database management, and API development.',
      es: 'Evaluación profesional que valida habilidades integrales de desarrollo full-stack. Demuestra competencia en tecnologías frontend y backend, gestión de bases de datos y desarrollo de APIs.'
    }
  },
  
  // 3. Ciencia de Datos, Python e Inteligencia Artificial
  {
    id: 'c6',
    title: 'Python for Data Science, AI & Development',
    provider: 'IBM',
    issueDate: '2025-05-01',
    credentialId: 'COURSERA-IBM-PYTHON-DS',
    verificationUrl: 'https://coursera.org/share/b2ce7a15804584829acd19483653b484',
    skills: ['Python', 'Data Science', 'AI Development', 'Machine Learning', 'Data Analysis'],
    level: 'Intermediate',
    area: 'Data Science',
    featured: true,
    description: {
      en: 'Comprehensive Python programming course focused on data science and AI applications. Covers data manipulation, analysis, visualization, and machine learning fundamentals using Python libraries.',
      es: 'Curso integral de programación Python enfocado en aplicaciones de ciencia de datos e IA. Cubre manipulación de datos, análisis, visualización y fundamentos de aprendizaje automático utilizando bibliotecas de Python.'
    }
  },
  {
    id: 'c7',
    title: 'Generative AI: Elevate your Software Development Career',
    provider: 'IBM',
    issueDate: '2025-06-15',
    credentialId: 'COURSERA-IBM-GEN-AI',
    verificationUrl: 'https://coursera.org/share/a568cdf63b4ea24dc505ac274c1ca750',
    skills: ['Generative AI', 'LLMs', 'AI Integration', 'Software Development', 'AI Tools'],
    level: 'Advanced',
    area: 'AI',
    featured: true,
    description: {
      en: 'Advanced course on integrating generative AI and large language models into software development workflows. Covers practical applications, best practices, and career advancement strategies in AI-enhanced development.',
      es: 'Curso avanzado sobre integración de IA generativa y modelos de lenguaje grandes en flujos de trabajo de desarrollo de software. Cubre aplicaciones prácticas, mejores prácticas y estrategias de avance profesional en desarrollo potenciado por IA.'
    }
  },
  
  // 4. Control de Versiones y Colaboración
  {
    id: 'c8',
    title: 'Getting Started with Git and GitHub',
    provider: 'IBM',
    issueDate: '2025-04-25',
    credentialId: 'COURSERA-IBM-GIT-GITHUB',
    verificationUrl: 'https://coursera.org/share/2c7de9916c423d2e3d3c14b6f93fbf16',
    skills: ['Git', 'GitHub', 'Version Control', 'Collaboration', 'DevOps'],
    level: 'Beginner',
    area: 'DevOps',
    featured: false,
    description: {
      en: 'Essential course on version control using Git and GitHub. Covers repository management, branching strategies, collaboration workflows, and best practices for team-based software development.',
      es: 'Curso esencial sobre control de versiones usando Git y GitHub. Cubre gestión de repositorios, estrategias de ramificación, flujos de trabajo colaborativos y mejores prácticas para desarrollo de software en equipo.'
    }
  },
  
  // 5. Redes y Seguridad Informática
  {
    id: 'c9',
    title: 'Connect and Protect: Networks and Network Security',
    provider: 'GOOGLE',
    issueDate: '2025-05-20',
    credentialId: 'COURSERA-GOOGLE-NET-SEC',
    verificationUrl: 'https://coursera.org/share/357940967d5a070c1c05f6cf31521a8a',
    skills: ['Networking', 'Network Security', 'Infrastructure', 'Security Protocols', 'Network Design'],
    level: 'Intermediate',
    area: 'Security',
    featured: true,
    description: {
      en: 'Comprehensive course on network architecture and security. Covers network design principles, security protocols, threat mitigation, and best practices for protecting network infrastructure.',
      es: 'Curso integral sobre arquitectura de redes y seguridad. Cubre principios de diseño de redes, protocolos de seguridad, mitigación de amenazas y mejores prácticas para proteger la infraestructura de red.'
    }
  },
  {
    id: 'c10',
    title: 'Introduction to Secure Networking',
    provider: 'MICROSOFT',
    issueDate: '2025-06-01',
    credentialId: 'COURSERA-MS-SEC-NET',
    verificationUrl: 'https://coursera.org/share/07cac836cd2b430798b60fc00d56f633',
    skills: ['Secure Networking', 'Network Protocols', 'Security Best Practices', 'Threat Detection'],
    level: 'Intermediate',
    area: 'Security',
    featured: false,
    description: {
      en: 'Introduction to secure networking principles and practices. Covers network security fundamentals, secure protocol implementation, and strategies for protecting network communications.',
      es: 'Introducción a principios y prácticas de redes seguras. Cubre fundamentos de seguridad de red, implementación de protocolos seguros y estrategias para proteger las comunicaciones de red.'
    }
  },
  {
    id: 'c11',
    title: 'Foundations of Cybersecurity',
    provider: 'GOOGLE',
    issueDate: '2025-06-10',
    credentialId: 'COURSERA-GOOGLE-CYBERSEC',
    verificationUrl: 'https://coursera.org/share/6b22fbd49ea42bb1745c29ad95c6e946',
    skills: ['Cybersecurity', 'Security Fundamentals', 'Threat Analysis', 'Risk Management', 'Security Policies'],
    level: 'Intermediate',
    area: 'Security',
    featured: true,
    description: {
      en: 'Foundational course on cybersecurity principles and practices. Covers threat landscape, security frameworks, risk assessment, and implementation of security controls to protect organizational assets.',
      es: 'Curso fundamental sobre principios y prácticas de ciberseguridad. Cubre el panorama de amenazas, marcos de seguridad, evaluación de riesgos e implementación de controles de seguridad para proteger los activos organizacionales.'
    }
  },
  {
    id: 'c12',
    title: 'Play It Safe: Manage Security Risks',
    provider: 'GOOGLE',
    issueDate: '2025-06-25',
    credentialId: 'COURSERA-GOOGLE-RISK-MGMT',
    verificationUrl: 'https://coursera.org/share/d651519cbbe7c2051b9e9d977623b21b',
    skills: ['Risk Management', 'Security Assessment', 'Vulnerability Management', 'Incident Response', 'Security Controls'],
    level: 'Intermediate',
    area: 'Security',
    featured: false,
    description: {
      en: 'Course on security risk management and mitigation strategies. Covers risk assessment methodologies, vulnerability identification, security control implementation, and incident response planning.',
      es: 'Curso sobre gestión de riesgos de seguridad y estrategias de mitigación. Cubre metodologías de evaluación de riesgos, identificación de vulnerabilidades, implementación de controles de seguridad y planificación de respuesta a incidentes.'
    }
  }
];

const SKILLS_TAXONOMY = [
  { name: 'Software Development', count: 3, icon: Terminal },
  { name: 'Web Development', count: 1, icon: Terminal },
  { name: 'Data Science & AI', count: 2, icon: Cpu },
  { name: 'Cybersecurity', count: 4, icon: ShieldCheck },
  { name: 'IT Fundamentals', count: 2, icon: Database },
  { name: 'DevOps & Collaboration', count: 1, icon: Cloud },
];

const TIMELINE_EVENTS = [
  { year: '2025', title: 'Senior AI Specialist', desc: 'Focus on Generative AI & LLMs integration.' },
  { year: '2024', title: 'Cloud Architecture Shift', desc: 'Achieved Google & Microsoft Expert levels.' },
  { year: '2023', title: 'Data Science Foundation', desc: 'Intensive Python & SQL mastery with IBM.' },
  { year: '2022', title: 'Full Stack Beginnings', desc: 'Started journey with Web Development.' },
];

// --- TRANSLATIONS ---
const translations = {
  es: {
    nav: {
      sobreMi: "Sobre Mí",
      experiencia: "Experiencia",
      stack: "Stack",
      proyectos: "Proyectos",
      servicios: "Servicios",
      contacto: "Contacto"
    },
    hero: {
      badge: "Profesional Verificado",
      title: "Construyendo Autoridad a través de",
      titleHighlight: "Dominio Continuo",
      subtitle: "Un registro digital verificable de mi trayectoria profesional en Arquitectura Cloud, Ingeniería de IA y Ciencia de Datos.",
      explore: "Explorar Colección",
      linkedin: "Ver Perfil de LinkedIn"
    },
    trust: {
      subtitle: "Certificado por líderes de la industria"
    },
    explorer: {
      title: "Bóveda de Certificados",
      subtitle: "Explora mis credenciales activas verificadas directamente por las organizaciones emisoras.",
      allProviders: "Todos los Proveedores",
      searchPlaceholder: "Filtrar por habilidad o título...",
      noResults: "No se encontraron certificados",
      noResultsDesc: "Intenta ajustar tus filtros o búsqueda."
    },
    timeline: {
      title: "Ruta de Aprendizaje",
      description: "Mi trayectoria educativa refleja un compromiso con mantenerme a la vanguardia de la tecnología. Desde fundamentos web hasta dominar arquitecturas cloud complejas y sistemas de IA."
    },
    skills: {
      title: "Matriz de Competencias",
      verified: "Certificaciones Verificadas",
      promise: "Promesa de Verificación",
      promiseDesc: "Todos los certificados mostrados aquí están firmados criptográficamente o son verificables mediante IDs únicos de credenciales en el portal oficial del proveedor."
    },
    modal: {
      description: "Descripción",
      skillsValidated: "Habilidades Validadas",
      issued: "Emitido",
      expires: "Expira",
      credentialId: "ID de Credencial",
      verifyCredential: "Verificar Credencial",
      shareLinkedIn: "Compartir en LinkedIn",
      downloadPDF: "Descargar PDF",
      level: {
        beginner: "Principiante",
        intermediate: "Intermedio",
        advanced: "Avanzado",
        professional: "Profesional",
        expert: "Experto",
        specialty: "Especialidad",
        analyst: "Analista"
      }
    },
    footer: {
      title: "¿Listo para colaborar?",
      subtitle: "¿Buscas experiencia en Arquitectura Cloud o implementación de IA? Verifiquemos cómo puedo agregar valor a tu equipo.",
      contact: "Contáctame",
      share: "Compartir Portfolio",
      projects: "Ver Proyectos",
      copyright: "© 2026 INMORTAL_OS. Todos los derechos reservados.",
      privacy: "Privacidad",
      terms: "Términos",
      credential: "Política de Credenciales"
    }
  },
  en: {
    nav: {
      sobreMi: "About Me",
      experiencia: "Experience",
      stack: "Stack",
      proyectos: "Projects",
      servicios: "Services",
      contacto: "Contact"
    },
    hero: {
      badge: "Verified Professional",
      title: "Building Authority through",
      titleHighlight: "Continuous Mastery",
      subtitle: "A verifiable digital ledger of my professional journey across Cloud Architecture, AI Engineering, and Data Science.",
      explore: "Explore Collection",
      linkedin: "View LinkedIn Profile"
    },
    trust: {
      subtitle: "Certified by industry leaders"
    },
    explorer: {
      title: "Certificate Vault",
      subtitle: "Browse my active credentials verified directly by issuing organizations.",
      allProviders: "All Providers",
      searchPlaceholder: "Filter by skill or title...",
      noResults: "No certificates found",
      noResultsDesc: "Try adjusting your filters or search query."
    },
    timeline: {
      title: "Learning Path",
      description: "My educational journey reflects a commitment to staying ahead of the technology curve. Starting from web fundamentals to mastering complex cloud architectures and AI systems."
    },
    skills: {
      title: "Competency Matrix",
      verified: "Certifications Verified",
      promise: "Verification Promise",
      promiseDesc: "All certificates displayed here are cryptographically signed or verifiable via unique credential IDs on the provider's official portal."
    },
    modal: {
      description: "Description",
      skillsValidated: "Skills Validated",
      issued: "Issued",
      expires: "Expires",
      credentialId: "Credential ID",
      verifyCredential: "Verify Credential",
      shareLinkedIn: "Share on LinkedIn",
      downloadPDF: "Download PDF",
      level: {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        professional: "Professional",
        expert: "Expert",
        specialty: "Specialty",
        analyst: "Analyst"
      }
    },
    footer: {
      title: "Ready to collaborate?",
      subtitle: "Looking for expertise in Cloud Architecture or AI implementation? Let's verify how I can add value to your team.",
      contact: "Contact Me",
      share: "Share Portfolio",
      projects: "View Projects",
      copyright: "© 2026 INMORTAL_OS. All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      credential: "Credential Policy"
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

// 2. NAVIGATION LINK COMPONENT
const NavLink = ({ href, children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={href}
      onClick={onClick}
      style={{
        fontSize: '0.9rem',
        fontWeight: 500,
        color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
        position: 'relative',
        textDecoration: 'none',
        transition: 'color 0.3s',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <span style={{
        position: 'absolute',
        width: isHovered ? '100%' : '0',
        height: '1px',
        bottom: '-4px',
        left: 0,
        background: '#8b5cf6',
        transition: 'width 0.3s'
      }} />
    </a>
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

const CertificateModal = ({ cert, isOpen, onClose, translations: t, language }) => {
  if (!isOpen || !cert || !t) return null;
  const theme = PROVIDERS[cert.provider];
  const description = typeof cert.description === 'object' ? cert.description[language] || cert.description.en : cert.description;

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
                 <span className={`text-sm font-medium ${theme.color}`}>
                   {theme.name} • {t.modal.level[cert.level.toLowerCase()] || cert.level}
                 </span>
               </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">{t.modal.description}</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
              </div>
              <div>
                 <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">{t.modal.skillsValidated}</h4>
                 <div className="flex flex-wrap gap-2">
                   {cert.skills.map(s => (
                     <Badge key={s} variant="outline">{s}</Badge>
                   ))}
                 </div>
              </div>
            </div>

            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 space-y-4">
               <div className="space-y-1">
                 <span className="text-xs text-slate-500 block">{t.modal.issued}</span>
                 <div className="flex items-center gap-2 text-slate-300 text-sm">
                   <Calendar size={14} /> {cert.issueDate}
                 </div>
               </div>
               {cert.expirationDate && (
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 block">{t.modal.expires}</span>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Calendar size={14} /> {cert.expirationDate}
                    </div>
                  </div>
               )}
               <div className="space-y-1">
                 <span className="text-xs text-slate-500 block">{t.modal.credentialId}</span>
                 <div className="flex items-center gap-2 text-slate-300 font-mono text-xs break-all">
                   <Hash size={14} /> {cert.credentialId}
                 </div>
               </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-800">
             <Button 
               className="w-full sm:w-auto" 
               icon={ExternalLink}
               onClick={() => window.open(cert.verificationUrl, '_blank', 'noopener,noreferrer')}
             >
               {t.modal.verifyCredential}
             </Button>
             <Button variant="secondary" className="w-full sm:w-auto" icon={Share2}>{t.modal.shareLinkedIn}</Button>
             <Button variant="ghost" className="w-full sm:w-auto" icon={Download}>{t.modal.downloadPDF}</Button>
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

// 2.5. LANGUAGE TOGGLE COMPONENT
const LanguageToggle = ({ currentLang, onLanguageChange }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      marginLeft: '20px'
    }}>
      <span
        onClick={() => onLanguageChange('es')}
        style={{
          padding: '4px 8px',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          color: currentLang === 'es' ? '#8b5cf6' : 'rgba(255, 255, 255, 0.6)',
          cursor: 'pointer',
          transition: '0.3s',
          border: `1px solid ${currentLang === 'es' ? '#8b5cf6' : 'transparent'}`,
          borderRadius: '4px'
        }}
        onMouseEnter={(e) => {
          if (currentLang !== 'es') e.target.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          if (currentLang !== 'es') e.target.style.color = 'rgba(255, 255, 255, 0.6)';
        }}
      >
        ES
      </span>
      <span
        onClick={() => onLanguageChange('en')}
        style={{
          padding: '4px 8px',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          color: currentLang === 'en' ? '#8b5cf6' : 'rgba(255, 255, 255, 0.6)',
          cursor: 'pointer',
          transition: '0.3s',
          border: `1px solid ${currentLang === 'en' ? '#8b5cf6' : 'transparent'}`,
          borderRadius: '4px'
        }}
        onMouseEnter={(e) => {
          if (currentLang !== 'en') e.target.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          if (currentLang !== 'en') e.target.style.color = 'rgba(255, 255, 255, 0.6)';
        }}
      >
        EN
      </span>
    </div>
  );
};

// 3. MAIN APPLICATION
const PortfolioApp = () => {
  const [selectedProvider, setSelectedProvider] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [language, setLanguage] = useState(() => {
    // Cargar idioma desde localStorage o detectar del navegador
    const saved = localStorage.getItem('preferredLanguage');
    if (saved) return saved;
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' ? 'es' : 'en';
  });

  const t = translations[language];

  // Función para cambiar idioma
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.setAttribute('lang', lang);
  };

  // Actualizar lang del documento cuando cambia el idioma
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Scroll Listener for Header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '20px 0',
        background: 'rgba(5,5,5,0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.3s'
      }}>
        <div className="container mx-auto px-4 sm:px-6" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px'
        }}>
          <a href="#" style={{
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '-0.05em',
            color: '#f5f5f5',
            textDecoration: 'none'
          }}>
            INMORTAL<span style={{ color: '#8b5cf6' }}>_OS</span>
          </a>
          
          <nav style={{
            display: isMobile ? 'none' : 'flex',
            gap: '30px',
            alignItems: 'center'
          }}>
            <NavLink href="../../../index.html">{t.nav.sobreMi}</NavLink>
            <NavLink href="#experiencia">{t.nav.experiencia}</NavLink>
            <NavLink href="#stack">{t.nav.stack}</NavLink>
            <NavLink href="#proyectos">{t.nav.proyectos}</NavLink>
            <NavLink href="#servicios">{t.nav.servicios}</NavLink>
            <NavLink href="#contacto">{t.nav.contacto}</NavLink>
            <LanguageToggle currentLang={language} onLanguageChange={handleLanguageChange} />
          </nav>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: isMobile ? 'flex' : 'none',
              flexDirection: 'column',
              gap: '4px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}
            aria-label="Toggle menu"
          >
            <span style={{
              width: '24px',
              height: '2px',
              background: 'rgba(255, 255, 255, 0.6)',
              transition: 'all 0.3s',
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: 'rgba(255, 255, 255, 0.6)',
              transition: 'all 0.3s',
              opacity: isMobileMenuOpen ? 0 : 1
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: 'rgba(255, 255, 255, 0.6)',
              transition: 'all 0.3s',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
            }} />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(5,5,5,0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <NavLink href="../../../index.html" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.sobreMi}</NavLink>
            <NavLink href="#experiencia" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.experiencia}</NavLink>
            <NavLink href="#stack" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.stack}</NavLink>
            <NavLink href="#proyectos" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.proyectos}</NavLink>
            <NavLink href="#servicios" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.servicios}</NavLink>
            <NavLink href="#contacto" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.contacto}</NavLink>
            <div style={{ paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <LanguageToggle currentLang={language} onLanguageChange={handleLanguageChange} />
            </div>
          </div>
        )}
      </header>

      <main className="pt-24 pb-20">
        
        {/* --- B. HERO PREMIUM --- */}
        <section className="relative px-4 sm:px-6 py-12 md:py-24 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container mx-auto max-w-4xl relative z-10 text-center">
             <Badge variant="glow" className="mb-6 inline-block">{t.hero.badge}</Badge>
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
               {t.hero.title} <br />
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 animate-pulse">{t.hero.titleHighlight}</span>
             </h1>
             <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
               {t.hero.subtitle}
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button icon={ChevronRight} onClick={() => document.getElementById('explorer').scrollIntoView({behavior: 'smooth'})}>{t.hero.explore}</Button>
               <Button variant="ghost" icon={ExternalLink}>{t.hero.linkedin}</Button>
             </div>
          </div>
        </section>

        {/* --- C. TRUST STRIP --- */}
        <section className="border-y border-slate-900 bg-slate-950/50 py-8">
           <div className="container mx-auto px-6 text-center">
             <p className="text-xs uppercase tracking-widest text-slate-600 mb-6 font-semibold">{t.trust.subtitle}</p>
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
            title={t.explorer.title} 
            subtitle={t.explorer.subtitle}
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
                    {prov === 'ALL' ? t.explorer.allProviders : PROVIDERS[prov].name}
                  </button>
                ))}
             </div>

             {/* Search */}
             <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder={t.explorer.searchPlaceholder} 
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
              <h3 className="text-lg font-medium text-slate-400">{t.explorer.noResults}</h3>
              <p className="text-slate-600">{t.explorer.noResultsDesc}</p>
            </div>
          )}
        </section>

        {/* --- G. LEARNING TIMELINE --- */}
        <section id="timeline" className="py-20 bg-slate-900/30 border-y border-slate-900">
           <div className="container mx-auto px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-16">
                 <div>
                    <h2 className="text-3xl font-bold text-white mb-6">{t.timeline.title}</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                       {t.timeline.description}
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
                    <h2 className="text-3xl font-bold text-white mb-6">{t.skills.title}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {SKILLS_TAXONOMY.map((skill) => (
                         <div key={skill.name} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex items-center gap-4 hover:border-indigo-500/50 transition-colors group">
                            <div className="p-3 bg-slate-900 rounded-lg text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/20 transition-all">
                               <skill.icon size={24} />
                            </div>
                            <div>
                               <h4 className="font-bold text-slate-200">{skill.name}</h4>
                               <span className="text-xs text-slate-500">{skill.count} {t.skills.verified}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="mt-8 p-6 bg-gradient-to-r from-indigo-900/20 to-cyan-900/20 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4 mb-2">
                           <CheckCircle className="text-emerald-400" size={20} />
                           <h4 className="font-bold text-white">{t.skills.promise}</h4>
                        </div>
                        <p className="text-sm text-slate-400">
                           {t.skills.promiseDesc}
                        </p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- I. FOOTER --- */}
        <footer className="pt-20 pb-8 text-center">
           <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-white mb-6">{t.footer.title}</h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                 {t.footer.subtitle}
              </p>
              <div className="flex justify-center gap-4 mb-16">
                 <Button>{t.footer.contact}</Button>
                 <Button variant="secondary" icon={Share2}>{t.footer.share}</Button>
                 <Button 
                   variant="primary" 
                   icon={ExternalLink}
                   onClick={() => {
                     // Ruta relativa desde certificates-app hacia public/proyectos.html
                     window.location.href = '../../public/proyectos.html';
                   }}
                 >
                   {t.footer.projects}
                 </Button>
              </div>
              
              <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                 <p>{t.footer.copyright}</p>
                 <div className="flex gap-6">
                    <a href="#" className="hover:text-slate-400">{t.footer.privacy}</a>
                    <a href="#" className="hover:text-slate-400">{t.footer.terms}</a>
                    <a href="#" className="hover:text-slate-400">{t.footer.credential}</a>
                 </div>
              </div>
           </div>
        </footer>

      </main>

      {/* --- MODAL --- */}
      <CertificateModal 
        cert={selectedCert} 
        isOpen={!!selectedCert} 
        onClose={() => setSelectedCert(null)}
        translations={t}
        language={language}
      />
    </div>
  );
};

export default PortfolioApp;
