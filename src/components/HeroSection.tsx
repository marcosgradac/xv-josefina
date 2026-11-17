import type { CSSProperties, Ref } from 'react';
import { Box, Button } from '@mui/material';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import AccessTime from '@mui/icons-material/AvTimer';
import ArrowForward from '@mui/icons-material/East';
import { EVENT } from '../config/event';
import './HeroSection.css';

function GoldParticles() {
  return <div className="hero-particles" aria-hidden="true">{Array.from({ length: 32 }, (_, index) => (
    <span key={index} className={index % 7 === 0 ? 'hero-particle hero-particle-star' : 'hero-particle'} style={{
      left: `${(index * 37 + 7) % 100}%`, top: `${(index * 23 + 5) % 100}%`,
      '--duration': `${5 + index % 6}s`, '--delay': `${-index * 1.37}s`,
      '--drift': `${index % 2 ? -9 : 9}px`,
    } as CSSProperties}>{index % 7 === 0 ? '✦' : ''}</span>
  ))}</div>;
}

function LuxuryRibbon({ bottom = false }: { bottom?: boolean }) {
  return <div className={`hero-ribbon${bottom ? ' hero-ribbon-bottom' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 300 260" fill="none" focusable="false">
      <defs>
        <linearGradient id={bottom ? 'hero-fabric-bottom' : 'hero-fabric-top'} x1="0" y1="20" x2="150" y2="170" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a35e" stopOpacity="0"/><stop offset=".3" stopColor="#c9a35e" stopOpacity=".09"/><stop offset=".52" stopColor="#ecd39f" stopOpacity=".17"/><stop offset=".7" stopColor="#c9a35e" stopOpacity=".07"/><stop offset="1" stopColor="#c9a35e" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id={bottom ? 'hero-edge-bottom' : 'hero-edge-top'} x1="0" y1="245" x2="265" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9a35e" stopOpacity=".1"/><stop offset=".28" stopColor="#ecd39f"/><stop offset=".48" stopColor="#fbf3e5"/><stop offset=".65" stopColor="#c9a35e"/><stop offset="1" stopColor="#c9a35e" stopOpacity=".15"/>
        </linearGradient>
        <pattern id={bottom ? 'hero-dust-bottom' : 'hero-dust-top'} width="23" height="29" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="9" r=".55" fill="#ecd39f" opacity=".65"/><circle cx="19" cy="22" r=".35" fill="#c9a35e" opacity=".65"/>
        </pattern>
      </defs>
      <g className="hero-ribbon-fabric">
        <path d="M-15 244C85 213 30 105 127 75S241 42 311-18L222-22C162 36 108 10 66 49S53 151-15 171Z" fill={`url(#${bottom ? 'hero-fabric-bottom' : 'hero-fabric-top'})`}/>
        <path d="M-15 244C85 213 30 105 127 75S241 42 311-18L222-22C162 36 108 10 66 49S53 151-15 171Z" fill={`url(#${bottom ? 'hero-dust-bottom' : 'hero-dust-top'})`} opacity=".6"/>
        <path d="M-15 244C85 213 30 105 127 75S241 42 311-18M-15 171C53 151 24 88 66 49S162 36 222-22" stroke={`url(#${bottom ? 'hero-edge-bottom' : 'hero-edge-top'})`} strokeWidth=".85"/>
        <g stroke={`url(#${bottom ? 'hero-edge-bottom' : 'hero-edge-top'})`} strokeWidth=".55" strokeLinecap="round">
          <path d="M-12 230C80 196 34 101 124 71S231 40 299-17" opacity=".82"/>
          <path d="M-12 218C76 181 38 96 120 67S220 38 285-17" opacity=".65"/>
          <path d="M-13 208C68 174 37 91 110 62S208 36 270-18" opacity=".48"/>
          <path d="M-14 200C62 167 37 84 99 57S195 31 253-18" opacity=".75"/>
          <path d="M-14 185C58 157 30 88 81 53S178 32 236-20" opacity=".5"/>
        </g>
        <path className="hero-ribbon-trace" pathLength="100" d="M-15 244C85 213 30 105 127 75S241 42 311-18" stroke="#fbf3e5" strokeWidth="1.15"/>
        <path className="hero-ribbon-trace hero-ribbon-trace-inner" pathLength="100" d="M-12 218C76 181 38 96 120 67S220 38 285-17" stroke="#ecd39f" strokeWidth=".9"/>
        <path className="hero-ribbon-trace hero-ribbon-trace-fine" pathLength="100" d="M-14 200C62 167 37 84 99 57S195 31 253-18" stroke="#fbf3e5" strokeWidth=".7"/>
      </g>
      <g className="hero-ribbon-spark hero-ribbon-spark-one" transform="translate(63 147)"><circle r="1.4" fill="#fbf3e5"/><path d="M-7 0H7M0-7V7" stroke="#ecd39f" strokeWidth=".55"/></g>
      <g className="hero-ribbon-spark hero-ribbon-spark-two" transform="translate(167 62)"><circle r="1" fill="#fbf3e5"/><path d="M-5 0H5M0-5V5" stroke="#ecd39f" strokeWidth=".45"/></g>
      <g className="hero-ribbon-spark hero-ribbon-spark-three" transform="translate(83 90)"><circle r=".9" fill="#fbf3e5"/><path d="M-4 0H4M0-4V4" stroke="#ecd39f" strokeWidth=".4"/></g>
      <g className="hero-ribbon-dust" fill="#ecd39f"><circle cx="43" cy="173" r=".8"/><circle cx="70" cy="110" r=".6"/><circle cx="103" cy="83" r=".9"/><circle cx="143" cy="46" r=".7"/><circle cx="23" cy="192" r=".6"/></g>
    </svg>
  </div>;
}

function GoldDivider({ heart = false }: { heart?: boolean }) {
  return <div className={`hero-divider${heart ? ' hero-divider-heart' : ''}`} aria-hidden="true"><span/>{heart ? '♡' : '✦'}<span/></div>;
}

export default function HeroSection({ ref, onScrollTo }: { ref: Ref<HTMLDivElement>; onScrollTo: (id: string) => void }) {
  return <Box component="section" ref={ref} id="hero" tabIndex={-1} className="luxury-hero" aria-labelledby="hero-name">
    <GoldParticles/><LuxuryRibbon/><LuxuryRibbon bottom/>
    <div className="hero-edge" aria-hidden="true"/>
    <div className="hero-composition">
      <div className="hero-crown hero-reveal" aria-hidden="true"><span className="hero-crown-shape"/><span className="hero-jewel hero-jewel-one">✦</span><span className="hero-jewel hero-jewel-two">✦</span><span className="hero-jewel hero-jewel-three">✦</span></div>
      <p className="hero-kicker hero-reveal">Mis 15</p>
      <div className="hero-monogram hero-reveal" aria-hidden="true">XV</div>
      <p className="hero-intro hero-reveal">{EVENT.subtitle}</p>
      <h1 id="hero-name" className="hero-name hero-reveal">{EVENT.names}</h1>
      <GoldDivider/>
      <div className="hero-date-card hero-reveal"><span className="hero-date-corners" aria-hidden="true"/><p><CalendarMonthOutlined aria-hidden="true"/><time dateTime={EVENT.eventDate}>{EVENT.eventDateLabel}</time></p><p className="hero-event-time"><AccessTime aria-hidden="true"/>{EVENT.eventTime} HRS</p></div>
      <p className="hero-quote hero-reveal">«{EVENT.quote}»</p>
      <GoldDivider heart/>
      <Button className="hero-continue hero-reveal" variant="outlined" onClick={() => onScrollTo('itinerary')} endIcon={<ArrowForward/>}>{EVENT.scrollIndicatorText}</Button>
      <div className="hero-rose hero-reveal" aria-hidden="true"><span/><img src="/assets/images/hero-rose.svg" alt=""/><span/></div>
    </div>
  </Box>;
}
