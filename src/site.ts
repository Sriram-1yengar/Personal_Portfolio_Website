export const site = {
  name: 'Sriram Iyengar',
  role: 'Data Scientist / ML Engineer',
  location: 'Bangalore, India',
  url: 'https://sriramiyengar.me',
  description:
    'Data Scientist and Machine Learning Engineer specializing in predictive modeling, healthcare analytics, large-scale data processing, and AI systems.',
  email: 'sriramkiyengar@gmail.com',
  resumeUrl:
    '/Sriram_Iyengar_Resume_Website.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Sriram-1yengar' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/sriramiyengar2001/' },
    { label: 'Email', href: 'mailto:sriramkiyengar@gmail.com' },
  ],
  nav: [
    { label: 'Experience', href: '/#experience' },
    { label: 'Projects', href: '/#projects' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;

export type Social = (typeof site.socials)[number];
