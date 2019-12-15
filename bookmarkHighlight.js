'use strict';

var hasBookmark = require('./hasBookmark-351bcb8f.js');

/**
* Perform an action on a bookmark
*
* @param {String} name - name of bookmark
* @param {Object} documentEditor - live documentEditor object
*/
var action = function (name, action, documentEditor) {
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
    action({
        selection: documentEditor.selection
    });
    // unselect
    documentEditor.selection.moveToLineEnd();
};

/**
* @param {String} name -
* @param {Object} documentEditor - Instance of the SF document editor
* @param {String} colour -
*/
var unsafe_bookmarkHighlight = (function (name, documentEditor, colour) {
    if (colour === void 0) { colour = ''; }
    action(name, function (_a) {
        var selection = _a.selection;
        selection.characterFormat.highlightColor = colour;
    }, documentEditor);
});

module.exports = unsafe_bookmarkHighlight;
