// this file is responsible for bootstrapping game logic

// run this in closure to not pollute global scope
(async () => {
  // grab the canvas element 
  const handle = document.getElementById('canvas')

  // game options
  const options = {
    fps: 60
  }

  // init game with handle
  const game = new Game(handle, options)

  // start game
  await game.start()
})()
