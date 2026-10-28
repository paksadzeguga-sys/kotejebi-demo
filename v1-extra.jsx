// V1 extended sections — Process, Materials cross-section, Testimonials, Financing, Footer

function V1Process() {
  const milestones = [
    { n: '01', ka: 'იდეა',           en: 'Idea',           pct: 0,  pay: 'უფასო კონსულტაცია', days: '1 კვ.' },
    { n: '02', ka: 'დიზაინი',        en: 'Design',         pct: 0,  pay: 'არქიტექტურული ვიზია', days: '2 კვ.' },
    { n: '03', ka: 'პროექტი',        en: 'Approval',       pct: 0,  pay: 'ნებართვები', days: '3-4 კვ.' },
    { n: '04', ka: 'მშენებლობა I',  en: 'Build · 50%',    pct: 50, pay: 'საფუძველი + კარკასი', days: '8-12 კვ.' },
    { n: '05', ka: 'მშენებლობა II', en: 'Finish · 40%',   pct: 40, pay: 'სახურავი + ფასადი', days: '6-8 კვ.' },
    { n: '06', ka: 'ჩაბარება',      en: 'Handover · 10%', pct: 10, pay: 'გასაღები ხელში', days: '1 კვ.' },
  ];
  return (
    <section style={{ background: V1_PALETTE.bg, color: V1_PALETTE.fg, padding: '100px 32px', borderTop: `1px solid ${V1_PALETTE.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 60 }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.22em', color: V1_PALETTE.accent, marginBottom: 14 }}>03 — ᲞᲠᲝᲪᲔᲡᲘ · PROCESS</div>
          <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 64, lineHeight: 0.95 }}>{toMtavruli('ექვსი ნაბიჯი ')}<span style={{ fontStyle: 'italic', fontFamily: 'Instrument Serif, serif', color: V1_PALETTE.accent }}>{toMtavruli('გასაღებამდე')}</span></div>
        </div>
        <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 11, letterSpacing: '0.14em', opacity: 0.5, textAlign: 'right' }}>
          50% კარკასი<br/>40% დასრულება<br/>10% ჩაბარებაზე
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', borderTop: `1px solid ${V1_PALETTE.border}` }}>
        {milestones.map((m, i) => (
          <div key={m.n} style={{ borderRight: i < 5 ? `1px solid ${V1_PALETTE.border}` : 'none', padding: '28px 18px 18px 0', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
              <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 11, letterSpacing: '0.18em', color: V1_PALETTE.accent }}>{m.n}</span>
              <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.12em', opacity: 0.5 }}>{m.days}</span>
            </div>
            <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 28, lineHeight: 1, marginBottom: 6 }}>{toMtavruli(m.ka)}</div>
            <div style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 14, opacity: 0.55, marginBottom: 14 }}>{m.en}</div>
            <div style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.5, marginBottom: 18 }}>{m.pay}</div>
            {/* Payment indicator */}
            <div style={{ borderTop: `1px solid ${V1_PALETTE.border}`, paddingTop: 12, fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.12em' }}>
              {m.pct > 0 ? (
                <>
                  <div style={{ height: 2, background: V1_PALETTE.border, marginBottom: 8, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${m.pct}%`, background: V1_PALETTE.accent }} />
                  </div>
                  <span style={{ color: V1_PALETTE.accent }}>{m.pct}% PAYMENT</span>
                </>
              ) : (
                <span style={{ opacity: 0.45 }}>NO PAYMENT YET</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40, padding: '20px 24px', border: `1px solid ${V1_PALETTE.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.16em', opacity: 0.55, marginBottom: 6 }}>FINANCING PARTNER</div>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22 }}>0% Credo Bank · 24 თვემდე</div>
        </div>
        <button style={{ padding: '14px 22px', border: 'none', background: V1_PALETTE.accent, color: V1_PALETTE.fg, fontFamily: 'Space Grotesk, monospace', fontSize: 12, letterSpacing: '0.14em', cursor: 'pointer' }}>FINANCING TERMS →</button>
      </div>
    </section>
  );
}

function V1Materials() {
  const layers = [
    { n: '01', ka: 'ლარიქსი',       en: 'Larch cladding',     mm: 22,  color: '#8a6a48' },
    { n: '02', ka: 'ვენტილაცია',    en: 'Air gap',            mm: 30,  color: '#1a1815' },
    { n: '03', ka: 'ქარდამცავი',    en: 'Wind barrier',       mm: 1,   color: '#3a342a' },
    { n: '04', ka: 'OSB-3',         en: 'OSB-3 sheathing',    mm: 12,  color: '#a8855a' },
    { n: '05', ka: 'ფიჭვი',          en: 'Pine framing',       mm: 150, color: '#c8a472' },
    { n: '06', ka: 'მინერ. ბამბა',   en: 'Mineral wool',       mm: 150, color: '#d4ccb8' },
    { n: '07', ka: 'ორთქლდამცავი', en: 'Vapor barrier',      mm: 1,   color: '#3a342a' },
    { n: '08', ka: 'გიფსოკარდონი', en: 'Plasterboard',       mm: 12,  color: '#e6e0d2' },
  ];
  const total = layers.reduce((s, l) => s + l.mm, 0);
  const [hover, setHover] = React.useState(null);
  return (
    <section style={{ background: '#06080b', color: V1_PALETTE.fg, padding: '100px 32px', borderTop: `1px solid ${V1_PALETTE.border}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.22em', color: V1_PALETTE.accent, marginBottom: 14 }}>04 — ᲛᲐᲡᲐᲚᲐ · MATERIALS</div>
          <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 64, lineHeight: 0.95 }}>{toMtavruli('კედელი ')}<span style={{ fontStyle: 'italic', fontFamily: 'Instrument Serif, serif', color: V1_PALETTE.accent }}>{toMtavruli('როგორც')}</span><br/>{toMtavruli('ნამცხვარი')}.</div>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 18, opacity: 0.6, marginTop: 18, lineHeight: 1.4, maxWidth: 460 }}>
            8 ფენა, 378 მმ. ფიჭვი ბელორუსიიდან, ლარიქსი ციმბირიდან, მინერალური ბამბა Knauf-ის.
          </div>
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[['U-VALUE','0.18 W/m²K'],['THICKNESS','378 mm'],['ZONE','II/III/IV'],['LIFE','60+ წელი']].map(([k,v]) => (
              <div key={k} style={{ borderTop: `1px solid ${V1_PALETTE.border}`, paddingTop: 10 }}>
                <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.16em', opacity: 0.5 }}>{k}</div>
                <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22, color: V1_PALETTE.accent, marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-section diagram */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.14em', opacity: 0.55, marginBottom: 12 }}>
            <span>ᲒᲐᲠᲔ · EXTERIOR</span>
            <span>ᲨᲘᲒ · INTERIOR</span>
          </div>
          <div style={{ display: 'flex', height: 260, border: `1px solid ${V1_PALETTE.border}` }}>
            {layers.map((l, i) => {
              const w = (l.mm / total) * 100;
              const active = hover === i;
              return (
                <div key={l.n}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  style={{ width: `${w}%`, minWidth: 4, background: l.color, position: 'relative', cursor: 'pointer', transition: 'filter 0.2s', filter: active ? 'brightness(1.4)' : 'brightness(1)' }}>
                  {active && (
                    <div style={{ position: 'absolute', top: -76, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', background: V1_PALETTE.bg, border: `1px solid ${V1_PALETTE.accent}`, padding: '8px 12px', zIndex: 2 }}>
                      <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.14em', color: V1_PALETTE.accent }}>{l.n} · {l.mm}MM</div>
                      <div style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 18, marginTop: 2 }}>{l.ka}</div>
                      <div style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 13, opacity: 0.7 }}>{l.en}</div>
                    </div>
                  )}
                  {/* Vertical label */}
                  <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%) rotate(-90deg)', transformOrigin: 'center', whiteSpace: 'nowrap', fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.12em', color: i < 4 ? '#0a0a0a' : '#1a1a1a', opacity: 0.7 }}>
                    {l.n}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {layers.map((l, i) => (
              <div key={l.n} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                style={{ display: 'grid', gridTemplateColumns: '32px 1fr auto', gap: 12, padding: '6px 0', fontSize: 12, opacity: hover === null || hover === i ? 1 : 0.4, transition: 'opacity 0.15s', cursor: 'pointer' }}>
                <span style={{ fontFamily: 'Space Grotesk, monospace', color: V1_PALETTE.accent, letterSpacing: '0.12em' }}>{l.n}</span>
                <span style={{ fontFamily: 'Noto Sans Georgian' }}>{l.ka} <span style={{ opacity: 0.5, fontStyle: 'italic', fontFamily: 'Instrument Serif, serif' }}>· {l.en}</span></span>
                <span style={{ fontFamily: 'Space Grotesk, monospace', opacity: 0.7 }}>{l.mm} mm</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function V1Testimonials() {
  const quotes = [
    { ka: '„გვინდოდა სახლი ყაზბეგში — მივიღეთ თბილი თავშესაფარი. ზამთრის -20°C, შიდა +22°C, საწვავი ნახევარი."', who: 'ნინო ხაბაზი', role: 'მფლობელი · Kazbegi 60', img: '#3a4a52' },
    { ka: '„პროცესი გამჭვირვალე — 50/40/10 ნამდვილად ისე იყო. ყოველ ეტაპზე ვიცოდით რა ხდებოდა."', who: 'გიორგი ცინცაძე', role: 'მფლობელი · Kvareli 80', img: '#4b3a2a' },
    { ka: '„24 კვირაში გასაღები ჩავიბარეთ. დღეს ჩვენი Airbnb ერთ-ერთი ყველაზე დაჯავშნულია სამცხეში."', who: 'მარიამ ლომიძე', role: 'მფლობელი · Sairme 40', img: '#2a3a1d' },
  ];
  return (
    <section style={{ background: V1_PALETTE.bg, color: V1_PALETTE.fg, padding: '100px 32px', borderTop: `1px solid ${V1_PALETTE.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 50 }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.22em', color: V1_PALETTE.accent, marginBottom: 14 }}>05 — ᲮᲛᲐ · VOICES</div>
          <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 64, lineHeight: 0.95 }}>{toMtavruli('230+ ოჯახი')}.<br/><span style={{ fontStyle: 'italic', fontFamily: 'Instrument Serif, serif', color: V1_PALETTE.accent }}>{toMtavruli('სამი ხმა')}</span>.</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ width: 44, height: 44, border: `1px solid ${V1_PALETTE.border}`, background: 'transparent', color: V1_PALETTE.fg, fontSize: 18, cursor: 'pointer' }}>←</button>
          <button style={{ width: 44, height: 44, border: `1px solid ${V1_PALETTE.accent}`, background: V1_PALETTE.accent, color: V1_PALETTE.fg, fontSize: 18, cursor: 'pointer' }}>→</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {quotes.map((q, i) => (
          <div key={i} style={{ background: V1_PALETTE.surface, border: `1px solid ${V1_PALETTE.border}`, padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 60, lineHeight: 0.5, color: V1_PALETTE.accent }}>"</div>
            <div style={{ fontFamily: 'Noto Sans Georgian', fontSize: 16, lineHeight: 1.55, flex: 1 }}>{q.ka}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: `1px solid ${V1_PALETTE.border}` }}>
              <div style={{ width: 40, height: 40, background: q.img, borderRadius: '50%', flexShrink: 0 }} />
              <div>
                <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 16 }}>{toMtavruli(q.who)}</div>
                <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 9, letterSpacing: '0.14em', opacity: 0.55, marginTop: 2 }}>{q.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function V1Financing() {
  return (
    <section style={{ background: '#06080b', color: V1_PALETTE.fg, padding: '100px 32px', borderTop: `1px solid ${V1_PALETTE.border}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.22em', color: V1_PALETTE.accent, marginBottom: 14 }}>06 — ᲤᲘᲜᲐᲜᲡᲔᲑᲘ · FINANCING</div>
          <div className="mtavruli" style={{ fontFamily: 'Noto Serif Georgian, serif', fontSize: 80, lineHeight: 0.92 }}>{toMtavruli('0%')}<br/><span style={{ fontStyle: 'italic', fontFamily: 'Instrument Serif, serif', color: V1_PALETTE.accent }}>{toMtavruli('24 თვემდე')}.</span></div>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 20, opacity: 0.65, marginTop: 24, maxWidth: 460, lineHeight: 1.4 }}>
            Credo Bank-თან ერთად — განვადება 0%-ით, წინასწარი გადახდა 30%-დან. დაამტკიცეთ ერთ დღეში.
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
            <button style={{ padding: '16px 26px', border: 'none', background: V1_PALETTE.accent, color: V1_PALETTE.fg, fontFamily: 'Space Grotesk, monospace', fontSize: 12, letterSpacing: '0.14em', cursor: 'pointer' }}>APPLY NOW →</button>
            <button style={{ padding: '16px 22px', border: `1px solid ${V1_PALETTE.border}`, background: 'transparent', color: V1_PALETTE.fg, fontFamily: 'Space Grotesk, monospace', fontSize: 12, letterSpacing: '0.14em', cursor: 'pointer' }}>TERMS</button>
          </div>
        </div>
        <div style={{ border: `1px solid ${V1_PALETTE.border}`, padding: 32, background: V1_PALETTE.surface }}>
          <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.16em', opacity: 0.55, marginBottom: 18 }}>SAMPLE — KAZBEGI 60M²</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['ფასი · Price',           '₾ 86 000'],
              ['წინასწარი · Down 30%',   '₾ 25 800'],
              ['კრედიტი · Loan',          '₾ 60 200'],
              ['ვადა · Term',             '24 თვე'],
              ['პროცენტი · Rate',         '0%'],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${V1_PALETTE.border}`, paddingBottom: 10, fontSize: 14 }}>
                <span style={{ opacity: 0.65 }}>{k}</span>
                <span style={{ fontFamily: 'Inter, Noto Sans Georgian', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 8 }}>
              <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.16em', opacity: 0.55 }}>თვიური · MONTHLY</span>
              <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: 44, color: V1_PALETTE.accent, lineHeight: 1 }}>₾ 2 508</span>
            </div>
          </div>
          <div style={{ marginTop: 18, padding: '10px 12px', border: `1px dashed ${V1_PALETTE.border}`, fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.12em', opacity: 0.6 }}>
            მაგალითი — საბოლოო პირობები ბანკის შეთანხმებით
          </div>
        </div>
      </div>
    </section>
  );
}

function V1Footer() {
  return (
    <footer style={{ background: '#040506', color: V1_PALETTE.fg, padding: '60px 32px 32px', borderTop: `1px solid ${V1_PALETTE.border}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
        <div>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 32, letterSpacing: '0.02em' }}>kotejebi<span style={{ color: V1_PALETTE.accent }}>.ge</span></div>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 16, opacity: 0.6, marginTop: 8, maxWidth: 380, lineHeight: 1.5 }}>
            Architect-built timber cottages. Raised across the Caucasus, made for stillness.
          </div>
        </div>
        {[
          { h: 'COLLECTION', items: ['Gergeti','Kazbegi','Kvareli','Svaneti','Racha','Adjara'] },
          { h: 'STUDIO',     items: ['Process','Materials','Financing','About','Press'] },
          { h: 'CONTACT',    items: [BRAND.phone, 'hello@kotejebi.ge', BRAND.address, 'Mon–Sat · 10–19'] },
        ].map((col, i) => (
          <div key={i}>
            <div style={{ fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.18em', color: V1_PALETTE.accent, marginBottom: 16 }}>{col.h}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, opacity: 0.75 }}>
              {col.items.map((s, j) => <span key={j}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ paddingTop: 24, borderTop: `1px solid ${V1_PALETTE.border}`, display: 'flex', justifyContent: 'space-between', fontFamily: 'Space Grotesk, monospace', fontSize: 10, letterSpacing: '0.14em', opacity: 0.5 }}>
        <span>© 2026 KOTEJEBI.GE · TBILISI · GEORGIA</span>
        <span>FSC CERTIFIED · ISO 9001 · 0% CREDO BANK</span>
        <span>SITE BY 10XSEO.GE</span>
      </div>
    </footer>
  );
}

window.V1Process = V1Process;
window.V1Materials = V1Materials;
window.V1Testimonials = V1Testimonials;
window.V1Financing = V1Financing;
window.V1Footer = V1Footer;
