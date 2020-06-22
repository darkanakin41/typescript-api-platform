"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractGetEntityResource_1 = require("./AbstractGetEntityResource");
var AbstractEntityResource = /** @class */ (function (_super) {
    __extends(AbstractEntityResource, _super);
    function AbstractEntityResource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractEntityResource.prototype.getPathFromObject = function (object) {
        if (object === undefined) {
            return this.getPath();
        }
        else {
            var id = this.getObjectId(object);
            return this.getPath(id);
        }
    };
    AbstractEntityResource.prototype.getFromObject = function (object) {
        return this.get(this.getObjectId(object));
    };
    AbstractEntityResource.prototype.list = function (cancelTokenSource) {
        var cancelOptions = cancelTokenSource ? { cancelToken: cancelTokenSource.token } : undefined;
        var promise = this.wrapPromise(this.axios.get(this.getPath(), cancelOptions));
        return promise;
    };
    AbstractEntityResource.prototype.create = function (object) {
        return this.wrapPromise(this.axios.post(this.getPath(), object));
    };
    AbstractEntityResource.prototype.deleteFromObject = function (object) {
        return this.delete(this.getObjectId(object));
    };
    AbstractEntityResource.prototype.delete = function (id) {
        var path = this.getPath(id);
        return this.wrapPromise(this.axios.delete(path));
    };
    AbstractEntityResource.prototype.update = function (object) {
        var path = this.getPathFromObject(object);
        return this.wrapPromise(this.axios.put(path, object));
    };
    return AbstractEntityResource;
}(AbstractGetEntityResource_1.default));
exports.default = AbstractEntityResource;
//# sourceMappingURL=AbstractEntityResource.js.map