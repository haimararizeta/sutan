import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

// ============================================================
// Icons (simple inline SVGs — placeholder iconography)
// ============================================================

const IconAI = () => (
  <svg viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="14" rx="3"/><path d="M12 6V3M9 3h6M8 12h.01M16 12h.01M9 16h6"/></svg>
);
const IconWeb = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>
);
const IconGear = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>
);
const IconBrain = () => (
  <svg viewBox="0 0 24 24"><path d="M9 4a3 3 0 00-3 3v.5A3 3 0 003 11v1a3 3 0 002 2.83V17a3 3 0 003 3h1V4H9zM15 4a3 3 0 013 3v.5a3 3 0 013 3.5v1a3 3 0 01-2 2.83V17a3 3 0 01-3 3h-1V4h0z"/></svg>
);
const IconSparkle = () => (
  <svg viewBox="0 0 24 24"><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" fill="currentColor" stroke="none"/></svg>
);
const IconHandshake = () => (
  <svg viewBox="0 0 24 24"><path d="M3 11l4-4 3 3M21 11l-4-4-3 3M7 13l5 5 5-5M2 8l3-3 4 4M22 8l-3-3-4 4"/></svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" style={{width: 14, height: 14}}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" fill="none" strokeWidth="2"/></svg>
);

// ============================================================
// Background atmosphere
// ============================================================

export function Atmosphere() {
  const glowRef = useRef(null);
  useEffect(() => {
    const onMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <>
      <div className="bg-atmosphere">
        <div className="bg-grid"></div>
        <div className="bg-orb a"></div>
        <div className="bg-orb b"></div>
        <div className="bg-orb c"></div>
      </div>
      <div ref={glowRef} className="cursor-glow"></div>
    </>
  );
}

// ============================================================
// Navigation
// ============================================================

export function Nav({ t, lang, setLang, scrolled, mobileOpen, setMobileOpen }) {
  const links = [
    { id: 'servicios', label: t.nav.services },
    { id: 'proceso', label: t.nav.howWeWork },
    { id: 'por-que-sutan', label: t.nav.whySutan },
    { id: 'contacto', label: t.nav.contact },
  ];
  const go = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <>
      <header className={'nav' + (scrolled ? ' scrolled' : '')}>
        <div className="container nav-inner">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            SU<span className="accent">T</span>AN<span className="logo-dot"></span>
          </a>
          <nav className="nav-links">
            {links.map((l) => (
              <a key={l.id} href={'#' + l.id} className="nav-link"
                 onClick={(e) => { e.preventDefault(); go(l.id); }}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-right">
            <div className="lang-toggle" role="group" aria-label="Language toggle">
              <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>ES</button>
              <span className="sep">|</span>
              <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
            </div>
            <button className="btn btn-primary" onClick={() => go('contacto')}>
              {t.nav.cta} <IconArrow />
            </button>
            <button className={'hamburger' + (mobileOpen ? ' open' : '')}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Menu">
              <span></span>
            </button>
          </div>
        </div>
      </header>
      <div className={'mobile-menu' + (mobileOpen ? ' open' : '')}>
        {links.map((l) => (
          <a key={l.id} href={'#' + l.id} onClick={(e) => { e.preventDefault(); go(l.id); }}>
            {l.label}
          </a>
        ))}
        <button className="btn btn-primary" onClick={() => go('contacto')}>
          {t.nav.cta} <IconArrow />
        </button>
      </div>
    </>
  );
}

// ============================================================
// Hero
// ============================================================

export function Hero({ t }) {
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="badge reveal">
          <span className="star"><IconSparkle /></span>
          {t.hero.badge}
        </div>
        <h1 className="reveal">
          {t.hero.h1Pre}{' '}
          <span className="accent">{t.hero.h1Accent}</span>
        </h1>
        <p className="lead reveal">{t.hero.subtitle}</p>
        <div className="hero-buttons reveal">
          <button className="btn btn-primary btn-lg" onClick={() => go('contacto')}>
            {t.hero.btnPrimary} <IconArrow />
          </button>
          <button className="btn btn-secondary btn-lg" onClick={() => go('servicios')}>
            {t.hero.btnSecondary}
          </button>
        </div>

        <div className="hero-stats reveal-stagger">
          {[1, 2, 3, 4].map((i) => (
            <div className="hero-stat" key={i}>
              <div className="hero-stat-num">{t.hero['stat' + i + 'Num']}</div>
              <div className="hero-stat-label">{t.hero['stat' + i + 'Label']}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-cue">
        <span>{t.hero.scrollCue}</span>
        <div className="scroll-cue-line"></div>
      </div>
    </section>
  );
}

// ============================================================
// Services
// ============================================================

export function Services({ t }) {
  const cards = [
    { icon: <IconBrain />, title: t.services.card1Title, desc: t.services.card1Desc, num: '01' },
    { icon: <IconWeb />, title: t.services.card2Title, desc: t.services.card2Desc, num: '02' },
    { icon: <IconGear />, title: t.services.card3Title, desc: t.services.card3Desc, num: '03' },
  ];

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    e.currentTarget.style.setProperty('--my', (e.clientY - r.top) + 'px');
  };

  return (
    <section className="section" id="servicios">
      <div className="container">
        <div className="section-head reveal">
          <div className="section-label">{t.services.label}</div>
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </div>
        <div className="cards-3 reveal-stagger">
          {cards.map((c, i) => (
            <div key={i} className="card" onMouseMove={onMove}>
              <span className="card-num">{c.num}</span>
              <div className="card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Process
// ============================================================

export function Process({ t }) {
  const steps = [
    { num: '01', title: t.process.step1Title, desc: t.process.step1Desc },
    { num: '02', title: t.process.step2Title, desc: t.process.step2Desc },
    { num: '03', title: t.process.step3Title, desc: t.process.step3Desc },
    { num: '04', title: t.process.step4Title, desc: t.process.step4Desc },
  ];
  return (
    <section className="section section-band" id="proceso">
      <div className="container">
        <div className="section-head center reveal">
          <div className="section-label">{t.process.label}</div>
          <h2 className="section-title">{t.process.title}</h2>
          <p className="section-subtitle">{t.process.subtitle}</p>
        </div>
        <div className="process-grid reveal-stagger">
          <div className="process-line"></div>
          {steps.map((s) => (
            <div className="process-step" key={s.num}>
              <div className="process-num-wrap">
                <div className="process-num">{s.num}</div>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Why Sutan
// ============================================================

export function WhySutan({ t }) {
  const cards = [
    { icon: <IconTarget />, title: t.why.card1Title, desc: t.why.card1Desc },
    { icon: <IconBrain />, title: t.why.card2Title, desc: t.why.card2Desc },
    { icon: <IconGear />, title: t.why.card3Title, desc: t.why.card3Desc },
    { icon: <IconHandshake />, title: t.why.card4Title, desc: t.why.card4Desc },
  ];
  return (
    <section className="section" id="por-que-sutan">
      <div className="container">
        <div className="section-head center reveal">
          <div className="section-label">{t.why.label}</div>
          <h2 className="section-title">{t.why.title}</h2>
          <p className="section-subtitle">{t.why.subtitle}</p>
        </div>
        <div className="why-grid reveal-stagger">
          {cards.map((c, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">{c.icon}</div>
              <div className="why-content">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Contact
// ============================================================

export function Contact({ t }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', service: '', message: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        company: form.company,
        from_email: form.email,
        service: form.service,
        message: form.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setSending(false);
      setSent(true);
      setForm({ name: '', company: '', email: '', service: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }).catch(() => {
      setSending(false);
      setError(true);
    });
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <section className="section" id="contacto">
      <div className="container">
        <div className="contact-card reveal">
          <div className="contact-inner">
            <div className="contact-head">
              <div className="section-label" style={{ justifyContent: 'center', display: 'inline-flex' }}>
                {t.contact.label}
              </div>
              <h2 className="section-title">{t.contact.title}</h2>
              <p className="section-subtitle" style={{ margin: '16px auto 0' }}>{t.contact.subtitle}</p>
            </div>

            {sent ? (
              <div className="form-success">
                <div className="form-success-icon"><IconCheck /></div>
                <h3>{t.contact.successTitle}</h3>
                <p>{t.contact.successDesc}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit}>
                <div className="field">
                  <label>{t.contact.name}</label>
                  <input className="input" required value={form.name} onChange={set('name')} placeholder={t.contact.namePh} />
                </div>
                <div className="field">
                  <label>{t.contact.company}</label>
                  <input className="input" required value={form.company} onChange={set('company')} placeholder={t.contact.companyPh} />
                </div>
                <div className="field full">
                  <label>{t.contact.email}</label>
                  <input className="input" type="email" required value={form.email} onChange={set('email')} placeholder={t.contact.emailPh} />
                </div>
                <div className="field full">
                  <label>{t.contact.serviceLabel}</label>
                  <select className="select" required value={form.service} onChange={set('service')}>
                    <option value="" disabled>{t.contact.servicePh}</option>
                    <option value="ai">{t.contact.service1}</option>
                    <option value="web">{t.contact.service2}</option>
                    <option value="custom">{t.contact.service3}</option>
                  </select>
                </div>
                <div className="field full">
                  <label>{t.contact.message}</label>
                  <textarea className="textarea" required value={form.message} onChange={set('message')} placeholder={t.contact.messagePh} />
                </div>
                {error && (
                  <p style={{ gridColumn: '1/-1', color: '#f87171', fontSize: 14, margin: 0 }}>
                    Hubo un error al enviar. Inténtalo de nuevo.
                  </p>
                )}
                <button type="submit" className="btn btn-primary btn-lg submit" disabled={sending}>
                  {sending ? 'Enviando...' : <>{t.contact.submit} <IconArrow /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Legal Modal
// ============================================================

const LEGAL_CONTENT = {
  aviso: {
    title: 'Aviso Legal',
    body: `
      <h3>Titular del sitio web</h3>
      <p>En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa:</p>
      <ul>
        <li><strong>Denominación social:</strong> Sutan</li>
        <li><strong>País:</strong> España</li>
        <li><strong>Email de contacto:</strong> haimar.arizeta@gmail.com</li>
      </ul>
      <h3>Objeto</h3>
      <p>El presente sitio web tiene por objeto la presentación de los servicios de Sutan: consultoría de inteligencia artificial, desarrollo web y software a medida para empresas.</p>
      <h3>Propiedad intelectual</h3>
      <p>Todos los contenidos del sitio web (textos, imágenes, diseño, código) son propiedad de Sutan o de sus licenciantes, y están protegidos por la legislación española e internacional sobre propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización expresa.</p>
      <h3>Responsabilidad</h3>
      <p>Sutan no se responsabiliza de los daños o perjuicios que pudieran derivarse del uso del sitio web o de la imposibilidad de acceso al mismo. El contenido del sitio puede modificarse, eliminarse o actualizarse sin previo aviso.</p>
      <h3>Legislación aplicable</h3>
      <p>Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de España.</p>
    `
  },
  privacidad: {
    title: 'Política de Privacidad',
    body: `
      <h3>Responsable del tratamiento</h3>
      <p><strong>Identidad:</strong> Sutan<br/><strong>Email:</strong> haimar.arizeta@gmail.com</p>
      <h3>Datos que recopilamos</h3>
      <p>A través del formulario de contacto recopilamos: nombre, nombre de empresa, dirección de email y el mensaje que nos envías. No recopilamos datos especialmente sensibles.</p>
      <h3>Finalidad</h3>
      <p>Los datos facilitados se utilizan exclusivamente para responder a tu consulta y gestionar la comunicación contigo. No se utilizan para ninguna otra finalidad sin tu consentimiento.</p>
      <h3>Legitimación</h3>
      <p>La base legal del tratamiento es tu consentimiento expreso al enviar el formulario de contacto (art. 6.1.a RGPD).</p>
      <h3>Conservación</h3>
      <p>Los datos se conservan durante el tiempo necesario para atender tu solicitud y, en su caso, durante los plazos legalmente establecidos.</p>
      <h3>Destinatarios</h3>
      <p>Los datos no se ceden a terceros, salvo obligación legal. Para el envío de emails utilizamos EmailJS (emailjs.com), que actúa como encargado del tratamiento bajo sus propias políticas de privacidad.</p>
      <h3>Tus derechos</h3>
      <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento enviando un email a <strong>haimar.arizeta@gmail.com</strong>. También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).</p>
    `
  },
  cookies: {
    title: 'Política de Cookies',
    body: `
      <h3>¿Qué son las cookies?</h3>
      <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu navegador para recordar información sobre tu visita.</p>
      <h3>Cookies que utilizamos</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin:16px 0;">
        <thead>
          <tr style="border-bottom:1px solid rgba(37,99,235,0.2);">
            <th style="text-align:left;padding:8px;color:#60A5FA;">Cookie</th>
            <th style="text-align:left;padding:8px;color:#60A5FA;">Tipo</th>
            <th style="text-align:left;padding:8px;color:#60A5FA;">Finalidad</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
            <td style="padding:8px;">sutan_cookies</td>
            <td style="padding:8px;">Técnica</td>
            <td style="padding:8px;">Recuerda si aceptaste las cookies</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
            <td style="padding:8px;">_vercel_*</td>
            <td style="padding:8px;">Analítica</td>
            <td style="padding:8px;">Estadísticas anónimas de visitas (Vercel Analytics)</td>
          </tr>
        </tbody>
      </table>
      <h3>Cómo gestionar las cookies</h3>
      <p>Puedes configurar tu navegador para rechazar o eliminar las cookies. Ten en cuenta que esto puede afectar al funcionamiento del sitio. Consulta la ayuda de tu navegador para más información.</p>
      <h3>Base legal</h3>
      <p>Las cookies técnicas son necesarias para el funcionamiento del sitio (art. 22.2 LSSI). Las cookies analíticas requieren tu consentimiento, que puedes otorgar o revocar en cualquier momento.</p>
    `
  }
};

export function LegalModal({ doc, onClose }) {
  const content = LEGAL_CONTENT[doc];
  if (!content) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(6,9,18,0.92)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px'
    }} onClick={onClose}>
      <div style={{
        background: '#0F2044', border: '1px solid rgba(37,99,235,0.3)',
        borderRadius: 16, maxWidth: 700, width: '100%',
        maxHeight: '80vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 32px', borderBottom: '1px solid rgba(37,99,235,0.2)'
        }}>
          <span style={{ fontWeight: 700, fontSize: 18 }}>{content.title}</span>
          <button onClick={onClose} style={{
            background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)',
            color: '#F8FAFC', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 14
          }}>Cerrar ✕</button>
        </div>
        <div style={{ padding: '24px 32px', overflowY: 'auto', color: '#94A3B8', fontSize: 15, lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: content.body }} />
      </div>
    </div>
  );
}

// ============================================================
// Cookie Banner
// ============================================================

export function CookieBanner({ onAccept }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: 24, right: 24, zIndex: 150,
      background: '#0F2044', border: '1px solid rgba(37,99,235,0.35)',
      borderRadius: 12, padding: '20px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, flexWrap: 'wrap',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
    }}>
      <p style={{ margin: 0, color: '#94A3B8', fontSize: 14, maxWidth: 600 }}>
        Utilizamos cookies propias y de análisis para mejorar tu experiencia.
        Puedes consultar nuestra{' '}
        <span onClick={() => onAccept('cookies')}
          style={{ color: '#60A5FA', cursor: 'pointer', textDecoration: 'underline' }}>
          Política de Cookies
        </span>.
      </p>
      <button onClick={() => onAccept(true)} style={{
        background: '#2563EB', color: '#fff', border: 'none',
        borderRadius: 8, padding: '10px 24px', fontWeight: 600,
        fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap'
      }}>
        Aceptar
      </button>
    </div>
  );
}

// ============================================================
// Footer
// ============================================================

export function Footer({ t, onLegal }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="logo">SU<span className="accent">T</span>AN</div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ color: '#475569', fontSize: 13 }}>{t.footer.copy}</span>
          <span onClick={() => onLegal('aviso')} style={{ color: '#475569', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>Aviso Legal</span>
          <span onClick={() => onLegal('privacidad')} style={{ color: '#475569', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>Privacidad</span>
          <span onClick={() => onLegal('cookies')} style={{ color: '#475569', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>Cookies</span>
        </div>
        <a href={'mailto:' + t.footer.email} className="footer-email">{t.footer.email}</a>
      </div>
    </footer>
  );
}
