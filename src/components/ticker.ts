import requestAnimationFramePolifil from '../vendor/rafPolifil.js';

export default class Ticker {
    id: number;
    fps: number;
    updateFunc?: (dt: number) => void;
    tieRender?: boolean;
    time: number; 

    constructor(ctx: CanvasRenderingContext2D, options) {
        const { FPS, tieRender = true } = options;
        this.id = null;
        this.fps = FPS || 1000 / 60;
        this.updateFunc = () => {};
        this.tieRender = tieRender;
        this.time = null;
    }

    tick() {
        var now = Date.now();
        var dt = now - this.time;

        if (this.tieRender) {

          if (this.updateFunc && dt >= this.fps) {
              this.updateFunc(dt);
              this.time = now;
          }
        } else {
          this.updateFunc(dt);
        }

        this.id = requestAnimationFrame(this.tick);
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
    }

    setUpdateFunc(cb: (dt: number) => void) {
        this.updateFunc = cb;
    }
}
