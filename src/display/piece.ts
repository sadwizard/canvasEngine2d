import { randomColor } from '#/utils';
import Render from '#/core/render';
import { TShapeTypes } from '#/constants';
import { TShapes } from './shapes/index';

export type TPieceParams = Pick<
    Piece,
	'type' |
	'visible'
>;

export interface IPiece {
	draw(drawer: Render['draw']): void;
    update(dt: number): void;
    collision(obj: TShapes): void;
}

export class Piece implements IPiece {
	id: string;
	type: TShapeTypes;
    visible: boolean;

    constructor(params: TPieceParams) {
		this.id = randomColor();
		this.type = params.type;
        this.visible = params.visible ?? true;
    }

	draw(render: Render['draw']) {}

    update(dt: number) {};

    collision(obj: TShapes) {}
}
