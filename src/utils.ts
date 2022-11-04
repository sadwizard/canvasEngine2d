export function degToRad(angle: number): number {
  	return angle * (Math.PI / 180);
};

export function radToDeg(rad: number): number {
  	return (180 / Math.PI) * rad;
};

export function random(min: number, max: number): number {
  	return Math.floor(Math.random() * (max - min) + min);
};

const colors = new Set();

export function randomColor(): string {
	const color = `#${Math.random().toString(16).substr(2,6)}`;

	if (colors.has(color)) {
		return randomColor();
	}

	colors.add(color);

	return color;
};

export const isNill = <T extends unknown>(arg: T | null | undefined): arg is undefined | null =>
    arg === undefined || arg === null;

export const zIndexComporator = (a: any, b: any) => a > b ? -1 : 1;