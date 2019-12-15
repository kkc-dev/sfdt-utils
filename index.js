'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./_tslib-cfb3c16c.js');
require('lodash/get');
require('./blocksProcess-4dde0085.js');
var populate = require('./populate.js');
require('lodash/filter');
var processInlines = require('./processInlines.js');
var queryBookmark = require('./queryBookmark.js');
require('lodash/first');
require('lodash/last');
require('lodash/isEmpty');
var toggleBookmark = require('./toggleBookmark.js');
var getCurrentSelection$1 = require('./getCurrentSelection.js');
var unselect$1 = require('./unselect.js');
var showCaret$1 = require('./showCaret.js');
var getSFDTjson = require('./getSFDTjson.js');
var getSFDTstring = require('./getSFDTstring.js');
require('./hasBookmark-351bcb8f.js');
var updateBookmarkContent$1 = require('./updateBookmarkContent.js');
var bookmarkHighlight$1 = require('./bookmarkHighlight.js');
var insertBookmark$1 = require('./insertBookmark.js');
var removeBookmarkAndHighlight$1 = require('./removeBookmarkAndHighlight.js');

var gotoBookmark = function (bookmark, documentEditor) {
    documentEditor.selection.navigateBookmark(bookmark);
};

var whichBookmarksAreCurrentlySelected = function (documentEditor, action) {
    var bookmarks = documentEditor.selection.bookmarks;
    // this is because the '.selection.bookmarks' is unstable and crashes lots
    // so if do a following action here, it will fail safely on the wrapping try/catch it their API crashes
    if (action) {
        action(bookmarks);
    }
    return bookmarks;
};

var safe = function (callback) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    try {
        return callback.apply(void 0, args);
    }
    catch (error) {
        console.error('SF Error:', error);
    }
}; };
var updateBookmarkContent = safe(updateBookmarkContent$1);
var insertBookmark = safe(insertBookmark$1);
var bookmarkHighlight = safe(bookmarkHighlight$1);
var gotoBookmark$1 = safe(gotoBookmark);
var removeBookmarkAndHighlight = safe(removeBookmarkAndHighlight$1);
var isMatchingBookmark = safe(queryBookmark.isMatchingBookmark);
var isBookmarkStart = safe(queryBookmark.isBookmarkStart);
var isBookmarkEnd = safe(queryBookmark.isBookmarkEnd);
var bookmarksSelected = safe(whichBookmarksAreCurrentlySelected);
var getCurrentSelection = safe(getCurrentSelection$1);
var unselect = safe(unselect$1);
var showCaret = safe(showCaret$1);
// feature to add - is selection empty:
// let selection: string = documentEditor.selection.text;
// if (!documentEditor.selection.isEmpty && /\S/.test(selection)) {

exports.populate = populate;
exports.processInlines = processInlines;
exports.isConditionalBookmark = queryBookmark.isConditionalBookmark;
exports.isToggleEnd = queryBookmark.isToggleEnd;
exports.isToggleObject = queryBookmark.isToggleObject;
exports.isToggleStart = queryBookmark.isToggleStart;
exports.toggleBookmark = toggleBookmark;
exports.getSFDTjson = getSFDTjson;
exports.getSFDTstring = getSFDTstring;
exports.bookmarkHighlight = bookmarkHighlight;
exports.bookmarksSelected = bookmarksSelected;
exports.getCurrentSelection = getCurrentSelection;
exports.gotoBookmark = gotoBookmark$1;
exports.insertBookmark = insertBookmark;
exports.isBookmarkEnd = isBookmarkEnd;
exports.isBookmarkStart = isBookmarkStart;
exports.isMatchingBookmark = isMatchingBookmark;
exports.removeBookmarkAndHighlight = removeBookmarkAndHighlight;
exports.showCaret = showCaret;
exports.unselect = unselect;
exports.updateBookmarkContent = updateBookmarkContent;
