'use strict';

var unselect = function (documentEditor) {
    documentEditor.selection.moveToLineEnd();
};

module.exports = unselect;
