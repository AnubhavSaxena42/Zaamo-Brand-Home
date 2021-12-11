export interface Post {
  brand: string;
  caption: string;
  comments: number;
  id: number;
  likes: number;
  media_id: null | number;
  media_type: string;
  media_url: string;
  post_id: null | number;
  tagged: string[];
  trash: boolean;
}
