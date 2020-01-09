import _ from 'lodash';
import Vector from '../vector';
import Shape from './shape';

export default class Rectangle extends Shape {
    constructor(params) {
        super(params);

        const defaults = {
            shape: 'rectangle',
            position: new Vector(0, 0),
            scale: 1,
            width: 10,
            height: 10,
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
        const { position, width, height, angle, radius, fillStyle, strokeStyle, strokeWidth } = this;

        drawer(position.x, position.y, angle, (ctx) => {
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.strokeWidth = strokeWidth;
            ctx.rect(position.x - width / 2, position.y - height / 2, width, height);
            ctx.fill();
            if (strokeWidth > 0) {
                ctx.stroke();
            }
        });
    }
}