class Game {

  constructor(handle, { fps, speed = 1, debug = false}) {
    this.handle = handle
    this.ctx = handle.getContext('2d')
    this.fps = fps
    this.speed = speed
    this.debug = debug
    this.state = GameState.TITLE_SCREEN
    this.scene = new MainScene('scene', this, handle)
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
        this._render()
      }, 1000/Math.min(this.fps, 300))
    })
  }

  _render () {
    this.ctx.clearRect(0, 0, this.handle.width, this.handle.height)

    this.scene?.render()

    if (this.debug) {
      this._renderDebug()
    }
  }

  _renderDebug () {
    this.ctx.font = `30px monospace`
    this.ctx.fillStyle = `white`
    this.ctx.fillText(`STATE: ${this.state.toString()}`, 0, 25)
  }

  async _logicLoop () {
    return await new Promise(resolve => {
      const loop = setInterval(async () => {
        if (this.state === GameState.FINISHED) {
          resolve(null)
          clearInterval(loop)
          return
        }

        this._tick()
      }, 1000/(300*this.speed))
    })
  }

  _tick () {
    this.scene?.tick()
  }

  processInput (key) {
    if (key === 'tab') {
      this.debug = !this.debug
      return
    }

    this.scene?.processInput(key)
  }

}
