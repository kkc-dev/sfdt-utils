'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _tslib = require('./_tslib-cfb3c16c.js');
var get = _interopDefault(require('lodash/get'));
var blocksProcess = require('./blocksProcess-4dde0085.js');

var populate = (function (data, sfdt, prefix) {
    if (prefix === void 0) { prefix = 'DATA::'; }
    if (!sfdt) {
        return;
    }
    return blocksProcess.processSFDT(sfdt, function (block) {
        var callbackBlock = function (block) {
            if (get(block, 'inlines.rows')) {
                return get(block, 'inlines');
            }
            return block;
        };
        var callbackInline = function (inlines) {
            var dataMode = false;
            // using objects here allows for nested bookmarks
            var processing = {};
            var doneProcessing = {};
            // keep track of the current one
            var currentlyProcessing;
            var newInlines = [];
            inlines.forEach(function (inline) {
                var newInline = _tslib.__assign({}, inline);
                // bookmark end
                if (inline.bookmarkType === 1) {
                    processing[inline.name] = false;
                    if (inline.name.includes(prefix)) {
                        dataMode = false;
                    }
                    currentlyProcessing = '';
                    // keep end tag
                    newInlines.push(newInline);
                    return;
                }
                // middle of a bookmark
                // NOTE: needs to be above the start processing but below end
                // (so it does not also process the opening tag etc)
                if (dataMode) {
                    // if (processing[inline.name]) {
                    if (!doneProcessing[currentlyProcessing]) {
                        if (data[currentlyProcessing] !== undefined && data[currentlyProcessing] !== '') {
                            // console.log('Doing processing on:', newInline, {newText: data[currentlyProcessing]})
                            newInline.text = data[currentlyProcessing] + ' ';
                            if (newInline.characterFormat) {
                                newInline.characterFormat.highlightColor = '';
                            }
                        }
                        newInlines.push(newInline);
                        doneProcessing[currentlyProcessing] = true;
                    }
                    return;
                }
                // bookmark start
                if (inline.bookmarkType === 0) {
                    if (inline.name.includes(prefix)) {
                        dataMode = true;
                    }
                    currentlyProcessing = inline.name;
                    processing[inline.name] = true;
                    // keep bookmark start tag
                    newInlines.push(newInline);
                    return;
                }
                // keep the normal non-inside bookmark and not bookmark start test
                newInlines.push(newInline);
            });
            // console.log('Processing results:', {processing, doneProcessing})
            return newInlines;
        };
        return blocksProcess.processBlock(block, callbackInline, callbackBlock);
    });
});
// export default (data, sfdt, prefix = 'DATA::') => {
// 	debug && console.log('data, sfdt', {data, sfdt})
// 	const processInlines = (inlines) => {
// 		let dataMode = false
// 		// using objects here allows for nested bookmarks
// 		let processing = {}
// 		let doneProcessing = {}
// 		// keep track of the current one
// 		let currentlyProcessing
// 		// console.log('inlines', inlines)
// 		const newInlines: any[] = []
// 		inlines.forEach((inline) => {
// 			const newInline = {...inline}
// 			// bookmark end
// 			if (inline.bookmarkType === 1) {
// 				processing[inline.name] = false
// 				debug && console.log('Stopping processing', inline.name, inline)
// 				if (inline.name.includes(prefix)) {
// 					dataMode = false
// 				}
// 				currentlyProcessing = ''
// 				// keep end tag
// 				newInlines.push(newInline)
// 				return
// 			}
// 			// middle of a bookmark
// 			// NOTE: needs to be above the start processing but below end
// 			// (so it does not also process the opening tag etc)
// 			if (dataMode) {
// 			// if (processing[inline.name]) {
// 				if (!doneProcessing[currentlyProcessing]) {
// 					debug && console.log('Replacing:', newInline, data[currentlyProcessing])
// 					if (data[currentlyProcessing] !== undefined && data[currentlyProcessing] !== '') {
// 						// console.log('Doing processing on:', newInline, {newText: data[currentlyProcessing]})
// 						newInline.text = data[currentlyProcessing] + ' '
// 						if (newInline.characterFormat) {
// 							newInline.characterFormat.highlightColor = ''
// 						}
// 					}
// 					newInlines.push(newInline)
// 					doneProcessing[currentlyProcessing] = true
// 				} else {
// 					// no else, but just a comment to make it clear
// 					// we are dropping this line
// 					// because we only use one child inside a bookmark
// 				}
// 				return
// 			}
// 			// bookmark start
// 			if (inline.bookmarkType === 0) {
// 				if (inline.name.includes(prefix)) {
// 					dataMode = true
// 				}
// 				currentlyProcessing = inline.name
// 				processing[inline.name] = true
// 				// keep bookmark start tag
// 				newInlines.push(newInline)
// 				debug && console.log('Starting processing', inline.name, inline)
// 				return
// 			}
// 			// keep the normal non-inside bookmark and not bookmark start test
// 			newInlines.push(newInline)
// 		})
// 		// console.log('Processing results:', {processing, doneProcessing})
// 		return newInlines
// 	}
// 	process(sfdt, processInlines)
// 	return sfdt
// }

module.exports = populate;
