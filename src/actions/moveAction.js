import { SPEED } from '../scenes/common';
import ActionBase from './actionBase';

export default class MoveAction extends ActionBase {
  execute(p) {
    p.move(-SPEED, 0);
    super.execute(p);
  }
}