import { useState, useMemo, useRef, useEffect } from "react";
import {
  Radar, AlertTriangle, X, ChevronRight, ChevronLeft, TrendingDown, TrendingUp,
  Users, CreditCard, LifeBuoy, Send, Pencil, Check,
  Building2, MessageSquare, SlidersHorizontal, Globe, ShieldAlert,
  Search, Bell, Sparkles, ArrowUpRight, ArrowDownRight, Wrench,
  UserCheck, HeadphonesIcon, Clock, Eye, Gift, Repeat, AlertOctagon
} from "lucide-react";

/* ================================================================== */
/* All styles live here — no Tailwind, no config, nothing to break.    */
/* ================================================================== */

const CSS = `
:root{
  --bg:#f3f4f7; --bg-tint:#eef0f5; --card:#ffffff;
  --border:rgba(0,0,0,0.05); --border-md:rgba(0,0,0,0.08); --border-lt:rgba(0,0,0,0.04);
  --ink:#0a0c10; --ink-2:#2b3040; --ink-3:#5c6479; --ink-4:#8890a3;
  --accent:#5b3df0; --accent-d:#4526d6; --accent-bg:#efecff; --accent-bd:#d9d1ff;
  --red:#ef4444; --red-d:#b91c1c; --red-bg:#fef2f2; --red-bd:#fecaca;
  --orange:#f97316; --orange-d:#c2410c; --orange-bg:#fff7ed; --orange-bd:#fed7aa;
  --amber:#f59e0b; --amber-d:#b45309; --amber-bg:#fffbeb; --amber-bd:#fde68a;
  --green:#0ea672; --green-d:#04724f; --green-bg:#e9fbf3; --green-bd:#9fe8c9;
  --r-sm:8px; --r-md:12px; --r-lg:16px; --r-xl:20px;

  --sh-xs:0 1px 1px rgba(10,12,16,.03), 0 1px 2px rgba(10,12,16,.04);
  --sh-sm:0 1px 2px rgba(10,12,16,.04), 0 3px 6px rgba(10,12,16,.05), 0 8px 16px -4px rgba(10,12,16,.05);
  --sh-md:0 2px 4px rgba(10,12,16,.04), 0 8px 16px rgba(10,12,16,.07), 0 16px 32px -8px rgba(10,12,16,.08);
  --sh-lg:0 4px 8px rgba(10,12,16,.06), 0 16px 32px rgba(10,12,16,.10), 0 32px 64px -12px rgba(10,12,16,.18);
  --sh-focus:0 0 0 3px rgba(91,61,240,.22);
}
*{box-sizing:border-box;margin:0;padding:0}
html{background:var(--bg)}
body{
  font-family:"Inter var",Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  background:
    radial-gradient(1100px circle at 12% -8%, rgba(91,61,240,.045), transparent 55%),
    radial-gradient(900px circle at 100% 0%, rgba(14,166,114,.035), transparent 50%),
    linear-gradient(180deg, var(--bg-tint) 0%, var(--bg) 340px);
  color:var(--ink);-webkit-font-smoothing:antialiased;
  font-feature-settings:"cv11","ss01","tnum";
}
button{font-family:inherit;cursor:pointer;border:none;background:none}
input,textarea{font-family:inherit}
.tnum{font-variant-numeric:tabular-nums}
button:focus-visible,input:focus-visible,textarea:focus-visible,[tabindex]:focus-visible{
  outline:none;box-shadow:var(--sh-focus);border-radius:var(--r-sm);
}
@media (prefers-reduced-motion:reduce){*{animation-duration:.001ms !important;transition-duration:.001ms !important}}

::-webkit-scrollbar{width:8px;height:8px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(10,12,16,.14);border-radius:99px;border:2px solid transparent;background-clip:padding-box}
::-webkit-scrollbar-thumb:hover{background:rgba(10,12,16,.24);background-clip:padding-box}
*{scrollbar-width:thin;scrollbar-color:rgba(10,12,16,.16) transparent}

.app{min-height:100vh}

.topbar{background:rgba(255,255,255,.86);backdrop-filter:saturate(200%) blur(14px);-webkit-backdrop-filter:saturate(200%) blur(14px);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:30}
.topbar-in{max-width:1180px;margin:0 auto;padding:0 24px;height:60px;display:flex;align-items:center;gap:20px}
.brand{display:flex;align-items:center;gap:9px;font-weight:700;letter-spacing:-.02em;font-size:15px}
.brand-mark{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#5b3df0,#8b5cf6);display:flex;align-items:center;justify-content:center;color:#fff;flex:none;box-shadow:var(--sh-xs), 0 2px 8px rgba(91,61,240,.35)}
.switcher{margin-left:8px;display:flex;background:#eef0f4;border-radius:10px;padding:3px;font-size:13.5px}
.switcher button{padding:6.5px 14px;border-radius:8px;color:var(--ink-3);font-weight:500;transition:background .18s ease,color .18s ease}
.switcher button.on{background:var(--card);color:var(--ink);font-weight:600;box-shadow:var(--sh-xs)}
.switcher button:hover:not(.on){color:var(--ink-2)}

.navsearch{margin-left:auto;display:flex;align-items:center;gap:7px;background:#eef0f4;border:1px solid transparent;border-radius:9px;padding:7px 11px;width:240px;color:var(--ink-4);transition:border-color .18s ease,background .18s ease}
.navsearch:focus-within{background:var(--card);border-color:var(--border-md);box-shadow:var(--sh-xs)}
.navsearch input{background:transparent;border:none;font-size:13px;color:var(--ink-2);width:100%}
.navsearch input::placeholder{color:var(--ink-4)}
.navsearch input:focus-visible{box-shadow:none}
.navkbd{font-size:10.5px;color:var(--ink-4);border:1px solid var(--border-md);border-radius:4px;padding:1px 5px;flex:none}

.navicon{position:relative;width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;color:var(--ink-3);transition:background .18s ease,color .18s ease}
.navicon:hover{background:#eef0f4;color:var(--ink-2)}
.navdot{position:absolute;top:7px;right:7px;width:7px;height:7px;border-radius:99px;background:var(--red);border:2px solid var(--card)}
.navavatar{width:32px;height:32px;border-radius:99px;background:linear-gradient(135deg,#0d1321,#33394a);color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;flex:none;box-shadow:var(--sh-xs)}

.main{max-width:1180px;margin:0 auto;padding:28px 24px 48px}

.claude{
  border-radius:var(--r-xl);padding:22px 26px;margin-bottom:22px;position:relative;overflow:hidden;
  background:linear-gradient(135deg,#0d1321 0%,#1c2340 55%,#312a63 100%);
  color:#fff;box-shadow:var(--sh-lg);
}
.claude::before{
  content:"";position:absolute;inset:0;
  background:radial-gradient(600px circle at 88% -10%, rgba(124,58,237,.35), transparent 55%),
             radial-gradient(400px circle at 10% 120%, rgba(79,70,229,.30), transparent 60%);
  pointer-events:none;
}
.claude-head{display:flex;align-items:center;gap:10px;position:relative}
.claude-badge{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);padding:4px 10px 4px 8px;border-radius:99px;font-size:12px;font-weight:700;letter-spacing:.02em;text-transform:uppercase}
.claude-live{width:6px;height:6px;border-radius:99px;background:#34d399;box-shadow:0 0 0 3px rgba(52,211,153,.25);animation:pulse-dot 2s ease-in-out infinite}
@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.4}}
.claude-time{margin-left:auto;font-size:12px;color:rgba(255,255,255,.55);position:relative}
.claude-body{position:relative;margin-top:14px;font-size:15px;line-height:1.65;color:rgba(255,255,255,.92);max-width:760px;letter-spacing:-.005em}
.claude-body b{color:#fff;font-weight:600}
.claude-body .hi{color:#a5b4fc;font-weight:600}
.claude-body .rec{color:#6ee7b7;font-weight:600}
.claude-stats{position:relative;display:flex;gap:28px;margin-top:18px;padding-top:16px;border-top:1px solid rgba(255,255,255,.12);flex-wrap:wrap}
.claude-stat{display:flex;flex-direction:column;padding-bottom:1px}
.claude-stat .l{font-size:11px;color:rgba(255,255,255,.55);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;font-weight:600}
.claude-stat .v{font-size:19px;font-weight:700;letter-spacing:-.02em}

.sumgrid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:14px;margin-bottom:24px;align-items:stretch}
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--r-lg);transition:box-shadow .2s ease,border-color .2s ease,transform .2s ease}

.kpi-hero{
  padding:22px 24px;position:relative;overflow:hidden;display:flex;flex-direction:column;height:100%;
  background:linear-gradient(175deg,#ffffff 0%,#fcfcff 100%);
  box-shadow:var(--sh-sm);
}
.kpi-hero:hover{box-shadow:var(--sh-md)}
.kpi-hero-top{display:flex;align-items:flex-start;justify-content:space-between}
.kpi-hero-label{font-size:15px;font-weight:600;color:var(--ink-2);display:flex;align-items:center;gap:7px;letter-spacing:-.005em}
.kpi-hero-icon{width:30px;height:30px;border-radius:9px;background:var(--red-bg);color:var(--red-d);display:flex;align-items:center;justify-content:center;flex:none;box-shadow:inset 0 0 0 1px rgba(239,68,68,.08)}
.kpi-hero-val{font-size:40px;font-weight:750;letter-spacing:-.03em;margin-top:10px;line-height:1;color:var(--ink)}
.kpi-hero-row{display:flex;align-items:flex-end;justify-content:space-between;margin-top:14px;gap:16px}
.trend{display:inline-flex;align-items:center;gap:3px;font-size:12px;font-weight:700;letter-spacing:.01em;padding:3px 8px 3px 6px;border-radius:99px}
.trend.up-bad{background:var(--red-bg);color:var(--red-d)}
.trend.up-good{background:var(--green-bg);color:var(--green-d)}
.trend.down-good{background:var(--green-bg);color:var(--green-d)}
.trend.down-bad{background:var(--red-bg);color:var(--red-d)}
.kpi-hero-note{font-size:12px;color:var(--ink-4);margin-top:auto;padding-top:14px}
.kpi-compare{font-size:11.5px;color:var(--ink-4);margin-top:3px}

.sumcard{padding:18px 20px;display:flex;flex-direction:column;height:100%;box-shadow:var(--sh-xs)}
.sumcard:hover{box-shadow:var(--sh-sm);transform:translateY(-1px)}
.sumlabel{font-size:15px;color:var(--ink-2);display:flex;align-items:center;gap:7px;font-weight:600;letter-spacing:-.005em}
.summid{flex:1;display:flex;flex-direction:column;justify-content:center;padding:10px 0}
.sumval{font-size:27px;font-weight:700;letter-spacing:-.02em;color:var(--ink)}
.sumnote{font-size:11.5px;color:var(--ink-4);margin-top:6px;display:flex;align-items:center;gap:4px}
.sumnote.red{color:#dc2626}
.sumfoot{margin-top:auto;padding-top:14px;font-size:11.5px;color:var(--ink-4);line-height:1.3}

.spark{display:block;margin-top:2px}

.dot{width:8px;height:8px;border-radius:99px;display:inline-block;flex:none}
.dot.sm{width:6px;height:6px}
.d-green{background:var(--green)} .d-amber{background:var(--amber)}
.d-orange{background:var(--orange)} .d-red{background:var(--red)}

.tabs{display:flex;gap:2px;border-bottom:1px solid var(--border);margin-bottom:18px}
.tabs-top{margin-top:20px;margin-bottom:20px}
.tabs button{padding:9px 16px;font-size:13.5px;font-weight:500;color:var(--ink-3);border-bottom:2px solid transparent;margin-bottom:-1px;transition:color .18s ease,border-color .18s ease}
.tabs button.on{color:var(--ink);font-weight:650;border-bottom-color:var(--accent)}
.tabs button:hover:not(.on){color:var(--ink-2)}

.tablewrap{overflow:hidden;box-shadow:var(--sh-sm)}
.tablehead{padding:15px 20px;border-bottom:1px solid var(--border-lt);display:flex;align-items:baseline;gap:8px}
.h-sm{font-size:14.5px;font-weight:650;letter-spacing:-.01em}
.sub{font-size:12px;color:var(--ink-4)}
.tablescroll{max-height:640px;overflow-y:auto}
table{width:100%;border-collapse:collapse;font-size:13.5px}
thead th{position:sticky;top:0;background:#fbfbfd;z-index:1}
th{text-align:left;font-size:11px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.06em;padding:11px 20px;border-bottom:1px solid var(--border-md)}
th.r,td.r{text-align:right}
td{padding:15px 20px;border-bottom:1px solid var(--border-lt);vertical-align:top}
tbody tr{cursor:pointer;transition:background .2s ease,box-shadow .2s ease}
tbody tr:hover{background:rgba(91,61,240,.035)}
tbody tr:last-child td{border-bottom:none}
.acctrow{display:flex;align-items:center;gap:10px}
.avatar-sm{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex:none;letter-spacing:-.01em;box-shadow:var(--sh-xs)}
.acct{font-weight:600;color:var(--ink);letter-spacing:-.005em}
.rowtag{display:inline-flex;align-items:center;gap:4px;font-size:11px;margin-top:3px;font-weight:600}
.rowtag.warn{color:var(--orange-d)}
.rowtag.crit{color:var(--red-d);font-weight:700}
.dim{color:var(--ink-3)}
.action-cell{font-size:12.5px;color:var(--ink-2);max-width:210px;display:flex;align-items:flex-start;gap:7px;line-height:1.45}
.action-icon{width:20px;height:20px;border-radius:6px;background:var(--accent-bg);color:var(--accent-d);display:flex;align-items:center;justify-content:center;flex:none;margin-top:1px}
.risk-cell{display:flex;align-items:center;justify-content:flex-end;gap:8px}
.risk-bar{width:36px;height:4px;border-radius:99px;background:var(--border-lt);overflow:hidden}
.risk-bar-fill{height:100%;border-radius:99px;transition:width .3s ease}

.badge{display:inline-flex;align-items:center;gap:5px;padding:3.5px 10px;border-radius:99px;border:1px solid;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;white-space:nowrap}
.b-green{background:var(--green-bg);border-color:var(--green-bd);color:var(--green-d)}
.b-amber{background:var(--amber-bg);border-color:var(--amber-bd);color:var(--amber-d)}
.b-orange{background:var(--orange-bg);border-color:var(--orange-bd);color:var(--orange-d)}
.b-red{background:var(--red-bg);border-color:var(--red-bd);color:var(--red-d)}

@keyframes rowpulse{0%,100%{background:transparent;box-shadow:inset 3px 0 0 transparent}50%{background:var(--red-bg);box-shadow:inset 3px 0 0 var(--red)}}
.row-pulse{animation:rowpulse 1.2s ease-in-out 4}

.skel{background:linear-gradient(90deg,#edeef2 25%,#f6f7fa 37%,#edeef2 63%);background-size:400% 100%;animation:skel 1.4s ease infinite;border-radius:6px}
@keyframes skel{0%{background-position:100% 0}100%{background-position:0 0}}

.overlay{position:fixed;inset:0;background:rgba(10,12,16,.4);z-index:40;animation:fadein .2s ease-out;backdrop-filter:blur(2px)}
@keyframes fadein{from{opacity:0}to{opacity:1}}
.panel{position:fixed;top:0;right:0;height:100%;width:100%;max-width:680px;background:var(--bg-tint);z-index:50;box-shadow:var(--sh-lg);overflow-y:auto;animation:slidein .28s cubic-bezier(.16,1,.3,1)}
@keyframes slidein{from{transform:translateX(28px);opacity:0}to{transform:translateX(0);opacity:1}}
.panelhead{position:sticky;top:0;background:rgba(255,255,255,.9);backdrop-filter:blur(10px);border-bottom:1px solid var(--border);padding:16px 24px;display:flex;align-items:center;gap:12px;z-index:10}
.panelhead h3{font-size:16px;font-weight:700;letter-spacing:-.015em}
.panelbody{padding:22px 24px 32px;display:flex;flex-direction:column;gap:16px}
.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.kpi{padding:14px 16px;box-shadow:var(--sh-xs)}
.kpi .lbl{font-size:12px;color:var(--ink-3);font-weight:600}
.kpi .val{font-size:22px;font-weight:700;margin-top:4px;letter-spacing:-.02em}
.kpi .val small{font-size:13px;font-weight:400;color:var(--ink-4)}
.section{padding:18px 20px;box-shadow:var(--sh-xs)}
.section h4{font-size:14.5px;font-weight:650;letter-spacing:-.01em}
.section .note{font-size:12px;color:var(--ink-4);margin:2px 0 14px}
.iconbtn{padding:7px;border-radius:8px;display:flex;transition:background .18s ease}
.iconbtn:hover{background:#eef0f4}

.shaprow{display:flex;align-items:flex-start;gap:14px;margin-bottom:12px}
.shaplbl{width:200px;font-size:12.5px;color:var(--ink-2);white-space:normal;overflow-wrap:break-word;line-height:1.4;flex:none;padding-top:3px}
.shaptrack{flex:1;display:flex;align-items:center;height:16px;margin-top:3px;min-width:0}
.shapmid{width:1px;height:16px;background:var(--border-md);flex:none}
.shapneg,.shappos{height:8px;transition:width .4s cubic-bezier(.16,1,.3,1)}
.shapneg{background:linear-gradient(90deg,#6ee7b7,#10b981);border-radius:4px 0 0 4px;margin-left:auto}
.shappos{background:linear-gradient(90deg,#f87171,#ef4444);border-radius:0 4px 4px 0}
.shaphalf{width:50%;display:flex}
.shapval{width:40px;text-align:right;font-size:12px;font-weight:700;flex:none;padding-top:3px}
.shapval.pos{color:#dc2626}.shapval.neg{color:#059669}
.shaplegend{display:flex;justify-content:space-between;font-size:10px;color:var(--ink-4);margin-top:8px;padding-left:214px}
@media (max-width:640px){
  .shaprow{flex-wrap:wrap}
  .shaplbl{width:100%;padding-top:0}
  .shaptrack{width:100%;margin-top:6px}
  .shaplegend{padding-left:0}
}

.usagerow{margin-bottom:12px}
.usagetop{display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:5px}
.track{height:8px;background:var(--border-lt);border-radius:99px;overflow:hidden}
.fill{height:100%;border-radius:99px;transition:width .5s cubic-bezier(.16,1,.3,1)}
.f-dark{background:linear-gradient(90deg,#33394a,#0d1321)}.f-mid{background:#a4abbd}.f-warn{background:linear-gradient(90deg,#fb923c,#f97316)}

.diag{font-size:14px;color:var(--ink-2);line-height:1.65}
.divider{border-top:1px solid var(--border-lt);margin-top:14px;padding-top:14px}
.minih{font-size:11.5px;font-weight:700;color:var(--ink-3);margin-bottom:5px;text-transform:uppercase;letter-spacing:.06em}
.body-sm{font-size:14px;color:var(--ink-2);line-height:1.55}

.simgrid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:16px}
.simlbl{display:flex;justify-content:space-between;font-size:12.5px;color:var(--ink-3);margin-bottom:6px;font-weight:500}
input[type=range]{width:100%;accent-color:var(--accent);height:4px}
.segs{display:flex;gap:4px}
.seg{flex:1;font-size:12.5px;padding:7px 8px;border-radius:8px;border:1px solid var(--border-md);color:var(--ink-3);text-transform:capitalize;background:var(--card);transition:all .18s ease;font-weight:500}
.seg.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.seg:hover:not(.on){border-color:var(--ink-4)}
.chips{display:flex;gap:8px;margin-bottom:16px}
.chip{font-size:12.5px;padding:7px 12px;border-radius:8px;border:1px solid var(--border-md);color:var(--ink-3);background:var(--card);transition:all .18s ease;font-weight:500}
.chip.on{background:var(--accent);color:#fff;border-color:var(--accent)}
.chip:hover:not(.on){border-color:var(--ink-4)}
.simout{display:flex;align-items:center;gap:24px;border-top:1px solid var(--border-lt);padding-top:14px}
.strike{font-size:14px;color:var(--ink-4);text-decoration:line-through}
.bignum{font-size:27px;font-weight:700;letter-spacing:-.02em}
.delta{display:inline-flex;align-items:center;gap:2px;font-size:12px;font-weight:700;color:var(--green-d)}
.simcost{margin-left:auto;text-align:right}

.emailbox{font-size:14px;color:var(--ink-2);white-space:pre-wrap;line-height:1.65;background:#f9fafc;border:1px solid var(--border-lt);border-radius:10px;padding:14px}
textarea.emailedit{width:100%;height:200px;font-size:14px;color:var(--ink-2);border:1px solid var(--border-md);border-radius:10px;padding:14px;line-height:1.65;resize:vertical}
textarea.emailedit:focus-visible{border-color:var(--accent)}
.btnrow{display:flex;gap:8px;margin-top:14px}
.btn{display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:600;padding:9px 15px;border-radius:9px;transition:background .18s ease,transform .1s ease,box-shadow .18s ease}
.btn:active{transform:scale(.97)}
.btn-dark{background:var(--ink);color:#fff;box-shadow:var(--sh-xs)}
.btn-dark:hover{background:#262c3c}
.btn-line{border:1px solid var(--border-md);color:var(--ink-2)}
.btn-line:hover{border-color:var(--ink-3);background:#f9fafc}
.sentmsg{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:700;color:var(--green-d)}

.execgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.distbar{display:flex;height:12px;border-radius:6px;overflow:hidden;margin-top:14px}
.distbar > div{transition:width .5s cubic-bezier(.16,1,.3,1)}
.legend{display:flex;gap:22px;margin-top:12px;flex-wrap:wrap}
.legend span{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;color:var(--ink-2);font-weight:500}
.rc-card{padding:18px;display:flex;flex-direction:column;box-shadow:var(--sh-xs)}
.rc-card:hover{box-shadow:var(--sh-sm)}
.rc-head{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}
.rc-detail{font-size:12.5px;color:var(--ink-3);line-height:1.6;margin-top:5px;flex:1}
.rc-nums{display:flex;gap:26px;margin-top:14px}
.rc-num .n{font-size:19px;font-weight:700;letter-spacing:-.02em}
.rc-num .n.red{color:var(--red-d)}
.rc-num .l{font-size:11px;color:var(--ink-4);font-weight:600;text-transform:uppercase;letter-spacing:.03em}
.rc-fix{border-top:1px solid var(--border-lt);margin-top:14px;padding-top:12px}
.rc-fix .l{font-size:11px;color:var(--ink-4);font-weight:600;text-transform:uppercase;letter-spacing:.03em}
.rc-fix .f{font-size:12.5px;font-weight:650;color:var(--ink-2);margin-top:4px}
.rc-fix .m{font-size:11px;color:var(--ink-4);margin-top:7px}

.angrid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.metgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.met{border:1px solid var(--border-md);border-radius:10px;padding:14px;transition:border-color .18s ease,box-shadow .18s ease}
.met:hover{border-color:var(--ink-4);box-shadow:var(--sh-xs)}
.met .l{font-size:12px;color:var(--ink-3);font-weight:500}
.met .v{font-size:21px;font-weight:700;letter-spacing:-.02em}
.met .n{font-size:11px;color:var(--ink-4);margin-top:3px}
.modelcard dl{font-size:12.5px}
.modelcard .row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border-lt)}
.modelcard .row:last-child{border-bottom:none}
.modelcard dt{color:var(--ink-3);font-weight:500}
.modelcard dd{color:var(--ink-2);font-weight:650}

.custwrap{max-width:640px;margin:0 auto}
.custhead{padding:22px 24px;border-bottom:1px solid var(--border-lt)}
.custhead .ws{font-size:12px;color:var(--ink-4);font-weight:700;text-transform:uppercase;letter-spacing:.05em}
.custhead h2{font-size:18px;font-weight:700;margin-top:4px;letter-spacing:-.015em}
.custbody{padding:22px 24px;display:flex;flex-direction:column;gap:22px}
.planrow{display:flex;justify-content:space-between;align-items:flex-start}
.plan-n{font-size:14.5px;font-weight:650}
.plan-s{font-size:12.5px;color:var(--ink-3);margin-top:3px}
.price{font-size:19px;font-weight:700;text-align:right;letter-spacing:-.02em}
.price small{font-size:13px;font-weight:400;color:var(--ink-4)}
.pnote{font-size:12px;color:var(--ink-3);margin-top:2px}
.custkpis{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.ckpi{border:1px solid var(--border-md);border-radius:10px;padding:14px}
.ckpi .l{font-size:12px;color:var(--ink-3);display:flex;align-items:center;gap:6px;font-weight:500}
.ckpi .v{font-size:18px;font-weight:700;margin-top:5px;letter-spacing:-.015em}
.ckpi .v small{font-size:13px;font-weight:400;color:var(--ink-4)}
.cancelrow{border-top:1px solid var(--border-lt);padding-top:18px;display:flex;justify-content:space-between;align-items:center}
.cancelbtn{font-size:13.5px;font-weight:600;color:var(--ink-3);border:1px solid var(--border-md);border-radius:9px;padding:8px 15px;transition:all .18s ease}
.cancelbtn:hover{border-color:#fca5a5;color:#dc2626;background:#fef2f2}
.notice{border-radius:10px;padding:13px 16px;font-size:14px;font-weight:500;display:flex;align-items:center;gap:8px}
.notice.ok{border:1px solid var(--green-bd);background:var(--green-bg);color:#065f46}
.notice.bad{border:1px solid var(--red-bd);background:var(--red-bg);color:#991b1b}

.modalwrap{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;padding:16px}
.modal{position:relative;z-index:2;background:var(--card);border-radius:var(--r-lg);box-shadow:var(--sh-lg);width:100%;max-width:520px;display:flex;flex-direction:column;max-height:85vh;animation:modalin .22s cubic-bezier(.16,1,.3,1)}
@keyframes modalin{from{transform:scale(.97) translateY(6px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
.chathead{padding:15px 20px;border-bottom:1px solid var(--border-lt);display:flex;align-items:center;gap:12px}
.avatar{width:34px;height:34px;border-radius:99px;background:linear-gradient(135deg,#5b3df0,#8b5cf6);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;box-shadow:var(--sh-xs)}
.chathead .n{font-size:14px;font-weight:650}
.chathead .s{font-size:12px;color:var(--green-d);display:flex;align-items:center;gap:5px;font-weight:500}
.chatlog{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:10px;min-height:220px}
.msg{max-width:85%;border-radius:14px;padding:10px 14px;font-size:14px;line-height:1.55;animation:msgin .2s ease-out}
@keyframes msgin{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
.msg.ai{background:#eef0f4;color:var(--ink-2);align-self:flex-start;border-bottom-left-radius:4px}
.msg.me{background:var(--ink);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
.msg.typing{color:var(--ink-4)}
.quickrow{padding:0 20px 10px;display:flex;flex-wrap:wrap;gap:6px}
.quick{font-size:12px;font-weight:500;border:1px solid var(--border-md);color:var(--ink-3);border-radius:99px;padding:6px 12px;background:var(--card);transition:all .18s ease}
.quick:hover{border-color:var(--ink-4);background:#f9fafc}
.quick:disabled{opacity:.5;cursor:default}
.chatinput{padding:8px 20px 18px}
.inputrow{display:flex;gap:8px}
.inputrow input{flex:1;border:1px solid var(--border-md);border-radius:11px;padding:10px 13px;font-size:14px}
.inputrow input:focus-visible{border-color:var(--accent)}
.sendbtn{background:var(--ink);color:#fff;border-radius:11px;padding:0 15px;display:flex;align-items:center;transition:background .18s ease,transform .1s ease}
.sendbtn:hover{background:#262c3c}
.sendbtn:active{transform:scale(.94)}
.sendbtn:disabled{opacity:.4;cursor:default}
.decision{display:flex;gap:8px;margin-top:14px}
.decision button{flex:1;font-size:14px;font-weight:650;border-radius:11px;padding:10px 0;transition:transform .1s ease,box-shadow .18s ease,background .18s ease,color .18s ease,border-color .18s ease}
.decision button:active{transform:scale(.97)}
.staybtn{background:#059669;color:#fff}
.staybtn:hover{background:#047857}
.leavebtn{border:1px solid var(--border-md);color:var(--ink-3)}
.leavebtn:hover{border-color:#fca5a5;color:#dc2626}
.canceldestbtn{background:var(--red);color:#fff}
.canceldestbtn:hover{background:var(--red-d)}

.stepbody{padding:18px 20px 20px;display:flex;flex-direction:column}
.stepintro{font-size:13.5px;color:var(--ink-3);line-height:1.55;margin-bottom:16px}
.backlink{display:inline-flex;align-items:center;gap:3px;font-size:12.5px;font-weight:600;color:var(--ink-3);margin-bottom:14px;align-self:flex-start;padding:4px 6px 4px 2px;border-radius:6px;transition:background .18s ease,color .18s ease}
.backlink:hover{background:#eef0f4;color:var(--ink-2)}

.reasongrid{display:flex;flex-direction:column;gap:8px}
.reasoncard{display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:1px solid var(--border-md);border-radius:12px;padding:13px 14px;background:var(--card);transition:border-color .18s ease,box-shadow .18s ease,transform .1s ease}
.reasoncard:hover{border-color:var(--accent-bd);box-shadow:var(--sh-sm);transform:translateY(-1px)}
.reasoncard:active{transform:scale(.99)}
.reasonicon{width:34px;height:34px;border-radius:9px;background:var(--accent-bg);color:var(--accent-d);display:flex;align-items:center;justify-content:center;flex:none}
.reasontext{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0}
.reasontext .rt{font-size:14px;font-weight:650;color:var(--ink);letter-spacing:-.005em}
.reasontext .rs{font-size:12px;color:var(--ink-4)}
.reasonchev{flex:none;color:#c7cbd6}
.skiplink{margin:16px auto 0;font-size:12.5px;color:var(--ink-4);text-decoration:underline;text-underline-offset:2px;transition:color .18s ease}
.skiplink:hover{color:var(--ink-3)}

.offercard{border:1px solid var(--accent-bd);background:linear-gradient(175deg,var(--accent-bg),#ffffff);border-radius:14px;padding:18px}
.offer-icon{width:34px;height:34px;border-radius:9px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(91,61,240,.3)}
.offer-title{font-size:15.5px;font-weight:700;color:var(--ink);margin-top:12px;letter-spacing:-.01em}
.offer-price{font-size:22px;font-weight:750;color:var(--accent-d);margin-top:4px;letter-spacing:-.02em}
.offer-note{font-size:12.5px;color:var(--ink-3);margin-top:2px}
.offerlist{list-style:none;margin-top:14px;padding-top:14px;border-top:1px solid rgba(91,61,240,.14);display:flex;flex-direction:column;gap:8px}
.offerlist li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:var(--ink-2);line-height:1.5}
.offerlist li svg{flex:none;margin-top:2px;color:var(--green-d)}

.confirmbox{border:1px solid var(--red-bd);background:var(--red-bg);border-radius:14px;padding:18px}
.confirm-icon{width:34px;height:34px;border-radius:9px;background:#fff;color:var(--red-d);display:flex;align-items:center;justify-content:center;border:1px solid var(--red-bd)}
.confirm-title{font-size:15.5px;font-weight:700;color:var(--red-d);margin-top:12px;letter-spacing:-.01em}
.confirm-body{font-size:13px;color:var(--ink-2);margin-top:6px;line-height:1.5}
.confirmbox .offerlist{border-top-color:rgba(239,68,68,.18)}
.confirmbox .offerlist li svg{color:var(--red-d)}

.toast{position:fixed;top:72px;right:24px;z-index:60;animation:toastin .3s cubic-bezier(.16,1,.3,1)}
@keyframes toastin{from{transform:translateY(-10px) scale(.98);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
.toastbtn{background:var(--ink);color:#fff;border-radius:14px;box-shadow:var(--sh-lg);padding:13px 16px;display:flex;align-items:flex-start;gap:12px;text-align:left;max-width:380px;transition:background .18s ease}
.toastbtn:hover{background:#1a2033}
.toastbtn .t{font-size:14px;font-weight:650;letter-spacing:-.005em}
.toastbtn .s{font-size:12px;color:#b7bdd0;margin-top:3px}

@media (max-width:860px){
  .sumgrid{grid-template-columns:repeat(2,1fr)}
  .execgrid,.angrid,.simgrid{grid-template-columns:1fr}
  .shaplbl{width:140px}.shaplegend{padding-left:152px}
  .navsearch{display:none}
  .claude-stats{gap:18px}
}
`;

/* ================================================================== */
/* Mock data — portfolio of 142 accounts; table shows top 10.          */
/* ================================================================== */

const DAY = 86400000;
const today = new Date();
const inDays = (n) => new Date(today.getTime() + n * DAY)
  .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const INITIAL_ACCOUNTS = [
  {
    id: "meridian", name: "Meridian Health Co.", plan: "Growth", mrr: 4200, renewalDays: 27,
    risk: 62, tier: "At Risk", dmInactive: true, seats: 45, activeSeats: 28, tickets: 3, tenure: "26 mo",
    shap: [
      { factor: "Decision-maker logins down 78% (60 days)", impact: 24 },
      { factor: "Premium feature adoption at 18%", impact: 19 },
      { factor: "3 unresolved support tickets", impact: 11 },
      { factor: "Renewal within 30 days", impact: 8 },
      { factor: "External signal: layoffs at customer", impact: 6 },
      { factor: "Payments on time (26 months)", impact: -9 },
    ],
    dmUsage: 12, staffUsage: 88,
    diagnosis: "Meridian is paying for a 45-seat Growth plan but only 28 seats are active, and the two account admins who signed the contract haven't logged in for 9 weeks. Usage is carried by junior staff on basic features. This is an under-utilization churn pattern, compounded by recent layoffs on their side.",
    restructure: "Move to Growth-30 (30 seats) at $2,940/mo and include a 2-session admin re-onboarding. Retains the account at lower MRR instead of losing $4,200 outright.",
    email: "Hi Dana,\n\nI was reviewing Meridian's workspace and noticed your team is actively using 28 of your 45 seats, mostly on the core modules. I'd hate for you to keep paying for capacity you don't need.\n\nI'd like to propose moving you to our 30-seat plan — about 30% lower cost — and I'll personally run two short onboarding sessions for your admin team so you get full value from the features you already own.\n\nWould Thursday work for a quick call?\n\nBest,\nAlex — Customer Success",
    action: "Right-size plan + admin re-onboarding",
  },
  {
    id: "northwind", name: "Northwind Logistics", plan: "Enterprise", mrr: 8900, renewalDays: 15,
    risk: 88, tier: "Critical", dmInactive: false, seats: 120, activeSeats: 61, tickets: 7, tenure: "14 mo",
    shap: [
      { factor: "7 open tickets, negative sentiment", impact: 27 },
      { factor: "Competitor mentioned in NPS response", impact: 22 },
      { factor: "Login frequency down 54%", impact: 15 },
      { factor: "Renewal within 15 days", impact: 12 },
      { factor: "High historical usage depth", impact: -7 },
    ],
    dmUsage: 34, staffUsage: 66,
    diagnosis: "Northwind has a support-experience problem, not a product-fit problem. Seven open tickets — three about the same routing bug — and their ops director referenced a competitor in last week's NPS comment. Renewal is in 15 days.",
    restructure: "No plan change. Escalate the routing bug to engineering with a 72-hour SLA, assign a named senior support engineer, and offer one month of service credit as goodwill.",
    email: "Hi Marcus,\n\nYou've raised the routing issue three times and that's three times too many. I've escalated it directly to our engineering lead with a 72-hour commitment, and I've assigned Priya — our most senior support engineer — as your named contact from today.\n\nI'd also like to apply a full month of service credit to your account. You shouldn't pay full price for a month like this one.\n\nCan we talk tomorrow so I can walk you through the fix timeline?\n\nAlex — Customer Success",
    action: "Escalate support + senior engineer + credit",
  },
  {
    id: "atlas", name: "Atlas Manufacturing", plan: "Enterprise", mrr: 12400, renewalDays: 22,
    risk: 84, tier: "Critical", dmInactive: true, seats: 200, activeSeats: 112, tickets: 2, tenure: "31 mo",
    shap: [
      { factor: "VP sponsor left company (external signal)", impact: 26 },
      { factor: "Decision-maker logins near zero (45 days)", impact: 21 },
      { factor: "Seat utilization at 56%", impact: 13 },
      { factor: "Renewal within 30 days", impact: 9 },
      { factor: "Long tenure, on-time payments", impact: -11 },
    ],
    dmUsage: 4, staffUsage: 96,
    diagnosis: "Atlas looks busy — 112 active seats — but the executive sponsor who championed the purchase left in May, and no replacement decision-maker has logged in since. Day-to-day usage is healthy; buying-committee engagement is zero. A classic hidden-risk account.",
    restructure: "No pricing change. Run an executive re-engagement play: schedule a business review with the new VP Ops, present a usage ROI report, and secure a new internal champion before the renewal conversation.",
    email: "Hi Elena,\n\nCongratulations on stepping into the VP Operations role. Your team has been one of our most active — 112 people used the platform last month — and I'd love to give you a 25-minute overview of what they're getting out of it, plus where I think there's untapped value.\n\nWould early next week suit you?\n\nAlex — Customer Success",
    action: "Executive re-engagement + ROI review",
  },
  {
    id: "cobalt", name: "Cobalt Analytics", plan: "Growth", mrr: 6100, renewalDays: 45,
    risk: 67, tier: "At Risk", dmInactive: false, seats: 60, activeSeats: 52, tickets: 1, tenure: "9 mo",
    shap: [
      { factor: "Hit plan API limits 4x this month", impact: 20 },
      { factor: "2 feature requests unanswered", impact: 14 },
      { factor: "Usage velocity down 12% (14 days)", impact: 10 },
      { factor: "High seat utilization (87%)", impact: -8 },
    ],
    dmUsage: 41, staffUsage: 59,
    diagnosis: "Cobalt is bumping against Growth-plan API limits weekly and has two open feature requests. Frustration risk from friction, not disengagement — they may be evaluating tools that don't throttle them.",
    restructure: "Offer a 30-day Enterprise trial (uncapped API) with a locked-in 10% first-year discount if they convert before renewal.",
    email: "Hi Sam,\n\nI noticed your team hit the Growth plan's API ceiling four times this month — that friction is on us, not you.\n\nI'd like to unlock a 30-day Enterprise trial (no API caps) so your pipeline runs clean, and if it fits, I can hold a 10% first-year discount for you through your renewal date.\n\nInterested?\n\nAlex — Customer Success",
    action: "Enterprise trial + conversion discount",
  },
  {
    id: "harbor", name: "Harbor & Lane Legal", plan: "Standard", mrr: 3800, renewalDays: 34,
    risk: 58, tier: "At Risk", dmInactive: true, seats: 25, activeSeats: 19, tickets: 2, tenure: "17 mo",
    shap: [
      { factor: "Managing partner inactive 51 days", impact: 18 },
      { factor: "Fiscal year-end in 6 weeks (external signal)", impact: 12 },
      { factor: "2 billing-related tickets", impact: 9 },
      { factor: "Stable staff usage", impact: -6 },
    ],
    dmUsage: 9, staffUsage: 91,
    diagnosis: "Harbor & Lane's staff use the product daily, but the managing partner who approves renewals hasn't logged in for 51 days — and their fiscal year-end (a budget-cut window) lands two weeks before renewal.",
    restructure: "Offer early renewal at the current price locked for 12 months if signed before their fiscal year-end, removing the budget-review risk window.",
    email: "Hi Patricia,\n\nWith your fiscal year-end coming up, I wanted to make budgeting simple: if we renew before the end of the quarter, I can lock your current rate for a full 12 months — no increase.\n\nYour team logged 340 hours in the platform last quarter, so I'd love to keep that momentum going without a procurement scramble.\n\nShall I send the paperwork?\n\nAlex — Customer Success",
    action: "Early renewal + 12-mo price lock",
  },
  {
    id: "orchard", name: "Orchard Supply Co.", plan: "Standard", mrr: 1900, renewalDays: 62,
    risk: 44, tier: "Monitor", dmInactive: false, seats: 15, activeSeats: 11, tickets: 1, tenure: "7 mo",
    shap: [
      { factor: "Onboarding incomplete (3 of 6 modules)", impact: 15 },
      { factor: "Login recency slipping", impact: 9 },
      { factor: "No payment issues", impact: -7 },
    ],
    dmUsage: 38, staffUsage: 62,
    diagnosis: "Orchard never finished onboarding — half the setup modules are untouched, which caps the value they can see.",
    restructure: "No plan change. Trigger a guided onboarding sequence and a 30-minute setup call.",
    email: "Hi Jordan,\n\nI noticed a few setup steps are still open on your workspace — finishing them usually doubles the value teams get in the first quarter.\n\nCan I grab 30 minutes this week to walk your team through it?\n\nAlex — Customer Success",
    action: "Guided onboarding sequence",
  },
  {
    id: "pinewood", name: "Pinewood Media", plan: "Growth", mrr: 2400, renewalDays: 77,
    risk: 41, tier: "Monitor", dmInactive: false, seats: 20, activeSeats: 16, tickets: 0, tenure: "12 mo",
    shap: [
      { factor: "Usage velocity down 9% (14 days)", impact: 11 },
      { factor: "Seasonal usage pattern detected", impact: 8 },
      { factor: "Healthy ticket history", impact: -6 },
    ],
    dmUsage: 44, staffUsage: 56,
    diagnosis: "Mild usage dip consistent with their summer production lull last year. Watch, don't intervene yet.",
    restructure: "No action. Re-check usage velocity in 14 days.",
    email: "",
    action: "Watch — re-check in 14 days",
  },
  {
    id: "veritas", name: "Veritas Financial", plan: "Enterprise", mrr: 5600, renewalDays: 118,
    risk: 36, tier: "Monitor", dmInactive: false, seats: 80, activeSeats: 63, tickets: 1, tenure: "22 mo",
    shap: [
      { factor: "New compliance module unadopted", impact: 10 },
      { factor: "Strong decision-maker engagement", impact: -9 },
      { factor: "On-time payments", impact: -8 },
    ],
    dmUsage: 52, staffUsage: 48,
    diagnosis: "Stable account. The unadopted compliance module is a value-expansion conversation, not a risk.",
    restructure: "Introduce the compliance module in the next quarterly review.",
    email: "",
    action: "QBR: introduce compliance module",
  },
  {
    id: "summit", name: "Summit Ridge Retail", plan: "Enterprise", mrr: 7200, renewalDays: 136,
    risk: 12, tier: "Healthy", dmInactive: false, seats: 95, activeSeats: 89, tickets: 0, tenure: "38 mo",
    shap: [
      { factor: "94% seat utilization", impact: -14 },
      { factor: "Approaching plan storage limit", impact: 6 },
      { factor: "Positive NPS trend", impact: -8 },
    ],
    dmUsage: 49, staffUsage: 51,
    diagnosis: "Healthy and near plan limits — an expansion opportunity, est. +$1,400/mo on the next tier.",
    restructure: "Upsell: next storage tier, est. +$1,400 MRR.",
    email: "",
    action: "Upsell: +$1,400 MRR est.",
  },
  {
    id: "bluepeak", name: "Bluepeak Software", plan: "Standard", mrr: 3100, renewalDays: 174,
    risk: 9, tier: "Healthy", dmInactive: false, seats: 22, activeSeats: 21, tickets: 0, tenure: "29 mo",
    shap: [
      { factor: "Daily active usage across all seats", impact: -13 },
      { factor: "Referred two new customers", impact: -7 },
    ],
    dmUsage: 55, staffUsage: 45,
    diagnosis: "Model customer. Candidate for case study and referral program.",
    restructure: "Invite to advocacy program.",
    email: "",
    action: "Invite to advocacy program",
  },
];

const ROOT_CAUSES = [
  {
    cause: "Plan / packaging mismatch",
    detail: "Accounts paying for tiers or seat counts far above real usage — churn driven by perceived overpayment, not product dissatisfaction.",
    accounts: 23, mrr: 186400,
    fix: "Introduce a mid-tier plan and automated right-sizing offers",
    members: "Meridian Health, Harbor & Lane, +21 more",
  },
  {
    cause: "Decision-maker disengagement",
    detail: "Overall usage looks healthy, but the people who sign renewals have gone quiet. Invisible to standard usage dashboards.",
    accounts: 11, mrr: 74200,
    fix: "Executive re-engagement play + ROI reports to sponsors",
    members: "Atlas Manufacturing, Meridian Health, +9 more",
  },
  {
    cause: "Support escalation backlog",
    detail: "Repeat tickets on the same defects with slow resolution — accounts explicitly referencing competitors in feedback.",
    accounts: 9, mrr: 52800,
    fix: "72-hour SLA on repeat-defect tickets + named senior engineer",
    members: "Northwind Logistics, +8 more",
  },
  {
    cause: "External business disruption",
    detail: "Layoffs, sponsor departures, or fiscal year-end budget cuts at the customer — external signals, not product signals.",
    accounts: 6, mrr: 38100,
    fix: "Early-renewal price locks + new-champion outreach",
    members: "Atlas Manufacturing, Harbor & Lane, +4 more",
  },
];

const GLOBAL_SHAP = [
  { factor: "Product usage depth", weight: 34 },
  { factor: "Login recency", weight: 22 },
  { factor: "Payment behavior", weight: 16 },
  { factor: "Support ticket sentiment", weight: 12 },
  { factor: "Decision-maker activity", weight: 9 },
  { factor: "External context signals", weight: 7 },
];

const MODEL_METRICS = [
  { label: "AUC-ROC", value: "0.91", note: "vs 0.71 rules-only baseline" },
  { label: "Precision", value: "0.84", note: "flagged accounts that truly churn" },
  { label: "Recall", value: "0.79", note: "churners caught before cancel" },
  { label: "F1 score", value: "0.81", note: "balance of the two" },
];

const MRR_TREND = [298, 305, 292, 310, 318, 302, 315, 330, 322, 338, 345, 336, 351.5];

/* ================================================================== */
/* Helpers                                                             */
/* ================================================================== */

const TIER_CLASS = { Healthy: "green", Monitor: "amber", "At Risk": "orange", Critical: "red" };
const fmtMoney = (n) => "$" + Math.round(n).toLocaleString("en-US");
const priorityScore = (a) => {
  const urgency = Math.max(0.2, 1 - a.renewalDays / 200);
  return (a.risk / 100) * a.mrr * urgency;
};

const AVATAR_PALETTE = [
  ["#5b3df0", "#8b5cf6"], ["#0891b2", "#0e7490"], ["#dc2626", "#b91c1c"],
  ["#d97706", "#b45309"], ["#059669", "#047857"], ["#4338ca", "#312e81"],
  ["#be185d", "#9d174d"], ["#0d9488", "#0f766e"], ["#7c3aed", "#5b21b6"],
  ["#ea580c", "#c2410c"],
];
function hashStr(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
function initials(name) {
  const parts = name.replace(/&/g, " ").split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}
function CompanyAvatar({ name, size = 32 }) {
  const [c1, c2] = AVATAR_PALETTE[hashStr(name) % AVATAR_PALETTE.length];
  return (
    <div
      className="avatar-sm"
      style={{ width: size, height: size, fontSize: size * 0.37, background: `linear-gradient(135deg, ${c1}, ${c2})` }}
    >
      {initials(name)}
    </div>
  );
}

const ACTION_ICON_RULES = [
  [/urgent/i, ShieldAlert],
  [/escalate|senior engineer/i, HeadphonesIcon],
  [/executive|roi review/i, UserCheck],
  [/right-size|price lock|renewal/i, Repeat],
  [/trial|discount|upsell/i, Gift],
  [/onboarding/i, Wrench],
  [/watch|re-check/i, Eye],
  [/qbr/i, Clock],
  [/advocacy/i, Sparkles],
];
function actionIconFor(action) {
  for (const [re, Icon] of ACTION_ICON_RULES) if (re.test(action)) return Icon;
  return Wrench;
}

function TierBadge({ tier }) {
  const c = TIER_CLASS[tier];
  return (
    <span className={`badge b-${c}`}>
      <span className={`dot sm d-${c}`} />
      {tier}
    </span>
  );
}

function useCountUp(target, { duration = 700, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);
  const startRef = useRef(null);
  useEffect(() => {
    startRef.current = null;
    let raf;
    const step = (ts) => {
      if (startRef.current === null) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = target * eased;
      setValue(decimals ? +v.toFixed(decimals) : Math.round(v));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return value;
}

function Sparkline({ data, width = 108, height = 32, color = "#dc2626" }) {
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / span) * (height - 4) - 2;
    return [x, y];
  });
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` Q ${x0},${y0} ${mx},${(y0 + y1) / 2}`;
  }
  d += ` T ${pts[pts.length - 1][0]},${pts[pts.length - 1][1]}`;
  const areaId = "sparkfill";
  const last = pts[pts.length - 1];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="spark">
      <defs>
        <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L ${width},${height} L 0,${height} Z`} fill={`url(#${areaId})`} stroke="none" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}

/* ================================================================== */
/* Contract Simulator                                                  */
/* ================================================================== */

function ContractSimulator({ account }) {
  const [discount, setDiscount] = useState(0);
  const [support, setSupport] = useState("standard");
  const [training, setTraining] = useState(false);
  const [rightsize, setRightsize] = useState(false);

  const base = Math.max(4, 100 - account.risk);
  const supportBonus = support === "vip" ? 14 : support === "priority" ? 8 : 0;
  const after = Math.min(96, Math.round(base + discount * 1.1 + supportBonus + (training ? 6 : 0) + (rightsize ? 9 : 0)));
  const delta = after - base;
  const costOfOffer = Math.round(
    account.mrr * (discount / 100) +
    (support === "vip" ? 400 : support === "priority" ? 150 : 0) +
    (training ? 250 : 0)
  );

  return (
    <div className="card section">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <SlidersHorizontal size={16} color="#697086" />
        <h4>Contract Simulator</h4>
        <span className="sub" style={{ marginLeft: "auto" }}>test the offer before you send it</span>
      </div>

      <div className="simgrid">
        <div>
          <div className="simlbl"><span>Discount</span><span className="tnum" style={{ fontWeight: 650, color: "#33394a" }}>{discount}%</span></div>
          <input type="range" min="0" max="30" step="5" value={discount} onChange={(e) => setDiscount(+e.target.value)} />
        </div>
        <div>
          <div className="simlbl"><span>Support tier</span></div>
          <div className="segs">
            {["standard", "priority", "vip"].map((s) => (
              <button key={s} className={`seg ${support === s ? "on" : ""}`} onClick={() => setSupport(s)}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="chips">
        <button className={`chip ${training ? "on" : ""}`} onClick={() => setTraining(!training)}>+ Free onboarding sessions</button>
        <button className={`chip ${rightsize ? "on" : ""}`} onClick={() => setRightsize(!rightsize)}>+ Right-size plan</button>
      </div>

      <div className="simout">
        <div>
          <div className="sub">Retention probability</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="strike tnum">{base}%</span>
            <span className="bignum tnum">{after}%</span>
            {delta > 0 && <span className="delta"><TrendingUp size={12} />+{delta} pts</span>}
          </div>
        </div>
        <div className="simcost">
          <div className="sub">Monthly cost of offer</div>
          <div className="tnum" style={{ fontSize: 14, fontWeight: 650, color: "#33394a" }}>{fmtMoney(costOfOffer)}</div>
          <div className="sub">vs {fmtMoney(account.mrr)} MRR at stake</div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Account Detail Panel                                                */
/* ================================================================== */

function DetailPanel({ account, onClose }) {
  const [email, setEmail] = useState(account.email);
  const [editing, setEditing] = useState(false);
  const [sent, setSent] = useState(false);
  const maxImpact = Math.max(...account.shap.map((s) => Math.abs(s.impact)));

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="panel">
        <div className="panelhead">
          <CompanyAvatar name={account.name} size={36} />
          <div>
            <h3>{account.name}</h3>
            <div className="sub">
              {account.plan} · {fmtMoney(account.mrr)}/mo · renews {inDays(account.renewalDays)} · customer {account.tenure}
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <TierBadge tier={account.tier} />
            <button className="iconbtn" onClick={onClose}><X size={16} color="#697086" /></button>
          </div>
        </div>

        <div className="panelbody">
          <div className="kpis">
            <div className="card kpi">
              <div className="lbl">90-day churn risk</div>
              <div className="val tnum">{account.risk}%</div>
            </div>
            <div className="card kpi">
              <div className="lbl">Seat utilization</div>
              <div className="val tnum">{account.activeSeats}<small>/{account.seats}</small></div>
            </div>
            <div className="card kpi">
              <div className="lbl">Open tickets</div>
              <div className="val tnum">{account.tickets}</div>
            </div>
          </div>

          <div className="card section">
            <h4>Why this score</h4>
            <div className="note">SHAP factor contributions to churn risk</div>
            {account.shap.map((s, i) => (
              <div className="shaprow" key={i}>
                <div className="shaplbl" title={s.factor}>{s.factor}</div>
                <div className="shaptrack">
                  <div className="shaphalf" style={{ justifyContent: "flex-end" }}>
                    {s.impact < 0 && <div className="shapneg" style={{ width: `${(Math.abs(s.impact) / maxImpact) * 100}%` }} />}
                  </div>
                  <div className="shapmid" />
                  <div className="shaphalf">
                    {s.impact > 0 && <div className="shappos" style={{ width: `${(s.impact / maxImpact) * 100}%` }} />}
                  </div>
                </div>
                <div className={`shapval tnum ${s.impact > 0 ? "pos" : "neg"}`}>
                  {s.impact > 0 ? "+" : ""}{s.impact}
                </div>
              </div>
            ))}
            <div className="shaplegend"><span>← lowers risk</span><span>raises risk →</span></div>
          </div>

          <div className="card section">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Users size={16} color="#697086" />
              <h4>Usage by role</h4>
              {account.dmInactive && (
                <span className="badge b-orange" style={{ marginLeft: "auto" }}>
                  <AlertTriangle size={12} /> Decision-makers inactive
                </span>
              )}
            </div>
            <div className="usagerow">
              <div className="usagetop">
                <span style={{ color: "#33394a" }}>Decision-makers</span>
                <span className="tnum" style={{ color: "#697086" }}>{account.dmUsage}% of activity</span>
              </div>
              <div className="track">
                <div className={`fill ${account.dmUsage < 20 ? "f-warn" : "f-dark"}`} style={{ width: `${account.dmUsage}%` }} />
              </div>
            </div>
            <div className="usagerow">
              <div className="usagetop">
                <span style={{ color: "#33394a" }}>Regular staff</span>
                <span className="tnum" style={{ color: "#697086" }}>{account.staffUsage}% of activity</span>
              </div>
              <div className="track">
                <div className="fill f-mid" style={{ width: `${account.staffUsage}%` }} />
              </div>
            </div>
          </div>

          <div className="card section">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Sparkles size={15} color="#5b3df0" />
              <h4 style={{ margin: 0 }}>Retention Claude — diagnosis</h4>
            </div>
            <p className="diag">{account.diagnosis}</p>
            <div className="divider">
              <div className="minih">Recommended restructure</div>
              <p className="body-sm">{account.restructure}</p>
            </div>
          </div>

          <ContractSimulator account={account} />

          {account.email && (
            <div className="card section">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <MessageSquare size={16} color="#697086" />
                <h4>Draft outreach</h4>
                <span className="sub" style={{ marginLeft: "auto" }}>nothing sends without your approval</span>
              </div>
              {editing ? (
                <textarea className="emailedit" value={email} onChange={(e) => setEmail(e.target.value)} />
              ) : (
                <div className="emailbox">{email}</div>
              )}
              <div className="btnrow">
                {sent ? (
                  <span className="sentmsg"><Check size={16} /> Sent — logged to account timeline</span>
                ) : (
                  <>
                    <button className="btn btn-dark" onClick={() => setSent(true)}>
                      <Send size={14} /> Approve & send
                    </button>
                    <button className="btn btn-line" onClick={() => setEditing(!editing)}>
                      <Pencil size={14} /> {editing ? "Done editing" : "Edit first"}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ================================================================== */
/* Internal dashboard tabs                                             */
/* ================================================================== */

function TableSkeletonRows({ n = 6 }) {
  return (
    <>
      {Array.from({ length: n }).map((_, i) => (
        <tr key={i} style={{ cursor: "default" }}>
          <td>
            <div className="acctrow">
              <div className="skel" style={{ width: 32, height: 32, borderRadius: 9 }} />
              <div className="skel" style={{ width: 130, height: 13 }} />
            </div>
          </td>
          <td><div className="skel" style={{ width: 74, height: 20, borderRadius: 99 }} /></td>
          <td className="r"><div className="skel" style={{ width: 56, height: 13, marginLeft: "auto" }} /></td>
          <td className="r"><div className="skel" style={{ width: 40, height: 13, marginLeft: "auto" }} /></td>
          <td><div className="skel" style={{ width: 88, height: 13 }} /></td>
          <td><div className="skel" style={{ width: 150, height: 13 }} /></td>
          <td />
        </tr>
      ))}
    </>
  );
}

function CsmTab({ accounts, onSelect, pulseId }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(t);
  }, []);

  const sorted = useMemo(
    () => [...accounts].sort((a, b) => priorityScore(b) - priorityScore(a)),
    [accounts]
  );
  return (
    <div className="card tablewrap">
      <div className="tablehead">
        <span className="h-sm">Priority queue</span>
        <span className="sub">ranked by churn risk × MRR × renewal proximity — top 10 of 142 accounts</span>
      </div>
      <div className="tablescroll">
        <table>
          <thead>
            <tr>
              <th>Account</th><th>Status</th><th className="r">MRR</th>
              <th className="r">Churn risk</th><th>Renews</th><th>Recommended action</th><th />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <TableSkeletonRows n={7} />
            ) : (
              sorted.map((a) => {
                const ActionIcon = actionIconFor(a.action);
                const riskColor = a.risk >= 75 ? "#ef4444" : a.risk >= 50 ? "#f97316" : a.risk >= 30 ? "#f59e0b" : "#10b981";
                return (
                  <tr key={a.id} onClick={() => onSelect(a)} className={pulseId === a.id ? "row-pulse" : ""}>
                    <td>
                      <div className="acctrow">
                        <CompanyAvatar name={a.name} />
                        <div>
                          <div className="acct">{a.name}</div>
                          {a.dmInactive && (
                            <div className="rowtag warn"><AlertTriangle size={12} /> Decision-makers inactive</div>
                          )}
                          {a.cancelling && (
                            <div className="rowtag crit"><ShieldAlert size={12} /> Cancellation initiated — save offer ready</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td><TierBadge tier={a.tier} /></td>
                    <td className="r tnum" style={{ color: "#33394a", fontWeight: 500 }}>{fmtMoney(a.mrr)}</td>
                    <td className="r">
                      <div className="risk-cell">
                        <div className="risk-bar"><div className="risk-bar-fill" style={{ width: `${a.risk}%`, background: riskColor }} /></div>
                        <span className="tnum" style={{ fontWeight: 650 }}>{a.risk}%</span>
                      </div>
                    </td>
                    <td className="dim" style={{ whiteSpace: "nowrap" }}>{inDays(a.renewalDays)}</td>
                    <td className="action-cell">
                      <span className="action-icon"><ActionIcon size={11} /></span>
                      <span>{a.action}</span>
                    </td>
                    <td><ChevronRight size={16} color="#cbd5e1" /></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExecutiveTab() {
  const portfolio = { Critical: 14, "At Risk": 26, Monitor: 41, Healthy: 61 };
  const total = 142;
  const colors = { Critical: "#ef4444", "At Risk": "#f97316", Monitor: "#f59e0b", Healthy: "#10b981" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="card section">
        <h4>Portfolio health distribution</h4>
        <div className="note">{total} accounts</div>
        <div className="distbar">
          {Object.entries(portfolio).map(([t, n]) => (
            <div key={t} style={{ width: `${(n / total) * 100}%`, background: colors[t] }} />
          ))}
        </div>
        <div className="legend">
          {Object.entries(portfolio).map(([t, n]) => (
            <span key={t}>
              <span className="dot sm" style={{ background: colors[t] }} />
              {t} <span className="tnum" style={{ color: "#9aa1b5" }}>{n}</span>
            </span>
          ))}
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "0 4px 10px" }}>
          <span className="h-sm">Root cause breakdown</span>
          <span className="sub">40 at-risk accounts, grouped by shared cause — fix the pattern, not just the account</span>
        </div>
        <div className="execgrid">
          {ROOT_CAUSES.map((rc, i) => (
            <div className="card rc-card" key={i}>
              <div className="rc-head">
                <h4 style={{ fontSize: 14.5, fontWeight: 650 }}>{rc.cause}</h4>
                {rc.cause === "External business disruption" && <Globe size={16} color="#9aa1b5" />}
              </div>
              <p className="rc-detail">{rc.detail}</p>
              <div className="rc-nums">
                <div className="rc-num">
                  <div className="n tnum">{rc.accounts}</div>
                  <div className="l">accounts</div>
                </div>
                <div className="rc-num">
                  <div className="n red tnum">{fmtMoney(rc.mrr)}</div>
                  <div className="l">MRR exposed</div>
                </div>
              </div>
              <div className="rc-fix">
                <div className="l">One fix covers all {rc.accounts}:</div>
                <div className="f">{rc.fix}</div>
                <div className="m">{rc.members}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalystTab() {
  return (
    <div className="angrid">
      <div className="card section">
        <h4>Global feature importance</h4>
        <div className="note">mean |SHAP| across all 142 accounts</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {GLOBAL_SHAP.map((f, i) => (
            <div key={i}>
              <div className="usagetop">
                <span style={{ color: "#33394a" }}>{f.factor}</span>
                <span className="tnum" style={{ color: "#697086" }}>{f.weight}%</span>
              </div>
              <div className="track">
                <div className="fill f-dark" style={{ width: `${f.weight * 2.6}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="card section">
          <h4 style={{ marginBottom: 14 }}>Model performance</h4>
          <div className="metgrid">
            {MODEL_METRICS.map((m, i) => (
              <div className="met" key={i}>
                <div className="l">{m.label}</div>
                <div className="v tnum">{m.value}</div>
                <div className="n">{m.note}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card section modelcard">
          <h4 style={{ marginBottom: 10 }}>Model card</h4>
          <dl>
            <div className="row"><dt>Algorithm</dt><dd>XGBoost (gradient-boosted trees)</dd></div>
            <div className="row"><dt>Target</dt><dd>Cancellation within 90 days</dd></div>
            <div className="row"><dt>Features</dt><dd>31 (incl. 2 external signals)</dd></div>
            <div className="row"><dt>Retrained</dt><dd>Weekly, rolling 18-mo window</dd></div>
            <div className="row"><dt>Explainability</dt><dd>Per-prediction SHAP values</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Claude summary card                                                */
/* ================================================================== */

function ClaudeSummary({ accounts }) {
  const critical = accounts.filter((a) => a.tier === "Critical");
  const topAccount = [...accounts].sort((a, b) => priorityScore(b) - priorityScore(a))[0];
  const recoverable = accounts
    .filter((a) => a.tier === "Critical" || a.tier === "At Risk")
    .reduce((s, a) => s + a.mrr * 0.65, 0);

  return (
    <div className="claude">
      <div className="claude-head">
        <span className="claude-badge"><span className="claude-live" />Claude summary</span>
        <span className="claude-time">Updated just now</span>
      </div>
      <div className="claude-body">
        <b>{critical.length} accounts</b> need action in the next 7 days.
        The highest-priority case is <span className="hi">{topAccount.name}</span>{" "}
        (${topAccount.mrr.toLocaleString()}/mo, {topAccount.risk}% churn risk, renews {inDays(topAccount.renewalDays)}) —{" "}
        driven mainly by decision-maker disengagement and open support tickets.
        Across the at-risk portfolio, an estimated <b>{fmtMoney(recoverable)}/mo</b> is recoverable with timely intervention.
        Recommended next step: <span className="rec">{topAccount.action.toLowerCase()}</span> for {topAccount.name}, then work down the priority queue.
      </div>
      <div className="claude-stats">
        <div className="claude-stat">
          <div className="l">Needs action</div>
          <div className="v">{critical.length} accounts</div>
        </div>
        <div className="claude-stat">
          <div className="l">Recoverable MRR</div>
          <div className="v">{fmtMoney(recoverable)}</div>
        </div>
        <div className="claude-stat">
          <div className="l">Top priority</div>
          <div className="v">{topAccount.name}</div>
        </div>
        <div className="claude-stat">
          <div className="l">Model confidence</div>
          <div className="v">0.91 AUC</div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Dynamic Negotiator + Customer App                                   */
/* ================================================================== */

const REASONS = [
  {
    key: "expensive",
    icon: CreditCard,
    label: "Too expensive",
    sub: "The plan costs more than we're getting from it",
    offer: {
      title: "Right-size to 30 seats",
      price: "$2,940/mo",
      note: "30% less — you're only using 28 of 45 seats",
      bullets: [
        "Drop from 45 to 30 seats, same features",
        "Save $1,260 every month",
        "All your data and history carries over",
      ],
    },
  },
  {
    key: "value",
    icon: Sparkles,
    label: "Not getting enough value",
    sub: "We're not seeing the ROI we expected",
    offer: {
      title: "Free onboarding + right-sized plan",
      price: "$2,940/mo",
      note: "Two live sessions to unlock features you're not using",
      bullets: [
        "Two 1:1 onboarding sessions, on us",
        "Right-sized to your actual 28-seat usage",
        "Dedicated success check-in at 30 days",
      ],
    },
  },
  {
    key: "support",
    icon: HeadphonesIcon,
    label: "Support has been unresponsive",
    sub: "Open tickets aren't getting resolved fast enough",
    offer: {
      title: "Named senior engineer + SLA",
      price: "1 month credit",
      note: "Priya becomes your dedicated contact today",
      bullets: [
        "72-hour resolution commitment on all 3 open tickets",
        "Named senior engineer as your point of contact",
        "One month of service credit for the trouble",
      ],
    },
  },
];

function NegotiatorModal({ onStay, onCancelAnyway, onClose }) {
  const [step, setStep] = useState("reason"); // reason | offer | confirm
  const [choice, setChoice] = useState(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  const pickReason = (r) => { setChoice(r); setStep("offer"); };

  return (
    <div className="modalwrap">
      <div className="overlay" style={{ position: "absolute", zIndex: 1 }} onClick={onClose} />
      <div className="modal">
        <div className="chathead">
          <div className="avatar">R</div>
          <div>
            <div className="n">Riley — Account Specialist</div>
            <div className="s"><span className="dot sm d-green" /> Online now</div>
          </div>
          <button className="iconbtn" style={{ marginLeft: "auto" }} onClick={onClose}>
            <X size={16} color="#697086" />
          </button>
        </div>

        {step === "reason" && (
          <div className="stepbody">
            <p className="stepintro">Before you go — what's the main reason? We'll put a tailored offer in front of you instantly.</p>
            <div className="reasongrid">
              {REASONS.map((r) => (
                <button key={r.key} className="reasoncard" onClick={() => pickReason(r)}>
                  <span className="reasonicon"><r.icon size={17} /></span>
                  <span className="reasontext">
                    <span className="rt">{r.label}</span>
                    <span className="rs">{r.sub}</span>
                  </span>
                  <ChevronRight size={16} className="reasonchev" />
                </button>
              ))}
            </div>
            <button className="skiplink" onClick={() => setStep("confirm")}>Skip and cancel without an offer</button>
          </div>
        )}

        {step === "offer" && choice && (
          <div className="stepbody">
            <button className="backlink" onClick={() => setStep("reason")}><ChevronLeft size={14} /> Back</button>
            <div className="offercard">
              <div className="offer-icon"><Gift size={18} /></div>
              <div className="offer-title">{choice.offer.title}</div>
              <div className="offer-price tnum">{choice.offer.price}</div>
              <div className="offer-note">{choice.offer.note}</div>
              <ul className="offerlist">
                {choice.offer.bullets.map((b, i) => (
                  <li key={i}><Check size={13} /> {b}</li>
                ))}
              </ul>
            </div>
            <div className="decision">
              <button className="staybtn" onClick={onStay}>Accept offer & stay</button>
              <button className="leavebtn" onClick={() => setStep("confirm")}>Continue to cancel</button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="stepbody">
            <button className="backlink" onClick={() => setStep(choice ? "offer" : "reason")}><ChevronLeft size={14} /> Back</button>
            <div className="confirmbox">
              <div className="confirm-icon"><AlertTriangle size={18} /></div>
              <div className="confirm-title">Cancel your subscription?</div>
              <p className="confirm-body">Your workspace stays active until {inDays(27)}. After that:</p>
              <ul className="offerlist">
                <li><X size={13} /> Access for all 45 seats ends</li>
                <li><X size={13} /> Data is retained for 30 days, then deleted</li>
                <li><X size={13} /> You can resubscribe anytime before then</li>
              </ul>
            </div>
            <div className="decision">
              <button className="leavebtn" onClick={onStay}>Keep my subscription</button>
              <button className="canceldestbtn" onClick={onCancelAnyway}>Cancel subscription</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CustomerApp({ onCancelled, cancelled }) {
  const [showNegotiator, setShowNegotiator] = useState(false);
  const [stayed, setStayed] = useState(false);

  return (
    <div className="custwrap">
      <div className="card" style={{ overflow: "hidden", boxShadow: "var(--sh-sm)" }}>
        <div className="custhead">
          <div className="ws">Meridian Health Co. — workspace settings</div>
          <h2>Subscription & billing</h2>
        </div>
        <div className="custbody">
          <div className="planrow">
            <div>
              <div className="plan-n">Growth plan</div>
              <div className="plan-s">45 seats · billed monthly</div>
            </div>
            <div>
              <div className="price tnum">$4,200<small>/mo</small></div>
              <div className="pnote">next billing {inDays(27)}</div>
            </div>
          </div>

          <div className="custkpis">
            <div className="ckpi">
              <div className="l"><Users size={14} /> Active seats</div>
              <div className="v tnum">28<small>/45</small></div>
            </div>
            <div className="ckpi">
              <div className="l"><LifeBuoy size={14} /> Open tickets</div>
              <div className="v tnum">3</div>
            </div>
            <div className="ckpi">
              <div className="l"><CreditCard size={14} /> Payment</div>
              <div className="v" style={{ fontSize: 14 }}>Visa ·· 4417</div>
            </div>
          </div>

          {stayed ? (
            <div className="notice ok"><Check size={16} /> Your updated plan is confirmed. Thanks for staying with us.</div>
          ) : cancelled ? (
            <div className="notice bad">Your cancellation is confirmed. Your workspace stays active until {inDays(27)}.</div>
          ) : (
            <div className="cancelrow">
              <span className="sub">Need to make a change to your subscription?</span>
              <button className="cancelbtn" onClick={() => setShowNegotiator(true)}>Cancel subscription</button>
            </div>
          )}
        </div>
      </div>

      {showNegotiator && (
        <NegotiatorModal
          onClose={() => setShowNegotiator(false)}
          onStay={() => { setStayed(true); setShowNegotiator(false); }}
          onCancelAnyway={() => { setShowNegotiator(false); onCancelled(); }}
        />
      )}
    </div>
  );
}

/* ================================================================== */
/* Root                                                                */
/* ================================================================== */

export default function App() {
  const [view, setView] = useState("internal");
  const [tab, setTab] = useState("csm");
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [selected, setSelected] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const [pendingToast, setPendingToast] = useState(false);
  const [toast, setToast] = useState(false);
  const [pulseId, setPulseId] = useState(null);

  const counts = {
    Critical: 14 + (cancelled ? 1 : 0),
    "At Risk": cancelled ? 25 : 26,
    Monitor: 41,
  };

  const totalAtRisk = 351500 + (cancelled ? 0 : 0);
  const animatedTotal = useCountUp(totalAtRisk, { duration: 900 });
  const animatedCritical = useCountUp(counts.Critical, { duration: 700 });
  const animatedAtRisk = useCountUp(counts["At Risk"], { duration: 700 });
  const animatedMonitor = useCountUp(counts.Monitor, { duration: 700 });

  const handleCancellation = () => {
    setCancelled(true);
    setAccounts((prev) => prev.map((a) =>
      a.id === "meridian"
        ? { ...a, tier: "Critical", risk: 96, cancelling: true, action: "URGENT: win-back call within 24h" }
        : a
    ));
    setPendingToast(true);
  };

  const switchView = (v) => {
    setView(v);
    if (v === "internal" && pendingToast) {
      setPendingToast(false);
      setToast(true);
      setPulseId("meridian");
      setTab("csm");
      setTimeout(() => setToast(false), 8000);
      setTimeout(() => setPulseId(null), 6000);
    }
  };

  return (
    <div className="app">
      <style>{CSS}</style>

      <header className="topbar">
        <div className="topbar-in">
          <div className="brand">
            <span className="brand-mark"><Radar size={16} /></span>
            ChurnRadar
          </div>
          <div className="switcher">
            <button className={view === "internal" ? "on" : ""} onClick={() => switchView("internal")}>
              Internal Dashboard
            </button>
            <button className={view === "customer" ? "on" : ""} onClick={() => switchView("customer")}>
              Customer App
            </button>
          </div>
          <label className="navsearch">
            <Search size={14} />
            <input placeholder="Search accounts…" />
            <span className="navkbd">⌘K</span>
          </label>
          <button className="navicon" aria-label="Notifications">
            <Bell size={17} />
            <span className="navdot" />
          </button>
          <div className="navavatar">AR</div>
        </div>
      </header>

      {toast && (
        <div className="toast">
          <button className="toastbtn" onClick={() => { setToast(false); setSelected(accounts.find((a) => a.id === "meridian")); }}>
            <ShieldAlert size={20} color="#f87171" style={{ flex: "none", marginTop: 2 }} />
            <div>
              <div className="t">Meridian Health Co. initiated cancellation</div>
              <div className="s">Flagged Critical · Claude has a save offer ready — click to open</div>
            </div>
          </button>
        </div>
      )}

      <main className="main">
        {view === "internal" ? (
          <>
            <ClaudeSummary accounts={accounts} />

            <div className="tabs tabs-top">
              {[["csm", "CSM"], ["executive", "Executive"], ["analyst", "Analyst"]].map(([k, label]) => (
                <button key={k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{label}</button>
              ))}
            </div>

            <div className="sumgrid">
              <div className="card kpi-hero">
                <div className="kpi-hero-top">
                  <span className="kpi-hero-label">Total MRR at risk</span>
                  <span className="kpi-hero-icon"><TrendingDown size={15} /></span>
                </div>
                <div className="kpi-hero-val tnum">${animatedTotal.toLocaleString()}</div>
                <div className="kpi-hero-row">
                  <div>
                    <span className="trend up-bad"><ArrowUpRight size={12} />4.2%</span>
                    <div className="kpi-compare">vs. $337.4k last period</div>
                  </div>
                  <Sparkline data={MRR_TREND} color="#dc2626" />
                </div>
                <div className="kpi-hero-note">40 accounts flagged across Critical and At Risk tiers</div>
              </div>

              <div className="card sumcard">
                <div className="sumlabel"><AlertOctagon size={16} color="#ef4444" /> Critical</div>
                <div className="summid">
                  <div className="sumval tnum">{animatedCritical}</div>
                  <div className="sumnote red"><ArrowUpRight size={12} /> +2 this week</div>
                </div>
                <div className="sumfoot">Renewal &lt; 30 days, high risk</div>
              </div>

              <div className="card sumcard">
                <div className="sumlabel"><AlertTriangle size={16} color="#f97316" /> At Risk</div>
                <div className="summid">
                  <div className="sumval tnum">{animatedAtRisk}</div>
                  <div className="sumnote"><ArrowDownRight size={12} color="#059669" /> −1 this week</div>
                </div>
                <div className="sumfoot">Elevated risk, action recommended</div>
              </div>

              <div className="card sumcard">
                <div className="sumlabel"><ShieldAlert size={16} color="#f59e0b" /> Monitor</div>
                <div className="summid">
                  <div className="sumval tnum">{animatedMonitor}</div>
                  <div className="sumnote">Stable</div>
                </div>
                <div className="sumfoot">Early signals, no action yet</div>
              </div>
            </div>

            {tab === "csm" && <CsmTab accounts={accounts} onSelect={setSelected} pulseId={pulseId} />}
            {tab === "executive" && <ExecutiveTab />}
            {tab === "analyst" && <AnalystTab />}
          </>
        ) : (
          <CustomerApp onCancelled={handleCancellation} cancelled={cancelled} />
        )}
      </main>

      {selected && (
        <DetailPanel
          account={accounts.find((a) => a.id === selected.id) || selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}