export function degToRad(angle) {
    return angle * (Math.PI / 180);
}
;
export function radToDeg(rad) {
    return (180 / Math.PI) * rad;
}
;
export function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
;
var colors = new Set();
export function randomColor() {
    var color = "#".concat(Math.random().toString(16).substr(2, 6));
    if (colors.has(color)) {
        return randomColor();
    }
    colors.add(color);
    return color;
}
;
export var isNill = function (arg) {
    return arg === undefined || arg === null;
};
//# sourceMappingURL=utils.js.map