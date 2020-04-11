const { has } = require ('~/util/has.js');

const { createUndoAction } = require ('~/MainCanvas/createUndoAction.js');


/**
 * The main purpose of this middleware is to handle undo/redo actions, adding to the undo stack
 * when an undoable action is dispatched.
 */
module.exports = store => next => action =>
{
	let state = store.getState ();

	const { type, payload } = action;

	switch ( type )
	{
		case 'UNDO':
		case 'REDO':
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

			break;
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

	if ( has (prevShapes, payload) )
	{
		prevShape = prevShapes[payload];
	}

	// Let the rest of the actions run and /then/ add the undo action.
	const nextAction = next (action);

	const { shapeIndex } = store.getState ().mainCanvas;

	switch ( type )
	{
		case 'ADD_RECTANGLE':
		{
			createUndoAction (store.dispatch, action, 'REMOVE_RECTANGLE', shapeIndex - 1);
			break;
		}

		case 'ADD_ARROW':
		{
			createUndoAction (store.dispatch, action, 'REMOVE_ARROW', shapeIndex - 1);
			break;
		}

		case 'REMOVE_RECTANGLE':
		{
			createUndoAction (store.dispatch, action, 'ADD_RECTANGLE', prevShape);
			break;
		}

		case 'REMOVE_ARROW':
		{
			createUndoAction (store.dispatch, action, 'ADD_ARROW', prevShape);
			break;
		}

		case 'CLEAR_SHAPES':
		{
			createUndoAction (store.dispatch, action, 'SET_SHAPES', prevShapes);
			break;
		}
	}

	return nextAction;
}
