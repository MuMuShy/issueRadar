export interface Issue {
  id: number;
  title: string;
  number: number;
  body: string;
  repository: string;
  url: string;
  labels: Label[];
  createdAt: Date;
  updatedAt: Date;
  state: string;
  author: {
    login: string;
    avatarUrl: string;
  };
}

export interface Label {
  name: string;
  color: string;
}

export interface SearchParams {
  query: string;
  language?: string;
  labels?: string[];
  page?: number;
  perPage?: number;
}