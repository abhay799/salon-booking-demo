
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateBooking,
  buildWhatsAppUrl,
  buildBookingMessage,
} from '../src/lib/booking.ts';

const valid = {
  name: 'Aditi',
  service: 'Glow Facial',
  date: '2026-10-20',
  time: '14:00',
  note: '',
};

test('valid booking passes validation', () =>
  assert.equal(validateBooking(valid, '2026-10-13'), null));

test('past date is rejected', () =>
  assert.match(
    validateBooking({ ...valid, date: '2026-10-12' }, '2026-10-13')!,
    /future/
  ));

test('impossible calendar date is rejected', () =>
  assert.match(
    validateBooking({ ...valid, date: '2026-02-30' }, '2026-01-01')!,
    /valid date/
  ));

test('unknown service is rejected', () =>
  assert.match(
    validateBooking({ ...valid, service: 'Other' }, '2026-10-13')!,
    /service/
  ));

test('invalid phone fails closed', () =>
  assert.equal(buildWhatsAppUrl('123-456', 'hello'), null));

test('message URI is encoded', () =>
  assert.equal(
    buildWhatsAppUrl('919876543210', 'A & B'),
    'https://wa.me/919876543210?text=A%20%26%20B'
  ));

test('request is explicitly unconfirmed', () =>
  assert.match(buildBookingMessage(valid), /not a confirmed booking/));
