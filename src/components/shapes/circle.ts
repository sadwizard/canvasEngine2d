import Vector from '../vector';
import { SHAPE_TYPES } from '../constants';
import { Body, TBodyRequiredParams } from '../body';

type TImageParams = TBodyRequiredParams & Pick<
    Circle,
    'fillStyle' |
    'strokeStyle' |
	'strokeWidth' |
	'radius'
> & { positions?: Vector };

export class Circle extends Body {
    fillStyle: string;
    strokeStyle: string;
    strokeWidth: number;
    radius: number;
 
    constructor(params: Partial<TImageParams>) {
        super({
            type: SHAPE_TYPES.CIRCLE,
            position: params.position,
        });

        const defaults = {
            type: SHAPE_TYPES.CIRCLE,
            fillStyle: this.id,
            strokeStyle: 0,
            strokeWidth: 0,
            radius: 10,
        };

        this.radius = params.radius ?? 10;
        this.fillStyle = params.fillStyle ?? this.id;
		this.strokeStyle = params.strokeStyle ?? '#ddd';
		this.strokeWidth = params.strokeWidth ?? 0;
    }

    draw(drawer) {
        const { position, angle, radius, fillStyle, strokeStyle, strokeWidth } = this;

        drawer(position.x, position.y, angle, (ctx) => {
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.strokeWidth = strokeWidth;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            if (strokeWidth > 0) {
                ctx.stroke();
            }
        });
    }
}
