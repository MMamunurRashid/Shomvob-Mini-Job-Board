export interface JobInterface {
  _id: string;
  title: string;
  companyName: string;
  companyDetails: string;
  salary: string;
  jobType: string;
  experience: string;
  location: string;
  description: string;
  deadline: string;
  createdAt: string;
}

export interface ApplicationInterface {
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  cv: string;
  note?: string;
  createdAt?: string;
}

export interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}