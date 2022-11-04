import Vector from '#/core/vector';
import { TDrawer } from '#/core/render';
import { TShapes } from './shapes/index';
import { isNill } from '#/utils';
import { Piece, TPieceParams, TUpdateOptions } from './piece';
import { SHAPE_TYPES, TShapeTypes } from '#/constants';

const V = Vector;

export type TBodyParams = TPieceParams & Pick<
	Body,
	'position' |
	'static' |
	'scale' |
	'mass' |
	'origin' |
	'forces' |
	'gravity'|
	'friction'
>;

export class Body extends Piece {
	static: boolean;
	position: Vector;
	origin: Vector;
	scale: number;
	forces: Vector;
	acceleration: Vector;
	velocity: Vector;
	angularVelocity: number;
	angularAcceleration: number;
	angle: number;
	mass: number;
	gravity: Vector | null;
	friction: number | null;
	updateFn?: (instance: this, dt: number) => void;

    constructor(params: Partial<TBodyParams>) {
		if (isNill(params?.type)) {
			throw new Error('Body required params missed!');
		}

		super({
			type: params.type,
			visible: params?.visible,
			zIndex: params?.zIndex,
		});

		this.static = params.static ?? false;
		this.position = params.position ?? new V(0, 0);
		this.origin = params?.origin ?? this.position;
		this.scale = 1;
		this.forces = params.forces ?? new V(0, 0);
		this.acceleration = new V(0, 0);
		this.velocity = new V(0, 0);
		this.angularVelocity = 0;
		this.angularAcceleration = 0;
		this.angle = 0;
		this.mass = params.mass ?? 1;
		this.gravity = params.gravity ?? null;
		this.friction = params.friction ?? 0;
    }

    render(drawer: TDrawer) {
      	this.draw(drawer);
    };

	draw(render: TDrawer) {}

	setUpdateFn(fn: (instance: this) => void) {
		this.updateFn = fn;
		return this;
	}

    update(dt: number, options: TUpdateOptions) {
		if (this.updateFn) {
			return this.updateFn(this, dt);
		}

		if (this.static) return;

		const G = this.gravity ?? options.globalGravity ?? new Vector(0, 0);
		const d = dt * 0.01;
		const prevPosition = this.position.clone();
		// console.log(new V(0, 1).toAngle(this.angle))
		// this.forces.add(new V(0, 1)) // apply gravity

	// console.log(this.forces.clone().divisionScalar(this.mass))
		const F = this.forces.add(G);
		this.acceleration.add(F.divScalar(this.mass));
		this.velocity.add(this.acceleration);

		this.position.add(this.velocity.clone().mulScalar(d));

		this.angularVelocity = this.angularVelocity * d;
		this.angle = this.angle + this.angularVelocity;

		// calc speed
		// this.speed = this.position.clone().sub(prevPosition).divisionScalar(d);
		// console.log(this.speed.magnitude())
		this.acceleration.mulScalar(0);
		// this.velocity.multiplyScalar(0)
    };

    collision(obj: TShapes) {
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
