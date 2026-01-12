import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Briefcase, Calendar, MapPin, Moon, Sun, ChevronDown, Menu, X } from 'lucide-react';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<{ isDark: boolean; toggleTheme: () => void } | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);
  return <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(!isDark) }}>{children}</ThemeContext.Provider>;
};

const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be within ThemeProvider');
  return ctx;
};

const Navigation = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const links = [
    { path: '/', label: 'Home' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/tech', label: 'Tech Stack' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-all duration-500">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-500">
            Alejandro Ortiz
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.path} to={l.path} className="relative text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-500">
                {l.label}
                {location.pathname === l.path && <motion.div layoutId="nav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />}
              </Link>
            ))}
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-300">
              {isDark ? <Sun size={20} className="text-slate-300" /> : <Moon size={20} className="text-gray-600" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
              {isDark ? <Sun size={20} className="text-slate-300" /> : <Moon size={20} className="text-gray-600" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600 dark:text-slate-300 transition-colors duration-500">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="md:hidden overflow-hidden">
              <div className="pt-4 pb-2 space-y-2">
                {links.map(l => (
                  <Link key={l.path} to={l.path} onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
                      location.pathname === l.path ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const Home = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-all duration-500">
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-500">Hi, I'm Alejandro</h1>
        <p className="text-2xl text-gray-600 dark:text-slate-300 mb-8 transition-colors duration-500">Front-End Engineer building beautiful, fast, and user-centric interfaces</p>
        <p className="text-lg text-gray-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 transition-colors duration-500">
          Computer Science student at Northeastern University. I specialize in crafting polished, performant user interfaces with React, TypeScript, and modern web technologies.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link to="/projects" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg hover:scale-105">
            View My Work <ArrowRight size={20} />
          </Link>
          <Link to="/contact" className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white font-medium rounded-xl border border-gray-200 dark:border-slate-700 transition-all duration-500 text-center">
            Get In Touch
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6">
          <a href="https://github.com/alejandro-ortiz3" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-500">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/in/alejandroivanortiz" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-500">
            <Linkedin size={24} />
          </a>
          <a href="mailto:oalejandro335@gmail.com" className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-500">
            <Mail size={24} />
          </a>
        </div>
      </motion.div>
    </div>
  </div>
);

const OtherExp = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-all duration-500">
        <button onClick={() => setOpen(!open)} className="w-full p-6 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-500">Other Experience</h2>
          <ChevronDown className={`w-5 h-5 text-gray-500 dark:text-slate-400 transition-all duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="p-6 pt-4 space-y-6 border-t border-gray-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">IT Technician</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Franklin Lakes School District</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">Jun 2023 – Aug 2024 • Franklin Lakes, NJ</p>
                  <ul className="space-y-2 text-gray-600 dark:text-slate-300 text-sm">
                    <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400">•</span><span>Backed up and migrated data for 2,000+ student devices with zero loss across 5 school sites</span></li>
                    <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400">•</span><span>Deployed 150+ classroom tech systems, enhancing learning for 1,500+ students and staff</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Math Tutor</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Mathnasium</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">Jun 2022 – Sep 2022 • Ramsey, NJ</p>
                  <ul className="space-y-2 text-gray-600 dark:text-slate-300 text-sm">
                    <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400">•</span><span>Tutored students across 10 grade levels, including up to college-level mathematics</span></li>
                    <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400">•</span><span>Communicated daily with managers to facilitate student growth and workplace productivity</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Marketing Communications Assistant</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Kollins Communications, Inc.</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">Jun 2021 – Sep 2021 • Ramsey, NJ</p>
                  <ul className="space-y-2 text-gray-600 dark:text-slate-300 text-sm">
                    <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400">•</span><span>Assigned client support in marketing, branding, production, e-media and events for major national clients</span></li>
                    <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400">•</span><span>Supported major national clients, including Verizon and BJ's Wholesale Club</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Soccer Referee</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Ramsey Soccer Association, Inc.</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">Aug 2018 – Nov 2023 • Ramsey, NJ</p>
                  <ul className="space-y-2 text-gray-600 dark:text-slate-300 text-sm">
                    <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400">•</span><span>Nationally certified U.S. Soccer Federation (USSF) referee; officiated recreational games as head referee</span></li>
                    <li className="flex items-start gap-2"><span className="text-blue-600 dark:text-blue-400">•</span><span>Enforced rules and de-escalated conflicts to uphold a safe, respectful atmosphere for players and coaches</span></li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Experience = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12 transition-all duration-500">
    <div className="max-w-4xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-500">Experience</h1>
        <p className="text-xl text-gray-600 dark:text-slate-300 mb-12 transition-colors duration-500">My professional journey</p>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all duration-500 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500">
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-500">Software Engineer Intern, Front-End</h2>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-2 transition-colors duration-500">ViaEngineering</p>
              <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 mb-4 transition-colors duration-500">
                <Calendar size={16} />
                <span className="text-sm">May 2025 – Aug 2025 • Remote</span>
              </div>
            </div>
          </div>
          <ul className="space-y-3 text-gray-600 dark:text-slate-300 transition-colors duration-500">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span>Led end-to-end implementation of an AI-powered PCB design interface using React, TypeScript, and shadcn/ui, integrating dynamic component-driven workflows for interactive board layouts</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span>Established development workflows via isolated feature branches, pull requests, and structured reviews, ensuring reliable deployments and minimizing regressions during iterative feature development</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span>Translated Figma wireframes and design specifications into accessible, high-fidelity interfaces, refining layout, typography, and interactive states for complex engineering workflows</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span>Designed reusable component patterns and layout systems to reduce duplication, enforce consistency, and support long-term scalability of the PCB design platform</span>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {['React', 'TypeScript', 'shadcn/ui', 'Figma', 'Git'].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-sm rounded-full transition-colors duration-500">{tech}</span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 transition-all duration-500">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-500">Education</h2>
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-500">Northeastern University</p>
            <p className="text-gray-600 dark:text-slate-300 transition-colors duration-500">Bachelor of Science in Computer Science</p>
            <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 transition-colors duration-500">
              <Calendar size={16} />
              <span className="text-sm">Expected Graduation: May 2028</span>
            </div>
          </div>
        </div>

        <OtherExp />
      </motion.div>
    </div>
  </div>
);

const Projects = () => {
  const projects = [
    {
      title: 'Portfolio Analytics Engine',
      description: 'A high-performance financial dashboard processing 10,000+ securities with interactive visualizations, achieving 60fps through virtualized scrolling and canvas-based rendering.',
      tech: ['React', 'TypeScript', 'D3.js', 'Canvas API', 'Tailwind CSS'],
      highlights: [
        'Sub-100ms render times with Canvas API optimization',
        'Interactive D3.js correlation matrices with zoom/pan controls',
        'Virtualized table rendering 10,000+ rows smoothly',
        'Real-time performance monitoring dashboard',
      ],
      github: 'https://github.com/alejandro-ortiz3/portfolio-analytics',
    },
    {
      title: 'Collaborative Task Management Platform',
      description: 'An offline-first task management application with real-time synchronization across multiple clients, featuring optimistic UI updates and seamless collaboration.',
      tech: ['React', 'TypeScript', 'Supabase', 'IndexedDB', 'Tailwind CSS'],
      highlights: [
        'Offline-first architecture with IndexedDB persistence',
        'Real-time sync across multiple clients',
        'Optimistic UI updates for instant feedback',
        'Custom React hooks for undo/redo functionality',
      ],
      github: 'https://github.com/alejandro-ortiz3/task-platform',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12 transition-all duration-500">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-500">Projects</h1>
          <p className="text-xl text-gray-600 dark:text-slate-300 mb-12 transition-colors duration-500">Building applications that are beautiful, performant, and user-focused</p>
          <div className="space-y-8">
            {projects.map((project, idx) => (
              <motion.div key={project.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all duration-500">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-500">{project.title}</h2>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-500">
                    <Github size={20} />
                  </a>
                </div>
                <p className="text-gray-600 dark:text-slate-300 mb-6 transition-colors duration-500">{project.description}</p>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-500">Key Features:</h3>
                  <ul className="space-y-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-gray-600 dark:text-slate-300 transition-colors duration-500">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                        <span className="text-sm">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-full font-medium transition-colors duration-500">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const TechStack = () => {
  const skills = [
    { category: 'Frontend Core', techs: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ]},
    { category: 'Frameworks & Styling', techs: [
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' },
      { name: 'Sass', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
      { name: 'Vite', icon: 'https://vitejs.dev/logo.svg' },
    ]},
    { category: 'Visualization & Data', techs: [
      { name: 'D3.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg' },
    ]},
    { category: 'Tools & Workflow', techs: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'npm', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg' },
    ]},
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12 transition-all duration-500">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-500">Tech Stack</h1>
          <p className="text-xl text-gray-600 dark:text-slate-300 mb-12 transition-colors duration-500">Technologies I use to build exceptional user experiences</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((s, idx) => (
              <motion.div key={s.category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all duration-500">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-500">{s.category}</h2>
                <div className="grid grid-cols-4 gap-6">
                  {s.techs.map((t) => (
                    <div key={t.name} className="flex flex-col items-center gap-2 group">
                      <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <img src={t.icon} alt={t.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-slate-400 text-center transition-colors duration-500">{t.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 transition-all duration-500">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-500">What I Focus On</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-500">Performance</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 transition-colors duration-500">60fps animations, optimized rendering, and sub-100ms response times</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-500">Design</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 transition-colors duration-500">Clean interfaces, thoughtful spacing, and beautiful typography</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-500">User Experience</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 transition-colors duration-500">Intuitive flows, accessible to everyone, delightful to use</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Contact = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-12 transition-all duration-500">
    <div className="max-w-4xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-500">Let's Connect</h1>
        <p className="text-xl text-gray-600 dark:text-slate-300 mb-12 transition-colors duration-500">
          Open to collaborating on front-end projects, discussing UI/UX, or just talking about what makes great interfaces great
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="mailto:oalejandro335@gmail.com" className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-500 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-500">Email</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 transition-colors duration-500">Send me a message</p>
              </div>
            </div>
            <p className="text-blue-600 dark:text-blue-400 font-medium transition-colors duration-500">oalejandro335@gmail.com</p>
          </a>
          <a href="https://linkedin.com/in/alejandroivanortiz" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-500 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-500">LinkedIn</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 transition-colors duration-500">Let's connect professionally</p>
              </div>
            </div>
            <p className="text-blue-600 dark:text-blue-400 font-medium transition-colors duration-500">linkedin.com/in/alejandroivanortiz</p>
          </a>
          <a href="https://github.com/alejandro-ortiz3" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-500 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Github className="w-6 h-6 text-gray-900 dark:text-white transition-colors duration-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-500">GitHub</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 transition-colors duration-500">Check out my code</p>
              </div>
            </div>
            <p className="text-blue-600 dark:text-blue-400 font-medium transition-colors duration-500">github.com/alejandro-ortiz3</p>
          </a>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 transition-all duration-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center transition-colors duration-500">
                <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-500">Location</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 transition-colors duration-500">Currently based in</p>
              </div>
            </div>
            <p className="text-gray-900 dark:text-white font-medium transition-colors duration-500">New York, NY & Boston, MA</p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tech" element={<TechStack />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;