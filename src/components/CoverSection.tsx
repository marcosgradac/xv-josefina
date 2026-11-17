import { Button } from '@mui/material';
import { EVENT } from '../config/event';
import '../App.css';

export default function CoverSection({ onOpen }: { onOpen: () => void }) {
  return (
    <main className="cover" aria-labelledby="cover-title">
      <div className="cover-glint cover-glint-one" aria-hidden="true">✦</div>
      <div className="cover-glint cover-glint-two" aria-hidden="true">✧</div>
      <div className="cover-glint cover-glint-three" aria-hidden="true">✦</div>
      <div className="cover-frame" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="cover-content fade-in">
        <p className="cover-eyebrow">{EVENT.coverEyebrow}</p>
        <div className="ornament-rule" aria-hidden="true">✦</div>
        <p className="cover-kicker">{EVENT.coverKicker}</p>
        <h1 id="cover-title" className="cover-xv script-heading">{EVENT.coverTitle}</h1>
        <p className="cover-name script-heading">{EVENT.names}</p>
        <p className="cover-message">{EVENT.coverMessage}</p>
        <p className="cover-date">{EVENT.eventDateLabel}</p>
        <Button className="cover-open-button" onClick={onOpen} variant="outlined">Abrir mi invitación</Button>
      </div>
    </main>
  );
}
