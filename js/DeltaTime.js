class DeltaTime {
  #time;

  constructor() {
    this.reset();
  }

  reset() {
    this.#time = this.#now();
  }

  tick(max) {
    let now = this.#now();
    let delta = Math.min(now - this.#time, max);
    this.#time = now;

    return delta;
  }

  isElapsed(time) {
    let now = this.#now();

    return time <= now - this.#time;
  }

  #now() {
    return Date.now() / 1000;
  }
}
