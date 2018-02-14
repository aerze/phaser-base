import Phaser from 'phaser-ce'

class LoadState extends Phaser.State {
  preload () {
    const fontOptions = { font: '30px sans-serif', fill: '#ffffff' }
    this.game.add.text(10, 10, 'loading..', fontOptions)
    this.game.load.atlasXML('buttons', 'assets/ui-pack/Spritesheet/blueSheet.png', 'assets/ui-pack/Spritesheet/blueSheet.xml')
  }

  create () {
    console.log('create')
    this.game.stage.backgroundColor = '#3E80BE'
    this.game.state.start('menu')
  }
}

export default LoadState
