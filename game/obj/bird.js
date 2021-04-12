class Bird {

  constructor (game, handle, floor) {
    this.game = game
    this.handle = handle
    this.floor = floor
    this.ctx = handle.getContext('2d')

    this.bird = new Image()
    this.bird.src = './assets/images/bird.png'
    this.shiftCounter = 0
    this.shift = 0
    this.frozen = true
    this.dead = false
    this.rotation = 0

    this.dY = 1
    this.y = this.handle.height/2.8
    this.x = this.handle.width/6
  }

  tick () {
    if (!this.dead) {
      this.shift += 5
      if (this.shift >= this.bird.width) {
        this.shift = 0
      }
    }

    if (!this.frozen && !this.dead) {
      if (this.y >= this.handle.height - this.floor.height) {
        this.dead = true
        return
      }

      if (this.dY < 0) {
        this.dY *= 0.98;
        if (Math.abs(this.dY) < 0.15) {
          this.dY = 0.25
        }

        this.y = this.y + this.dY
        this.rotation = Math.max(this.rotation - 0.05, -0.3)
      } else {
        this.dY *= 1.02;
        this.y = this.y + Math.min(this.dY, 10)
        this.rotation = Math.min(this.rotation + 0.0125, 1.5)
      }
    }
  }

  render () {
    this.ctx.setTransform(1, 0, 0, 1, this.x, this.y);
    this.ctx.rotate(this.rotation);
    this.ctx.drawImage(this.bird, 96*Math.floor((this.shift/96)), 0, 96, 96, -96/2, -96/2, 96, 96)
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  jump () {
    this.dY = -3;
  }

  unfreeze () {
    this.frozen = false
  }


}