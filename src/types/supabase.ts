import type { Attendance, PaymentMethod } from '../config/pricing';
export type SubmissionInput = {client_request_id:string;full_name:string;phone_country_code:string;phone_number:string;adults_count:number;teens_count:number;children_count:number;under_five_count:number;song_request:string|null;attendance_status:Attendance};
export type SubmissionReceipt = {ok:true;id:string;total_guests:number;total_amount:number;duplicate?:boolean};
export type DashboardRow = Omit<SubmissionInput,'client_request_id'> & {id:string;total_guests:number;total_amount:number;created_at:string;updated_at:string;amount_paid:number;balance_due:number;payment_status:'pending'|'partial'|'paid'|'not_applicable'};
export type PaymentRow = {id:string;submission_id:string;amount:number;note:string|null;created_at:string;payment_method:PaymentMethod};
