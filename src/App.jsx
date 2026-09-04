import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Bike, Volume2, Lightbulb, Snowflake, Dumbbell, UserCheck,
  MapPin, Mail, Instagram, MessageCircle,
  Menu, X, ArrowRight, Activity, Music, Zap, HeartPulse, Navigation
} from "lucide-react";

/* ============================================================
   PULSAR BIKE INDOOR — Landing Page Premium
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
/* Tablet */
@media (max-width:1024px){
  section{ padding-left:24px; padding-right:24px; }
}
/* Celular */
@media (max-width:640px){
  .btn{ width:100%; padding:15px 24px; }
  /* botao dentro de card/linha nao estica */
  .btn-inline{ width:auto !important; }
  .eyebrow{ font-size:10px; letter-spacing:.25em; }
  .eyebrow::before{ width:18px; }
  /* respiro menor entre secoes */
  section{ padding-top:72px !important; padding-bottom:72px !important; }
  #home{ padding-top:0 !important; padding-bottom:0 !important; }
  .glass, .glass-strong{ backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); }
}
/* Celular pequeno (iPhone SE, 320-380px) */
@media (max-width:400px){
  .hero-title{ letter-spacing:.18em !important; padding-left:.18em !important; }
  .hero-sub{ letter-spacing:.35em !important; padding-left:.35em !important; font-size:10px !important; }
}
/* Telas baixas deitadas: nao forcar 100vh */
@media (max-height:560px) and (orientation:landscape){
  .screen-h{ min-height:auto; padding-top:110px; padding-bottom:70px; }
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

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{ animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important; }
  .reveal{ opacity:1; transform:none; filter:none; }
  html{ scroll-behavior:auto; }
}
`;

/* URL do sistema de agendamento. Troque aqui quando o subdominio
   app.pulsaracademia.com.br estiver no ar. */
const SISTEMA = "https://app.pulsaracademia.com.br";

/* WhatsApp do estudio, ja com a mensagem preenchida. */
const WHATSAPP = "https://wa.me/5511933302350?text=Ol%C3%A1!%20Quero%20agendar%20uma%20aula%20no%20PULSAR%20%F0%9F%9A%B4";

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
          BIKE INDOOR
        </span>
      </span>
    </a>
  );
}

/* ---------------- Navbar ---------------- */
const NAV_LINKS = [
  ["Home", "#home"], ["Sobre", "#sobre"], ["Estrutura", "#estrutura"],
  ["Planos", "#planos"], ["Contato", "#contato"],
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
          <a href={`${SISTEMA}/?tipo=avulsa`} className="btn btn-primary" style={{ padding: "12px 26px", fontSize: 13 }}>
            Agende sua aula
          </a>
        </div>
        <button className="lg:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden glass-strong border-t px-6 py-6 flex flex-col gap-5" style={{ borderColor: "var(--line)", maxHeight: "calc(100vh - 76px)", overflowY: "auto" }}>
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="text-silver-hi font-display text-lg">{label}</a>
          ))}
          <a href={`${SISTEMA}/?tipo=avulsa`} onClick={() => setOpen(false)} className="btn btn-primary mt-2">Agende sua aula</a>
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
      <div className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden" style={{
        height: "38vh",
        background: "repeating-linear-gradient(90deg, rgba(255,255,255,.03) 0 1px, transparent 1px 80px)",
        maskImage: "linear-gradient(to top, rgba(0,0,0,.6), transparent)",
        WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,.6), transparent)",
        transform: "perspective(600px) rotateX(55deg)", transformOrigin: "bottom",
      }} />

      <div className="relative z-10 px-6 flex flex-col items-center" style={{ paddingTop: 90 }}>
        <Reveal>
          <div className="flex flex-col items-center gap-3 mb-10">
            <PulsarMark size={typeof window !== "undefined" && window.innerWidth < 640 ? 80 : 110} className="beat text-white mb-4" style={{ filter: "drop-shadow(0 0 30px rgba(255,255,255,.25))" }} />
            <h1 className="font-display silver-gradient hero-title" style={{ fontSize: "clamp(34px,6.5vw,80px)", fontWeight: 700, lineHeight: 1, letterSpacing: ".3em", paddingLeft: ".3em" }}>
              PULSAR
            </h1>
            <span className="font-mono text-silver hero-sub" style={{ fontSize: 11, letterSpacing: ".6em", paddingLeft: ".6em" }}>BIKE INDOOR</span>
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
            <a href={`${SISTEMA}/?tipo=avulsa`} className="btn btn-primary">
              Agendar minha aula <ArrowRight size={16} />
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
    { big: <Counter target={15} />, label: "bikes por aula" },
    { big: <Counter target={45} suffix="min" />, label: "de treino guiado" },
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
  { icon: Snowflake, t: "Ambiente Climatizado", d: "Climatização por insuflamento que mantém a temperatura ideal do início ao sprint final." },
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
          <div className="glass rounded-3xl overflow-hidden relative" style={{ minHeight: "clamp(260px,45vw,380px)" }}>
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
              <div className="font-display text-white text-sm" style={{ fontWeight: 600 }}>Bom Jesus dos Perdões — SP</div>
              <div className="font-mono text-silver" style={{ fontSize: 10, letterSpacing: ".2em" }}>23°08'S · 46°28'W</div>
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
              href="https://www.google.com/maps/search/?api=1&query=Bom+Jesus+dos+Perd%C3%B5es+SP"
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

/* ---------------- Planos ---------------- */
const PLANOS = [
  { freq: 1, nome: "1x por semana", cheio: "99,90", preco: "89,91", itens: ["1 aula por semana", "Agendamento pelo site", "Válido de segunda a sexta"] },
  { freq: 2, nome: "2x por semana", cheio: "139,90", preco: "125,91", itens: ["2 aulas por semana", "Agendamento pelo site", "Válido de segunda a sexta"] },
  { freq: 3, nome: "3x por semana", cheio: "169,90", preco: "152,91", destaque: true, itens: ["3 aulas por semana", "Agendamento pelo site", "Válido de segunda a sexta"] },
  { freq: 4, nome: "4x por semana", cheio: "209,90", preco: "188,91", itens: ["4 aulas por semana", "Agendamento pelo site", "Válido de segunda a sexta"] },
  { freq: 5, nome: "5x por semana", cheio: "239,90", preco: "215,91", itens: ["5 aulas por semana", "Agendamento pelo site", "Válido de segunda a sexta"] },
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
        <Reveal delay={80}>
          <div className="glass rounded-2xl px-6 py-5 mb-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-6"
            style={{ borderColor: "rgba(124,255,178,.25)" }}>
            <span className="font-mono shrink-0" style={{ fontSize: 10, letterSpacing: ".2em", color: "#7CFFB2",
              border: "1px solid rgba(124,255,178,.3)", background: "rgba(124,255,178,.08)",
              borderRadius: 999, padding: "6px 14px" }}>
              PREÇO DE FUNDADORA
            </span>
            <p className="text-silver text-sm font-light">
              10% de desconto para as 100 primeiras alunas. Seu plano começa a valer na
              inauguração, dia 12 de setembro.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
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
                <div className="mt-5">
                  <div className="text-silver text-sm" style={{ textDecoration: "line-through", opacity: .7 }}>
                    R$ {p.cheio}/mês
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-silver text-sm">R$</span>
                    <span className="font-display silver-gradient" style={{ fontSize: 34, fontWeight: 800 }}>{p.preco}</span>
                    <span className="text-silver text-sm font-light">/mês</span>
                  </div>
                  <div className="font-mono mt-2" style={{ fontSize: 10, letterSpacing: ".15em", color: "#7CFFB2" }}>
                    -10% PREÇO DE FUNDADORA
                  </div>
                </div>
                <ul className="mt-7 flex flex-col gap-3 flex-1">
                  {p.itens.map((it) => (
                    <li key={it} className="text-silver text-sm font-light flex items-start gap-3">
                      <span className="mt-2 shrink-0 rounded-full" style={{ width: 4, height: 4, background: "var(--silver-hi)" }} />
                      {it}
                    </li>
                  ))}
                </ul>
                <a href={`${SISTEMA}/?plano=${p.freq}x`} className={`btn mt-8 w-full ${p.destaque ? "btn-primary" : "btn-ghost"}`} style={{ padding: "13px 20px", fontSize: 13 }}>
                  Quero começar
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <div className="glass rounded-3xl p-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-mono text-silver" style={{ fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase" }}>Sem plano</span>
              <h4 className="font-display text-white text-xl mt-3" style={{ fontWeight: 700 }}>Aula avulsa</h4>
              <p className="text-silver text-sm font-light mt-2" style={{ maxWidth: 460 }}>
                Sem mensalidade. Escolha o dia, pague online e sua bike fica reservada.
                Fins de semana são sempre avulsos.
              </p>
            </div>
            <div className="flex flex-col sm:items-center gap-4 shrink-0 w-full md:w-auto">
              <div className="flex items-baseline gap-1">
                <span className="text-silver text-sm">R$</span>
                <span className="font-display silver-gradient" style={{ fontSize: 40, fontWeight: 800 }}>30</span>
              </div>
              <a href={`${SISTEMA}/?tipo=avulsa`} className="btn btn-ghost" style={{ padding: "13px 28px", fontSize: 13 }}>
                Agendar avulsa
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Primeira aula ---------------- */
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
            <span className="text-white">Sua segunda aula é</span><br />
            <span className="silver-gradient">por nossa conta.</span>
          </h3>
        </Reveal>
        <Reveal delay={260}>
          <p className="text-silver mt-6 text-lg font-light">
            Pague sua primeira aula avulsa e ganhe a segunda de presente. Sem plano, sem fidelidade.
          </p>
        </Reveal>
        <Reveal delay={380}>
          <a href={`${SISTEMA}/?tipo=avulsa`} className="btn btn-primary mt-10 w-full sm:w-auto" style={{ padding: "18px 40px", fontSize: 15 }}>
            Agendar minha aula <ArrowRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Contato ---------------- */
function Contato() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", tel: "", msg: "" });
  const canais = [
    { icon: MessageCircle, t: "WhatsApp", d: "(11) 93330-2350", href: WHATSAPP },
    { icon: Instagram, t: "Instagram", d: "@pulsar.spinning", href: "https://instagram.com/pulsar.spinning" },
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
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
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
          <div className="glass rounded-3xl p-9 flex flex-col justify-center h-full">
            <HeartPulse className="beat text-white mb-6 opacity-90" size={32} strokeWidth={1.3} />
            <h4 className="font-display text-white text-xl" style={{ fontWeight: 700 }}>Agende pelo sistema</h4>
            <p className="text-silver text-sm font-light leading-relaxed mt-3">
              Escolha o dia e o horário, pague online e sua bike fica reservada na hora.
              Leva menos de dois minutos.
            </p>
            <a href={`${SISTEMA}/?tipo=avulsa`} className="btn btn-primary w-full mt-8">
              Agendar minha aula <ArrowRight size={15} />
            </a>
            <div className="flex items-center gap-4 my-6">
              <span className="flex-1" style={{ height: 1, background: "var(--line)" }} />
              <span className="font-mono text-silver" style={{ fontSize: 10, letterSpacing: ".25em" }}>OU</span>
              <span className="flex-1" style={{ height: 1, background: "var(--line)" }} />
            </div>
            <p className="text-silver text-sm font-light text-center">
              Ficou com dúvida ou travou no agendamento?
            </p>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-ghost w-full mt-4">
              <MessageCircle size={15} /> Falar no WhatsApp
            </a>
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
          {[
            { I: Instagram, href: "https://instagram.com/pulsar.spinning", label: "Instagram" },
            { I: MessageCircle, href: WHATSAPP, label: "WhatsApp" },
            { I: Mail, href: "mailto:pulsarkmh@gmail.com", label: "Email" },
          ].map(({ I, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="glass card-hover rounded-full p-3.5" aria-label={label}>
              <I size={17} strokeWidth={1.5} className="text-silver-hi" />
            </a>
          ))}
        </div>
        <EcgLine className="w-full max-w-sm" style={{ height: 32 }} />
        <p className="font-mono text-silver" style={{ fontSize: 10, letterSpacing: ".2em" }}>
          © {new Date().getFullYear()} PULSAR BIKE INDOOR · TODOS OS DIREITOS RESERVADOS
        </p>
        <a href="https://instagram.com/hector_dev.br" target="_blank" rel="noreferrer"
          className="font-mono text-silver" style={{ fontSize: 10, letterSpacing: ".2em", opacity: .7 }}>
          SITE E SISTEMA POR @HECTOR_DEV.BR
        </a>
      </div>
    </footer>
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
        <Planos />
        <Experimental />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}
