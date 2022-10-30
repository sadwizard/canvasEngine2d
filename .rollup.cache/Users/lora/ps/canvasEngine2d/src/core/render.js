var Render = /** @class */ (function () {
    function Render(ctx) {
        this.ctx = ctx;
    }
    Render.prototype.draw = function (x, y, deg, drawFunction) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(deg ? deg * (Math.PI / 180) : 0);
        if (drawFunction) {
            drawFunction(this.ctx);
        }
        this.ctx.restore();
    };
    return Render;
}());
export default Render;
//# sourceMappingURL=render.js.map