const { dispatchUndoAction } = require ('~/MainCanvas/dispatchUndoAction.js');


/**
 * The main purpose of this middleware is to handle undo/redo actions, adding to the undo stack
 * when an undoable action is dispatched.
 */
module.exports = store => next => action =>
{
	let state = store.getState ();

	const { type, payload } = action;

	if ( type === 'UNDO'  ||  type === 'REDO' )
	{
		let actionStack = null;

		if ( type === 'UNDO' )
		{
			actionStack = state.mainCanvas.undoStack;
		}
		else
		{
			actionStack = state.mainCanvas.redoStack;
		}

		// Dispatch the last action from the undo/redo stack, if there's even anything there.
		if ( actionStack.length > 0 )
		{
			store.dispatch (actionStack[actionStack.length - 1]);
		}
	}

	// We don't want to add another undo action to the stack if we're already dispatching one.
	if ( action.isUndoRedo )
	{
		return next (action);
	}

	/**
	 * If we're deleting a shape, we have to get its reference before it gets removed so we can
	 * recreate it if we need to undo.
	 */
	const prevShapes = state.mainCanvas.shapes;

	let prevShape = null;

	if ( Object.keys (prevShapes).length > 0 )
	{
		prevShape = prevShapes[state.mainCanvas.shapeIndex - 1];
	}

	// Let the rest of the actions run and /then/ add the undo action.
	const nextAction = next (action);

	const { shapeIndex } = store.getState ().mainCanvas;

	switch ( type )
	{
		case 'ADD_RECTANGLE':
		{
			dispatchUndoAction (store.dispatch, action, 'REMOVE_RECTANGLE', shapeIndex - 1);
			break;
		}

		case 'ADD_ARROW':
		{
			dispatchUndoAction (store.dispatch, action, 'REMOVE_ARROW', shapeIndex - 1);
			break;
		}

		case 'REMOVE_RECTANGLE':
		{
			dispatchUndoAction (store.dispatch, action, 'ADD_RECTANGLE', prevShape);
			break;
		}

		case 'REMOVE_ARROW':
		{
			dispatchUndoAction (store.dispatch, action, 'ADD_ARROW', prevShape);
			break;
		}
	}

	return nextAction;
}
