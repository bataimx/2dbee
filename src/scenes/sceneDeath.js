import k from '../kaboom';
import { addBackground, addBirdy } from './common';

const flySpeed = 0.1;

export default function sceneDeath(score) {
  addBackground();

  k.add([
    k.text(`${score}`, 20),
    k.pos(k.width() / 2, k.height() / 2),
    k.origin('center'),
  ]);

  k.add([
    k.text(`Press Space!`, 8),
    k.pos(k.width() / 2, (k.height() / 2) - 20),
    k.origin('center'),
  ]);

  const birdy = addBirdy({
    flySpeed,
    isSolid: true
  });
  birdy.pos.x = (k.width() / 2) - 10;
  birdy.pos.y = (k.height() / 2) + 20;

  setTimeout(() => {
    k.keyPress('space', () => {
      k.go('main');
      k.play('jump');
    });
    k.mouseClick(() => {
      k.go('main');
      k.play('jump');
    });
  }, 500);
};