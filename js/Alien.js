"use strict";
class Alien extends Entity {
  #eventDispatcher;

  constructor(x, y, eventDispatcher) {
    super(x, y, 75, 0, 40, 25, "white");
    this.#eventDispatcher = eventDispatcher;
  }

  get isNearTheSide() {
    return (
      (this.dx < 0 && this.x < 10) || (this.dx > 0 && this.x > 790 - this.width)
    );
  }

  changeDirection() {
    this.dx *= -1.025;
    this.y += 10;
  }

  inCollisionWith(anything) {
    if (super.inCollisionWith(anything)) {
      this.kill();
      anything.kill();
    }
  }

  kill() {
    super.kill();
    this.#eventDispatcher.add(EventDispatcher.Event.ALIEN_KILLED);
  }
}
