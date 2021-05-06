export interface CardItem {
  unique_id: string;
  title: string,
  url: string,
  thumb_url: string,
  filename: string,
  diskspace: number,
  category: number, 
  is_protected: number,
  is_picture: number,
  ext: string,
  created_at: string,
  updated_at: string,
}