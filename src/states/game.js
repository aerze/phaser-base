import Phaser from 'phaser-ce'

const MOVEMENT_SPEED = 10
const RECOVERY_SPEED = 10
const FORCE = 15
const DRAG = 10

export default class GameState extends Phaser.State {
  create () {
    this.p1 = this.game.add.sprite(100, 100, 'doux')
    this.p1.scale.set(2, 2)
    this.p1.anchor.set(0.5)
    this.game.physics.arcade.enable(this.p1)
    this.p1.body.collideWorldBounds = true
    this.p1.body.drag.set(MOVEMENT_SPEED * DRAG)
    this.p1.body.allowDrag = true
    this.p1.body.onWorldBounds = new Phaser.Signal()
    this.p1.body.onWorldBounds.add(p1 => console.log('Player 2 wins'))

    this.p2 = this.game.add.sprite(400, 400, 'mort')
    this.p2.scale.set(2, 2)
    this.p2.anchor.set(0.5)
    this.game.physics.arcade.enable(this.p2)
    this.p2.body.collideWorldBounds = true
    this.p2.body.drag.set(MOVEMENT_SPEED * DRAG)
    this.p2.body.allowDrag = true
    this.p2.body.onWorldBounds = new Phaser.Signal()
    this.p2.body.onWorldBounds.add(p2 => console.log('Player 1 wins'))

    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)

    this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W)
    this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S)
    this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A)
    this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D)

    this.game.input.gamepad.start()
    this.pad = [this.game.input.gamepad.pad1, this.game.input.gamepad.pad2]
  }

  update () {
    const test = false
  }
}
