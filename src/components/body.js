import _ from 'lodash';
import Vector from './vector';
import { randomColor } from './utils';

const V = Vector;

export default class Body {
    constructor(params) {
        const id = randomColor();
        const defaults = {
            id,
            static: false,
            position: new V(0, 0),
            scale: 1,
            forces: new V(0, 1),
            acceleration: new V(0, 0),
            velocity: new V(0, 0),
            angularVelocity: 0,
            angularAcceleration: 0,
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

    update(dt) {
      if (this.updateFn) {
        return this.updateFn(this)
      }

      if (this.static) return

      const d = dt * 0.01;
      const prevPosition = this.position.clone();
      // console.log(new V(0, 1).toAngle(this.angle))
      // this.forces.add(new V(0, 1)) // apply gravity
console.log()
// console.log(this.forces.clone().divisionScalar(this.mass))
      this.acceleration.add(this.forces.divScalar(this.mass));
      this.velocity.add(this.acceleration);

      this.position.add(this.velocity.clone().mulScalar(d));

      this.angularVelocity = this.angularVelocity * d;
      this.angle = this.angle + this.angularVelocity;

      // calc speed
      // this.speed = this.position.clone().sub(prevPosition).divisionScalar(d);
      // console.log(this.speed.magnitude())
      this.acceleration.mulScalar(0)
      // this.velocity.multiplyScalar(0)
    };

    collision(obj) {
      if (this.static) return;
      const objPoints = obj.getTransformedVertices();
      const n = V.getNormal(objPoints.topRight, objPoints.topLeft);
      // console.log(360 / (2 * Math.PI) * n.angle())
      var d = obj.position.y - obj.height / 2
      if (this.position.y + this.radius >= d) {
        this.velocity.y *= -1;
        this.forces.add(n);
        this.position.y = d - this.radius
      }
      // this.forces.add(new V(-110, -110));
    }
}
