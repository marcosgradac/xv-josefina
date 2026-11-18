import { TARIFFS } from './pricing';
export interface EventConfig {
  names: string;
  subtitle: string;
  eventTitle: string;
  quote: string;
  scrollIndicatorText: string;
  coverEyebrow: string;
  coverKicker: string;
  coverTitle: string;
  coverMessage: string;
  eventDate: string; // ISO string
  eventDateLabel: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
  alias: string;
  bankName: string;
  accountHolder: string;
  digitalEnvelopeTitle: string;
  envelopeRainTitle: string;
  musicUrl: string;
  itinerary: Array<{
    time: string;
    title: string;
    description: string;
    icon: string;
    color: string;
  }>;
  gallery: Array<{ url: string; caption: string }>;
  details: Array<{ icon: string; label: string; value: string }>;
  giftMessage: string;
  giftHeading: string;
  envelopeRainMessage: string;
  rsvpTitle: string;
  rsvpEyebrow: string;
  rsvpStory: string;
  rsvpPassDateTime: string;
  rsvpConfirmedMessage: string;
  rsvpDeclinedMessage: string;
  closingTitle: string;
  closingPrompt: string;
  closingHashtag: string;
  closingHashtagUrl: string;
}

export const EVENT: EventConfig = {
  names: 'Josefina',
  subtitle: 'Te invito a mi noche especial...',
  eventTitle: 'Mis XV',
  quote: 'Mi noche soñada está llegando, y quiero que seas parte...',
  scrollIndicatorText: 'Sigue aquí...',
  coverEyebrow: 'Tienes una invitación especial',
  coverKicker: 'Mis maravillosos',
  coverTitle: 'XV',
  coverMessage: 'Una noche mágica comienza con una invitación...',
  eventDate: '2027-01-16T21:30:00-03:00',
  eventDateLabel: 'Sábado 16 de enero de 2027',
  eventTime: '21:30',
  venueName: 'Salón Atahualpa',
  venueAddress: 'Río Tercero, Córdoba, Argentina',
  mapsUrl: 'https://www.google.com/maps',
  alias: 'Jbarela2048.nx.ars',
  bankName: 'Naranja x',
  accountHolder: 'Barela Josefina',
  digitalEnvelopeTitle: 'Sobre Digital',
  envelopeRainTitle: 'Lluvia de Sobres',
  musicUrl: '/assets/audio/background.mp3',
  itinerary: [
    { time: '21:30', title: 'Cena', description: '', icon: 'dinner', color: '#ffffff' },
    { time: '23:30', title: 'Muchas sorpresas', description: '', icon: 'music', color: '#ffffff' },
    { time: '00:00', title: 'Vals y que empiece la fiesta', description: '', icon: 'party', color: '#ffffff' },
  ],
  gallery: [
    {
      url: '/assets/images/josefina-galeria-1.jpeg',
      caption: '',
    },
    {
      url: '/assets/images/josefina-galeria-2.jpeg',
      caption: '',
    },
    {
      url: '/assets/images/josefina-galeria-3.jpeg',
      caption: '',
    },
  ],
  details: [
    { icon: 'info', label: 'Tarjeta Mayores', value: `$${TARIFFS.adults.price}` },
    { icon: 'info', label: 'Tarjeta Adolescente (14 a 17 años)', value: `$${TARIFFS.teens.price}` },
    { icon: 'info', label: 'Tarjeta Menores (5 a 13 años)', value: `$${TARIFFS.children.price}` },
    { icon: 'info', label: 'Tarjeta menores de 5 años no pagan.', value: 'No pagan' },
  ],
  giftMessage:
    'Tu presencia es el mejor regalo. Si deseas tener un detalle, aquí encontrarás algunas opciones.',
  giftHeading: 'Mesa de Regalos',
  envelopeRainMessage: 'Si deseas tener un detalle, habrá un buzón para sobres en la recepción.',
  rsvpTitle: '¿Nos acompañas?',
  rsvpEyebrow: 'Tu presencia hará la diferencia',
  rsvpStory: 'Confirma tu asistencia para que podamos prepararlo todo con cariño.',
  rsvpPassDateTime: 'Sábado 16 de enero de 2027 · 21:30',
  rsvpConfirmedMessage: '¡Gracias por confirmar! Tu asistencia quedó registrada.',
  rsvpDeclinedMessage: 'Gracias por avisarnos. Tu respuesta quedó registrada.',
  closingTitle: 'Quiero ver las fotos de mí noche especial!',
  closingPrompt: 'Junto a tu foto utiliza esta descripción',
  closingHashtag: '#misXVJosefina',
  closingHashtagUrl: 'https://www.instagram.com/explore/tags/misXVJosefina/',
};
