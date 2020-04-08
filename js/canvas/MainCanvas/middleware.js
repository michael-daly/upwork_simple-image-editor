const { addUndoAction } = require ('~/MainCanvas/actions.js');
const { swapUndoRedo  } = require ('~/MainCanvas/swapUndoRedo.js');


/**
 * The main purpose of this middleware is to handle undo/redo actions, adding to the undo stack
 * when an undoable action is dispatched.
 */
module.exports = store => next => action =>
{
	let state = store.getState ();

	const { dispatch } = store;

	const { undoStack, redoStack } = state.mainCanvas;
	const { type, payload }        = action;

	let actionStack = null;

	if ( type === 'UNDO' )
	{
		actionStack = undoStack;
	}
	else if ( type === 'REDO' )
	{
		actionStack = redoStack;
	}

	// Dispatch the last action from the undo/redo stack, if we're undoing/redoing and if there's
	// even anything there.
	if ( actionStack !== null  &&  actionStack.length > 0 )
	{
		dispatch (actionStack[actionStack.length - 1]);
	}

	// We don't want to add another undo action to the stack if we're already dispatching one.
	if ( action.isUndoRedo )
	{
		return next (action);
	}

	const nextAction     = next (action);
	const { shapeIndex } = store.getState ().mainCanvas;

	switch ( type )
	{
		case 'ADD_RECTANGLE':
		{
			dispatch (addUndoAction ({ ...action }, 'REMOVE_RECTANGLE', shapeIndex - 1));
			break;
		}

		case 'ADD_ARROW':
		{
			dispatch (addUndoAction ({ ...action }, 'REMOVE_ARROW',  shapeIndex - 1));
			break;
		}
	}

	return nextAction;
}
