'use strict';

var unselect = require('./unselect.js');
require('./hasBookmark-351bcb8f.js');
var bookmarkHighlight = require('./bookmarkHighlight.js');

/**
* Insert a bookmark at the currently selected point in the editor
*
* @param {Object} options - {
*                         	bookmarkName: String = Name of the bookmark to insert
*                         	highlightColor?: String =  Hex code of background: eg: '#FFFFFF'
*                         	bookmarkContent?: string = Change contents of the bookmark to this string
*                         }
* @param {Object} documentEditor
*/
var insertBookmark = function (options, documentEditor) {
    documentEditor.editor.insertBookmark(options.bookmarkName);
    if (options.highlightColor) {
        // NOTE: setTimeout is required, else sometimes this will not apply highlight properly
        setTimeout(function () {
            // 	debug && console.log('Adding highlight:', options.highlightColor)
            bookmarkHighlight(options.bookmarkName, documentEditor, options.highlightColor);
        }, 0);
    }
    if (options.bookmarkContent) {
        documentEditor.editor.insertText(options.bookmarkContent);
    }
    else {
        if (!options.noForceUpdate) {
            // update something to stop formatting bug
            unselect(documentEditor);
        }
    }
};

module.exports = insertBookmark;
