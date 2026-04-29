import { motion, AnimatePresence } from 'framer-motion';
import { X, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BioModal = ({ person, isOpen, onClose }: { person: any, isOpen: boolean, onClose: () => void }) => {
  const { t } = useLanguage();
  if (!person) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-2xl flex flex-col-reverse md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-slate-100/80 hover:bg-slate-200 rounded-full transition-colors text-slate-800 md:text-white md:bg-black/20 backdrop-blur-sm"
            >
              <X size={20} />
            </button>

            <div className="hidden md:block md:w-2/5 relative bg-slate-100 flex-shrink-0">
              <img 
                src={person.image} 
                alt={person.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="w-full md:w-3/5 p-6 md:p-12 overflow-y-auto">
              <div className="mb-6 md:mb-8 pr-10 md:pr-0">
                <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-1 md:mb-2">{person.name}</h3>
                <p className="text-lbbc-green font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm">{person.role}</p>
              </div>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {person.bio || t.about.leadershipBioFallback.replace('{name}', person.name).replace('{role}', person.role)}
                </p>
              </div>
              <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-slate-100 flex items-center gap-6">
                <a href="#" className="text-slate-400 hover:text-lbbc-red transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-lbbc-red transition-colors"><Mail size={20} /></a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const GovernanceModal = ({ policy, isOpen, onClose }: { policy: any, isOpen: boolean, onClose: () => void }) => {
  const { t } = useLanguage();
  if (!policy) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-2xl p-8 md:p-12 max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-800"
            >
              <X size={20} />
            </button>

            <div className="mb-6 md:mb-8">
              <span className="text-lbbc-green font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] block mb-2">{t.membership.policyStatement}</span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{policy.title}</h3>
            </div>
            
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                {policy.content}
              </p>
            </div>
            
            <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
              <button 
                onClick={onClose}
                className="bg-lbbc-green text-white px-8 py-3 rounded-full text-xs font-bold hover:bg-lbbc-red transition-all uppercase tracking-widest"
              >
                {t.membership.close}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
