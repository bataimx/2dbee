import k from '../kaboom';

export const SPEED = 120;

export function addBackground() {
  k.add([
    k.sprite('bg'),
    k.scale(k.width() / 240, k.height() / 240),
    k.layer('bg'),
  ]);
}

export function addBirdy(config) {
  const {
    flySpeed = 0.5,
    isSolid = false
  } = config;
  const useBody = isSolid ? k.solid() : k.body();
  const birdy = k.add([
    k.sprite('honey', {
      animSpeed: flySpeed,
      frame: 0
    }),
    k.area(k.vec2(0, 20), k.vec2(45)),
    k.layer('obj'),
    k.pos(k.width() / 4, k.height() / 2),
    useBody
  ]);

  birdy.scale = k.vec2(0.4);
  birdy.play('fly');
  return birdy;
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
      animSpeed: 0.02
    }),
    frog: k.sprite('tileMap', {
      frame: 418
    })
  }
}
