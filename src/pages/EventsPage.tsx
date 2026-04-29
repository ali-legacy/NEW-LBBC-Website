import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowUpRight, ArrowRight, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

import { getApiUrl, getStaticDataUrl } from '../utils/api';

const ensureAbsoluteUrl = (url: string | null | undefined) => {
  if (!url) return undefined;
  if (url.startsWith('http')) return url;
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('/')) return `https://lbbc.glueup.com${url}`;
  return `https://lbbc.glueup.com/${url}`;
};

export const EventsPage = () => {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(getApiUrl('events'));
        
        if (!response.ok) {
          const staticRes = await fetch(getStaticDataUrl('events.json'));
          if (!staticRes.ok) throw new Error(`Server returned ${response.status} and static fallback failed`);
          const data = await staticRes.json();
          setUpcomingEvents(data.upcoming || []);
          setPastEvents(data.past || []);
          return;
        }
        
        const data = await response.json();
        setUpcomingEvents(data.upcoming || []);
        setPastEvents(data.past || []);
      } catch (err) {
        console.error('Error fetching events page:', err);
        setUpcomingEvents([]);
        setPastEvents([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (hash && !isLoading) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [hash, isLoading]);

  const [visibleArchiveCount, setVisibleArchiveCount] = useState(3);

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

      {/* Upcoming Events Section */}
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

          <div className="space-y-8 md:space-y-12">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-64 bg-slate-50 animate-pulse rounded-2xl"></div>
              ))
            ) : error ? (
              <div className="bg-red-50 p-8 rounded-xl text-center border border-red-100">
                <p className="text-red-600 font-bold mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-red-600 text-white rounded-sm text-xs font-black uppercase tracking-widest"
                >
                  Retry
                </button>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">No upcoming events scheduled at this time.</p>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col lg:flex-row">
                  <div className="lg:w-2/5 relative overflow-hidden aspect-[16/9] lg:aspect-auto min-h-[240px] bg-slate-50 flex items-center justify-center">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-lbbc-green/5 to-transparent"></div>
                        <Calendar size={48} className="text-slate-200 relative z-10" />
                      </>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-md shadow-md z-20">
                      <span className="text-lbbc-green font-black text-[10px] tracking-tighter uppercase">{event.type}</span>
                    </div>
                  </div>
                  <div className="lg:w-3/5 p-6 md:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-4 text-lbbc-green font-bold text-[10px] uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          {event.location}
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-lbbc-red transition-colors leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                        {event.description}
                      </p>
                    </div>
                      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        {event.link ? (
                          <a 
                            href={ensureAbsoluteUrl(event.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto bg-lbbc-green text-white px-8 py-3.5 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-lbbc-red transition-all shadow-lg active:scale-95 text-center"
                          >
                            {t.events.register}
                          </a>
                        ) : (
                          <button className="w-full sm:w-auto bg-lbbc-green text-white px-8 py-3.5 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-lbbc-red transition-all shadow-lg active:scale-95">
                            {t.events.register}
                          </button>
                        )}
                        <a 
                          href={ensureAbsoluteUrl(event.link) || '#'}
                          target={event.link ? "_blank" : undefined}
                          rel={event.link ? "noopener noreferrer" : undefined}
                          className="w-full sm:w-auto border border-slate-200 text-slate-900 px-8 py-3.5 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2 text-center"
                        >
                          {t.events.viewDetails} <ArrowUpRight size={14} />
                        </a>
                      </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
        </div>
      </section>

      {/* Events Archive Section */}
      <section id="archive" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12 md:mb-16">
            <span className="text-lbbc-green font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] block mb-4">{t.events.archiveTag}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">{t.events.archiveTitle}</h2>
            <p className="text-lbbc-green font-bold text-[12px] md:text-[14px] uppercase tracking-widest mb-4">{t.events.archiveSubtitle}</p>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              {t.events.archiveDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-xl"></div>
              ))
            ) : pastEvents.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white/50 rounded-xl border border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">No archived events found.</p>
              </div>
            ) : (
              pastEvents.slice(0, visibleArchiveCount).map((event) => (
                <div key={event.id} className="flex flex-col gap-6 group">
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg relative bg-white flex items-center justify-center border border-slate-100">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-lbbc-green/5 to-transparent"></div>
                        <Calendar size={48} className="text-slate-100 relative z-10" />
                      </>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-md shadow-md z-20">
                      <span className="text-lbbc-green font-black text-[10px] tracking-tighter uppercase">{event.type}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-lbbc-red font-bold text-[9px] uppercase tracking-[0.2em]">
                        <Calendar size={12} />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-lbbc-red font-bold text-[9px] uppercase tracking-[0.2em]">
                        <MapPin size={12} />
                        {event.location}
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-lbbc-red transition-colors line-clamp-2">{event.title}</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-sm line-clamp-3">
                      {event.description}
                    </p>
                    <a 
                      href={ensureAbsoluteUrl(event.link) || '#'}
                      target={event.link ? "_blank" : undefined}
                      rel={event.link ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-widest border-b-2 border-lbbc-red/20 hover:border-lbbc-red pb-1 transition-all w-fit"
                    >
                      {t.events.viewSummary}
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-12 flex flex-col items-center gap-8">
            {visibleArchiveCount < pastEvents.length ? (
              <button 
                onClick={() => setVisibleArchiveCount(pastEvents.length)}
                className="flex items-center gap-2 text-lbbc-green font-bold text-[11px] uppercase tracking-[0.2em] hover:text-lbbc-red transition-colors group"
              >
                {t.events.seeMore}
                <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </button>
            ) : (
              <button 
                onClick={() => setVisibleArchiveCount(3)}
                className="flex items-center gap-2 text-lbbc-green font-bold text-[11px] uppercase tracking-[0.2em] hover:text-lbbc-red transition-colors group"
              >
                {t.events.showLess}
                <ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" />
              </button>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center pt-8 border-t border-slate-200">
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
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-lbbc-red font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] block mb-4">{t.events.sponsorsTag}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{t.events.sponsorsTitle}</h2>
          </div>

          <div className="max-w-3xl mx-auto text-center mt-16 space-y-8">
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
