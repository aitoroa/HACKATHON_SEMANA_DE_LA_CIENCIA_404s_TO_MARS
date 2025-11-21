"use strict";
class Shot extends Entity {
  constructor(x, y) {
    super(x, y, 0, -600, 24, 56, "yellow");
  }

  get isAlive() {
    return super.isAlive && this.y > 0;
  }
}
