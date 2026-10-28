// shared.jsx — content + converters + components shared across all 5 variants
// Georgian content lifted from the brief. All Mtavruli is real Unicode codepoints
// (U+1C90–U+1CBF), never text-transform: uppercase.

// Mkhedruli → Mtavruli converter (offset is +0xBC0).
// Mkhedruli range: U+10D0–U+10FA. Mtavruli range: U+1C90–U+1CBA.
const toMtavruli = (s) => s.replace(/[\u10D0-\u10FA]/g, c => String.fromCodePoint(c.codePointAt(0) + 0xBC0));

// ─────────── COLLECTIONS — region-named cottage models ───────────
// Each model has a Georgian region name + spec block. Names map to real
// Georgian regions where kotejebi has built — preserved from current site.
const COLLECTIONS = [
  { id: 'gergeti',   ka: 'გერგეტი',     en: 'Gergeti',     m2: 35,  bedrooms: 1, floors: 1, price: 48000,  region: 'Mtskheta-Mtianeti', terrain: 'mountain', accent: '#B45A2C' },
  { id: 'kazbegi',   ka: 'ყაზბეგი',     en: 'Kazbegi',     m2: 60,  bedrooms: 2, floors: 2, price: 86000,  region: 'Stepantsminda',     terrain: 'mountain', accent: '#7E6A52' },
  { id: 'kvareli',   ka: 'ყვარელი',     en: 'Kvareli',     m2: 80,  bedrooms: 3, floors: 2, price: 124000, region: 'Kakheti',           terrain: 'vineyard', accent: '#6B7A4B' },
  { id: 'svaneti',   ka: 'სვანეთი',     en: 'Svaneti',     m2: 50,  bedrooms: 2, floors: 1, price: 72000,  region: 'Mestia',            terrain: 'highland', accent: '#4B3A2A' },
  { id: 'racha',     ka: 'რაჭა',        en: 'Racha',       m2: 45,  bedrooms: 2, floors: 1, price: 64000,  region: 'Racha-Lechkhumi',   terrain: 'forest',   accent: '#8A5A3B' },
  { id: 'adjara',    ka: 'აჭარა',       en: 'Adjara',      m2: 55,  bedrooms: 2, floors: 1, price: 78000,  region: 'Black Sea coast',   terrain: 'coastal',  accent: '#3F6B6B' },
  { id: 'sairme',    ka: 'საირმე',      en: 'Sairme',      m2: 40,  bedrooms: 1, floors: 1, price: 56000,  region: 'Imereti',           terrain: 'forest',   accent: '#5C6B3F' },
  { id: 'bazaleti',  ka: 'ბაზალეთი',    en: 'Bazaleti',    m2: 70,  bedrooms: 3, floors: 2, price: 102000, region: 'Mtskheta-Mtianeti', terrain: 'lakeside', accent: '#3B5A6B' },
  { id: 'tianeti',   ka: 'თიანეთი',     en: 'Tianeti',     m2: 25,  bedrooms: 1, floors: 1, price: 36000,  region: 'Mtskheta-Mtianeti', terrain: 'highland', accent: '#6B5A3B' },
  { id: 'ambrolauri',ka: 'ამბროლაური',  en: 'Ambrolauri',  m2: 65,  bedrooms: 3, floors: 2, price: 92000,  region: 'Racha-Lechkhumi',   terrain: 'forest',   accent: '#5A4B3B' },
];

// ─────────── BRAND COPY ───────────
const BRAND = {
  name: 'KOTEJEBI',
  tld: '.GE',
  taglineKa: 'შენი ჰარმონია ბუნებაში',
  taglineEn: 'Architect-built timber cottages, raised across Georgia.',
  stats: [
    { kpi: '230+', ka: 'პროექტი',         en: 'Projects' },
    { kpi: '4',    ka: 'წელი',             en: 'Years building' },
    { kpi: '5',    ka: 'ქვეყანა',          en: 'Countries' },
    { kpi: '15სმ', ka: 'თბო-იზოლაცია',     en: 'Insulation' },
  ],
  address: 'ბუდაპეშტის ქუჩა #38, თბილისი',
  addressEn: '38 Budapest St, Tbilisi',
  phone: '+995 555 38 98 08',
  // Process milestones — real payment structure from existing brand.
  process: [
    { n: '01', ka: 'იდეა',          en: 'Idea',          pct: 0  },
    { n: '02', ka: 'დიზაინი',       en: 'Design',        pct: 0  },
    { n: '03', ka: 'პროექტი',       en: 'Approval',      pct: 0  },
    { n: '04', ka: 'მშენებლობა I',  en: 'Build · 50%',   pct: 50 },
    { n: '05', ka: 'მშენებლობა II', en: 'Finish · 40%',  pct: 40 },
    { n: '06', ka: 'ჩაბარება',      en: 'Handover · 10%',pct: 10 },
  ],
};

// ─────────── COTTAGE SVG — used as a clean line-art reference in cards ───────────
// A single-line architectural elevation. Stroke-only, currentColor-tinted.
function CottageElevation({ variant = 'a', className, style }) {
  // Three subtly different silhouettes so collection grids don't feel cloned.
  if (variant === 'b') {
    return (
      <svg viewBox="0 0 240 140" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter" className={className} style={style} aria-hidden="true">
        {/* Long pitched roof + 2-storey */}
        <path d="M10 60 L120 14 L230 60" />
        <path d="M30 60 L30 130 L210 130 L210 60" />
        <path d="M30 95 L210 95" />
        <rect x="50" y="68" width="22" height="22" />
        <rect x="86" y="68" width="22" height="22" />
        <rect x="132" y="68" width="22" height="22" />
        <rect x="168" y="68" width="22" height="22" />
        <rect x="100" y="105" width="40" height="25" />
        <line x1="120" y1="105" x2="120" y2="130" />
        <rect x="60" y="105" width="20" height="25" />
        <rect x="160" y="105" width="20" height="25" />
        {/* Chimney */}
        <path d="M170 28 L170 14 L184 14 L184 35" />
      </svg>
    );
  }
  if (variant === 'c') {
    return (
      <svg viewBox="0 0 240 140" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter" className={className} style={style} aria-hidden="true">
        {/* A-frame */}
        <path d="M20 130 L120 14 L220 130" />
        <path d="M50 130 L120 50 L190 130" />
        <path d="M85 130 L85 95 L155 95 L155 130" />
        <rect x="105" y="105" width="30" height="25" />
        <line x1="120" y1="105" x2="120" y2="130" />
        <path d="M70 130 L70 110 L82 110 L82 130" />
        <path d="M158 130 L158 110 L170 110 L170 130" />
      </svg>
    );
  }
  // Default — cabin with porch
  return (
    <svg viewBox="0 0 240 140" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" strokeLinejoin="miter" className={className} style={style} aria-hidden="true">
      <path d="M20 65 L120 18 L220 65" />
      <path d="M40 65 L40 130 L200 130 L200 65" />
      <rect x="58" y="78" width="28" height="28" />
      <rect x="154" y="78" width="28" height="28" />
      <path d="M105 130 L105 86 L135 86 L135 130" />
      <line x1="120" y1="86" x2="120" y2="130" />
      {/* Porch posts */}
      <line x1="40" y1="115" x2="200" y2="115" />
      <path d="M170 35 L170 22 L182 22 L182 41" />
    </svg>
  );
}

// ─────────── PROCEDURAL "PHOTO" — abstract layered landscape SVG ───────────
// Used as full-bleed hero/portfolio imagery. Each one renders a unique
// terrain composition based on a seed so collection cards feel distinct
// without using stock photography.
function LandscapeSVG({ seed = 0, palette, style, className, withCottage = true }) {
  const p = palette || { sky: '#1a1f2a', sun: '#d4a574', mid: '#2a3440', near: '#0f1419', cottage: '#0a0c10', cottageRoof: '#1a1f2a', accent: '#B45A2C' };
  // pseudo-random
  const rand = (n) => {
    const x = Math.sin(seed * 1000 + n) * 43758.5453;
    return x - Math.floor(x);
  };
  // Build mountain ridges
  const ridge = (yBase, amp, segs, off) => {
    let path = `M0 ${yBase}`;
    for (let i = 0; i <= segs; i++) {
      const x = (i / segs) * 1200;
      const y = yBase + (rand(off + i) - 0.5) * amp;
      path += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    path += ` L1200 700 L0 700 Z`;
    return path;
  };
  return (
    <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${seed}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={p.sky} />
          <stop offset="100%" stopColor={p.mid} />
        </linearGradient>
        <radialGradient id={`sun-${seed}`} cx="0.7" cy="0.3" r="0.5">
          <stop offset="0%" stopColor={p.sun} stopOpacity="0.5" />
          <stop offset="60%" stopColor={p.sun} stopOpacity="0.05" />
          <stop offset="100%" stopColor={p.sun} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="700" fill={`url(#sky-${seed})`} />
      <rect width="1200" height="700" fill={`url(#sun-${seed})`} />
      {/* Sun/moon disc */}
      <circle cx={780 + rand(99)*100} cy={150 + rand(7)*60} r={28 + rand(3)*10} fill={p.sun} opacity="0.85" />
      {/* Distant ridge */}
      <path d={ridge(380, 60, 12, 11)} fill={p.mid} opacity="0.55" />
      {/* Mid ridge */}
      <path d={ridge(440, 90, 14, 23)} fill={p.mid} opacity="0.85" />
      {/* Near ridge */}
      <path d={ridge(520, 70, 16, 41)} fill={p.near} />

      {/* Pine trees scattered on near ridge */}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = (i / 14) * 1200 + rand(100 + i) * 40;
        const baseY = 540 + rand(200 + i) * 30;
        const h = 30 + rand(300 + i) * 40;
        return (
          <g key={i} fill={p.near} opacity="0.95">
            <path d={`M${x} ${baseY} L${x - h*0.25} ${baseY + h*0.4} L${x - h*0.15} ${baseY + h*0.4} L${x - h*0.32} ${baseY + h*0.7} L${x - h*0.2} ${baseY + h*0.7} L${x - h*0.4} ${baseY + h} L${x + h*0.4} ${baseY + h} L${x + h*0.2} ${baseY + h*0.7} L${x + h*0.32} ${baseY + h*0.7} L${x + h*0.15} ${baseY + h*0.4} L${x + h*0.25} ${baseY + h*0.4} Z`} />
          </g>
        );
      })}

      {withCottage && (
        <g transform="translate(540, 480) scale(1.2)">
          {/* Cottage silhouette with lit windows */}
          <path d="M0 50 L60 5 L120 50 L120 110 L0 110 Z" fill={p.cottage} />
          <path d="M-8 52 L60 0 L128 52" stroke={p.cottageRoof} strokeWidth="3" fill="none" />
          <rect x="20" y="65" width="18" height="22" fill={p.accent} opacity="0.9">
            <animate attributeName="opacity" values="0.8;1;0.85;1" dur="4s" repeatCount="indefinite" />
          </rect>
          <rect x="82" y="65" width="18" height="22" fill={p.accent} opacity="0.85">
            <animate attributeName="opacity" values="0.9;0.7;0.95;0.8" dur="3.2s" repeatCount="indefinite" />
          </rect>
          <rect x="52" y="80" width="16" height="30" fill={p.cottageRoof} />
        </g>
      )}
    </svg>
  );
}

// ─────────── CONFIGURATOR ───────────
// Live spec picker with running ₾ price. Pure React, no 3D — renders
// a styleable parametric SVG that responds to the chosen options.
function Configurator({ palette, onInquire, compact = false }) {
  const accent = palette?.accent || '#B45A2C';
  const fg = palette?.fg || '#1a1715';
  const muted = palette?.muted || 'rgba(0,0,0,0.6)';
  const surface = palette?.surface || 'rgba(0,0,0,0.04)';
  const border = palette?.border || 'rgba(0,0,0,0.12)';

  const [model,    setModel]    = React.useState('gergeti');
  const [size,     setSize]     = React.useState(50);
  const [floors,   setFloors]   = React.useState(1);
  const [cladding, setCladding] = React.useState('pine');
  const [roof,     setRoof]     = React.useState('matte');
  const [windows,  setWindows]  = React.useState('standard');
  const [pkg,      setPkg]      = React.useState('warm');

  // Pricing formula — base ₾/m² × multipliers. Meant to feel realistic, not exact.
  const price = React.useMemo(() => {
    const base = 1400 * size; // ₾/m²
    const floorMult = floors === 2 ? 1.18 : floors === 1.5 ? 1.08 : 1;
    const cladMult = { pine: 1, stained: 1.06, larch: 1.14 }[cladding];
    const roofMult = { matte: 1, bronze: 1.05, cedar: 1.12 }[roof];
    const winMult  = windows === 'panoramic' ? 1.09 : 1;
    const pkgMult  = { minimal: 1, warm: 1.08, hospitality: 1.18 }[pkg];
    return Math.round(base * floorMult * cladMult * roofMult * winMult * pkgMult / 100) * 100;
  }, [size, floors, cladding, roof, windows, pkg]);

  const fmtPrice = (n) => '₾ ' + n.toLocaleString('en-US').replace(/,/g, ' ');

  // Cladding color
  const cladColor = { pine: '#c8a472', stained: '#3a2a1f', larch: '#8a6a48' }[cladding];
  const roofColor = { matte: '#1a1a1a', bronze: '#5a4a35', cedar: '#6a4a32' }[roof];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1.1fr 1fr', gap: 0, background: surface, border: `1px solid ${border}`, borderRadius: 0 }}>
      {/* Live preview */}
      <div style={{ position: 'relative', aspectRatio: compact ? '16/9' : '4/3', background: 'linear-gradient(180deg, #15161a 0%, #2a2a30 100%)', overflow: 'hidden' }}>
        {/* Ground */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '38%', background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)' }} />
        {/* Cottage */}
        <svg viewBox="0 0 400 280" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="cfg-clad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={cladColor} stopOpacity="1" />
              <stop offset="100%" stopColor={cladColor} stopOpacity="0.78" />
            </linearGradient>
          </defs>
          {/* Sky gradient already on parent. Add atmospheric haze */}
          <ellipse cx="280" cy="80" rx="90" ry="40" fill="#d4a574" opacity="0.14" />
          {/* Distant trees */}
          <g fill="#1a1f24" opacity="0.85">
            <path d="M30 200 L20 230 L40 230 Z" />
            <path d="M50 195 L38 230 L62 230 Z" />
            <path d="M340 200 L330 230 L350 230 Z" />
            <path d="M370 198 L358 230 L382 230 Z" />
          </g>

          {/* Cottage body (size & floors affect dimensions) */}
          {(() => {
            const w = 120 + (size - 25) * 1.4;       // 120..230
            const h = floors === 2 ? 110 : floors === 1.5 ? 95 : 75;
            const x = 200 - w/2;
            const yBottom = 240;
            const yTop = yBottom - h;
            // Roof apex
            const apex = yTop - (floors === 2 ? 35 : 45);
            const winCount = windows === 'panoramic' ? Math.max(2, Math.round(w/40)) : Math.max(2, Math.round(w/55));
            const winW = windows === 'panoramic' ? (w - 40) / winCount - 6 : 16;
            const winH = floors === 2 ? 22 : 26;
            return (
              <g>
                {/* Walls */}
                <rect x={x} y={yTop} width={w} height={h} fill="url(#cfg-clad)" />
                {/* Cladding stripes */}
                {Array.from({ length: Math.floor(h/8) }).map((_, i) => (
                  <line key={i} x1={x} x2={x+w} y1={yTop + (i+1)*8} y2={yTop + (i+1)*8} stroke="rgba(0,0,0,0.18)" strokeWidth="0.5" />
                ))}
                {/* Roof */}
                <path d={`M${x-8} ${yTop+2} L${200} ${apex} L${x+w+8} ${yTop+2} Z`} fill={roofColor} />
                <path d={`M${x-8} ${yTop+2} L${200} ${apex} L${x+w+8} ${yTop+2} Z`} fill="url(#cfg-clad)" opacity="0" />
                {/* Floor divider */}
                {floors === 2 && <line x1={x} x2={x+w} y1={yTop + h/2} y2={yTop + h/2} stroke="rgba(0,0,0,0.3)" strokeWidth="1" />}
                {/* Windows row(s) */}
                {Array.from({ length: winCount }).map((_, i) => {
                  const wx = x + 18 + i * ((w - 36) / winCount);
                  return (
                    <g key={i}>
                      <rect x={wx} y={yTop + 14} width={winW} height={winH} fill="#f3e7c8" opacity="0.92" />
                      <line x1={wx + winW/2} x2={wx + winW/2} y1={yTop + 14} y2={yTop + 14 + winH} stroke={cladColor} strokeWidth="0.8" />
                      {floors === 2 && (
                        <rect x={wx} y={yTop + h/2 + 8} width={winW} height={winH * 0.85} fill="#f3e7c8" opacity="0.85" />
                      )}
                    </g>
                  );
                })}
                {/* Door */}
                <rect x={200 - 10} y={yBottom - 36} width={20} height={36} fill={roofColor} opacity="0.85" />
                {/* Chimney */}
                <rect x={200 + w*0.25} y={apex + 10} width={8} height={18} fill={roofColor} />
                {/* Ground line */}
                <line x1={x - 20} x2={x + w + 20} y1={yBottom} y2={yBottom} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              </g>
            );
          })()}
          {/* Stars / atmospheric particles */}
          {Array.from({ length: 18 }).map((_, i) => (
            <circle key={i} cx={20 + (i*23) % 380} cy={20 + (i*17) % 90} r={0.6 + (i % 3) * 0.3} fill="#fff" opacity="0.4" />
          ))}
        </svg>
        {/* Spec badges on preview */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.65)' }}>
          <div>MODEL · {COLLECTIONS.find(c => c.id === model)?.en.toUpperCase()}</div>
          <div>{size} M² · {floors === 2 ? '2 ფლ' : floors === 1.5 ? '1+ფლ' : '1 ფლ'}</div>
        </div>
        <div style={{ position: 'absolute', bottom: 12, right: 14, color: 'rgba(255,255,255,0.85)', textAlign: 'right' }}>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.12em', opacity: 0.6 }}>STARTING FROM</div>
          <div style={{ fontFamily: 'Instrument Serif, Noto Serif Georgian, serif', fontSize: 28, lineHeight: 1, marginTop: 2 }}>{fmtPrice(price)}</div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, background: palette?.bg || '#fff', color: fg }}>
        <CfgRow label="მოდელი · Model">
          <CfgSelect value={model} onChange={setModel} options={COLLECTIONS.slice(0,6).map(c => ({ value: c.id, label: c.ka }))} accent={accent} />
        </CfgRow>
        <CfgRow label={`ზომა · Size · ${size} m²`}>
          <input type="range" min="25" max="100" step="5" value={size} onChange={e => setSize(+e.target.value)}
            style={{ width: '100%', accentColor: accent }} />
        </CfgRow>
        <CfgRow label="სართული · Floors">
          <CfgSeg value={floors} onChange={setFloors} accent={accent}
            options={[{ value: 1, label: '1' }, { value: 1.5, label: '1+ლოფტი' }, { value: 2, label: '2' }]} />
        </CfgRow>
        <CfgRow label="კედელი · Cladding">
          <CfgSeg value={cladding} onChange={setCladding} accent={accent}
            options={[{ value: 'pine', label: 'ფიჭვი' }, { value: 'stained', label: 'მუქი' }, { value: 'larch', label: 'ლარიქსი' }]} />
        </CfgRow>
        <CfgRow label="სახურავი · Roof">
          <CfgSeg value={roof} onChange={setRoof} accent={accent}
            options={[{ value: 'matte', label: 'შავი' }, { value: 'bronze', label: 'ბრინჯაო' }, { value: 'cedar', label: 'კედარი' }]} />
        </CfgRow>
        <CfgRow label="ფანჯრები · Windows">
          <CfgSeg value={windows} onChange={setWindows} accent={accent}
            options={[{ value: 'standard', label: 'სტანდარტი' }, { value: 'panoramic', label: 'პანორამული' }]} />
        </CfgRow>
        <CfgRow label="ინტერიერი · Interior">
          <CfgSeg value={pkg} onChange={setPkg} accent={accent}
            options={[{ value: 'minimal', label: 'მინიმალური' }, { value: 'warm', label: 'თბილი' }, { value: 'hospitality', label: 'ჰოსპიტალური' }]} />
        </CfgRow>

        <button onClick={onInquire} style={{
          marginTop: 4, padding: '14px 18px', border: 'none', background: accent, color: '#fff',
          fontFamily: 'inherit', fontSize: 13, letterSpacing: '0.06em', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
        }}>
          <span>ფასის შეთავაზება · Request quote</span>
          <span style={{ fontSize: 18 }}>→</span>
        </button>
      </div>
    </div>
  );
}
function CfgRow({ label, children }) {
  return (
    <div>
      <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}
function CfgSelect({ value, onChange, options, accent }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(0,0,0,0.18)', background: 'transparent', color: 'inherit', fontFamily: 'inherit', fontSize: 14, borderRadius: 0, appearance: 'none', cursor: 'pointer' }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
function CfgSeg({ value, onChange, options, accent }) {
  return (
    <div style={{ display: 'flex', border: '1px solid rgba(0,0,0,0.14)' }}>
      {options.map((o, i) => {
        const sel = o.value === value;
        return (
          <button key={o.value} onClick={() => onChange(o.value)} style={{
            flex: 1, padding: '10px 6px', border: 'none', borderLeft: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.14)',
            background: sel ? accent : 'transparent', color: sel ? '#fff' : 'inherit',
            fontFamily: 'inherit', fontSize: 12, cursor: 'pointer', transition: 'background 0.15s',
          }}>{o.label}</button>
        );
      })}
    </div>
  );
}

// ─────────── ROI CALCULATOR ───────────
function ROICalc({ palette, compact = false }) {
  const accent = palette?.accent || '#B45A2C';
  const fg = palette?.fg || '#1a1715';
  const surface = palette?.surface || 'rgba(0,0,0,0.04)';

  const [investment, setInvestment] = React.useState(86000); // ₾
  const [nights,     setNights]     = React.useState(140);   // nights/yr
  const [rate,       setRate]       = React.useState(380);   // ₾/night
  const [opex,       setOpex]       = React.useState(22);    // % of revenue

  const revenue   = nights * rate;
  const netAnnual = Math.round(revenue * (1 - opex / 100));
  const yearsRaw  = investment / netAnnual;
  const years     = yearsRaw.toFixed(1);

  // ROI bar — show 12-year horizon
  const horizon = 12;

  return (
    <div style={{ background: surface, padding: 24, color: fg }}>
      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 1fr', gap: 20, alignItems: 'start' }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.16em', opacity: 0.55, marginBottom: 10 }}>ROI კალკულატორი · ROI CALCULATOR</div>
          <ROIRow label={`ინვესტიცია · Investment · ₾ ${investment.toLocaleString('en-US')}`}>
            <input type="range" min="35000" max="200000" step="1000" value={investment} onChange={e => setInvestment(+e.target.value)} style={{ width: '100%', accentColor: accent }} />
          </ROIRow>
          <ROIRow label={`ღამეები · Nights/year · ${nights}`}>
            <input type="range" min="30" max="280" step="5" value={nights} onChange={e => setNights(+e.target.value)} style={{ width: '100%', accentColor: accent }} />
          </ROIRow>
          <ROIRow label={`ფასი · Rate · ₾ ${rate}/night`}>
            <input type="range" min="120" max="900" step="10" value={rate} onChange={e => setRate(+e.target.value)} style={{ width: '100%', accentColor: accent }} />
          </ROIRow>
          <ROIRow label={`ხარჯები · Opex · ${opex}%`}>
            <input type="range" min="10" max="45" step="1" value={opex} onChange={e => setOpex(+e.target.value)} style={{ width: '100%', accentColor: accent }} />
          </ROIRow>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ROIStat ka="წლიური წმინდა" en="Net annual" value={`₾ ${netAnnual.toLocaleString('en-US')}`} accent={accent} />
          <ROIStat ka="ROI ვადა" en="Payback" value={`${years} წელი`} valueEn={`${years} years`} big accent={accent} />
          {/* Horizon bar */}
          <div>
            <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.12em', opacity: 0.5, marginBottom: 6 }}>0 ─────────────────── 12 წ</div>
            <div style={{ position: 'relative', height: 8, background: 'rgba(0,0,0,0.08)' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${Math.min(100, (yearsRaw / horizon) * 100)}%`, background: accent, transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ROIRow({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.08em', opacity: 0.6, marginBottom: 6, textTransform: 'uppercase' }}>{label}</div>
      {children}
    </div>
  );
}
function ROIStat({ ka, en, value, valueEn, big, accent }) {
  return (
    <div style={{ borderTop: `1px solid rgba(0,0,0,0.12)`, paddingTop: 10 }}>
      <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.14em', opacity: 0.5, marginBottom: 4 }}>{ka.toUpperCase()} · {en.toUpperCase()}</div>
      <div style={{ fontFamily: 'Instrument Serif, Noto Serif Georgian, serif', fontSize: big ? 44 : 26, lineHeight: 1, color: big ? accent : 'inherit' }}>{value}</div>
      {valueEn && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, opacity: 0.55, marginTop: 4 }}>{valueEn}</div>}
    </div>
  );
}

// ─────────── FLOOR PLAN with hover-room tooltips ───────────
const FLOOR_ROOMS = [
  { id: 'living',  ka: 'მისაღები',     en: 'Living',     m2: 24, x: 8,  y: 8,  w: 54, h: 38, note: 'სამხრეთი ფასადი · 3.2 m ჭერი' },
  { id: 'kitchen', ka: 'სამზარეულო',   en: 'Kitchen',    m2: 12, x: 62, y: 8,  w: 30, h: 22, note: 'კუნძული · ღია · 12 m²' },
  { id: 'bath',    ka: 'სველი წერტ.',  en: 'Bathroom',   m2: 6,  x: 62, y: 30, w: 18, h: 16, note: 'წყლის ფილა · ჩამრეცხი იატაკი' },
  { id: 'utility', ka: 'სამეურნ.',     en: 'Utility',    m2: 4,  x: 80, y: 30, w: 12, h: 16, note: 'საკურნი · ბოილერი' },
  { id: 'bed1',    ka: 'საძინებელი 1', en: 'Bedroom 1',  m2: 14, x: 8,  y: 46, w: 32, h: 28, note: 'ორმაგი · აღმოსავლეთი ხედი' },
  { id: 'bed2',    ka: 'საძინებელი 2', en: 'Bedroom 2',  m2: 10, x: 40, y: 46, w: 22, h: 28, note: 'სამხედრო · 10 m²' },
  { id: 'porch',   ka: 'ვერანდა',      en: 'Veranda',    m2: 14, x: 62, y: 46, w: 30, h: 28, note: 'ლარიქსი · დაცული 2 მ ფსკერი' },
];
function FloorPlan({ palette, compact = false }) {
  const accent = palette?.accent || '#B45A2C';
  const fg = palette?.fg || '#1a1715';
  const stroke = palette?.fg || '#1a1715';
  const surface = palette?.surface || 'rgba(0,0,0,0.04)';
  const [hover, setHover] = React.useState(null);
  const room = FLOOR_ROOMS.find(r => r.id === hover);

  return (
    <div style={{ background: surface, padding: compact ? 16 : 24, color: fg }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14, gap: 12 }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.16em', opacity: 0.5 }}>კოლექცია · KAZBEGI</div>
          <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: compact ? 22 : 28, lineHeight: 1.05, marginTop: 4 }}>{toMtavruli('გეგმა · 60 მ²')}</div>
        </div>
        <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.14em', opacity: 0.55, textAlign: 'right' }}>
          0 ─── 1 ─── 2 ─── 3 м<br />SCALE 1:80
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <svg viewBox="0 0 100 82" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Outer wall */}
          <rect x="2" y="2" width="96" height="78" fill="none" stroke={stroke} strokeWidth="1.2" />
          <rect x="6" y="6" width="88" height="70" fill="none" stroke={stroke} strokeWidth="0.4" opacity="0.4" />
          {FLOOR_ROOMS.map(r => {
            const isHover = hover === r.id;
            return (
              <g key={r.id}
                onMouseEnter={() => setHover(r.id)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: 'pointer' }}>
                <rect x={r.x} y={r.y} width={r.w} height={r.h}
                  fill={isHover ? accent : 'transparent'}
                  fillOpacity={isHover ? 0.18 : 0}
                  stroke={stroke}
                  strokeWidth="0.4"
                  style={{ transition: 'fill-opacity 0.15s' }}
                />
                <text x={r.x + r.w/2} y={r.y + r.h/2 - 1} textAnchor="middle"
                  style={{ fontFamily: 'Noto Sans Georgian, sans-serif', fontSize: 2.4, fill: stroke, opacity: 0.85, pointerEvents: 'none' }}>
                  {r.ka}
                </text>
                <text x={r.x + r.w/2} y={r.y + r.h/2 + 2.4} textAnchor="middle"
                  style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 1.8, fill: stroke, opacity: 0.5, pointerEvents: 'none' }}>
                  {r.m2} m²
                </text>
              </g>
            );
          })}
          {/* Door swings */}
          <path d="M30 46 A 8 8 0 0 1 38 54" fill="none" stroke={stroke} strokeWidth="0.3" />
          <path d="M62 24 A 6 6 0 0 1 56 30" fill="none" stroke={stroke} strokeWidth="0.3" />
          {/* North arrow */}
          <g transform="translate(91, 71)">
            <circle r="3.5" fill="none" stroke={stroke} strokeWidth="0.3" />
            <path d="M0 -2.5 L1.2 0.8 L0 0 L-1.2 0.8 Z" fill={stroke} />
            <text x="0" y="-4.5" textAnchor="middle" style={{ fontSize: 2, fill: stroke, fontFamily: 'Space Grotesk, monospace' }}>N</text>
          </g>
        </svg>

        {/* Tooltip */}
        <div style={{
          minHeight: 64, marginTop: 12, padding: 12, borderTop: `1px solid rgba(0,0,0,0.12)`,
          fontFamily: 'Noto Sans Georgian, sans-serif',
        }}>
          {room ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
              <div>
                <div style={{ fontFamily: 'Instrument Serif, Noto Serif Georgian, serif', fontSize: 22, lineHeight: 1 }}>{room.ka}</div>
                <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.1em', opacity: 0.6, marginTop: 4 }}>{room.en.toUpperCase()} · {room.m2} M²</div>
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, textAlign: 'right', maxWidth: '55%' }}>{room.note}</div>
            </div>
          ) : (
            <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.16em', opacity: 0.45 }}>← გადაიტანეთ კურსორი ოთახზე · HOVER ROOMS FOR DETAILS</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────── CONTACT FORM (multi-step) ───────────
function ContactForm({ palette, label = 'მოგვწერეთ' }) {
  const accent = palette?.accent || '#B45A2C';
  const fg = palette?.fg || '#1a1715';
  const surface = palette?.surface || 'transparent';
  const border = palette?.border || 'rgba(0,0,0,0.18)';

  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({ name: '', phone: '', region: 'kazbegi', m2: 50, budget: 80000, message: '' });
  const total = 4;

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <div style={{ background: surface, padding: 24, border: `1px solid ${border}`, color: fg, fontFamily: 'Noto Sans Georgian, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
        <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 26 }}>{toMtavruli(label)}</div>
        <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.14em', opacity: 0.55 }}>
          {step < total ? `${step + 1} / ${total}` : 'გაგზავნილია'}
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 22 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 2, background: i <= step ? accent : 'rgba(0,0,0,0.12)', transition: 'background 0.2s' }} />
        ))}
      </div>

      {step === 0 && (
        <CFStep>
          <CFLabel>სახელი · Your name</CFLabel>
          <CFInput value={data.name} onChange={v => update('name', v)} placeholder="ნინო ბერიძე" />
          <CFLabel>ტელეფონი · Phone</CFLabel>
          <CFInput value={data.phone} onChange={v => update('phone', v)} placeholder="+995 555 ..." />
        </CFStep>
      )}
      {step === 1 && (
        <CFStep>
          <CFLabel>რეგიონი · Region</CFLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {COLLECTIONS.slice(0,6).map(c => (
              <button key={c.id} onClick={() => update('region', c.id)} style={{
                padding: '12px 8px', border: `1px solid ${data.region === c.id ? accent : border}`,
                background: data.region === c.id ? accent : 'transparent',
                color: data.region === c.id ? '#fff' : 'inherit',
                fontFamily: 'inherit', fontSize: 13, cursor: 'pointer', textAlign: 'left',
              }}>{c.ka}</button>
            ))}
          </div>
        </CFStep>
      )}
      {step === 2 && (
        <CFStep>
          <CFLabel>{`ზომა · ${data.m2} m²`}</CFLabel>
          <input type="range" min="25" max="120" step="5" value={data.m2} onChange={e => update('m2', +e.target.value)} style={{ width: '100%', accentColor: accent }} />
          <div style={{ height: 14 }} />
          <CFLabel>{`ბიუჯეტი · ₾ ${data.budget.toLocaleString('en-US')}`}</CFLabel>
          <input type="range" min="35000" max="250000" step="1000" value={data.budget} onChange={e => update('budget', +e.target.value)} style={{ width: '100%', accentColor: accent }} />
        </CFStep>
      )}
      {step === 3 && (
        <CFStep>
          <CFLabel>დამატებითი ინფო · Notes</CFLabel>
          <textarea value={data.message} onChange={e => update('message', e.target.value)} rows="3" placeholder="ნაკვეთის შესახებ, ვადები, კითხვები..."
            style={{ width: '100%', padding: 12, border: `1px solid ${border}`, background: 'transparent', color: 'inherit', fontFamily: 'inherit', fontSize: 14, resize: 'vertical' }} />
        </CFStep>
      )}
      {step === 4 && (
        <div style={{ padding: '24px 0', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Instrument Serif, Noto Serif Georgian, serif', fontSize: 30, color: accent, lineHeight: 1.1 }}>მადლობა, {data.name || 'მეგობარო'}.</div>
          <div style={{ fontSize: 13, opacity: 0.7, marginTop: 10 }}>დაგიკავშირდებით 24 საათში · We'll call you within 24h.</div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0 || step === total} style={{
          padding: '10px 18px', border: `1px solid ${border}`, background: 'transparent', color: 'inherit',
          fontFamily: 'inherit', fontSize: 12, letterSpacing: '0.06em', cursor: 'pointer',
          opacity: (step === 0 || step === total) ? 0.3 : 1,
        }}>← უკან</button>
        {step < total - 1 && (
          <button onClick={() => setStep(s => s + 1)} style={{
            padding: '10px 22px', border: 'none', background: accent, color: '#fff',
            fontFamily: 'inherit', fontSize: 12, letterSpacing: '0.06em', cursor: 'pointer',
          }}>გაგრძელება →</button>
        )}
        {step === total - 1 && (
          <button onClick={() => setStep(total)} style={{
            padding: '10px 22px', border: 'none', background: accent, color: '#fff',
            fontFamily: 'inherit', fontSize: 12, letterSpacing: '0.06em', cursor: 'pointer',
          }}>გაგზავნა →</button>
        )}
      </div>
    </div>
  );
}
function CFStep({ children }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{children}</div>;
}
function CFLabel({ children }) {
  return <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.12em', opacity: 0.55, textTransform: 'uppercase', marginTop: 4 }}>{children}</div>;
}
function CFInput({ value, onChange, placeholder }) {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.2)', background: 'transparent', color: 'inherit', fontFamily: 'inherit', fontSize: 16, outline: 'none', marginBottom: 8 }} />;
}

// Export to window
Object.assign(window, {
  toMtavruli,
  COLLECTIONS, BRAND,
  CottageElevation, LandscapeSVG,
  Configurator, ROICalc, FloorPlan, ContactForm,
});
