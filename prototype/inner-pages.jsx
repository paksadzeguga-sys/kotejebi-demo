// inner-pages.jsx — all inner pages for V1 cinematic site

const IP = window.V1_PALETTE;

function IPNav({ active }) {
  const items = [
    { id: 'collection', ka: 'კოლექცია', href: 'collection.html' },
    { id: 'process',    ka: 'პროცესი',  href: 'process.html' },
    { id: 'materials',  ka: 'მასალა',   href: 'materials.html' },
    { id: 'portfolio',  ka: 'ნამუშევრები', href: 'portfolio.html' },
    { id: 'financing',  ka: 'ფინანსები',  href: 'financing.html' },
    { id: 'about',      ka: 'ჩვენ შესახებ', href: 'about.html' },
    { id: 'contact',    ka: 'კონტაქტი', href: 'contact.html' },
  ];
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(14,14,15,0.92)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${IP.border}`, padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <a href="v1-standalone.html" style={{ color: IP.fg, textDecoration: 'none', fontFamily: 'Instrument Serif, serif', fontSize: 22, letterSpacing: '0.02em' }}>kotejebi<span style={{ color: IP.accent }}>.ge</span></a>
      <div style={{ display: 'flex', gap: 28, fontFamily: 'Noto Sans Georgian', fontSize: 13 }}>
        {items.map(i => (
          <a key={i.id} href={i.href} style={{ color: i.id === active ? IP.accent : IP.fg, textDecoration: 'none', opacity: i.id === active ? 1 : 0.75 }}>{i.ka}</a>
        ))}
      </div>
      <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 11, letterSpacing: '0.16em', color: IP.accent }}>{BRAND.phone}</div>
    </nav>
  );
}

function IPHero({ chapter, en, kaTitle, accentTitle, sub, seed = 1 }) {
  return (
    <section style={{ position: 'relative', height: 520, overflow: 'hidden', borderBottom: `1px solid ${IP.border}` }}>
      <LandscapeSVG seed={seed} palette={{ sky: '#0e1d2a', sun: '#d4a574', mid: '#1a2a3a', near: '#040810', cottage: '#000', cottageRoof: '#0a0c10', accent: IP.accent }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }} withCottage={false} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,14,15,0.4) 0%, rgba(14,14,15,0.95) 100%)' }} />
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '120px 32px 0' }}>
        <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 11, letterSpacing: '0.22em', color: IP.accent, marginBottom: 18 }}>{chapter} — {en}</div>
        <h1 className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 96, lineHeight: 0.92, margin: 0, fontWeight: 500 }}>
          {toMtavruli(kaTitle)}{accentTitle && <><br/><span style={{ fontStyle: 'italic', fontFamily: 'Instrument Serif, serif', color: IP.accent }}>{toMtavruli(accentTitle)}</span></>}.
        </h1>
        {sub && <div style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 22, opacity: 0.7, marginTop: 22, maxWidth: 600, lineHeight: 1.4 }}>{sub}</div>}
      </div>
    </section>
  );
}

function IPFooter() {
  return (
    <footer style={{ background: '#040506', color: IP.fg, padding: '40px 32px', borderTop: `1px solid ${IP.border}`, display: 'flex', justifyContent: 'space-between', fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.14em', opacity: 0.6 }}>
      <span>© 2026 KOTEJEBI.GE</span>
      <span>FSC · ISO 9001 · 0% CREDO BANK</span>
      <span>{BRAND.phone}</span>
    </footer>
  );
}

// ─────────── COLLECTION (list of all 10) ───────────
function CollectionPage() {
  const [filter, setFilter] = React.useState('all');
  const filtered = filter === 'all' ? COLLECTIONS : COLLECTIONS.filter(c => c.terrain === filter);
  const terrains = ['all', ...Array.from(new Set(COLLECTIONS.map(c => c.terrain)))];
  return (
    <div style={{ background: IP.bg, color: IP.fg, minHeight: '100vh' }}>
      <IPNav active="collection" />
      <IPHero chapter="01" en="COLLECTION" kaTitle="ცხრა ადგილი," accentTitle="ცხრა სახლი" sub="Each model is named after the place it was first raised. Every cottage adapts to its terrain — snow, vineyard, coast, forest." seed={3} />
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32, paddingBottom: 18, borderBottom: `1px solid ${IP.border}` }}>
          <div style={{ display: 'flex', gap: 18, fontFamily: 'Space Grotesk, monospace', fontSize: 11, letterSpacing: '0.14em' }}>
            {terrains.map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{ background: 'transparent', border: 'none', color: filter === t ? IP.accent : IP.fg, opacity: filter === t ? 1 : 0.55, cursor: 'pointer', padding: '4px 0', borderBottom: filter === t ? `1px solid ${IP.accent}` : '1px solid transparent' }}>{t.toUpperCase()}</button>
            ))}
          </div>
          <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.16em', opacity: 0.55 }}>{filtered.length} MODELS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {filtered.map((m, i) => (
            <a key={m.id} href={`model.html?id=${m.id}`} style={{ textDecoration: 'none', color: IP.fg }}>
              <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', marginBottom: 14 }}>
                <LandscapeSVG seed={m.id.length * 13 + i} palette={{ sky: '#0e1d2a', sun: '#d4a574', mid: '#1a2a3a', near: '#040810', cottage: '#000', cottageRoof: '#0a0c10', accent: m.accent }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)' }} />
                <div style={{ position: 'absolute', top: 14, left: 14, fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.18em', opacity: 0.85 }}>№ {String(COLLECTIONS.indexOf(m)+1).padStart(2,'0')} · {m.terrain.toUpperCase()}</div>
                <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18 }}>
                  <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 36, lineHeight: 1 }}>{toMtavruli(m.ka)}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Space Grotesk, monospace', fontSize: 11, letterSpacing: '0.1em', opacity: 0.85 }}>
                <span>{m.m2} M² · {m.bedrooms} BR · {m.floors === 2 ? '2FL' : '1FL'}</span>
                <span style={{ color: IP.accent }}>FROM ₾ {(m.price/1000).toFixed(0)}K</span>
              </div>
            </a>
          ))}
        </div>
      </section>
      <IPFooter />
    </div>
  );
}

// ─────────── MODEL DETAIL ───────────
function ModelPage() {
  const id = new URLSearchParams(window.location.search).get('id') || 'kazbegi';
  const m = COLLECTIONS.find(c => c.id === id) || COLLECTIONS[1];
  const idx = COLLECTIONS.indexOf(m);
  return (
    <div style={{ background: IP.bg, color: IP.fg, minHeight: '100vh' }}>
      <IPNav active="collection" />
      {/* Big bleed */}
      <section style={{ position: 'relative', height: 720, overflow: 'hidden' }}>
        <LandscapeSVG seed={m.id.length * 13} palette={{ sky: '#0e1d2a', sun: '#d4a574', mid: '#1a2a3a', near: '#040810', cottage: '#000', cottageRoof: '#0a0c10', accent: m.accent }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,14,15,0.3) 0%, rgba(14,14,15,0.85) 100%)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 50, maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 11, letterSpacing: '0.22em', color: IP.accent }}>МОДЕЛ № {String(idx+1).padStart(2,'0')} · {m.region.toUpperCase()}</div>
          <h1 className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 140, lineHeight: 0.86, margin: '12px 0 0', fontWeight: 500 }}>{toMtavruli(m.ka)}</h1>
        </div>
      </section>
      {/* Spec strip */}
      <section style={{ borderBottom: `1px solid ${IP.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24 }}>
          {[['ფართი', `${m.m2} m²`],['საძინებელი', m.bedrooms],['სართული', m.floors],['რეგიონი', m.terrain],['ფასი', `₾ ${m.price.toLocaleString('en-US')}`]].map(([k,v],i) => (
            <div key={i}>
              <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.16em', opacity: 0.5 }}>{k.toUpperCase()}</div>
              <div style={{ fontFamily: 'Instrument Serif, Noto Serif Georgian, serif', fontSize: 32, marginTop: 4, color: i === 4 ? IP.accent : IP.fg }}>{v}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Description + floor plan */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60 }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.18em', color: IP.accent, marginBottom: 18 }}>ABOUT THE MODEL</div>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 26, lineHeight: 1.4, marginBottom: 26 }}>
            Designed for {m.terrain}, built for permanence.
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.7, opacity: 0.75 }}>
            {m.ka} — {m.bedrooms} საძინებლიანი, {m.floors === 2 ? 'ორ' : 'ერთ'}-სართულიანი ხის კოტეჯი, ფიჭვისა და ლარიქსისგან. 15 სმ მინერალური ბამბის თბო-იზოლაცია, ტრიპლეტი მინა, მეტალის სახურავი. გადახდა 50/40/10 სქემით, 0% Credo Bank-თან.
          </div>
          <div style={{ marginTop: 30, display: 'flex', gap: 12 }}>
            <a href="contact.html" style={{ padding: '14px 22px', background: IP.accent, color: IP.fg, textDecoration: 'none', fontFamily: 'Space Grotesk, monospace', fontSize: 12, letterSpacing: '0.14em' }}>REQUEST QUOTE →</a>
            <a href="financing.html" style={{ padding: '14px 22px', border: `1px solid ${IP.border}`, color: IP.fg, textDecoration: 'none', fontFamily: 'Space Grotesk, monospace', fontSize: 12, letterSpacing: '0.14em' }}>FINANCING</a>
          </div>
        </div>
        <FloorPlan palette={IP} />
      </section>
      {/* More models */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px 80px', borderTop: `1px solid ${IP.border}` }}>
        <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.18em', color: IP.accent, marginBottom: 24, paddingTop: 30 }}>MORE MODELS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {COLLECTIONS.filter(c => c.id !== m.id).slice(0, 3).map((mm, i) => (
            <a key={mm.id} href={`model.html?id=${mm.id}`} style={{ textDecoration: 'none', color: IP.fg }}>
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', marginBottom: 12 }}>
                <LandscapeSVG seed={mm.id.length * 13 + i} palette={{ sky: '#0e1d2a', sun: '#d4a574', mid: '#1a2a3a', near: '#040810', cottage: '#000', cottageRoof: '#0a0c10', accent: mm.accent }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              </div>
              <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 22 }}>{toMtavruli(mm.ka)}</div>
              <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.12em', opacity: 0.6, marginTop: 4 }}>{mm.m2}M² · ₾ {(mm.price/1000).toFixed(0)}K+</div>
            </a>
          ))}
        </div>
      </section>
      <IPFooter />
    </div>
  );
}

// ─────────── PROCESS ───────────
function ProcessPage() {
  return (
    <div style={{ background: IP.bg, color: IP.fg, minHeight: '100vh' }}>
      <IPNav active="process" />
      <IPHero chapter="02" en="PROCESS · 50/40/10" kaTitle="ექვსი ნაბიჯი" accentTitle="გასაღებამდე" sub="From first sketch to a key in your hand. Roughly 22–28 weeks. Three payments, one studio." seed={5} />
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 32px' }}>
        <V1Process />
      </section>
      <IPFooter />
    </div>
  );
}

// ─────────── MATERIALS ───────────
function MaterialsPage() {
  return (
    <div style={{ background: IP.bg, color: IP.fg, minHeight: '100vh' }}>
      <IPNav active="materials" />
      <IPHero chapter="03" en="MATERIALS" kaTitle="რვა ფენა," accentTitle="378 მილიმეტრი" sub="Pine from Belarus. Larch from Siberia. Knauf mineral wool. The wall, sliced." seed={7} />
      <V1Materials />
      <IPFooter />
    </div>
  );
}

// ─────────── PORTFOLIO ───────────
function PortfolioPage() {
  const [active, setActive] = React.useState(null);
  const projects = COLLECTIONS.flatMap((m, i) => [
    { ...m, year: 2021 + (i % 5), client: ['ნ. ხაბაზი','გ. ცინცაძე','მ. ლომიძე','ლ. ქარდავა','დ. გელაშვილი'][i % 5], plate: i+1 },
  ]);
  return (
    <div style={{ background: IP.bg, color: IP.fg, minHeight: '100vh' }}>
      <IPNav active="portfolio" />
      <IPHero chapter="04" en="PORTFOLIO · 230+ PROJECTS" kaTitle="ყოველი სახლი," accentTitle="ყოველი ხედი" sub="Two hundred thirty cottages, four years, five countries. A photo essay." seed={9} />
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {projects.map((p, i) => (
            <div key={i + p.id} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
              style={{ position: 'relative', aspectRatio: i % 5 === 0 ? '3/4' : '4/3', overflow: 'hidden', cursor: 'pointer', gridColumn: i % 7 === 3 ? 'span 2' : 'span 1' }}>
              <LandscapeSVG seed={p.id.length * 7 + i * 31} palette={{ sky: '#0e1d2a', sun: '#d4a574', mid: '#1a2a3a', near: '#040810', cottage: '#000', cottageRoof: '#0a0c10', accent: p.accent }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: active === i ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.6s' }} />
              <div style={{ position: 'absolute', inset: 0, background: active === i ? 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)' : 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.6) 100%)', transition: 'background 0.3s' }} />
              <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.18em', opacity: 0.85 }}>
                <span>PLATE {String(p.plate).padStart(3,'0')}</span>
                <span>{p.year}</span>
              </div>
              <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14 }}>
                <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 22, lineHeight: 1 }}>{toMtavruli(p.ka)}</div>
                {active === i && <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.12em', opacity: 0.8, marginTop: 6 }}>{p.client.toUpperCase()} · {p.m2}M²</div>}
              </div>
            </div>
          ))}
        </div>
      </section>
      <IPFooter />
    </div>
  );
}

// ─────────── FINANCING ───────────
function FinancingPage() {
  return (
    <div style={{ background: IP.bg, color: IP.fg, minHeight: '100vh' }}>
      <IPNav active="financing" />
      <IPHero chapter="05" en="FINANCING · CREDO BANK" kaTitle="0%," accentTitle="24 თვემდე" sub="Built on trust, paid on time. Apply in a day, sign in a week." seed={13} />
      <V1Financing />
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 32px' }}>
        <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.18em', color: IP.accent, marginBottom: 24 }}>FAQ</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            ['რა საბუთები მჭირდება?','პირადობა, შემოსავლის ცნობა (3 თვე), ცნობა სამუშაო ადგილიდან.'],
            ['რამდენი დრო სჭირდება დამტკიცებას?','24 საათი — Credo Bank-ის ფასტ ტრექი.'],
            ['შემიძლია წინასწარი გადახდის გაზრდა?','კი — 30%-დან 70%-მდე.'],
            ['რა ხდება თუ პროექტი შეფერხდება?','გადახდები ფიქსირებულია ეტაპებზე — ვადის გადაცილების შემთხვევაში არც დაიწევთ.'],
          ].map(([q, a], i) => (
            <div key={i} style={{ borderTop: `1px solid ${IP.border}`, paddingTop: 18 }}>
              <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 22, marginBottom: 8 }}>{toMtavruli(q)}</div>
              <div style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.6 }}>{a}</div>
            </div>
          ))}
        </div>
      </section>
      <IPFooter />
    </div>
  );
}

// ─────────── ABOUT ───────────
function AboutPage() {
  return (
    <div style={{ background: IP.bg, color: IP.fg, minHeight: '100vh' }}>
      <IPNav active="about" />
      <IPHero chapter="06" en="STUDIO · EST. 2021" kaTitle="ხე, ხელი," accentTitle="სახლი" sub="A small studio in Tbilisi raising timber houses across the Caucasus, Eastern Europe, and beyond." seed={17} />
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.18em', color: IP.accent, marginBottom: 18 }}>OUR PHILOSOPHY</div>
            <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 48, lineHeight: 1 }}>{toMtavruli('სახლი არის ')}<span style={{ fontStyle: 'italic', fontFamily: 'Instrument Serif, serif', color: IP.accent }}>{toMtavruli('გადაწყვეტილება')}</span>{toMtavruli(', არა ნივთი')}.</div>
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.75, opacity: 0.8 }}>
            <p>2021 წელს დავიწყეთ ერთი კოტეჯით ყაზბეგში. დღეს ვაშენებთ ხუთ ქვეყანაში — საქართველო, აზერბაიჯანი, სომხეთი, თურქეთი, რუმინეთი — 230+ პროექტი.</p>
            <p style={{ marginTop: 16 }}>თითოეული კოტეჯი იქმნება არქიტექტორთან ერთად. ფიჭვი ბელორუსიიდან, ლარიქსი ციმბირიდან, Knauf-ის მინერალური ბამბა, ტრიპლეტი მინა. გარანტია 60+ წელი.</p>
            <p style={{ marginTop: 16 }}>დღეს გუნდი 24 ადამიანია — არქიტექტორები, ინჟინრები, ხელოსნები. ყველა მოვა თქვენთან, ერთი თვის განმავლობაში.</p>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section style={{ borderTop: `1px solid ${IP.border}`, borderBottom: `1px solid ${IP.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 32px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {BRAND.stats.map((s, i) => (
            <div key={i} style={{ borderRight: i < 3 ? `1px solid ${IP.border}` : 'none', paddingRight: 24 }}>
              <div style={{ fontFamily: 'Instrument Serif, Noto Serif Georgian, serif', fontSize: 64, color: IP.accent, lineHeight: 1 }}>{s.kpi}</div>
              <div style={{ fontFamily: 'Noto Sans Georgian', fontSize: 13, marginTop: 8 }}>{s.ka}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Team */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 32px' }}>
        <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.18em', color: IP.accent, marginBottom: 24 }}>STUDIO</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          {[
            { name: 'ლუკა გელაშვილი', role: 'პრინციპალი არქიტექტორი', bg: '#3a4a52' },
            { name: 'ნინო ბერიძე', role: 'პროექტის მენეჯერი', bg: '#4b3a2a' },
            { name: 'გიორგი მაჭავარიანი', role: 'მთავარი ინჟინერი', bg: '#2a3a1d' },
            { name: 'თამარ ქარდავა', role: 'ინტერიერის დიზაინერი', bg: '#1a2a3a' },
          ].map((p, i) => (
            <div key={i}>
              <div style={{ aspectRatio: '4/5', background: p.bg, marginBottom: 12, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)' }} />
              </div>
              <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 18 }}>{toMtavruli(p.name)}</div>
              <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.14em', opacity: 0.6, marginTop: 4 }}>{p.role.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>
      <IPFooter />
    </div>
  );
}

// ─────────── CONTACT ───────────
function ContactPage() {
  return (
    <div style={{ background: IP.bg, color: IP.fg, minHeight: '100vh' }}>
      <IPNav active="contact" />
      <IPHero chapter="07" en="CONTACT" kaTitle="მოდი," accentTitle="ვაშენოთ" sub="Phone, Viber, WhatsApp, or the slow way — a letter to Budapest Street, 38, Tbilisi." seed={21} />
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                ['PHONE', BRAND.phone],
                ['STUDIO', BRAND.address],
                ['EMAIL', 'hello@kotejebi.ge'],
                ['HOURS', 'Mon–Sat · 10:00–19:00'],
                ['FINANCING', '0% Credo Bank · 50/40/10'],
              ].map(([k, v], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${IP.border}`, paddingTop: 16 }}>
                  <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 11, letterSpacing: '0.16em', opacity: 0.55 }}>{k}</span>
                  <span style={{ fontFamily: i === 0 ? 'Instrument Serif, serif' : 'Inter, Noto Sans Georgian', fontSize: i === 0 ? 26 : 15, color: i === 0 ? IP.accent : IP.fg }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 28, flexWrap: 'wrap' }}>
              {['Viber','WhatsApp','Messenger','Telegram'].map(s => (
                <div key={s} style={{ padding: '12px 18px', border: `1px solid ${IP.border}`, fontSize: 11, letterSpacing: '0.12em', fontFamily: 'Space Grotesk, monospace' }}>{s.toUpperCase()}</div>
              ))}
            </div>
            {/* Map placeholder */}
            <div style={{ marginTop: 32, aspectRatio: '16/9', background: '#0a0c10', border: `1px solid ${IP.border}`, position: 'relative', overflow: 'hidden' }}>
              <svg viewBox="0 0 400 225" style={{ width: '100%', height: '100%' }}>
                {Array.from({ length: 14 }).map((_,i) => <line key={'h'+i} x1={0} x2={400} y1={i*16} y2={i*16} stroke={IP.border} strokeWidth="0.4" />)}
                {Array.from({ length: 24 }).map((_,i) => <line key={'v'+i} x1={i*16} x2={i*16} y1={0} y2={225} stroke={IP.border} strokeWidth="0.4" />)}
                <circle cx="200" cy="112" r="8" fill={IP.accent} />
                <circle cx="200" cy="112" r="20" fill="none" stroke={IP.accent} strokeWidth="1" opacity="0.4" />
                <text x="200" y="146" textAnchor="middle" style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.18em', fill: IP.fg }}>BUDAPEST 38 · TBILISI</text>
              </svg>
            </div>
          </div>
          <ContactForm palette={IP} />
        </div>
      </section>
      <IPFooter />
    </div>
  );
}

window.CollectionPage = CollectionPage;
window.ModelPage = ModelPage;
window.ProcessPage = ProcessPage;
window.MaterialsPage = MaterialsPage;
window.PortfolioPage = PortfolioPage;
window.FinancingPage = FinancingPage;
window.AboutPage = AboutPage;
window.ContactPage = ContactPage;
