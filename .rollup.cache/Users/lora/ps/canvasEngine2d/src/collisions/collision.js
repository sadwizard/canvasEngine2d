import { SHAPE_TYPES } from '#/constants';
import { Rectangle, Circle } from '#/display/shapes/index';
var CIRCLE = SHAPE_TYPES.CIRCLE, RECTANGLE = SHAPE_TYPES.RECTANGLE;
var TCircles = Circle;
var TPoligons = Rectangle;
var isCircle = function (obj) {
    return obj.type !== CIRCLE;
};
var isRect = function (obj) {
    return obj.type !== RECTANGLE;
};
var Collision = /** @class */ (function () {
    function Collision() {
        this._currentCollisionPairs = [];
    }
    Collision.prototype.update = function (objects) {
        var obj = objects.filter(function (i) { return !i.static || i.visible; });
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
    };
    Collision.prototype.collision = function (obj1, obj2) {
        obj1.collision(obj2);
    };
    Collision.prototype.isIntersecting = function (obj1, obj2) {
        if (isCircle(obj1) && isCircle(obj2)) {
            return this.circleIntersection(obj1, obj2);
        }
        else if (isCircle(obj1) && isRect(obj2)) {
            return this.circleRectangleIntersection(obj1, obj2);
        }
        else if (isRect(obj1) && isCircle(obj2)) {
            return this.circleRectangleIntersection(obj2, obj1);
        }
        else if (isRect(obj1) && isRect(obj2)) {
            return this.rectangleIntersection(obj1, obj2);
        }
    };
    Collision.prototype.isColliding = function (obj1, obj2) {
        return obj1 !== obj2 && this.isIntersecting(obj1, obj2);
    };
    Collision.prototype.circleIntersection = function (obj1, obj2) {
        if ('radius' in obj1 && 'radius' in obj2) {
            return obj1.position.distance(obj2.position) < (obj1.radius + obj2.radius);
        }
        return false;
    };
    Collision.prototype.circleRectangleIntersection = function (obj1, obj2) {
        if (obj1.type !== CIRCLE || obj2.type !== RECTANGLE) {
            return false;
        }
        var rectCorners = obj2.getEdgesObject();
        var rotatedCircle = obj1.position.rotateToPoint(obj2.position, -obj2.angle);
        var testX, testY;
        // which edge is closest?
        if (rotatedCircle.x < rectCorners.left) {
            testX = rectCorners.left;
        }
        else if (rotatedCircle.x > rectCorners.right) {
            testX = rectCorners.right;
        }
        else {
            testX = rotatedCircle.x;
        }
        if (rotatedCircle.y < rectCorners.top) {
            testY = rectCorners.top;
        }
        else if (rotatedCircle.y > rectCorners.bottom) {
            testY = rectCorners.bottom;
        }
        else {
            testY = rotatedCircle.y;
        }
        var distX = rotatedCircle.x - testX;
        var distY = rotatedCircle.y - testY;
        var distance = Math.sqrt((distX * distX) + (distY * distY));
        if (distance <= obj1.radius) {
            return true;
        }
        return false;
    };
    Collision.prototype.rectangleIntersection = function (obj1, obj2) {
        if (obj1.angle !== 0 || obj2.angle !== 0) {
            var c1 = obj1.getEdgesObject();
            var c2 = obj2.getEdgesObject();
            return !(c2.left > c1.right ||
                c2.right < c1.left ||
                c2.top > c1.bottom ||
                c2.bottom < c1.top);
        }
        // todo: rotated rectangle intersection
        var vert1 = obj1.getTransformedVerticesObject();
        var vert2 = obj2.getTransformedVerticesObject();
        return false;
    };
    return Collision;
}());
export default Collision;
//# sourceMappingURL=collision.js.map