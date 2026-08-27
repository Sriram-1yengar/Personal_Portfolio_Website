export const site = {
  name: 'Sriram Iyengar',
  role: 'Data Scientist',
  url: 'https://sriramiyengar.me',
  description:
    'Sriram Iyengar — data scientist building machine learning models and data pipelines for healthcare, e-commerce, and go-to-market teams.',
  email: 'sriramkiyengar@gmail.com',
  resumeUrl:
    'https://drive.google.com/file/d/1q9F5QOjcQQi4NmBsiv6bc7ji-hClBkiJ/view?usp=sharing',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Sriram-1yengar' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/sriramiyengar2001/' },
    { label: 'Email', href: 'mailto:sriramkiyengar@gmail.com' },
  ],
  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'Experience', href: '/#experience' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;

export type Social = (typeof site.socials)[number];
