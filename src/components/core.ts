import { Body } from './body';
import Ticker from './ticker';
import Render from './render';
import Collision from './collision';
import type { TShapes } from './shapes/index';

export default class GameEngine {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    screen: Record<string, number>;
    objects: Array<TShapes>;
    tickerUpdate: Ticker;
    tickerRender: Ticker;
    renderer: Render;
    collisions: Collision;

    constructor(
        node: HTMLCanvasElement,
        width: number,
        height: number,
        backgroundColor: string,
    ) {
        const FPS = 1000 / 40;

        this.canvas = node;
        this.ctx = node.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.backgroundColor = backgroundColor;
        this.screen = {
            w: width,
            h: height,
            wh: width / 2,
            hh: height / 2,
        };

        this.ctx.globalAlpha = 1;
        this.objects = [];
        this.tickerUpdate = new Ticker(this.ctx, { FPS, tieRender: true });
        this.tickerRender = new Ticker(this.ctx, { tieRender: false })
        this.renderer = new Render(this.ctx);
        this.collisions = new Collision();

        return this;
    }

    addBody(...args: TShapes[]) {
        args.forEach((item) => {
            if (item instanceof Body) {
                this.objects.push(item);
            }
        });
    }

    removeBody(id: string) {
        const index: number = this.objects.findIndex((item) => item.id === id);
        delete this.objects[index];
    }

    run() {
        const drawer: Render['draw'] = this.renderer.draw.bind(this);
        this.tickerRender.setUpdateFunc(() => {
        this.ctx.clearRect(0, 0, this.screen.w, this.screen.h);
            this.objects.forEach((item) => {
                item.render(drawer);
            });
        });

        this.tickerUpdate.setUpdateFunc((dt: number) => {
        this.collisions.update(this.objects);
            this.objects.forEach((item) => {
                item.update(dt);
            });
        });

        this.tickerRender.start();
        this.tickerUpdate.start();
    }

    stop() {
      this.tickerRender.stop();
      this.tickerUpdate.stop();
    }
}
