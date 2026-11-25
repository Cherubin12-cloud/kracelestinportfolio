import { PortfolioData } from '../types/portfolio';

/**
 * YAO KRA CELESTIN — PORTFOLIO CONTENT & MEDIA CONFIGURATION
 * ----------------------------------------------------------
 * To replace any placeholder photo with a real image:
 * 1. Place your image inside `/public/images/` (e.g. `/public/images/portrait.jpg`).
 * 2. Update the corresponding `src` field below from `null` to `"/images/portrait.jpg"`.
 *
 * You can also click "Preview photo" on any image frame in the live site
 * to test your real photographs directly in the browser before publishing.
 *
 * To update contact links, replace `[EMAIL TO BE ADDED]` and `[LINKEDIN URL TO BE ADDED]`
 * in the `contact` object at the bottom of this file.
 */
export const portfolioData: PortfolioData = {
  identity: {
    fullName: 'Yao Kra Celestin',
    eyebrow: "Independent Professional · Côte d'Ivoire",
    tagline: 'Connecting Ideas, Technology and Human Potential.',
    supportingStatement:
      'Exploring how digital innovation can create meaningful opportunities for people and communities.',
    heroDescription:
      'I work at the intersection of digital innovation, education, artificial intelligence, and youth development, exploring how technology can create meaningful impact.',
    domains: ['EdTech', 'AI', 'Digital Communication', 'Youth Development'],
    location: "Côte d'Ivoire",
    portrait: {
      id: 'hero-portrait',
      src: null,
      alt: 'Professional portrait of Yao Kra Celestin',
      caption: 'Yao Kra Celestin — Independent Professional',
      slotLabel: 'Professional Portrait',
      suggestedPhoto: 'Upload a high-resolution vertical portrait photograph (4:5 ratio)',
      tone: 'sage',
    },
  },

  about: {
    title: 'A Little About Me',
    paragraphs: [
      'I am a young professional and graduate-level researcher in American Studies with a strong interest in digital innovation, education technology, artificial intelligence, and community engagement.',
      'Through my experience in digital communication, technology facilitation, youth mentorship, and project coordination, I have developed an interdisciplinary approach to using technology as a practical tool for social impact.',
      'I am particularly interested in how digital tools can improve learning experiences, strengthen organisations, and expand opportunities for underserved communities.',
      'I believe innovation should begin with people, respond to real needs, and remain accessible to those it is intended to serve.',
    ],
    highlightedStatement:
      'Technology becomes meaningful when it expands human potential.',
    pillars: [
      {
        label: 'Academic Foundation',
        value: 'Graduate-level researcher in American Studies',
      },
      {
        label: 'Core Lens',
        value: 'Human-centred technology and accessible learning',
      },
      {
        label: 'Base & Reach',
        value: "Rooted in Côte d'Ivoire, engaged in global youth networks",
      },
    ],
  },

  expertise: {
    title: 'Areas of Expertise',
    subtitle:
      'An interdisciplinary practice bridging educational purpose, emerging digital tools, and community-centred coordination.',
    items: [
      {
        id: 'edtech',
        title: 'Education Technology',
        description:
          'Digital learning, educational tools, digital literacy, and accessible learning experiences.',
        icon: 'edtech',
        tone: 'sage',
      },
      {
        id: 'ai',
        title: 'Artificial Intelligence',
        description:
          'AI literacy, practical AI applications, responsible technology exploration, and AI for social impact.',
        icon: 'ai',
        tone: 'blue',
      },
      {
        id: 'communication',
        title: 'Digital Communication',
        description:
          'Digital storytelling, content creation, visual communication, and media strategy.',
        icon: 'communication',
        tone: 'lavender',
      },
      {
        id: 'coordination',
        title: 'Project Coordination & Youth Development',
        description:
          'Youth engagement, mentorship, workshop facilitation, and educational programme implementation.',
        icon: 'coordination',
        tone: 'mutedSage',
      },
    ],
  },

  experience: {
    title: 'Where I Contribute',
    subtitle:
      'Roles across university spaces, youth leadership networks, and international education advocacy.',
    items: [
      {
        id: 'british-corner',
        organisation: 'British Corner — University Félix Houphouët-Boigny',
        location: "Abidjan, Côte d'Ivoire",
        position: 'Digital Communication & Media Officer | Tech-Time Facilitator',
        description:
          'I contribute to digital communication activities while facilitating practical sessions focused on digital skills, artificial intelligence, and emerging technologies.',
        keyActivities: [
          'Facilitating interactive digital learning sessions.',
          'Introducing learners to AI tools and practical applications.',
          'Supporting digital literacy and technology awareness.',
          'Contributing to communication and media activities.',
        ],
        media: {
          id: 'exp-british-corner',
          src: null,
          alt: 'British Corner Tech-Time session at University Félix Houphouët-Boigny',
          caption: 'British Corner — University Félix Houphouët-Boigny',
          slotLabel: 'British Corner Activities',
          suggestedPhoto: 'Authentic photo from a Tech-Time or digital skills facilitation session',
          tone: 'sage',
        },
      },
      {
        id: 'lib',
        organisation: 'Leadership Initiative Board',
        location: "Côte d'Ivoire",
        position: 'Head of Communication & Press Media Department | Youth Mentor',
        description:
          'I support youth leadership development through communication, mentorship, and educational initiatives.',
        media: {
          id: 'exp-lib',
          src: null,
          alt: 'Leadership Initiative Board youth mentorship and communication activities',
          caption: 'Leadership Initiative Board — Youth Leadership & Mentorship',
          slotLabel: 'Leadership Initiative Board',
          suggestedPhoto: 'Authentic photo of youth leadership activities, workshops, or team coordination',
          tone: 'blue',
        },
      },
      {
        id: 'theirworld',
        organisation: 'Theirworld',
        location: 'Global Network',
        position: 'Global Youth Ambassador',
        description:
          'I am part of a global network advocating for education and opportunities for children and young people.',
        media: {
          id: 'exp-theirworld',
          src: null,
          alt: 'Theirworld Global Youth Ambassador education advocacy',
          caption: 'Theirworld — Global Youth Ambassador Network',
          slotLabel: 'Theirworld Advocacy',
          suggestedPhoto: 'Authentic participation photo from Theirworld advocacy or education events',
          tone: 'lavender',
        },
      },
    ],
  },

  digitalProducts: {
    kicker: 'Selected Digital Products',
    title: 'Digital Products & Web Development',
    subtitle: 'Turning Ideas into Digital Experiences',
    items: [
      {
        id: 'ecolink',
        index: '01',
        title: 'EcoLink',
        url: 'https://ecovert-pi.vercel.app/',
        displayDomain: 'ecovert-pi.vercel.app',
        category: 'Web Development | Environmental Innovation',
        role: 'Website Developer',
        highlightLabel: 'Live Development Demonstration',
        description:
          "EcoLink is a digital project focused on waste management and recycling in Côte d'Ivoire. I developed this website as a practical demonstration of how digital technologies can help communicate and support environmental initiatives.",
        specialHighlight:
          'The website was developed live in front of students during a bootcamp, demonstrating practical website creation and learning through technology.',
        accentTone: 'sage',
        fallbackScreenshot: {
          id: 'web-ecolink-screenshot',
          src: null,
          alt: 'EcoLink live website preview — environmental innovation platform',
          caption: 'EcoLink — https://ecovert-pi.vercel.app/',
          slotLabel: 'EcoLink Website Screenshot',
          suggestedPhoto:
            'Optional screenshot fallback if live preview is blocked on your network',
          tone: 'sage',
        },
      },
      {
        id: 'leadership-initiative-board-web',
        index: '02',
        title: 'Leadership Initiative Board',
        url: 'https://leadershipinitiativeboardorg.vercel.app/',
        displayDomain: 'leadershipinitiativeboardorg.vercel.app',
        category: 'Web Development | Organisational Digital Presence',
        role: 'Website Developer',
        highlightLabel: 'Organisational Website Development',
        description:
          'Designed and developed the official digital platform for Leadership Initiative Board, an organisation dedicated to youth leadership development, mentorship, and community engagement.',
        accentTone: 'blue',
        fallbackScreenshot: {
          id: 'web-lib-screenshot',
          src: null,
          alt: 'Leadership Initiative Board official website preview',
          caption:
            'Leadership Initiative Board — https://leadershipinitiativeboardorg.vercel.app/',
          slotLabel: 'LIB Website Screenshot',
          suggestedPhoto:
            'Optional screenshot fallback if live preview is blocked on your network',
          tone: 'blue',
        },
      },
    ],
  },

  projects: {
    title: 'Selected Projects & Impact',
    subtitle:
      'Practical initiatives, innovation challenges, and educational programmes shaped through collaboration and community focus.',
    items: [
      {
        id: 'bootcamp-vision-360',
        title: 'BootCamp Vision 360',
        edition: 'Third Edition',
        organisation: 'Leadership Initiative Board in collaboration with Kectil',
        role: 'President, Organising Committee | Trainer',
        description:
          "Contributed to the organisation of a youth development programme and facilitated a practical workshop titled 'Build Your First AI Solution', introducing participants to AI and digital innovation.",
        highlights: [
          'Youth capacity building',
          'AI literacy',
          'Digital innovation',
          'Programme coordination',
        ],
        bentoSize: 'featured',
        accentTone: 'sage',
        gallery: [
          {
            id: 'proj-bv360-1',
            src: null,
            alt: "BootCamp Vision 360 — 'Build Your First AI Solution' workshop",
            caption: "Facilitating 'Build Your First AI Solution' during BootCamp Vision 360 (Third Edition)",
            slotLabel: 'BootCamp Vision 360 — Workshop',
            suggestedPhoto: 'Real workshop photograph from BootCamp Vision 360',
            tone: 'sage',
          },
          {
            id: 'proj-bv360-2',
            src: null,
            alt: 'BootCamp Vision 360 participants collaborating on AI prototypes',
            caption: 'Participants exploring practical AI concepts during group activities',
            slotLabel: 'Participant Collaboration',
            suggestedPhoto: 'Optional second workshop photograph showing participants',
            tone: 'mutedSage',
          },
          {
            id: 'proj-bv360-3',
            src: null,
            alt: 'BootCamp Vision 360 organising committee and cohort',
            caption: 'Organising committee and cohort group moment',
            slotLabel: 'Cohort & Organising Team',
            suggestedPhoto: 'Optional group or closing session photograph',
            tone: 'blue',
          },
        ],
      },
      {
        id: 'hacktourism-2024',
        title: 'HackTourism 2024',
        role: 'Winning Team Member',
        achievement: 'National First Prize',
        prize: 'Team prize: 5,000,000 FCFA',
        description:
          'Participated in a national innovation competition focused on digital solutions in the tourism sector.',
        highlights: [
          'Innovation',
          'Teamwork',
          'Problem-solving',
          'Digital transformation',
        ],
        bentoSize: 'wide',
        accentTone: 'blue',
        gallery: [
          {
            id: 'proj-hacktourism-1',
            src: null,
            alt: 'HackTourism 2024 National First Prize award ceremony',
            caption: 'HackTourism 2024 — National First Prize winning team',
            slotLabel: 'HackTourism 2024 — Award',
            suggestedPhoto: 'Real team and award photograph from HackTourism 2024',
            tone: 'blue',
          },
          {
            id: 'proj-hacktourism-2',
            src: null,
            alt: 'HackTourism 2024 team pitch and working session',
            caption: 'Solution development and presentation during HackTourism 2024',
            slotLabel: 'Team Working Session',
            suggestedPhoto: 'Optional pitch or team collaboration photograph',
            tone: 'sage',
          },
        ],
      },
      {
        id: 'millennium-fellowship-2024',
        title: 'Millennium Fellowship 2024',
        role: 'Millennium Fellow',
        reachMetric: '200+ students · 4 schools · 24 classes',
        description:
          'Contributed to an educational initiative promoting peaceful and supportive learning environments, reaching more than 200 students across four schools and 24 classes.',
        highlights: [
          'Education',
          'Community engagement',
          'SDG 4',
          'Youth empowerment',
        ],
        bentoSize: 'standard',
        accentTone: 'mutedSage',
        gallery: [
          {
            id: 'proj-millennium-1',
            src: null,
            alt: 'Millennium Fellowship 2024 school outreach session',
            caption: 'Educational outreach promoting peaceful and supportive learning environments',
            slotLabel: 'Millennium Fellowship 2024',
            suggestedPhoto: 'Real school outreach or Millennium Fellowship cohort photo',
            tone: 'mutedSage',
          },
          {
            id: 'proj-millennium-2',
            src: null,
            alt: 'Millennium Fellowship 2024 classroom engagement',
            caption: 'Engaging students across four schools and 24 classes',
            slotLabel: 'Classroom Session',
            suggestedPhoto: 'Optional classroom engagement photograph',
            tone: 'sage',
          },
        ],
      },
      {
        id: 'theirworld-project',
        title: 'Theirworld',
        role: 'Global Youth Ambassador',
        description:
          'Engagement in a global education advocacy network focused on improving educational opportunities for children and young people.',
        highlights: [
          'Global education advocacy',
          'Youth representation',
          'International collaboration',
        ],
        bentoSize: 'standard',
        accentTone: 'lavender',
        gallery: [
          {
            id: 'proj-theirworld-1',
            src: null,
            alt: 'Theirworld Global Youth Ambassador engagement',
            caption: 'Global Youth Ambassador advocacy for inclusive education',
            slotLabel: 'Theirworld — Advocacy',
            suggestedPhoto: 'Authentic participation photo where available',
            tone: 'lavender',
          },
        ],
      },
      {
        id: 'british-corner-tech-time',
        title: 'British Corner Tech-Time',
        organisation: 'University Félix Houphouët-Boigny',
        role: 'Tech-Time Facilitator',
        description:
          'Practical learning activities introducing participants to digital tools, artificial intelligence, and emerging technologies.',
        highlights: [
          'Digital literacy',
          'AI awareness',
          'Hands-on facilitation',
          'Peer learning',
        ],
        bentoSize: 'standard',
        accentTone: 'sage',
        gallery: [
          {
            id: 'proj-techtime-1',
            src: null,
            alt: 'British Corner Tech-Time practical digital skills workshop',
            caption: 'Hands-on Tech-Time session at British Corner, UFHB',
            slotLabel: 'British Corner Tech-Time',
            suggestedPhoto: 'Real photograph from a Tech-Time facilitation session',
            tone: 'sage',
          },
          {
            id: 'proj-techtime-2',
            src: null,
            alt: 'Participants exploring emerging digital tools',
            caption: 'Interactive digital exploration with university learners',
            slotLabel: 'Interactive Session',
            suggestedPhoto: 'Optional second photo from British Corner activities',
            tone: 'blue',
          },
        ],
      },
    ],
  },

  sessions: {
    title: 'Knowledge Sharing & Community Learning',
    subtitle:
      'Sharing ideas, facilitating conversations, and making knowledge accessible.',
    platformNote:
      'Professional learning sessions, educational discussions, and peer-to-peer exchanges hosted or facilitated on LinkedIn.',
    capabilities: [
      'Facilitating meaningful professional conversations',
      'Sharing practical knowledge about digital technologies and AI',
      'Engaging audiences around education, leadership, and personal development',
      'Creating learning opportunities through digital platforms',
      'Encouraging peer-to-peer learning and knowledge exchange',
    ],
    categories: [
      'AI & Technology',
      'Digital Skills',
      'Education',
      'Leadership & Youth Development',
      'Professional Development',
    ],
    items: [
      {
        id: 'session-ai-tech-1',
        title: '[SESSION TITLE TO BE ADDED]',
        topic: '[TOPIC OR THEME TO BE ADDED]',
        category: 'AI & Technology',
        date: '[DATE TO BE ADDED]',
        role: 'Facilitator',
        linkedinUrl: '[LINKEDIN POST OR REPLAY URL TO BE ADDED]',
        media: {
          id: 'session-media-ai-1',
          src: null,
          alt: 'Event poster or screenshot for AI & Technology LinkedIn session',
          caption: 'LinkedIn Session — AI & Technology',
          slotLabel: 'AI & Technology · Poster / Screenshot',
          suggestedPhoto:
            'Upload authentic LinkedIn event poster or session screenshot',
          tone: 'sage',
        },
      },
      {
        id: 'session-digital-skills-1',
        title: '[SESSION TITLE TO BE ADDED]',
        topic: '[TOPIC OR THEME TO BE ADDED]',
        category: 'Digital Skills',
        date: '[DATE TO BE ADDED]',
        role: 'Host',
        linkedinUrl: '[LINKEDIN POST OR REPLAY URL TO BE ADDED]',
        media: {
          id: 'session-media-digital-1',
          src: null,
          alt: 'Event poster or screenshot for Digital Skills LinkedIn session',
          caption: 'LinkedIn Session — Digital Skills',
          slotLabel: 'Digital Skills · Poster / Screenshot',
          suggestedPhoto:
            'Upload authentic LinkedIn event poster or session screenshot',
          tone: 'blue',
        },
      },
      {
        id: 'session-education-1',
        title: '[SESSION TITLE TO BE ADDED]',
        topic: '[TOPIC OR THEME TO BE ADDED]',
        category: 'Education',
        date: '[DATE TO BE ADDED]',
        role: 'Speaker',
        linkedinUrl: '[LINKEDIN POST OR REPLAY URL TO BE ADDED]',
        media: {
          id: 'session-media-education-1',
          src: null,
          alt: 'Event poster or screenshot for Education LinkedIn session',
          caption: 'LinkedIn Session — Education',
          slotLabel: 'Education · Poster / Screenshot',
          suggestedPhoto:
            'Upload authentic LinkedIn event poster or session screenshot',
          tone: 'mutedSage',
        },
      },
      {
        id: 'session-leadership-1',
        title: '[SESSION TITLE TO BE ADDED]',
        topic: '[TOPIC OR THEME TO BE ADDED]',
        category: 'Leadership & Youth Development',
        date: '[DATE TO BE ADDED]',
        role: 'Host',
        linkedinUrl: '[LINKEDIN POST OR REPLAY URL TO BE ADDED]',
        media: {
          id: 'session-media-leadership-1',
          src: null,
          alt: 'Event poster or screenshot for Leadership & Youth Development LinkedIn session',
          caption: 'LinkedIn Session — Leadership & Youth Development',
          slotLabel: 'Leadership & Youth · Poster / Screenshot',
          suggestedPhoto:
            'Upload authentic LinkedIn event poster or session screenshot',
          tone: 'lavender',
        },
      },
      {
        id: 'session-prof-dev-1',
        title: '[SESSION TITLE TO BE ADDED]',
        topic: '[TOPIC OR THEME TO BE ADDED]',
        category: 'Professional Development',
        date: '[DATE TO BE ADDED]',
        role: 'Facilitator',
        linkedinUrl: '[LINKEDIN POST OR REPLAY URL TO BE ADDED]',
        media: {
          id: 'session-media-profdev-1',
          src: null,
          alt: 'Event poster or screenshot for Professional Development LinkedIn session',
          caption: 'LinkedIn Session — Professional Development',
          slotLabel: 'Professional Dev · Poster / Screenshot',
          suggestedPhoto:
            'Upload authentic LinkedIn event poster or session screenshot',
          tone: 'ivory',
        },
      },
    ],
  },

  toolkit: {
    title: 'Tools I Use, Explore & Recommend',
    subtitle:
      'A transparent overview of digital platforms I work with directly, explore through ongoing research, or consider relevant for future educational and organisational initiatives.',
    categories: [
      'AI & Content Creation',
      'Digital Communication & Design',
      'Education & Digital Learning',
      'Project Management & Productivity',
    ],
    statusLegend: [
      {
        status: 'Used in practice',
        description: 'Applied directly in facilitation, communication, or project coordination.',
      },
      {
        status: 'Explored',
        description: 'Tested and researched hands-on to evaluate capabilities and use cases.',
      },
      {
        status: 'Recommended for future projects',
        description: 'Identified as strong, accessible candidates for upcoming initiatives.',
      },
    ],
    items: [
      {
        id: 'google-gemini',
        name: 'Google Gemini',
        category: 'AI & Content Creation',
        purpose:
          'Conversational AI for research synthesis, ideation, drafting educational material, and AI literacy demonstrations.',
        status: 'Used in practice',
        iconKey: 'gemini',
      },
      {
        id: 'google-ai-studio',
        name: 'Google AI Studio',
        category: 'AI & Content Creation',
        purpose:
          'Prototyping environment for testing prompts, multimodal workflows, and introductory AI solution concepts.',
        status: 'Explored',
        iconKey: 'aistudio',
      },
      {
        id: 'google-flow',
        name: 'Google Flow',
        category: 'AI & Content Creation',
        purpose:
          'Creative AI storytelling and visual media exploration for narrative-driven digital communication.',
        status: 'Explored',
        iconKey: 'flow',
      },
      {
        id: 'canva',
        name: 'Canva',
        category: 'Digital Communication & Design',
        purpose:
          'Visual storytelling, event communication assets, presentation decks, and accessible design templates.',
        status: 'Used in practice',
        iconKey: 'canva',
      },
      {
        id: 'figma',
        name: 'Figma',
        category: 'Digital Communication & Design',
        purpose:
          'Collaborative interface wireframing, visual systems exploration, and digital product prototyping.',
        status: 'Explored',
        iconKey: 'figma',
      },
      {
        id: 'google-classroom',
        name: 'Google Classroom',
        category: 'Education & Digital Learning',
        purpose:
          'Structured digital learning management for organising coursework, resources, and learner feedback.',
        status: 'Recommended for future projects',
        iconKey: 'classroom',
      },
      {
        id: 'google-forms',
        name: 'Google Forms',
        category: 'Education & Digital Learning',
        purpose:
          'Participant registration, workshop evaluations, needs assessments, and lightweight community surveys.',
        status: 'Used in practice',
        iconKey: 'forms',
      },
      {
        id: 'cboard',
        name: 'Cboard',
        category: 'Education & Digital Learning',
        purpose:
          'Open-source Augmentative and Alternative Communication (AAC) web application supporting symbol-based communication.',
        status: 'Explored',
        note: 'Explored as part of independent research into assistive communication solutions.',
        iconKey: 'cboard',
      },
      {
        id: 'google-workspace',
        name: 'Google Workspace',
        category: 'Project Management & Productivity',
        purpose:
          'Cloud-based document collaboration, shared project archives, and team communication workflows.',
        status: 'Used in practice',
        iconKey: 'workspace',
      },
      {
        id: 'google-calendar',
        name: 'Google Calendar',
        category: 'Project Management & Productivity',
        purpose:
          'Coordinating programme timelines, facilitation schedules, meetings, and multi-stakeholder milestones.',
        status: 'Used in practice',
        iconKey: 'calendar',
      },
      {
        id: 'notion',
        name: 'Notion',
        category: 'Project Management & Productivity',
        purpose:
          'Modular workspace for knowledge organisation, project documentation, and structured planning.',
        status: 'Recommended for future projects',
        iconKey: 'notion',
      },
    ],
  },

  collaboration: {
    title: 'Where Ideas Meet Opportunities',
    description:
      'I am interested in collaborative initiatives that connect technology, education, and social impact.',
    areas: [
      {
        id: 'inclusive-edtech',
        index: '01',
        title: 'Inclusive Education & EdTech',
        description:
          'Exploring accessible digital learning tools, assistive technologies, and practical educational resources.',
        tone: 'sage',
      },
      {
        id: 'ai-capacity',
        index: '02',
        title: 'AI & Digital Capacity Building',
        description:
          'Supporting AI literacy, digital skills development, and responsible technology adoption.',
        tone: 'blue',
      },
      {
        id: 'digital-comms-org',
        index: '03',
        title: 'Digital Communication & Organisational Development',
        description:
          'Supporting storytelling, online visibility, project documentation, and strategic communication.',
        tone: 'lavender',
      },
    ],
    highlightedStatement:
      'I believe the best solutions are not necessarily the most sophisticated ones, but those that respond to real needs and can be sustained over time.',
  },

  approach: {
    title: 'My Working Approach',
    subtitle:
      'A thoughtful, people-first cycle from listening to sustainable adoption.',
    steps: [
      {
        number: '01',
        title: 'Listen',
        description: 'Understand people, context, and priorities.',
      },
      {
        number: '02',
        title: 'Research',
        description: 'Identify needs, constraints, and existing solutions.',
      },
      {
        number: '03',
        title: 'Explore',
        description: 'Discover suitable technologies and approaches.',
      },
      {
        number: '04',
        title: 'Prototype',
        description: 'Test manageable ideas and practical solutions.',
      },
      {
        number: '05',
        title: 'Empower',
        description: 'Build capacity and support adoption.',
      },
      {
        number: '06',
        title: 'Evaluate',
        description: 'Learn, improve, and identify next steps.',
      },
    ],
  },

  contact: {
    title: "Let's Create Something Meaningful.",
    description:
      'Open to conversations, partnerships, and collaborative opportunities at the intersection of education, digital innovation, and social impact.',
    name: 'Yao Kra Celestin',
    location: "Côte d'Ivoire",
    email: '[EMAIL TO BE ADDED]',
    linkedin: '[LINKEDIN URL TO BE ADDED]',
    copyrightYear: '2026',
  },
};
