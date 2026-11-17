import { useEffect, useRef, type CSSProperties, type Ref } from 'react';
import { Box } from '@mui/material';
import { EVENT } from '../config/event';
import './ItinerarySection.css';

function ArtDecoDivider() {
  return <div className="deco-divider" aria-hidden="true"><span/><b>◇</b><i>✦</i><b>◇</b><span/></div>;
}

function ArtDecoArch() {
  return <svg className="deco-arch" viewBox="0 0 360 145" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id="program-arch-gold" x1="0" y1="120" x2="360" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#c9a35e" stopOpacity=".15"/><stop offset=".5" stopColor="#ecd39f"/><stop offset="1" stopColor="#c9a35e" stopOpacity=".15"/></linearGradient></defs>
    <g stroke="url(#program-arch-gold)" strokeWidth=".8"><path d="M15 126Q180-75 345 126M31 127Q180-51 329 127"/><path d="M47 99v20m42-55v38m41-57v39m50-53v38m50-24v39m41-20v38m42-3v20" strokeOpacity=".65"/></g>
    {[{ x:47,y:122 },{ x:89,y:105 },{ x:130,y:87 },{ x:180,y:73 },{ x:230,y:87 },{ x:271,y:105 },{ x:313,y:122 }].map(({x,y},index)=><g key={x} className="deco-pendant" style={{transformOrigin:`${x}px ${y-30}px`,animationDuration:`${8+index%5}s`,animationDelay:`${-index*1.3}s`}}><path d={`M${x} ${y-5}l3.5 5-3.5 5-3.5-5Z`} stroke="#ecd39f" strokeWidth=".7"/><circle cx={x} cy={y-12} r="1" fill="#c9a35e"/></g>)}
    <path className="deco-arch-light" pathLength="100" d="M15 126Q180-75 345 126" stroke="#fbf3e5" strokeWidth="1.2"/>
    <path className="deco-arch-light deco-arch-light-inner" pathLength="100" d="M31 127Q180-51 329 127" stroke="#ecd39f" strokeWidth=".85"/>
    <path className="deco-arch-star" d="M180 13q2 13 14 15-12 2-14 15-2-13-14-15 12-2 14-15Z" fill="#ecd39f"/>
    <path className="deco-star-flash" d="M180 19v18m-9-9h18" stroke="#fbf3e5" strokeWidth=".65"/>
    <g fill="#ecd39f"><circle cx="75" cy="52" r="1"/><circle cx="288" cy="56" r=".8"/></g>
  </svg>;
}

function TimelineIcon({ name }: { name:string }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {name==='dinner' ? <><path d="M8 5v7m3-7v7M5 5v7c0 5 6 5 6 0M8 16v11M24 27V5c-5 2-7 8-4 13h4"/></> : name==='music' ? <><path d="M13 23V8l13-3v15M13 12l13-3"/><ellipse cx="9" cy="24" rx="4" ry="3"/><ellipse cx="22" cy="21" rx="4" ry="3"/></> : <><circle cx="18" cy="6" r="2"/><path d="m17 9-4 7 7 3 5 8M14 15l-6 2-4-4m12-1 6 1 5-4M13 18c-1 5-4 8-8 10 7 1 13 0 17-4M15 11l-5-3-4 3"/><path d="M11 24c3 1 6 1 9 0" strokeWidth=".7"/></>}
  </svg>;
}

export default function ItinerarySection({ ref }: { ref: Ref<HTMLDivElement> }) {
  const contentRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=contentRef.current;
    if(!el || !('IntersectionObserver' in window)) return;
    const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){el.classList.add('deco-visible');observer.disconnect();}},{threshold:0.08});
    el.classList.add('deco-motion-ready');
    observer.observe(el);
    return ()=>observer.disconnect();
  },[]);
  return <Box ref={ref} id="itinerary" component="section" className="celestial-program" aria-labelledby="program-title">
    <div className="deco-particles" aria-hidden="true">{Array.from({length:18},(_,i)=><span key={i} style={{left:`${(i*37+9)%96}%`,top:`${(i*29+5)%98}%`,'--deco-duration':`${5+i%6}s`,'--deco-delay':`${-i*1.7}s`} as CSSProperties}>{i%4===0?'✦':'·'}</span>)}</div>
    <div ref={contentRef} className="deco-content">
      <header className="deco-header"><ArtDecoArch/><p className="deco-eyebrow">Cada momento será especial</p><h2 id="program-title">Programa del día</h2><ArtDecoDivider/></header>
      <ol className="deco-timeline">
        {EVENT.itinerary.map((item,index)=><li className="deco-event" key={`${item.time}-${item.title}`} style={{'--event-delay':`${350+index*180}ms`} as CSSProperties}>
          <span className="deco-medallion"><TimelineIcon name={item.icon}/></span>
          <article className="deco-event-card"><p className="deco-event-time"><time>{item.time}</time></p><h3>{item.title}</h3><span className="deco-card-corner" aria-hidden="true"/></article>
          {index<EVENT.itinerary.length-1&&<span className="deco-timeline-diamond" aria-hidden="true">◆</span>}
        </li>)}
      </ol>
      <footer className="deco-footer"><ArtDecoDivider/></footer>
    </div>
  </Box>;
}
