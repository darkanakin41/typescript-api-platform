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
var IdData_1 = require("./IdData");
var AbstractData = /** @class */ (function (_super) {
    __extends(AbstractData, _super);
    function AbstractData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AbstractData;
}(IdData_1.default));
exports.default = AbstractData;
//# sourceMappingURL=AbstractData.js.map