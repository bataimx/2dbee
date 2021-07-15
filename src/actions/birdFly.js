import k from '../kaboom';
import { SPEED } from "../scenes/common";
import ActionBase from "./actionBase";

export default class BirdFly extends ActionBase {
  execute(p) {
    const middleY = k.height() / 2;
    const {
      flySpeed = 0.01,
      moveSpeed = 2,
      defaultPos: {
        y: defaultPosY = middleY
      } = {}
    } = p;
    const x = p.pos.x;
    const r = 20;
    const y = (defaultPosY + (r * Math.sin(x * flySpeed)));
    p.pos.y = y;
    p.move(-(SPEED * moveSpeed), 0);
    super.execute(p);
  }
}