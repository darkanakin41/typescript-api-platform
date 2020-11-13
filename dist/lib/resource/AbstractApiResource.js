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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractResource_1 = require("./AbstractResource");
var createPropsParams_1 = require("../function/createPropsParams");
var moment_1 = require("moment");
var AbstractApiResource = /** @class */ (function (_super) {
    __extends(AbstractApiResource, _super);
    function AbstractApiResource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractApiResource.prototype.loadProps = function (params, options) {
        if (options.props) {
            params.push(createPropsParams_1.default(options.props));
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
                var date = moment_1.default(item[key]);
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
}(AbstractResource_1.default));
exports.default = AbstractApiResource;
//# sourceMappingURL=AbstractApiResource.js.map