'use strict';

var processTable = function (parent, callbackInline, callbackBlock) {
    if (!parent.rows) {
        return false;
    }
    parent.rows.forEach(function (row) {
        if (!row.cells) {
            return false;
        }
        row.cells.forEach(function (cell) {
            if (!cell.blocks) {
                return false;
            }
            cell.blocks.forEach(function (block) {
                block = callbackBlock(block);
                if (!block.inlines) {
                    return false;
                }
                block.inlines = callbackInline(block.inlines);
            });
        });
    });
    return parent;
};
var processBlock = function (block, callbackInline, callbackBlock) {
    // 1. process block top level content first
    block = callbackBlock(block);
    // 2. then delve into inlines and tables:
    var processedBlock = processTable(block, callbackInline, callbackBlock);
    if (processedBlock) {
        block = processedBlock;
    }
    if (block.inlines) {
        block.inlines = callbackInline(block.inlines);
    }
    return block;
};
// callback is run on each block
// things in blocks we care about:
//  - rows            // for tables
//  - inlines         // for inline content
//  - characterFormat
var processBlocks = function (parent, callback) {
    if (!parent.sections) {
        // console.warn('Missing: sections', parent)
        return false;
    }
    parent.sections.forEach(function (section) {
        if (!section.blocks) {
            return false;
        }
        section.blocks.forEach(function (block) {
            block = callback(block);
        });
    });
    return true;
};
var processSFDT = function (sfdt, doProcess) {
    processBlocks(sfdt, doProcess);
    return sfdt;
};

exports.processBlock = processBlock;
exports.processSFDT = processSFDT;
