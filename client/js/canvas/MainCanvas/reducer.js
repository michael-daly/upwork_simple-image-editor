const { has          } = require ('~/util/has.js');
const { deepcopy     } = require ('~/util/deepcopy.js');
const { deepfreeze   } = require ('~/util/deepfreeze.js');
const { swapUndoRedo } = require ('~/MainCanvas/swapUndoRedo.js');


const defaultState = deepfreeze (
{
	imageURL:   '',
	undoStack:  [],
	redoStack:  [],
	shapes:     {},
	shapeIndex: 0,
});


module.exports = ( state = deepcopy (defaultState), action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'SET_IMAGE_URL':
		{
			return { ...state, ...deepcopy (defaultState), imageURL: payload };
		}

		case 'ADD_ARROW':
		case 'ADD_RECTANGLE':
		{
			const shapes = { ...state.shapes };

			if ( !has (payload, 'id') )
			{
				payload.id = state.shapeIndex++;
			}

			shapes[payload.id] = payload;

			return { ...state, shapes };
		}

		case 'REMOVE_ARROW':
		case 'REMOVE_RECTANGLE':
		{
			const shapes = { ...state.shapes };

			delete shapes[payload];

			return { ...state, shapes };
		}

		case 'SET_SHAPES':
		{
			return { ...state, shapes: payload };
		}

		case 'CLEAR_SHAPES':
		{
			return { ...state, shapes: {} };
		}

		case 'SET_CANVAS_SIZE':
		{
			return deepcopy (defaultState);
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
