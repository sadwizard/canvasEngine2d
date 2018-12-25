export default function keyboardEvents() {
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
  }

  this.listen = function(cb) {
    this.handler = cb;
  }
}
