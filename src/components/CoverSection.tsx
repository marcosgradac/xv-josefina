import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Button } from '@mui/material';
import { EVENT } from '../config/event';
import './CoverSection.css';

function WelcomeEnvelope(){
  return <svg className="welcome-envelope" viewBox="0 0 220 115" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id="welcome-envelope-gold" x1="62" y1="20" x2="160" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#c9a35e"/><stop offset=".45" stopColor="#ecd39f"/><stop offset="1" stopColor="#c9a35e"/></linearGradient><linearGradient id="welcome-envelope-fill" x1="70" y1="35" x2="145" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#ecd39f" stopOpacity=".12"/><stop offset="1" stopColor="#c9a35e" stopOpacity=".02"/></linearGradient></defs>
    <g stroke="url(#welcome-envelope-gold)" strokeWidth=".9"><path d="M12 69c18 10 18-12 35-7m126 0c17-5 17 17 35 7M26 78h19m130 0h19" strokeOpacity=".65"/><rect x="52" y="25" width="116" height="70" rx="3" fill="url(#welcome-envelope-fill)"/><path d="m52 95 44-32m72 32-44-32M57 90h106" strokeOpacity=".6"/><path className="welcome-flap" d="m52 26 58 43 58-43Z" fill="#10100f"/><circle className="welcome-seal" cx="110" cy="66" r="12" fill="#10100f"/><circle cx="110" cy="66" r="9" strokeOpacity=".5"/><path className="welcome-seal-star" d="M110 59q1 6 7 7-6 1-7 7-1-6-7-7 6-1 7-7Z" fill="#ecd39f" stroke="none"/>
    <path className="welcome-envelope-glint" pathLength="100" d="M52 25h116v70H52Z" stroke="#fbf3e5" strokeDasharray="3 97"/>
    </g>
  </svg>;
}
export default function CoverSection({onOpen}:{onOpen:()=>void}) {
  const [opening,setOpening]=useState(false);
  const started=useRef(false);
  const completed=useRef(false);
  const timer=useRef<number|undefined>(undefined);
  useEffect(()=>()=>window.clearTimeout(timer.current),[]);
  const finish=()=>{if(completed.current)return;completed.current=true;window.clearTimeout(timer.current);onOpen();};
  const open=()=>{if(started.current)return;started.current=true;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return;}setOpening(true);timer.current=window.setTimeout(finish,700);};
  return <main className={`welcome-cover${opening?' welcome-opening':''}`} aria-labelledby="welcome-title" onAnimationEnd={event=>{if(event.target===event.currentTarget&&event.animationName==='welcome-exit')finish();}}>
    <div className="welcome-particles" aria-hidden="true">{Array.from({length:26},(_,i)=><span key={i} className={i%6===0?'welcome-star':''} style={{left:`${(i*37+6)%97}%`,top:`${(i*23+8)%96}%`,'--welcome-duration':`${7+i%7}s`,'--welcome-delay':`${-i*1.37}s`} as CSSProperties}>{i%6===0?'✦':''}</span>)}</div>
    <div className="welcome-silk welcome-silk-top" aria-hidden="true"><img src="/assets/images/hero-silk.svg" alt=""/><span/></div><div className="welcome-silk welcome-silk-bottom" aria-hidden="true"><img src="/assets/images/hero-silk.svg" alt=""/><span/></div>
    <svg className="welcome-frame" preserveAspectRatio="none" viewBox="0 0 400 850" fill="none" aria-hidden="true"><rect className="welcome-frame-draw" x="1" y="1" width="398" height="848" rx="20" stroke="#c9a35e" strokeOpacity=".6" strokeWidth=".8" pathLength="100"/><path d="M12 58V23q0-12 12-12h41m270 0h41q12 0 12 12v35M12 792v35q0 12 12 12h41m270 0h41q12 0 12-12v-35" stroke="#ecd39f" strokeOpacity=".7" strokeWidth=".7"/><path className="welcome-frame-light" pathLength="100" d="M1 20Q1 1 20 1h360q19 0 19 19v810q0 19-19 19H20Q1 849 1 830Z" stroke="#ecd39f" strokeWidth="1" strokeDasharray="2 98"/></svg>
    <div className="welcome-content">
      <div className="welcome-envelope-entry"><WelcomeEnvelope/></div>
      <p className="welcome-eyebrow">{EVENT.coverEyebrow}</p>
      <div className="welcome-rule" aria-hidden="true"><span/>✦<span/></div>
      <p className="welcome-kicker">{EVENT.coverKicker}</p>
      <h1 className="welcome-monogram" id="welcome-title">{EVENT.coverTitle}</h1>
      <p className="welcome-name">{EVENT.names}</p>
      <p className="welcome-message">{EVENT.coverMessage}</p>
      <p className="welcome-date">{EVENT.eventDateLabel}</p>
      <Button className="welcome-open" variant="outlined" onClick={open} aria-busy={opening}>Abrir mi invitación</Button>
    </div>
  </main>;
}
