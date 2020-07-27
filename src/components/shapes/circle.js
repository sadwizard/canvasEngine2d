import _ from 'lodash';
import Vector from './../vector';
import Shape from './shape';
import { SHAPE_TYPES } from './../constants';

export default class Circle extends Shape {
    constructor(params) {
        super(params);

        const defaults = {
            type: SHAPE_TYPES.CIRCLE,
            position: new Vector(0, 0),
            scale: 1,
            angle: 0,
            fillStyle: this.id,
            strokeStyle: 0,
            strokeWidth: 0,
            radius: 10,
        };

        const extendedOpts = _.extend(defaults, params);

        _.map(Object.keys(extendedOpts), (key) => {
            this[key] = extendedOpts[key];
        });
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
