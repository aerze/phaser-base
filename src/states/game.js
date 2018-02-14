import Phaser from 'phaser-ce'

export default class GameState extends Phaser.State {
  create () {
    this.game.add.text(100, 100, 'this is a game', { fill: '#FFFFFF' })
  }
}
