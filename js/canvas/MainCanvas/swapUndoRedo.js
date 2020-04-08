import { has } from '~/util/has.js';


/**
 * Swaps undo and redo commands.
 *
 * This is for easy toggling between the two when we undo, redo, or add a new undoable command.
 *
 * @see {~/MainCanvas/reducer.js}
 */
const swapUndoRedo = action =>
{
	const swapped =
	{
		type:        action.reverseType,
		reverseType: action.type,
		isUndoRedo:  action.isUndoRedo,
	};

	if ( has (action, 'payload') )
	{
		swapped.reversePayload = action.payload;
	}

	if ( has (action, 'reversePayload') )
	{
		swapped.payload = action.reversePayload;
	}

	return swapped;
};


export { swapUndoRedo };
