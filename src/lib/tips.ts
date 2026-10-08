export type TipGroup = {
  label: string;
  tips: string[];
};

export type LabeledTip = {
  label: string;
  tip: string;
};

export const projectTipGroups: TipGroup[] = [
  {
    label: "Check out my latest cool builds",
    tips: [
      "Browse through the projects I've been coding lately.",
      "Take a look at the applications and tools I've shipped.",
      "Dive into my recent side projects and technical experiments.",
      "Explore what I've been building and coding recently.",
      "See the actual software and apps I've put together.",
    ],
  },
  {
    label: "Explore my most recent blogs in the blogs page",
    tips: [
      "Head over to the blog to read my latest write-ups and thoughts.",
      "Check out my recent dev logs and articles on the blog.",
      "Catch up on my latest writing over on the blog page.",
      "Read through my recent notes, posts, and post-mortems.",
      "Browse my latest articles covering design, code, and lessons learned.",
    ],
  },
  {
    label: "I write a lot about my journey as I build",
    tips: [
      "I document everything I learn while building in public.",
      "My posts track the raw ups and downs of my technical journey.",
      "I share real-time updates and lessons from my development process.",
      "I use my writing to think out loud and log my progress.",
      "Every article is a snapshot of my ongoing build-in-public journey.",
    ],
  },
];

export const blogTipGroups: TipGroup[] = [
  { label: "no text", tips: [] },
  { label: "no text", tips: [] },
  { label: "no text", tips: [] },
];

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function pickLabeledTip(groups: TipGroup[]): LabeledTip | null {
  if (groups.length === 0) return null;
  const group = groups[randomInt(groups.length)];
  if (group.tips.length === 0) return null;
  return { label: group.label, tip: group.tips[randomInt(group.tips.length)] };
}