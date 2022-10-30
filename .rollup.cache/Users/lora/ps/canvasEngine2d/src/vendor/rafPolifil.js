/*
 * Resolve requestAnimationFrame and cancelAnimationFrame regardless of whether window exists.
 */
/*
 * Create an object to store the requestAnimationFrame and cancelAnimationFrame functions so it doesn't interfere
 * with functions declared in the global space.
 */
var animation = {
    requestAnimationFrame: function () { return 0; },
    cancelAnimationFrame: function () { return undefined; },
};
/*
 * Look for browser specific implementations of the requestAnimationFrame, and cancelAnimationFrame functions
 */
if (window) {
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    var win_1 = window;
    animation.requestAnimationFrame = vendors
        .map(function (vendor) { return win_1[vendor + 'RequestAnimationFrame']; })
        .reduce(function (accumulator, func) { return accumulator || func; }, window.requestAnimationFrame);
    animation.cancelAnimationFrame = vendors
        .map(function (vendor) {
        return win_1[vendor + 'CancelAnimationFrame'] ||
            win_1[vendor + 'CancelRequestAnimationFrame'];
    })
        .reduce(function (accumulator, func) { return accumulator || func; }, window.cancelAnimationFrame);
}
/*
 * Fallback to setTimeout logic if no existing alternatives can be found
 */
if (!animation.requestAnimationFrame) {
    var lastTime_1 = 0;
    animation.requestAnimationFrame = function (callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime_1));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime_1 = currTime + timeToCall;
        return id;
    };
    if (!animation.cancelAnimationFrame) {
        animation.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}
export var requestAnimationFrame = animation.requestAnimationFrame;
export var cancelAnimationFrame = animation.cancelAnimationFrame;
//# sourceMappingURL=rafPolifil.js.map