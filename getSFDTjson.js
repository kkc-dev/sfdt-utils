'use strict';

var _tslib = require('./_tslib-cfb3c16c.js');

/**
* @param {Object} documentEditor - Instance of the SF document editor
*/
var getSFDTjson = (function (_a) {
    var documentEditor = _a.documentEditor;
    return documentEditor.saveAsBlob('Sfdt').then(function (blob) { return _tslib.__awaiter(void 0, void 0, void 0, function () {
        var json;
        return _tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (new Response(blob)).json()
                    // let result = {error: true}
                ];
                case 1:
                    json = _a.sent();
                    // let result = {error: true}
                    return [2 /*return*/, json];
            }
        });
    }); });
});

module.exports = getSFDTjson;
