class TitleScene extends Scene {

  constructor(name, game, handle) {
    super(name, game, handle)

    this.floor = new Image()
    this.floor.src = './assets/images/floor.png'
    this.floorOffset = 0

    this.backdrop = new Image()
    this.backdrop.src = './assets/images/backdrop.png'

    this.flashCounter = 0

    this.scroll = true
    this.scrollSpeed = 0.5

    TitleScene.prototype.floor = this.floor
  }

  setScroll (scroll) {
    this.scroll = scroll
  }

  setScrollSpeed (scrollSpeed) {
    this.scrollSpeed = scrollSpeed
  }

  getScrollSpeed () {
    return this.scrollSpeed
  }

  _tickFloor () {
    if (this.scroll) {
      this.floorOffset += this.scrollSpeed
      if (this.floorOffset > this.floor.width) {
        this.floorOffset = 0
      }
    }
  }

  tick () {
    this._tickFloor()

    this.flashCounter += 1
    if (this.flashCounter > 300) {
      this.flashCounter = 0
    }
  }

  _text(text, fontSize = 200, y = this.handle.height / 5, opacity = 1) {
    this.ctx.font = `${fontSize}px FlappyBirdRegular`
    const measurement = this.ctx.measureText(text)
    this.ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`
    this.ctx.lineWidth = fontSize/10
    this.ctx.strokeText(text, this.handle.width / 2 - measurement.width / 2, y)
    this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
    this.ctx.fillText(text, this.handle.width / 2 - measurement.width / 2, y)
  }

  _renderTitleText () {
    // title text
    this._text('AFBC')
    this._text('Another Flappy Bird Clone', 66, this.handle.height / 5 + 66, 0.5)
    if (this.flashCounter < 150) {
      this._text('PRESS SPACE TO START', 75, this.handle.height / 2)
      this._text('OR TAP PHONE', 50, this.handle.height / 2 + 50)
    }
  }

  render () {
    // background
    this.ctx.fillStyle = "#12194f"
    this.ctx.fillRect(0, 0, canvas.width, canvas.height)

    // backdrop
    this.ctx.drawImage(this.backdrop, 0, this.handle.height-this.floor.height-this.backdrop.height)

    // moving terrain
    this.ctx.drawImage(this.floor, -this.floorOffset, this.handle.height-this.floor.height)
    this.ctx.drawImage(this.floor, this.handle.width - this.floorOffset - 1, this.handle.height-this.floor.height)
  }

}