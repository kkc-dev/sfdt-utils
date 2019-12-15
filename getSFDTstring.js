'use strict';

require('./_tslib-cfb3c16c.js');
var getSFDTjson = require('./getSFDTjson.js');

var getSFDTstring = (function (_a) {
    var documentEditor = _a.documentEditor, _b = _a.sections, sections = _b === void 0 ? false : _b;
    return getSFDTjson({ documentEditor: documentEditor }).then(function (json) {
        if (json.error) {
            return 'There was an error with your json';
        }
        var returnObject = sections
            ? json.sections
            : json;
        return JSON.stringify(returnObject, null, 1);
    });
});

module.exports = getSFDTstring;
