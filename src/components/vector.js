export default function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.fromNumber = function(num) {
  return new Vector(num, num);
}

Vector.getNormal = function(vec2, vec1) {
  const diff = vec2.clone().sub(vec1);
  return new Vector(-diff.y, diff.x);
}

Vector.prototype = {
  set: function(vec) {
    this.x = vec.x;
    this.y = vec.y;
    return this;
  },
  setX: function(x) {
    this.x = x;
    return this;
  },
  setY: function(y) {
    this.y = y;
    return this;
  },
  add: function(vec) {
    this.x += vec.x;
    this.y += vec.y;

    return this;
  },
  sub: function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;

    return this;
  },
  div: function(vec) {
    this.x = this.x / vec.x;
    this.y = this.y / vec.y;

    return this;
  },
  mul: function(vec) {
    this.x *= vec.x;
    this.y *= vec.y;

    return this;
  },
  decrease: function(vec) {
    this.x = this.x > 0 ? this.x - vec.x : this.x + vec.x;
    this.y = this.y > 0 ? this.y - vec.y : this.y + vec.y;
    return this;
  },
  magnitude: function() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  },
  distance: function(vec) {
    var x = vec.x - this.x;
    var y = vec.y - this.y;
    return Math.sqrt(x * x + y * y);
  },
  toAngle: function(degree) {
    var angle = degree * (Math.PI / 180);

    return new Vector(this.x * Math.cos(angle), this.y * Math.sin(angle));
  },
  rotateToPoint(center, angle) {
    const angleRad = angle * (Math.PI/180);
    const rotatedX = Math.cos(angleRad) * (this.x - center.x) - Math.sin(angleRad) * (this.y - center.y) + center.x;
    const rotatedY = Math.sin(angleRad) * (this.x - center.x) + Math.cos(angleRad) * (this.y - center.y) + center.y;
    return new Vector(rotatedX, rotatedY);
  },
  angle() {
    return Math.atan2(this.y, this.x);
  },
  relativeAngle: function(vec) {
    var x = vec.x - this.x;
    var y = vec.y - this.y;
    return Math.atan2(y, x);
  },
  relative: function(vec) {
    var x = vec.x - this.x;
    var y = vec.y - this.y;
    return new Vector(x, y);
  },
  negativeX: function() {
    this.x *= -1;
    return this;
  },
  negativeY: function() {
    this.y *= -1;
    return this;
  },
  negative: function() {
    this.x *= -1;
    this.y *= -1;
    return this;
  },
  divScalar: function(scalar) {
    this.x = this.x / scalar;
    this.y = this.y / scalar;
    return this;
  },
  mulScalar: function(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  },
  normalize: function() {
    const length = this.magnitude();

    if (length === 0) {
  		this.x = 1;
  		this.y = 0;
  	} else {
  		this.div(new Vector(length, length));
  	}
  	return this;
  },
  normalL: function () {
    return new Vector(-this.y, this.x);
  },
  normalR: function () {
    return new Vector(this.y, -this.x);
  },
  clone: function() {
    return new Vector(this.x, this.y);
  }
};
