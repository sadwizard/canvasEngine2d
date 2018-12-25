import requestAnimationFramePolifil from '../vendor/rafPolifil.js';

export default function Engine(ctx, clearSize) {
  this.id = null;
  this.updateFunc = null;
  var self = this;
  this.ctx = ctx;

  function tick() {
    ctx.clearRect(0, 0, clearSize.w, clearSize.h);

    if (self.updateFunc) {
      self.updateFunc(ctx);
    }

    self.id = requestAnimationFrame(tick);
  }

  this.start = function() {
    this.id = requestAnimationFrame(tick);
  }

  this.stop = function() {
    cancelAnimationFrame(this.id);
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
