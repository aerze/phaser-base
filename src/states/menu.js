import Phaser from 'phaser-ce'

export default class MenuState extends Phaser.State {
  create () {
    const centerX = this.game.canvas.width / 2
    const centerY = this.game.canvas.height / 2

    this.game.stage.backgroundColor = '#3E80BE'

    const playButton = this.game.add.sprite(centerX, centerY, 'buttons', 'blue_button00.png')
    playButton.anchor.set(0.5, 0.5)
    playButton.inputEnabled = true
    playButton.events.onInputUp.add(() => {
      this.game.state.start('game')
    })

    const buttonText = this.game.add.text(centerX, centerY, 'Play', { fill: '#FFFFFF' })
    buttonText.anchor.set(0.5, 0.5)
  }
}
