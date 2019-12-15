'use strict';

/**
* Has Bookmark - Detect if a bookmark exists
*
* @param {String} name - Bookmark name
* @param {Object} documentEditor - Instance of the SF document editor
*
* @returns {Boolean} - True if the bookmark exists in the editor
*/
var hasBookmark = function (name, documentEditor) {
    return !!documentEditor.getBookmarks().find(function (bookmark) { return bookmark === name; });
};

exports.hasBookmark = hasBookmark;
