export interface Post {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  likes: number;
  image: string;
  comments: number;
  liked: boolean;
  saved: boolean;
  location: string;
}

export interface UserInteraction {
  liked: boolean;
  saved: boolean;
}

export interface PostWithInteractions extends Post {
  userInteractions: UserInteraction;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
}
