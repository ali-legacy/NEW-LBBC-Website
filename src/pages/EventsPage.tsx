import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { GlueUpWidget } from '../components/GlueUpWidget';

const EVENTS_WIDGET_URL = 'https://lbbc.glueup.com/organization/5915/widget/event-list/full-view';

export const EventsPage = () => {
  const { t } = useLanguage();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="pt-32">
      <SEO
        title={t.nav.events}
        description="Stay updated on upcoming LBBC events, trade missions, and conferences focused on UK-Libya business opportunities."
        canonical="events"
      />

      {/* Header Banner */}
      <section className="relative h-[250px] md:h-[300px] flex items-center overflow-hidden bg-slate-900">
        <img
          src="/images/1BwuIsuhH6LWOAfM-5WB965n8lGqlBKYF.png"
          alt="Events Header"
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
              {t.events.pageTag}
            </span>
            <h1 className="text-2xl md:text-5xl font-black text-white leading-tight max-w-3xl tracking-tight">
              {t.events.pageTitle}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section id="upcoming" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-lbbc-green/10 rounded-lg flex items-center justify-center text-lbbc-green">
                <Calendar size={20} />
              </div>
              <span className="text-lbbc-green font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em]">{t.events.tag}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">{t.events.calendarTitle}</h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              {t.events.calendarDesc}
            </p>
          </div>

          <GlueUpWidget
            src={EVENTS_WIDGET_URL}
            title="LBBC Events — Upcoming and Past"
            minHeight="800px"
            className="rounded-xl overflow-hidden shadow-sm border border-slate-100"
          />

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center pt-8 border-t border-slate-200">
            <a
              href="https://lbbc.glueup.com/home/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-lbbc-green text-white px-10 py-4 rounded-sm text-[11px] font-black uppercase tracking-widest hover:bg-lbbc-red transition-all shadow-xl active:scale-95 text-center"
            >
              {t.events.memberSignIn}
            </a>
            <Link
              to="/membership"
              className="w-full sm:w-auto border-2 border-lbbc-green text-lbbc-green px-10 py-4 rounded-sm text-[11px] font-black uppercase tracking-widest hover:bg-lbbc-green hover:text-white transition-all shadow-lg active:scale-95 text-center"
            >
              {t.events.joinLBBC}
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-lbbc-red font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] block mb-4">{t.events.sponsorsTag}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{t.events.sponsorsTitle}</h2>
          </div>
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {t.events.sponsorsDesc}
            </p>
            <a
              href="mailto:events@lbbc.org.uk"
              className="inline-flex items-center justify-center gap-3 bg-lbbc-green text-white px-10 py-4 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] hover:bg-lbbc-red transition-all shadow-xl active:scale-95"
            >
              {t.events.contactUs} <Mail size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
