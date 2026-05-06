import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Search, X, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

type Member = {
  name: string;
  sector: string;
  logo: string | null;
  id: string;
  membershipType: 'council' | 'corporate';
  about: string | null;
  website: string | null;
};

type Tab = 'all' | 'council' | 'corporate';

export const DirectoryPage = () => {
  const { t } = useLanguage();
  const [members, setMembers] = useState<{ council: Member[]; corporate: Member[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Member | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/data/members.json')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setMembers(data); })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!members) return [];
    const q = search.toLowerCase().trim();
    const pool =
      activeTab === 'council'   ? members.council :
      activeTab === 'corporate' ? members.corporate :
      [...members.council, ...members.corporate];
    return pool.filter(m =>
      !q || m.name.toLowerCase().includes(q) || m.sector.toLowerCase().includes(q)
    );
  }, [members, activeTab, search]);

  const councilCount   = members?.council.length ?? 0;
  const corporateCount = members?.corporate.length ?? 0;
  const totalCount     = councilCount + corporateCount;

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'all',       label: 'All Members',      count: totalCount },
    { id: 'council',   label: 'Council Members',   count: councilCount },
    { id: 'corporate', label: 'Corporate Members', count: corporateCount },
  ];

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="pt-32">

      {/* Member detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-start justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 p-2">
                    {selected.logo
                      ? <img src={selected.logo} alt={selected.name} className="max-w-full max-h-full object-contain" />
                      : <Building2 size={24} className="text-slate-300" />
                    }
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900 leading-tight">{selected.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{selected.sector}</span>
                      {selected.membershipType === 'council' && (
                        <span className="text-[8px] font-black uppercase tracking-widest bg-lbbc-green/10 text-lbbc-green px-2 py-0.5 rounded-full">Council</span>
                      )}
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 transition-colors ml-4 flex-shrink-0">
                  <X size={20} />
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6 space-y-5">
                {selected.about ? (
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">About</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{selected.about}</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic">No company description available.</p>
                )}

                {selected.website && (
                  <a
                    href={selected.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-lbbc-green text-white px-6 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-lbbc-red transition-all shadow-md active:scale-95"
                  >
                    Visit Website <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
        <div className="absolute inset-0 bg-gradient-to-r from-lbbc-green/80 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white font-black text-[8px] md:text-[9px] uppercase tracking-[0.4em] mb-4 md:mb-6 border border-white/20">
              {t.directory.pageTag}
            </span>
            <h1 className="text-2xl md:text-5xl font-black text-white leading-tight max-w-3xl tracking-tight">
              {t.directory.pageTitle}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro + controls */}
      <section className="py-10 md:py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <p className="text-slate-600 leading-relaxed text-base max-w-2xl">
            {t.directory.intro}
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                  activeTab === tab.id
                    ? 'bg-lbbc-green border-lbbc-green text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-lbbc-green hover:text-lbbc-green'
                }`}
              >
                {tab.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name or sector…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-sm text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-lbbc-green focus:ring-1 focus:ring-lbbc-green/20 transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Member grid */}
      <section className="py-12 md:py-16 bg-slate-50/50 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-100 p-6 animate-pulse">
                  <div className="aspect-[3/2] bg-slate-100 rounded-lg mb-4" />
                  <div className="h-3 bg-slate-100 rounded mb-2" />
                  <div className="h-2 bg-slate-50 rounded w-2/3" />
                </div>
              ))}
            </div>
          )}

          {!isLoading && filtered.length === 0 && (
            <div className="text-center py-24 text-slate-400">
              <Building2 size={40} className="mx-auto mb-4 opacity-30" />
              <p className="font-bold text-sm uppercase tracking-widest">No members found</p>
            </div>
          )}

          {!isLoading && filtered.length > 0 && (
            <>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">
                Showing {filtered.length} {filtered.length === 1 ? 'member' : 'members'}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + search}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
                >
                  {filtered.map((member, i) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.4) }}
                      className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
                      onClick={() => setSelected(member)}
                    >
                      {/* Logo area */}
                      <div className="flex items-center justify-center p-5 bg-white aspect-[3/2]">
                        {member.logo ? (
                          <img
                            src={member.logo}
                            alt={member.name}
                            className="max-h-full max-w-full object-contain"
                            loading="lazy"
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        ) : (
                          <Building2 size={32} className="text-slate-200" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="px-4 pb-4 pt-2 border-t border-slate-50 flex flex-col gap-1.5 flex-1">
                        <p className="text-[11px] md:text-xs font-black text-slate-900 leading-tight line-clamp-2 group-hover:text-lbbc-green transition-colors">
                          {member.name}
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">
                            {member.sector}
                          </span>
                          {member.membershipType === 'council' && activeTab !== 'council' && (
                            <span className="text-[7px] font-black uppercase tracking-widest bg-lbbc-green/10 text-lbbc-green px-1.5 py-0.5 rounded-full leading-none">
                              Council
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default DirectoryPage;
