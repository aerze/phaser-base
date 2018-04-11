import Phaser from 'phaser-ce'

import MainState from './state'

const game = new Phaser.Game(512, 512, Phaser.AUTO, 'canvas')
game.state.add('main', new MainState(game))
window.game = game

game.state.start('main')
