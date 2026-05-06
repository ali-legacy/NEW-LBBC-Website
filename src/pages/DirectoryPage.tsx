import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { GlueUpWidget } from '../components/GlueUpWidget';

const DIRECTORY_WIDGET = 'https://lbbc.glueup.com/organization/5915/widget/membership-directory/corporate';

// ─── Overlay tuning ───────────────────────────────────────────────────────────
// These values control where the "Individuals" tab cover sits.
// Adjust them if GlueUp changes their layout.
//
//  TAB_BAR_TOP    – px from the top of the iframe to the top of the tab row
//  TAB_BAR_HEIGHT – height of the tab row in px
//  TAB_LEFT       – left edge of the Individuals tab as % of iframe width
//  TAB_WIDTH      – width of the Individuals tab as % of iframe width
//
// Desktop vs mobile can differ — tweak MOBILE_* for narrow screens.
const OVERLAY = {
  TAB_BAR_TOP:    56,   // px — adjust if tabs appear lower/higher
  TAB_BAR_HEIGHT: 52,   // px — height of the tab strip
  TAB_LEFT:       66,   // %  — where the Individuals tab starts (0=left edge)
  TAB_WIDTH:      34,   // %  — how wide the Individuals tab is
  BG_COLOR:       '#ffffff', // match the widget's tab bar background
};

const OVERLAY_MOBILE = {
  TAB_BAR_TOP:    100,  // px — tabs often shift lower on mobile
  TAB_BAR_HEIGHT: 48,
  TAB_LEFT:       0,
  TAB_WIDTH:      100,  // cover full width on mobile (tabs usually stack)
  BG_COLOR:       '#ffffff',
};
// ─────────────────────────────────────────────────────────────────────────────

export const DirectoryPage = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const mq = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const o = isMobile ? OVERLAY_MOBILE : OVERLAY;

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

      {/* Directory widget + overlay */}
      <section className="pb-16 md:pb-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Wrapper must be relative so the overlay is anchored to it */}
          <div className="relative rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white">
            <GlueUpWidget
              src={DIRECTORY_WIDGET}
              title="LBBC Member Directory"
              minHeight="700px"
            />

            {/* Individuals tab cover — positioned over the tab strip */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top:    o.TAB_BAR_TOP,
                left:   `${o.TAB_LEFT}%`,
                width:  `${o.TAB_WIDTH}%`,
                height: o.TAB_BAR_HEIGHT,
                background: o.BG_COLOR,
                pointerEvents: 'none',
                zIndex: 10,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DirectoryPage;
