export const MEETING_STATES = ["ACCEPTED", "PENDING", "CREATED"] as const;

// TODO: Sorry, i18n habe ich hier erstmal außen vor gelassen - Lukas
export const meetingTranslations: Record<MeetingType, string> = {
  ACCEPTED: "Akzeptiert",
  PENDING: "Ausstehend",
  CREATED: "Erstellt",
};

export type MeetingType = (typeof MEETING_STATES)[number];
