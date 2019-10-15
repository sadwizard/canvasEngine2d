export function Vec(x, y) {
  this.x = x;
  this.y = y;
}

Vec.fromNumber = function(num) {
  return new Vec(num, num);
}

Vec.prototype = {
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
  multiply: function(vec) {
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
  relativeMagnitude: function(vec) {
    var x = vec.x - this.x;
    var y = vec.y - this.y;
    return Math.sqrt(x * x + y * y);
  },
  setAngle: function(degree) {
    var angle = (degree) * (Math.PI / 180);

    return new Vec(this.x * Math.cos(angle), this.y * Math.sin(angle));
  },
  relativeAngle: function(vec) {
    var x = vec.x - this.x;
    var y = vec.y - this.y;
    return Math.atan2(y, x);
  },
  relative: function(vec) {
    var x = vec.x - this.x;
    var y = vec.y - this.y;
    return new Vec(x, y);
  },
  negativeX: function() {
    this.x *= -1;
    return this;
  },
  negativeY: function() {
    this.y *= -1;
    return this;
  },
  negative: function(vec) {
    this.x *= -1;
    this.y *= -1;
    return this;
  }
};