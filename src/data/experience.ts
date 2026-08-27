export interface Role {
  company: string;
  title: string;
  start: string;
  end: string;
  current?: boolean;
  blurb: string;
  points: string[];
  tags: string[];
}

export const experience: Role[] = [
  {
    company: 'Mason',
    title: 'Data Science Intern — Go-To-Market',
    start: 'Aug 2025',
    end: 'Present',
    current: true,
    blurb:
      'Automated data pipelines and analytics for market intelligence, pricing trends, and competitive benchmarking across the e-commerce ecosystem.',
    points: [
      'Built lead-generation pipelines with cross-functional partners, increasing qualified outreach by 30% and accelerating speed-to-contact for sales and marketing.',
      'Automated daily pricing collection for 200+ DTC brands, cutting manual data gathering by 45% and feeding time-series analytics.',
      'Engineered Python / Scrapy / Playwright crawlers over 1,000+ e-commerce app listings to surface top-growth AI apps and white-space opportunities.',
    ],
    tags: ['Python', 'Scrapy', 'Playwright', 'GTM analytics'],
  },
  {
    company: 'Certilytics',
    title: 'Junior Data Scientist',
    start: 'Dec 2023',
    end: 'Mar 2025',
    blurb:
      'Built and optimized ML models and data pipelines for healthcare clients — driving cost savings while monitoring performance and mitigating bias across the model suite.',
    points: [
      'Engineered transformer-based deep learning models to generate custom reports and flag high-impact contract anomalies, surfacing multi-million-dollar savings for large health plans.',
      'Built an unsupervised feature-extraction framework that reduced 320+ SDoH features to 18 (~93% reduction) while improving predictive accuracy and reducing bias in production.',
      'Optimized a Scala / SQL processing pipeline: 30% fewer errors and runtime cut from 5 days to 3 (40% faster).',
      'Developed a generalized calibration pipeline that automated transfer learning across the model suite.',
    ],
    tags: ['Python', 'Scala', 'Deep Learning', 'MLOps', 'Healthcare'],
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

export const certs = [
  'AWS Certified Cloud Practitioner',
  'Alteryx Core Certified',
  'Deep Learning: Neural Networks',
];
