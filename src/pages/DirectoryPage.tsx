import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { GlueUpWidget } from '../components/GlueUpWidget';

const DIRECTORY_WIDGET = 'https://lbbc.glueup.com/organization/5915/widget/membership-directory/corporate';

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
        <img
          src="/images/1m0pcFsUJoAa0h4oTj57jnTosPbhuOTjS.png"
          alt="Directory Header"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
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

      {/* Directory iframe */}
      <section className="pb-16 md:pb-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <GlueUpWidget
            src={DIRECTORY_WIDGET}
            title="LBBC Member Directory"
            minHeight="700px"
            className="rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white"
          />
        </div>
      </section>
    </div>
  );
};

export default DirectoryPage;
