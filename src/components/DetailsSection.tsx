import { useEffect, useRef, type Ref, type CSSProperties } from 'react';
import { Box, Button } from '@mui/material';
import { EVENT } from '../config/event';
import './DetailsSection.css';

function EnvelopeOrnament() {
  return <svg className="gala-envelope" viewBox="0 0 240 125" fill="none" stroke="#c9a35e" strokeWidth="1" aria-hidden="true" focusable="false">
    <defs><linearGradient id="gala-envelope-metal" x1="65" y1="40" x2="180" y2="110" gradientUnits="userSpaceOnUse"><stop stopColor="#c9a35e" stopOpacity=".05"/><stop offset=".5" stopColor="#ecd39f" stopOpacity=".2"/><stop offset="1" stopColor="#c9a35e" stopOpacity=".04"/></linearGradient></defs>
    <path d="M7 86c29 13 29-22 52-13M181 73c23-9 23 26 52 13" strokeOpacity=".6"/>
    <path d="m66 63 54-41 54 41v51H66Z" fill="url(#gala-envelope-metal)"/>
    <g className="gala-invite-card"><path d="M84 19h72v77H84Z" fill="#10100f"/><path d="M89 24h62v65H89" strokeOpacity=".4"/><path className="gala-heart" d="M120 57c-27-16-8-31 0-18 8-13 27 2 0 18Z" fill="#c9a35e" fillOpacity=".16" stroke="#ecd39f"/><path d="M102 68h36m-29 6h22" strokeOpacity=".55"/></g>
    <path d="m66 63 54 36 54-36v51H66Z" fill="url(#gala-envelope-metal)"/><path d="m66 114 38-29m70 29-38-29M70 110h100" stroke="#ecd39f" strokeOpacity=".7"/>
    <path className="gala-envelope-spark" d="M67 25v12m-6-6h12m104 47v10m-5-5h10" stroke="#ecd39f"/>
  </svg>;
}
function TicketIcon({family=false}:{family?:boolean}) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{family?<><circle cx="11" cy="10" r="3"/><circle cx="23" cy="12" r="2.5"/><path d="M4 26v-4c0-8 14-8 14 0v4m2-8c6-2 9 2 9 6v2M8 26v-5m6 5v-5"/></>:<><path d="M4 8h24v6c-5 0-5 5 0 5v5H4v-5c5 0 5-5 0-5Z"/><path d="M21 9v3m0 3v2m0 3v3M10 12h7m-7 4h5m-5 4h7" strokeWidth=".8"/></>}</svg>;
}
function LuxuryGift() {
  return <svg className="gala-gift" viewBox="0 0 190 150" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id="gala-box" x1="40" y1="55" x2="140" y2="125" gradientUnits="userSpaceOnUse"><stop stopColor="#10100f"/><stop offset=".5" stopColor="#050505"/><stop offset="1" stopColor="#10100f"/></linearGradient><linearGradient id="gala-bow" x1="60" y1="30" x2="130" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#c9a35e"/><stop offset=".45" stopColor="#ecd39f"/><stop offset=".65" stopColor="#c9a35e"/><stop offset="1" stopColor="#ecd39f"/></linearGradient></defs>
    <ellipse cx="97" cy="133" rx="57" ry="6" fill="#c9a35e" opacity=".05"/>
    <path d="m44 62 49 15 49-15v55l-49 17-49-17Z" fill="url(#gala-box)" stroke="#c9a35e" strokeOpacity=".65"/>
    <path d="m39 51 54-17 54 17-54 18Z" fill="#10100f" stroke="#c9a35e"/><path d="m39 51 54 18 54-18v13L93 83 39 64Z" fill="url(#gala-box)" stroke="#c9a35e"/>
    <path d="m78 65 15 5 12-4v64l-12 4-15-5Z" fill="url(#gala-bow)"/><path d="m69 42 55 16 14-4-56-16Z" fill="url(#gala-bow)"/>
    <g className="gala-gift-bow" stroke="url(#gala-bow)" strokeWidth="1.5"><path d="M94 48C67 49 49 21 65 19c13-2 24 15 29 29Zm0 0c29 1 48-26 31-29-13-2-25 15-31 29Z" fill="#c9a35e" fillOpacity=".12"/><path d="M94 48C75 42 62 30 65 24m29 24c19-6 33-18 31-24m-31 24-15 18m15-18 15 18"/><ellipse cx="94" cy="47" rx="5" ry="4" fill="#ecd39f"/></g>
    <path className="gala-gift-reflection" pathLength="100" d="m44 117 49 17 49-17V65" stroke="#ecd39f" strokeWidth="1.2" strokeDasharray="4 96"/>
    <path className="gala-envelope-spark" d="M31 70v12m-6-6h12m119 14v10m-5-5h10" stroke="#ecd39f" strokeWidth=".7"/>
  </svg>;
}
function GalaDivider(){return <div className="gala-divider" aria-hidden="true"><span/>◇<span/></div>;}
function formatPrice(value:string){const numeric=Number(value.replace(/[^0-9]/g,''));return value.startsWith('$')&&Number.isFinite(numeric)?`$${numeric.toLocaleString('es-AR')}`:value;}
export default function DetailsSection({ref,onScrollTo}:{ref:Ref<HTMLDivElement>;onScrollTo:(id:string)=>void}) {
  const content=useRef<HTMLDivElement>(null);
  useEffect(()=>{const el=content.current;if(!el||!('IntersectionObserver' in window))return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){el.classList.add('gala-visible');observer.disconnect();}},{threshold:.08});el.classList.add('gala-ready');observer.observe(el);return()=>observer.disconnect();},[]);
  return <Box ref={ref} id="details" component="section" className="gala-details" aria-labelledby="gala-title">
    <div className="gala-particles" aria-hidden="true">{Array.from({length:16},(_,i)=><span key={i} style={{left:`${(i*37+7)%96}%`,top:`${(i*23+5)%95}%`,animationDelay:`${-i*1.7}s`,animationDuration:`${6+i%7}s`}}>{i%4===0?'✦':'·'}</span>)}</div>
    <div className="gala-content" ref={content}><header className="gala-header"><EnvelopeOrnament/><h2 id="gala-title">Detalles</h2><GalaDivider/></header>
      <div className="gala-panel"><ul className="gala-tickets">{EVENT.details.map((item,index)=>{const free=item.label.toLowerCase().includes('no pagan');const age=item.label.match(/\(([^)]+)\)/);const label=free?item.label.replace(/^Tarjeta\s+/i,''):item.label.replace(/\s*\([^)]+\)/,'');return <li key={item.label} className={`gala-ticket${free?' gala-ticket-free':''}`} style={{'--ticket-delay':`${300+index*160}ms`} as CSSProperties}><span className="gala-ticket-icon"><TicketIcon family={free}/></span><div className="gala-ticket-description"><h3>{label}</h3>{age&&<p>({age[1]})</p>}</div>{!free&&item.value&&<span className="gala-price">{formatPrice(item.value)}</span>}<span className="gala-ticket-notch" aria-hidden="true"/></li>;})}</ul></div>
      <LuxuryGift/>
      <Button className="gala-button" onClick={()=>onScrollTo('gifts')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M4 10h16v11H4ZM3 6h18v4H3Zm9 0v15M12 6C2 6 6-3 12 6c6-9 10 0 0 0Z"/></svg>Mesa de regalos<span aria-hidden="true">→</span></Button><GalaDivider/>
    </div>
    <svg className="gala-trail" viewBox="0 0 500 110" fill="none" aria-hidden="true"><path d="M-20 100C150-40 270 160 520 5" stroke="#c9a35e" strokeWidth=".7" strokeDasharray="1 9"/><path className="gala-trail-light" pathLength="100" d="M-20 100C150-40 270 160 520 5" stroke="#ecd39f" strokeDasharray=".3 3 .3 96.4"/></svg>
  </Box>;
}
