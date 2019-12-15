'use strict';

var hasBookmark = require('./hasBookmark-351bcb8f.js');

/**
* Update a bookmark
*
* @param {String} name - name of bookmark
* @param {String} content - new content
* @param {Object} documentEditor - live documentEditor object
*/
var updater = function (name, content, documentEditor) {
    if (!documentEditor) {
        console.error('documentEditor is not ready.', documentEditor);
        return false;
    }
    if (!hasBookmark.hasBookmark(name, documentEditor)) {
        return false;
    }
    if (!documentEditor.selection) {
        console.error('documentEditor.selection is not ready.', documentEditor);
        return false;
    }
    documentEditor.selection.selectBookmark(name);
    documentEditor.editor.insertText(content);
    return true;
};

module.exports = updater;
