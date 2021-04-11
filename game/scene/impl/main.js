class MainScene extends TitleScene {

  constructor(name, game, handle) {
    super(name, game, handle)

    this.bird = new Image()
    this.bird.src = './assets/images/bird.png'
    this.shiftCounter = 0;
    this.shift = 0
  }

  async tick () {
    super.tick()

    this.shift += 6
    if (this.shift >= this.bird.width) {
      this.shift = 0
    }
  }

  async render () {
    super.render()

    if (this.game.state == GameState.TITLE_SCREEN) {
      this.ctx.drawImage(this.bird, 160*Math.floor((this.shift/160)), 0, 160, 160, this.handle.width/10, this.handle.height/2.8, 160, 160)
    
      super._renderTitleText()
    }

  }

  async processInput(key) {
    if (key == ' ') {
      this.game.state = GameState.RUNNING
    }
  }

}