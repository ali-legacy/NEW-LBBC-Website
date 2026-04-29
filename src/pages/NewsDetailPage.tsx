import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, ArrowRight, Share2, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { newsData } from '../data/news';

export const NewsDetailPage = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const item = newsData.find(n => n.id === id) || newsData[0];

  return (
    <div className="pt-32">
      <SEO 
        title={`${item.title} | News`} 
        description={item.content.substring(0, 160)}
        canonical={`news/${item.id}`}
      />
      
      {/* Header */}
      <section className="bg-slate-50 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link to="/resources#news" className="inline-flex items-center gap-2 text-lbbc-green font-bold text-[10px] uppercase tracking-widest mb-8 hover:text-lbbc-red transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {t.news.cta}
          </Link>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="bg-lbbc-green text-white px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest">{item.category}</span>
              <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                <Calendar size={14} />
                {item.date}
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              {item.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 md:-mt-12 relative z-10">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-3/4">
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed space-y-8">
                {item.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              
              <div className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Tag size={14} /> Tags:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">Trade</span>
                    <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">Partnership</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-lbbc-green font-black text-[10px] uppercase tracking-widest hover:text-lbbc-red transition-colors">
                  <Share2 size={16} /> Share Article
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/4">
              <div className="sticky top-40 space-y-12">
                <div className="space-y-6">
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] border-b border-slate-100 pb-4">Latest Updates</h4>
                  <div className="space-y-8">
                    {newsData.filter(n => n.id !== item.id).slice(0, 3).map(news => (
                      <Link key={news.id} to={`/news/${news.id}`} className="block group">
                        <span className="text-[8px] font-black text-lbbc-green uppercase tracking-widest mb-1 block">{news.date}</span>
                        <h5 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-lbbc-red transition-colors line-clamp-2">{news.title}</h5>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-950 py-16 md:py-24 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">Stay informed with LBBC insights</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/membership" className="bg-lbbc-green text-white px-8 py-4 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-lbbc-accent transition-all shadow-xl">
              Become a Member
            </Link>
            <Link to="/contact" className="border border-white/20 text-white px-8 py-4 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all">
              Contact Secretariat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetailPage;
