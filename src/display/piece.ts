import { randomColor } from '#/utils';
import Render from '#/core/render';
import Vector from '#/core/vector';
import { TShapeTypes } from '#/constants';
import { TShapes } from './shapes/index';
import { isNill } from '#/utils';

export type TPieceParams = Pick<
    Piece,
	'type' |
	'visible' |
    'zIndex'
>;

export interface IPiece {
	draw(drawer: Render['draw']): void;
    update(dt: number, options: TUpdateOptions): void;
    collision(obj: TShapes): void;
}

export type TUpdateOptions = {
    globalGravity?: Vector 
}

export class Piece implements IPiece {
	id: string;
	type: TShapeTypes;
    visible?: boolean;
    zIndex?: number; 

    constructor(params: TPieceParams) {
        if (isNill(params.type)) {
			throw new Error('Piece required params missed!');
		}

		this.id = randomColor();
		this.type = params.type;
        this.visible = params?.visible ?? true;
        this.zIndex = params?.zIndex ?? undefined;
    }

	draw(render: Render['draw']) {}

    update(dt: number, options: TUpdateOptions) {};

    collision(obj: TShapes) {}
}
