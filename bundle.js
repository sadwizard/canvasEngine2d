'use strict';

function Vec(x, y) {
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

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };

}());

function Engine(ctx, clearSize) {
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
  };

  this.stop = function() {
    cancelAnimationFrame(this.id);
    this.id = null;
  };

  this.draw = function(x, y, deg, objectDraw) {
    self.ctx.save();
    
    self.ctx.translate(x, y);
    self.ctx.rotate(deg ? deg * (Math.PI / 180) : 0);
    if (objectDraw) {
      objectDraw(self.ctx);
    }
    
    self.ctx.restore();
  };
}

Engine.prototype.update = function(cb) {
  this.updateFunc = cb;
};

var utils = {
	degToRad: function(angle) {
	  return angle * (Math.PI / 180);
	},

	radToDeg: function(rad) {
	  return (180 / Math.PI) * rad;
	},

	random: function(min, max) {
	  return Math.floor(Math.random() * (max - min) + min);
	},
};

function keyboardEvents() {
  this.map = {};
  this.handler = null;
  var self = this;

  function keyHandle(e) {
    self.map[e.keyCode] = e.type == 'keydown';

    if (self.handler) self.handler(self.map);
  }

  this.setup = function() {
    document.addEventListener('keyup', keyHandle);
    document.addEventListener('keydown', keyHandle);

    return this;
  };

  this.listen = function(cb) {
    this.handler = cb;
  };
}

function CanvasEngine(canvasEl, width, height, backgroundColor) {
  this.canvas = canvasEl;
  this.ctx = canvasEl.getContext('2d');
  this.canvas.width = width;
  this.canvas.height = height;
  this.canvas.style.backgroundColor = backgroundColor;
  this.vars = {
    w: width,
    h: height,
    wh: width / 2,
    hh: height / 2,
  };


  this.utils = utils;
  this.Vec = Vec;
  this.Engine = new Engine(this.ctx, { w: width, h: height });
  this.keyboardEvents = new keyboardEvents();
  this.ctx.globalAlpha = 1;
}

window.CanvasEngine = CanvasEngine;
