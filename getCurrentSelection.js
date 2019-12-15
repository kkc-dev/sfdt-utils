'use strict';

var getCurrentSelection = function (documentEditor) {
    return documentEditor.editor.selection.text;
};

module.exports = getCurrentSelection;
