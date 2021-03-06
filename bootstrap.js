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

  // add input handler forward
  document.body.addEventListener('keydown', (event) => { event.preventDefault(); game.processInput(event.key.toLowerCase()) })
  document.body.addEventListener('touchstart', (_) => { event.preventDefault(); game.processInput(' ') })


  // Cat & Faith both wanted to be first 
  // so now we have this block of code lmao
  const friends = ['Cat', 'Faith', 'Jet']
  document.getElementById('friends').textContent = `
  ${friends.splice(Math.floor(Math.random() * friends.length), 1)}, 
  ${friends.splice(Math.floor(Math.random() * friends.length), 1)} & 
  ${friends[0]}.
`

  // start game
  await game.start()
})()
