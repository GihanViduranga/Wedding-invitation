import { useState, useEffect, useRef } from "react";

function useCSS(css) {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
    return () => { try { document.head.removeChild(el); } catch (_) {} };
  }, []);
}

/* ═══════════════════════════════════════
   COLOR PALETTE  (from uploaded swatch)
   #EBF4DD — lightest mint/ivory
   #8DAF8A — medium sage green
   #5A7F6A — deeper sage
   #3A5050 — darkest teal-slate
═══════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Josefin+Sans:wght@100;200;300;400&family=Great+Vibes&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --mint:     #EBF4DD;
  --sage-lt:  #8DAF8A;
  --sage:     #5A7F6A;
  --sage-dk:  #3A5050;
  --card-bg:  #c8dfc0;
  --card-mid: #b8d4ae;
  --card-drk: #a8c89c;
  --accent:   #8DAF8A;
  --text:     #0f1f16;
  --text-dim: rgba(15,31,22,0.82);
  --sep:      rgba(40,70,50,0.5);
}

html,body{width:100%;min-height:100%;margin:0;padding:0;font-family:'Josefin Sans',sans-serif;overflow-x:hidden}

body{
  min-height:100vh;
  background:radial-gradient(ellipse 160% 140% at 50% 0%, #1a2820 0%, #0d1a12 55%, #060e09 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
}

/* ── dust ── */
.dust{position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden}
.dp{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(141,175,138,.4) 0%,transparent 70%);animation:dpRise linear infinite}
@keyframes dpRise{0%{transform:translateY(102vh);opacity:0}10%{opacity:.7}90%{opacity:.15}100%{transform:translateY(-4vh);opacity:0}}

/* ── heart rain ── */
.hearts{position:fixed;inset:0;pointer-events:none;z-index:60;overflow:hidden}
.heart{position:absolute;top:-60px;animation:heartFall linear forwards;opacity:0;filter:drop-shadow(0 2px 8px rgba(100,160,100,.5))}
@keyframes heartFall{
  0%  {opacity:0;transform:translateY(0) rotate(-15deg) scale(.5)}
  8%  {opacity:1}
  50% {transform:translateY(50vh) rotate(15deg) scale(1)}
  94% {opacity:.8}
  100%{opacity:0;transform:translateY(108vh) rotate(-10deg) scale(.7)}
}

/* ── heart message ── */
.heart-msg{position:fixed;inset:0;z-index:55;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none}
.heart-msg-inner{text-align:center;opacity:0;transform:scale(.7);transition:opacity .5s ease,transform .5s ease}
.heart-msg-inner.show{opacity:1;transform:scale(1)}
.heart-msg-inner.hide{opacity:0;transform:scale(1.12);transition:opacity .4s ease .1s,transform .4s ease .1s}
.hm-icon{font-size:clamp(3rem,10vw,5rem);display:block;margin-bottom:.6rem;animation:hBeat .6s ease-in-out infinite alternate}
@keyframes hBeat{0%{transform:scale(1)}100%{transform:scale(1.14)}}
.hm-text{font-family:'Great Vibes',cursive;font-size:clamp(1.8rem,6vw,3.2rem);color:#c8e8c0;text-shadow:0 0 30px rgba(100,180,100,.6)}

/* ── envelope stage ── */
.env-stage{
  position:relative;z-index:10;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  width:100%;
  padding:clamp(60px,15vw,120px) 1rem clamp(60px,10vw,100px);
}
.env-wrap{
  position:relative;width:clamp(280px,82vw,460px);cursor:pointer;
  filter:drop-shadow(0 28px 55px rgba(0,0,0,.75)) drop-shadow(0 8px 18px rgba(0,0,0,.5));
  transition:transform .2s ease;
}
.env-wrap:hover{transform:scale(1.015)}
.env-svg{width:100%;display:block;overflow:visible}

/* hint */
.hint{margin-top:1.8rem;text-align:center;transition:opacity .5s}
.hint.gone{opacity:0;pointer-events:none}
.hint-t{display:block;font-size:8px;letter-spacing:.52em;color:rgba(141,175,138,.7);text-transform:uppercase;animation:hPulse 2.6s ease-in-out infinite}
.hint-l{display:block;margin:.5rem auto 0;width:1px;height:26px;background:linear-gradient(to bottom,rgba(141,175,138,.7),transparent);animation:hPulse 2.6s ease-in-out infinite}
@keyframes hPulse{0%,100%{opacity:.3;transform:translateY(0)}50%{opacity:1;transform:translateY(5px)}}

/* ═══════════════ FULL CARD PAGE ═══════════════ */
.full-page{
  position:fixed;inset:0;
  background:radial-gradient(ellipse 160% 140% at 50% 0%, #1a2820 0%, #0d1a12 55%, #060e09 100%);
  overflow-y:auto;display:flex;justify-content:center;align-items:flex-start;
  padding:clamp(2rem,5vw,4rem) clamp(.75rem,3vw,1.5rem) clamp(3rem,6vw,5rem);
  z-index:50;opacity:0;pointer-events:none;
  transition:opacity .9s ease .15s;
}
.full-page.show{opacity:1;pointer-events:all}
.full-inner{width:100%;max-width:520px;margin:0 auto}

/* ── card ── */
.full-card{
  position:relative;overflow:hidden;
  background:linear-gradient(158deg, var(--card-bg) 0%, var(--card-mid) 60%, var(--card-drk) 100%);
  border:1px solid rgba(40,80,55,.4);
  box-shadow:0 0 0 1px rgba(90,127,106,.08),0 40px 100px rgba(0,0,0,.8),0 0 80px rgba(90,127,106,.1);
  transform:translateY(50px) scale(.93);
  transition:transform 1.1s cubic-bezier(.16,1,.3,1) .65s;
}
.full-page.show .full-card{transform:translateY(0) scale(1)}

/* watermark */
.fc-wm{position:absolute;inset:0;pointer-events:none;opacity:.025;
  background-image:repeating-linear-gradient(45deg,transparent,transparent 15px,#5A7F6A 15px,#5A7F6A 16px),
  repeating-linear-gradient(-45deg,transparent,transparent 15px,#5A7F6A 15px,#5A7F6A 16px)}

/* corner brackets */
.fcc{position:absolute;width:22px;height:22px;border-color:var(--sage);border-style:solid;opacity:.4;z-index:3}
.fcc.tl{top:12px;left:12px;border-width:1.5px 0 0 1.5px}
.fcc.tr{top:12px;right:12px;border-width:1.5px 1.5px 0 0}
.fcc.bl{bottom:12px;left:12px;border-width:0 0 1.5px 1.5px}
.fcc.br{bottom:12px;right:12px;border-width:0 1.5px 1.5px 0}

/* ribbon */
.ribbon{height:4px;background:linear-gradient(90deg,var(--sage-dk),var(--sage),var(--sage-lt),var(--sage),var(--sage-dk))}

/* sections */
.fs{
  padding:clamp(1.6rem,4.5vw,2.8rem) clamp(1.4rem,4.5vw,2.6rem);
  text-align:center;position:relative;z-index:2;
  opacity:0;transform:translateY(28px);
  transition:opacity .8s ease,transform .8s ease;
}
.full-page.show .fs{opacity:1;transform:translateY(0)}
.full-page.show .fs:nth-child(2) {transition-delay:.80s}
.full-page.show .fs:nth-child(4) {transition-delay:1.00s}
.full-page.show .fs:nth-child(6) {transition-delay:1.20s}
.full-page.show .fs:nth-child(8) {transition-delay:1.40s}
.full-page.show .fs:nth-child(10){transition-delay:1.60s}
.full-page.show .fs:nth-child(12){transition-delay:1.80s}
.full-page.show .fs:nth-child(14){transition-delay:2.00s}

/* separator */
.fsep{height:1px;margin:0 clamp(1.4rem,4.5vw,2.6rem);background:linear-gradient(90deg,transparent,var(--sep),transparent);position:relative;z-index:2;opacity:0;transition:opacity .7s ease}
.full-page.show .fsep{opacity:1}
.full-page.show .fsep:nth-of-type(1){transition-delay:.95s}
.full-page.show .fsep:nth-of-type(2){transition-delay:1.15s}
.full-page.show .fsep:nth-of-type(3){transition-delay:1.35s}
.full-page.show .fsep:nth-of-type(4){transition-delay:1.55s}
.full-page.show .fsep:nth-of-type(5){transition-delay:1.75s}
.full-page.show .fsep:nth-of-type(6){transition-delay:1.95s}

.sep-gem{text-align:center;margin-top:-.58rem;position:relative;z-index:3;opacity:0;transition:opacity .5s ease}
.full-page.show .sep-gem{opacity:1}
.full-page.show .sep-gem:nth-of-type(1){transition-delay:1.0s}
.full-page.show .sep-gem:nth-of-type(2){transition-delay:1.2s}
.full-page.show .sep-gem:nth-of-type(3){transition-delay:1.4s}
.full-page.show .sep-gem:nth-of-type(4){transition-delay:1.6s}
.full-page.show .sep-gem:nth-of-type(5){transition-delay:1.8s}
.full-page.show .sep-gem:nth-of-type(6){transition-delay:2.0s}
.sep-gem span{background:var(--card-mid);padding:0 .75rem;color:#1e3828;font-size:.72rem;font-weight:600}

/* typography */
.eyebrow{font-size:clamp(6.5px,1.3vw,8.5px);font-weight:400;letter-spacing:.55em;color:#1e3828;text-transform:uppercase;display:block;margin-bottom:.85rem}
.heading{font-family:'Cormorant Garamond',serif;font-size:clamp(1.05rem,2.8vw,1.55rem);font-weight:600;color:#0f1f16;line-height:1.3;margin-bottom:.55rem}
.heading em{font-style:italic;color:#2a5040}
.body-p{font-family:'Cormorant Garamond',serif;font-size:clamp(.9rem,1.9vw,1.06rem);font-weight:400;color:rgba(15,31,22,0.78);line-height:1.8}

/* cover names */
.cover-names{font-family:'Great Vibes',cursive;font-size:clamp(3rem,9.5vw,5.8rem);color:#1a3228;line-height:.94;text-shadow:0 2px 12px rgba(20,50,35,.18)}
.cover-amp{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(.85rem,2.4vw,1.25rem);color:#2e5a45;display:block;margin:.22rem 0}
.cover-date{font-family:'Cormorant Garamond',serif;font-size:clamp(.84rem,1.9vw,1rem);font-weight:400;letter-spacing:.12em;color:rgba(15,31,22,0.7);margin-top:1rem}

/* ── COUPLE PHOTOS ── */
.couple-photos{
  display:grid;grid-template-columns:1fr 1fr;
  gap:clamp(.6rem,1.5vw,1rem);
  margin-top:0;
  padding:0 clamp(1.4rem,4.5vw,2.6rem) clamp(1.6rem,4.5vw,2.4rem);
  opacity:0;transform:translateY(24px);
  transition:opacity .9s ease,transform .9s ease;
  position:relative;z-index:2;
}
.full-page.show .couple-photos{opacity:1;transform:translateY(0);transition-delay:.92s}

.photo-frame{
  position:relative;
  aspect-ratio:3/4;
  border:1px solid rgba(90,127,106,.3);
  background:linear-gradient(135deg,#d0e8c8 0%,#b8d8aa 50%,#a0c898 100%);
  overflow:hidden;
}
.photo-frame::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,255,255,.15) 0%,transparent 60%);
}
/* corner brackets on photo */
.photo-frame::after{
  content:'';position:absolute;inset:6px;
  border:1px solid rgba(90,127,106,.25);
  pointer-events:none;
}
.photo-inner{
  width:100%;height:100%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:.4rem;
}
.photo-icon{font-size:clamp(1.8rem,5vw,2.8rem);opacity:.45}
.photo-label{
  font-size:clamp(6px,1.2vw,7.5px);letter-spacing:.4em;
  color:rgba(58,80,80,.55);text-transform:uppercase;
  font-family:'Josefin Sans',sans-serif;font-weight:200;
}
/* If user provides an actual img tag inside .photo-frame */
.photo-frame img{width:100%;height:100%;object-fit:cover;display:block}

/* detail grid */
.det-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(.55rem,1.5vw,.9rem);text-align:left;margin-top:.75rem}
.det-box{border:1px solid rgba(30,60,40,.25);padding:clamp(.62rem,1.6vw,.95rem);background:rgba(20,50,30,.08);transition:border-color .3s,background .3s}
.det-box:hover{border-color:rgba(30,60,40,.45);background:rgba(20,50,30,.14)}
.det-i{font-size:.9rem;margin-bottom:.28rem;display:block}
.det-l{font-size:clamp(5.5px,1.1vw,7px);letter-spacing:.38em;color:#1e3828;font-weight:600;text-transform:uppercase;display:block;margin-bottom:.22rem}
.det-v{font-family:'Cormorant Garamond',serif;font-size:clamp(.78rem,1.6vw,.92rem);font-weight:500;color:#0f1f16;line-height:1.4;white-space:pre-line}

/* timeline */
.tl{border:1px solid rgba(90,127,106,.18);overflow:hidden;margin-top:.85rem}
.tl-row{display:flex;align-items:stretch;border-bottom:1px solid rgba(90,127,106,.1);transition:background .25s}
.tl-row:last-child{border-bottom:none}
.tl-row:hover{background:rgba(90,127,106,.06)}
.tl-t{min-width:clamp(52px,13vw,72px);padding:clamp(.58rem,1.3vw,.78rem) .48rem;background:rgba(90,127,106,.07);border-right:1px solid rgba(90,127,106,.12);font-size:clamp(5.5px,1.1vw,7px);letter-spacing:.22em;color:var(--sage);text-transform:uppercase;display:flex;align-items:center;justify-content:center;text-align:center;line-height:1.35}
.tl-info{padding:clamp(.58rem,1.3vw,.78rem) clamp(.62rem,1.6vw,.96rem);text-align:left}
.tl-name{font-family:'Cormorant Garamond',serif;font-size:clamp(.85rem,1.8vw,1rem);font-weight:400;color:var(--text);margin-bottom:.08rem}
.tl-desc{font-family:'Cormorant Garamond',serif;font-size:clamp(.7rem,1.3vw,.8rem);color:var(--text-dim);line-height:1.44}

/* closing */
.cl-script{font-family:'Great Vibes',cursive;font-size:clamp(1.9rem,6vw,3rem);color:#1a3228;opacity:.35;margin-bottom:.7rem}
.cl-verse{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(.82rem,1.7vw,.97rem);font-weight:400;color:rgba(15,31,22,0.75);line-height:1.76}
.cl-rule{display:flex;align-items:center;gap:.75rem;justify-content:center;margin-top:1.3rem}
.cl-line{flex:1;height:1px}
.cl-line.l{background:linear-gradient(90deg,transparent,rgba(40,70,50,.5))}
.cl-line.r{background:linear-gradient(90deg,rgba(40,70,50,.5),transparent)}
.cl-reply{margin-top:1.1rem;font-size:clamp(5.5px,1.1vw,7px);letter-spacing:.44em;font-weight:400;color:rgba(15,31,22,0.55);text-transform:uppercase}

@media(max-width:440px){
  .det-grid{grid-template-columns:1fr}
  .couple-photos{grid-template-columns:1fr 1fr}
  .full-page{padding:1.8rem .65rem 3.5rem}
  .fs{padding:1.25rem 1.1rem}
}
`;

/* ── dust ── */
function DustParticles() {
  const pts = Array.from({ length: 18 }, (_, i) => ({
    id: i, sz: 2 + Math.random() * 3.5,
    left: Math.random() * 100,
    delay: Math.random() * 14, dur: 14 + Math.random() * 18,
  }));
  return (
    <div className="dust">
      {pts.map(p => (
        <div key={p.id} className="dp" style={{
          width: p.sz, height: p.sz, left: p.left + "%",
          animationDelay: p.delay + "s", animationDuration: p.dur + "s",
        }} />
      ))}
    </div>
  );
}

/* ── SVG Envelope (sage green palette) ── */
function EnvelopeSVG() {
  const W = 300, H = 200, MX = 150, MY = 104;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="env-svg" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="gBase" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#a8c8a0" />
          <stop offset="50%"  stopColor="#8DAF8A" />
          <stop offset="100%" stopColor="#6a9068" />
        </linearGradient>
        <linearGradient id="gLeft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#b4cead" />
          <stop offset="100%" stopColor="#5A7F6A" />
        </linearGradient>
        <linearGradient id="gRight" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#b4cead" />
          <stop offset="100%" stopColor="#5A7F6A" />
        </linearGradient>
        <linearGradient id="gBottom" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor="#3A5050" />
          <stop offset="100%" stopColor="#6a9068" />
        </linearGradient>
        <linearGradient id="gFlap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#c4dbb8" />
          <stop offset="60%"  stopColor="#8DAF8A" />
          <stop offset="100%" stopColor="#6a9068" />
        </linearGradient>
        <linearGradient id="gSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
          <stop offset="55%"  stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* base */}
      <rect x="0" y="0" width={W} height={H} rx="4" fill="url(#gBase)" />
      {/* texture */}
      <rect x="0" y="0" width={W} height={H} rx="4" fill="none"
        stroke="rgba(255,255,255,0.06)" strokeWidth="0" />

      {/* left */}
      <polygon points={`0,0 0,${H} ${MX},${MY}`} fill="url(#gLeft)" />
      {/* right */}
      <polygon points={`${W},0 ${W},${H} ${MX},${MY}`} fill="url(#gRight)" />
      {/* bottom */}
      <polygon points={`0,${H} ${W},${H} ${MX},${MY}`} fill="url(#gBottom)" />

      {/* top flap — closed, static */}
      <polygon points={`0,0 ${W},0 ${MX},${MY}`} fill="url(#gFlap)" />
      <polygon points={`0,0 ${W},0 ${MX},${MY}`} fill="url(#gSheen)" />

      {/* wax seal */}
      <circle cx={MX} cy={MY} r="20" fill="#3A5050" />
      <circle cx={MX-4} cy={MY-5} r="20" fill="#5A7F6A" opacity="0.5" />
      <circle cx={MX} cy={MY} r="14" fill="none" stroke="rgba(235,244,221,0.3)" strokeWidth="1" />
      <text x={MX} y={MY+6} textAnchor="middle"
        fontFamily="'Great Vibes', cursive" fontSize="16"
        fill="rgba(235,244,221,0.95)"
        style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,.6))", textAlign:"center" }}>{"\nP\n♡M"}</text>

      {/* postmark */}
      <g opacity="0.45" transform={`translate(${W-56}, 10)`}>
        <circle cx="16" cy="16" r="14" fill="none" stroke="#3A5050" strokeWidth="1.5" />
        <line x1="31" y1="12" x2="40" y2="12" stroke="#3A5050" strokeWidth="1.5" />
        <line x1="31" y1="16" x2="40" y2="16" stroke="#3A5050" strokeWidth="1.5" />
        <line x1="31" y1="20" x2="40" y2="20" stroke="#3A5050" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/* ── hearts ── */
const HEART_CHARS = ["❤️","💚","🤍","💛","🌿","💕","💖","🍃","✨","💝"];
function spawnHearts(setHearts) {
  const batch = Array.from({ length: 38 }, (_, i) => ({
    id: Date.now() + i,
    left: Math.random() * 96,
    char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
    dur: 2.2 + Math.random() * 2.8,
    delay: Math.random() * 2,
    fs: 16 + Math.random() * 24,
    rot: -25 + Math.random() * 50,
  }));
  setHearts(h => [...h, ...batch]);
  setTimeout(() => setHearts(h => h.filter(x => !batch.find(b => b.id === x.id))), 7000);
}

/* ── photo frame placeholder ── */
function PhotoFrame({ src, label, icon }) {
  return (
    <div className="photo-frame">
      {src ? (
        <img src={src} alt={label} />
      ) : (
        <div className="photo-inner">
          <span className="photo-icon">{icon}</span>
          <span className="photo-label">{label}</span>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════
   MAIN
════════════════════════════════ */
export default function WeddingInvitation() {
  useCSS(CSS);
  const [phase, setPhase] = useState("idle");
  const [hearts, setHearts] = useState([]);
  const [showMsg, setShowMsg] = useState(false);
  const audioRef = useRef(null);

  const playMusic = () => {
    audioRef.current.play();
  };

  const handleClick = () => {
    if (phase !== "idle") return;
    playMusic();
    audioRef.current.play();   // play music
    setPhase("hearts");
    spawnHearts(setHearts);
    setShowMsg(true);
    setTimeout(() => { setShowMsg(false); spawnHearts(setHearts); }, 2000);
    setTimeout(() => { setPhase("full"); }, 2500);
  };

  return (
    <>
      <DustParticles />

      

      {/* heart rain */}
      <div className="hearts">
        {hearts.map(h => (
          <div key={h.id} className="heart" style={{
            left: h.left + "%", fontSize: h.fs + "px",
            animationDuration: h.dur + "s", animationDelay: h.delay + "s",
            transform: `rotate(${h.rot}deg)`,
          }}>{h.char}</div>
        ))}
      </div>

      {/* message overlay */}
      {/* {phase === "hearts" && (
        <div className="heart-msg">
          <div className={`heart-msg-inner ${showMsg ? "show" : "hide"}`}>
            <span className="hm-icon">💌</span>
            <span className="hm-text">You're invited…</span>
          </div>
        </div>
      )} */}

      {/* envelope */}
      {phase !== "full" && (
        <div className="env-stage">
          <div className="env-wrap" onClick={handleClick}>
            <EnvelopeSVG />
          </div>
          <div className={`hint${phase !== "idle" ? " gone" : ""}`}>
            <span className="hint-t">Tap the envelope to open</span>
            <span className="hint-l" />
          </div>
        </div>
      )}

      {/* ══ FULL INVITATION ══ */}
      <div className={`full-page${phase === "full" ? " show" : ""}`}>
        <div className="full-inner">
          <div className="full-card">
            <div className="fc-wm" />
            <div className="fcc tl" /><div className="fcc tr" />
            <div className="fcc bl" /><div className="fcc br" />
            <div className="ribbon" />

            {/* 1 — Cover */}
            <div className="fs">
              <span className="eyebrow">Together with their families</span>
              <div className="cover-names">Piumi<span className="cover-amp">&amp;</span>Mihindu</div>
              <p className="cover-date">Monday · the Eighteeth of May · 2026</p>
            </div>

            <div className="fsep" /><div className="sep-gem"><span>✦</span></div>

            {/* 2 — Couple photos */}
            <div className="couple-photos">
              <PhotoFrame src="\images\image1.jpeg" label="Add photo here" icon="🌿" />
              <PhotoFrame src="\images\image2.jpeg" label="Add photo here" icon="🌿" />
            </div>

            <div className="fsep" /><div className="sep-gem"><span>✦</span></div>

            {/* 3 — Invitation */}
            <div className="fs">
              <span className="eyebrow">Our Invitation</span>
              <h2 className="heading">Request the honor of <em>your presence</em></h2>
              <p className="body-p">as we exchange our vows and begin our new life together on the breathtaking shores of Lake Como. Join us for an evening of love, laughter, and celebration beneath the Italian stars.</p>
            </div>

            <div className="fsep" /><div className="sep-gem"><span>✦</span></div>

            {/* 4 — Details */}
            <div className="fs">
              <span className="eyebrow">Celebration Details</span>
              <div className="det-grid">
                {[
                  {i:"📍",l:"Venue",    v:"Grand Divine Hotel,119-3-B, Kosgama"},
                  {i:"📅",l:"Date",     v:"Monday\n18 May 2026"},
                  {i:"⏰",l:"Ceremony", v:"10:40 AM\nPoruwa Ceremony"},
                  {i:"🏨",l:"Hotel",    v:"Grand Divine Hotel, Kosgama"},
                ].map(d => (
                  <div className="det-box" key={d.l}>
                    <span className="det-i">{d.i}</span>
                    <span className="det-l">{d.l}</span>
                    <div className="det-v">{d.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fsep" /><div className="sep-gem"><span>✦</span></div>

            {/* 5 — Closing */}
            <div className="fs">
              <div className="cl-script">P &amp; M</div>
              <p className="cl-verse">
                "I carry your heart with me,<br />I carry it in my heart."<br />
                <span style={{fontSize:".8em",opacity:.65}}>— e.e. cummings</span>
              </p>
              <div className="cl-rule">
                <div className="cl-line l" />
                <span style={{color:"var(--sage)",fontSize:".68rem"}}>✦</span>
                <div className="cl-line r" />
              </div>
              <p className="cl-reply">Kindly reply by the 1st of April · 2026</p>
            </div>

            <div className="ribbon" style={{transform:"rotate(180deg)"}} />
          </div>
        </div>
      </div>

      <div>
      <audio ref={audioRef} loop>
        <source src="\music\song.mp3" type="audio/mp3" />
      </audio>
    </div>
    </>
  );
}
