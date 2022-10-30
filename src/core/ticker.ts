import { requestAnimationFrame, cancelAnimationFrame } from '#/vendor/rafPolifil';

export default class Ticker {
    id: number | null;
    fps: number;
    updateFunc: (dt: number) => void;
    tieRender?: boolean;
    time: number; 

    constructor(ctx: CanvasRenderingContext2D, options: { FPS?: number; tieRender?: boolean; }) {
        const { FPS, tieRender = true } = options;
        this.id = null;
        this.fps = FPS || 1000 / 60;
        this.updateFunc = () => {};
        this.tieRender = tieRender;
        this.time = 0;
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

        this.id = requestAnimationFrame(this.tick.bind(this));
    }

    start() {
        this.time = Date.now();
        this.id = requestAnimationFrame(this.tick.bind(this));
    }

    stop() {
        if (this.id !== null) {
            cancelAnimationFrame(this.id);
            this.time = 0;
            this.id = null;
        }
    }

    setUpdateFunc(cb: (dt: number) => void) {
        this.updateFunc = cb;
    }
}
