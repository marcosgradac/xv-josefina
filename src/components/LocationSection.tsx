import { useEffect, useRef, type Ref } from 'react';
import { Box, Button } from '@mui/material';
import { EVENT } from '../config/event';
import './LocationSection.css';

function LocationIcon({type='pin'}:{type?:'pin'|'building'|'calendar'|'clock'}) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{type==='pin'?<><path d="M25 12c0 7-9 16-9 16S7 19 7 12a9 9 0 1 1 18 0Z"/><circle cx="16" cy="12" r="3.5"/></>:type==='building'?<><path d="m4 12 12-7 12 7H4Zm2 3h20M7 15v12m6-12v12m6-12v12m6-12v12M4 28h24"/><path d="M14 9h4"/></>:type==='calendar'?<><rect x="5" y="7" width="22" height="22" rx="2"/><path d="M10 4v6m12-6v6M5 13h22M11 18h.1M16 18h.1M21 18h.1M11 23h.1M16 23h.1"/></>:<><circle cx="16" cy="16" r="12"/><path d="M16 8v8l5 3M16 5v1m11 10h-1M16 27v-1M5 16h1"/></>}</svg>;
}
function FoldedMap(){
  return <svg className="atlas-map" viewBox="0 0 400 270" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id="atlas-paper-left" x1="60" y1="100" x2="170" y2="230" gradientUnits="userSpaceOnUse"><stop stopColor="#10100f"/><stop offset=".65" stopColor="#050505"/><stop offset="1" stopColor="#c9a35e" stopOpacity=".12"/></linearGradient><linearGradient id="atlas-paper-center" x1="160" y1="110" x2="270" y2="240" gradientUnits="userSpaceOnUse"><stop stopColor="#c9a35e" stopOpacity=".13"/><stop offset=".5" stopColor="#10100f"/><stop offset="1" stopColor="#050505"/></linearGradient><linearGradient id="atlas-pin-gold" x1="175" y1="20" x2="230" y2="130" gradientUnits="userSpaceOnUse"><stop stopColor="#ecd39f"/><stop offset=".4" stopColor="#c9a35e"/><stop offset=".6" stopColor="#ecd39f"/><stop offset="1" stopColor="#c9a35e"/></linearGradient><clipPath id="atlas-paper-clip"><path d="m40 139 91-32 80 31 93-31 59 94-100 37-82-31-101 31Z"/></clipPath></defs>
    <ellipse cx="202" cy="244" rx="146" ry="9" fill="#c9a35e" opacity=".04"/>
    <g className="atlas-paper"><path d="m40 139 91-32 50 100-101 31Z" fill="url(#atlas-paper-left)"/><path d="m131 107 80 31 52 100-82-31Z" fill="url(#atlas-paper-center)"/><path d="m211 138 93-31 59 94-100 37Z" fill="url(#atlas-paper-left)"/>
    <g clipPath="url(#atlas-paper-clip)" stroke="#c9a35e" strokeOpacity=".32" strokeWidth=".65"><path d="m20 160 110-35 83 31 110-39M35 184l105-36 83 31 117-40M56 214l101-35 83 31 118-41M99 108l62 136m23-118 60 135m18-139 65 123"/><path d="m54 180 52 19 49-17 49 18 56-19 52 20m-227 3 24-29 43 16 24-28 49 16 42-31 52 19" strokeOpacity=".5"/></g>
    <path d="m40 139 91-32 80 31 93-31 59 94-100 37-82-31-101 31Z" stroke="#c9a35e" strokeWidth="1"/><path d="m131 107 50 100m30-69 52 100" stroke="#ecd39f" strokeOpacity=".5"/><path className="atlas-paper-reflection" pathLength="100" d="m80 238 101-31 82 31 100-37" stroke="#ecd39f" strokeWidth="1.3" strokeDasharray="4 96"/>
    </g>
    <ellipse className="atlas-pulse atlas-pulse-one" cx="202" cy="166" rx="21" ry="8" stroke="#c9a35e" strokeWidth=".9"/><ellipse className="atlas-pulse atlas-pulse-two" cx="202" cy="166" rx="21" ry="8" stroke="#ecd39f" strokeWidth=".7"/>
    <g className="atlas-map-pin"><path d="M234 70c0 32-32 83-32 83s-32-51-32-83a32 32 0 1 1 64 0Z" fill="url(#atlas-pin-gold)" stroke="#ecd39f"/><path d="M180 71c0-18 9-25 18-27" stroke="#fbf3e5" strokeOpacity=".6" strokeWidth="1"/><circle cx="202" cy="70" r="14" fill="#050505" stroke="#ecd39f"/><circle cx="202" cy="70" r="9" stroke="#c9a35e" strokeOpacity=".6"/><path className="atlas-pin-spark" d="M226 38v16m-8-8h16" stroke="#fbf3e5" strokeWidth=".7"/></g>
  </svg>;
}
export default function LocationSection({ref}:{ref:Ref<HTMLDivElement>;onScrollTo:(id:string)=>void}) {
  const content=useRef<HTMLDivElement>(null);
  useEffect(()=>{const el=content.current;if(!el||!('IntersectionObserver' in window))return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){el.classList.add('atlas-visible');observer.disconnect();}},{threshold:.08});el.classList.add('atlas-ready');observer.observe(el);return()=>observer.disconnect();},[]);
  return <Box ref={ref} component="section" id="location" className="atlas-location" aria-labelledby="atlas-title">
    <div className="atlas-particles" aria-hidden="true">{Array.from({length:16},(_,i)=><span key={i} style={{left:`${(i*37+8)%96}%`,top:`${(i*23+6)%94}%`,animationDelay:`${-i*1.6}s`,animationDuration:`${7+i%6}s`}}>{i%4===0?'✦':'·'}</span>)}</div>
    <div className="atlas-content" ref={content}><header className="atlas-header"><div className="atlas-header-pin" aria-hidden="true"><span/><LocationIcon/><span/></div><p>Detalles de la celebración</p><h2 id="atlas-title">Dónde será</h2><div className="atlas-divider" aria-hidden="true"><span/>◇<span/></div></header>
      <div className="atlas-event-card"><dl>{[{type:'building' as const,label:'Salón',value:EVENT.venueName},{type:'calendar' as const,label:'Fecha',value:EVENT.eventDateLabel},{type:'clock' as const,label:'Horario',value:`${EVENT.eventTime} hs`}].map(item=><div className="atlas-event-row" key={item.label}><LocationIcon type={item.type}/><div><dt>{item.label}</dt><dd>{item.value}</dd></div></div>)}</dl><span className="atlas-card-corner" aria-hidden="true"/></div>
      <figure className="atlas-map-composition"><FoldedMap/><figcaption>{EVENT.venueAddress}<span>Mapa ornamental · Abrí Google Maps para ver la ubicación real</span></figcaption></figure>
      <Button className="atlas-map-button" component="a" href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer"><LocationIcon/>Ver ubicación<span aria-hidden="true">→</span></Button>
      <div className="atlas-divider atlas-footer" aria-hidden="true"><span/>✧<span/></div>
    </div>
  </Box>;
}
