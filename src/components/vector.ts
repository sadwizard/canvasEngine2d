export default class Vector {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	set(vec: Vector) {
		this.x = vec.x;
		this.y = vec.y;
		return this;
	}
	
	setX(x: number) {
		this.x = x;
		return this;
	}
	
	setY(y: number) {
		this.y = y;
		return this;
	}
	
	add(vec: Vector) {
		this.x += vec.x;
		this.y += vec.y;
	
		return this;
	}
	
	sub(vec: Vector) {
		this.x -= vec.x;
		this.y -= vec.y;
	
		return this;
	}
	
	div(vec: Vector) {
		this.x = this.x / vec.x;
		this.y = this.y / vec.y;
	
		return this;
	}
	
	mul(vec: Vector) {
		this.x *= vec.x;
		this.y *= vec.y;
	
		return this;
	}
	
	decrease(vec: Vector) {
		this.x = this.x > 0 ? this.x - vec.x : this.x + vec.x;
		this.y = this.y > 0 ? this.y - vec.y : this.y + vec.y;
		return this;
	}
	
	magnitude() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}
	
	distance(vec: Vector) {
		var x = vec.x - this.x;
		var y = vec.y - this.y;
		return Math.sqrt(x * x + y * y);
	}
	
	toAngle(degree: number) {
		var angle = degree * (Math.PI / 180);
	
		return new Vector(this.x * Math.cos(angle), this.y * Math.sin(angle));
	}
	
	rotateToPoint(center: Vector, angle: number) {
		const angleRad = angle * (Math.PI/180);
		const rotatedX = Math.cos(angleRad) * (this.x - center.x) - Math.sin(angleRad) * (this.y - center.y) + center.x;
		const rotatedY = Math.sin(angleRad) * (this.x - center.x) + Math.cos(angleRad) * (this.y - center.y) + center.y;
		return new Vector(rotatedX, rotatedY);
	}
	
	angle() {
		return Math.atan2(this.y, this.x);
	}
	
	relativeAngle(vec: Vector) {
		var x = vec.x - this.x;
		var y = vec.y - this.y;
		return Math.atan2(y, x);
	}
	
	relative(vec: Vector) {
		var x = vec.x - this.x;
		var y = vec.y - this.y;
		return new Vector(x, y);
	}
	
	negativeX() {
		this.x *= -1;
		return this;
	}
	
	negativeY() {
		this.y *= -1;
		return this;
	}
	
	negative() {
		this.x *= -1;
		this.y *= -1;
		return this;
	}
	
	divScalar(scalar: number) {
		this.x = this.x / scalar;
		this.y = this.y / scalar;
		return this;
	}
	
	mulScalar(scalar: number) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}
	
	normalize() {
		const length = this.magnitude();
	
		if (length === 0) {
			this.x = 1;
			this.y = 0;
		} else {
			this.div(new Vector(length, length));
		}
		
		return this;
	}
	
	normalL() {
		return new Vector(-this.y, this.x);
	}
	
	normalR() {
		return new Vector(this.y, -this.x);
	}
	
	clone() {
		return new Vector(this.x, this.y);
	}

	static fromNumber(num: number) {
		return new Vector(num, num);
  	}

	static getNormal(
		vec2: Vector,
		vec1: Vector,
	): Vector {
	  	const diff = vec2.clone().sub(vec1);
	  	return new Vector(-diff.y, diff.x);
	}
}
