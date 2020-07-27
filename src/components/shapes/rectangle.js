import _ from 'lodash';
import Vector from '../vector';
import Shape from './shape';
import { SHAPE_TYPES } from './../constants';

export default class Rectangle extends Shape {
    constructor(params) {
        super(params);

        const defaults = {
            type: SHAPE_TYPES.RECTANGLE,
            position: new Vector(0, 0),
            scale: 1,
            width: 10,
            height: 10,
            angle: 0,
            fillStyle: this.id,
            strokeStyle: 0,
            strokeWidth: 0,
        };

        const extendedOpts = _.extend(defaults, params);

        _.map(Object.keys(extendedOpts), (key) => {
            this[key] = extendedOpts[key];
        });
    }

    draw(drawer) {
        const { position, width, height, angle, fillStyle, strokeStyle, strokeWidth } = this;

        drawer(position.x, position.y, angle, (ctx) => {
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.strokeWidth = strokeWidth;

            if (strokeWidth > 0) {
                ctx.rect(-(width / 2), -(height / 2), width, height);
                ctx.stroke();
            } else {
                ctx.fillRect(-(width / 2), -(height / 2), width, height);
            }
        });
    }
}
