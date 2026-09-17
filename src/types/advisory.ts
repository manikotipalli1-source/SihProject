export interface Advisory {
  id: string;
  title: string;
  titleMarathi: string;
  body: string;
  bodyMarathi: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}
