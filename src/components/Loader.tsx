
export default function Loader() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-5"
      style={{
        backgroundColor: '#0b0b14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        minHeight: '100vh',
      }}
    >
      <div
        className="relative h-14 w-14"
        style={{
          position: 'relative',
          height: '3.5rem',
          width: '3.5rem',
        }}
      >
        <div
          className="absolute inset-0 rounded-full border-2 animate-ping"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '50%',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '#D4AF37',
            animation: 'ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite',
            animationDuration: '1.4s',
          }}
        />
        <div
          className="absolute inset-2 rounded-full border"
          style={{
            position: 'absolute',
            top: '0.5rem',
            left: '0.5rem',
            right: '0.5rem',
            bottom: '0.5rem',
            borderRadius: '50%',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#D4AF37',
          }}
        />
      </div>
      <p
        className="text-xs uppercase tracking-widest opacity-50 montserrat"
        style={{
          color: '#D4AF37',
          fontFamily: 'Montserrat, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.4em',
          opacity: 0.5,
          fontSize: '0.75rem',
        }}
      >
        Cargando
      </p>
      <style>
        {`
          @keyframes ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
}