import requestAnimationFramePolifil from '../vendor/rafPolifil.js';

export default function Engine(ctx, clearSize) {
  this.id = null;
  this.FPS = 1000 / 60;
  this.updateFunc = null;
  var self = this;
  this.ctx = ctx;
  this.time = null;

  function tick() {

    var now = Date.now();
    if (self.updateFunc && now - self.time >= self.FPS) {
      ctx.clearRect(0, 0, clearSize.w, clearSize.h);

      self.updateFunc(ctx, now);
      self.time = now;
    }

    self.id = requestAnimationFrame(tick);
  }

  this.start = function() {
    this.time = Date.now();
    this.id = requestAnimationFrame(tick);
  }

  this.stop = function() {
    cancelAnimationFrame(this.id);
    this.time = null;
    this.id = null;
  }

  this.draw = function(x, y, deg, objectDraw) {
    self.ctx.save();
    
    self.ctx.translate(x, y);
    self.ctx.rotate(deg ? deg * (Math.PI / 180) : 0);
    if (objectDraw) {
      objectDraw(self.ctx);
    }
    
    self.ctx.restore();
  }
}

Engine.prototype.update = function(cb) {
  this.updateFunc = cb;
}
