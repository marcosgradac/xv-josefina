export const TARIFFS = {
  adults: { label: 'Mayores (18 años o más)', price: 60000 },
  teens: { label: 'Adolescentes (14 a 17 años)', price: 40000 },
  children: { label: 'Menores (5 a 13 años)', price: 25000 },
  infants: { label: 'Menores de 5 años', price: 0 },
} as const;
export type Category = keyof typeof TARIFFS;
export const CATEGORIES = Object.keys(TARIFFS) as Category[];
export type Counts = Record<Category, number>;
export const emptyCounts = (): Counts => ({ adults: 0, teens: 0, children: 0, infants: 0 });
export const money = (value: number) => '$' + value.toLocaleString('es-AR');
export const totalPeople = (counts: Counts) => CATEGORIES.reduce((sum, key) => sum + counts[key], 0);
export const totalAmount = (counts: Counts, prices: Record<Category, number>) => CATEGORIES.reduce((sum, key) => sum + counts[key] * prices[key], 0);
export const normalizePhone = (country: string, number: string) => country + number.replace(/[\s().-]/g, '');
export function validateContact(name: string, phone: string) {
  if (name.trim().length < 2 || name.trim().length > 120) return 'Ingresá un nombre de entre 2 y 120 caracteres.';
  if (!/^\+[1-9][0-9]{7,14}$/.test(phone)) return 'Revisá el teléfono: código de país y entre 8 y 15 dígitos en total, sin el 0 ni el 15 local.';
  return '';
}
export type Attendance = 'confirmed' | 'declined';
export type PaymentMethod = 'cash' | 'transfer' | 'other';
export type Family = Counts & { id: string; full_name: string; phone: string; phone_country_code: string; phone_number: string; song: string; attendance: Attendance; total_amount: number; total_guests: number; created_at: string; updated_at: string; amount_paid: number; balance_due: number; payment_status: 'pending'|'partial'|'paid'|'not_applicable' };
export type Payment = { id: string; response_id: string; amount: number; note: string; created_at: string; payment_method: PaymentMethod };
export const paymentLabel = (method: PaymentMethod) => ({cash:'Efectivo',transfer:'Transferencia',other:'Otro'})[method];
export function balance(family: Pick<Family, 'amount_paid'|'balance_due'|'payment_status'>) {
  return { paid:family.amount_paid, due:family.balance_due, status:({pending:'PENDIENTE DE PAGO',partial:'PAGO PARCIAL',paid:'PAGADO',not_applicable:'NO APLICA'})[family.payment_status] };
}
