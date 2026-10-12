export type BookingInput = { name: string; service: string; date: string; time: string; note?: string };

export function validateBooking(input: BookingInput, today: string): string | null {
  if (input.name.trim().length < 2 || input.name.trim().length > 80) return 'Enter a name between 2 and 80 characters.';
  if (!['Signature Haircut', 'Glow Facial', 'Hair Spa Ritual', 'Bridal Makeup'].includes(input.service)) return 'Choose a listed service.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) return 'Choose a valid date.';
  const [y,m,d] = input.date.split('-').map(Number);
  const parsed = new Date(Date.UTC(y,m-1,d));
  if (parsed.getUTCFullYear() !== y || parsed.getUTCMonth() !== m-1 || parsed.getUTCDate() !== d) return 'Choose a valid date.';
  if (input.date < today) return 'Choose today or a future date.';
  if (!['10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00'].includes(input.time)) return 'Choose an available request time.';
  if ((input.note ?? '').length > 300) return 'Keep notes under 300 characters.';
  return null;
}

export function buildBookingMessage(input: BookingInput): string {
  const message = [
    'Hello, I would like to REQUEST an appointment at Élan Studio.',
    `Name: ${input.name.trim()}`,
    `Service: ${input.service}`,
    `Preferred date: ${input.date}`,
    `Preferred time: ${input.time}`,
    input.note?.trim() ? `Notes: ${input.note.trim()}` : '',
    'Please confirm whether this slot is available. I understand this is not a confirmed booking.'
  ].filter(Boolean);
  return message.join('\n');
}

export function buildWhatsAppUrl(number: string, message: string): string | null {
  const digits = number.trim();
  if (!/^\d{8,15}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
