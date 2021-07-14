import k from '../kaboom';
import { addBackground, tileMap } from './common';

const PIPE_OPEN = 85;
const PIPE_MIN_HEIGHT = 16;
const JUMP_FORCE = 280;
const SPEED = 120;
const CEILING = -60;
const gravity = 1200;
const flySpeed = 0.03;
const bgMusic = null;

export default function mainScene() {
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
  const birdy = addBirdy();
  const score = addScore();

  birdy.action(() => {
    if (birdy.pos.y >= k.height() || birdy.pos.y <= CEILING) {
      k.go('sceneDeath', score.value);
      this.bgMusic.stop();
    }
  });

  k.keyPress('space', () => {
    birdy.jump(JUMP_FORCE);
    k.play('jump');
  });

  k.mouseClick(() => {
    birdy.jump(JUMP_FORCE);
    k.play('jump');
  });

  birdy.collides('pipe', () => {
    k.go('sceneDeath', score.value);
    this.bgMusic.stop();
  });

  birdy.collides('blackBird', () => {
    k.go('sceneDeath', score.value);
    this.bgMusic.stop();
  });

  birdy.collides('point', (p) => {
    countScore(score);
    k.destroy(p);
  });

  k.action('pipe', (p) => {
    p.move(-SPEED, 0);
    if (p.pos.x < -k.width() / 2) {
      k.destroy(p);
    }
  });

  k.action('point', (p) => {
    p.move(-SPEED, 0);
    if (p.pos.x < -k.width() / 2) {
      k.destroy(p);
    }
  });

  k.action('blackBird', (p) => {
    const flySpeed = p.isBee ? 0.005 : 0.01;
    const moveSpeed = p.isBee ? 1.5 : 2;
    const yPos = p.defaultPos.y;
    const x = p.pos.x;
    const r = 20;
    const y = (yPos + (r * Math.sin(x * flySpeed)));
    p.pos.y = y;
    p.move(-(SPEED * moveSpeed), 0);
    if (p.pos.x < -k.width() / 2) {
      k.destroy(p);
    }
  });

  const loop = {
    value: 0
  };
  k.loop(1, () => {
    let lv = 0;
    switch (true) {
      case loop.value >= 5 && loop.value <= 7:
      case loop.value >= 8 && loop.value > 7 && loop.value % 3 == 0:
        lv = 1;
        break;
      default:
        lv = 0;
        break;
    }
    if (loop.value >= 8 && k.rand(0, 1) > 0.85) {
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

function addBirdy() {
  const birdy = k.add([
    k.sprite('honey', {
      animSpeed: flySpeed,
      frame: 0
    }),
    k.layer('obj'),
    k.pos(k.width() / 4, k.height() / 2),
    k.body(),
  ]);

  birdy.scale = k.vec2(0.4);
  birdy.play('fly');
  return birdy;
}

function spawnBird() {
  const h1 = k.rand(PIPE_MIN_HEIGHT, k.height() - PIPE_MIN_HEIGHT - PIPE_OPEN);
  const blackBirdFly = k.add([
    tileMap().blackBird,
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
    k.pos(k.width(), h1),
    'blackBird',
    {
      isBee: true,
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