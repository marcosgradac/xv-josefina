import { useEffect, useRef, useState, type Ref, type CSSProperties } from 'react';
import { Box, Button, Dialog, DialogTitle, IconButton } from '@mui/material';
import { EVENT } from '../config/event';
import './GallerySection.css';

function CameraOrnament() {
  return <svg className="album-camera" viewBox="0 0 140 72" fill="none" stroke="currentColor" strokeWidth=".85" aria-hidden="true" focusable="false">
    <path d="M5 43h18m94 0h18M30 25h19l6-9h30l6 9h19v39H30Z"/>
    <path d="M34 29h72v31H34m6-35v-5h9m45 5v-4h9v4M57 20h26M31 35h16m46 0h16" strokeOpacity=".55"/>
    <circle cx="70" cy="44" r="18"/><circle cx="70" cy="44" r="14" strokeOpacity=".65"/><path d="M70 51c-16-10-5-17 0-10 5-7 16 0 0 10Z"/>
    <path d="M48 8h44M40 11h9m42 0h9M70 3v7m-3-3h6M13 36l2 3-2 3-2-3ZM127 36l2 3-2 3-2-3Z" strokeOpacity=".65"/>
    <rect x="95" y="30" width="7" height="4" rx="1"/><path d="M38 55h8m-8-3h5M67 63h6" strokeOpacity=".6"/>
  </svg>;
}
export default function GallerySection({ref,onScrollTo}:{ref:Ref<HTMLDivElement>;onScrollTo:(id:string)=>void}) {
  const [selected,setSelected]=useState<number|null>(null);
  const content=useRef<HTMLDivElement>(null);
  const touch=useRef<number|null>(null);
  const count=EVENT.gallery.length;
  const move=(direction:number)=>setSelected(value=>value===null?null:(value+direction+count)%count);
  useEffect(()=>{const el=content.current;if(!el||!('IntersectionObserver' in window))return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){el.classList.add('album-visible');observer.disconnect();}},{threshold:.08});el.classList.add('album-ready');observer.observe(el);return()=>observer.disconnect();},[]);
  return <Box ref={ref} component="section" id="gallery" className="luxury-album" aria-labelledby="gallery-title">
    <div className="album-stars" aria-hidden="true">{Array.from({length:20},(_,i)=><span key={i} style={{left:`${(i*37+5)%96}%`,top:`${(i*23+9)%95}%`,animationDelay:`${-i*1.3}s`,animationDuration:`${6+i%7}s`}}>{i%5===0?'✦':'·'}</span>)}</div>
    <div ref={content} className="album-content">
      <header className="album-header"><CameraOrnament/><p>Mis mejores momentos</p><h2 id="gallery-title">Galería</h2><div className="album-rule" aria-hidden="true">✦</div></header>
      <div className="album-stage"><span className="album-plane album-plane-back" aria-hidden="true"/><span className="album-plane album-plane-front" aria-hidden="true"/><div className="album-grid">{EVENT.gallery.map((photo,index)=><button type="button" key={photo.url} className={`album-photo album-photo-${index}`} style={{'--photo-delay':`${200+index*180}ms`} as CSSProperties} aria-label={`Ampliar fotografía ${index+1} de Josefina`} onClick={()=>setSelected(index)}><img src={photo.url} alt={photo.caption||`Retrato de Josefina ${index+1}`} loading="lazy" decoding="async"/><span className="album-frame" aria-hidden="true"/></button>)}</div></div>
      <div className="album-dots" aria-hidden="true"><span/>◇<span/></div>

      <Button className="album-next" onClick={()=>onScrollTo('countdown')}><span aria-hidden="true">◷</span> Ver cuenta regresiva <span className="album-arrow" aria-hidden="true">→</span></Button>
    </div>
    <svg className="album-trail" viewBox="0 0 500 140" fill="none" aria-hidden="true"><path d="M-20 130C130 20 250 170 520 10" stroke="#c9a35e" strokeWidth="1" strokeDasharray="1 10"/><path className="album-trail-light" pathLength="100" d="M-20 130C130 20 250 170 520 10" stroke="#ecd39f" strokeWidth="2" strokeDasharray=".2 3  .2 96.6"/></svg>
    <Dialog open={selected!==null} onClose={()=>setSelected(null)} maxWidth="lg" fullWidth className="album-lightbox" onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();move(1);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}}}>
      <DialogTitle className="album-viewer-title">Fotografías de Josefina <span>{selected===null?'':`${selected+1} / ${count}`}</span></DialogTitle>
      <IconButton className="album-close" aria-label="Cerrar visor de fotografías" onClick={()=>setSelected(null)}>×</IconButton>
      {selected!==null&&<div className="album-viewer" onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchEnd={e=>{if(touch.current!==null){const distance=e.changedTouches[0].clientX-touch.current;if(Math.abs(distance)>50)move(distance<0?1:-1);}touch.current=null;}}><img src={EVENT.gallery[selected].url} alt={EVENT.gallery[selected].caption||`Retrato de Josefina ${selected+1}`}/></div>}
      <div className="album-viewer-controls"><IconButton aria-label="Fotografía anterior" onClick={()=>move(-1)}>←</IconButton><IconButton aria-label="Fotografía siguiente" onClick={()=>move(1)}>→</IconButton></div>
    </Dialog>
  </Box>;
}

