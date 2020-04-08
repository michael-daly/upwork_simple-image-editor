const { addUndoAction } = require ('~/MainCanvas/actions.js');
const { swapUndoRedo  } = require ('~/MainCanvas/swapUndoRedo.js');


module.exports = store => next => action =>
{
	const state = store.getState ();

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

	if ( actionStack !== null  &&  actionStack.length > 0 )
	{
		store.dispatch (actionStack[actionStack.length - 1]);
	}

	if ( action.isUndoRedo )
	{
		return next (action);
	}

	switch ( type )
	{
		case 'ADD_RECTANGLE':
		{
			store.dispatch (addUndoAction (action, 'REMOVE_RECTANGLE'));
			break;
		}
	}

	return next (action);
}
