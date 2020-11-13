(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('moment')) :
    typeof define === 'function' && define.amd ? define(['exports', 'moment'], factory) :
    (factory((global.typescriptApiPlatform = {}),global.moment));
}(this, (function (exports,moment) { 'use strict';

    moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var IdData = /** @class */ (function () {
        function IdData() {
            this.id = null;
        }
        return IdData;
    }());

    var AbstractData = /** @class */ (function (_super) {
        __extends(AbstractData, _super);
        function AbstractData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AbstractData;
    }(IdData));

    var Message = /** @class */ (function () {
        function Message() {
            this.message = null;
        }
        return Message;
    }());

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

    function configurePage(page, config) {
        if (!page) {
            return config;
        }
        if (!config) {
            config = {};
        }
        if (!config.headers) {
            config.headers = {};
        }
        config.headers['Pagination-Page'] = page.page;
        config.headers['Pagination-ItemsPerPage'] = page.itemsPerPage;
        return config;
    }

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
                axiosPromise
                    .then(function (axiosResponse) {
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
                        if ('pagination-page' in headers ||
                            'pagination-itemsperpage' in headers ||
                            'pagination-itemstotalcount' in headers) {
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
                })
                    .catch(reject);
            });
        };
        return AbstractResource;
    }());

    var AbstractApiResource = /** @class */ (function (_super) {
        __extends(AbstractApiResource, _super);
        function AbstractApiResource() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AbstractApiResource.prototype.loadProps = function (params, options) {
            if (options.props) {
                params.push(createPropsParams(options.props));
            }
        };
        AbstractApiResource.prototype.buildSearch = function (field, query, type, isArray) {
            if (isArray === void 0) { isArray = false; }
            if (type) {
                return field + "[" + type + "]=" + query;
            }
            if (isArray) {
                return field + "[]=" + query;
            }
            return field + "=" + query;
        };
        AbstractApiResource.prototype.loadSearches = function (params, options) {
            var _this = this;
            if (options.searches) {
                var _loop_1 = function (search) {
                    var searchArray;
                    if (['boolean', 'string', 'number'].indexOf(typeof search.query) !== -1) {
                        // @ts-ignore
                        searchArray = [search.query];
                    }
                    else {
                        // @ts-ignore
                        searchArray = search.query;
                    }
                    searchArray.forEach(function (item) {
                        params.push(_this.buildSearch(search.field, item, search.type, (searchArray.length > 1)));
                    });
                };
                for (var _i = 0, _a = options.searches; _i < _a.length; _i++) {
                    var search = _a[_i];
                    _loop_1(search);
                }
            }
        };
        AbstractApiResource.prototype.loadSort = function (params, options) {
            if (options.sort) {
                params.push("order[" + options.sort.field + "]=" + (options.sort.desc ? 'desc' : 'asc'));
            }
        };
        AbstractApiResource.prototype.loadPage = function (params, options) {
            if (options.page) {
                params.push('pagination=true');
                if (options.page.page) {
                    params.push("page=" + options.page.page);
                }
                if (options.page.itemsPerPage) {
                    params.push("itemsPerPage=" + options.page.itemsPerPage);
                }
            }
            else {
                params.push('pagination=false');
            }
        };
        AbstractApiResource.prototype.buildParams = function (options) {
            var params = [];
            if (!options)
                options = {};
            this.loadProps(params, options);
            this.loadSearches(params, options);
            this.loadSort(params, options);
            this.loadPage(params, options);
            return params;
        };
        AbstractApiResource.prototype.buildUrl = function (path, options) {
            var params = this.buildParams(options);
            return params && params.length > 0 ? path + "?" + params.join('&') : path;
        };
        AbstractApiResource.prototype.preProcessData = function (item) {
            Object.keys(item).forEach(function (key) {
                if (item[key] instanceof Date) {
                    var date = moment(item[key]);
                    item[key] = date.format('YYYY-MM-DD HH:mm:ss');
                }
            });
            return item;
        };
        AbstractApiResource.prototype.count = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var numberOfResultOptions, getNumberOfResults;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            numberOfResultOptions = __assign(__assign({}, options), {
                                page: {
                                    page: 1,
                                    itemsPerPage: 1
                                }
                            });
                            return [4 /*yield*/, this.get(numberOfResultOptions)];
                        case 1:
                            getNumberOfResults = _a.sent();
                            return [2 /*return*/, getNumberOfResults.$hydra['hydra:totalItems']];
                    }
                });
            });
        };
        AbstractApiResource.prototype.getAll = function (options) {
            var url = this.buildUrl(this.prefix, options);
            var axiosConfig = options ? options.axiosConfig : undefined;
            var promise = this.wrapPromise(this.axios.get(url, axiosConfig));
            return promise;
        };
        AbstractApiResource.prototype.get = function (options) {
            var url = this.buildUrl(this.prefix, options);
            var axiosConfig = options ? options.axiosConfig : undefined;
            var promise = this.wrapPromise(this.axios.get(url, axiosConfig));
            return promise;
        };
        AbstractApiResource.prototype.getOne = function (id, options) {
            var url = this.buildUrl(this.prefix + "/" + id, options);
            var axiosConfig = options ? options.axiosConfig : undefined;
            var promise = this.wrapPromise(this.axios.get(url, axiosConfig));
            return promise;
        };
        AbstractApiResource.prototype.post = function (item, options) {
            var url = this.buildUrl(this.prefix, options);
            var axiosConfig = options ? options.axiosConfig : undefined;
            var promise = this.wrapPromise(this.axios.post(url, this.preProcessData(item), axiosConfig));
            return promise;
        };
        AbstractApiResource.prototype.delete = function (id, options) {
            var url = this.buildUrl(this.prefix + "/" + id, options);
            var axiosConfig = options ? options.axiosConfig : undefined;
            var promise = this.wrapPromise(this.axios.delete(url, axiosConfig));
            return promise;
        };
        AbstractApiResource.prototype.put = function (id, item, options) {
            var url = this.buildUrl(this.prefix + "/" + id, options);
            var axiosConfig = options ? options.axiosConfig : undefined;
            var promise = this.wrapPromise(this.axios.put(url, this.preProcessData(item), axiosConfig));
            return promise;
        };
        AbstractApiResource.prototype.patch = function (id, item, options) {
            var url = this.buildUrl(this.prefix + "/" + id, options);
            var axiosConfig = options && options.axiosConfig ? options.axiosConfig : {};
            if (!axiosConfig.headers) {
                axiosConfig.headers = {};
            }
            if (!axiosConfig.headers['Content-Type']) {
                axiosConfig.headers['Content-Type'] = 'application/merge-patch+json';
            }
            var promise = this.wrapPromise(this.axios.patch(url, this.preProcessData(item), axiosConfig));
            return promise;
        };
        return AbstractApiResource;
    }(AbstractResource));

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
    }(AbstractResource));

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
    }(AbstractGetEntityResource));

    var AbstractDataResource = /** @class */ (function (_super) {
        __extends(AbstractDataResource, _super);
        function AbstractDataResource() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AbstractDataResource.prototype.getObjectId = function (object) {
            return object.id;
        };
        return AbstractDataResource;
    }(AbstractEntityResource));

    var DefaultDataResource = /** @class */ (function (_super) {
        __extends(DefaultDataResource, _super);
        function DefaultDataResource(axios, dataName) {
            return _super.call(this, axios, dataName) || this;
        }
        return DefaultDataResource;
    }(AbstractDataResource));

    // Expose all models

    exports.AbstractData = AbstractData;
    exports.IdData = IdData;
    exports.Message = Message;
    exports.configureCancel = configureCancel;
    exports.configurePage = configurePage;
    exports.createPropsParams = createPropsParams;
    exports.AbstractApiResource = AbstractApiResource;
    exports.AbstractDataResource = AbstractDataResource;
    exports.AbstractEntityResource = AbstractEntityResource;
    exports.AbstractGetEntityResource = AbstractGetEntityResource;
    exports.AbstractResource = AbstractResource;
    exports.DefaultDataResource = DefaultDataResource;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=typescript-api-platform.umd.js.map
