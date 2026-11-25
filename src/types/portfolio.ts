export type PaletteTone = 'sage' | 'blue' | 'lavender' | 'mutedSage' | 'ivory';

export interface MediaAsset {
  /** Unique identifier used for local photo preview & replacement */
  id: string;
  /** Path to the real photograph (e.g. "/images/portrait.jpg"), or null until uploaded */
  src: string | null;
  /** Accessible alternative text */
  alt: string;
  /** Display caption shown below or in the lightbox gallery */
  caption: string;
  /** Short label displayed inside the editable placeholder frame */
  slotLabel: string;
  /** Guidance on what authentic photograph belongs in this slot */
  suggestedPhoto: string;
  /** Harmonious background tone from the portfolio palette */
  tone: PaletteTone;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  icon: 'edtech' | 'ai' | 'communication' | 'coordination';
  tone: PaletteTone;
}

export interface ExperienceItem {
  id: string;
  organisation: string;
  location?: string;
  position: string;
  description: string;
  keyActivities?: string[];
  media: MediaAsset;
}

export interface ProjectItem {
  id: string;
  title: string;
  edition?: string;
  organisation?: string;
  role: string;
  achievement?: string;
  prize?: string;
  reachMetric?: string;
  description: string;
  highlights: string[];
  bentoSize: 'featured' | 'wide' | 'standard';
  accentTone: PaletteTone;
  gallery: MediaAsset[];
}

export type ToolCategory =
  | 'AI & Content Creation'
  | 'Digital Communication & Design'
  | 'Education & Digital Learning'
  | 'Project Management & Productivity';

export type ExperienceStatus =
  | 'Used in practice'
  | 'Explored'
  | 'Recommended for future projects';

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  purpose: string;
  status: ExperienceStatus;
  note?: string;
  iconKey:
    | 'gemini'
    | 'aistudio'
    | 'flow'
    | 'canva'
    | 'figma'
    | 'classroom'
    | 'forms'
    | 'cboard'
    | 'workspace'
    | 'calendar'
    | 'notion';
}

export interface CollaborationArea {
  id: string;
  index: string;
  title: string;
  description: string;
  tone: PaletteTone;
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
}

export type SessionCategory =
  | 'AI & Technology'
  | 'Digital Skills'
  | 'Education'
  | 'Leadership & Youth Development'
  | 'Professional Development';

export type SessionRole = 'Host' | 'Facilitator' | 'Speaker';

export interface SessionItem {
  id: string;
  /** Replace "[SESSION TITLE TO BE ADDED]" with the authentic title of your LinkedIn session */
  title: string;
  /** Replace "[TOPIC OR THEME TO BE ADDED]" with the exact session theme or discussion focus */
  topic: string;
  category: SessionCategory;
  /** Replace "[DATE TO BE ADDED]" with the authentic session date */
  date: string;
  role: SessionRole;
  /** Replace "[LINKEDIN POST OR REPLAY URL TO BE ADDED]" with the real LinkedIn post or replay URL */
  linkedinUrl: string;
  /** Event poster or authentic session screenshot */
  media: MediaAsset;
}

export interface DigitalProductItem {
  id: string;
  index: string;
  title: string;
  url: string;
  displayDomain: string;
  category: string;
  role: string;
  highlightLabel: string;
  description: string;
  specialHighlight?: string;
  accentTone: PaletteTone;
  fallbackScreenshot: MediaAsset;
}

export interface PortfolioData {
  identity: {
    fullName: string;
    eyebrow: string;
    tagline: string;
    supportingStatement: string;
    heroDescription: string;
    domains: string[];
    location: string;
    portrait: MediaAsset;
  };
  about: {
    title: string;
    paragraphs: string[];
    highlightedStatement: string;
    pillars: { label: string; value: string }[];
  };
  expertise: {
    title: string;
    subtitle: string;
    items: ExpertiseItem[];
  };
  experience: {
    title: string;
    subtitle: string;
    items: ExperienceItem[];
  };
  digitalProducts: {
    kicker: string;
    title: string;
    subtitle: string;
    items: DigitalProductItem[];
  };
  projects: {
    title: string;
    subtitle: string;
    items: ProjectItem[];
  };
  sessions: {
    title: string;
    subtitle: string;
    platformNote: string;
    capabilities: string[];
    categories: SessionCategory[];
    items: SessionItem[];
  };
  toolkit: {
    title: string;
    subtitle: string;
    categories: ToolCategory[];
    statusLegend: { status: ExperienceStatus; description: string }[];
    items: ToolItem[];
  };
  collaboration: {
    title: string;
    description: string;
    areas: CollaborationArea[];
    highlightedStatement: string;
  };
  approach: {
    title: string;
    subtitle: string;
    steps: ApproachStep[];
  };
  contact: {
    title: string;
    description: string;
    name: string;
    location: string;
    email: string;
    linkedin: string;
    copyrightYear: string;
  };
}
