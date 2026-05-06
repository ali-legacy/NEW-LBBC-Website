import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

export const ContactPage = () => {
  const { t } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement('script');
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    script.onerror = () => console.warn('Elfsight script failed to load.');
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  return (
    <div className="pt-32">
      <SEO 
        title={t.nav.contact} 
        description="Get in touch with the Libyan British Business Council for inquiries about membership, events, or trade support."
        canonical="contact"
      />
      {/* Header Banner */}
      <section className="relative h-[250px] md:h-[300px] flex items-center overflow-hidden bg-slate-900">
        <img src="/images/1VGQO92bvZODdTICHp8t8oKeGl4XcA5pd.png" alt="Contact Header" className="absolute inset-0 w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-lbbc-green/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4 md:space-y-6">
            <span className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white font-black text-[8px] md:text-[9px] uppercase tracking-[0.4em] border border-white/20">{t.contact.tag}</span>
            <h1 className="text-2xl md:text-5xl font-black text-white leading-tight max-w-3xl tracking-tight">{t.contact.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pt-12 md:pt-20 pb-6 md:pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-1/3 space-y-8">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-4">
                <span className="text-lbbc-green font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] block">{t.contact.tag}</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">{t.contact.subtitle}</h2>
                <p className="text-slate-600 leading-relaxed font-medium">{t.contact.desc}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-6 pt-6 border-t border-slate-100">
                <div className="space-y-2">
                  <span className="text-lbbc-green font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] block">{t.contact.hq}</span>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Libyan British Business Council</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-50 p-3 rounded-sm border border-slate-100"><MapPin size={18} className="text-lbbc-green" /></div>
                    <div className="text-slate-600 text-sm leading-relaxed font-medium"><p>PO LBBC 2004</p><p>PO Box 537</p><p>HORLEY, RH6 6GD</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-50 p-3 rounded-sm border border-slate-100"><Mail size={18} className="text-lbbc-green" /></div>
                    <div className="space-y-3">
                      <p className="text-slate-600 text-sm font-medium"><span className="text-slate-400 text-[9px] uppercase tracking-widest block mb-0.5">{t.contact.general}</span><a href="mailto:info@lbbc.org.uk" className="hover:text-lbbc-green transition-colors">info@lbbc.org.uk</a></p>
                      <p className="text-slate-600 text-sm font-medium"><span className="text-slate-400 text-[9px] uppercase tracking-widest block mb-0.5">{t.contact.membership}</span><a href="mailto:events@lbbc.org.uk" className="hover:text-lbbc-green transition-colors">events@lbbc.org.uk</a></p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-50 p-3 rounded-sm border border-slate-100"><Phone size={18} className="text-lbbc-green" /></div>
                    <div className="text-slate-600 text-sm font-medium"><span className="text-slate-400 text-[9px] uppercase tracking-widest block mb-0.5">{t.contact.tel}</span><a href="tel:+442071291251" className="hover:text-lbbc-green transition-colors">+44 (0) 20 7129 1251</a></div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-2/3">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-slate-50 p-8 md:p-12 rounded-2xl border border-slate-100 shadow-sm">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.contact.form.name}</label>
                      <input type="text" id="fullName" className="w-full bg-white border border-slate-200 rounded-sm px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbbc-green/20 focus:border-lbbc-green transition-all placeholder:text-slate-300" placeholder={t.contact.form.name} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="jobTitle" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.contact.form.job}</label>
                      <input type="text" id="jobTitle" className="w-full bg-white border border-slate-200 rounded-sm px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbbc-green/20 focus:border-lbbc-green transition-all placeholder:text-slate-300" placeholder={t.contact.form.job} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.contact.form.company}</label>
                      <input type="text" id="companyName" className="w-full bg-white border border-slate-200 rounded-sm px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbbc-green/20 focus:border-lbbc-green transition-all placeholder:text-slate-300" placeholder={t.contact.form.company} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="inquiryType" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.contact.form.inquiry}</label>
                      <div className="relative">
                        <select id="inquiryType" defaultValue="" className="w-full bg-white border border-slate-200 rounded-sm px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbbc-green/20 focus:border-lbbc-green transition-all appearance-none cursor-pointer">
                          <option value="" disabled>{t.contact.form.select}</option>
                          <option value="membership">{t.contact.form.opt1}</option>
                          <option value="events">{t.contact.form.opt2}</option>
                          <option value="press">{t.contact.form.opt3}</option>
                          <option value="trade">{t.contact.form.opt4}</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.contact.form.message}</label>
                    <textarea id="message" rows={6} className="w-full bg-white border border-slate-200 rounded-sm px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-lbbc-green/20 focus:border-lbbc-green transition-all resize-none placeholder:text-slate-300" placeholder={t.contact.form.placeholder}></textarea>
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="inline-flex items-center gap-3 bg-lbbc-green text-white px-10 py-4 rounded-sm font-black text-xs uppercase tracking-[0.2em] hover:bg-lbbc-accent transition-all shadow-xl group w-full md:w-auto justify-center">
                      {t.contact.form.submit}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn Feed Section */}
      <section className="pt-6 md:pt-10 pb-12 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-lbbc-green font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] block mb-3 md:mb-4">{t.contact.socialTag}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">{t.contact.socialTitle}</h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="elfsight-app-a0003657-4b27-403a-aeda-0610cc0d2df4" data-elfsight-app-lazy></div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium italic">{t.contact.disclaimer}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
