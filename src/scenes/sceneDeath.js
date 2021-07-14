import k from '../kaboom';
import { addBackground } from './common';

export default function sceneDeath(score) {
  addBackground();

  

  k.add([
    k.text(`${score}`, 20),
    k.pos(k.width() / 2, k.height() / 2),
    k.origin('center'),
  ]);

  k.add([
    k.text(`Press Space...`, 8),
    k.pos(k.width() / 2, (k.height() / 2) - 20),
    k.origin('center'),
  ]);

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