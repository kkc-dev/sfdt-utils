export {default as populate} from './sfdt/populate'
export {default as processInlines} from './sfdt/processInlines'
export {default as toggleBookmark} from './sfdt/toggleBookmark'

import unsafe_getCurrentSelection from './getCurrentSelection'
import unsafe_unselect from './unselect'
import unsafe_showCaret from './showCaret'

import {
	isMatchingBookmark as unsafe_isMatchingBookmark,
	isBookmarkStart as unsafe_isBookmarkStart,
	isBookmarkEnd as unsafe_isBookmarkEnd,
	isToggleStart as unsafe_isToggleStart,
	isToggleEnd as unsafe_isToggleEnd,
	isToggleObject as unsafe_isToggleObject,
	isConditionalBookmark as unsafe_isConditionalBookmark,
} from './queryBookmark'

export {default as getSFDTjson} from './getSFDTjson'
export {default as getSFDTstring} from './getSFDTstring'

import unsafe_updateBookmarkContent from './updateBookmarkContent'
import unsafe_insertBookmark from './insertBookmark'
import unsafe_bookmarkHighlight from './bookmarkHighlight'
import unsafe_gotoBookmark from './bookmarkNavigate'
import unsafe_removeBookmarkAndHighlight from './removeBookmarkAndHighlight'

const safe = (callback) => (...args) => {
	try {
		return callback(...args)
	} catch (error) {
		console.error('SF Error:', error)
	}
}

const updateBookmarkContent = safe(unsafe_updateBookmarkContent)
const insertBookmark = safe(unsafe_insertBookmark)
const bookmarkHighlight = safe(unsafe_bookmarkHighlight)
const gotoBookmark = safe(unsafe_gotoBookmark)
const removeBookmarkAndHighlight = safe(unsafe_removeBookmarkAndHighlight)

const isMatchingBookmark = safe(unsafe_isMatchingBookmark)
const isBookmarkStart = safe(unsafe_isBookmarkStart)
const isBookmarkEnd = safe(unsafe_isBookmarkEnd)
const isToggleStart = safe(unsafe_isToggleStart)
const isToggleEnd = safe(unsafe_isToggleEnd)
const isToggleObject = safe(unsafe_isToggleObject)
const isConditionalBookmark = safe(unsafe_isConditionalBookmark)

const getCurrentSelection = safe(unsafe_getCurrentSelection)
const unselect = safe(unsafe_unselect)
const showCaret = safe(unsafe_showCaret)

export {
	updateBookmarkContent,
	insertBookmark,
	bookmarkHighlight,
	gotoBookmark,
	removeBookmarkAndHighlight,

	isMatchingBookmark,
	isBookmarkStart,
	isBookmarkEnd,
	isToggleStart,
	isToggleEnd,
	isToggleObject,
	isConditionalBookmark,

	getCurrentSelection,
	unselect,
	showCaret,
}

// feature to add - is selection empty:
// let selection: string = documentEditor.selection.text;
// if (!documentEditor.selection.isEmpty && /\S/.test(selection)) {