export const MoodOptions: OptionType[] = [
  { label: "-", value: "undefined" },
  { label: "Focused", value: "focused" },
  { label: "Relaxed", value: "relaxed" },
  { label: "Confident", value: "confident" },
  { label: "Anxious", value: "anxious" },
  { label: "Alert", value: "alert" },
  { label: "Stressed", value: "stressed" },
  { label: "Energized", value: "energized" },
  { label: "Fatigued", value: "fatigued" },
  { label: "Calm", value: "calm" },
  { label: "Motivated", value: "motivated" },
  { label: "Determined", value: "determined" },
  { label: "Nervous", value: "nervous" },
  { label: "Distracted", value: "distracted" },
  { label: "Tense", value: "tense" },
  { label: "Zen-like", value: "zen-like" },
  { label: "Meditative", value: "meditative" },
  { label: "Present", value: "present" },
  { label: "Excited", value: "excited" },
  { label: "Overwhelmed", value: "overwhelmed" },
  { label: "Centered", value: "centered" },
];

export const DisciplineOptions: OptionType[] = [
  { label: "CNF", value: "CNF" },
  { label: "CWT", value: "CWT" },
  { label: "FIM", value: "FIM" },
  { label: "VWT", value: "VWT" },
];

export type OptionType = { label: string; value?: string };

export type Dive = {
  discipline: OptionType;
  time: string;
  depth: string;
  mood: OptionType;
};

export type Session = {
  _id: string;
  createdAt: string;
  dives: Dive[];
};

export type Inputs = {
  dives: Dive[];
};