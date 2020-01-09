export default class Render {
    constructor(ctx) {
	   this.ctx = ctx; 
    }

    draw(x, y, deg, drawFunction) {
        this.ctx.save();

        this.ctx.translate(x, y);
        this.ctx.rotate(deg ? deg * (Math.PI / 180) : 0);
        if (drawFunction) {
            drawFunction(this.ctx);
        }

        this.ctx.restore();
    }
}
