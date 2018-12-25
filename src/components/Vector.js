export function Vec(x, y) {
  this.x = x;
  this.y = y;
}

Vec.prototype = {
  set: function(vec) {
    this.x = vec.x;
    this.y = vec.y;
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
  }
};