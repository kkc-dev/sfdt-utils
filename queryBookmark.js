'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var get = _interopDefault(require('lodash/get'));

// is inlineObject a bookmark?
var isBookmark = function (inlineObject) {
    if (!inlineObject)
        return false;
    if (inlineObject.bookmarkType !== undefined) {
        return inlineObject;
    }
    return false;
};
// see if inlineObject is a bookmark matching the one we are checking for
var isMatchingBookmark = function (inlineObject, name) {
    var matched = isBookmark(inlineObject);
    if (get(matched, 'name') === name) {
        return matched;
    }
    return false;
};
var isConditionalBookmark = function (inlineObject, prefix) {
    if (prefix === void 0) { prefix = 'COND'; }
    var name = inlineObject.name;
    return isBookmark(inlineObject) && name && name.split('::').includes(prefix) ? true : false;
};
// is inlineObject a bookmark start object
var isBookmarkStart = function (inlineObject) {
    var matched = isBookmark(inlineObject);
    if (get(matched, 'bookmarkType') === 0) {
        return matched;
    }
    return false;
};
// is inlineObject a bookmark end object
var isBookmarkEnd = function (inlineObject) {
    var matched = isBookmark(inlineObject);
    if (get(matched, 'bookmarkType') === 1) {
        return matched;
    }
    return false;
};
var isToggleStart = function (inlineObject) {
    return get(inlineObject, 'hasFieldEnd') ? true : false;
};
var isToggleEnd = function (inlineObject) {
    return get(inlineObject, 'fieldType') === 1 ? true : false;
};
var isToggleObject = function (inlineObject) {
    return isToggleStart(inlineObject) || isToggleEnd(inlineObject);
};

exports.isBookmark = isBookmark;
exports.isBookmarkEnd = isBookmarkEnd;
exports.isBookmarkStart = isBookmarkStart;
exports.isConditionalBookmark = isConditionalBookmark;
exports.isMatchingBookmark = isMatchingBookmark;
exports.isToggleEnd = isToggleEnd;
exports.isToggleObject = isToggleObject;
exports.isToggleStart = isToggleStart;
