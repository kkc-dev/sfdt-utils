'use strict';

require('lodash/get');
var blocksProcess = require('./blocksProcess-4dde0085.js');
var queryBookmark = require('./queryBookmark.js');
var lodash = require('lodash');

/*
* Do something to the content of a list of bookmarks
*
* @param {object} sfdt - The raw SFDT
* @param {array} bookmarks - List of bookmark id's to change contents of
* @param {func} action - Action to perform
*
*/
var process = (function (sfdt, bookmarks, doInlineMatchingAction, doBlockMatchingAction) {
    var currentlyInsideBookmarks = []; // at top, so we can process bookmarks that span blocks
    if (!sfdt) {
        return;
    }
    return blocksProcess.processSFDT(sfdt, function (block) {
        var callbackBlock = function (block) {
            // console.log('Checking block:', block)
            if (lodash.intersection(bookmarks, currentlyInsideBookmarks).length > 0) {
                // console.log('Inside!', {highlightColor: get(block, 'characterFormat.highlightColor')}, {intersection: intersection(bookmarks, currentlyInsideBookmarks)})
                return doBlockMatchingAction(block);
            }
            return block;
        };
        var callbackInline = function (inlines) {
            // const newInlines: any[] = []
            inlines.forEach(function (inline) {
                inline = blocksProcess.processBlock(inline, callbackInline, callbackBlock);
                if (queryBookmark.isBookmarkStart(inline)) {
                    currentlyInsideBookmarks.push(inline.name);
                }
                if (queryBookmark.isBookmarkEnd(inline)) {
                    currentlyInsideBookmarks = lodash.without(currentlyInsideBookmarks, inline.name);
                }
                if (lodash.intersection(bookmarks, currentlyInsideBookmarks).length > 0) {
                    // console.log('Inside!', {highlightColor: get(block, 'characterFormat.highlightColor')}, {intersection: intersection(bookmarks, currentlyInsideBookmarks)})
                    // @TODO: change from a mutation
                    doInlineMatchingAction(inline);
                }
            });
            return inlines;
        };
        return blocksProcess.processBlock(block, callbackInline, callbackBlock);
    });
});

/*
* Change the highlights of bookmark(s) contents
*
* @param {object} sfdt - The raw SFDT
* @param {array} bookmarks - List of bookmark id's to change contents of
* @param {string} highlightColor - Hex colour to change bookmark highlight to
*
* eg: bookmarkHighlight(sfdt, ['bookmark_id'], '#ff0000') // red
*/
var bookmarkHighlight = (function (sfdt, bookmarks, highlightColor) {
    // console.log('Checking bookmarks:', bookmarks)
    if (highlightColor === void 0) { highlightColor = ''; }
    var processInline = function (inline) {
        // we don't want to loose format on highlight
        // helps to reserve text format on highlight
        if (!inline.characterFormat) {
            inline.characterFormat = {};
        }
        // console.log('Smoking colour.')
        inline.characterFormat.highlightColor = highlightColor;
        return inline;
    };
    var processBlock = function (block) {
        if (!block.characterFormat) {
            block.characterFormat = {};
        }
        if (block.characterFormat) {
            block.characterFormat.highlightColor = highlightColor;
        }
        return block;
    };
    return process(sfdt, bookmarks, processInline, processBlock);
});

module.exports = bookmarkHighlight;
