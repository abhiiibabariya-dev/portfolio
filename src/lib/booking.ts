export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'RESCHEDULED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export type MeetingType = {
  id: string;
  slug: string;
  name: string;
  description: string;
  durationMinutes: number;
  minDurationMinutes: number;
  maxDurationMinutes: number;
  approvalMode: 'AUTO_CONFIRM' | 'MANUAL_APPROVAL';
  videoMode: 'GOOGLE_MEET' | 'MANUAL';
};

export type AvailabilitySlot = {
  startTimeUtc: string;
  endTimeUtc: string;
  available: boolean;
};

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  website?: string;
};

export type BookingPayload = {
  reservationToken: string;
  meetingTypeId: string;
  visitorName: string;
  visitorEmail: string;
  visitorCompany: string;
  visitorRole: string;
  visitorPhone?: string;
  visitorLinkedin?: string;
  meetingPurpose: string;
  additionalMessage?: string;
  visitorTimezone: string;
  durationMinutes: number;
  website?: string;
};

export const DEFAULT_MEETING_TYPES: MeetingType[] = [
  { id: 'job-interview', slug: 'job-interview', name: 'Job Interview', description: 'Professional interview for cybersecurity, DFIR, SOC, incident response, or security engineering roles.', durationMinutes: 45, minDurationMinutes: 45, maxDurationMinutes: 45, approvalMode: 'AUTO_CONFIRM', videoMode: 'GOOGLE_MEET' },
  { id: 'recruiter-discussion', slug: 'recruiter-discussion', name: 'Recruiter Discussion', description: 'Discuss roles, hiring requirements, and professional background.', durationMinutes: 30, minDurationMinutes: 30, maxDurationMinutes: 30, approvalMode: 'AUTO_CONFIRM', videoMode: 'GOOGLE_MEET' },
  { id: 'technical-interview', slug: 'technical-interview', name: 'Technical Interview', description: 'Technical conversation on DFIR, incident response, SOC, SIEM engineering, and threat detection.', durationMinutes: 60, minDurationMinutes: 60, maxDurationMinutes: 60, approvalMode: 'MANUAL_APPROVAL', videoMode: 'GOOGLE_MEET' },
  { id: 'cybersecurity-consultation', slug: 'cybersecurity-consultation', name: 'Cybersecurity Consultation', description: 'Professional discussion about cybersecurity operations, automation, or security architecture.', durationMinutes: 60, minDurationMinutes: 60, maxDurationMinutes: 60, approvalMode: 'MANUAL_APPROVAL', videoMode: 'GOOGLE_MEET' },
  { id: 'quick-introduction', slug: 'quick-introduction', name: 'Quick Introduction', description: 'A concise introductory conversation.', durationMinutes: 15, minDurationMinutes: 15, maxDurationMinutes: 15, approvalMode: 'AUTO_CONFIRM', videoMode: 'GOOGLE_MEET' },
  { id: 'custom-meeting', slug: 'custom-meeting', name: 'Custom Meeting', description: 'For another professional discussion with a selectable duration.', durationMinutes: 30, minDurationMinutes: 15, maxDurationMinutes: 90, approvalMode: 'MANUAL_APPROVAL', videoMode: 'MANUAL' },
];

export const formatLocalTime = (dateTime: string, timezone: string, options: Intl.DateTimeFormatOptions = {}) => new Intl.DateTimeFormat(undefined, { timeZone: timezone, hour: 'numeric', minute: '2-digit', ...options }).format(new Date(dateTime));
export const formatLocalDate = (dateTime: string, timezone: string) => new Intl.DateTimeFormat(undefined, { timeZone: timezone, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(dateTime));
