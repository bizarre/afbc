class MainScene extends TitleScene {

  constructor(name, game, handle) {
    super(name, game, handle)

    this.bird = new Bird(game, handle, super.floor)
  }

  tick () {
    super.tick()
    this.bird.tick()

    if (this.bird.dead) {
      super.setScroll(false)
    }
  }

  render () {
    super.render()

    if (this.game.state == GameState.TITLE_SCREEN) {
      super._renderTitleText()
    }

    this.bird.render()
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