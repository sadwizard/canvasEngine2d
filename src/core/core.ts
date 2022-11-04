import { Body } from '#/display/body';
import Ticker from './ticker';
import Render from './render';
import Collision from '#/collisions/collision';
import { TShapes } from '#/display/shapes/index';
import { Piece } from '#/display/piece';
import { isNill, zIndexComporator } from '#/utils';
import Vector from './vector';

type TSettings = {
    globalGravity?: Vector;
}

export default class GameEngine {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    screen: Record<string, number>;
    objects: Array<TShapes>;
    tickerUpdate: Ticker;
    tickerRender: Ticker;
    renderer: Render;
    collisions: Collision;
    
    globalGravity: Vector;

    constructor(
        node: HTMLCanvasElement,
        width: number,
        height: number,
        backgroundColor: string,
        settings?: TSettings,
    ) {
        if (isNill(node) || isNill(width) || isNill(height)) {
            throw 'Default param was missed!';
        }

        this.ctx = GameEngine.getContext2d(node);

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

        this.globalGravity = settings?.globalGravity ?? new Vector(0, 1);

        return this;
    }

    addBody(...args: TShapes[]) {
        args.forEach((item) => {
            if (item instanceof Piece) {
                this.objects.push(item);
                this.objects.sort(zIndexComporator);
            }
        });

        return this;
    }

    removeBody(id: string) {
        this.objects = this.objects.filter((item) => item.id !== id);
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
            // this.collisions.update(this.objects);
            const options = {
                globalGravity: this.globalGravity,
            };

            this.objects.forEach((item) => {
                item.update(dt, options);
            });
        });

        this.tickerRender.start();
        this.tickerUpdate.start();

        return this;
    }

    stop() {
        this.tickerRender.stop();
        this.tickerUpdate.stop();

        return this;
    }

    print() {
        const drawer: Render['draw'] = this.renderer.draw.bind(this);

        this.ctx.clearRect(0, 0, this.screen.w, this.screen.h);
        this.objects.forEach((item) => {
            item.render(drawer);
        });

        return this;
    }

    static getContext2d(node: HTMLCanvasElement): CanvasRenderingContext2D | never {
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
