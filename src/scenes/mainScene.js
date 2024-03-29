import BirdFly from '../actions/birdFly';
import MoveAction from '../actions/moveAction';
import k from '../kaboom';
import { addBackground, addBirdy, tileMap } from './common';

const PIPE_OPEN = 85;
const PIPE_MIN_HEIGHT = 16;
const JUMP_FORCE = 280;
const CEILING = -60;
const gravity = 1200;
const flySpeed = 0.03;

export default function mainScene() {
  this.isPaused = false;
  this.bgMusic = k.play('bgMusic', {
    volume: 0.3,
    loop: true
  });
  // define gravity
  k.gravity(gravity);

  k.layers([
    'bg',
    'point',
    'obj',
    'blackBird',
    'ui',
  ], 'obj');

  addBackground();
  this.birdy = addBirdy({ flySpeed });
  const score = addScore();

  this.birdy.action(() => {
    if (this.birdy.pos.y >= k.height() || this.birdy.pos.y <= CEILING) {
      deathScene(this, score);
    }
  });

  k.keyPress('space', () => {
    if ( this.isPaused ) { return; }
    this.birdy.jump(JUMP_FORCE);
    k.play('jump');
  });

  k.mouseClick(() => {
    if ( this.isPaused ) { return; }
    this.birdy.jump(JUMP_FORCE);
    k.play('jump');
  });

  this.birdy.collides('pipe', () => {
    deathScene(this, score);
  });

  this.birdy.collides('blackBird', () => {
    deathScene(this, score);
  });

  this.birdy.collides('point', (p) => {
    if ( this.isPaused ) { return; }
    countScore(score);
    k.destroy(p);
  });

  const moveAction = new MoveAction(this);
  const blackBirdFly = new BirdFly(this);
  k.action('pipe', (p) => { moveAction.run(p) });
  k.action('point', (p) => { moveAction.run(p) });
  k.action('blackBird', (p) => { blackBirdFly.run(p) });

  const loop = {
    value: 0
  };
  k.loop(1, () => {
    let lv = 0;
    switch (true) {
      case score.value < 99 && loop.value >= 5 && loop.value <= 7:
      case score.value < 99 && loop.value >= 8 && loop.value > 7 && loop.value % 3 == 0:
        lv = 1;
        break;
      default:
        lv = 0;
        break;
    }
    if (loop.value >= 8 && k.rand(0, 1) > (0.80 - (score.value / 100))) {
      if (k.rand(0, 1) > 0.85) {
        spawnBird();
      } else {
        spawnBee();
      }
    }
    spawnPipe(lv);
    loop.value++;
  });
};

function deathScene(that, score) {
  that.isPaused = true;
  that.birdy.paused = true;
  that.bgMusic.stop();
  k.wait(2, () => {
    k.go('sceneDeath', score.value);
  });
}

function countScore(score) {
  score.value++;
  score.text = score.value;
  k.play('archive', {
    volume: 0.4,
  });
}

function addScore() {
  return k.add([
    k.text('0', 16),
    k.layer('ui'),
    k.pos(9, 9),
    {
      value: 0,
    },
  ]);
}

function spawnBird() {
  const h1 = k.rand(PIPE_MIN_HEIGHT, k.height() - PIPE_MIN_HEIGHT - PIPE_OPEN);
  const blackBirdFly = k.add([
    tileMap().blackBird,
    k.area(k.vec2(6), k.vec2(24, 19)),
    k.pos(k.width(), h1),
    'blackBird',
    {
      defaultPos: {
        x: k.width(),
        y: h1
      }
    }
  ]);
  blackBirdFly.play('blackBirdFly');
}

function spawnBee() {
  const h1 = k.rand(PIPE_MIN_HEIGHT, k.height() - PIPE_MIN_HEIGHT - PIPE_OPEN);
  const blackBee = k.add([
    tileMap().blackBee,
    k.area(k.vec2(6), k.vec2(22, 16)),
    k.pos(k.width(), h1),
    'blackBird',
    {
      flySpeed: 0.005,
      moveSpeed: 1.5,
      defaultPos: {
        x: k.width(),
        y: h1
      }
    }
  ]);
  blackBee.play('blackBeeFly');
}

function spawnPipe(level) {
  const yMiddlePosition = k.height() / 2;
  const tempP = k.height() / 4;
  const h1 = k.rand(yMiddlePosition - tempP, (yMiddlePosition + tempP) - PIPE_OPEN);
  const h2 = h1 + PIPE_OPEN;

  if (level >= 1) {
    k.add([
      k.sprite('brick'),
      k.origin('botleft'),
      k.pos(k.width(), h1),
      'pipe'
    ]);

    k.add([
      k.sprite('pipe'),
      k.origin('topleft'),
      k.pos(k.width(), h2),
      'pipe'
    ]);
  }

  const coins = [tileMap().goldCoin, tileMap().heart, tileMap().bigGoldCoin];
  const coinSprite = k.choose(coins);
  k.add([
    coinSprite,
    k.origin('botleft'),
    k.pos(k.width(), h1 + (PIPE_OPEN / 2)),
    'point'
  ]);
}