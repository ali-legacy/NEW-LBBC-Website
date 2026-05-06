import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, 
  Facebook, 
  Phone, 
  Mail, 
  Search, 
  Menu, 
  X, 
  ChevronDown 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { 
      name: t.nav.about, 
      href: '/about',
      dropdown: [
        { name: t.nav.mission, href: '/about#mission' },
        { name: t.nav.leadership, href: '/about#leadership' },
        { name: t.nav.board, href: '/about#board' },
        { name: t.nav.partners, href: '/about#partners' },
      ]
    },
    { 
      name: t.nav.membership, 
      href: '/membership',
      dropdown: [
        { name: t.nav.value, href: '/membership#value' },
        { name: t.nav.tiers, href: '/membership#tiers' },
        { name: t.nav.whyJoin, href: '/membership#why-join' },
      ]
    },
    { 
      name: t.nav.events, 
      href: '/events',
      dropdown: [
        { name: t.nav.upcoming, href: '/events#upcoming' },
        { name: t.nav.archive, href: '/events#archive' },
      ]
    },
    { name: t.nav.directory, href: '/directory' },
    { 
      name: t.nav.resources, 
      href: '/resources',
      dropdown: [
        { name: t.nav.guides, href: '/resources#toolkit' },
        { name: t.nav.newsInsights, href: '/resources#news' },
        { name: t.nav.mediaGallery, href: '/resources#gallery' },
      ]
    },
    { name: t.nav.contact, href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-lg">
      {/* Mini Menu */}
      <div className="bg-lbbc-green text-white py-2.5 md:py-2 border-b border-white/5 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="hidden sm:flex items-center gap-4 md:gap-6">
            <a href="https://www.linkedin.com/company/libyan-british-business-council/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-all hover:scale-110"><Linkedin size={14} /></a>
            <a href="https://x.com/LBBCnews" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-all hover:scale-110">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/LibyanBritishBusinessCouncil/#" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-all hover:scale-110"><Facebook size={14} /></a>
          </div>
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 md:gap-10">
            <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
              <span className="flex items-center gap-2 hover:text-lbbc-red transition-colors cursor-default"><Phone size={10} className="text-white" /> +44 (0) 20 7788 7935</span>
              <span className="w-px h-3 bg-white/20"></span>
              <span className="flex items-center gap-2 hover:text-lbbc-red transition-colors cursor-default"><Mail size={10} className="text-white" /> secretariat@lbbc.org.uk</span>
            </div>
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 sm:gap-6">
              {/* Language Switcher */}
              <div className="flex items-center border-r border-white/20 pr-4 mr-2">
                <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 gap-1">
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-[10px] font-black tracking-widest ${language === 'en' ? 'bg-white text-lbbc-green shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                    title="Switch to English"
                  >
                    <img src="https://flagcdn.com/w40/gb.png" alt="UK Flag" className="w-3.5 h-auto rounded-[1px]" referrerPolicy="no-referrer" />
                    EN
                  </button>
                  <button 
                    onClick={() => setLanguage('ar')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-[10px] font-black tracking-widest ${language === 'ar' ? 'bg-white text-lbbc-green shadow-sm' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                    title="Switch to Arabic"
                  >
                    <img src="https://flagcdn.com/w40/ly.png" alt="Libya Flag" className="w-3.5 h-auto rounded-[1px]" referrerPolicy="no-referrer" />
                    AR
                  </button>
                </div>
              </div>
              
              <Link 
                to="/membership"
                className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] bg-white text-lbbc-green px-3 md:px-5 py-1.5 md:py-2 rounded-sm hover:bg-lbbc-red hover:text-white transition-all shadow-lg active:scale-95 whitespace-nowrap"
              >
                {t.nav.joinUs}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className={`transition-all duration-500 ${scrolled ? 'py-2' : 'py-3 md:py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="group">
              <picture>
                <source srcSet="/images/1PGomWa780IpyKLEScVCwx5SOUtqGimcM.webp" type="image/webp" />
                <img
                  src="/images/1PGomWa780IpyKLEScVCwx5SOUtqGimcM.png"
                  alt="LBBC Logo"
                  className="h-8 sm:h-10 md:h-12 transition-all duration-500 group-hover:scale-105"
                  fetchPriority="high"
                />
              </picture>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <div className="flex items-center gap-1 cursor-pointer">
                    <Link 
                      to={link.href} 
                      className={`text-[12px] font-black transition-colors uppercase tracking-[0.25em] ${location.pathname === link.href ? 'text-lbbc-green' : 'text-slate-800 hover:text-lbbc-red'}`}
                    >
                      {link.name}
                    </Link>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''} text-slate-400`} />
                  </div>
                ) : (
                  <Link 
                    to={link.href} 
                    className={`text-[12px] font-black transition-colors uppercase tracking-[0.25em] ${location.pathname === link.href ? 'text-lbbc-green' : 'text-slate-800 hover:text-lbbc-red'}`}
                  >
                    {link.name}
                  </Link>
                )}
                <span className={`absolute -bottom-2 left-0 h-0.5 transition-all duration-300 bg-lbbc-green ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-56 bg-white shadow-2xl rounded-sm border-t-2 border-lbbc-green py-4 mt-2"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-6 py-3 text-[11px] font-bold text-slate-600 hover:text-lbbc-red hover:bg-slate-50 transition-all uppercase tracking-widest"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    placeholder="Search..."
                    className="mr-2 px-3 py-1.5 text-sm rounded-sm border border-slate-200 text-slate-900 bg-slate-50 focus:outline-none transition-all"
                    autoFocus
                  />
                )}
              </AnimatePresence>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-full transition-all text-slate-600 hover:bg-slate-100 hover:text-lbbc-red"
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>
            </div>
            
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-2.5 rounded-full transition-all text-slate-600 hover:bg-slate-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 z-[60] bg-white overflow-y-auto"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                <picture>
                  <source srcSet="/images/1PGomWa780IpyKLEScVCwx5SOUtqGimcM.webp" type="image/webp" />
                  <img src="/images/1PGomWa780IpyKLEScVCwx5SOUtqGimcM.png" alt="LBBC Logo" className="h-10" />
                </picture>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setActiveDropdown(null);
                  }} 
                  className="p-2 text-slate-800"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="space-y-8 flex-grow">
                {navLinks.map((link) => (
                  <div key={link.name} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Link
                        to={link.href}
                        className="block text-2xl font-black text-slate-900 hover:text-lbbc-red uppercase tracking-widest transition-colors"
                        onClick={() => {
                          setIsOpen(false);
                          setActiveDropdown(null);
                        }}
                      >
                        {link.name}
                      </Link>
                      {link.dropdown && (
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                          className="p-2 text-slate-400 hover:text-lbbc-red transition-colors"
                        >
                          <ChevronDown size={24} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    
                    {link.dropdown && (
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-6 space-y-4 border-l-2 border-lbbc-green/20 overflow-hidden"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className="block text-lg font-bold text-slate-500 hover:text-lbbc-red uppercase tracking-widest transition-colors pt-2 first:pt-0"
                                onClick={() => {
                                  setIsOpen(false);
                                  setActiveDropdown(null);
                                }}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-12 border-t border-slate-100 space-y-6">
                {/* Mobile Language Switcher */}
                <div className="flex justify-center">
                  <div className="flex items-center bg-slate-100 rounded-full p-1.5 gap-2 border border-slate-200 shadow-inner">
                    <button 
                      onClick={() => {
                        setLanguage('en');
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all text-xs font-black tracking-widest ${language === 'en' ? 'bg-white text-lbbc-green shadow-md' : 'text-slate-500 hover:text-lbbc-green'}`}
                    >
                      <img src="https://flagcdn.com/w40/gb.png" alt="UK Flag" className="w-5 h-auto rounded-[1px]" referrerPolicy="no-referrer" />
                      EN
                    </button>
                    <button 
                      onClick={() => {
                        setLanguage('ar');
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all text-xs font-black tracking-widest ${language === 'ar' ? 'bg-white text-lbbc-green shadow-md' : 'text-slate-500 hover:text-lbbc-green'}`}
                    >
                      <img src="https://flagcdn.com/w40/ly.png" alt="Libya Flag" className="w-5 h-auto rounded-[1px]" referrerPolicy="no-referrer" />
                      AR
                    </button>
                  </div>
                </div>

                <Link 
                  to="/membership"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-5 bg-lbbc-green text-white font-black uppercase tracking-[0.2em] rounded-sm shadow-xl hover:bg-lbbc-red transition-all text-center block"
                >
                  {t.nav.joinUs}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
