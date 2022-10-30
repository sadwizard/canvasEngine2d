import Vector from './vector';
import { randomColor } from './utils';
import Render from './render';
import { SHAPE_TYPES, Shapes } from './constants';

const V = Vector;

export type TBodyRequiredParams = Pick<
	Body,
	'position'
>;

export type TBodyParams = Pick<
	Body,
	'type' |
	'position'
>;

interface IBody {
	draw(drawer: Render['draw']): void;
}

export class Body implements IBody {
	id: string;
	type: Shapes;
	static: boolean;
	position: Vector;
	scale: number;
	forces: Vector;
	acceleration: Vector;
	velocity: Vector;
	angularVelocity: number;
	angularAcceleration: number;
	angle: number;
	mass: number;

	updateFn: (body: this) => void;

    constructor(params: TBodyParams) {
		this.id = randomColor();
		this.type = params.type;
		this.static = false;
		this.position = params.position ?? new V(0, 0);
		this.scale = 1;
		this.forces = new V(0, 1);
		this.acceleration = new V(0, 0);
		this.velocity = new V(0, 0);
		this.angularVelocity = 0;
		this.angularAcceleration = 0;
		this.angle = 0;
		this.mass = 1;
    }

    render(drawer) {
      	this.draw(drawer);
    };

	draw(render: Render['draw']) {}

    update(dt: number) {
		if (this.updateFn) {
			return this.updateFn(this)
		}

		if (this.static) return

		const d = dt * 0.01;
		const prevPosition = this.position.clone();
		// console.log(new V(0, 1).toAngle(this.angle))
		// this.forces.add(new V(0, 1)) // apply gravity

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

		// const objPoints = obj.getTransformedVertices();
		// const n = V.getNormal(objPoints.topRight, objPoints.topLeft);
		// // console.log(360 / (2 * Math.PI) * n.angle())
		// var d = obj.position.y - obj.height / 2
		// if (this.position.y + this.radius >= d) {
		// 	this.velocity.y *= -1;
		// 	this.forces.add(n);
		// 	this.position.y = d - this.radius
		// }
		// this.forces.add(new V(-110, -110));
    }
}
