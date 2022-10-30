import { __extends } from "tslib";
import Vector from '#/core/vector';
import { SHAPE_TYPES } from '#/constants';
import { Piece } from './piece';
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group(params) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, {
            type: SHAPE_TYPES.GROUP,
            visible: params.visible,
        }) || this;
        _this.position = (_a = params.position) !== null && _a !== void 0 ? _a : new Vector(0, 0);
        _this.width = (_b = params.width) !== null && _b !== void 0 ? _b : 0;
        _this.height = (_c = params.height) !== null && _c !== void 0 ? _c : 0;
        _this.children = (_d = params.children) !== null && _d !== void 0 ? _d : [];
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
            }
        });
    };
    Group.prototype.removeBody = function (id) {
        var index = this.children.findIndex(function (item) { return item.id === id; });
        return delete this.children[index];
    };
    Group.prototype.render = function (drawer) {
        this.children.forEach(function (child) {
            child.render(drawer);
        });
    };
    return Group;
}(Piece));
export { Group };
//# sourceMappingURL=group.js.map