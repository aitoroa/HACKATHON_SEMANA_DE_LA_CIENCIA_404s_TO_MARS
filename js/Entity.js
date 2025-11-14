"use strict";
class Entity {
  #x;
  #y;
  #dx;
  #dy;
  #width;
  #height;
  #color;
  #alive;

  constructor(x, y, dx, dy, width, height, color) {
    this.#x = x;
    this.#y = y;
    this.#dx = dx;
    this.#dy = dy;
    this.#width = width;
    this.#height = height;
    this.#color = color;
    this.#alive = true;
  }

  get x() {
    return this.#x;
  }

  set x(x) {
    this.#x = x;
  }

  get y() {
    return this.#y;
  }

  set y(y) {
    this.#y = y;
  }

  get dx() {
    return this.#dx;
  }

  set dx(dx) {
    this.#dx = dx;
  }

  get dy() {
    return this.#dy;
  }

  set dy(dy) {
    this.#dy = dy;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get color() {
    return this.#color;
  }

  get isAlive() {
    return this.#alive;
  }

  move(delta) {
    this.#x += Math.round(delta * this.#dx);
    this.#y += Math.round(delta * this.#dy);
  }

  kill() {
    this.#alive = false;
  }

  inCollisionWith(other) {
    if (!this.isAlive || !other.isAlive) {
      return false;
    }
    if (this.#x + this.#width < other.x) {
      return false;
    }
    if (this.#y + this.#height < other.y) {
      return false;
    }
    if (this.#x > other.x + other.width) {
      return false;
    }
    if (this.#y > other.y + other.height) {
      return false;
    }

    return true;
  }
}
