import { __assign, __extends } from "tslib";
import { SHAPE_TYPES } from '#/constants';
import { Body } from '../body';
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image(params) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, __assign(__assign({}, params), { type: SHAPE_TYPES.IMAGE })) || this;
        _this.width = (_a = params.width) !== null && _a !== void 0 ? _a : 10;
        _this.height = (_b = params.height) !== null && _b !== void 0 ? _b : 10;
        _this.src = params.src;
        if (typeof params.src !== 'string') {
            throw Error('Image should contain src param');
        }
        if (_this.imageSource === undefined) {
            _this.loadImage(_this.src).then(function (img) {
                _this.imageSource = img;
            }).catch(function (err) {
                console.log(err);
            });
        }
        return _this;
    }
    Image.prototype.draw = function (drawer) {
        var _this = this;
        var _a = this, position = _a.position, width = _a.width, height = _a.height;
        if (this.imageSource !== undefined) {
            drawer(this.position.x, this.position.y, 0, function (ctx) {
                ctx.drawImage(_this.imageSource, position.x - width / 2, position.y - height / 2, width, height);
            });
        }
    };
    Image.prototype.loadImage = function (src) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (src === undefined) {
                var errMessage = "Image should have src (".concat(_this.id, ")");
                console.error(errMessage);
                reject(errMessage);
            }
            var img = window.document.createElement('img');
            img.onerror = function (err) {
                console.error(err);
                reject(err);
            };
            img.onload = function () {
                resolve(img);
            };
            img.src = src;
        });
    };
    return Image;
}(Body));
export { Image };
//# sourceMappingURL=image.js.map