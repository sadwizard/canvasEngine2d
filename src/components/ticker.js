import requestAnimationFramePolifil from '../vendor/rafPolifil.js';

export default class Ticker {
    constructor(ctx, clearSize, FPS) {
        this.clearSize = clearSize;
        this.id = null;
        this.FPS = FPS || 1000 / 60;
        this.updateFunc = () => {};
        this.ctx = ctx;
        this.time = null;

        this.tick = () => {
            var now = Date.now();

            if (this.updateFunc && now - this.time >= this.FPS) {
                this.ctx.clearRect(0, 0, this.clearSize.w, this.clearSize.h);

                this.updateFunc(now);
                this.time = now;
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