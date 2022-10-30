export default class KeyboardEvents {
  	map: Record<string, boolean>;
  	handler = null;
  
  	constructor() {
    	this.map = {};
    	this.handler = null;
  	}

  keyHandle(e) {
    this.map[e.keyCode] = e.type == 'keydown';

    if (this.handler) {
		this.handler(this.map);
	}
  }

  setup() {
    document.addEventListener('keyup', this.keyHandle);
    document.addEventListener('keydown', this.keyHandle);

    return this;
  }

  listen(cb) {
    this.handler = cb;
  }
}
