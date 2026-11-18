import { supabase } from './supabase.ts';
export const backend = supabase;
export function requireBackend() {
  if (!backend) throw new Error('Las confirmaciones todavía no están habilitadas. Intentá nuevamente más tarde o contactá al anfitrión.');
  return backend;
}
export function errorMessage(error: unknown): string {
  const code=error && typeof error==='object' && 'code' in error ? error.code : '';
  if(code==='23514'||code==='P0001')return 'La base rechazó la operación. Revisá las cantidades y el importe: un pago no puede superar el saldo ni una edición reducir el total por debajo de lo abonado.';
  if(code==='42501'||code==='PGRST301'||code==='PGRST303')return 'Tu sesión no tiene permiso para esta operación o caducó. Volvé a iniciar sesión.';
  if(code==='PGRST116')return 'El registro cambió o ya no está disponible. Actualizá la información antes de reintentar.';

  if (error && typeof error === 'object' && 'code' in error && error.code === '23505') return 'Este teléfono ya tiene una respuesta registrada. Contactá al anfitrión para corregirla.';
  if (error && typeof error === 'object' && 'code' in error && error.code === 'P0001' && 'message' in error) return String(error.message);
  if (error instanceof Error && !('code' in error)) return error.message;
  return 'No se pudo completar la operación. Revisá la conexión e intentá nuevamente; los datos del formulario se conservaron.';
}
