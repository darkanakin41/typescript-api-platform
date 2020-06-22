"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The basic comportment of a resource which access an API
 *
 * The Axios response stay available using the property `$axios`
 */
var AbstractResource = /** @class */ (function () {
    function AbstractResource(axios, ObjectConstructor) {
        this.axios = axios;
        if (ObjectConstructor) {
            this.objectFactory = function (data) {
                if (Array.isArray(data)) {
                    data = data.map(function (item) {
                        var constructed = new ObjectConstructor();
                        return Object.assign(constructed, item);
                    });
                }
                else {
                    var constructed = new ObjectConstructor();
                    data = Object.assign(constructed, data);
                }
                return data;
            };
        }
    }
    AbstractResource.prototype.wrapHydraItem = function (data) {
        var $hydra = {};
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key.startsWith('@') || (key.startsWith('hydra') && key !== 'hydra:member')) {
                $hydra[key] = data[key];
                delete data[key];
            }
        }
        if ($hydra['@type'] === 'hydra:Collection') {
            data = data['hydra:member'];
            for (var _b = 0, _c = Object.keys(data); _b < _c.length; _b++) {
                var key = _c[_b];
                data[key] = this.wrapHydraItem(data[key]);
            }
        }
        data.$hydra = $hydra;
        return data;
    };
    AbstractResource.prototype.wrapPromise = function (axiosPromise, objectFactory) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axiosPromise.then(function (axiosResponse) {
                var data = axiosResponse.data;
                if (typeof data === 'object') {
                    data = _this.wrapHydraItem(data);
                    if (!objectFactory) {
                        objectFactory = _this.objectFactory;
                    }
                    if (objectFactory) {
                        data = objectFactory(data);
                        axiosResponse.data = data;
                    }
                    data.$axios = axiosResponse;
                    delete data.$axios.data;
                    var headers = axiosResponse.headers;
                    if ('pagination-page' in headers || 'pagination-itemsperpage' in headers || 'pagination-itemstotalcount' in headers) {
                        data.$page = {
                            page: parseInt(headers['pagination-page'], 10),
                            itemsPerPage: parseInt(headers['pagination-itemsperpage'], 10),
                            itemsTotalCount: parseInt(headers['pagination-itemstotalcount'], 10)
                        };
                    }
                    resolve(data);
                }
                else {
                    resolve(axiosResponse.data);
                }
            }).catch(reject);
        });
    };
    return AbstractResource;
}());
exports.default = AbstractResource;
//# sourceMappingURL=AbstractResource.js.map