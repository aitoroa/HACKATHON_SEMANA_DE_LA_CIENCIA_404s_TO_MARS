"use strict";
class EventDispatcher {
  #events;

  constructor() {
    this.#events = [];
  }

  add(event) {
    this.#events.push(event);
  }

  get events() {
    const events = [...this.#events];
    this.#clear();

    return events;
  }

  #clear() {
    this.#events = [];
  }

  static get Event() {
    return {
      ALIEN_KILLED: "alien_killed",
      PLAYER_KILLED: "player_killed",
    };
  }
}
