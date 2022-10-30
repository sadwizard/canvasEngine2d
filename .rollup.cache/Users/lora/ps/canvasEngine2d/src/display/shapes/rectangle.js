import { __extends } from "tslib";
import Vector from '#/core/vector';
import { isNill } from '#/utils';
import { Body } from '../body';
import { SHAPE_TYPES } from '#/constants';
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(params) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        if (isNill(params.type) || isNill(params.visible) || isNill(params.position)) {
            throw new Error('Rect required params missed!');
        }
        _this = _super.call(this, {
            type: SHAPE_TYPES.RECTANGLE,
            position: params.position,
            visible: params.visible,
        }) || this;
        _this.width = (_a = params.width) !== null && _a !== void 0 ? _a : 10;
        _this.height = (_b = params.height) !== null && _b !== void 0 ? _b : 10;
        _this.fillStyle = (_c = params.fillStyle) !== null && _c !== void 0 ? _c : _this.id;
        _this.strokeStyle = (_d = params.strokeStyle) !== null && _d !== void 0 ? _d : '#ddd';
        _this.lineWidth = (_e = params.lineWidth) !== null && _e !== void 0 ? _e : 0;
        return _this;
    }
    Rectangle.prototype.draw = function (drawer) {
        var _a = this, position = _a.position, width = _a.width, height = _a.height, angle = _a.angle, fillStyle = _a.fillStyle, strokeStyle = _a.strokeStyle, lineWidth = _a.lineWidth;
        drawer(position.x, position.y, angle, function (ctx) {
            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;
            if (lineWidth > 0) {
                ctx.rect(-(width / 2), -(height / 2), width, height);
                ctx.stroke();
            }
            else {
                ctx.fillRect(-(width / 2), -(height / 2), width, height);
            }
        });
    };
    Rectangle.prototype.stroke = function (ctx) {
        if (this.lineWidth !== undefined) {
            ctx.stroke();
        }
    };
    Rectangle.prototype.getEdgesObject = function () {
        return {
            left: this.position.x - this.width / 2,
            top: this.position.y - this.height / 2,
            right: this.position.x + this.width / 2,
            bottom: this.position.y + this.height / 2,
        };
    };
    Rectangle.prototype.getEdgesArray = function () {
        return [
            this.position.y - this.height / 2,
            this.position.x + this.width / 2,
            this.position.y + this.height / 2,
            this.position.x - this.width / 2,
        ];
    };
    Rectangle.prototype.getTransformedVerticesObject = function () {
        var c = this.getEdgesObject();
        return {
            topLeft: new Vector(c.left, c.top).rotateToPoint(this.position, this.angle),
            topRight: new Vector(c.right, c.top).rotateToPoint(this.position, this.angle),
            bottomRight: new Vector(c.right, c.bottom).rotateToPoint(this.position, this.angle),
            bottomLeft: new Vector(c.left, c.bottom).rotateToPoint(this.position, this.angle),
        };
    };
    Rectangle.prototype.getTransformedVerticesArray = function () {
        var c = this.getEdgesObject();
        return [
            new Vector(c.left, c.top).rotateToPoint(this.position, this.angle),
            new Vector(c.right, c.top).rotateToPoint(this.position, this.angle),
            new Vector(c.right, c.bottom).rotateToPoint(this.position, this.angle),
            new Vector(c.left, c.bottom).rotateToPoint(this.position, this.angle),
        ];
    };
    Rectangle.prototype.getNormals = function () {
        var vertices = this.getTransformedVerticesArray();
        var norms = [], p1, p2, n;
        for (var i = 1; i < vertices.length; i++) {
            var p1_1 = vertices[i - 1], p2_1 = vertices[i];
            n = new Vector(p2_1.x - p1_1.x, p2_1.y - p1_1.y).normalR();
            norms.push(n);
        }
        return norms;
    };
    return Rectangle;
}(Body));
export { Rectangle };
//# sourceMappingURL=rectangle.js.map