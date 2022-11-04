import { __extends } from "tslib";
import Vector from '#/core/vector';
import { SHAPE_TYPES } from '#/constants';
import { Piece } from './piece';
import { zIndexComporator } from '#/utils';
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group(params) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        _this = _super.call(this, {
            type: SHAPE_TYPES.GROUP,
            visible: (_a = params === null || params === void 0 ? void 0 : params.visible) !== null && _a !== void 0 ? _a : true,
            zIndex: params === null || params === void 0 ? void 0 : params.zIndex,
        }) || this;
        _this.name = (_b = params.name) !== null && _b !== void 0 ? _b : _this.id;
        _this.position = (_c = params === null || params === void 0 ? void 0 : params.position) !== null && _c !== void 0 ? _c : new Vector(0, 0);
        _this.angle = (_d = params.angle) !== null && _d !== void 0 ? _d : 0;
        _this.width = (_e = params === null || params === void 0 ? void 0 : params.width) !== null && _e !== void 0 ? _e : 0;
        _this.height = (_f = params === null || params === void 0 ? void 0 : params.height) !== null && _f !== void 0 ? _f : 0;
        _this.static = (_g = params === null || params === void 0 ? void 0 : params.static) !== null && _g !== void 0 ? _g : false;
        _this.children = [];
        return _this;
    }
    Group.prototype.add = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.forEach(function (item) {
            if (item instanceof Piece) {
                _this.children.push(item);
                _this.children.sort(zIndexComporator);
            }
        });
        return this;
    };
    Group.prototype.removeBody = function (id) {
        this.children = this.children.filter(function (item) { return item.id !== id; });
    };
    Group.prototype.render = function (drawer) {
        var _this = this;
        drawer(this.position.x, this.position.y, this.angle, function () {
            _this.children.forEach(function (child) {
                child.render(drawer);
            });
        });
    };
    Group.prototype.update = function (dt, options) {
        if (!this.static) {
            this.children.forEach(function (child) { return child.update(dt, options); });
        }
    };
    return Group;
}(Piece));
export { Group };
//# sourceMappingURL=group.js.map