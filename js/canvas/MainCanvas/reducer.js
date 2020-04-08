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
			if ( payload.isUndoRedo )
			{
				return state;
			}

			const undoStack = state.undoStack.slice ();

			payload.isUndoRedo = true;

			undoStack.push (swapUndoRedo (payload));

			// Doing any new undoable action should clear the redo stack.
			return { ...state, undoStack, redoStack: [] };
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
