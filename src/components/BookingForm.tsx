'use client';
import { useState } from 'react';
import { ArrowUpRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { buildBookingMessage, buildWhatsAppUrl, validateBooking } from '@/lib/booking';
const services = ['Signature Haircut','Glow Facial','Hair Spa Ritual','Bridal Makeup'];
const times = ['10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00'];
function localDate() { const now = new Date(); const y = now.getFullYear(); const m = String(now.getMonth()+1).padStart(2,'0'); const d = String(now.getDate()).padStart(2,'0'); return `${y}-${m}-${d}`; }
export function BookingForm() {
  const [name,setName] = useState(''); const [service,setService] = useState(services[0]);
  const [date,setDate] = useState(''); const [time,setTime] = useState(''); const [note,setNote] = useState('');
  const [error,setError] = useState(''); const [message,setMessage] = useState('');
  function submit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setMessage('');
    const input = {name,service,date,time,note};
    const invalid = validateBooking(input,localDate());
    if (invalid) { setError(invalid); return; }
    const url = buildWhatsAppUrl(process.env.NEXT_PUBLIC_SALON_WHATSAPP ?? '',buildBookingMessage(input));
    if (!url) { setMessage('Demo mode: configure NEXT_PUBLIC_SALON_WHATSAPP with an authorized salon number to enable WhatsApp handoff. No request was sent.'); return; }
    window.open(url,'_blank','noopener,noreferrer');
    setMessage('WhatsApp opened in a new tab. Send your message there; the salon must confirm availability.');
  }
  return <form className="booking-form" onSubmit={submit} noValidate>
    <div className="form-row"><label>Your name<input name="name" autoComplete="name" value={name} maxLength={80} onChange={e=>setName(e.target.value)} placeholder="Your full name" required/></label><label>Service<select name="service" value={service} onChange={e=>setService(e.target.value)}>{services.map(x=><option key={x}>{x}</option>)}</select></label></div>
    <div className="form-row"><label>Preferred date<input name="date" type="date" min={localDate()} value={date} onChange={e=>setDate(e.target.value)} required/></label><label>Preferred time<select name="time" value={time} onChange={e=>setTime(e.target.value)} required><option value="">Choose a time</option>{times.map(x=><option key={x} value={x}>{x}</option>)}</select></label></div>
    <label>Anything we should know? <span className="optional">(optional)</span><textarea value={note} maxLength={300} onChange={e=>setNote(e.target.value)} placeholder="Share any preferences or questions" rows={3}/></label>
    {error && <p className="form-error" role="alert">{error}</p>}{message && <p className="form-note" role="status">{message}</p>}
    <button className="button button-dark full" type="submit"><MessageCircle size={18}/> Request via WhatsApp <ArrowUpRight size={18}/></button>
    <p className="form-disclaimer"><ShieldCheck size={15}/> Request only — the salon confirms the appointment. No information is stored on this website.</p>
  </form>;
}
