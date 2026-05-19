import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/images/1fzfMN6hXA9CDWB_2RMIU6azYmksCSkCe.png',
      imageWebp: '/images/1fzfMN6hXA9CDWB_2RMIU6azYmksCSkCe.webp',
      title: t.hero.slides[0].title,
      subtitle: t.hero.slides[0].subtitle,
      cta1: t.hero.slides[0].cta1,
      cta2: t.hero.slides[0].cta2,
      link1: '/membership',
      link2: 'https://lbbc.glueup.com/home/'
    },
    {
      id: 2,
      image: '/images/lbbc-noc-mou-signing.png',
      imageWebp: '/images/lbbc-noc-mou-signing.webp',
      title: t.hero.slides[1].title,
      subtitle: t.hero.slides[1].subtitle,
      cta1: t.hero.slides[1].cta1,
      cta2: t.hero.slides[1].cta2,
      link1: '/news/lbbc-noc-mou-energy-forum',
      link2: '/membership'
    },
    {
      id: 3,
      image: '/images/1PG3cPBxL9ce2a8nIgqmSPT1UWejsH8qZ.png',
      imageWebp: '/images/1PG3cPBxL9ce2a8nIgqmSPT1UWejsH8qZ.webp',
      title: t.hero.slides[2].title,
      subtitle: t.hero.slides[2].subtitle,
      cta1: t.hero.slides[2].cta1,
      cta2: t.hero.slides[2].cta2,
      link1: '/membership',
      link2: 'https://lbbc.glueup.com/account/login?ret=S6bk1bwBqj5v4TlS%2B842Yg%3D%3D'
    }
  ];

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.imageWebp;
    });

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-[750px] lg:h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Background: dark base + subtle green accent */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f15] via-slate-950 to-slate-950"></div>
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-lbbc-green/15 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] bg-lbbc-green/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-white w-full pt-28 pb-28 md:pt-24 md:pb-32 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Text panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center mb-4 md:mb-8"
                >
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/80">
                    Libyan British Business Council
                  </span>
                </motion.div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-black leading-tight md:leading-[1.1] mb-5 md:mb-8 tracking-tight">
                  {slide.title}
                </h1>

                <p className="text-xs sm:text-base md:text-lg font-medium leading-relaxed mb-8 md:mb-12 text-white/80 max-w-xl">
                  {slide.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-5">
                  {slide.link1.startsWith('http') ? (
                    <a
                      href={slide.link1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden bg-lbbc-green text-white px-8 md:px-10 py-3.5 md:py-4 rounded-sm text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:shadow-[0_20px_40px_-10px_rgba(239,68,68,0.5)] active:scale-95 w-full sm:w-auto text-center"
                    >
                      <span className="relative z-10">{slide.cta1}</span>
                      <div className="absolute inset-0 bg-lbbc-red translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </a>
                  ) : (
                    <Link
                      to={slide.link1}
                      className="group relative overflow-hidden bg-lbbc-green text-white px-8 md:px-10 py-3.5 md:py-4 rounded-sm text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:shadow-[0_20px_40px_-10px_rgba(239,68,68,0.5)] active:scale-95 w-full sm:w-auto text-center"
                    >
                      <span className="relative z-10">{slide.cta1}</span>
                      <div className="absolute inset-0 bg-lbbc-red translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </Link>
                  )}

                  {slide.link2?.startsWith('http') || slide.link2?.startsWith('mailto:') ? (
                    <a
                      href={slide.link2}
                      target={slide.link2.startsWith('http') ? '_blank' : undefined}
                      rel={slide.link2.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="bg-slate-900 border border-slate-900 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-sm text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all active:scale-95 w-full sm:w-auto text-center"
                    >
                      {slide.cta2}
                    </a>
                  ) : (
                    <Link
                      to={slide.link2 || '#'}
                      className="bg-slate-900 border border-slate-900 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-sm text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all active:scale-95 w-full sm:w-auto text-center"
                    >
                      {slide.cta2}
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image card */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/10 bg-slate-900">
                  <picture className="block w-full h-full">
                    <source srcSet={slide.imageWebp} type="image/webp" />
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
                    />
                  </picture>
                </div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-lbbc-green/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-lbbc-red/20 rounded-full blur-3xl -z-10"></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 md:bottom-12 left-4 right-4 sm:left-6 sm:right-6 max-w-7xl mx-auto flex justify-between items-end z-20">
        <div className="flex gap-1.5 sm:gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group py-4 px-1 outline-none"
            >
              <div className={`h-1 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-8 sm:w-12 bg-lbbc-red' : 'w-4 sm:w-6 bg-white/20 group-hover:bg-white/40'}`}></div>
            </button>
          ))}
        </div>

        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/10 hover:bg-lbbc-red hover:text-white transition-all group"
          >
            <ChevronLeft size={18} className="group-active:scale-90 transition-transform" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            aria-label="Next slide"
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-white/10 hover:bg-lbbc-red hover:text-white transition-all group"
          >
            <ChevronLeft size={18} className="rotate-180 group-active:scale-90 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
