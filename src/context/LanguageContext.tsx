import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { translations } from '../translations';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('lbbc_language');
      if (saved === 'en' || saved === 'ar') return saved;
    } catch (e) {
      console.error('Error accessing localStorage:', e);
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lbbc_language', lang);
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.lang = lang;
  };

  useEffect(() => {
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.lang = language;
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
