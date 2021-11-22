export abstract class Shape {
  static #counter: number = 0;
  index: number;
  constructor() {
    this.index = Shape.#counter;
    Shape.#counter++;
  }
}
