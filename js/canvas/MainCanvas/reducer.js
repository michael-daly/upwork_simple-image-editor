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

	if ( type !== 'UNDO'  &&  type !== 'REDO' )
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

		case 'ADD_UNDO_ACTION':
		{
			const undoStack = state.undoStack.slice ();

			undoStack.push (payload);

			return { ...state, undoStack };
		}

		case 'UNDO':
		{
			const undoStack = state.undoStack.slice ();
			const redoStack = state.redoStack.slice ();

			if ( redoStack.length > 0 )
			{
				undoStack.push (swapUndoRedo (redoStack.pop ()));
			}
			else
			{
				undoStack.push (payload);
			}

			return { ...state, undoStack, redoStack };
		}
	}

	return state;
};
