import type { Ref } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { EVENT } from '../config/event';

export default function ClosingSection({ ref }: { ref: Ref<HTMLDivElement> }) {
  return <Box ref={ref} id="closing" component="section" className="invitation-section" sx={sectionSx}>
    <Box sx={overlaySx} />
    <Box sx={contentSx}>
      <Typography component="h2" className="script-heading" sx={headingSx}>{EVENT.closingTitle}</Typography>
      <Typography component="p" sx={promptSx}>{EVENT.closingPrompt}</Typography>
      <Link href={EVENT.closingHashtagUrl} target="_blank" rel="noreferrer" className="gold-control" sx={hashtagSx}>{EVENT.closingHashtag}</Link>
    </Box>
  </Box>;
}

const sectionSx = { minHeight: '70vh', position: 'relative', display: 'grid', placeItems: 'center', px: { xs: 2.5, sm: 4 }, py: 7, textAlign: 'center', backgroundColor: 'var(--bg)' };
const overlaySx = { position: 'absolute', inset: 0, background: 'rgba(5, 5, 5, 0.82)' };
const contentSx = { position: 'relative', zIndex: 1, maxWidth: 600, mx: 'auto' };
const headingSx = { color: 'var(--gold-light)', fontSize: { xs: '2.6rem', sm: '4.1rem' }, lineHeight: 1.1, mb: 2.5 };
const promptSx = { color: 'var(--subtitle-light)', fontSize: { xs: '1rem', sm: '1.1rem' }, mb: 1.5 };
const hashtagSx = { display: 'inline-block', color: 'var(--gold-light)', fontFamily: 'var(--serif)', fontSize: { xs: '1.45rem', sm: '1.8rem' }, textDecorationColor: 'var(--gold)', textUnderlineOffset: '0.3em', '&:hover': { color: 'var(--text-light)' } };
