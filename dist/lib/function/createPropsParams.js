"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createPropsParams(props) {
    var params = new Set();
    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
        var prop = props_1[_i];
        var path = prop.split('.');
        var i = 0;
        var param = 'props';
        while (i < path.length) {
            if (i === path.length - 1) {
                if (path[i] === '*') {
                    param += '=true';
                }
                else {
                    param += "[]=" + path[i];
                }
            }
            else {
                param += "[" + path[i] + "]";
            }
            i++;
        }
        params.add(param);
    }
    return Array.from(params).join('&');
}
exports.default = createPropsParams;
//# sourceMappingURL=createPropsParams.js.map