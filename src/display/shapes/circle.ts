import { TDrawer } from '#/core/render';
import { SHAPE_TYPES } from '#/constants';
import { Body, TBodyParams } from '../body';

type TCircleParams = TBodyParams & Pick<
    Circle,
    'fillStyle' |
    'strokeStyle' |
	'lineWidth' |
	'radius'
>;

export class Circle extends Body {
    fillStyle: string;
    strokeStyle: string;
    lineWidth: number;
    radius: number;
 
    constructor(params: Partial<TCircleParams>) {
        super({
            type: SHAPE_TYPES.CIRCLE,
            visible: params.visible,
            position: params.position,
        });

        this.radius = params.radius ?? 10;
        this.fillStyle = params.fillStyle ?? this.id;
		this.strokeStyle = params.strokeStyle ?? '#ddd';
		this.lineWidth = params.lineWidth ?? 0;
    }

    draw(drawer: TDrawer) {
        const { position, angle, radius, fillStyle, strokeStyle, lineWidth } = this;

        drawer(position.x, position.y, angle, (ctx) => {
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            if (lineWidth > 0) {
                ctx.stroke();
            }
        });
    }
}
