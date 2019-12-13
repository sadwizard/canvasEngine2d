import requestAnimationFramePolifil from '../vendor/rafPolifil.js';

export default function Ticker(ctx, clearSize) {
    this.clearSize = clearSize;
    this.id = null;
    this.FPS = 1000 / 60;
    this.updateFunc = () => {};
    this.ctx = ctx;
    this.time = null;

    this.tick = () => {
        var now = Date.now();

        if (this.updateFunc && now - this.time >= this.FPS) {
            this.ctx.clearRect(0, 0, this.clearSize.w, this.clearSize.h);

            this.updateFunc(this.ctx, now);
            this.time = now;
        }

        this.id = requestAnimationFrame(this.tick);
    }
}

Ticker.prototype.start = function() {
    this.time = Date.now();
    this.tick.bind(this);
    this.id = requestAnimationFrame(this.tick);
};

Ticker.prototype.stop = function() {
    cancelAnimationFrame(this.id);
    this.time = null;
    this.id = null;
};

Ticker.prototype.setUpdateFunc = function(cb) {
    this.updateFunc = cb;
};
