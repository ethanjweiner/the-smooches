export enum Bucket {
  lady = 'lady',
  bentley = 'bentley',
  both = 'both',
}

export interface Image {
  src: string;
  bucket: Bucket;
  caption?: string;
}
