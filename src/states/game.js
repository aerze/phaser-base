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
  }

  update () {
    var colliding = false

    this.game.physics.arcade.collide(this.p1, this.p2, (p1, p2) => {
      colliding = true
    })

    /**
     * @param {'x'|'y'} axis
     * @param {-1|1} direction
     */
    function handleDirection (axis, direction, p1, p2) {
      p1.position[axis] += MOVEMENT_SPEED * direction
      if (Math.abs(p1.body.velocity[axis]) > RECOVERY_SPEED) {
        if (p1.body.velocity[axis] > 0) {
          p1.body.velocity[axis] += RECOVERY_SPEED * direction
        } else {
          p1.body.velocity[axis] -= RECOVERY_SPEED * direction
        }
      } else {
        p1.body.velocity[axis] = 0
      }

      if (colliding) p2.body.velocity[axis] += MOVEMENT_SPEED * FORCE * direction
    }
    // player 1
    if (this.upKey.isDown) {
      handleDirection('y', -1, this.p1, this.p2)
    }

    if (this.downKey.isDown) {
      handleDirection('y', 1, this.p1, this.p2)
    }

    if (this.leftKey.isDown) {
      handleDirection('x', -1, this.p1, this.p2)
    }

    if (this.rightKey.isDown) {
      handleDirection('x', 1, this.p1, this.p2)
    }

    // player 2

    if (this.wKey.isDown) {
      handleDirection('y', -1, this.p2, this.p1)
    }

    if (this.sKey.isDown) {
      handleDirection('y', 1, this.p2, this.p1)
    }

    if (this.aKey.isDown) {
      handleDirection('x', -1, this.p2, this.p1)
    }

    if (this.dKey.isDown) {
      handleDirection('x', 1, this.p2, this.p1)
    }
  }
}
