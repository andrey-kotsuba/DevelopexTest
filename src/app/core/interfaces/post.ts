import { Comment } from './comment';

export interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
  comments?: Comment[];
}
