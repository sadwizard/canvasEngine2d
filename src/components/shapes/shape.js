import _ from 'lodash';
import Vector from '../vector';
import Body from '../body';

export default class Shape extends Body {
    constructor(params) {
        super(params);
    }

    stroke(ctx) {
        if (this.strokeWith) {
            ctx.stroke();
        }
    }
}