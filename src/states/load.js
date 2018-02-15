import Phaser from 'phaser-ce'

class LoadState extends Phaser.State {
  preload () {
    const fontOptions = { font: '30px sans-serif', fill: '#ffffff' }
    this.game.add.text(10, 10, 'loading..', fontOptions)
    this.game.load.atlasXML('buttons', 'assets/ui-pack/Spritesheet/blueSheet.png', 'assets/ui-pack/Spritesheet/blueSheet.xml')
    this.game.load.atlas('doux', `/assets/dino/doux.png`, `/assets/dino/doux.json`, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY)
    this.game.load.atlas('mort', `/assets/dino/mort.png`, `/assets/dino/mort.json`, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY)
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.stage.backgroundColor = '#3E80BE'
    this.game.state.start('game')
  }
}

export default LoadState
