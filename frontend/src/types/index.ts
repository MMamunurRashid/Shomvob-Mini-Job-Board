export interface JobInterface {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

export interface ApplicationInterface {
  jobId: string;
  name: string;
  email: string;
  cv: string;
}
