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

export interface Image {
  src: string;
  bucket: string;
  caption?: string;
}
