import Vector from '#/core/vector';
import { TDrawer } from '#/core/render';
import { SHAPE_TYPES } from '#/constants';
import { Piece, TPieceParams } from './piece';
import { TShapes } from './shapes/index';

export type TGroupParams = {
    position?: Vector;
    width: number;
    height: number;
    children?: TShapes[];
} & TPieceParams;

export class Group extends Piece {
    position: Vector;
    children: TShapes[];
	width: number;
	height: number;

    constructor(params: TGroupParams) {
        super({
            type: SHAPE_TYPES.GROUP,
            visible: params.visible,
        });

        this.position = params.position ?? new Vector(0, 0);
        this.width = params.width ?? 0;
        this.height = params.height ?? 0;
        this.children = params.children ?? [];
    }

    add(...args: TShapes[]) {
        args.forEach((item) => {
            if (item instanceof Piece) {
                this.children.push(item);
            }
        });
    }

    removeBody(id: string) {
        const index: number = this.children.findIndex((item) => item.id === id);
        return delete this.children[index];
    }

    render(drawer: TDrawer) {
        this.children.forEach((child: TShapes) => {
            child.render(drawer);
        });
    }
}
