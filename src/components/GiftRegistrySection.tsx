import { useEffect, useRef, useState, type Ref, type CSSProperties } from 'react';
import { Box, Button } from '@mui/material';
import { EVENT } from '../config/event';
import './GiftRegistrySection.css';

function Envelope({dark=false}:{dark?:boolean}) {
  return <svg viewBox="0 0 80 55" fill="none" className={dark?'jewel-envelope jewel-envelope-dark':'jewel-envelope'} aria-hidden="true" focusable="false"><path d="M5 8h70v40H5Z" fill={dark?'#10100f':'#c9a35e'} fillOpacity={dark?1:.6} stroke="#ecd39f" strokeWidth=".8"/><path d="m5 8 35 25L75 8M5 48l25-20m45 20L50 28" stroke="#ecd39f" strokeWidth=".8"/><path d="M9 12h62M10 44h60" stroke="#fbf3e5" strokeOpacity=".25" strokeWidth=".5"/><circle cx="40" cy="32" r="4" fill="#c9a35e" stroke="#ecd39f" strokeWidth=".6"/><path className="jewel-envelope-sheen" d="M5 8h70v40" pathLength="100" stroke="#fbf3e5" strokeWidth=".9" strokeDasharray="3 97"/></svg>;
}
function EnvelopeParticles(){return <div className="jewel-rain" aria-hidden="true">{Array.from({length:8},(_,i)=><div className="jewel-falling-envelope" key={i} style={{left:`${i*13}%`,width:`${28+i%3*12}px`,'--fall-duration':`${14+i%5*2}s`,'--fall-delay':`${-i*3.1}s`,'--fall-drift':`${i%2?20:-18}px`,'--fall-rotation':`${i%2?12:-12}deg`} as CSSProperties}><Envelope dark={i%2===0}/><span>· ·</span></div>)}</div>;}
function JewelDivider(){return <div className="jewel-divider" aria-hidden="true"><span/>✧<span/></div>;}
export default function GiftRegistrySection({ref,onScrollTo}:{ref:Ref<HTMLDivElement>;onScrollTo:(id:string)=>void}) {
  const [copyState,setCopyState]=useState<'idle'|'pending'|'success'|'error'>('idle');
  const timer=useRef<number|undefined>(undefined);
  const mounted=useRef(true);
  const content=useRef<HTMLDivElement>(null);
  const rainCard=useRef<HTMLDivElement>(null);
  useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;window.clearTimeout(timer.current);};},[]);
  useEffect(()=>{if(!('IntersectionObserver' in window))return;const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('jewel-visible');observer.unobserve(entry.target);}});},{threshold:.12});[content.current,rainCard.current].forEach(el=>{if(el){el.classList.add('jewel-ready');observer.observe(el);}});return()=>observer.disconnect();},[]);
  const copy=async()=>{
    window.clearTimeout(timer.current);setCopyState('pending');
    try {await navigator.clipboard.writeText(EVENT.alias);if(!mounted.current)return;setCopyState('success');timer.current=window.setTimeout(()=>setCopyState('idle'),2800);}
    catch {if(mounted.current)setCopyState('error');}
  };
  return <Box ref={ref} id="gifts" component="section" className="jewel-gifts" aria-labelledby="jewel-title">
    <EnvelopeParticles/>
    <div className="jewel-dust" aria-hidden="true">{Array.from({length:16},(_,i)=><span key={i} style={{left:`${(i*37+4)%97}%`,top:`${(i*23+6)%95}%`,animationDelay:`${-i*1.8}s`}}>{i%4===0?'✦':'·'}</span>)}</div>
    <div className="jewel-content" ref={content}>
      <header className="jewel-header"><p className="jewel-eyebrow">Un detalle especial</p><h2 id="jewel-title">{EVENT.giftHeading}</h2><JewelDivider/><p className="jewel-message">{EVENT.giftMessage}</p></header>
      <article className="jewel-card jewel-bank"><h3>{EVENT.digitalEnvelopeTitle}</h3><div className="jewel-card-emblem"><span/><Envelope dark/><span/></div>
        <dl className="jewel-bank-data">
          <div className="jewel-alias"><dt>Alias</dt><dd>{EVENT.alias}</dd></div>
          <div><dt>Titular</dt><dd>{EVENT.accountHolder}</dd></div>
          <div><dt>Entidad</dt><dd>{EVENT.bankName}</dd></div>
          <div><dt>Contacto</dt><dd>{EVENT.giftContact}</dd></div>
        </dl>
        <Button className={`jewel-gold-button jewel-copy${copyState==='success'?' jewel-copy-success':''}`} onClick={copy} disabled={copyState==='pending'}>{copyState==='success'?'¡ALIAS COPIADO!':copyState==='pending'?'COPIANDO...':'COPIAR ALIAS'}</Button>
        <p className={`jewel-copy-status${copyState==='error'?' jewel-copy-error':''}`} role="status" aria-live="polite">{copyState==='success'?'Alias copiado al portapapeles.':copyState==='error'?'No se pudo copiar el ALIAS. Seleccioná el texto para copiarlo manualmente.':'\u00a0'}</p>
      </article>
      <article ref={rainCard} className="jewel-card jewel-envelope-rain"><div className="jewel-card-shower" aria-hidden="true">{[0,1,2].map(i=><span key={i} style={{left:`${25+i*22}%`,animationDelay:`${.2+i*.5}s`}}><Envelope dark={i===1}/></span>)}</div><div className="jewel-double-envelope" aria-hidden="true"><Envelope dark/><Envelope/></div><h3>{EVENT.envelopeRainTitle}</h3><p>{EVENT.envelopeRainMessage}</p></article>
      <Button className="jewel-gold-button jewel-location" onClick={()=>onScrollTo('location')}>Ver ubicación <span aria-hidden="true">→</span></Button><JewelDivider/>
    </div>
  </Box>;
}
