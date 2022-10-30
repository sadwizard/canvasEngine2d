export interface IRender {
    draw(
        x: number,
        y: number,
        deg: number,
        drawFunction: (ctx: CanvasRenderingContext2D) => void
    ): void;
}

export type TDrawer = Render['draw'];

export default class Render implements IRender {
    ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
	     this.ctx = ctx;
    }

    draw(
        x: number,
        y: number,
        deg: number,
        drawFunction: (ctx: CanvasRenderingContext2D) => void,
) {
        this.ctx.save();

        this.ctx.translate(x, y);
        this.ctx.rotate(deg ? deg * (Math.PI / 180) : 0);
        if (drawFunction) {
            drawFunction(this.ctx);
        }

        this.ctx.restore();
    }
}
