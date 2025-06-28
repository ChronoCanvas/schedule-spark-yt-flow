
export type ProjectState = 'planning' | 'production' | 'scheduled' | 'uploaded';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  state: ProjectState;
  createdAt: string;
  lastModified: string;
  teamMembers: TeamMember[];
  description?: string;
  scheduledDate?: string;
  uploadedDate?: string;
  thumbnail?: string;
}

export interface ProjectStateSection {
  state: ProjectState;
  title: string;
  color: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  projects: Project[];
}
