class MainScene extends TitleScene {

  constructor(name, game, handle) {
    super(name, game, handle)

    this.bird = new Bird(game, handle, super.floor)
    this.pipes = []
  }

  tick () {
    super.tick()
    this.bird.tick()

    if (this.bird.dead) {
      super.setScroll(false)
    }

    console.log(this.pipes.length)

    if (this.game.state == GameState.RUNNING) {
      if (!this.bird.dead && !this.bird.frozen) {
        if (this.pipes.length == 0) {
          this._addPipe()
        } else {
          const lastPipe = this.pipes[this.pipes.length-1]
          if (lastPipe.x < this.handle.width/2) {
            this._addPipe()
          }
        }

        this.pipes.forEach(pipe => pipe.tick())
      }
    }
  }

  _addPipe() {
    this.pipes.push(new Pipe(this.game, this.handle, this._getRandomPipeHeight(), super.floor))
  }

  _getRandomPipeHeight () {
    return Math.random() * (((this.handle.height/3)*2) - this.handle.height/3) + this.handle.height/3
  }

  render () {
    super.render()

    if (this.game.state == GameState.TITLE_SCREEN) {
      super._renderTitleText()
    }

    this.bird.render()
    this.pipes.forEach(pipe => pipe.render())
  }

  processInput(key) {
    if (key == ' ') {
      if (this.game.state == GameState.TITLE_SCREEN) {
        this.game.state = GameState.RUNNING
      }

      this.bird.unfreeze()
      this.bird.jump()
    }
  }

}