class MainScene extends TitleScene {

  constructor(name, game, handle) {
    super(name, game, handle)

    this.bird = new Bird(game, handle, super.floor)
    this.pipes = []
    this.score = 0
  }

  tick () {
    super.tick()
    this.bird.tick()

    if (this.bird.dead) {
      super.setScroll(false)
    }

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

        this.pipes = this.pipes.filter(pipe => pipe.x+pipe.pipe.width > 0)
        this.pipes.forEach(pipe => { 
          pipe.tick() 
          if (pipe.x < this.bird.x && !pipe.tracked) {
            pipe.tracked = true
            this.score += 1
          }
        })
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

    if (this.game.state == GameState.RUNNING) {
      super._text(this.score, 125)
    }

    if (this.game.debug) {
      this.ctx.font = `30px monospace`
      this.ctx.fillStyle = `yellow`
      this.ctx.fillText(`PIPES IN MEMORY: ${this.pipes.length}`, 0, 60)
      this.ctx.fillText(`BIRD ROTATION: ${this.bird.rotation.toFixed(2)}`, 0, 90)
      this.ctx.fillText(`BIRD Y: ${this.bird.y.toFixed(2)*-1}`, 0, 120)
      this.ctx.fillText(`BIRD VELOCITY: ${this.bird.dY.toFixed(2)*-1}`, 0, 150)
      this.ctx.fillText(`BIRD ALIVE: ${!this.bird.dead}`, 0, 180)
    }
  }

  processInput(key) {
    if (key === ' ') {
      if (this.game.state == GameState.TITLE_SCREEN) {
        this.game.state = GameState.RUNNING
      }

      this.bird.unfreeze()
      this.bird.jump()
    }
  }

}