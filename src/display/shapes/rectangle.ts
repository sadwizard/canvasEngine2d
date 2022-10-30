import Vector from '#/core/vector';
import { isNill } from '#/utils';
import { Body, TBodyParams } from '../body';
import { TDrawer } from '#/core/render';
import { SHAPE_TYPES } from '#/constants';

export type TRectangleParams = TBodyParams & Pick<
	Rectangle,
	'width' |
	'height' |
	'fillStyle' |
	'strokeStyle' |
	'lineWidth'
>;

export class Rectangle extends Body {
	width: number;
	height: number;
	fillStyle: string;
	strokeStyle: string;
	lineWidth: number;

    constructor(params: TRectangleParams) {
		if (isNill(params.type) || isNill(params.visible) || isNill(params.position)) {
			throw new Error('Rect required params missed!');
		}

        super({
			type: SHAPE_TYPES.RECTANGLE,
			position: params.position,
			visible: params.visible,
		});

		this.width = params.width ?? 10;
		this.height = params.height ?? 10;
		this.fillStyle = params.fillStyle ?? this.id;
		this.strokeStyle = params.strokeStyle ?? '#ddd';
		this.lineWidth = params.lineWidth ?? 0;
    }

    draw(drawer: TDrawer) {
        const { position, width, height, angle, fillStyle, strokeStyle, lineWidth } = this;

        drawer(position.x, position.y, angle, (ctx) => {
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;

            if (lineWidth > 0) {
                ctx.rect(-(width / 2), -(height / 2), width, height);
                ctx.stroke();
            } else {
                ctx.fillRect(-(width / 2), -(height / 2), width, height);
            }
        });
    }

    stroke(ctx: CanvasRenderingContext2D) {
        if (this.lineWidth !== undefined) {
            ctx.stroke();
        }
    }

    getEdgesObject(): {
		left: number,
		top: number,
		right: number,
		bottom: number,
	} { // Clockwise
		return {
			left: this.position.x - this.width / 2,
			top: this.position.y - this.height / 2,
			right: this.position.x + this.width / 2,
			bottom: this.position.y + this.height / 2,
		};
	}

	getEdgesArray(): number[] {
		return [
			this.position.y - this.height / 2,
			this.position.x + this.width / 2,
			this.position.y + this.height / 2,
			this.position.x - this.width / 2,
		];
	}

	getTransformedVerticesObject(): {
		topLeft: Vector,
		topRight: Vector,
		bottomRight: Vector,
		bottomLeft: Vector,
	} {
		const c = this.getEdgesObject();

		return {
			topLeft: new Vector(c.left, c.top).rotateToPoint(this.position, this.angle),
			topRight: new Vector(c.right, c.top).rotateToPoint(this.position, this.angle),
			bottomRight: new Vector(c.right, c.bottom).rotateToPoint(this.position, this.angle),
			bottomLeft: new Vector(c.left, c.bottom).rotateToPoint(this.position, this.angle),
		};
	}

	getTransformedVerticesArray(): Vector[] {
		const c = this.getEdgesObject();

		return [
			new Vector(c.left, c.top).rotateToPoint(this.position, this.angle),
			new Vector(c.right, c.top).rotateToPoint(this.position, this.angle),
			new Vector(c.right, c.bottom).rotateToPoint(this.position, this.angle),
			new Vector(c.left, c.bottom).rotateToPoint(this.position, this.angle),
		];
	}

    getNormals() {
		const vertices = this.getTransformedVerticesArray();
		let norms = [], p1, p2, n;

		for(let i = 1; i < vertices.length; i++) {
			let p1 = vertices[i - 1],
				p2 = vertices[i];

			n = new Vector(p2.x - p1.x, p2.y - p1.y).normalR();
			norms.push(n);
		}

		return norms;
    }
}
