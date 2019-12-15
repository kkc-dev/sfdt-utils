'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var get = _interopDefault(require('lodash/get'));
var filter = _interopDefault(require('lodash/filter'));

// DEPRECATED, use sfdt/blocksProcess
var process = (function (sfdt, callback, listConditionCallback) {
    if (listConditionCallback === void 0) { listConditionCallback = function (arg) { return true; }; }
    if (!sfdt.sections) {
        console.warn('Missing: sfdt.sections', sfdt);
        return false;
    }
    sfdt.sections.forEach(function (section) {
        if (!section.blocks && !section.headersFooters) {
            return false;
        }
        var newBlocks = filter(section.blocks, function (block) {
            if (!block.inlines) {
                return true;
            }
            var canAddBlock = listConditionCallback(block);
            if (!canAddBlock) {
                return false;
            }
            else {
                block.inlines = callback(block.inlines);
                return true;
            }
        });
        section.blocks = newBlocks;
        if (get(section, 'headersFooters')) {
            var _loop_1 = function (eachKey) {
                var child = section.headersFooters[eachKey];
                if (child.blocks) {
                    child.blocks.forEach(function (block) {
                        if (!block.inlines) {
                            return false;
                        }
                        child.inlines = callback(block.inlines);
                    });
                }
            };
            for (var eachKey in section.headersFooters) {
                _loop_1(eachKey);
            }
        }
    });
    return true;
});

module.exports = process;
