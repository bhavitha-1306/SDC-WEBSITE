"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/* ── Same words & positions as the standalone HTML splash screen ── */
const WORDS = [
  { text: "transform", top: "26%", left: "7.5%",  size: "clamp(2.6rem,4.8vw,5.4rem)", delay: 0.1,  dur: 5.5 },
  { text: "Connect",   top: "24%", right: "4.5%", size: "clamp(2.8rem,5.5vw,6.2rem)", delay: 0.4,  dur: 6   },
  { text: "trust",     top: "47%", left: "13%",   size: "clamp(2.3rem,4.4vw,5rem)",   delay: 0.8,  dur: 5   },
  { text: "create",    top: "49%", right: "3.5%", size: "clamp(2.3rem,4.4vw,5rem)",   delay: 0.2,  dur: 4.8 },
  { text: "dreams",    top: "63%", right: "4.5%", size: "clamp(2.3rem,4.4vw,5rem)",   delay: 1.0,  dur: 5.8 },
  { text: "achieve",   top: "64%", left: "10.5%", size: "clamp(2.3rem,4.4vw,5rem)",   delay: 0.6,  dur: 5.2 },
  { text: "grow",      top: "77%", left: "4.5%",  size: "clamp(2.8rem,5vw,5.6rem)",   delay: 1.2,  dur: 6.4 },
  { text: "community", top: "76%", right: "2.5%", size: "clamp(3rem,6vw,7rem)",        delay: 0.9,  dur: 5.6 },
];

/* Show once per browser session */
let _hasShown = false;

/* Dark orange-red panel background — same as the HTML splash */
const PANEL = "#0E0100";

export default function Preloader() {
  const [show, setShow]         = useState(!_hasShown);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (_hasShown) return;
    _hasShown = true;

    const DURATION = 2400;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setProgress(e * 100);
      if (t < 1) requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 250);
    };

    requestAnimationFrame(tick);
  }, []);

  const PANEL_EASE = { duration: 0.9, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* ── Split panels (dark orange-red, matching the HTML splash) ── */}
          <motion.div key="pre-top" exit={{ y: "-101%" }} transition={PANEL_EASE}
            className="fixed inset-x-0 top-0 z-[9999]" style={{ height: "50dvh", background: PANEL }} />
          <motion.div key="pre-bot" exit={{ y: "101%" }} transition={PANEL_EASE}
            className="fixed inset-x-0 bottom-0 z-[9999]" style={{ height: "50dvh", background: PANEL }} />

          {/* ── Full-screen content layer ── */}
          <motion.div
            key="pre-content"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] overflow-hidden select-none pointer-events-none"
          >

            {/* ── Background: radial orange-red glow (main atmosphere) ── */}
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse 90% 75% at 50% 42%, #CC4A10 0%, #8B2000 38%, #4E0800 65%, #180200 100%)"
            }} />
            {/* Inner warm spotlight */}
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse 45% 40% at 50% 44%, rgba(160,55,12,.10) 0%, transparent 70%)"
            }} />

            {/* ── Floating words — warm orange watermark ── */}
            {WORDS.map((w, i) => (
              <motion.span
                key={i}
                className="absolute font-extrabold"
                style={{
                  top: w.top,
                  left: (w as { left?: string }).left,
                  right: (w as { right?: string }).right,
                  fontSize: w.size,
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 900,
                  letterSpacing: "-0.035em",
                  lineHeight: 1,
                  color: "rgba(205,78,18,.17)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 0.17, 0.24, 0.17], y: [10, 0, -14, 0] }}
                transition={{ delay: w.delay, duration: w.dur, repeat: Infinity, ease: "easeInOut" }}
              >
                {w.text}
              </motion.span>
            ))}

            {/* ── SDC Logo — centered (gradient text like HTML splash) ── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                className="text-center relative z-10"
              >
                {/* Glow behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{
                  width: 360, height: 360, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,80,30,.16) 0%, transparent 70%)",
                  filter: "blur(50px)",
                }} />

                {/* "SDC" gradient text — same gradient as HTML splash */}
                <div
                  className="font-extrabold relative z-10"
                  style={{
                    fontSize: "clamp(5.5rem, 14vw, 11rem)",
                    letterSpacing: "-0.055em",
                    lineHeight: 0.88,
                    background: "linear-gradient(160deg, #FFB84D 0%, #FF6A00 28%, #FF2B55 58%, #C2185B 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 20px rgba(255,80,20,.22))",
                  }}
                >
                  SDC
                </div>

                <div className="text-white font-bold mt-2 relative z-10"
                  style={{ fontSize: "clamp(.9rem, 2.2vw, 1.5rem)", letterSpacing: "0.22em" }}>
                  INDIA
                </div>
                <div className="relative z-10 mt-1"
                  style={{ fontSize: "clamp(.5rem,.9vw,.7rem)", letterSpacing: "0.28em", color: "rgba(255,255,255,.32)",
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  STUDENT DEVELOPERS COMMUNITY
                </div>
              </motion.div>
            </div>

            {/* ── Crowd silhouettes at bottom (same SVG as HTML splash) ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
              className="absolute bottom-0 left-0 right-0"
            >
              <svg viewBox="0 0 1440 220" xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMax slice" style={{ width: "100%", display: "block" }}>
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(12,2,0,0.65)"/>
                    <stop offset="100%" stopColor="rgba(8,1,0,0.92)"/>
                  </linearGradient>
                </defs>
                <g fill="url(#cg)">
                  <ellipse cx="38"   cy="152" rx="20" ry="22"/><path d="M18,165 Q16,190 16,220 L60,220 Q60,190 58,165 Q50,160 38,158 Q26,160 18,165"/>
                  <ellipse cx="106"  cy="136" rx="22" ry="24"/><path d="M84,148 Q82,185 82,220 L130,220 Q130,185 128,148 Q120,142 106,140 Q92,142 84,148"/>
                  <path d="M84,152 Q68,138 54,118 Q70,130 84,152" fill="url(#cg)"/>
                  <ellipse cx="172"  cy="155" rx="19" ry="21"/><path d="M153,167 Q151,190 151,220 L193,220 Q193,190 191,167 Q184,162 172,160 Q160,162 153,167"/>
                  <ellipse cx="238"  cy="140" rx="21" ry="23"/><path d="M217,152 Q215,185 215,220 L261,220 Q261,185 259,152 Q251,146 238,144 Q225,146 217,152"/>
                  <path d="M217,155 Q200,138 186,115 Q202,130 217,155" fill="url(#cg)"/>
                  <path d="M259,155 Q276,136 290,113 Q275,130 259,155" fill="url(#cg)"/>
                  <ellipse cx="306"  cy="158" rx="18" ry="20"/><path d="M288,170 Q286,190 286,220 L324,220 Q324,190 322,170 Q315,165 306,163 Q297,165 288,170"/>
                  <ellipse cx="368"  cy="143" rx="22" ry="24"/><path d="M346,155 Q344,185 344,220 L390,220 Q390,185 388,155 Q380,149 368,147 Q356,149 346,155"/>
                  <path d="M388,160 Q404,142 420,118 Q404,135 388,160" fill="url(#cg)"/>
                  <ellipse cx="436"  cy="150" rx="20" ry="22"/><path d="M416,162 Q414,185 414,220 L458,220 Q458,185 456,162 Q448,157 436,155 Q424,157 416,162"/>
                  <ellipse cx="504"  cy="128" rx="24" ry="26"/><path d="M480,140 Q478,185 478,220 L530,220 Q530,185 528,140 Q520,134 504,132 Q488,134 480,140"/>
                  <ellipse cx="574"  cy="145" rx="21" ry="23"/><path d="M553,157 Q551,185 551,220 L597,220 Q597,185 595,157 Q587,151 574,149 Q561,151 553,157"/>
                  <path d="M553,162 Q536,144 520,122 Q538,140 553,162" fill="url(#cg)"/>
                  <path d="M595,162 Q612,143 626,120 Q610,140 595,162" fill="url(#cg)"/>
                  <ellipse cx="640"  cy="153" rx="19" ry="21"/><path d="M621,165 Q619,190 619,220 L661,220 Q661,190 659,165 Q652,160 640,158 Q628,160 621,165"/>
                  <ellipse cx="706"  cy="138" rx="22" ry="24"/><path d="M684,150 Q682,185 682,220 L728,220 Q728,185 726,150 Q718,144 706,142 Q694,144 684,150"/>
                  <ellipse cx="774"  cy="147" rx="20" ry="22"/><path d="M754,159 Q752,185 752,220 L796,220 Q796,185 794,159 Q786,154 774,152 Q762,154 754,159"/>
                  <path d="M794,164 Q810,146 826,122 Q810,142 794,164" fill="url(#cg)"/>
                  <ellipse cx="842"  cy="155" rx="19" ry="21"/><path d="M823,167 Q821,190 821,220 L863,220 Q863,190 861,167 Q854,162 842,160 Q830,162 823,167"/>
                  <ellipse cx="908"  cy="141" rx="22" ry="23"/><path d="M886,153 Q884,185 884,220 L930,220 Q930,185 928,153 Q920,147 908,145 Q896,147 886,153"/>
                  <path d="M886,158 Q869,140 854,116 Q870,135 886,158" fill="url(#cg)"/>
                  <ellipse cx="974"  cy="149" rx="20" ry="22"/><path d="M954,161 Q952,185 952,220 L996,220 Q996,185 994,161 Q986,156 974,154 Q962,156 954,161"/>
                  <ellipse cx="1042" cy="131" rx="23" ry="25"/><path d="M1019,143 Q1017,185 1017,220 L1067,220 Q1067,185 1065,143 Q1057,137 1042,135 Q1027,137 1019,143"/>
                  <path d="M1019,149 Q1002,130 986,106 Q1004,127 1019,149" fill="url(#cg)"/>
                  <path d="M1065,149 Q1082,130 1096,107 Q1080,128 1065,149" fill="url(#cg)"/>
                  <ellipse cx="1110" cy="152" rx="19" ry="21"/><path d="M1091,164 Q1089,190 1089,220 L1131,220 Q1131,190 1129,164 Q1122,159 1110,157 Q1098,159 1091,164"/>
                  <ellipse cx="1176" cy="142" rx="21" ry="23"/><path d="M1155,154 Q1153,185 1153,220 L1197,220 Q1197,185 1195,154 Q1187,148 1176,146 Q1165,148 1155,154"/>
                  <path d="M1195,160 Q1212,141 1228,117 Q1212,138 1195,160" fill="url(#cg)"/>
                  <ellipse cx="1244" cy="156" rx="19" ry="21"/><path d="M1225,168 Q1223,190 1223,220 L1265,220 Q1265,190 1263,168 Q1256,163 1244,161 Q1232,163 1225,168"/>
                  <ellipse cx="1310" cy="140" rx="22" ry="24"/><path d="M1288,152 Q1286,185 1286,220 L1332,220 Q1332,185 1330,152 Q1322,146 1310,144 Q1298,146 1288,152"/>
                  <path d="M1288,158 Q1270,140 1255,115 Q1272,134 1288,158" fill="url(#cg)"/>
                  <ellipse cx="1378" cy="150" rx="20" ry="22"/><path d="M1358,162 Q1356,185 1356,220 L1400,220 Q1400,185 1400,162 Q1392,157 1378,155 Q1366,157 1358,162"/>
                  <rect x="0" y="195" width="1440" height="25" fill="rgba(10,2,0,0.9)"/>
                </g>
              </svg>
            </motion.div>

            {/* ── Progress bar ── */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-52 text-center z-10"
            >
              <div className="h-px rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,.1)" }}>
                <div className="h-full rounded-full" style={{
                  background: "linear-gradient(90deg, #f97316, #ff3d6e)",
                  width: `${progress}%`,
                  transition: "width .05s linear",
                }} />
              </div>
              <div className="mt-2 tracking-[0.22em]"
                style={{ fontSize: ".6rem", color: "rgba(255,255,255,.22)",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                LOADING
              </div>
            </motion.div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
