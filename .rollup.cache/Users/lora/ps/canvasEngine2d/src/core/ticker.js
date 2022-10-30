import { requestAnimationFrame, cancelAnimationFrame } from '#/vendor/rafPolifil';
var Ticker = /** @class */ (function () {
    function Ticker(ctx, options) {
        var FPS = options.FPS, _a = options.tieRender, tieRender = _a === void 0 ? true : _a;
        this.id = null;
        this.fps = FPS || 1000 / 60;
        this.updateFunc = function () { };
        this.tieRender = tieRender;
        this.time = 0;
    }
    Ticker.prototype.tick = function () {
        var now = Date.now();
        var dt = now - this.time;
        if (this.tieRender) {
            if (this.updateFunc && dt >= this.fps) {
                this.updateFunc(dt);
                this.time = now;
            }
        }
        else {
            this.updateFunc(dt);
        }
        this.id = requestAnimationFrame(this.tick.bind(this));
    };
    Ticker.prototype.start = function () {
        this.time = Date.now();
        this.id = requestAnimationFrame(this.tick.bind(this));
    };
    Ticker.prototype.stop = function () {
        if (this.id !== null) {
            cancelAnimationFrame(this.id);
            this.time = 0;
            this.id = null;
        }
    };
    Ticker.prototype.setUpdateFunc = function (cb) {
        this.updateFunc = cb;
    };
    return Ticker;
}());
export default Ticker;
//# sourceMappingURL=ticker.js.map