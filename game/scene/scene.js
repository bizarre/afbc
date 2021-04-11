class Scene {

  constructor(name, game, handle) {
    this.name = name
    this.game = game
    this.handle = handle
    this.ctx = handle.getContext('2d')
  }

  async tick () {

  }

  async render () {

  }

  async processInput(key) {

  }

}