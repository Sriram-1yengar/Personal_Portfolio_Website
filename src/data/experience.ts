export interface PointGroup {
  label: string;
  items: string[];
}

export interface Role {
  company: string;
  title: string;
  start: string;
  end: string;
  current?: boolean;
  blurb: string;
  points: (string | PointGroup)[];
  tags: string[];
}

export const experience: Role[] = [

  {
    company: 'F&D Partners / Qapita',
    title: 'Independent AI Consultant',
    start: 'Nov 2025',
    end: 'Present',
    current: true,
    blurb: 'Freelance LLM pipeline, automation, and analytics consulting — a fintech cap-table platform, then a deregulated-energy advisory firm.',
    points: [
      {
        label: 'F&D Partners — energy advisory · Jun 2026 – Present',
        items: [
          'Building in automations to cut down on manual processing for analysts and users on the customer facing portal.',
          'Automated supplier evaluation, cutting a 3-hour manual analytics process to minutes',
          'Combined agentic browsing with custom Python workflows for real-time data extraction',
        ],
      },
      {
        label: 'Qapita — fintech / cap-table platform · Nov 2025 – May 2026',
        items: [
          'Built a multi-jurisdiction document automation pipeline across 15+ regulatory contexts, processing 10,000+ records and cutting report generation time by 95%',
          'Developed an LLM-based data migration pipeline with deterministic fallbacks for non-standard fields — zero data loss across full dataset transfers, cutting onboarding from days to hours',
          'Instrumented 200+ Mixpanel events across 5 core product workflows, generating insights that directly influenced product roadmap decisions',
        ],
      },
    ],
    tags: ['Python', 'LLM Pipelines', 'RAG', 'Agentic AI', 'Docker', 'Automation Engineering', 'Fintech', 'Energy Advisory', 'Product Analytics'],
  },
  {
    company: 'Mason',
    title: 'ML Engineer — Growth',
    start: 'Jul 2025',
    end: 'Oct 2025',
    blurb: 'Growth-focused ML pipelines for sales and marketing teams.',
    points: [
      'Built a Python ETL pipeline aggregating multi-source social media data for ad-hoc data collection and analysis',
      'Automated data collection and normalization for sales stakeholders, improving lead-gen productivity by 50%',
      'Created a content analysis and personalization pipeline using Gemini Vision, reduced internal manual workload by 75%',
    ],
    tags: ['Python', 'ETL', 'Gemini Vision', 'Growth Analytics', 'Playwright', 'GTM'],
  },
  {
    company: 'Certilytics Inc.',
    title: 'Junior Data Scientist — Healthcare Analytics',
    start: 'Nov 2023',
    end: 'Mar 2025',
    blurb: 'Deep learning and statistical modeling on claims data for Fortune 500 health plans.',
    points: [
      'Delivered up to $20M in contract savings by engineering deep learning anomaly detection on claims data',
      'Reduced model input dimensionality from 320 to 17 features (95% reduction) via unsupervised feature extraction while improving predictive accuracy, and reducing bias',
      'Automated client deployment recalibration, cutting new client setup time by 71%',
      'Refactored a Scala/SQL data pipeline, cutting error rate 30% and runtime 40%',
    ],
    tags: ['Python', 'PyTorch', 'Scala', 'SQL', 'Anomaly Detection', 'Deep Learning', 'Healthcare Analytics', 'Feature Engineering', 'MLOps'],
  },
  {
    company: 'View, Inc.',
    title: 'Data Science Intern — Business Intelligence',
    start: 'Jun 2021',
    end: 'Aug 2021',
    blurb:
      'Built a predictive model to flag potentially malfunctioning smart-glass units in the field before customers noticed.',
    points: [
      'Designed a KNN model on sensor data to flag failing insulated glass units with 78% accuracy.',
      'Automated collection, cleaning, and analysis of Splunk data via Python and MySQL.',
    ],
    tags: ['Python', 'SQL', 'Statistics', 'BI'],
  },
  {
    company: 'Penn State — College of Engineering',
    title: 'Lecture Assistant & Grader, CMPSC 221',
    start: 'Aug 2020',
    end: 'May 2023',
    blurb:
      'Object-oriented programming with web design (Java). Held office hours coaching 300+ students.',
    points: [],
    tags: ['Java', 'Teaching'],
  },
];

export const education = {
  school: 'The Pennsylvania State University',
  degree: 'B.S. Data Science',
  detail: 'Machine learning, analytics, statistics, and data storytelling. 2× Dean’s List.',
  years: '2018 – 2023',
};

export interface Cert {
  name: string;
  href?: string;
}

export const certs: Cert[] = [
  { name: 'Professional Certificate Programme in Agentic AI and Applications', href: "https://emeritus.skillsnetwork.site/certificates/7531928c-5ccb-4fca-bd4c-8f856854aaa5"},
  { name: 'Generative AI for Business and Professionals', href: "https://courses.emeritus.skillsnetwork.site/certificates/2235e29c607247e1826832919bb9e9a7"},
  { name: 'Responsible and Ethical Generative AI', href: "https://courses.emeritus.skillsnetwork.site/certificates/b7fba578281f42689d2bcf80a40fcddf" },
  { name: 'Building AI Agents with RAG and LangChain', href: "https://courses.emeritus.skillsnetwork.site/certificates/66ff196b07914635af1224bdc52ec896" },
  { name: 'Deep Learning: Neural Networks', href: "https://www.coursera.org/account/accomplishments/verify/UACZIF4P4094"},
  { name: 'AWS Certified Cloud Practitioner', href: "https://www.credly.com/badges/2f0eeefd-9b43-4227-ada7-261d36c7cdbb/linked_in_profile" },
  { name: 'Alteryx Core Certified', href: "https://www.credly.com/badges/b9b38ce3-d19f-4289-8ea4-fbbc5b2bcc90/linked_in_profile"},
];
