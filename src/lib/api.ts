import { requireSupabase } from './supabase';
import type { AvailabilitySlot, BookingPayload, ContactPayload, MeetingType } from './booking';

const invoke = async <T>(name: string, body?: Record<string, unknown>) => {
  const { data, error } = await requireSupabase().functions.invoke<T>(name, { body });
  if (error) throw new Error(error.message || 'Secure service request failed.');
  if (data === null) throw new Error('Secure service returned no data.');
  return data;
};

export const api = {
  submitContact: (payload: ContactPayload) => invoke<{ id: string }>('submit-contact', payload),
  meetingTypes: () => invoke<{ meetingTypes: MeetingType[] }>('get-availability', { action: 'meeting-types' }),
  availability: (date: string, meetingTypeId: string, durationMinutes: number, visitorTimezone: string) => invoke<{ slots: AvailabilitySlot[]; meetingTimezone: string }>('get-availability', { date, meetingTypeId, durationMinutes, visitorTimezone }),
  reserveSlot: (startTimeUtc: string, endTimeUtc: string, meetingTypeId: string, visitorTimezone: string) => invoke<{ reservationToken: string; expiresAt: string }>('reserve-slot', { startTimeUtc, endTimeUtc, meetingTypeId, visitorTimezone }),
  createBooking: (payload: BookingPayload) => invoke<{ bookingReference: string; status: string; meetingLink?: string }>('create-booking', payload),
  adminDashboard: () => invoke('admin-dashboard'),
  adminAvailability: (body?: Record<string, unknown>) => invoke('admin-availability', body),
  adminBookingAction: (body: Record<string, unknown>) => invoke('admin-booking-action', body),
  visitorBooking: (token: string, mode: 'reschedule' | 'cancel') => invoke('visitor-booking', { token, mode }),
  visitorBookingAction: (body: Record<string, unknown>) => invoke('visitor-booking-action', body),
};
