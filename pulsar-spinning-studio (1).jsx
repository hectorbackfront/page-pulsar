import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Bike, Volume2, Lightbulb, Dumbbell, UserCheck,
  MapPin, Mail, Instagram, MessageCircle,
  ChevronDown, Menu, X, ArrowRight, Activity, Music, Zap, HeartPulse, Navigation
} from "lucide-react";

/* ============================================================
   CONFIG / CONTATO — edite apenas aqui para trocar número ou mensagens
   ============================================================ */
const WHATSAPP = "5511933302350";
const INSTAGRAM = "@pulsarspinning";

const MENSAGENS = {
  hero:            "Olá! Vim pelo site e quero agendar minha aula experimental na PULSAR.",
  planoMensal:     "Olá! Vim pelo site e tenho interesse no plano mensal da PULSAR.",
  planoTrimestral: "Olá! Vim pelo site e tenho interesse no plano trimestral da PULSAR.",
  planoSemestral:  "Olá! Vim pelo site e tenho interesse no plano semestral da PULSAR.",
  planoAnual:      "Olá! Vim pelo site e tenho interesse no plano anual da PULSAR.",
  experimental:    "Olá! Quero minha aula experimental gratuita na PULSAR.",
  formulario:      "Olá! Vim pelo site e quero entrar em contato com a PULSAR.",
  flutuante:       "Olá! Vim pelo site e quero agendar uma aula na PULSAR.",
};

function getUtmSuffix() {
  try {
    const stored = sessionStorage.getItem("pulsar_utm");
    if (stored !== null) return stored;
    const p = new URLSearchParams(window.location.search);
    const src = p.get("utm_source");
    const content = p.get("utm_content");
    const suffix = (src || content) ? ` [via: ${[src, content].filter(Boolean).join("-")}]` : "";
    sessionStorage.setItem("pulsar_utm", suffix);
    return suffix;
  } catch { return ""; }
}

function linkWhatsApp(origem, customText) {
  const base = customText || MENSAGENS[origem] || MENSAGENS.flutuante;
  const suffix = getUtmSuffix();
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(suffix ? `${base}${suffix}` : base)}`;
}

/* ============================================================
   PULSAR SPINNING STUDIO — Landing Page Premium
   Paleta: #080808 · grafite · branco · prata · glassmorphism
   ============================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root{
  --ink:#080808;
  --graphite:#121214;
  --graphite2:#1a1a1e;
  --line:rgba(255,255,255,.08);
  --silver:#a9adb6;
  --silver-hi:#e8eaef;
  --white:#f6f7f9;
}
*{ box-sizing:border-box; }
html{ scroll-behavior:smooth; }
.pulsar{
  background:var(--ink);
  color:var(--white);
  font-family:'Inter',sans-serif;
  overflow-x:hidden;
}

.font-display{ font-family:'Sora',sans-serif; }
.font-mono{ font-family:'JetBrains Mono',monospace; }

.text-silver{ color:var(--silver); }
.text-silver-hi{ color:var(--silver-hi); }
.bg-ink{ background:var(--ink); }
.bg-graphite{ background:var(--graphite); }

.silver-gradient{
  background:linear-gradient(120deg,#ffffff 0%,#c9cdd6 35%,#8b8f99 60%,#e8eaef 100%);
  -webkit-background-clip:text; background-clip:text; color:transparent;
}
.eyebrow{
  font-family:'JetBrains Mono',monospace;
  font-size:11px; letter-spacing:.35em; text-transform:uppercase;
  color:var(--silver);
  display:inline-flex; align-items:center; gap:12px;
}
.eyebrow::before{ content:""; width:28px; height:1px; background:linear-gradient(90deg,transparent,var(--silver)); }

.glass{
  background:rgba(255,255,255,.03);
  border:1px solid var(--line);
  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
}
.glass-strong{
  background:rgba(10,10,12,.55);
  border:1px solid rgba(255,255,255,.1);
  backdrop-filter:blur(24px) saturate(140%);
  -webkit-backdrop-filter:blur(24px) saturate(140%);
}
.card-hover{ transition:transform .5s cubic-bezier(.2,.8,.2,1), border-color .5s, background .5s, box-shadow .5s; }
.card-hover:hover{
  transform:translateY(-6px);
  border-color:rgba(255,255,255,.18);
  background:rgba(255,255,255,.05);
  box-shadow:0 30px 60px -20px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.04) inset;
}

.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:10px;
  font-family:'Sora',sans-serif; font-weight:600; font-size:14px; letter-spacing:.02em;
  padding:16px 34px; border-radius:999px;
  transition:all .45s cubic-bezier(.2,.8,.2,1);
  border:1px solid transparent;
  cursor:pointer; user-select:none;
}
.btn-primary{
  background:linear-gradient(135deg,#f6f7f9,#c9cdd6);
  color:#0a0a0a;
  box-shadow:0 10px 40px -10px rgba(255,255,255,.25);
}
.btn-primary:hover{ transform:translateY(-2px); box-shadow:0 18px 50px -12px rgba(255,255,255,.4); }
.btn-ghost{
  background:rgba(255,255,255,.03);
  border-color:var(--line);
  color:var(--white);
  backdrop-filter:blur(12px);
}
.btn-ghost:hover{ border-color:rgba(255,255,255,.3); background:rgba(255,255,255,.07); }

/* ---- Alturas de tela seguras no mobile (barra do navegador) ---- */
.screen-h{ min-height:100vh; min-height:100svh; }

/* ---- Ajustes responsivos ---- */
@media (max-width:640px){
  .btn{ width:100%; padding:15px 24px; }
  .masonry{ column-gap:12px; }
}

/* ---- Smoke / atmosphere ---- */
@keyframes drift1{ 0%{transform:translate(-10%,0) scale(1);} 50%{transform:translate(8%,-6%) scale(1.15);} 100%{transform:translate(-10%,0) scale(1);} }
@keyframes drift2{ 0%{transform:translate(6%,4%) scale(1.1);} 50%{transform:translate(-8%,-2%) scale(1);} 100%{transform:translate(6%,4%) scale(1.1);} }
.smoke{ position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none; }
.smoke-1{ width:60vw; height:60vw; background:radial-gradient(circle,rgba(255,255,255,.07),transparent 65%); top:-15%; left:-10%; animation:drift1 18s ease-in-out infinite; }
.smoke-2{ width:50vw; height:50vw; background:radial-gradient(circle,rgba(160,170,190,.06),transparent 60%); bottom:-20%; right:-10%; animation:drift2 22s ease-in-out infinite; }
.spotlight{
  position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(ellipse 40% 55% at 30% -5%, rgba(255,255,255,.09), transparent 70%),
    radial-gradient(ellipse 35% 50% at 72% -5%, rgba(200,210,225,.07), transparent 70%);
}

/* ---- ECG pulse line (assinatura da marca) ---- */
@keyframes ecg{ to{ stroke-dashoffset:-1200; } }
.ecg path{
  stroke-dasharray:600 600;
  animation:ecg 6s linear infinite;
}
@keyframes beat{ 0%,100%{transform:scale(1);} 12%{transform:scale(1.18);} 24%{transform:scale(1);} 36%{transform:scale(1.12);} 48%{transform:scale(1);} }
.beat{ animation:beat 1.4s ease-in-out infinite; transform-origin:center; }

/* ---- Reveal ---- */
.reveal{ opacity:0; transform:translateY(36px); filter:blur(6px); transition:opacity 1s ease, transform 1s cubic-bezier(.2,.8,.2,1), filter 1s ease; }
.reveal.is-visible{ opacity:1; transform:translateY(0); filter:blur(0); }

/* ---- Galeria ---- */
.masonry{ columns:3; column-gap:16px; }
@media (max-width:1023px){ .masonry{ columns:2; } }
@media (max-width:639px){ .masonry{ columns:1; } }
.gal-item{ break-inside:avoid; margin-bottom:16px; border-radius:20px; overflow:hidden; position:relative; }
.gal-item .gal-bg{ transition:transform .8s cubic-bezier(.2,.8,.2,1), filter .8s; filter:grayscale(60%); }
.gal-item:hover .gal-bg{ transform:scale(1.06); filter:grayscale(0%); }
.gal-item .gal-overlay{ opacity:0; transition:opacity .5s; }
.gal-item:hover .gal-overlay{ opacity:1; }

/* ---- Equipe ---- */
.team-photo{ filter:grayscale(100%); transition:filter .7s ease, transform .7s cubic-bezier(.2,.8,.2,1); }
.team-card:hover .team-photo{ filter:grayscale(0%); transform:scale(1.04); }

/* ---- Navbar ---- */
.nav{ transition:background .5s, border-color .5s, backdrop-filter .5s, padding .5s; border-bottom:1px solid transparent; }
.nav.scrolled{
  background:rgba(8,8,8,.55);
  border-color:var(--line);
  backdrop-filter:blur(22px) saturate(140%);
  -webkit-backdrop-filter:blur(22px) saturate(140%);
}
.nav-link{ position:relative; transition:color .3s; }
.nav-link::after{
  content:""; position:absolute; left:0; bottom:-6px; height:1px; width:0;
  background:var(--silver-hi); transition:width .35s ease;
}
.nav-link:hover{ color:var(--white); }
.nav-link:hover::after{ width:100%; }

/* ---- FAQ ---- */
.faq-body{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .5s cubic-bezier(.2,.8,.2,1); }
.faq-body.open{ grid-template-rows:1fr; }
.faq-body > div{ overflow:hidden; }

/* ---- Form ---- */
.field{
  width:100%; background:rgba(255,255,255,.03); border:1px solid var(--line);
  border-radius:14px; padding:15px 18px; color:var(--white);
  font-family:'Inter',sans-serif; font-size:14px; outline:none;
  transition:border-color .3s, background .3s;
}
.field::placeholder{ color:rgba(255,255,255,.3); }
.field:focus{ border-color:rgba(255,255,255,.35); background:rgba(255,255,255,.05); }

::selection{ background:rgba(255,255,255,.9); color:#080808; }

:where(a,button):focus-visible{ outline:2px solid rgba(255,255,255,.7); outline-offset:3px; border-radius:8px; }

/* ---- Botão Flutuante ---- */
.btn-flutuante{
  position:fixed; bottom:24px; right:24px; z-index:40;
  display:inline-flex; align-items:center; gap:10px;
  background:linear-gradient(135deg,#f6f7f9,#c9cdd6);
  color:#0a0a0a;
  font-family:'Sora',sans-serif; font-weight:600; font-size:14px; letter-spacing:.02em;
  padding:14px 26px; border-radius:999px; border:none;
  cursor:pointer; text-decoration:none;
  box-shadow:0 8px 32px -8px rgba(255,255,255,.3), 0 2px 8px rgba(0,0,0,.6);
  transition:transform .45s cubic-bezier(.2,.8,.2,1), opacity .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s;
  min-height:44px;
}
.btn-flutuante:hover{ box-shadow:0 16px 48px -10px rgba(255,255,255,.45), 0 2px 8px rgba(0,0,0,.6); }
@media (max-width:640px){
  .btn-flutuante{ left:16px; right:16px; bottom:max(16px,env(safe-area-inset-bottom,16px)); justify-content:center; padding:16px 24px; }
}

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{ animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important; }
  .reveal{ opacity:1; transform:none; filter:none; }
  html{ scroll-behavior:auto; }
}
`;

/* ---------------- Hooks ---------------- */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Counter({ target, suffix = "", prefix = "" }) {
  const [ref, visible] = useInView(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    const dur = 1800;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* ---------------- Assinatura: linha de batimento ---------------- */
function EcgLine({ className = "" }) {
  return (
    <svg className={`ecg ${className}`} viewBox="0 0 600 60" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 30 H180 L200 30 L212 12 L226 48 L240 22 L252 30 H370 L384 30 L394 18 L406 44 L418 26 L428 30 H600"
        stroke="url(#ecgGrad)" strokeWidth="1.5" strokeLinecap="round"
      />
      <defs>
        <linearGradient id="ecgGrad" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(255,255,255,0)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,.8)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* Marca oficial PULSAR — círculo + onda de pulso (SVG vetorial) */
function PulsarMark({ size = 44, className = "", style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} style={style} aria-hidden="true">
      {/* arcos do círculo com abertura na linha do pulso */}
      <path d="M16.7 52.4 A44 44 0 0 1 103.3 52.4" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M16.7 67.6 A44 44 0 0 0 103.3 67.6" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      {/* onda de pulso atravessando */}
      <path
        d="M2 60 H41 L47 52 L53 66 L58 33 L64 86 L69 43 L73 69 L77 56 L81 60 H118"
        stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round"
      />
    </svg>
  );
}

function Logo({ size = "text-2xl", withMark = true }) {
  return (
    <a href="#home" className={`flex items-center gap-3 leading-none ${size}`}>
      {withMark && <PulsarMark size={38} className="text-white shrink-0" />}
      <span className="font-display" style={{ fontWeight: 700 }}>
        <span className="silver-gradient" style={{ letterSpacing: ".28em" }}>PULSAR</span>
        <span className="block font-mono text-silver" style={{ fontSize: "0.3em", letterSpacing: ".5em", fontWeight: 400, marginTop: 5 }}>
          SPINNING STUDIO
        </span>
      </span>
    </a>
  );
}

/* ---------------- Navbar ---------------- */
const NAV_LINKS = [
  ["Home", "#home"], ["Sobre", "#sobre"], ["Estrutura", "#estrutura"], ["Planos", "#planos"],
  ["Galeria", "#galeria"], ["Contato", "#contato"],
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header className={`nav fixed top-0 left-0 right-0 z-50 ${scrolled ? "scrolled" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between" style={{ height: 76 }}>
        <Logo size="text-xl" />
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} className="nav-link text-sm text-silver font-medium">{label}</a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a href={linkWhatsApp("hero")} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "12px 26px", fontSize: 13 }}>
            Agende sua aula
          </a>
        </div>
        <button className="lg:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden glass-strong border-t px-6 py-6 flex flex-col gap-5" style={{ borderColor: "var(--line)" }}>
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="text-silver-hi font-display text-lg">{label}</a>
          ))}
          <a href={linkWhatsApp("hero")} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn btn-primary mt-2">Agende sua aula</a>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="home" className="screen-h relative flex flex-col items-center justify-center text-center overflow-hidden">
      {/* fundo: imagem sugerida de pedal + luzes (troque a URL por foto real) */}
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(30,32,38,.9), transparent 60%)"
      }} />
      <div className="spotlight" />
      <div className="smoke smoke-1" />
      <div className="smoke smoke-2" />

      {/* grade sutil de piso */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{
        height: "38vh",
        background: "repeating-linear-gradient(90deg, rgba(255,255,255,.03) 0 1px, transparent 1px 80px)",
        maskImage: "linear-gradient(to top, rgba(0,0,0,.6), transparent)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,.6), transparent)",
        transform: "perspective(600px) rotateX(55deg)", transformOrigin: "bottom",
      }} />

      <div className="relative z-10 px-6 flex flex-col items-center" style={{ paddingTop: 90 }}>
        <Reveal>
          <div className="flex flex-col items-center gap-3 mb-10">
            <PulsarMark size={110} className="beat text-white mb-4" style={{ filter: "drop-shadow(0 0 30px rgba(255,255,255,.25))" }} />
            <h1 className="font-display silver-gradient" style={{ fontSize: "clamp(40px,6.5vw,80px)", fontWeight: 700, lineHeight: 1, letterSpacing: ".3em", paddingLeft: ".3em" }}>
              PULSAR
            </h1>
            <span className="font-mono text-silver" style={{ fontSize: 11, letterSpacing: ".6em", paddingLeft: ".6em" }}>SPINNING STUDIO</span>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <EcgLine className="w-full max-w-lg mb-10" style={{ height: 40 }} />
        </Reveal>

        <Reveal delay={250}>
          <h2 className="font-display text-white tracking-tight" style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 600, lineHeight: 1.15, maxWidth: 760 }}>
            Mais que um treino.<br />
            <span className="text-silver">Uma experiência que te move.</span>
          </h2>
        </Reveal>

        <Reveal delay={380}>
          <p className="text-silver mt-6 text-base md:text-lg font-light" style={{ maxWidth: 480 }}>
            Uma nova forma de viver o Spinning em Bom Jesus dos Perdões.
          </p>
        </Reveal>

        <Reveal delay={500}>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a href="#sobre" className="btn btn-ghost">Conheça o Studio</a>
            <a href={linkWhatsApp("hero")} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Agendar Aula Experimental <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>

    </section>
  );
}

/* ---------------- Sobre ---------------- */
function Sobre() {
  const stats = [
    { big: "0", label: "alunos" },
    { big: "0", label: "aulas realizadas" },
    { big: "Alta", label: "performance" },
    { big: "Comunidade", label: "exclusiva" },
  ];
  return (
    <section id="sobre" className="relative py-28 lg:py-36 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal><span className="eyebrow">Sobre o Studio</span></Reveal>
          <Reveal delay={120}>
            <h3 className="font-display text-white mt-6 tracking-tight" style={{ fontSize: "clamp(30px,3.6vw,46px)", fontWeight: 700, lineHeight: 1.1 }}>
              O treino vira <span className="silver-gradient">experiência</span>.
            </h3>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-silver mt-6 text-lg font-light leading-relaxed">
              A PULSAR nasceu para transformar o treino em uma experiência.
              Cada aula combina música, iluminação, energia coletiva e alta
              performance para criar um ambiente que inspira evolução física e mental.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <div className="flex items-center gap-4 mt-10">
              <Activity size={18} className="text-silver" />
              <EcgLine className="flex-1" style={{ height: 32 }} />
            </div>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="glass card-hover rounded-3xl p-8 text-center">
                <div className="font-display silver-gradient" style={{ fontSize: "clamp(28px,3vw,42px)", fontWeight: 800 }}>{s.big}</div>
                <div className="font-mono text-silver mt-2" style={{ fontSize: 11, letterSpacing: ".25em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Estrutura ---------------- */
const ESTRUTURA = [
  { icon: Bike, t: "Spinning Premium", d: "Bikes profissionais de última geração, ajuste milimétrico e resistência precisa para cada nível." },
  { icon: Volume2, t: "Som Profissional", d: "Sistema de áudio imersivo que transforma cada playlist em combustível para o pedal." },
  { icon: Lightbulb, t: "Iluminação Inteligente", d: "Luzes cênicas sincronizadas com o ritmo da aula, criando atmosfera de show." },
  { icon: Dumbbell, t: "Treinos Exclusivos", d: "Metodologias próprias com periodização de intensidade, cadência e resistência." },
  { icon: UserCheck, t: "Acompanhamento Personalizado", d: "Evolução monitorada de perto, com orientação individual dentro da energia do coletivo." },
];

function Estrutura() {
  return (
    <section id="estrutura" className="relative py-28 lg:py-36 px-6 bg-graphite" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="max-w-7xl mx-auto">
        <Reveal><span className="eyebrow">Nossa Estrutura</span></Reveal>
        <Reveal delay={120}>
          <h3 className="font-display text-white mt-6 mb-16 tracking-tight" style={{ fontSize: "clamp(30px,3.6vw,46px)", fontWeight: 700 }}>
            Cada detalhe pensado <span className="text-silver">para performar.</span>
          </h3>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ESTRUTURA.map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="glass card-hover rounded-3xl p-9 h-full">
                <div className="glass rounded-2xl inline-flex p-4 mb-6">
                  <c.icon size={24} strokeWidth={1.4} className="text-silver-hi" />
                </div>
                <h4 className="font-display text-white text-lg mb-3" style={{ fontWeight: 600 }}>{c.t}</h4>
                <p className="text-silver text-sm font-light leading-relaxed">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={540} className="mt-14 flex justify-center">
          <a href="#experimental" className="btn btn-ghost" style={{ padding: "13px 28px", fontSize: 13 }}>
            Conhecer a experiência <ArrowRight size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Experiência (parallax) ---------------- */
function Experiencia() {
  const secRef = useRef(null);
  const [off, setOff] = useState(0);
  useEffect(() => {
    let raf;
    const fn = () => {
      raf = requestAnimationFrame(() => {
        const el = secRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setOff((r.top / window.innerHeight) * 100);
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => { window.removeEventListener("scroll", fn); cancelAnimationFrame(raf); };
  }, []);

  const words = [
    { icon: Lightbulb, w: "Luzes", x: "8%", y: "18%", f: 0.5 },
    { icon: Bike, w: "Bike", x: "80%", y: "22%", f: 0.9 },
    { icon: HeartPulse, w: "Batimentos", x: "12%", y: "74%", f: 0.7 },
    { icon: Music, w: "Música", x: "76%", y: "70%", f: 0.4 },
    { icon: Zap, w: "Energia", x: "46%", y: "88%", f: 1.1 },
  ];

  return (
    <section ref={secRef} className="screen-h relative flex items-center justify-center overflow-hidden">
      <div className="smoke smoke-1" style={{ opacity: .6 }} />
      <div className="spotlight" />
      {words.map((it) => (
        <div key={it.w} className="absolute hidden md:flex items-center gap-2 glass rounded-full px-5 py-2.5"
          style={{ left: it.x, top: it.y, transform: `translateY(${off * it.f}px)`, transition: "transform .1s linear" }}>
          <it.icon size={14} className="text-silver" strokeWidth={1.5} />
          <span className="font-mono text-silver" style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase" }}>{it.w}</span>
        </div>
      ))}
      <div className="relative z-10 text-center px-6" style={{ transform: `translateY(${off * 0.25}px)` }}>
        <Reveal>
          <span className="eyebrow justify-center">Experiência PULSAR</span>
        </Reveal>
        <Reveal delay={150}>
          <h3 className="font-display tracking-tight mt-8" style={{ fontSize: "clamp(34px,6vw,76px)", fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            <span className="text-white">"O treino começa antes</span><br />
            <span className="silver-gradient">da primeira pedalada."</span>
          </h3>
        </Reveal>
        <Reveal delay={300}>
          <EcgLine className="w-full max-w-md mx-auto mt-12" style={{ height: 40 }} />
        </Reveal>
        <Reveal delay={480}>
          <a href="#experimental" className="btn btn-ghost mt-8" style={{ padding: "13px 28px", fontSize: 13 }}>
            Quero minha aula grátis <ArrowRight size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Localização ---------------- */
function Localizacao() {
  return (
    <section id="localizacao" className="py-28 lg:py-36 px-6 bg-graphite" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div className="glass rounded-3xl overflow-hidden relative" style={{ minHeight: 380 }}>
            {/* Mapa estilizado — troque por embed do Google Maps no projeto real */}
            <div className="absolute inset-0" style={{
              background:
                "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 45%, rgba(255,255,255,.06), transparent 55%)" }} />
            <div className="absolute" style={{ left: "50%", top: "42%", transform: "translate(-50%,-50%)" }}>
              <div className="beat glass-strong rounded-full p-4" style={{ boxShadow: "0 0 60px rgba(255,255,255,.15)" }}>
                <MapPin size={26} className="text-white" strokeWidth={1.5} />
              </div>
            </div>
            <div className="absolute bottom-5 left-5 glass-strong rounded-2xl px-5 py-3">
              <div className="font-display text-white text-sm" style={{ fontWeight: 600 }}>Rua Rima Ramos Ferreira, 90</div>
              <div className="font-mono text-silver" style={{ fontSize: 10, letterSpacing: ".2em" }}>Bom Jesus dos Perdões — SP</div>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal><span className="eyebrow">Localização</span></Reveal>
          <Reveal delay={120}>
            <h3 className="font-display text-white mt-6 tracking-tight" style={{ fontSize: "clamp(30px,3.6vw,44px)", fontWeight: 700 }}>
              No coração de<br /><span className="silver-gradient">Bom Jesus dos Perdões.</span>
            </h3>
          </Reveal>
          <div className="mt-8 flex flex-col gap-4">
            {[
              { icon: Navigation, t: "Fácil acesso", d: "Poucos minutos das principais vias da cidade." },
              { icon: MapPin, t: "Região central", d: "Perto de tudo o que importa no seu dia a dia." },
            ].map((it, i) => (
              <Reveal key={it.t} delay={180 + i * 100}>
                <div className="glass card-hover rounded-2xl p-5 flex items-center gap-5">
                  <it.icon size={20} strokeWidth={1.4} className="text-silver-hi shrink-0" />
                  <div>
                    <div className="font-display text-white text-sm" style={{ fontWeight: 600 }}>{it.t}</div>
                    <div className="text-silver text-sm font-light">{it.d}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={520}>
            <a
              href="https://maps.app.goo.gl/cxWbm53KyAu3P5Sx6"
              target="_blank" rel="noreferrer" className="btn btn-primary mt-10"
            >
              Como chegar <Navigation size={15} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}



/* ---------------- Galeria ---------------- */
const GALERIA = [
  { h: 340, label: "Sala de aula", grad: "linear-gradient(160deg,#26262e,#0c0c0f)" },
  { h: 260, label: "Bikes premium", grad: "linear-gradient(200deg,#1e1e26,#0a0a0d)" },
  { h: 300, label: "Iluminação cênica", grad: "linear-gradient(140deg,#2c2c36,#101014)" },
  { h: 280, label: "Energia coletiva", grad: "linear-gradient(180deg,#22222a,#0b0b0e)" },
  { h: 360, label: "Ride noturno", grad: "linear-gradient(150deg,#191920,#08080a)" },
  { h: 250, label: "Detalhe da bike", grad: "linear-gradient(210deg,#28282f,#0d0d10)" },
];

function Galeria() {
  const [light, setLight] = useState(null);
  return (
    <section id="galeria" className="py-28 lg:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal><span className="eyebrow">Galeria</span></Reveal>
        <Reveal delay={120}>
          <h3 className="font-display text-white mt-6 mb-14 tracking-tight" style={{ fontSize: "clamp(30px,3.6vw,46px)", fontWeight: 700 }}>
            A PULSAR <span className="text-silver">em movimento.</span>
          </h3>
        </Reveal>
        <div className="masonry">
          {GALERIA.map((g, i) => (
            <Reveal key={g.label} delay={i * 80}>
              <button className="gal-item w-full text-left border-0 p-0 block" onClick={() => setLight(g)} aria-label={g.label}>
                <div className="gal-bg w-full flex items-end p-6" style={{ height: g.h, background: g.grad }}>
                  <span className="font-mono text-silver" style={{ fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase" }}>{g.label}</span>
                </div>
                <div className="gal-overlay absolute inset-0 flex items-center justify-center glass-strong">
                  <span className="font-display text-white text-sm" style={{ fontWeight: 600 }}>Ampliar</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <Reveal delay={480} className="mt-14 flex justify-center">
          <a href="#experimental" className="btn btn-ghost" style={{ padding: "13px 28px", fontSize: 13 }}>
            Agendar minha visita <ArrowRight size={14} />
          </a>
        </Reveal>
      </div>
      {light && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ background: "rgba(4,4,5,.92)", backdropFilter: "blur(10px)" }} onClick={() => setLight(null)}>
          <button className="absolute top-6 right-6 text-white" aria-label="Fechar"><X size={28} /></button>
          <div className="rounded-3xl w-full max-w-4xl flex items-end p-10" style={{ height: "70vh", background: light.grad }}>
            <span className="font-display text-white text-2xl" style={{ fontWeight: 700 }}>{light.label}</span>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- Planos ---------------- */
const PLANOS = [
  { nome: "Mensal",      preco: "149", per: "/mês", destaque: false, origem: "planoMensal",     itens: ["Aulas ilimitadas", "App de agendamento", "Acesso à comunidade"] },
  { nome: "Trimestral",  preco: "139", per: "/mês", destaque: false, origem: "planoTrimestral", itens: ["Tudo do Mensal", "Avaliação física", "Prioridade no agendamento"] },
  { nome: "Semestral",   preco: "129", per: "/mês", destaque: true,  origem: "planoSemestral",  itens: ["Tudo do Trimestral", "Acompanhamento de evolução", "1 convidado por mês"] },
  { nome: "Anual",       preco: "119", per: "/mês", destaque: false, origem: "planoAnual",      itens: ["Tudo do Semestral", "Kit exclusivo PULSAR", "Eventos fechados"] },
];

function Planos() {
  return (
    <section id="planos" className="py-28 lg:py-36 px-6 bg-graphite" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="max-w-7xl mx-auto">
        <Reveal><span className="eyebrow">Planos</span></Reveal>
        <Reveal delay={120}>
          <h3 className="font-display text-white mt-6 mb-16 tracking-tight" style={{ fontSize: "clamp(30px,3.6vw,46px)", fontWeight: 700 }}>
            Escolha o seu ritmo.
          </h3>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PLANOS.map((p, i) => (
            <Reveal key={p.nome} delay={i * 100} className="h-full">
              <div className={`glass card-hover rounded-3xl p-8 h-full flex flex-col relative ${p.destaque ? "" : ""}`}
                style={p.destaque ? { borderColor: "rgba(255,255,255,.25)", background: "rgba(255,255,255,.055)", boxShadow: "0 20px 70px -30px rgba(255,255,255,.15)" } : {}}>
                {p.destaque && (
                  <span className="absolute -top-3 left-1/2 glass-strong rounded-full font-mono px-4 py-1"
                    style={{ transform: "translateX(-50%)", fontSize: 10, letterSpacing: ".25em", color: "var(--silver-hi)" }}>
                    MAIS ESCOLHIDO
                  </span>
                )}
                <span className="font-mono text-silver" style={{ fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase" }}>{p.nome}</span>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-silver text-sm">R$</span>
                  <span className="font-display silver-gradient" style={{ fontSize: 44, fontWeight: 800 }}>{p.preco}</span>
                  <span className="text-silver text-sm font-light">{p.per}</span>
                </div>
                <ul className="mt-7 flex flex-col gap-3 flex-1">
                  {p.itens.map((it) => (
                    <li key={it} className="text-silver text-sm font-light flex items-start gap-3">
                      <span className="mt-2 shrink-0 rounded-full" style={{ width: 4, height: 4, background: "var(--silver-hi)" }} />
                      {it}
                    </li>
                  ))}
                </ul>
                <a href={linkWhatsApp(p.origem)} target="_blank" rel="noopener noreferrer" className={`btn mt-8 w-full ${p.destaque ? "btn-primary" : "btn-ghost"}`} style={{ padding: "13px 20px", fontSize: 13 }}>
                  Quero começar
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Aula Experimental ---------------- */
function Experimental() {
  return (
    <section id="experimental" className="relative py-32 px-6 overflow-hidden">
      <div className="smoke smoke-2" style={{ opacity: .7 }} />
      <div className="spotlight" />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <Reveal>
          <HeartPulse className="beat text-white mx-auto mb-8 opacity-90" size={36} strokeWidth={1.3} />
        </Reveal>
        <Reveal delay={120}>
          <h3 className="font-display tracking-tight" style={{ fontSize: "clamp(32px,5vw,58px)", fontWeight: 800, lineHeight: 1.08 }}>
            <span className="text-white">Experimente gratuitamente</span><br />
            <span className="silver-gradient">a energia da PULSAR.</span>
          </h3>
        </Reveal>
        <Reveal delay={260}>
          <p className="text-silver mt-6 text-lg font-light">Sua primeira pedalada é por nossa conta. Sem compromisso.</p>
        </Reveal>
        <Reveal delay={380}>
          <a href={linkWhatsApp("experimental")} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-10" style={{ padding: "20px 52px", fontSize: 16 }}>
            Agendar Aula <ArrowRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  { q: "Como funciona?", a: "Você agenda sua aula pelo WhatsApp ou pelo site, chega 15 minutos antes para o ajuste da bike e vive 45 minutos de treino guiado com música, iluminação cênica e energia coletiva." },
  { q: "Preciso levar bicicleta?", a: "Não. O estúdio conta com bikes profissionais de spinning, ajustadas individualmente para o seu biotipo antes de cada aula." },
  { q: "Existe estacionamento?", a: "Sim. Temos vagas disponíveis próximas ao estúdio, na região central de Bom Jesus dos Perdões, com fácil acesso." },
  { q: "Posso fazer aula experimental?", a: "Pode — e é gratuita. Agende pelo botão do site ou pelo WhatsApp e venha sentir a experiência PULSAR sem compromisso." },
  { q: "Como faço minha matrícula?", a: "Após a aula experimental, você escolhe o plano ideal (mensal, trimestral, semestral ou anual) e finaliza a matrícula em minutos, direto no estúdio ou pelo WhatsApp." },
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-28 px-6 bg-graphite" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="max-w-3xl mx-auto">
        <Reveal><span className="eyebrow">FAQ</span></Reveal>
        <Reveal delay={120}>
          <h3 className="font-display text-white mt-6 mb-12 tracking-tight" style={{ fontSize: "clamp(28px,3.4vw,42px)", fontWeight: 700 }}>
            Perguntas frequentes.
          </h3>
        </Reveal>
        <div className="flex flex-col gap-4">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 80}>
              <div className="glass rounded-2xl overflow-hidden">
                <button onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left">
                  <span className="font-display text-white text-base" style={{ fontWeight: 600 }}>{f.q}</span>
                  <ChevronDown size={18} className="text-silver transition-transform duration-500 shrink-0"
                    style={{ transform: open === i ? "rotate(180deg)" : "none" }} />
                </button>
                <div className={`faq-body ${open === i ? "open" : ""}`}>
                  <div><p className="text-silver text-sm font-light leading-relaxed px-7 pb-6">{f.a}</p></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contato ---------------- */
function Contato() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", tel: "", msg: "" });

  const handleEnviar = () => {
    if (!form.nome.trim() || !form.tel.trim()) return;
    const msg = `Olá! Me chamo ${form.nome.trim()}, meu WhatsApp é ${form.tel.trim()}.${form.msg.trim() ? ` Prefiro treinar: ${form.msg.trim()}` : ""}`;
    window.open(linkWhatsApp("formulario", msg), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const canais = [
    { icon: MessageCircle, t: "WhatsApp", d: "(11) 93330-2350", href: linkWhatsApp("formulario") },
    { icon: Instagram, t: "Instagram", d: "@pulsarspinning", href: "https://instagram.com/pulsarspinning" },
    { icon: Mail, t: "Email", d: "pulsarkmh@gmail.com", href: "mailto:pulsarkmh@gmail.com" },
    { icon: MapPin, t: "Localização", d: "Bom Jesus dos Perdões — SP", href: "#localizacao" },
  ];
  return (
    <section id="contato" className="py-28 lg:py-36 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <Reveal><span className="eyebrow">Contato</span></Reveal>
          <Reveal delay={120}>
            <h3 className="font-display text-white mt-6 tracking-tight" style={{ fontSize: "clamp(30px,3.6vw,44px)", fontWeight: 700 }}>
              Vamos <span className="silver-gradient">pedalar juntos?</span>
            </h3>
          </Reveal>
          <div className="mt-10 flex flex-col gap-4">
            {canais.map((c, i) => (
              <Reveal key={c.t} delay={180 + i * 80}>
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="glass card-hover rounded-2xl p-5 flex items-center gap-5">
                  <c.icon size={19} strokeWidth={1.4} className="text-silver-hi shrink-0" />
                  <div>
                    <div className="font-mono text-silver" style={{ fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase" }}>{c.t}</div>
                    <div className="text-white text-sm mt-0.5">{c.d}</div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={200}>
          <div className="glass rounded-3xl p-9">
            <h4 className="font-display text-white text-xl mb-7" style={{ fontWeight: 700 }}>Agende sua aula experimental</h4>
            {sent ? (
              <div className="text-center py-14">
                <HeartPulse className="beat text-white mx-auto mb-5" size={32} strokeWidth={1.4} />
                <p className="font-display text-white text-lg" style={{ fontWeight: 600 }}>Recebido!</p>
                <p className="text-silver text-sm font-light mt-2">Em breve entraremos em contato para confirmar sua aula.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <input className="field" placeholder="Seu nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                <input className="field" placeholder="WhatsApp" value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} />
                <textarea className="field" rows={4} placeholder="Qual horário prefere treinar?" value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} />
                <button className="btn btn-primary w-full mt-2" onClick={handleEnviar}>
                  Enviar mensagem <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="px-6 pt-20 pb-10" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-8">
        <Logo />
        <p className="text-silver text-sm font-light" style={{ maxWidth: 380 }}>
          Mais que um treino. Uma experiência que te move.
        </p>
        <div className="flex gap-5">
          {[Instagram, MessageCircle, Mail].map((I, i) => (
            <a key={i} href="#contato" className="glass card-hover rounded-full p-3.5" aria-label="Rede social">
              <I size={17} strokeWidth={1.5} className="text-silver-hi" />
            </a>
          ))}
        </div>
        <EcgLine className="w-full max-w-sm" style={{ height: 32 }} />
        <p className="font-mono text-silver" style={{ fontSize: 10, letterSpacing: ".2em" }}>
          © {new Date().getFullYear()} PULSAR SPINNING STUDIO · TODOS OS DIREITOS RESERVADOS
        </p>
      </div>
    </footer>
  );
}

/* ---------------- Botão Flutuante ---------------- */
function BotaoFlutuante() {
  const [heroOculto, setHeroOculto] = useState(false);
  const [contatoVisivel, setContatoVisivel] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    const contato = document.getElementById("contato");
    if (!hero || !contato) return;

    const obsHero = new IntersectionObserver(
      ([e]) => setHeroOculto(!e.isIntersecting),
      { threshold: 0 }
    );
    const obsContato = new IntersectionObserver(
      ([e]) => setContatoVisivel(e.isIntersecting),
      { threshold: 0 }
    );

    obsHero.observe(hero);
    obsContato.observe(contato);
    return () => { obsHero.disconnect(); obsContato.disconnect(); };
  }, []);

  const visivel = heroOculto && !contatoVisivel;

  return (
    <a
      href={linkWhatsApp("flutuante")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar aula na PULSAR via WhatsApp"
      className="btn-flutuante"
      style={{
        transform: visivel ? "translateY(0)" : "translateY(calc(100% + 32px))",
        opacity: visivel ? 1 : 0,
        pointerEvents: visivel ? "auto" : "none",
      }}
    >
      <PulsarMark size={20} />
      <span>Agendar aula</span>
    </a>
  );
}

/* ---------------- App ---------------- */
export default function PulsarLanding() {
  return (
    <div className="pulsar min-h-screen">
      <style>{CSS}</style>
      <Navbar />
      <main>
        <Hero />
        <Sobre />
        <Estrutura />
        <Experiencia />
        <Localizacao />
        <Galeria />
        <Planos />
        <Experimental />
        <Faq />
        <Contato />
      </main>
      <Footer />
      <BotaoFlutuante />
    </div>
  );
}
