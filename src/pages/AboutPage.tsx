import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe, Briefcase, Users, Building2, Handshake, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { BioModal } from '../components/Modals';

export const AboutPage = () => {
  const { t } = useLanguage();
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const leadership = [
    {
      name: 'Lord Trefgarne',
      role: 'Honorary President',
      image: '/images/1GJzC8N2lF2CVOQJ32QxZpJi4CIgivksG.jpg',
      bio: 'Lord Trefgarne served in the Conservative administration of Margaret Thatcher as a Government Whip from 1979 to 1981 and as Parliamentary Under-Secretary of State at the Department of Trade in 1981; at the Foreign and Commonwealth Office from 1981 to 1982; at the Department of Health and Social Security from 1982 to 1983; and at the Ministry of Defence from 1983 to 1985. \n\nHe was then promoted to Minister of State for Defence Support, a post he held until 1986, and then served as Minister of State for Defence Procurement from 1986 to 1989 and as a Minister of State at the Department of Trade and Industry from 1989 to 1990. In 1989 he was admitted to the Privy Council. \n\nLord Trefgarne was Chairman of the LBBC from its foundation until December 2013.'
    },
    {
      name: 'Peter Millett CMG',
      role: 'Chairman',
      image: '/images/1GaKHyh3sGNZ4J22uMJ0RHM4wHTZ5FvXN.png',
      bio: 'Peter Millett was appointed as Chairman of the LBBC on 2 March 2022.\n\nHe served as British Ambassador to Libya from June 2015 to January 2018.  \n\nDuring that time he played a role in supporting the UN’s efforts to negotiate and then implement the Libya Political Agreement. He met and built relationships with key political, security and economic players in Libya and in the international community. He also managed the return of the British Embassy from Tunis to Tripoli. \n\nBefore Libya, he was British Ambassador to Jordan from 2011 to 2015 and High Commissioner to Cyprus from 2015 to 2010. Earlier in his career he had diplomatic postings in Venezuela, Qatar, Brussels and Athens.'
    },
    {
      name: 'Susie Davies',
      role: 'CEO',
      image: '/images/1wZxvkLfdJjlkWgNp_JSyAcNDVFLMxxIA.png',
      bio: `Susie Davies joined the LBBC in April 2018 and serves as CEO, running the Business Council from the UK alongside Awatef Shawish in Libya. She is responsible for supporting and growing the membership base, organising events and delegations across the UK and Libya, fostering strategic partnerships, and leading initiatives to strengthen bilateral trade relations between the two countries.

An expert in education and digital training, Susie has worked extensively with the NHS and other organisations across the UK, delivering elearning programmes and digital resources that enhance workforce capability and development.

Before joining the LBBC, Susie worked for Thomson Reuters as a Project Manager within the Global Operations division. Prior to joining Reuters, she organised international delegations to many countries including Libya, building valuable cross-border business connections.`
    },
    {
      name: 'Awatef Shawish',
      role: 'Business Development Director',
      image: '/images/1yfeorNurq8NSzAojDA5Hj-Ij4OFXftV6.png',
      bio: `Awatef Shawish joined the LBBC in September 2024 and is currently the LBBC’s Business Development Director in Libya.

She is responsible for running the Business Council in Libya, focusing on growing and supporting members across Libya and the UK, organising events and delegations, developing strategic partnerships, and leading marketing initiatives to strengthen bilateral trade relations.

Before joining the LBBC, Awatef worked for the German International Cooperation Agency, GIZ, as an Administration and Finance Manager in the Libya Office.  Prior to joining GIZ, she worked at the British Council as the Programme Director, Managing several projects across Libya and the MENA region. Awatef is also a Co-Founder of a Non-Governmental Organisation called Peace, Equality, and Prosperity (PEP), focused on youth and women capacity development.

Awatef Shawish brings a wealth of expertise, leadership acumen, and a passion for societal advancement to her role at LBBC, embodying a dedication to fostering collaboration, growth, and sustainable development within the Libyan business landscape.`
    }
  ];

  const board = [
    { 
      name: 'Ghassan Atiga', 
      role: 'Head of Libya Business, Bank ABC', 
      image: '/images/1lZnTxLNqqFSCkP4c0E3hAUBaVFw1pSAq.png',
      bio: `Ghassan as Head of Libyan Business for Bank ABC, has a robust foundation in corporate and trade finance.  The Libyan Business Coverage leverages a deep collective expertise in MENA, Europe and North America markets within Bank ABC global coverage in 16 countries. The group’s commitment to excellence and strategic insight has empowered them to nurture pivotal cross-border partnerships, reinforcing Bank ABC’s presence as a stalwart in international wholesale banking.  Ghassan joined the LBBC Board in April 2025.`
    },
    { 
      name: 'Ahmed Ben Halim', 
      role: 'Founder and Chairman, Libya Holdings Group', 
      image: '/images/1nBpPgZVRGPPNqoP0vDAXCeJTCJJY3B9z.png',
      bio: `Ahmed is the Founder and Chairman of Libya Holdings Group Ltd. (LHG).  Ahmed has over 35 years’ experience in Principal Investments, Corporate Finance and Asset Management.  Ahmed serves as Ahmed is the Founder and Chairman of Libya Holdings Group Ltd. (LHG).  Ahmed has over 35 years’ experience in Principal Investments, Corporate Finance and Asset Management.  Ahmed serves as operating businesses in Libya.  LHG provides its partners with local knowledge, a network of contacts, operational support and seed capital.`
    },
    { 
      name: 'Husni Bey', 
      role: 'Owner and Chairman, HB Group', 
      image: '/images/1T-vsHm0pW3DVeFsW7wzt-rXxY8oTRajU.png',
      bio: `Husni Bey holds credentials as a Master Mariner and an MSc in Economics. Since assuming leadership of the family business in 1993, he has been instrumental in transforming HB Group from a logistics company into a diversified conglomerate spanning technology, finance and banking, manufacturing, trading, real estate development, and fast-moving consumer goods distribution. Under his guidance, HB Group has become one of Libya’s leading FMCG distributors.

Beyond his business achievements, Husni Bey is recognized as a prominent advocate for private enterprise in Libya. He has consistently championed the need for government investment in critical sectors including education, healthcare, capacity building, and infrastructure development. His leadership philosophy centers on the belief that sustainable economic growth requires both private sector innovation and strategic public investment in foundational systems.

Through his stewardship of HB Group and his advocacy for progressive economic policies, Husni Bey has established himself as a key figure in Libya’s business landscape and a voice for balanced economic development. Husni Bey joined the LBBC Board in July 2025.`
    },
    { 
      name: 'Melanie Butler', 
      role: 'Partner, Integrity Global Advisors', 
      image: '/images/1rMM_bWvDUDOYaY4ni01u6eN01dqkZCpQ.png',
      bio: `Melanie Butler as Partner at PwC led their Global Crisis Centre “GCC”, which acts as a trusted guide to clients as they prepare for, respond to and recover from the crises they face. Prior to her GCC role, she led our Deals Advisory practice based in Tripoli, Libya, post-revolution. Her clients included the National Transitional Council’s Temporary Financing Mechanism, Ministries of Health, Housing and Education, World Bank [WB] and General Electric Company of Libya [GECOL]. She has been a partner at PwC in the UK since 2003.

A forensic accountant by background, Melanie’s experience is focused on crisis response, financial management, investigations and contract examinations, in particular the areas of transparency, accountability and governance. She joined the Board of the LBBC in 2014.`
    },
    { 
      name: 'Tarek Eltumi', 
      role: 'Founder and Partner, Eltumi Partners', 
      image: '/images/1KjCsgV1zJO6HkxdXWVIsltBVnoiQRY9H.jpg',
      bio: `Tarek is a dual Libyan/New York qualified lawyer with a broad practice that covers general corporate and commercial matters (foreign direct investment, joint ventures, restructurings), project development, finance and dispute resolution. He works principally in the sovereign wealth, energy, infrastructure and telecommunications sectors, with a geographic focus mainly on Libya, but also on Europe and Sub-Saharan Africa more generally.

Tarek practised in Tripoli, Libya for just under 10 years where he advised on a range of innovative international finance deals and major infrastructure, oil and gas and tourism projects. Tarek went on to work as General Counsel of AECOM Libya Housing and Infrastructure Inc., where he directed all legal issues arising from the US$55bn Libyan Housing and Infrastructure Program.

During the 2011 Libyan uprising, he served as special advisor and member of staff of the Prime Minister of Libya appointed by the National Transitional Council.

Tarek then went on to join the international law firm Hogan Lovells 2012 where he ran that firm’s Libya Practice and was a member of the Infrastructure, Energy, Resources and Projects practice.  Tarek became Partner at that firm and retired in June 2018 to pursue establishing Eltumi & Co as a leading Libyan law practice.

Tarek is fluent in both English and Arabic and is widely published on matters of Libyan law.`
    },
    { 
      name: 'Pauline Graham', 
      role: 'Co-Founder, Libyan British Business Council', 
      image: '/images/1LpH1-ewdmGn4n4zuYSCJAkSMI1h9IAr2.png',
      bio: `Pauline Graham has spent her working career in the exhibitions and conference industry. With her late husband, Dermot Graham, she set up an events management company which organised trade and investment delegations to overseas markets specifically viewed as ‘difficult’.

She was a co-founder of the Libyan British Business Council and was, until April 2018, responsible for the business side of the organisation.  Pauline’s previous role was General Secretary of BILNAS`
    },
    {
      name: 'Haythem Rashed',
      role: 'Managing Director, Quidux Consulting',
      image: '/images/1hU8EEvd5lSPhwzUYdUTnDfzPHPl98Vhw.png',
      bio: `Haythem is the founder of Quidux Consulting, established in 2020, specialising in energy advisory and analytical work for public and private institutions with a particular focus on Libya. He brings over 20 years of experience at the intersection of the oil & gas and finance industries, including a senior role at Saudi Aramco, where he played a key part in establishing the company's investor relations function following the world's largest IPO.

Prior to this, Haythem served as an Executive Director and top-rated oil & gas equity research analyst at Morgan Stanley in London, covering European integrated oil companies and leading the firm's MENA oil & gas commodity research. He also held a position within Merrill Lynch's Equity Capital Markets division in London, advising on IPOs and secondary offerings across GCC and European markets.

Haythem is a CFA charterholder and holds a first-class degree in Economics from University College London. Haythem was appointed a Director of the LBBC in April 2026.`
    },
    { 
      name: 'Alan Rides', 
      role: 'Chief Executive Officer, West London Chambers', 
      image: '/images/1z7-hAF6WOxvisuDA3KOGgbQVu2kkhHMe.png',
      bio: `Alan, with 40 years of commercial business experience runs West London Chambers of Commerce with a focus on International and local business, so is happy to help deliver advice and connections to help your business get better visibility, grow and improve your finances.

Alan back started his export career in Metal Box PLC export shipping department in West Acton, progressing to Diageo export customer services department dealing with global exports. Since graduating from the Institute of Export at West Thames College he has been a front line businessman across Africa, Asia and the Middle East for 25 years working for UK Export trading companies with manufacturing arms who set up local successful offices and dealerships for UK companies. Alan first visited Libya in 1992, to Tripoli and set up an office in Benghazi in 1998 and has done business across the whole country from Aziza to Zliten in multiple sectors including Automotive, HVAC, Plant, Agri, Construction, Manufacturing and O&G and was part of the team that was awarded the Queens Award. This propelled Alan’s career to Director level as sales grew and local offices were set up in 4 overseas markets. then on to set up his own Consultancy (ARC) and be a British Government (UKTI / DIT) Trade Officer.

Alan is also a guest lecturer at King’s College London, Brunel University and University of West London plus local colleges and a local college governor.

Alan joined the LBBC Board in July 2025.`
    },
    { 
      name: 'Bob Phillips', 
      role: 'Division Director, Mott Macdonald', 
      image: '/images/1P57XX0ZF3fPpDKyYJqQKLrlVwTpDs6ko.png',
      bio: `Bob Phillips is a Director of Mott MacDonald and is primarily responsible for business development across North Africa and Country Manager for Libya. He has been responsible for managing a wide range of management, commercial and technical advisory services on pan-sector infrastructure redevelopment with a particular focus on the more challenging post conflict global environments and fragile states.

Bob has over 25 years of management experience, in both private and public sectors, encompassing extensive international stakeholder engagement at government and ministerial level. He was appointed to the Board of the LBBC in 2016.`
    }
  ];

  const partners = [
    { name: 'British Embassy', logo: '/images/15wu-9uxhuoq3tQF9RdMj5JKCm4UQlOXl.png' },
    { name: 'UK FCDO', logo: '/images/14Vz7QDoZA0mY0wfWOYtv4oNXC-fWsfIA.png' },
    { name: 'UK DIT', logo: '/images/1WITAc3xTAWHEMWnfMZXvr8HR3beKE-S2.png' },
    { name: 'NOC', logo: '/images/1298kn4VMFdwtdchqygp_Edk5XbaBty8B.png' },
    { name: 'REAOL', logo: '/images/1WjTH2bcM6soZgKQuXBbmGgwQobDMiFNg.png' },
    { name: 'ARAB BANKERS ASSOCIATION', logo: '/images/1SG9DMnjp0UJAz6Akdl2ie5yHiNyjEcW5.png' },
    { name: 'EIC', logo: '/images/16lXOVQpw5HTD8EU2ZwP2dT3Iwl44teja.png' },
    { name: 'LEGACY', logo: '/images/1wOfJy8X8F_NxWU16vEquTjxDMaTws2Fs.png' }
  ];

  return (
    <div className="pt-32">
      <SEO 
        title={t.nav.about} 
        description="Learn about the Libyan British Business Council, our leadership, board of directors, and our mission to foster UK-Libya trade."
        canonical="about"
      />
      {/* Header Banner */}
      <section className="relative h-[250px] md:h-[300px] flex items-center overflow-hidden bg-slate-900">
        <img 
          src="/images/1Gvq_EVuoyOiiBD4ZQvVIOwMOVlMQAC0h.png" 
          alt="About Header" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-lbbc-green/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white font-black text-[8px] md:text-[9px] uppercase tracking-[0.4em] mb-4 md:mb-6 border border-white/20">
              {t.about.page.tag}
            </span>
            <h1 className="text-2xl md:text-5xl font-black text-white leading-tight max-w-3xl tracking-tight">
              {t.about.page.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 lg:items-center">
            <div className="lg:w-1/2 space-y-6 md:space-y-10">
              <div className="space-y-3 md:space-y-4">
                <span className="text-lbbc-green font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] block">{t.about.page.overviewTag}</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">{t.about.page.overviewTitle}</h2>
              </div>
              <div className="prose prose-slate prose-base md:prose-lg max-w-none text-slate-600 space-y-4 md:space-y-6">
                <p>
                  {t.about.page.overviewP1}
                </p>
                <p>
                  {t.about.page.overviewP2}
                </p>
                <p>
                  {t.about.page.overviewP3}
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
              <div className="bg-slate-50 p-6 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 space-y-3 md:space-y-4 h-full">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-lbbc-green/10 rounded-lg md:rounded-xl flex items-center justify-center text-lbbc-green">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] md:text-xs">{t.about.page.feature1}</h4>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{t.about.page.feature1Text}</p>
              </div>
              <div className="bg-slate-50 p-6 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 space-y-3 md:space-y-4 h-full">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-lbbc-green/10 rounded-lg md:rounded-xl flex items-center justify-center text-lbbc-green">
                  <Globe size={24} />
                </div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] md:text-xs">{t.about.page.feature2}</h4>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{t.about.page.feature2Text}</p>
              </div>
              <div className="bg-slate-50 p-6 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 space-y-3 md:space-y-4 h-full">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-lbbc-green/10 rounded-lg md:rounded-xl flex items-center justify-center text-lbbc-green">
                  <Briefcase size={24} />
                </div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] md:text-xs">{t.about.page.feature3}</h4>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{t.about.page.feature3Text}</p>
              </div>
              <div className="bg-slate-50 p-6 md:p-8 rounded-xl md:rounded-2xl border border-slate-100 space-y-3 md:space-y-4 h-full">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-lbbc-green/10 rounded-lg md:rounded-xl flex items-center justify-center text-lbbc-green">
                  <Users size={24} />
                </div>
                <h4 className="font-black text-slate-900 uppercase tracking-widest text-[10px] md:text-xs">{t.about.page.feature4}</h4>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{t.about.page.feature4Text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12 md:mb-16">
            <span className="text-lbbc-green font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] block mb-3 md:mb-4">{t.about.page.missionTag}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-4 md:mb-6">{t.about.page.missionTitle}</h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed">
              {t.about.page.missionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div className="bg-white p-8 md:p-10 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 space-y-4 md:space-y-6 group hover:shadow-xl transition-all">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-lbbc-green text-white rounded-lg md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Handshake size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight whitespace-nowrap">{t.about.page.pillar1Title}</h3>
              <p className="text-sm md:text-slate-600 leading-relaxed">
                {t.about.page.pillar1Text}
              </p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 space-y-4 md:space-y-6 group hover:shadow-xl transition-all">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-lbbc-green text-white rounded-lg md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight whitespace-nowrap">{t.about.page.pillar2Title}</h3>
              <p className="text-sm md:text-slate-600 leading-relaxed">
                {t.about.page.pillar2Text}
              </p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 space-y-4 md:space-y-6 group hover:shadow-xl transition-all">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-lbbc-green text-white rounded-lg md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight whitespace-nowrap">{t.about.page.pillar3Title}</h3>
              <p className="text-sm md:text-slate-600 leading-relaxed">
                {t.about.page.pillar3Text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Leadership Section */}
      <section id="leadership" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-lbbc-green font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] block mb-3 md:mb-4">{t.nav.leadership.toUpperCase()}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">{t.nav.leadership}</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {leadership.map((person) => (
              <div key={person.name} className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
                <div 
                  onClick={() => setSelectedPerson(person)}
                  className="aspect-square rounded-lg md:rounded-xl overflow-hidden bg-slate-50 mb-4 md:mb-6 relative cursor-pointer"
                >
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lbbc-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm md:text-xl font-black text-slate-900 tracking-tight">{person.name}</h3>
                  <p className="text-lbbc-green font-bold uppercase tracking-widest text-[8px] md:text-[10px]">{person.role}</p>
                  <button 
                    onClick={() => setSelectedPerson(person)}
                    className="mt-3 md:mt-4 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-lbbc-red flex items-center gap-2 transition-colors"
                  >
                    Read Bio <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Board Section */}
      <section id="board" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-lbbc-green font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] block mb-3 md:mb-4">{t.board.tag}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">{t.board.title}</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {board.map((person) => (
              <div key={person.name} className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
                <div 
                  onClick={() => setSelectedPerson(person)}
                  className="aspect-square rounded-lg md:rounded-xl overflow-hidden bg-slate-50 mb-4 md:mb-6 cursor-pointer"
                >
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-full object-cover transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm md:text-lg font-black text-slate-900 tracking-tight">{person.name}</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">{person.role}</p>
                  <button 
                    onClick={() => setSelectedPerson(person)}
                    className="pt-3 md:pt-4 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-lbbc-green flex items-center gap-2 hover:text-lbbc-red transition-colors"
                  >
                    Read Bio <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section id="partners" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-lbbc-green font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] block mb-3 md:mb-4">{t.partners.tag}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">{t.partners.title}</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center">
            {partners.map((partner) => (
              <div key={partner.name} className="flex flex-col items-center gap-4 group w-full sm:w-[calc(50%-20px)] lg:w-[calc(25%-30px)] max-w-[320px]">
                <div className="h-32 md:h-48 w-full flex items-center justify-center transition-all bg-slate-50 rounded-2xl p-6 md:p-10 border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-xl">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-[70%] max-w-[85%] object-contain transition-all duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-center group-hover:text-lbbc-green transition-colors">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BioModal 
        person={selectedPerson} 
        isOpen={!!selectedPerson} 
        onClose={() => setSelectedPerson(null)} 
      />
    </div>
  );
};

export default AboutPage;
