import Phaser from 'phaser-ce'
import loadDino from './utils/loadDino'
import { CLIENT_RENEG_WINDOW } from 'tls'

const DARK_BLUE = '#3E80BE'

class mainState extends Phaser.State {
  // constructor () {
  //   super()
  // }

  preload () {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true

    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
    this.game.renderer.renderSession.roundPixels = false
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    const names = ['doux', 'mort', 'tard', 'vita']
    names.forEach(loadDino(this.game))

    this.game.stage.backgroundColor = DARK_BLUE
  }

  create () {
    this.game.input.gamepad.start()
    this.pad = [this.game.input.gamepad.pad1, this.game.input.gamepad.pad2]

    this.p1 = this.game.add.sprite(100, 100, 'doux')
    this.p1.scale.set(2)
    this.game.physics.enable(this.p1, Phaser.Physics.ARCADE)
    this.p1.body.collideWorldBounds = true
    this.p1.score = 0

    this.p2 = this.game.add.sprite(200, 200, 'mort')
    this.game.physics.enable(this.p2, Phaser.Physics.ARCADE)
    this.p2.body.collideWorldBounds = true
    this.p2.score = 0

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

  update () {
    const { supported, active, pad1, pad2 } = this.game.input.gamepad
    if (supported && active && pad1.connected) {
      const axisX = Math.round(Number(pad1.axis(Phaser.Gamepad.AXIS_0)))
      const axisY = Math.round(Number(pad1.axis(Phaser.Gamepad.AXIS_1)))
      console.log('p1', 'axisX', axisX, 'axisY', axisY)
    }

    if (supported && active && pad2.connected) {
      const axisX = Math.round(Number(pad2.axis(Phaser.Gamepad.AXIS_0)))
      const axisY = Math.round(Number(pad2.axis(Phaser.Gamepad.AXIS_1)))
      console.log('p2', 'axisX', axisX, 'axisY', axisY)
    }

    this.game.physics.arcade.collide(this.p1, this.p2)

    this.game.debug.bodyInfo(this.p1, 32, 32)
    // this.game.debug.body(this.p1)
  }
}

export default mainState
