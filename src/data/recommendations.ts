export interface Recommendation {
  quote: string;
  name: string;
  title: string;
  org: string;
}

export const recommendations: Recommendation[] = [
  {
    quote:
      'He developed deep learning models to extract nuanced contract-optimization opportunities in large-scale healthcare claims data, and played a key role in researching improvements like automated model calibration. Sriram took the initiative to learn new technologies and languages to support his work.',
    name: 'Eugene Kwak',
    title: 'SVP, Data Science',
    org: 'Certilytics',
  },
  {
    quote:
      'Sriram excelled at translating complex analytic results into clear, actionable insights for both technical and non-technical stakeholders, and integrated seamlessly into our team’s collaborative culture.',
    name: 'Dr. Robert Dwyer',
    title: 'EVP & Chief of Data Science',
    org: 'Certilytics',
  },
  {
    quote:
      'Enthusiastic and curious — key requirements for a student interested in engineering research. Sriram was exposed to cutting-edge work at the Laboratory for Hypersonic and Shock Wave Research and completed a project of his own while there.',
    name: 'Prof. K.P.J. Reddy',
    title: 'Chair Professor, HAL',
    org: 'Dept. of Aerospace Engineering, IISc Bangalore',
  },
];
