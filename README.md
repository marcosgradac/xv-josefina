# Invitación XV de Josefina

Invitación digital interactiva para los XV de Josefina, creada con React, TypeScript, Material UI y Vite.

## Desarrollo

```sh
npm install
npm run dev
```

## Compilación

```sh
npm run build
npm run preview
```

## Contenido

- Portada animada y programa del evento
- Galería, cuenta regresiva, detalles y ubicación
- Mesa de regalos y confirmación de asistencia conectada a Supabase
- Diseño adaptable a móviles y escritorio

Los datos y textos del evento están centralizados en `src/config/event.ts`. La confirmación usa la Edge Function submit-rsvp del proyecto Supabase existente. El panel privado está en `/admin`. Seguí los pasos de `RSVP_SETUP.md`; no ejecutar las migraciones antiguas sobre el servidor actual.
