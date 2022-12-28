export class Queue<T> {
  #items: T[];

  constructor(initialItems?: T[]) {
    this.#items = initialItems || [];
  }

  enqueue(...items: T[]) {
    this.#items.push(...items);
  }

  dequeue() {
    return this.#items.splice(0, 1)[0];
  }

  isEmpty() {
    return this.#items.length === 0;
  }
}

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

export enum Action {
  SET = 'SET',
  DELETE = 'DELETE',
}

export interface UserData {
  username: string;
  token: string;
}
