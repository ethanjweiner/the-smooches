export enum Bucket {
  lady = 'lady',
  bentley = 'bentley',
  both = 'lady+bentley',
}

export interface Image {
  src: string;
  bucket: Bucket;
  caption?: string;
}
