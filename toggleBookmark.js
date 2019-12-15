'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var get = _interopDefault(require('lodash/get'));
var filter = _interopDefault(require('lodash/filter'));
var processInlines = require('./processInlines.js');
var queryBookmark = require('./queryBookmark.js');
var first = _interopDefault(require('lodash/first'));
var last = _interopDefault(require('lodash/last'));
var isEmpty = _interopDefault(require('lodash/isEmpty'));

var blockIncludeEndingConditon = function (block, name) {
    var inlines = get(block, 'inlines');
    var conditionalEndingBookmarks = filter(inlines, function (inline) {
        if (queryBookmark.isConditionalBookmark(inline) &&
            queryBookmark.isMatchingBookmark(inline, name) &&
            queryBookmark.isBookmarkEnd(inline) &&
            !conditionEndInSameLastInlines(inline, name)) {
            return true;
        }
        return false;
    });
    if (conditionalEndingBookmarks.length) {
        return true;
    }
    return false;
};
var blockInlcudeStartCondition = function (block, name) {
    var inlines = get(block, 'inlines');
    var conditionStartBookmarks = filter(inlines, function (inline) {
        if (queryBookmark.isConditionalBookmark(inline) &&
            queryBookmark.isMatchingBookmark(inline, name) &&
            queryBookmark.isBookmarkStart(inline) &&
            !conditionStartInFirstInlines(inline, name)) {
            return true;
        }
        return false;
    });
    if (conditionStartBookmarks.length) {
        return true;
    }
    return false;
};
var conditionStartEndInSameInlines = function (block, name) {
    var inlines = get(block, 'inlines');
    var firstElementOfInlines = first(inlines);
    var lastElementOfInlines = last(inlines);
    if (queryBookmark.isMatchingBookmark(firstElementOfInlines, name) &&
        queryBookmark.isConditionalBookmark(firstElementOfInlines) &&
        queryBookmark.isMatchingBookmark(lastElementOfInlines, name) &&
        queryBookmark.isConditionalBookmark(lastElementOfInlines)) {
        return true;
    }
    return false;
};
var conditionStartInFirstInlines = function (block, name) {
    var inlines = get(block, 'inlines');
    var firstElementOfInlines = first(inlines);
    if (queryBookmark.isMatchingBookmark(firstElementOfInlines, name) &&
        queryBookmark.isConditionalBookmark(firstElementOfInlines)) {
        return true;
    }
    return false;
};
var conditionEndInSameLastInlines = function (block, name) {
    var inlines = get(block, 'inlines');
    var lastElementOfInlines = last(inlines);
    if (queryBookmark.isMatchingBookmark(lastElementOfInlines, name) &&
        queryBookmark.isConditionalBookmark(lastElementOfInlines)) {
        return true;
    }
    return false;
};
function canUseListCondition(block, name) {
    // condition for numbering condition
    // 1. if block don't have paragraphFormat.listFormat
    // represent block is not list
    var blockParagraphFormat = get(block, 'paragraphFormat');
    var listFormat = get(blockParagraphFormat, 'listFormat');
    if (!listFormat && !isEmpty(listFormat)) {
        return false;
    }
    // 2. if block.inlines first element is conditional bookmark
    // represent block may have partials condition
    // condition don't start from the beginning of the line
    if (conditionStartEndInSameInlines(block, name)) {
        return true;
    }
    // 3. if block has conditional bookmark at start but
    // last inline in same block is not ending matching conditional bookmark
    if (conditionStartInFirstInlines(block, name) &&
        !conditionEndInSameLastInlines(block, name) &&
        !blockIncludeEndingConditon(block, name)) {
        return true;
    }
    // 4. if block has conditional bookmark as end but
    // don't have same bookmark in same inlines
    if (conditionEndInSameLastInlines(block, name) &&
        !conditionEndInSameLastInlines(block, name) &&
        !blockInlcudeStartCondition(block, name)) {
        return true;
    }
    return false;
}

/**
 * Stack class
 */
var Stack = /** @class */ (function () {
    // array is used to implement stack
    function Stack() {
        this.items = [];
    }
    /**
     * stack methods
     */
    /**
     * push element into the items
     *
     * @param element
     */
    Stack.prototype.push = function (element) {
        // push element into the items
        this.items.push(element);
    };
    /**
     * Return top most element in the stack
     * and removes it from the stack
     * Underflow if stack is empty
     */
    Stack.prototype.pop = function () {
        if (this.items.length === 0)
            return -1;
        return this.items.pop();
    };
    /**
     * Return the top most element from the stack
     * but doesn't delete it.
     */
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1];
    };
    Stack.prototype.peekAt = function () {
        return this.items.length > 0 ? this.items.length - 1 : 0;
    };
    /**
     * Return true if stack is empty
     */
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    /**
     * Print the complete stack
     */
    Stack.prototype.printStack = function () {
        var str = '';
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + '';
        return str;
    };
    return Stack;
}());

// DEPRECATED, use sfdt/blocksProcess
// export const makeToggleOff = (inlines: any[], name: String) => {
//   const newInlines: any[] = []; // Should act as queue for getting new list of inlines
//   const stackOfBookmarks = new Stack(); // will be used to find relationship of bookmarks
//   let toggleOffAtIndex = null; // will be used to track toggle off object index at bookmark block
//   inlines.forEach((inline, index) => {
//     const nextInline = inlines[index + 1];
//     const prevInline = inlines[index - 1];
//     // add in newInline is inline isn't toggle object
//     if (!isToggleObject(inline)) {
//       newInlines.push(inline);
//     }
//     // if we have conditional bookmark, then we need to find
//     // either we can toggle off condition or not
//     if (isConditionalBookmark(inline)) {
//       const isSameBookmark = isMatchingBookmark(inline, name);
//       // for every starting bookmark, we push in stack
//       // and for every ending bookmark, we pop out from stack
//       // this help us to find relation between bookmark block
//       // if parent is toggle off then we don't have to toggle off any child
//       if (isBookmarkStart(inline)) {
//         stackOfBookmarks.push(inline);
//         if (
//           isSameBookmark &&
//           (toggleOffAtIndex === null ||
//             stackOfBookmarks.peekAt() <= toggleOffAtIndex)
//         ) {
//           toggleOffAtIndex = stackOfBookmarks.peekAt();
//         }
//         if (
//           isToggleObject(inline) &&
//           stackOfBookmarks.peekAt() <= toggleOffAtIndex
//         ) {
//           toggleOffAtIndex = stackOfBookmarks.peekAt();
//         }
//         if (
//           isSameBookmark &&
//           nextInline &&
//           !isToggleStart(nextInline) &&
//           toggleOffAtIndex === stackOfBookmarks.peekAt()
//         ) {
//           newInlines.push({
//             hasFieldEnd: true,
//             fieldType: 0
//           });
//         }
//       } else if (isBookmarkEnd(inline)) {
//         if (
//           isSameBookmark &&
//           prevInline &&
//           !isToggleEnd(prevInline) &&
//           stackOfBookmarks.peekAt() <= toggleOffAtIndex
//         ) {
//           const lastIndex = newInlines.findIndex((el, index) => {
//             if (el.name === inline.name && el.bookmarkType === 1) {
//               return index;
//             }
//             return -1;
//           });
//           newInlines.splice(lastIndex - 1, 0, {
//             fieldType: 2
//           });
//           if (stackOfBookmarks.peekAt() === toggleOffAtIndex) {
//             toggleOffAtIndex = null;
//           }
//         }
//         stackOfBookmarks.pop();
//       }
//     }
//     // already available, need to decide to keep it or remove it
//     if (isToggleObject(inline)) {
//       if (toggleOffAtIndex === null) {
//         newInlines.push(inline);
//         toggleOffAtIndex = stackOfBookmarks.peekAt();
//       } else if (stackOfBookmarks.peekAt() <= toggleOffAtIndex) {
//         newInlines.push(inline);
//       }
//     }
//   });
//   return newInlines;
// };
/**
 * Toggle Bookmark - Hide or show the content of a bookmark
 *
 * @param {Object} SFDT - The SF SFDT JSON object
 * @param {String} bookmarkName - Bookmark to toggle on or off
 * @param {Boolean} toggleOn - True to show bookmark content, false to hide it
 *
 * @returns {Object} updatedSFDT
 */
var toggleBookmark = function (sfdt, name, toggleOn) {
    // console.log('toggleBookmark name', name)
    // console.log('toggleBookmark mode', toggleOn ? 'on' : 'off')
    if (toggleOn === void 0) { toggleOn = true; }
    if (toggleOn) {
        // toggle field on
        var processInlines$1 = function (inlines) {
            var newInlines = [];
            inlines.forEach(function (inline, index) {
                var defaultAdd = true;
                var nextInline = inlines[index + 1];
                var prevInline = inlines[index - 1];
                // console.log("FOUND, DOING TOGGLE ON");
                // don't add in newInlines if inline is toggleEnd inline object
                // and nextInline is matching bookmark
                // i.e fieldType is 2 or hasFieldEnd is true
                if (queryBookmark.isToggleEnd(inline) && queryBookmark.isMatchingBookmark(nextInline, name)) {
                    defaultAdd = false;
                }
                if (queryBookmark.isToggleStart(inline) && queryBookmark.isMatchingBookmark(prevInline, name)) {
                    defaultAdd = false;
                }
                if (defaultAdd) {
                    newInlines.push(inline);
                }
            });
            return newInlines;
        };
        var processListBlock = function () { return true; };
        processInlines(sfdt, processInlines$1, processListBlock);
    }
    else {
        var stack_1 = new Stack();
        // toggle field off
        var processInlines$1 = function (inlines) {
            var newInlines = [];
            var inMatchingBookmark = false;
            inlines.forEach(function (inline, index) {
                var nextInline = inlines[index + 1];
                var prevInline = inlines[index - 1];
                if (queryBookmark.isMatchingBookmark(inline, name)) {
                    // console.log('Matched:', name)
                    inMatchingBookmark = true;
                }
                if (queryBookmark.isBookmarkEnd(inline) && inMatchingBookmark) {
                    if (prevInline && prevInline.fieldType === undefined) {
                        // console.log('ADDING end')
                        newInlines.push({
                            fieldType: 1
                        });
                    }
                    // make sure to only add once
                    // so we toggle this flag after anytime we match the end of the bookmark
                    inMatchingBookmark = false;
                }
                newInlines.push(inline);
                if (queryBookmark.isBookmarkStart(inline) && inMatchingBookmark) {
                    // check to see if bookmark is already off
                    // and if so we dont need to add another 'off' flag
                    if (nextInline && nextInline.fieldType === undefined) {
                        // console.log('ADDING start')
                        newInlines.push({
                            hasFieldEnd: true,
                            // these are added automatically by SF if they are not here
                            // so we add them in here manually now too so that tests can check for em
                            characterFormat: {},
                            fieldType: 0
                        });
                    }
                }
            });
            return newInlines;
        };
        // const processInlines = inlines => {
        // 	return makeToggleOff(inlines, name)
        // }
        var processListBlock = function (block) {
            if (canUseListCondition(block, name) || !stack_1.isEmpty()) {
                if (conditionStartEndInSameInlines(block, name)) {
                    return false;
                }
                if (conditionStartInFirstInlines(block, name)) {
                    stack_1.push(block);
                    return false;
                }
                if (conditionEndInSameLastInlines(block, name)) {
                    stack_1.pop();
                    return false;
                }
                return false;
            }
            return true;
        };
        processInlines(sfdt, processInlines$1, processListBlock);
    }
    return sfdt;
};

module.exports = toggleBookmark;
