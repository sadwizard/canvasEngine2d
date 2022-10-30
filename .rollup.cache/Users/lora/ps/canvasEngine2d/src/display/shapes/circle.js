import { __extends } from "tslib";
import { SHAPE_TYPES } from '#/constants';
import { Body } from '../body';
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(params) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, {
            type: SHAPE_TYPES.CIRCLE,
            visible: params.visible,
            position: params.position,
        }) || this;
        _this.radius = (_a = params.radius) !== null && _a !== void 0 ? _a : 10;
        _this.fillStyle = (_b = params.fillStyle) !== null && _b !== void 0 ? _b : _this.id;
        _this.strokeStyle = (_c = params.strokeStyle) !== null && _c !== void 0 ? _c : '#ddd';
        _this.lineWidth = (_d = params.lineWidth) !== null && _d !== void 0 ? _d : 0;
        return _this;
    }
    Circle.prototype.draw = function (drawer) {
        var _a = this, position = _a.position, angle = _a.angle, radius = _a.radius, fillStyle = _a.fillStyle, strokeStyle = _a.strokeStyle, lineWidth = _a.lineWidth;
        drawer(position.x, position.y, angle, function (ctx) {
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            if (lineWidth > 0) {
                ctx.stroke();
            }
        });
    };
    return Circle;
}(Body));
export { Circle };
//# sourceMappingURL=circle.js.map