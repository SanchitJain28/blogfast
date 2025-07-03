export interface Blog {
  id: string;
  blog_content: string;
  images: string[];
  created_at?: string;
  updated_at?: string;
  author?: string;
  title?: string;
  tags?: string[];
}
