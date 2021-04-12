class MainScene extends TitleScene {

  constructor(name, game, handle, introFade = 0) {
    super(name, game, handle)

    this.bird = new Bird(game, handle, super.floor)
    this.pipes = []
    this.score = 0
    this.flash = 0
    this.fade = 0
    this.introFade = introFade
  }

  tick () {
    const bird = this.bird

    super.setScrollSpeed(Math.max(this.score/10, 1) * 0.5)

    super.tick()
    bird.tick()

    this.flash = Math.max(this.flash - 1, 0)
    this.introFade = Math.max(this.introFade - 1, 0)

    if (this.fade > 0) {
      if (this.fade - 1 === 0) {
        this.game.scene = new MainScene('scene', this.game, this.handle, 100)
        this.game.state = GameState.TITLE_SCREEN
      } else {
        this.fade -= 1
      }
    }

    if (bird.dead) {
      super.setScroll(false)
    }

    if (this.game.state == GameState.RUNNING) {
      if (!bird.dead && !bird.frozen) {
       this._tickPipes()

       let {x, y} = {...bird}
       const hiX = x + 96/2
       const hiY = y + 96/2

       for (let i = 0; i < this.pipes.length; i++) {
         const pipe = this.pipes[i]
         const pX = pipe.x
         const pMaxX = pX + pipe.pipe.width

         // if bird within x bounds of pipe
         if ((x >= pX && x <= pMaxX) || (hiX >= pX && hiX <= pMaxX)) {
          
          const top = ((pipe.height/pipe.pipe.height)-15) * pipe.pipe.height
          const bottom = pipe.height/pipe.pipe.height * pipe.pipe.height
  
          // looks confusing because the closer bird is to the bottom of screen the higher y is
          if (y < top || y > bottom || hiY < top || hiY > bottom) {
            bird.dead = true
            bird.dY = 1
            this.flash = 100
            return
          }

         }

       }


      }
    }
  }

  _tickPipes () {
    if (this.pipes.length == 0) {
      this._addPipe()
    } else {
      const lastPipe = this.pipes[this.pipes.length-1]
      if (lastPipe.x < this.handle.width/2) {
        this._addPipe()
      }
    }

    this.pipes = this.pipes.filter(pipe => pipe.x+pipe.pipe.width > 0)
    this.pipes.forEach(pipe => { 
      pipe.tick() 
      if (pipe.x < this.bird.x && !pipe.tracked) {
        pipe.tracked = true
        this.score += 1
      }
    })
  }

  _addPipe () {
    this.pipes.push(new Pipe(this.game, this.handle, this._getRandomPipeHeight(), super.floor, this))
  }

  _getRandomPipeHeight () {
    return Math.random() * (((this.handle.height/3)*2) - this.handle.height/3) + this.handle.height/3
  }

  render () {
    super.render()

    if (this.game.state == GameState.TITLE_SCREEN) {
      super._renderTitleText()
    }
    
    this.pipes.forEach(pipe => pipe.render())
    this.bird.render()

    if (this.game.debug) {
      this.ctx.font = `30px monospace`
      this.ctx.fillStyle = `yellow`
      this.ctx.fillText(`PIPES IN MEMORY: ${this.pipes.length}`, 0, 60)
      this.ctx.fillText(`BIRD ROTATION: ${this.bird.rotation.toFixed(2)}`, 0, 90)
      this.ctx.fillText(`BIRD Y: ${this.bird.y.toFixed(2)*-1}`, 0, 120)
      this.ctx.fillText(`BIRD VELOCITY: ${this.bird.dY.toFixed(2)*-1}`, 0, 150)
      this.ctx.fillText(`BIRD ALIVE: ${!this.bird.dead}`, 0, 180)
    }

    if (this.flash > 0) {
      this.ctx.beginPath()
      this.ctx.fillStyle = `rgba(255, 255, 255, ${1/100*this.flash})`
      this.ctx.rect(0, 0, this.handle.width, this.handle.height)
      this.ctx.fill()
    } else {
      if (this.bird.atBottom() && this.bird.dead) {
        this.ctx.beginPath()
        this.ctx.fillStyle = 'rgba(200, 0, 0, 0.2)'
        this.ctx.rect(0, 0, this.handle.width, this.handle.height)
        this.ctx.fill()
        super._text('YOU DIED!', 125, this.handle.height/2)
        super._text('PRESS SPACE TO TRY AGAIN', 50, this.handle.height/2+50, 0.6)
      }
    }

    if (this.game.state == GameState.RUNNING) {
      super._text(this.score, 125)
    }

    if (this.fade > 0) {
      this.ctx.beginPath()
      this.ctx.fillStyle = `rgba(0, 0, 0, ${1/150*(150-this.fade)})`
      this.ctx.rect(0, 0, this.handle.width, this.handle.height)
      this.ctx.fill()
    }

    if (this.introFade > 0) {
      this.ctx.beginPath()
      this.ctx.fillStyle = `rgba(0, 0, 0, ${1/100*this.introFade})`
      this.ctx.rect(0, 0, this.handle.width, this.handle.height)
      this.ctx.fill()
    }
  }

  processInput(key) {
    if (key === ' ') {
      if (this.game.state == GameState.TITLE_SCREEN) {
        this.game.state = GameState.RUNNING
      }

      if (!this.bird.dead) {
        this.bird.unfreeze()
        this.bird.jump()
      } else {
        if (this.bird.atBottom() && this.fade === 0) {
          this.fade = 150
        }
      }
    }
  }

}