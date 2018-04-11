import Phaser from 'phaser-ce'

/**
 * Returns a function, that accepts a name and loads a dino atlas by that name
 * @param {Phaser.Game} game
 * @returns {(name: string) => Phaser.Loader}
 */
export default function loadDino (game) {
  return name =>
    game.load.atlas(
      name,
      `/assets/dino/${name}.png`,
      `/assets/dino/${name}.json`,
      Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
    )
}
