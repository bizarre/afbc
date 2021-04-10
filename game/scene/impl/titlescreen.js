class TitleScreenScene extends Scene {

  constructor(name, handle) {
    super(name, handle)
  }

  async tick () {

  }

  async render () {
    this.ctx.fillStyle = "#41e0c8";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.ctx.font = '200px FlappyBirdRegular'
    const title = 'AFBC'
    const measurement = this.ctx.measureText(title)
    this.ctx.strokeStyle = "black"
    this.ctx.lineWidth = 10;
    this.ctx.strokeText(title, this.handle.width / 2 - measurement.width / 2, this.handle.height / 5)
    this.ctx.fillStyle = "white"
    this.ctx.fillText(title, this.handle.width / 2 - measurement.width / 2, this.handle.height / 5)
  }

}