"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = configurePage;
//# sourceMappingURL=configurePage.js.map