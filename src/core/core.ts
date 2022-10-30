import { Body } from '#/display/body';
import Ticker from './ticker';
import Render from './render';
import Collision from '#/collisions/collision';
import type { TShapes } from '#/display/shapes/index';
import { Piece } from '#/display/piece';
import { isNill } from '#/utils';

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
        if (isNill(node) || isNill(width) || isNill(height)) {
            throw 'Default param was missed!';
        }

        this.ctx = this.getContext2d(node);

        const FPS = 1000 / 60;

        this.canvas = node;
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.backgroundColor = backgroundColor ?? '#333';
        this.screen = {
            w: width,
            h: height,
            hw: width / 2,
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
            if (item instanceof Piece) {
                this.objects.push(item);
            }
        });
    }

    removeBody(id: string) {
        const index: number = this.objects.findIndex((item) => item.id === id);
        return delete this.objects[index];
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

    print() {
        const drawer: Render['draw'] = this.renderer.draw.bind(this);

        this.ctx.clearRect(0, 0, this.screen.w, this.screen.h);
        this.objects.forEach((item) => {
            item.render(drawer);
        });
    }

    getContext2d(node: HTMLCanvasElement): CanvasRenderingContext2D | never {
        try {
            const ctx = node.getContext('2d');

            if (!isNill(ctx)) {
                return ctx;
            }

            throw 'Get getContext("2d") error!';
        } catch(e) {
            throw 'Get getContext("2d") error!';
        }
    }
}
