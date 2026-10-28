// V1 — Cinematic / Immersive
// Charcoal #0E0E0F, bone #EFE9DD, rust #B45A2C accent.
// Awwwards SOTY 2024 (Igloo) energy — atmospheric "WebGL-feel" hero
// rendered as procedural SVG + canvas particles, scroll-narrative chapters,
// big Mtavruli typography, magnetic cursor, custom HUD.

const V1_PALETTE = {
  bg: '#0E0E0F',
  fg: '#EFE9DD',
  muted: 'rgba(239,233,221,0.55)',
  accent: '#B45A2C',
  accent2: '#6B7A4B',
  surface: 'rgba(239,233,221,0.04)',
  border: 'rgba(239,233,221,0.12)',
};

// Animated particle field (snow drift) on canvas
function ParticleField({ density = 60, color = '#EFE9DD' }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { c.width = c.offsetWidth * dpr; c.height = c.offsetHeight * dpr; };
    resize();
    const obs = new ResizeObserver(resize); obs.observe(c);
    const parts = Array.from({ length: density }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: (0.4 + Math.random() * 1.4) * dpr,
      vx: (-0.15 + Math.random() * 0.3) * dpr,
      vy: (0.15 + Math.random() * 0.5) * dpr,
      a: 0.2 + Math.random() * 0.6,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.y > c.height) { p.y = -5; p.x = Math.random() * c.width; }
        if (p.x < -5) p.x = c.width; else if (p.x > c.width + 5) p.x = 0;
        ctx.globalAlpha = p.a;
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, [density, color]);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

// HUD bits
function V1Nav({ current = 0, absolute = true }) {
  const items = [
    ['00','მთავარი','HOME','v1-standalone.html'],
    ['01','კოლექცია','COLLECTION','collection.html'],
    ['02','პროცესი','PROCESS','process.html'],
    ['03','მასალები','MATERIALS','materials.html'],
    ['04','ნამუშევრები','PORTFOLIO','portfolio.html'],
    ['05','ფინანსები','FINANCING','financing.html'],
    ['06','ჩვენ შესახებ','ABOUT','about.html'],
    ['07','კონტაქტი','CONTACT','contact.html'],
  ];
  return (
    <div style={{ position: absolute ? 'absolute' : 'relative', top: absolute ? 28 : 0, left: absolute ? 32 : 0, right: absolute ? 32 : 0, padding: absolute ? 0 : '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 5, color: V1_PALETTE.fg, fontFamily: 'Space Grotesk, monospace', fontSize: 11, letterSpacing: '0.18em' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 14, height: 14, border: `1px solid ${V1_PALETTE.fg}`, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -1, left: '50%', width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderBottom: `7px solid ${V1_PALETTE.fg}`, transform: 'translateX(-50%)', marginTop: -7 }} />
        </div>
        <a href="v1-standalone.html" style={{ color: 'inherit', textDecoration: 'none', fontFamily: 'Instrument Serif, serif', fontSize: 18, letterSpacing: '0.05em' }}>kotejebi<span style={{ color: V1_PALETTE.accent }}>.ge</span></a>
      </div>
      <div style={{ display: 'flex', gap: 28, opacity: 0.85 }}>
        {items.map(([n, ka, en, href], i) => (
          <a key={i} href={href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, color: i === current ? V1_PALETTE.accent : V1_PALETTE.fg }}>
            <span style={{ opacity: 0.45, fontSize: 9 }}>{n}</span>
            <span style={{ fontFamily: 'Noto Sans Georgian, sans-serif', fontSize: 12, letterSpacing: '0.04em' }}>{ka}</span>
          </a>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <span>KA · EN · RU</span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span style={{ color: V1_PALETTE.accent }}>{BRAND.phone}</span>
      </div>
    </div>
  );
}

function V1Hero() {
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setTime((Date.now() - start) / 1000), 60);
    return () => clearInterval(id);
  }, []);
  // Slow "time of day" cycle (0..1) for sky gradient
  const t = (Math.sin(time / 8) + 1) / 2;
  const skyTop = `rgb(${10 + t*10}, ${12 + t*14}, ${18 + t*18})`;
  const skyMid = `rgb(${30 + t*40}, ${28 + t*30}, ${36 + t*20})`;

  return (
    <section style={{ position: 'relative', height: 920, background: V1_PALETTE.bg, overflow: 'hidden', color: V1_PALETTE.fg }}>
      <V1Nav />

      {/* Atmospheric backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${skyTop} 0%, ${skyMid} 60%, #08090b 100%)` }} />

      {/* Distant ridges */}
      <svg viewBox="0 0 1280 920" preserveAspectRatio="xMidYEnd slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="v1-glow" cx="0.7" cy="0.32" r="0.5">
            <stop offset="0%" stopColor="#d4a574" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#d4a574" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#d4a574" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="v1-ground" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0a0c0e" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
        </defs>
        <rect width="1280" height="920" fill="url(#v1-glow)" />
        {/* Moon */}
        <circle cx={870} cy={210} r="34" fill="#EFE9DD" opacity="0.92" />
        <circle cx={870} cy={210} r="48" fill="#EFE9DD" opacity="0.06" />
        {/* Far ridge */}
        <path d="M0 540 L80 510 L180 530 L260 480 L350 510 L460 460 L560 500 L660 470 L760 510 L860 480 L960 520 L1060 490 L1160 530 L1280 500 L1280 920 L0 920 Z" fill="#1a1f24" opacity="0.7" />
        {/* Mid ridge */}
        <path d="M0 640 L120 600 L220 630 L340 560 L460 610 L580 580 L700 620 L820 580 L940 620 L1060 590 L1180 630 L1280 600 L1280 920 L0 920 Z" fill="#0f1418" />
        {/* Near ridge */}
        <path d="M0 740 L100 720 L200 740 L320 700 L450 730 L570 710 L700 740 L830 720 L960 750 L1080 730 L1200 740 L1280 730 L1280 920 L0 920 Z" fill="url(#v1-ground)" />

        {/* Pine forest on near ridge */}
        {Array.from({ length: 32 }).map((_, i) => {
          const x = 20 + i * 38 + (i % 3) * 6;
          const baseY = 730 + ((i * 7) % 18);
          const h = 22 + ((i * 13) % 24);
          return (
            <path key={i} d={`M${x} ${baseY} L${x-h*0.3} ${baseY+h*0.45} L${x-h*0.18} ${baseY+h*0.45} L${x-h*0.36} ${baseY+h*0.75} L${x-h*0.22} ${baseY+h*0.75} L${x-h*0.42} ${baseY+h} L${x+h*0.42} ${baseY+h} L${x+h*0.22} ${baseY+h*0.75} L${x+h*0.36} ${baseY+h*0.75} L${x+h*0.18} ${baseY+h*0.45} L${x+h*0.3} ${baseY+h*0.45} Z`} fill="#06080a" />
          );
        })}

        {/* Cottage with lit windows */}
        <g transform="translate(540, 660)">
          <path d="M0 80 L100 10 L200 80 L200 180 L0 180 Z" fill="#0a0c10" />
          <path d="M-12 82 L100 0 L212 82" stroke="#1a1410" strokeWidth="3" fill="none" />
          <rect x="34" y="100" width="28" height="36" fill="#f3c87a">
            <animate attributeName="fill-opacity" values="0.85;1;0.9;1" dur="4.2s" repeatCount="indefinite" />
          </rect>
          <rect x="138" y="100" width="28" height="36" fill="#f3c87a" opacity="0.92">
            <animate attributeName="fill-opacity" values="0.9;0.7;0.95;0.85" dur="3.6s" repeatCount="indefinite" />
          </rect>
          <rect x="86" y="125" width="28" height="55" fill="#1a1410" />
          {/* Chimney smoke */}
          <g opacity="0.4">
            <ellipse cx="170" cy="-5" rx="8" ry="4" fill="#EFE9DD">
              <animate attributeName="cy" from="-5" to="-50" dur="6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0" dur="6s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="172" cy="-15" rx="10" ry="5" fill="#EFE9DD">
              <animate attributeName="cy" from="-15" to="-65" dur="7s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0" dur="7s" repeatCount="indefinite" />
            </ellipse>
          </g>
          {/* Light spill on snow */}
          <ellipse cx="48" cy="200" rx="55" ry="12" fill="#f3c87a" opacity="0.18" />
          <ellipse cx="152" cy="200" rx="55" ry="12" fill="#f3c87a" opacity="0.15" />
        </g>
      </svg>

      {/* Particle snow */}
      <ParticleField density={80} color="#EFE9DD" />

      {/* Hero copy lockup */}
      <div style={{ position: 'absolute', left: 32, right: 32, bottom: 60, display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 40, zIndex: 4 }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 11, letterSpacing: '0.24em', color: V1_PALETTE.accent, marginBottom: 24 }}>
            EST. 2021 — KAZBEGI, GEORGIA — 230+ COTTAGES
          </div>
          <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontWeight: 500, fontSize: 96, lineHeight: 0.92, letterSpacing: '0.005em' }}>
            {toMtavruli('შენი ჰარმონია')}<br />
            {toMtavruli('ბუნებაში')}<span style={{ color: V1_PALETTE.accent }}>.</span>
          </div>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22, fontStyle: 'italic', opacity: 0.6, marginTop: 18, maxWidth: 540, lineHeight: 1.35 }}>
            Architect-built timber cottages. Raised across the Caucasus, made for stillness.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end' }}>
          <button style={{ padding: '18px 28px', border: 'none', background: V1_PALETTE.accent, color: V1_PALETTE.fg, fontFamily: 'Space Grotesk, monospace', fontSize: 12, letterSpacing: '0.18em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}>
            <span>BUILD MY COTTAGE</span>
            <span style={{ width: 24, height: 1, background: V1_PALETTE.fg, display: 'inline-block' }} />
            <span>↗</span>
          </button>
          <button style={{ padding: '14px 22px', border: `1px solid ${V1_PALETTE.border}`, background: 'transparent', color: V1_PALETTE.fg, fontFamily: 'Space Grotesk, monospace', fontSize: 11, letterSpacing: '0.16em', cursor: 'pointer', backdropFilter: 'blur(6px)' }}>
            ▶ PLAY KAZBEGI FILM · 2:14
          </button>
        </div>
      </div>

      {/* Bottom HUD */}
      <div style={{ position: 'absolute', bottom: 16, left: 32, right: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.18em', color: V1_PALETTE.muted, zIndex: 4 }}>
        <div>SCROLL ↓ ENTER COTTAGE</div>
        <div style={{ display: 'flex', gap: 18 }}>
          <span>LAT 42.6577°N</span>
          <span>LNG 44.6418°E</span>
          <span>ALT 1740M</span>
          <span style={{ color: V1_PALETTE.accent }}>● LIVE</span>
        </div>
      </div>

      {/* Vertical chapter index */}
      <div style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.14em', zIndex: 4 }}>
        {['01 ხე','02 ხელი','03 სახლი','04 ხედი'].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: i === 0 ? V1_PALETTE.accent : V1_PALETTE.muted }}>
            <span style={{ width: 24, height: 1, background: i === 0 ? V1_PALETTE.accent : V1_PALETTE.muted }} />
            <span>{s}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// Stats strip + intro
function V1Intro() {
  return (
    <section style={{ background: V1_PALETTE.bg, color: V1_PALETTE.fg, padding: '80px 32px 60px', borderTop: `1px solid ${V1_PALETTE.border}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, marginBottom: 60 }}>
        <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 44, lineHeight: 1.1 }}>
          {toMtavruli('ხე, ხელი, სახლი — ')}<span style={{ color: V1_PALETTE.accent }}>{toMtavruli('ერთი ფილოსოფია')}</span>{toMtavruli('. ')}
          <span style={{ opacity: 0.5 }}>{toMtavruli('2021 წლიდან ვაშენებთ კოტეჯებს ყაზბეგიდან აჭარამდე.')}</span>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.7, paddingTop: 8 }}>
          ფიჭვი ბელორუსიიდან, ლარიქსი ტერასებისთვის, 15 სმ თბო-იზოლაცია. თითოეული კოტეჯი იდგმება მისი ადგილისთვის — ყაზბეგის თოვლი, კახეთის ვენახი, აჭარის ზღვა.
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: `1px solid ${V1_PALETTE.border}` }}>
        {BRAND.stats.map((s, i) => (
          <div key={i} style={{ padding: '28px 0 4px', borderRight: i < 3 ? `1px solid ${V1_PALETTE.border}` : 'none', paddingRight: 20, paddingLeft: i === 0 ? 0 : 20 }}>
            <div style={{ fontFamily: 'Instrument Serif, Noto Serif Georgian, serif', fontSize: 64, lineHeight: 1, color: V1_PALETTE.accent }}>{s.kpi}</div>
            <div style={{ fontFamily: 'Noto Sans Georgian', fontSize: 13, marginTop: 8 }}>{s.ka}</div>
            <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.14em', opacity: 0.5, marginTop: 2 }}>{s.en.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Portfolio — full-bleed cinematic gallery
function V1Portfolio() {
  const palettes = [
    { sky: '#0e1d2a', sun: '#d4a574', mid: '#1a2a3a', near: '#040810', cottage: '#000', cottageRoof: '#0a0c10', accent: '#B45A2C' }, // Kazbegi snow
    { sky: '#2a1d14', sun: '#e6a574', mid: '#3a2a1d', near: '#0f0a06', cottage: '#000', cottageRoof: '#1a1410', accent: '#B45A2C' }, // Kvareli vineyard dusk
    { sky: '#10201c', sun: '#a4b574', mid: '#1a2a25', near: '#040a08', cottage: '#000', cottageRoof: '#1a2418', accent: '#6B7A4B' }, // Sairme forest
    { sky: '#1a1018', sun: '#d47494', mid: '#2a1a25', near: '#06040a', cottage: '#000', cottageRoof: '#0a0810', accent: '#B45A2C' }, // Svaneti dawn
  ];
  const featured = COLLECTIONS.slice(0, 4);
  return (
    <section style={{ background: V1_PALETTE.bg, color: V1_PALETTE.fg, padding: '60px 32px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.22em', color: V1_PALETTE.accent, marginBottom: 12 }}>02 — ᲙᲝᲚᲔᲥᲪᲘᲐ · COLLECTION</div>
          <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 56, lineHeight: 1 }}>{toMtavruli('ექვსი ადგილი, ექვსი სახლი')}</div>
        </div>
        <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 11, letterSpacing: '0.16em', opacity: 0.5 }}>← → DRAG · 10 MODELS</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12, marginBottom: 12 }}>
        {/* Big featured card */}
        <PortfolioCard model={featured[0]} palette={palettes[0]} big />
        <PortfolioCard model={featured[1]} palette={palettes[1]} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.4fr', gap: 12 }}>
        <PortfolioCard model={featured[2]} palette={palettes[2]} />
        <PortfolioCard model={featured[3]} palette={palettes[3]} />
        <PortfolioCard model={COLLECTIONS[4]} palette={palettes[0]} big />
      </div>
    </section>
  );
}

function PortfolioCard({ model, palette, big }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={`model.html?id=${model.id}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', aspectRatio: big ? '16/10' : '4/5', overflow: 'hidden', cursor: 'pointer', background: '#000', display: 'block', textDecoration: 'none' }}>
      <LandscapeSVG seed={model.id.length * 13} palette={palette} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: hover ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.8s cubic-bezier(.2,.7,.2,1)' }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)' }} />

      {/* HUD */}
      <div style={{ position: 'absolute', top: 18, left: 18, right: 18, display: 'flex', justifyContent: 'space-between', fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.18em', color: V1_PALETTE.fg, opacity: 0.85 }}>
        <span>№ {String(COLLECTIONS.indexOf(model) + 1).padStart(2, '0')}</span>
        <span style={{ color: V1_PALETTE.accent }}>● {model.region.toUpperCase()}</span>
      </div>

      {/* Caption */}
      <div style={{ position: 'absolute', left: 22, right: 22, bottom: 22, color: V1_PALETTE.fg }}>
        <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: big ? 56 : 36, lineHeight: 0.95 }}>{toMtavruli(model.ka)}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12, fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.14em', opacity: 0.85 }}>
          <span>{model.m2} M² · {model.bedrooms} BR · {model.floors === 2 ? '2 FLR' : '1 FLR'}</span>
          <span style={{ color: V1_PALETTE.accent }}>FROM ₾ {model.price.toLocaleString('en-US')}</span>
        </div>
        {/* Reveal on hover */}
        <div style={{ marginTop: 14, height: hover ? 32 : 0, overflow: 'hidden', transition: 'height 0.3s' }}>
          <div style={{ borderTop: `1px solid ${V1_PALETTE.border}`, paddingTop: 10, fontSize: 12, opacity: 0.75, display: 'flex', justifyContent: 'space-between' }}>
            <span>VIEW PROJECT →</span>
            <span>{model.terrain}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

// Configurator chapter
function V1Configurator() {
  return (
    <section style={{ background: '#000', color: V1_PALETTE.fg, padding: '80px 32px', borderTop: `1px solid ${V1_PALETTE.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.22em', color: V1_PALETTE.accent, marginBottom: 12 }}>03 — ᲙᲝᲜᲤᲘᲒᲣᲠᲐᲢᲝᲠᲘ · CONFIGURE</div>
          <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 48, lineHeight: 1 }}>{toMtavruli('ააწყვე შენი კოტეჯი')}</div>
        </div>
        <div style={{ fontSize: 12, opacity: 0.5, maxWidth: 280, lineHeight: 1.5, textAlign: 'right' }}>Live ₾ pricing — every choice updates the spec sheet and the 3D model.</div>
      </div>
      <Configurator palette={V1_PALETTE} onInquire={() => alert('Inquiry sent (demo)')} />

      {/* Floor plan + ROI side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 12, marginTop: 12 }}>
        <FloorPlan palette={V1_PALETTE} />
        <ROICalc palette={V1_PALETTE} />
      </div>
    </section>
  );
}

function V1Contact() {
  return (
    <section style={{ background: V1_PALETTE.bg, color: V1_PALETTE.fg, padding: '80px 32px', borderTop: `1px solid ${V1_PALETTE.border}`, position: 'relative', overflow: 'hidden' }}>
      {/* Faint background landscape */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
        <LandscapeSVG seed={777} palette={{ sky: '#0e1d2a', sun: '#d4a574', mid: '#1a2a3a', near: '#040810', cottage: '#000', cottageRoof: '#0a0c10', accent: '#B45A2C' }} style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.22em', color: V1_PALETTE.accent, marginBottom: 16 }}>04 — ᲙᲝᲜᲢᲐᲥᲢᲘ · CONTACT</div>
          <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 80, lineHeight: 0.92, marginBottom: 28 }}>
            {toMtavruli('მოდი,')}<br />
            {toMtavruli('ვაშენოთ.')}
          </div>
          <div style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.6, maxWidth: 420, marginBottom: 36 }}>
            დაგვიკავშირდით უშუალოდ — ან შეავსეთ ფორმა და მოგვწერთ 24 საათში.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'Inter, Noto Sans Georgian' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${V1_PALETTE.border}`, paddingTop: 14 }}>
              <span style={{ opacity: 0.5, fontSize: 11, letterSpacing: '0.14em', fontFamily: 'Space Grotesk, monospace' }}>PHONE</span>
              <span style={{ color: V1_PALETTE.accent, fontFamily: 'Instrument Serif, serif', fontSize: 22 }}>{BRAND.phone}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${V1_PALETTE.border}`, paddingTop: 14 }}>
              <span style={{ opacity: 0.5, fontSize: 11, letterSpacing: '0.14em', fontFamily: 'Space Grotesk, monospace' }}>STUDIO</span>
              <span style={{ fontSize: 14 }}>{BRAND.address}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${V1_PALETTE.border}`, paddingTop: 14 }}>
              <span style={{ opacity: 0.5, fontSize: 11, letterSpacing: '0.14em', fontFamily: 'Space Grotesk, monospace' }}>FINANCING</span>
              <span style={{ fontSize: 14 }}>0% Credo Bank · 50/40/10</span>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              {['Viber','WhatsApp','Messenger','Email'].map(s => (
                <div key={s} style={{ padding: '10px 16px', border: `1px solid ${V1_PALETTE.border}`, fontSize: 11, letterSpacing: '0.12em', fontFamily: 'Space Grotesk, monospace' }}>{s.toUpperCase()}</div>
              ))}
            </div>
          </div>
        </div>
        <ContactForm palette={V1_PALETTE} />
      </div>

      {/* Footer line */}
      <div style={{ position: 'relative', marginTop: 60, paddingTop: 24, borderTop: `1px solid ${V1_PALETTE.border}`, display: 'flex', justifyContent: 'space-between', fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.14em', opacity: 0.55 }}>
        <span>© 2026 KOTEJEBI.GE · TBILISI</span>
        <span>FSC CERTIFIED · 0% CREDO BANK</span>
        <span>SITE BY 10XSEO.GE</span>
      </div>
    </section>
  );
}

// ─────────── SCROLL-ASSEMBLY SCENE ───────────
// Sticky 100vh stage. As you scroll, the cottage assembles part-by-part:
// 1. ground line, 2. foundation, 3. floor, 4. left+right walls, 5. back wall,
// 6. roof beams, 7. roof skin, 8. cladding, 9. windows, 10. door,
// 11. chimney, 12. smoke + lights on. Plus a side spec panel that fills in.
function V1AssemblyScroll() {
  const ref = React.useRef(null);
  const [p, setP] = React.useState(0); // 0..1 progress

  React.useEffect(() => {
    // Find the scrollable ancestor (the artboard scroll container)
    const findScrollParent = (el) => {
      let n = el?.parentElement;
      while (n) {
        const oy = getComputedStyle(n).overflowY;
        if (oy === 'auto' || oy === 'scroll') return n;
        n = n.parentElement;
      }
      return window;
    };
    const scroller = findScrollParent(ref.current);
    const onScroll = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const stickyHostRect = scroller === window
        ? { top: 0, height: window.innerHeight }
        : scroller.getBoundingClientRect();
      // Section starts entering when its top hits the scroller's top.
      // It "exits" once the bottom passes the bottom of the stage area.
      const stageH = stickyHostRect.height; // height of viewport / scroller
      // total scroll distance for the assembly = section height - one viewport
      const total = ref.current.offsetHeight - stageH;
      // how far we've scrolled past the section start
      const past = stickyHostRect.top - r.top;
      const prog = Math.max(0, Math.min(1, past / total));
      setP(prog);
    };
    onScroll();
    if (scroller === window) {
      window.addEventListener('scroll', onScroll, { passive: true });
    } else {
      scroller.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => {
      if (scroller === window) window.removeEventListener('scroll', onScroll);
      else scroller.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Stage helpers — each part has a [start, end] range; output 0..1 within that
  const stage = (a, b) => Math.max(0, Math.min(1, (p - a) / (b - a)));
  const ease = (t) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2;

  // Steps
  const ground   = ease(stage(0.00, 0.05));
  const found    = ease(stage(0.05, 0.12));
  const floor    = ease(stage(0.10, 0.18));
  const wallL    = ease(stage(0.16, 0.26));
  const wallR    = ease(stage(0.20, 0.30));
  const wallBack = ease(stage(0.24, 0.34));
  const beams    = ease(stage(0.32, 0.42));
  const roofSkin = ease(stage(0.38, 0.50));
  const cladding = ease(stage(0.46, 0.58));
  const windows  = ease(stage(0.56, 0.66));
  const door     = ease(stage(0.62, 0.70));
  const chimney  = ease(stage(0.68, 0.76));
  const smoke    = ease(stage(0.78, 0.88));
  const lights   = ease(stage(0.82, 0.94));
  const reveal   = ease(stage(0.90, 1.00));

  // Active step index for the side panel
  const steps = [
    { ka: 'მიწა',          en: 'Site / ground line', a: 0.00, b: 0.05 },
    { ka: 'საფუძველი',     en: 'Concrete foundation', a: 0.05, b: 0.12 },
    { ka: 'იატაკი',        en: 'Floor platform',      a: 0.10, b: 0.18 },
    { ka: 'კედლები',       en: 'Pine wall framing',   a: 0.16, b: 0.34 },
    { ka: 'სახურავის კოჭები',  en: 'Roof rafters',    a: 0.32, b: 0.42 },
    { ka: 'სახურავი',      en: 'Standing seam metal', a: 0.38, b: 0.50 },
    { ka: 'ფასადი',        en: 'Larch cladding',      a: 0.46, b: 0.58 },
    { ka: 'ფანჯრები',      en: 'Triple-glazed',       a: 0.56, b: 0.66 },
    { ka: 'კარი',          en: 'Entry door',          a: 0.62, b: 0.70 },
    { ka: 'ბუხარი',        en: 'Chimney',             a: 0.68, b: 0.76 },
    { ka: 'სიცოცხლე',      en: 'Smoke. Light. Home.', a: 0.78, b: 1.00 },
  ];
  const activeStep = steps.findIndex(s => p >= s.a && p < s.b);
  const activeIdx = activeStep === -1 ? (p >= 1 ? steps.length - 1 : 0) : activeStep;

  // Geometry
  const cx = 360, baseY = 460;
  const W = 280, H = 170;
  const x0 = cx - W/2, x1 = cx + W/2;
  const yTop = baseY - H;
  const apex = yTop - 80;

  return (
    <section ref={ref} style={{ position: 'relative', background: '#08090b', color: V1_PALETTE.fg }}>
      {/* Tall scroll spacer drives the stage. ~4 viewports of scroll for the assembly. */}
      <div style={{ height: '380vh', position: 'relative' }}>
        {/* Sticky stage */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          {/* Atmospheric backdrop */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0e1722 0%, #1a2030 50%, #06080b 100%)' }} />
          <svg viewBox="0 0 720 540" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {/* Distant ridges, always present */}
            <path d="M0 280 L80 260 L180 275 L280 245 L380 270 L480 250 L580 275 L720 255 L720 540 L0 540 Z" fill="#141a24" opacity="0.7" />
            <path d="M0 350 L120 320 L220 340 L340 305 L460 335 L580 315 L720 340 L720 540 L0 540 Z" fill="#0c1218" />
            <path d="M0 440 L100 425 L200 440 L320 415 L450 435 L570 420 L720 435 L720 540 L0 540 Z" fill="#06080b" />
            {/* Moon rises with progress */}
            <circle cx="540" cy={120 - p*40} r="22" fill="#EFE9DD" opacity="0.85" />

            {/* Ground line — fades in first */}
            <line x1="60" y1={baseY} x2="660" y2={baseY} stroke="#3a4858" strokeWidth="0.6" opacity={ground * 0.6} strokeDasharray="2 4" />

            {/* Construction guides — fade as build completes */}
            <g opacity={Math.max(0, 0.3 - reveal * 0.3)} stroke="#B45A2C" strokeWidth="0.4" strokeDasharray="3 3" fill="none">
              <line x1={x0} y1="100" x2={x0} y2={baseY + 30} />
              <line x1={x1} y1="100" x2={x1} y2={baseY + 30} />
              <line x1={cx} y1="60" x2={cx} y2={baseY + 30} />
              <line x1="40" y1={yTop} x2="680" y2={yTop} />
              <line x1="40" y1={apex} x2="680" y2={apex} />
              {/* Dimension callouts */}
              <text x={cx} y={baseY + 42} textAnchor="middle" fill="#B45A2C" fontSize="8" fontFamily="Space Grotesk, monospace" letterSpacing="0.16em" stroke="none">{W/40}M</text>
              <text x={x1 + 18} y={(baseY + yTop)/2} fill="#B45A2C" fontSize="8" fontFamily="Space Grotesk, monospace" letterSpacing="0.16em" stroke="none">{(H/40).toFixed(1)}M</text>
            </g>

            {/* Foundation — grows from center */}
            <rect
              x={cx - (W/2 + 8) * found}
              y={baseY - 4}
              width={(W + 16) * found}
              height={14}
              fill="#2a2a2c"
            />
            <rect
              x={cx - (W/2 + 8) * found}
              y={baseY - 4}
              width={(W + 16) * found}
              height={2}
              fill="#3a3a3c"
            />

            {/* Floor — beams sliding in */}
            <g opacity={floor}>
              {Array.from({ length: 9 }).map((_, i) => {
                const t = Math.max(0, Math.min(1, floor * 1.4 - i * 0.04));
                return (
                  <rect key={i} x={x0 + i * (W/9) + 2} y={baseY - 8 - 4 * t} width={W/9 - 4} height={6} fill="#5a4a35" opacity={t} />
                );
              })}
            </g>

            {/* Left wall — rises from floor */}
            <g style={{ transformOrigin: `${x0}px ${baseY - 8}px`, transform: `scaleY(${wallL})` }}>
              <rect x={x0} y={yTop} width={10} height={H - 8} fill="#8a6a48" />
              {/* Studs */}
              {Array.from({ length: 4 }).map((_, i) => (
                <rect key={i} x={x0 + 4} y={yTop + i * (H/4)} width={6} height={2} fill="#3a2a1a" opacity="0.4" />
              ))}
            </g>

            {/* Right wall */}
            <g style={{ transformOrigin: `${x1}px ${baseY - 8}px`, transform: `scaleY(${wallR})` }}>
              <rect x={x1 - 10} y={yTop} width={10} height={H - 8} fill="#8a6a48" />
              {Array.from({ length: 4 }).map((_, i) => (
                <rect key={i} x={x1 - 10} y={yTop + i * (H/4)} width={6} height={2} fill="#3a2a1a" opacity="0.4" />
              ))}
            </g>

            {/* Back wall (gable triangle area) */}
            <g style={{ transformOrigin: `${cx}px ${baseY - 8}px`, transform: `scaleY(${wallBack})` }} opacity={wallBack}>
              <rect x={x0 + 10} y={yTop} width={W - 20} height={H - 8} fill="#7a5a3a" opacity="0.85" />
              {/* horizontal log lines */}
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={i} x1={x0 + 10} x2={x1 - 10} y1={yTop + (i+1) * ((H-8)/13)} y2={yTop + (i+1) * ((H-8)/13)} stroke="#3a2a1a" strokeWidth="0.5" opacity="0.5" />
              ))}
            </g>

            {/* Roof rafters */}
            <g opacity={beams}>
              {Array.from({ length: 8 }).map((_, i) => {
                const t = Math.max(0, Math.min(1, beams * 1.3 - i * 0.06));
                const xx = x0 + (i / 7) * W;
                return (
                  <line key={i} x1={xx} y1={yTop + 2} x2={cx} y2={apex + 6 * (1 - t)} stroke="#5a4a35" strokeWidth="1.5" opacity={t} />
                );
              })}
              {/* Ridge beam */}
              <line x1={x0 - 8} y1={yTop} x2={x1 + 8} y2={yTop} stroke="#4a3a25" strokeWidth="2" opacity={beams} />
            </g>

            {/* Roof skin — wipes left to right */}
            <g style={{ clipPath: `polygon(0 0, ${roofSkin*100}% 0, ${roofSkin*100}% 100%, 0 100%)` }}>
              <path d={`M${x0 - 14} ${yTop + 4} L${cx} ${apex - 4} L${x1 + 14} ${yTop + 4} L${x1 + 14} ${yTop + 8} L${cx} ${apex} L${x0 - 14} ${yTop + 8} Z`} fill="#1a1a1c" />
              <path d={`M${x0 - 14} ${yTop + 4} L${cx} ${apex - 4} L${x1 + 14} ${yTop + 4}`} stroke="#0a0a0c" strokeWidth="2" fill="none" />
              {/* Standing seams */}
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={i} x1={x0 - 14 + (i + 0.5) * (W + 28) / 8} y1={yTop + 4}
                  x2={cx + (i - 4) * 6} y2={apex - 4 + Math.abs(i - 3.5) * 4}
                  stroke="#2a2a2c" strokeWidth="0.6" />
              ))}
            </g>

            {/* Cladding (vertical larch boards) — wipes top→bottom */}
            <g style={{ clipPath: `polygon(0 0, 100% 0, 100% ${cladding * 100}%, 0 ${cladding * 100}%)` }}>
              <rect x={x0 + 10} y={yTop} width={W - 20} height={H - 8} fill="#6a4a2a" />
              {Array.from({ length: 22 }).map((_, i) => (
                <line key={i} x1={x0 + 10 + i * ((W-20)/22)} x2={x0 + 10 + i * ((W-20)/22)}
                  y1={yTop} y2={baseY - 8} stroke="#3a2a1a" strokeWidth="0.4" opacity="0.6" />
              ))}
              {/* warm tone gradient overlay */}
              <rect x={x0 + 10} y={yTop} width={W - 20} height={H - 8} fill="url(#v1asm-warm)" opacity="0.25" />
            </g>
            <defs>
              <linearGradient id="v1asm-warm" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#B45A2C" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#B45A2C" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Windows */}
            {[
              { x: x0 + 28, y: yTop + 30, w: 38, h: 50 },
              { x: cx + 30, y: yTop + 30, w: 38, h: 50 },
              { x: x0 + 28, y: yTop + 95, w: 38, h: 40 },
              { x: cx + 30, y: yTop + 95, w: 38, h: 40 },
            ].map((win, i) => {
              const t = Math.max(0, Math.min(1, windows * 1.3 - i * 0.06));
              const lit = lights;
              return (
                <g key={i} opacity={t}>
                  <rect x={win.x} y={win.y} width={win.w} height={win.h} fill="#0a0c10" />
                  <rect x={win.x + 1} y={win.y + 1} width={win.w - 2} height={win.h - 2}
                    fill={`rgba(243,200,122,${0.15 + lit * 0.78})`} />
                  <line x1={win.x + win.w/2} x2={win.x + win.w/2} y1={win.y} y2={win.y + win.h} stroke="#1a1410" strokeWidth="0.6" />
                  <line x1={win.x} x2={win.x + win.w} y1={win.y + win.h/2} y2={win.y + win.h/2} stroke="#1a1410" strokeWidth="0.6" />
                </g>
              );
            })}

            {/* Door */}
            <g style={{ transformOrigin: `${cx}px ${baseY - 8}px`, transform: `scaleY(${door})` }}>
              <rect x={cx - 18} y={yTop + 80} width={36} height={H - 88} fill="#2a1a10" />
              <rect x={cx - 16} y={yTop + 82} width={32} height={H - 92} fill="#1a1410" stroke="#3a2a1a" strokeWidth="0.5" />
              <circle cx={cx + 10} cy={yTop + (H + 80)/2} r="1.5" fill="#B45A2C" />
            </g>

            {/* Chimney */}
            <g style={{ transformOrigin: `${cx + 60}px ${yTop - 5}px`, transform: `scaleY(${chimney})` }}>
              <rect x={cx + 50} y={apex + 15} width={20} height={45} fill="#1a1a1c" />
              <rect x={cx + 48} y={apex + 12} width={24} height={5} fill="#0a0a0c" />
            </g>

            {/* Smoke */}
            <g opacity={smoke}>
              <ellipse cx={cx + 60} cy={apex + 0} rx="9" ry="5" fill="#EFE9DD" opacity="0.4">
                <animate attributeName="cy" from={apex} to={apex - 80} dur="6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="6s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx={cx + 62} cy={apex - 12} rx="11" ry="6" fill="#EFE9DD" opacity="0.32">
                <animate attributeName="cy" from={apex - 12} to={apex - 95} dur="7s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0" dur="7s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx={cx + 58} cy={apex - 24} rx="13" ry="7" fill="#EFE9DD" opacity="0.25">
                <animate attributeName="cy" from={apex - 24} to={apex - 110} dur="8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0" dur="8s" repeatCount="indefinite" />
              </ellipse>
            </g>

            {/* Light spill on snow */}
            <ellipse cx={x0 + 47} cy={baseY + 3} rx="38" ry="5" fill="#f3c87a" opacity={lights * 0.18} />
            <ellipse cx={cx + 49} cy={baseY + 3} rx="38" ry="5" fill="#f3c87a" opacity={lights * 0.15} />

            {/* Snow particles when lights on */}
            <g opacity={lights}>
              {Array.from({ length: 30 }).map((_, i) => (
                <circle key={i} cx={(i*47) % 720} cy={(i*31) % 540} r={0.6 + (i%3)*0.3} fill="#EFE9DD" opacity={0.3 + (i%5)*0.1}>
                  <animate attributeName="cy" from={(i*31) % 540} to={((i*31) % 540) + 50} dur={`${5 + (i%4)}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
          </svg>

          {/* Side spec panel */}
          <div style={{ position: 'absolute', left: 32, top: 40, bottom: 40, width: 280, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
            <div>
              <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.22em', color: V1_PALETTE.accent }}>02 — ᲠᲘᲢᲣᲐᲚᲘ · ASSEMBLY</div>
              <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 36, lineHeight: 1, marginTop: 12 }}>
                {toMtavruli('11 ნაბიჯი')}<br />
                <span style={{ color: V1_PALETTE.accent }}>{toMtavruli('სახლამდე')}.</span>
              </div>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 16, opacity: 0.6, marginTop: 14, lineHeight: 1.4 }}>
                Scroll to raise the cottage.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'Space Grotesk, monospace', fontSize: 11, letterSpacing: '0.08em' }}>
              {steps.map((s, i) => {
                const done = p >= s.b;
                const active = i === activeIdx;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: done || active ? 1 : 0.32, transition: 'opacity 0.25s' }}>
                    <span style={{ display: 'inline-block', width: 18, color: V1_PALETTE.accent, fontWeight: active ? 700 : 400 }}>{String(i+1).padStart(2,'0')}</span>
                    <span style={{ flex: 1, fontFamily: 'Noto Sans Georgian', fontSize: 13, color: active ? V1_PALETTE.accent : V1_PALETTE.fg }}>{s.ka}</span>
                    <span style={{ width: 24, height: 1, background: done ? V1_PALETTE.accent : V1_PALETTE.border }} />
                  </div>
                );
              })}
            </div>

            <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.18em', opacity: 0.55 }}>
              <div>BUILD PROGRESS</div>
              <div style={{ height: 2, background: V1_PALETTE.border, marginTop: 6, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${p*100}%`, background: V1_PALETTE.accent }} />
              </div>
              <div style={{ marginTop: 6, color: V1_PALETTE.accent, fontSize: 18, fontFamily: 'Instrument Serif, serif' }}>{Math.round(p*100)}%</div>
            </div>
          </div>

          {/* Right HUD — current step name */}
          <div style={{ position: 'absolute', right: 40, top: 40, textAlign: 'right', pointerEvents: 'none' }}>
            <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.18em', opacity: 0.5 }}>STEP {String(activeIdx + 1).padStart(2,'0')} / 11</div>
            <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 44, lineHeight: 1, marginTop: 8, color: V1_PALETTE.accent }}>{toMtavruli(steps[activeIdx]?.ka || '')}</div>
            <div style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 18, opacity: 0.6, marginTop: 4 }}>{steps[activeIdx]?.en}</div>
          </div>

          {/* Reveal title at end */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 60, textAlign: 'center', opacity: reveal, pointerEvents: 'none' }}>
            <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 48 + reveal * 12, lineHeight: 1, color: V1_PALETTE.fg, transform: `translateY(${(1-reveal)*20}px)`, transition: 'transform 0.2s' }}>
              {toMtavruli('ყაზბეგი')} <span style={{ color: V1_PALETTE.accent, fontStyle: 'italic', fontFamily: 'Instrument Serif, serif' }}>· 60 m²</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function V1Cinematic({ standalone = false }) {
  const wrapStyle = standalone
    ? { width: '100%', background: V1_PALETTE.bg, color: V1_PALETTE.fg }
    : { width: '100%', height: '100%', overflow: 'auto', background: V1_PALETTE.bg, color: V1_PALETTE.fg };
  return (
    <div style={wrapStyle}>
      <V1Hero />
      <V1Intro />
      <V1AssemblyScroll />
      <V1Portfolio />
      <V1Configurator />
      <V1Process />
      <V1Materials />
      <V1Testimonials />
      <V1Financing />
      <V1Contact />
      <V1Footer />
    </div>
  );
}

window.V1Cinematic = V1Cinematic;
window.V1_PALETTE = V1_PALETTE;
window.V1Nav = V1Nav;
window.V1Contact = V1Contact;
window.ParticleField = ParticleField;
