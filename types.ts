export interface Project {
  id: string;
  title: string;
  category: 'Development' | 'Design' | 'Strategy';
  description: string;
  image: string;
  year: string;
  tags: string[];
  links: {
    demo?: string;
    code?: string;
    design?: string;
    caseStudy?: string;
  };
}

export interface DesignConcept {
  title: string;
  philosophy: string;
  materials: string[];
  formFactor: string;
}

export enum Section {
  HERO = 'hero',
  WORK = 'work',
  ABOUT = 'about',
  CONTACT = 'contact'
}