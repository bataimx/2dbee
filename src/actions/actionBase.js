import k from '../kaboom';

export default class ActionBase {
  constructor(app) {
    this.app = app;
  }

  execute(p) {
    if (p.pos.x < -k.width() / 2) {
      k.destroy(p);
    }
  }

  checkIsPaused() {
    return !!this.app.isPaused;
  }

  run(p) {
    if (this.checkIsPaused()) {
      return;
    }
    this.execute(p);
  }
}
