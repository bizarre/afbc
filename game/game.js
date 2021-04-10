class Game {

  constructor(handle, { fps, speed = 1}) {
    this.handle = handle
    this.ctx = handle.getContext('2d')
    this.fps = fps
    this.speed = speed
    this.state = GameState.TITLE_SCREEN
    this.scene = new TitleScreenScene('title_screen', handle)
  }

  async start () {
    return await Promise.all([
      this._logicLoop(),
      this._renderLoop()
    ])
  }

  async _renderLoop () {
    return await new Promise(_ => {
      setInterval(async () => {
        await this._render()
      }, 1000/Math.min(this.fps, 300))
    })
  }

  async _render() {
    this.ctx.clearRect(0, 0, this.handle.width, this.handle.height)
    await this.scene?.render()
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
    await this.scene?.tick()
  }

}
