import Phaser from 'phaser-ce'

class BootState extends Phaser.State {
  create () {
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)

    this.game.renderer.renderSession.roundPixels = false

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.game.state.start('load')
  }
}

export default BootState
