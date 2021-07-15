import k from './kaboom';
import mainScene from './scenes/mainScene';
import sceneDeath from './scenes/sceneDeath';
import welcomeScene from './scenes/welcomeScene';

k.loadSprite('bg', './bg.png');
k.loadSprite('birdy', './birdy.png');
k.loadSprite('honey', './honey.png', {
  sliceX: 2,
  sliceY: 0,
  anims: {
    fly: { from: 0, to: 1 },
  }
});
k.loadSprite('pipe', './pipe.png');
k.loadSprite('brick', './brick.png');
k.loadSprite('tileMap', './tilemap.png', {
  sliceX: 30,
  sliceY: 30,
  anims: {
    blackBirdFly: { from: 441, to: 443 },
    blackBeeFly: { from: 320, to: 322 },
    frogJump: { from: 419, to: 419 },
    frogStand: { from: 418, to: 418 },
  }
});
k.loadSound('archive', './sounds/archive.mp3');
k.loadSound('jump', './sounds/jump.mp3');
k.loadSound('bgMusic', './sounds/Upbeat-Background-Music.mp3');

k.scene('sceneDeath', sceneDeath);
k.scene('main', mainScene);
k.scene('welcomeScene', welcomeScene)

k.start('welcomeScene');
