import { User } from '@/modules/users/user.model';

export interface IPost {
  id: number;
  title: string;
  content: string;
  image: string;
  author: User;
}

export interface IPostCreationAttr {
  title: string;
  content: string;
  userId: number;
  image: string;
}
