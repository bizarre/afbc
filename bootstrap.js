// this file is responsible for bootstrapping game logic

// run this in closure to not pollute global scope
(async () => {
  // first we grab the canvas element 
  const handle = document.getElementById('canvas')
  // then we set the canvas height to be the width times 9/16 for a 16:9 ratio
  handle.height = handle.width * (9 / 16)

  // game options
  const options = {
    fps: 60
  }

  // init game with handle
  const game = new Game(handle, options)
  
  // start game
  await game.start()
})()
