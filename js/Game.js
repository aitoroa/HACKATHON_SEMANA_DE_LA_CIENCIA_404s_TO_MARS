"use strict";
class Game {
  #renderer;
  #player;
  #aliens;
  #shots;
  #keyboard;
  #deltaTime;
  #eventDispatcher;
  #score;
  #lives;
  #status;

  constructor(id) {
    this.#renderer = new Render2D(id, 800, 600, "black");
    this.#keyboard = new Keyboard();
    this.#deltaTime = new DeltaTime();
    this.#eventDispatcher = new EventDispatcher();
    this.#init();
  }

  #init() {
    this.#restart();
    this.#loop();
  }

  #restart() {
    this.#score = 0;
    this.#lives = 2;
    this.#reload();
  }

  #reload() {
    this.#player = new Player(370, 550, this.#eventDispatcher);
    this.#shots = [];
    this.#aliens = [];
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 12; column++) {
        this.#aliens.push(
          new Alien(100 + column * 50, 50 + row * 30, this.#eventDispatcher)
        );
      }
    }
    this.#status = Game.Status.RUNNING;
  }

  #loop() {
    switch (this.#status) {
      case Game.Status.RUNNING:
        this.#gameLogic();
        break;
      case Game.Status.WIN:
        this.#winLogic();
        break;
      case Game.Status.CONTINUE:
        this.#continueLogic();
        break;
      case Game.Status.GAME_OVER:
        this.#gameoverLogic();
    }
    this.#render();
    window.requestAnimationFrame(() => this.#loop());
  }

  #gameLogic() {
    this.#shotsLogic();
    this.#alienLogic();
    this.#playerLogic();
    this.#update();
    this.#applyEvents();
  }

  #shotsLogic() {
    this.#shots.forEach((shot) =>
      this.#aliens.forEach((alien) => alien.inCollisionWith(shot))
    );
    this.#shots = this.#shots.filter((shot) => shot.isAlive);
  }

  #alienLogic() {
    if (this.#aliens.filter((alien) => alien.isNearTheSide).length > 0) {
      this.#aliens.forEach((alien) => alien.changeDirection());
    }
  }

  #playerLogic() {
    this.#player.stop();
    if (this.#keyboard.is(Keyboard.Key.LEFT)) {
      this.#player.toLeft();
    }
    if (this.#keyboard.is(Keyboard.Key.RIGHT)) {
      this.#player.toRight();
    }
    if (this.#keyboard.is(Keyboard.Key.SPACE)) {
      let shot = this.#player.shot();
      if (shot) {
        this.#shots.push(shot);
      }
    }
    this.#aliens.forEach((alien) => alien.inCollisionWith(this.#player));
  }

  #update() {
    let delta = this.#deltaTime.tick(0.1);
    this.#aliens.forEach((alien) => alien.move(delta));
    this.#player.move(delta);
    this.#shots.forEach((shot) => shot.move(delta));
  }

  #winLogic() {
    if (this.#keyboard.is(Keyboard.Key.ENTER)) {
      this.#reload();
    }
  }

  #continueLogic() {
    if (this.#keyboard.is(Keyboard.Key.ENTER)) {
      this.#reload();
    }
  }

  #gameoverLogic() {
    if (this.#keyboard.is(Keyboard.Key.ENTER)) {
      this.#restart();
    }
  }

  #render() {
    this.#renderer.clear();
    this.#renderer.drawEntity(this.#player);
    this.#aliens.forEach((alien) => this.#renderer.drawEntity(alien));
    this.#shots.forEach((shot) => this.#renderer.drawEntity(shot));
    this.#renderer.gui(this.#score, this.#lives);
    switch (this.#status) {
      case Game.Status.CONTINUE:
        this.#renderer.menu(
          "You are dead, but you have one more life.",
          "Press <ENTER> to try one last time. Good luck!"
        );
        break;
      case Game.Status.GAME_OVER:
        this.#renderer.menu(
          "The 404 error has won. Signal lost. Game Over.",
          "Press <ENTER> to repair your starship, reload all weapons and start a new game..."
        );
        break;

      case Game.Status.WIN:
        this.#renderer.menu(
          "Congratulations! You defeated the invasion and the signal has been restored!",
          "Press <ENTER> to set course for Mars..."
        );
        break;
    }
  }

  #applyEvents() {
    this.#eventDispatcher.events.forEach((event) => {
      switch (event) {
        case EventDispatcher.Event.ALIEN_KILLED:
          this.#score += 10;
          this.#aliens = this.#aliens.filter((alien) => alien.isAlive);
          if (this.#aliens.length === 0 && this.#player.isAlive) {
            this.#status = Game.Status.WIN;
            setTimeout(() => {
              window.location.href =
                "https://adrian-cano-udit.github.io/404s-to-mars/";
            }, 3000);
          }
          break;
        case EventDispatcher.Event.PLAYER_KILLED:
          this.#lives--;
          this.#status =
            this.#lives > 0 ? Game.Status.CONTINUE : Game.Status.GAME_OVER;
          break;
      }
    });
  }

  static get Status() {
    return {
      WIN: "win",
      CONTINUE: "continue",
      GAME_OVER: "game_over",
      RUNNING: "running",
    };
  }
}
