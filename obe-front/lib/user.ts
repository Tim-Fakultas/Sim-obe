export interface User {
  id: number;
  nipNim: string;
  name: string;
  email: string;
  kodeps: string;
  ps: { namaps: string };
  roles: string[];
}

export interface StudyProgram {
  kodeps: string;
  namaps: string;
}

export interface Role {
  id: number;
  name: string;
}
