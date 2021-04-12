class Pipe {

  constructor (game, handle, height, floor, parent) {
    this.game = game
    this.handle = handle
    this.ctx = handle.getContext('2d')
    this.height = height
    this.floor = floor
    this.frozen = false
    this.x = handle.width
    this.pipe = new Image()
    this.pipe.src = './assets/images/pipe.png'
    this.pipeEnd = new Image()
    this.pipeEnd.src = './assets/images/pipeEnd.png'
    this.tracked = false
    this.parent = parent
  }

  render () {
    if (this.pipe.height === 0) {
      return
    }

    // render top
    for (var i = 0; i < (this.height/this.pipe.height)-15; i++) {
      this.ctx.drawImage(this.pipe, this.x, i * this.pipe.height)
    }

    // render lip
    this.ctx.drawImage(this.pipeEnd, this.x-4, ((this.height/this.pipe.height)-15) * this.pipe.height)

    // render bottom
    for (var i = (this.handle.height - this.floor.height)/this.pipe.height; i > this.height/this.pipe.height; i--) {
      this.ctx.drawImage(this.pipe, this.x, i * this.pipe.height)
    }

    // render lip 
    this.ctx.drawImage(this.pipeEnd, this.x-4, this.height/this.pipe.height * this.pipe.height)
  }

  tick () {
    this.x -= Math.max(this.parent.score/10, 1)
  }



}