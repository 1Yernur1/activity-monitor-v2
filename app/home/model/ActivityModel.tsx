export type ActivityModel = {
  id: number;
  projectId: number;
  projectName: string;
  title: string;
  language: string;
  targetLanguage: string;
  translator: {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
  };
  status: string;
  targetTitle: string | null;
  createdAt: string;
  updatedAt: string;
};
