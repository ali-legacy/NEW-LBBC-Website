import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { GlueUpWidget } from '../components/GlueUpWidget';

const CORPORATE_WIDGET = 'https://lbbc.glueup.com/organization/5915/widget/membership-directory/corporate';
const COUNCIL_WIDGET = 'https://lbbc.glueup.com/organization/5915/widget/membership-directory/council/';

export const DirectoryPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'council' | 'corporate'>('council');

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

      {/* Intro & Tabs */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-slate-600 leading-relaxed text-base max-w-2xl">
              {t.directory.intro}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="border-b border-slate-100 pb-6">
            <div className="flex bg-slate-100 p-1 rounded-lg w-full md:w-auto inline-flex">
              <button
                onClick={() => setActiveTab('council')}
                className={`flex-1 md:flex-none px-8 py-2.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'council' ? 'bg-white text-lbbc-green shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {t.directory.councilTab}
              </button>
              <button
                onClick={() => setActiveTab('corporate')}
                className={`flex-1 md:flex-none px-8 py-2.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'corporate' ? 'bg-white text-lbbc-green shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {t.directory.corporateTab}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Directory iframes — both stay in DOM so tab switching is instant */}
      <section className="pb-16 md:pb-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div style={{ display: activeTab === 'council' ? 'block' : 'none' }}>
            <GlueUpWidget
              src={COUNCIL_WIDGET}
              title="LBBC Council Members"
              minHeight="700px"
              className="rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white"
            />
          </div>
          <div style={{ display: activeTab === 'corporate' ? 'block' : 'none' }}>
            <GlueUpWidget
              src={CORPORATE_WIDGET}
              title="LBBC Corporate Members"
              minHeight="700px"
              className="rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DirectoryPage;
