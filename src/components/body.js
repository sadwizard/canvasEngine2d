import _ from 'lodash';
import Vector from './vector';
import { randomColor } from './utils';

export default class Body {
    constructor(params) {
        const id = randomColor();
        const defaults = {
            id,
            isStatic: false,
            position: new Vector(0, 0),
            scale: 1,
            speed: new Vector(0, 0),
            forces: new Vector(1, 1),
            angle: 0,
            mass: 1,
        };

        const extendedOpts = _.extend(defaults, params);

        _.map(Object.keys(extendedOpts), (key) => {
            this[key] = extendedOpts[key];
        });
    }

    render(drawer) {
        this.draw(drawer);
    };

    update() {
        this.position.add(this.forces);
    };
}
