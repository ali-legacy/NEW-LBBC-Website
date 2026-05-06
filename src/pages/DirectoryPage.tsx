import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

export const DirectoryPage = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32">
      <SEO
        title={t.nav.directory}
        description="Explore the LBBC Member Directory to find leading British and Libyan companies across various sectors."
        canonical="directory"
      />

      {/* Hero Banner */}
      <section className="relative h-[250px] md:h-[300px] flex items-center overflow-hidden bg-slate-900">
        <picture className="absolute inset-0 w-full h-full">
          <source srcSet="/images/1m0pcFsUJoAa0h4oTj57jnTosPbhuOTjS.webp" type="image/webp" />
          <img
            src="/images/1m0pcFsUJoAa0h4oTj57jnTosPbhuOTjS.png"
            alt="Directory Header"
            className="w-full h-full object-cover opacity-60"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-lbbc-green/80 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white font-black text-[8px] md:text-[9px] uppercase tracking-[0.4em] mb-4 md:mb-6 border border-white/20">
              {t.directory.pageTag}
            </span>
            <h1 className="text-2xl md:text-5xl font-black text-white leading-tight max-w-3xl tracking-tight">
              {t.directory.pageTitle}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-slate-600 leading-relaxed text-base max-w-2xl">
            {t.directory.intro}
          </p>
        </div>
      </section>

      {/* Directory — temporarily offline */}
      <section className="pb-16 md:pb-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-xl border border-slate-100 bg-white shadow-sm py-24 flex flex-col items-center gap-6 text-center px-6">
            <div className="w-16 h-16 rounded-full bg-lbbc-green/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lbbc-green"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Directory Being Updated</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                Our member directory is currently undergoing maintenance. Please check back soon — we are working to bring you an improved experience.
              </p>
            </div>
            <a
              href="mailto:secretariat@lbbc.org.uk"
              className="inline-flex items-center gap-2 bg-lbbc-green text-white px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-lbbc-red transition-all shadow-md active:scale-95"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DirectoryPage;
