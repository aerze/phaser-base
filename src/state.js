import Phaser from 'phaser-ce'

/**
 * @param {Phaser.Game} game
 * @param {string} name
 */
function loadAtlas (game, name) {
  game.load.atlas(
    name,
    `/assets/dino/${name}.png`,
    `/assets/dino/${name}.json`,
    Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
  )
}

const PLAYER_SPEED = 10
const CANDY_LIFESPAN = 2000

class mainState extends Phaser.State {
  constructor () {
    super()

    this.collectCandy = this.collectCandy.bind(this)
  }

  preload () {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true

    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
    this.game.renderer.renderSession.roundPixels = false
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    const names = ['doux', 'mort', 'tard', 'vita']
    names.forEach(name => loadAtlas(this.game, name))

    this.game.load.image('candy', '/assets/green_candy.png')
    this.game.load.audio('crunch', '/assets/crunch.wav')

    this.game.stage.backgroundColor = '#3E80BE'
  }

  create () {
    this.candy = this.game.add.sprite(100, 50, 'candy')
    this.p1 = this.game.add.sprite(100, 100, 'doux')
    this.p2 = this.game.add.sprite(200, 200, 'mort')

    this.candy.scale.set(0.1, 0.1)
    this.candy.lifespan = 2000

    this.game.input.gamepad.start()
    this.pad = [this.game.input.gamepad.pad1, this.game.input.gamepad.pad2]

    this.game.physics.enable(this.candy, Phaser.Physics.ARCADE)
    this.candy.body.collideWorldBounds = true

    this.game.physics.enable(this.p1, Phaser.Physics.ARCADE)
    this.p1.body.collideWorldBounds = true
    this.p1.score = 0
    this.p1.body.bounce.set(0.5, 0.5)
    this.p1.body.drag.set(150, 150)
    this.p1.body.maxVelocity = 200

    this.game.physics.enable(this.p2, Phaser.Physics.ARCADE)
    this.p2.body.collideWorldBounds = true
    this.p2.score = 0
    this.p2.body.bounce.set(0.5, 0.5)
    this.p2.body.drag.set(150, 150)
    this.p2.body.maxVelocity = 200

    this.crunch = this.game.add.audio('crunch')

    this.p1text = this.game.add.text(0, 0, `Score: ${this.p1.score}`, {
      fill: '#9999ff'
    })
    this.p2text = this.game.add.text(
      this.game.canvas.width,
      0,
      `Score: ${this.p2.score}`,
      { fill: '#ff9999' }
    )
    this.p2text.anchor.set(1, 0)
  }

  reviveCandy () {
    const x = Phaser.Math.random(0, 512)
    const y = Phaser.Math.random(20, 512)
    this.candy.reset(x, y)
    this.candy.lifespan = CANDY_LIFESPAN
  }

  collectCandy (player, candy) {
    player.score += 1
    player.body.mass = player.score || 1
    this.crunch.play()
    candy.kill()
  }

  update () {
    if (
      this.game.input.gamepad.supported &&
      this.game.input.gamepad.active &&
      this.game.input.gamepad.pad1.connected
    ) {
      const axisX = Number(this.pad[0].axis(Phaser.Gamepad.AXIS_0))
      const axisY = Number(this.pad[0].axis(Phaser.Gamepad.AXIS_1))

      if (Math.abs(axisX) === 1) {
        this.p1.body.velocity.x -= PLAYER_SPEED * axisX * -1
      }

      if (Math.abs(axisY) === 1) {
        this.p1.body.velocity.y -= PLAYER_SPEED * axisY * -1
      }

      if (this.pad[0].isDown(Phaser.Gamepad.BUTTON_1)) {
        console.log('x diff', this.p1.x - this.p2.x)
        console.log('y diff', this.p1.y - this.p2.y)
      }
    }

    if (
      this.game.input.gamepad.supported &&
      this.game.input.gamepad.active &&
      this.game.input.gamepad.pad2.connected
    ) {
      const axisX = Number(this.pad[1].axis(Phaser.Gamepad.AXIS_0))
      const axisY = Number(this.pad[1].axis(Phaser.Gamepad.AXIS_1))

      if (Math.abs(axisX) === 1) {
        this.p2.body.velocity.x -= PLAYER_SPEED * axisX * -1
      }

      if (Math.abs(axisY) === 1) {
        this.p2.body.velocity.y -= PLAYER_SPEED * axisY * -1
      }
    }

    this.game.physics.arcade.collide(this.p1, this.p2)

    this.game.physics.arcade.overlap(this.p1, this.candy, this.collectCandy)
    this.game.physics.arcade.overlap(this.p2, this.candy, this.collectCandy)

    if (!this.candy.alive) {
      this.reviveCandy()
    }

    this.p1text.setText(`Score: ${this.p1.score}`)
    this.p2text.setText(`Score: ${this.p2.score}`)
  }
}

export default mainState
