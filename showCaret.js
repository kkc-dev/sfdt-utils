'use strict';

/**
* Show blinking cursor.
*
* Note:
*	One caveat is that the cursor will move to line end because
*	`documentEditor.selection.showCaret()` doesn't make the cursor
*	blink so we have to call `documentEditor.selection.moveToLineEnd()`.
*
* @param {DocumentEditor} documentEditor - live documentEditor object
*/
function showCaret(documentEditor) {
    documentEditor.selection.showCaret();
    documentEditor.selection.moveToLineEnd();
}

module.exports = showCaret;
