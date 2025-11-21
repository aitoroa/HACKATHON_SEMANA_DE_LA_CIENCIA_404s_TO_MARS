"use strict";
class Player extends Entity {
  #velocity;
  #eventDispatcher;
  #shotDelay;
  #deltaTime;

  constructor(x, y, eventDispatcher) {
    super(x, y, 0, 0, 40, 25, "green");
    this.#velocity = 120;
    this.#eventDispatcher = eventDispatcher;
    this.#shotDelay = 0.3;
    this.#deltaTime = new DeltaTime();
  }

  stop() {
    this.dx = 0;
  }

  toRight() {
    if (this.x < 790 - this.width) {
      this.dx = this.#velocity;
    }
  }

  toLeft() {
    if (this.x > 10) {
      this.dx = -this.#velocity;
    }
  }

  shot() {
    if (this.#deltaTime.isElapsed(this.#shotDelay)) {
      this.#deltaTime.reset();
      return new Shot(Math.round(this.x + this.width / 2), this.y);
    }

    return null;
  }

  kill() {
    super.kill();
    this.#eventDispatcher.add(EventDispatcher.Event.PLAYER_KILLED);
  }
}
