import { SHAPE_TYPES } from '#/constants';
import { TShapes, Rectangle, Circle } from '#/display/shapes/index';

const { CIRCLE, RECTANGLE } = SHAPE_TYPES;

const TCircles = Circle;
const TPoligons = Rectangle

const isCircle = function(obj: TShapes): obj is Circle {
	return obj.type !== CIRCLE;
}

const isRect = function(obj: TShapes): obj is Rectangle {
	return obj.type !== RECTANGLE;
}

export default class Collision {
	_currentCollisionPairs: Array<TShapes[]> = [];

	update(objects: TShapes[]) {
		const obj = objects.filter(i => !i.static || i.visible);
		this._currentCollisionPairs = [];
		// get all entity pairs to test for collision

		for (var i = 0, len = obj.length; i < len; i++) {
			for (var j = i + 1; j < len; j++) {
				this._currentCollisionPairs.push([obj[i], obj[j]]);
			}
		}

		// test collisions
		while (this._currentCollisionPairs.length > 0) {
			var pair = this._currentCollisionPairs.shift();
			
			if (pair !== undefined && this.isColliding(pair[0], pair[1])) {
				this.collision(pair[0], pair[1]);
			}
		}
	}

	collision(obj1: TShapes, obj2: TShapes) {
		obj1.collision(obj2);
	}

	isIntersecting(obj1: TShapes, obj2: TShapes) {
		if (isCircle(obj1) && isCircle(obj2)) {
			return this.circleIntersection(obj1, obj2);
		} else if (isCircle(obj1) && isRect(obj2)) {
			return this.circleRectangleIntersection(obj1, obj2);
		} else if (isRect(obj1) && isCircle(obj2)) {
			return this.circleRectangleIntersection(obj2, obj1);
		} else if (isRect(obj1) && isRect(obj2)) {
			return this.rectangleIntersection(obj1, obj2);
		}
	}

	isColliding(obj1: TShapes, obj2: TShapes) {
		return obj1 !== obj2 && this.isIntersecting(obj1, obj2);
	}

	circleIntersection(obj1: Circle, obj2: Circle) {
		if ('radius' in obj1 && 'radius' in obj2) {
			return obj1.position.distance(obj2.position) < (obj1.radius + obj2.radius);
		}

		return false;
	}

	circleRectangleIntersection(obj1: Circle, obj2: Rectangle) {
		if (obj1.type !== CIRCLE || obj2.type !== RECTANGLE) {
			return false;
		}

		const rectCorners = obj2.getEdgesObject();
		const rotatedCircle = obj1.position.rotateToPoint(obj2.position, -obj2.angle);

		let testX, testY;

		// which edge is closest?
		if (rotatedCircle.x < rectCorners.left) {
			testX = rectCorners.left;
		} else if (rotatedCircle.x > rectCorners.right){
			testX = rectCorners.right;
		} else {
			testX = rotatedCircle.x;
		}

		if (rotatedCircle.y < rectCorners.top){
			testY = rectCorners.top;
		} else if (rotatedCircle.y > rectCorners.bottom){
			testY = rectCorners.bottom;
		} else {
			testY = rotatedCircle.y;
		}

		const distX = rotatedCircle.x - testX;
		const distY = rotatedCircle.y - testY;
		const distance = Math.sqrt((distX * distX) + (distY * distY));

		if (distance <= obj1.radius) {
			return true;
		}

		return false;
	}

	rectangleIntersection(obj1: Rectangle, obj2: Rectangle) {
		if (obj1.angle !== 0 || obj2.angle !== 0) {
			const c1 = obj1.getEdgesObject();
			const c2 = obj2.getEdgesObject();

			return !(
				c2.left > c1.right ||
				c2.right < c1.left ||
				c2.top > c1.bottom ||
				c2.bottom < c1.top
			)
		}
		// todo: rotated rectangle intersection

		const vert1 = obj1.getTransformedVerticesObject();
		const vert2 = obj2.getTransformedVerticesObject()

		return false;
	}
}
