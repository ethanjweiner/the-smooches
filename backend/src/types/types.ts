export enum Bucket {
  lady = 'lady',
  bentley = 'bentley',
  both = 'both',
}

export interface Image {
  name: string;
  bucket: Bucket;
  caption?: string;
}

export interface UserData {
  username: string;
  token: string;
}
