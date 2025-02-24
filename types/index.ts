
export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
  }
  
  export interface Experience {
    company: string;
    position: string;
    duration: string;
    description: string[];
    technologies: string[];
  }
  