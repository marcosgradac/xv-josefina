import React, { useState, useEffect, useRef, memo } from 'react';
import { Box, Button } from '@mui/material';
import { EVENT } from '../config/event';

type CountdownIconName = 'calendar' | 'clock' | 'hourglass' | 'stopwatch';

function CountdownIcon({ name }: { name: CountdownIconName }) {
  const common = {
    width: 34,
    height: 34,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  if (name === 'calendar') {
    return <svg {...common}><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M7.5 3v4M16.5 3v4M3.5 9h17M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" /></svg>;
  }
  if (name === 'clock') {
    return <svg {...common}><circle cx="12" cy="12.5" r="8.5" /><path d="M12 7.5v5l3.5 2M9 2.5h6" /></svg>;
  }
  if (name === 'hourglass') {
    return <svg {...common}><path d="M6 3h12M6 21h12M7 3c0 4 1.8 6 5 9-3.2 3-5 5-5 9M17 3c0 4-1.8 6-5 9 3.2 3 5 5 5 9M9 17h6" /></svg>;
  }
  return <svg {...common}><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 1.5M9 2h6M12 2v3M18 6l1.5-1.5" /></svg>;
}

import './CountdownSection.css';

type Remaining = { d:number; h:number; m:number; s:number };
function remaining():Remaining {
  const diff=Math.max(0,new Date(EVENT.eventDate).getTime()-Date.now());
  const seconds=Number.isFinite(diff)?Math.floor(diff/1000):0;
  return {d:Math.floor(seconds/86400),h:Math.floor(seconds/3600)%24,m:Math.floor(seconds/60)%60,s:seconds%60};
}
const FlipUnit=memo(function FlipUnit({value,label,icon}:{value:number;label:string;icon:CountdownIconName}) {
  const [frame,setFrame]=useState({value,previous:value});
  if(value!==frame.value) setFrame({value,previous:frame.value});
  const current=String(value).padStart(2,'0');
  const old=String(frame.previous).padStart(2,'0');
  const changed=frame.previous!==value;
  return <div className="chrono-unit" aria-label={`${value} ${label}`}>
    <span className="chrono-icon"><CountdownIcon name={icon}/></span>
    <div className="chrono-digits" aria-hidden="true" key={value}>
      <span className="chrono-half chrono-top"><span>{current}</span></span>
      <span className="chrono-half chrono-bottom"><span>{current}</span></span>
      {changed&&<><span className="chrono-half chrono-bottom chrono-old-bottom"><span>{old}</span></span><span className="chrono-half chrono-top chrono-flip-top"><span>{old}</span></span><span className="chrono-half chrono-bottom chrono-flip-bottom"><span>{current}</span></span><span className="chrono-change-light"/></>}
    </div>
    <p className="chrono-unit-label">{label}</p>
  </div>;
});
const ClockFace=memo(function ClockFace(){
  return <svg className="chrono-face" viewBox="0 0 400 400" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id="chrono-metal" x1="30" y1="10" x2="360" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="#c9a35e"/><stop offset=".28" stopColor="#ecd39f"/><stop offset=".53" stopColor="#c9a35e" stopOpacity=".45"/><stop offset=".78" stopColor="#ecd39f"/><stop offset="1" stopColor="#c9a35e"/></linearGradient></defs>
    <circle cx="200" cy="200" r="190" stroke="url(#chrono-metal)" strokeWidth="1.1"/><circle cx="200" cy="200" r="182" stroke="#c9a35e" strokeOpacity=".4" strokeWidth=".6"/><circle cx="200" cy="200" r="159" stroke="#c9a35e" strokeOpacity=".25" strokeWidth=".5"/>
    {Array.from({length:60},(_,i)=><path key={i} className={i%5===0?'chrono-mark':''} style={{animationDelay:`${-i*.7}s`}} d={`M200 ${i%5===0?25:22}v${i%5===0?8:4}`} transform={`rotate(${i*6} 200 200)`} stroke="#ecd39f" strokeWidth={i%5===0?1:.5} strokeOpacity={i%5===0?.7:.3}/>) }
    <g className="chrono-roman" fill="#ecd39f" textAnchor="middle" dominantBaseline="middle"><text x="200" y="49">XII</text><text x="352" y="202">III</text><text x="200" y="354">VI</text><text x="48" y="202">IX</text></g>
    <circle className="chrono-orbit-light" cx="200" cy="200" r="190" pathLength="100" stroke="#fbf3e5" strokeWidth="1.8" strokeDasharray=".3 99.7"/>
    <ellipse className="chrono-orbit" cx="200" cy="200" rx="198" ry="173" stroke="#c9a35e" strokeWidth=".5" strokeOpacity=".32"/>
    <ellipse className="chrono-orbit chrono-orbit-second" cx="200" cy="200" rx="196" ry="179" stroke="#ecd39f" strokeWidth=".4" strokeOpacity=".18"/>
  </svg>;
});
export default function CountdownSection({ref,onScrollTo}:{ref:React.Ref<HTMLDivElement>;onScrollTo:(id:string)=>void}) {
  const [timeLeft,setTimeLeft]=useState<Remaining>(remaining);
  const content=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    let timer:number|undefined;
    const tick=()=>{const next=remaining();setTimeLeft(next);if(!Object.values(next).some(Boolean)&&timer!==undefined)window.clearInterval(timer);};
    if(new Date(EVENT.eventDate).getTime()>Date.now())timer=window.setInterval(tick,1000);
    tick();return()=>{if(timer!==undefined)window.clearInterval(timer);};
  },[]);
  useEffect(()=>{const el=content.current;if(!el||!('IntersectionObserver' in window))return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){el.classList.add('chrono-visible');observer.disconnect();}},{threshold:.08});el.classList.add('chrono-ready');observer.observe(el);return()=>observer.disconnect();},[]);
  return <Box ref={ref} component="section" id="countdown" className="luxury-chronometer" aria-labelledby="chrono-title">
    <div className="chrono-particles" aria-hidden="true">{Array.from({length:22},(_,i)=><span key={i} style={{left:`${(i*37+8)%97}%`,top:`${(i*29+6)%96}%`,animationDelay:`${-i*1.4}s`,animationDuration:`${6+i%7}s`}}>{i%5===0?'✦':'·'}</span>)}</div>
    <div className="chrono-content" ref={content}>
      <header className="chrono-header"><svg className="chrono-emblem" viewBox="0 0 150 70" fill="none" aria-hidden="true"><path d="M28 52A47 47 0 0 1 122 52" stroke="#c9a35e" strokeWidth="1.3" strokeDasharray="1 7"/><path d="M75 13q3 20 22 23-19 3-22 23-3-20-22-23 19-3 22-23Z" stroke="#ecd39f"/><path d="m75 28 7 8-7 8-7-8Z" fill="#c9a35e"/></svg><p className="chrono-eyebrow">Ya falta menos</p><h2 id="chrono-title">La cuenta<br/>regresiva</h2><p className="chrono-subtitle">¡Cada día está más cerca!</p><div className="chrono-divider" aria-hidden="true"><span/>✧<span/></div></header>
      <div className="chrono-clock"><ClockFace/><div className="chrono-grid" role="group" aria-label="Tiempo restante para la fiesta"><FlipUnit value={timeLeft.d} label="Días" icon="calendar"/><FlipUnit value={timeLeft.h} label="Horas" icon="clock"/><FlipUnit value={timeLeft.m} label="Minutos" icon="hourglass"/><FlipUnit value={timeLeft.s} label="Segundos" icon="stopwatch"/></div></div>
      <Button className="chrono-button" onClick={()=>onScrollTo('details')}><CountdownIcon name="calendar"/>Ver detalles<span aria-hidden="true">→</span></Button>
      <div className="chrono-divider chrono-footer" aria-hidden="true"><span/>✦<span/></div>
    </div>
    <svg className="chrono-trail" viewBox="0 0 500 100" fill="none" aria-hidden="true"><path d="M-20 95C160-40 280 150 520 0" stroke="#c9a35e" strokeDasharray="1 10"/><path className="chrono-trail-light" pathLength="100" d="M-20 95C160-40 280 150 520 0" stroke="#ecd39f" strokeDasharray=".3 3 .3 96.4"/></svg>
  </Box>;
}
