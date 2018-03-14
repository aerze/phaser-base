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

class mainState extends Phaser.State {
  preload () {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true

    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
    this.game.renderer.renderSession.roundPixels = false
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    const names = ['doux', 'mort', 'tard', 'vita']
    names.forEach(name => loadAtlas(this.game, name))

    this.game.stage.backgroundColor = '#3E80BE'
  }

  create () {
    this.p1 = this.game.add.sprite(100, 100, 'doux')
    this.p2 = this.game.add.sprite(200, 200, 'mort')
  }

  update () {}
}

export default mainState
