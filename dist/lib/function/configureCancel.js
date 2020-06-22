"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function configureCancel(cancelTokenSource, config) {
    if (!cancelTokenSource) {
        return config;
    }
    if (!config) {
        config = {};
    }
    config.cancelToken = cancelTokenSource.token;
    return config;
}
exports.default = configureCancel;
//# sourceMappingURL=configureCancel.js.map