import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { inject } from '@vercel/analytics';
import { TRANSLATIONS } from './translations.js';
import { Atmosphere, Nav, Hero, Services, Process, WhySutan, Contact, Footer, LegalModal, CookieBanner } from './components.jsx';
import './styles.css';

inject();

function App() {
  const [lang, setLang] = useState('es');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState(null);
  const [cookiesAccepted, setCookiesAccepted] = useState(
    () => localStorage.getItem('sutan_cookies') === 'true'
  );
  const t = TRANSLATIONS[lang];

  const handleCookies = (val) => {
    if (val === true) {
      localStorage.setItem('sutan_cookies', 'true');
      setCookiesAccepted(true);
    } else {
      setLegalDoc(val);
    }
  };

  // Scroll state for nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  return (
    <>
      <Atmosphere />
      <Nav t={t} lang={lang} setLang={setLang}
           scrolled={scrolled}
           mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>
        <Hero t={t} />
        <Services t={t} />
        <Process t={t} />
        <WhySutan t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} onLegal={setLegalDoc} />
      {legalDoc && <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />}
      {!cookiesAccepted && <CookieBanner onAccept={handleCookies} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
