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
var AbstractResource_1 = require("./AbstractResource");
var AbstractGetEntityResource = /** @class */ (function (_super) {
    __extends(AbstractGetEntityResource, _super);
    function AbstractGetEntityResource(axios, prefix) {
        var _this = _super.call(this, axios) || this;
        _this.prefix = prefix;
        return _this;
    }
    AbstractGetEntityResource.prototype.getPath = function (id) {
        if (id === undefined) {
            return this.prefix;
        }
        else {
            var idPath = this.getIdPathRepresentation(id);
            return this.prefix + "/" + idPath;
        }
    };
    AbstractGetEntityResource.prototype.getIdPathRepresentation = function (id) {
        return '' + id;
    };
    AbstractGetEntityResource.prototype.get = function (id, cancelTokenSource) {
        var path = this.getPath(id);
        var cancelOptions = cancelTokenSource ? { cancelToken: cancelTokenSource.token } : undefined;
        var promise = this.wrapPromise(this.axios.get(path, cancelOptions));
        return promise;
    };
    return AbstractGetEntityResource;
}(AbstractResource_1.default));
exports.default = AbstractGetEntityResource;
//# sourceMappingURL=AbstractGetEntityResource.js.map