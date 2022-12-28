export enum Bucket {
  lady = 'lady',
  bentley = 'bentley',
  both = 'both',
  community = 'community',
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

export interface LoginDetails {
  username: string;
  password: string;
}
