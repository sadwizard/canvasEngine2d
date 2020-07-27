import requestAnimationFramePolifil from '../vendor/rafPolifil.js';

export default class Ticker {
    constructor(ctx, options) {
        const { FPS, tieRender = true } = options;
        this.id = null;
        this.FPS = FPS || 1000 / 60;
        this.updateFunc = () => {};
        this.tieRender = tieRender;
        this.time = null;

        this.tick = () => {
            if (this.tieRender) {
              var now = Date.now();
              var dt = now - this.time;

              if (this.updateFunc && dt >= this.FPS) {
                  this.updateFunc(dt);
                  this.time = now;
              }
            } else {
              this.updateFunc();
            }

            this.id = requestAnimationFrame(this.tick);
        }
    }

    start() {
        this.time = Date.now();
        this.tick.bind(this);
        this.id = requestAnimationFrame(this.tick);
    }

    stop() {
        cancelAnimationFrame(this.id);
        this.time = null;
        this.id = null;
    };

    setUpdateFunc(cb) {
        this.updateFunc = cb;
    };
}
