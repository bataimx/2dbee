import k from '../kaboom';

export function addBackground() {
  k.add([
    k.sprite('bg'),
    k.scale(k.width() / 240, k.height() / 240),
    k.layer('bg'),
  ]);
}

export function tileMap() {
  return {
    goldCoin: k.sprite('tileMap', {
      frame: 78
    }),
    bigGoldCoin: k.sprite('tileMap', {
      frame: 179
    }),
    heart: k.sprite('tileMap', {
      frame: 373
    }),
    blackBird: k.sprite('tileMap', {
      frame: 441,
      animSpeed: 0.09
    }),
    blackBee: k.sprite('tileMap', {
      frame: 320,
      animSpeed: 0.01
    })
  }
}
