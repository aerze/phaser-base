import Phaser from 'phaser-ce'

import BootState from './states/boot'
import LoadState from './states/load'
import MenuState from './states/menu'
import GameState from './states/game'

const game = new Phaser.Game(512, 512, Phaser.AUTO, 'canvas')
game.state.add('boot', new BootState(game))
game.state.add('load', new LoadState(game))
game.state.add('menu', new MenuState(game))
game.state.add('game', new GameState(game))
game.state.start('boot')

window.game = game
