class Game {

  constructor(handle, { fps, speed = 1}) {
    this.handle = handle
    this.fps = fps
    this.speed = speed
    this.state = GameState.TITLE_SCREEN
  }

  async start () {
    return await Promise.all([
      this._logicLoop(),
      this._renderLoop()
    ])
  }

  async _renderLoop () {
    console.log('hi')
    return await new Promise(_ => {
      setInterval(async () => {
        await this._render()
      }, 1000/Math.min(this.fps, 300))
    })
  }

  async _render() {

  }

  async _logicLoop () {
    return await new Promise(resolve => {
      const loop = setInterval(async () => {
        if (this.state === GameState.FINISHED) {
          resolve(null)
          clearInterval(loop)
          return;
        }

        if (this.state == GameState.RUNNING) {
          await this._tick()
        }
      }, 1000/(300*this.speed))
    })
  }

  async _tick () {
    console.log(this.state)
  }

}
