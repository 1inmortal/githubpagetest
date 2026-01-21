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
  {
    id: 'c1',
    title: 'Professional Cloud Architect',
    provider: 'GOOGLE',
    issueDate: '2023-11-15',
    expirationDate: '2025-11-15',
    credentialId: 'GCP-PCA-88291',
    verificationUrl: '#',
    skills: ['Architecture', 'Kubernetes', 'Security'],
    level: 'Expert',
    area: 'Cloud',
    featured: true,
    description: 'Enables organizations to leverage Google Cloud technologies. Through an understanding of cloud architecture and Google Cloud Platform, this individual can design, develop, and manage robust, secure, scalable, highly available, and dynamic solutions to drive business objectives.'
  },
  {
    id: 'c2',
    title: 'Azure AI Engineer Associate',
    provider: 'MICROSOFT',
    issueDate: '2024-01-20',
    credentialId: 'MS-AI-102-X99',
    verificationUrl: '#',
    skills: ['NLP', 'Computer Vision', 'Generative AI'],
    level: 'Associate',
    area: 'AI',
    featured: true,
    description: 'Design and implement AI solutions using Azure Cognitive Services and Azure Applied AI Services. Responsibilities include analyzing requirements for AI solutions, recommending appropriate tools and technologies, and implementing solutions that meet scalability and performance requirements.'
  },
  {
    id: 'c3',
    title: 'Data Science Professional',
    provider: 'IBM',
    issueDate: '2023-08-10',
    credentialId: 'IBM-DS-PRO-442',
    verificationUrl: '#',
    skills: ['Python', 'SQL', 'Data Visualization', 'Machine Learning'],
    level: 'Professional',
    area: 'Data',
    featured: false,
    description: 'Demonstrated proficiency in Data Science topics including open source tools and libraries, methodologies, Python, databases, SQL, data visualization, data analysis, and machine learning.'
  },
  {
    id: 'c4',
    title: 'TensorFlow Developer',
    provider: 'GOOGLE',
    issueDate: '2023-05-05',
    credentialId: 'TF-DEV-2023',
    verificationUrl: '#',
    skills: ['Deep Learning', 'TensorFlow', 'Neural Networks'],
    level: 'Specialty',
    area: 'AI',
    featured: false,
    description: 'Validates foundational knowledge of integrating machine learning into tools and applications. Tested ability to run TensorFlow models using Computer Vision, Convolutional Neural Networks, and Natural Language Processing.'
  },
  {
    id: 'c5',
    title: 'Cybersecurity Analyst',
    provider: 'IBM',
    issueDate: '2022-12-12',
    credentialId: 'IBM-CYBER-99',
    verificationUrl: '#',
    skills: ['Network Security', 'Threat Intelligence', 'Compliance'],
    level: 'Analyst',
    area: 'Security',
    featured: false,
    description: 'Develops knowledge of cybersecurity analyst tools including data protection; endpoint protection; SIEM; and systems and network fundamentals.'
  },
  {
    id: 'c6',
    title: 'DevOps Engineer Expert',
    provider: 'MICROSOFT',
    issueDate: '2023-10-01',
    credentialId: 'AZ-400-OPS',
    verificationUrl: '#',
    skills: ['CI/CD', 'Docker', 'Infrastructure as Code'],
    level: 'Expert',
    area: 'DevOps',
    featured: true,
    description: 'Subject matter expertise working with people, processes, and technologies to continuously deliver business value.'
  }
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

const CertificateModal = ({ cert, isOpen, onClose }) => {
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
                 <span className={`text-sm font-medium ${theme.color}`}>{theme.name} • {cert.level}</span>
               </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Description</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{cert.description}</p>
              </div>
              <div>
                 <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Skills Validated</h4>
                 <div className="flex flex-wrap gap-2">
                   {cert.skills.map(s => (
                     <Badge key={s} variant="outline">{s}</Badge>
                   ))}
                 </div>
              </div>
            </div>

            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 space-y-4">
               <div className="space-y-1">
                 <span className="text-xs text-slate-500 block">Issued</span>
                 <div className="flex items-center gap-2 text-slate-300 text-sm">
                   <Calendar size={14} /> {cert.issueDate}
                 </div>
               </div>
               {cert.expirationDate && (
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 block">Expires</span>
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Calendar size={14} /> {cert.expirationDate}
                    </div>
                  </div>
               )}
               <div className="space-y-1">
                 <span className="text-xs text-slate-500 block">Credential ID</span>
                 <div className="flex items-center gap-2 text-slate-300 font-mono text-xs break-all">
                   <Hash size={14} /> {cert.credentialId}
                 </div>
               </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-800">
             <Button className="w-full sm:w-auto" icon={ExternalLink}>Verify Credential</Button>
             <Button variant="secondary" className="w-full sm:w-auto" icon={Share2}>Share on LinkedIn</Button>
             <Button variant="ghost" className="w-full sm:w-auto" icon={Download}>Download PDF</Button>
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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="text-slate-100 font-bold tracking-tight">Alex Dev<span className="text-indigo-400">.certs</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#explorer" className="hover:text-white transition-colors">Certificates</a>
            <a href="#timeline" className="hover:text-white transition-colors">Timeline</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <Button variant="secondary" className="px-4 py-1.5 h-auto text-xs">Download CV</Button>
          </nav>
          
          <button className="md:hidden p-2 text-slate-400 hover:text-white">
            <Menu size={24} />
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
               Building Authority through <br />
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 animate-pulse">Continuous Mastery</span>
             </h1>
             <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
               A verifiable digital ledger of my professional journey across Cloud Architecture, AI Engineering, and Data Science.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button icon={ChevronRight} onClick={() => document.getElementById('explorer').scrollIntoView({behavior: 'smooth'})}>Explore Collection</Button>
               <Button variant="ghost" icon={ExternalLink}>View LinkedIn Profile</Button>
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
            title="Certificate Vault" 
            subtitle="Browse my active credentials verified directly by issuing organizations."
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
                    {prov === 'ALL' ? 'All Providers' : PROVIDERS[prov].name}
                  </button>
                ))}
             </div>

             {/* Search */}
             <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Filter by skill or title..." 
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
              <h3 className="text-lg font-medium text-slate-400">No certificates found</h3>
              <p className="text-slate-600">Try adjusting your filters or search query.</p>
            </div>
          )}
        </section>

        {/* --- G. LEARNING TIMELINE --- */}
        <section id="timeline" className="py-20 bg-slate-900/30 border-y border-slate-900">
           <div className="container mx-auto px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-16">
                 <div>
                    <h2 className="text-3xl font-bold text-white mb-6">Learning Path</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                       My educational journey reflects a commitment to staying ahead of the technology curve.
                       Starting from web fundamentals to mastering complex cloud architectures and AI systems.
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
                    <h2 className="text-3xl font-bold text-white mb-6">Competency Matrix</h2>
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
                           <h4 className="font-bold text-white">Verification Promise</h4>
                        </div>
                        <p className="text-sm text-slate-400">
                           All certificates displayed here are cryptographically signed or verifiable via unique credential IDs on the provider's official portal.
                        </p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- I. FOOTER --- */}
        <footer className="pt-20 pb-8 text-center">
           <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-white mb-6">Ready to collaborate?</h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                 Looking for expertise in Cloud Architecture or AI implementation? Let's verify how I can add value to your team.
              </p>
              <div className="flex justify-center gap-4 mb-16">
                 <Button>Contact Me</Button>
                 <Button variant="secondary" icon={Share2}>Share Portfolio</Button>
              </div>
              
              <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                 <p>© 2024 Alex Developer. All rights reserved.</p>
                 <div className="flex gap-6">
                    <a href="#" className="hover:text-slate-400">Privacy</a>
                    <a href="#" className="hover:text-slate-400">Terms</a>
                    <a href="#" className="hover:text-slate-400">Credential Policy</a>
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
      />
    </div>
  );
};

export default PortfolioApp;
