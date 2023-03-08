export interface Post {
  id?: number;
  videoId: string;
  title: string;
  link: string;
  thumbnail: string;
  description: string;
}


export interface PostResponseData {
  posts: Post[];
  total: Number;
}
