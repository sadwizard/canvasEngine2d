import Vector from '#/core/vector';
import { TDrawer } from '#/core/render';
import { SHAPE_TYPES } from '#/constants';
import { Piece, TPieceParams, TUpdateOptions } from './piece';
import { TShapes } from './shapes/index';
import { zIndexComporator } from '#/utils';

export type TGroupParams = {
    name?: string;
    position?: Vector;
    angle?: number;
    width?: number;
    height?: number;
    static?: boolean;
} & TPieceParams;

export class Group extends Piece {
    name: string;
    position: Vector;
    angle: number;
    children: TShapes[];
	width: number;
	height: number;
    static: boolean;

    constructor(params: TGroupParams) {
        super({
            type: SHAPE_TYPES.GROUP,
            visible: params?.visible ?? true,
            zIndex: params?.zIndex,
        });

        this.name = params.name ?? this.id;
        this.position = params?.position ?? new Vector(0, 0);
        this.angle = params.angle ?? 0;
        this.width = params?.width ?? 0;
        this.height = params?.height ?? 0;
        this.static = params?.static ?? false;
        this.children = [];
    }

    add(...args: TShapes[]) {
        args.forEach((item) => {
            if (item instanceof Piece) {            
                this.children.push(item);
                this.children.sort(zIndexComporator)
            }
        });

        return this;
    }

    removeBody(id: string) {
        this.children = this.children.filter((item) => item.id !== id);
    }

    render(drawer: TDrawer) {
        drawer(this.position.x, this.position.y, this.angle, () => {
            this.children.forEach((child: TShapes) => {
                child.render(drawer);
            });
        })
    }

    update(dt: number, options: TUpdateOptions) {
        if (!this.static) {
            this.children.forEach(child => child.update(dt, options));
        }
    } 
}
