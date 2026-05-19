import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

export const ComingSoonPage = () => {
  const { setLanguage } = useLanguage();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      <SEO 
        title="Arabic Page Coming Soon | قريباً الصفحة العربية" 
        description="The Arabic version of the LBBC website is currently in development. Our team is working to bring you the best experience in Arabic."
        canonical=""
      />
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-lbbc-green/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-lbbc-red/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-4xl w-full px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <picture>
            <source srcSet="/images/1PGomWa780IpyKLEScVCwx5SOUtqGimcM.webp" type="image/webp" />
            <img
              src="/images/1PGomWa780IpyKLEScVCwx5SOUtqGimcM.png"
              alt="LBBC Logo"
              className="h-20 md:h-24 mx-auto"
            />
          </picture>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter">
              Arabic Page Coming Soon
            </h1>
            <h2 className="text-3xl md:text-6xl font-black text-lbbc-green tracking-tight" dir="rtl">
              النسخة العربية ستتوفر قريباً
            </h2>
          </div>

          <div className="w-24 h-1 bg-lbbc-red mx-auto"></div>

          <div className="space-y-6">
            <p className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Our Arabic website is currently under development to provide you with the best experience. Please check back later.
            </p>
            <p className="text-lg md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto" dir="rtl">
              نسختنا العربية قيد التطوير حالياً لتقديم أفضل تجربة لكم. يرجى العودة لاحقاً.
            </p>
          </div>

          <div className="pt-8">
            <button 
              onClick={() => setLanguage('en')}
              className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-lbbc-green transition-all shadow-2xl active:scale-95 group"
            >
              <ArrowUpRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              Return to English Site / العودة إلى الموقع الإنجليزي
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 text-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
          Libyan British Business Council © 2026
        </p>
      </div>
    </div>
  );
};

export default ComingSoonPage;
