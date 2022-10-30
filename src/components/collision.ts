import { SHAPE_TYPES } from './constants';

const { CIRCLE, RECTANGLE } = SHAPE_TYPES;

export default class Collision {
	_currentCollisionPairs: Array<number[]>;

	update(objects) {
		const obj = objects.filter(i => !i.kinematic || !i.visible);
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
			if (this.isColliding(pair[0], pair[1])) {
				this.collision(pair[0], pair[1]);
			}
		}
	}

	collision(obj1, obj2) {
		obj1.collision(obj2);
	}

	isIntersecting(obj1, obj2) {
		if (obj1.type === CIRCLE && obj2.type === CIRCLE) {
			return this.circleIntersection(obj1, obj2);
		} else if (obj1.type === CIRCLE && obj2.type === RECTANGLE) {
			return this.circleRectangleIntersection(obj1, obj2);
		} else if (obj1.type === RECTANGLE && obj2.type === CIRCLE) {
			return this.circleRectangleIntersection(obj2, obj1);
		} else if (obj1.type === RECTANGLE && obj2.type === RECTANGLE) {
			return this.rectangleIntersection(obj1, obj2);
		}
	}

	isColliding(obj1, obj2) {
		return obj1 !== obj2 && this.isIntersecting(obj1, obj2);
	}

	circleIntersection(obj1, obj2) {
		return obj1.position.distance(obj2.position) < (obj1.radius + obj2.radius);
	}

	circleRectangleIntersection(obj1, obj2) {
		const rectCorners = obj2.getEdges();
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

	rectangleIntersection(obj1, obj2) {
		if (obj1.angle !== 0 || obj2.angle !== 0) {
			const c1 = obj1.getEdges();
			const c2 = obj2.getEdges();

			return !(
				c2.left > c1.right ||
				c2.right < c1.left ||
				c2.top > c1.bottom ||
				c2.bottom < c1.top
			)
		}
		// todo: rotated rectangle intersection

		const vert1 = obj1.getTransformedVertices();
		const vert2 = obj2.getTransformedVertices()

		return false;
	}
}
