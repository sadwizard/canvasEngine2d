export function degToRad(angle) {
  	return angle * (Math.PI / 180);
};

export function radToDeg(rad) {
  	return (180 / Math.PI) * rad;
};

export function random(min, max) {
  	return Math.floor(Math.random() * (max - min) + min);
};

export function randomColor() {
	return `#${Math.random().toString(16).substr(2,6)}`;
};