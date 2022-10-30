var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.set = function (vec) {
        this.x = vec.x;
        this.y = vec.y;
        return this;
    };
    Vector.prototype.setX = function (x) {
        this.x = x;
        return this;
    };
    Vector.prototype.setY = function (y) {
        this.y = y;
        return this;
    };
    Vector.prototype.add = function (vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    };
    Vector.prototype.sub = function (vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    };
    Vector.prototype.div = function (vec) {
        this.x = this.x / vec.x;
        this.y = this.y / vec.y;
        return this;
    };
    Vector.prototype.mul = function (vec) {
        this.x *= vec.x;
        this.y *= vec.y;
        return this;
    };
    Vector.prototype.decrease = function (vec) {
        this.x = this.x > 0 ? this.x - vec.x : this.x + vec.x;
        this.y = this.y > 0 ? this.y - vec.y : this.y + vec.y;
        return this;
    };
    Vector.prototype.magnitude = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };
    Vector.prototype.distance = function (vec) {
        var x = vec.x - this.x;
        var y = vec.y - this.y;
        return Math.sqrt(x * x + y * y);
    };
    Vector.prototype.toAngle = function (degree) {
        var angle = degree * (Math.PI / 180);
        return new Vector(this.x * Math.cos(angle), this.y * Math.sin(angle));
    };
    Vector.prototype.rotateToPoint = function (center, angle) {
        var angleRad = angle * (Math.PI / 180);
        var rotatedX = Math.cos(angleRad) * (this.x - center.x) - Math.sin(angleRad) * (this.y - center.y) + center.x;
        var rotatedY = Math.sin(angleRad) * (this.x - center.x) + Math.cos(angleRad) * (this.y - center.y) + center.y;
        return new Vector(rotatedX, rotatedY);
    };
    Vector.prototype.angle = function () {
        return Math.atan2(this.y, this.x);
    };
    Vector.prototype.relativeAngle = function (vec) {
        var x = vec.x - this.x;
        var y = vec.y - this.y;
        return Math.atan2(y, x);
    };
    Vector.prototype.relative = function (vec) {
        var x = vec.x - this.x;
        var y = vec.y - this.y;
        return new Vector(x, y);
    };
    Vector.prototype.negativeX = function () {
        this.x *= -1;
        return this;
    };
    Vector.prototype.negativeY = function () {
        this.y *= -1;
        return this;
    };
    Vector.prototype.negative = function () {
        this.x *= -1;
        this.y *= -1;
        return this;
    };
    Vector.prototype.divScalar = function (scalar) {
        this.x = this.x / scalar;
        this.y = this.y / scalar;
        return this;
    };
    Vector.prototype.mulScalar = function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    };
    Vector.prototype.normalize = function () {
        var length = this.magnitude();
        if (length === 0) {
            this.x = 1;
            this.y = 0;
        }
        else {
            this.div(new Vector(length, length));
        }
        return this;
    };
    Vector.prototype.normalL = function () {
        return new Vector(-this.y, this.x);
    };
    Vector.prototype.normalR = function () {
        return new Vector(this.y, -this.x);
    };
    Vector.prototype.clone = function () {
        return new Vector(this.x, this.y);
    };
    Vector.fromNumber = function (num) {
        return new Vector(num, num);
    };
    Vector.getNormal = function (vec2, vec1) {
        var diff = vec2.clone().sub(vec1);
        return new Vector(-diff.y, diff.x);
    };
    return Vector;
}());
export default Vector;
//# sourceMappingURL=vector.js.map