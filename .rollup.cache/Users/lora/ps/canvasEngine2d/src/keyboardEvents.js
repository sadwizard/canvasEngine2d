var KeyboardEvents = /** @class */ (function () {
    function KeyboardEvents() {
        this.map = {};
        this.handler = null;
    }
    KeyboardEvents.prototype.keyHandle = function (e) {
        this.map[e.keyCode] = e.type == 'keydown';
        if (this.handler) {
            this.handler(this.map);
        }
    };
    KeyboardEvents.prototype.setup = function () {
        document.addEventListener('keyup', this.keyHandle.bind(this));
        document.addEventListener('keydown', this.keyHandle.bind(this));
        return this;
    };
    KeyboardEvents.prototype.listen = function (cb) {
        this.handler = cb;
    };
    return KeyboardEvents;
}());
export { KeyboardEvents };
//# sourceMappingURL=keyboardEvents.js.map