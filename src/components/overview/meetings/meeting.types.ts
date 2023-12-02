export const MEETING_STATES = ["ACCEPTED", "PENDING", "CREATED"] as const;

// TODO: Sorry, i18n habe ich hier erstmal außen vor gelassen - Lukas
export const meetingTranslations: Record<MeetingState, string> = {
  ACCEPTED: "Akzeptiert",
  PENDING: "Ausstehend",
  CREATED: "Abgelehnt",
};

type MeetingState = (typeof MEETING_STATES)[number];
