type THandler = (event: Record<string, boolean>) => void;

export class KeyboardEvents {
  	map: Record<string, boolean>;
  	handler: THandler | null;
  
  	constructor() {
    	this.map = {};
    	this.handler = null;
  	}

	keyHandle(e: KeyboardEvent) {
		this.map[e.keyCode] = e.type == 'keydown';

		if (this.handler) {
			this.handler(this.map);
		}
	}

	setup() {
		document.addEventListener('keyup', this.keyHandle.bind(this));
		document.addEventListener('keydown', this.keyHandle.bind(this));

		return this;
	}

	listen(cb: THandler) {
		this.handler = cb;
	}
}
