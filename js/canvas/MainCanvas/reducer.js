const { swapUndoRedo } = require ('~/MainCanvas/swapUndoRedo.js');


const defaultState =
{
	undoStack:  [],
	redoStack:  [],
	rectangles: [],
};


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	// Doing anything other than an undo/redo action should clear the redo stack.
	if ( !action.isUndoRedo  &&  type !== 'UNDO'  &&  type !== 'REDO' )
	{
		state = { ...state, redoStack: [] };
	}

	switch ( type )
	{
		case 'ADD_RECTANGLE':
		{
			const rectangles = state.rectangles.slice ();

			rectangles.push (payload);

			return { ...state, rectangles };
		}

		case 'REMOVE_RECTANGLE':
		{
			const rectangles = state.rectangles.slice ();

			rectangles.pop ();

			return { ...state, rectangles };
		}

		case 'ADD_UNDO_ACTION':
		{
			const undoStack = state.undoStack.slice ();

			undoStack.push (swapUndoRedo (payload));

			return { ...state, undoStack };
		}

		case 'UNDO':
		{
			const undoStack = state.undoStack.slice ();
			const redoStack = state.redoStack.slice ();

			if ( undoStack.length > 0 )
			{
				redoStack.push (swapUndoRedo (undoStack.pop ()));
			}

			return { ...state, undoStack, redoStack };
		}

		case 'REDO':
		{
			const undoStack = state.undoStack.slice ();
			const redoStack = state.redoStack.slice ();

			if ( redoStack.length > 0 )
			{
				undoStack.push (swapUndoRedo (redoStack.pop ()));
			}

			return { ...state, undoStack, redoStack };
		}
	}

	return state;
};
