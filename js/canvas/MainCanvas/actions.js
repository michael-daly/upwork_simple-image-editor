import { deepcopy } from '~/util/deepcopy.js';

import { drawDataToRectangle, drawDataToArrow } from '~/TempCanvas/drawDataToObject.js';


const addRectangle = drawData =>
{
	const action =
	{
		type:    'ADD_RECTANGLE',
		payload: drawDataToRectangle (drawData),
	};

	return action;
};

const removeRectangle = id =>
{
	return { type: 'REMOVE_RECTANGLE', payload: id };
};

const addArrow = drawData =>
{
	const action =
	{
		type:    'ADD_ARROW',
		payload: drawDataToArrow (drawData),
	};

	return action;
};

const removeArrow = id =>
{
	return { type: 'REMOVE_ARROW', payload: id };
};

const clearShapes = () =>
{
	return { type: 'CLEAR_SHAPES' };
};

/**
 * Creates an undoable action.
 *
 * `reverseType` and `reversePayload` is the command that gets called when said action is undone.
 * These get swapped with `type` and `payload` when redoing.
 *
 * @see {~/MainCanvas/swapUndoRedo.js}
 */
const addUndoAction = ( action, reverseType, reversePayload ) =>
{
	action         = deepcopy (action);
	reversePayload = deepcopy (reversePayload);

	const undoPayload =
	{
		reverseType,

		type:       action.type,
		payload:    action.payload,
		isUndoRedo: action.isUndoRedo,
	};

	if ( typeof reversePayload !== 'undefined' )
	{
		undoPayload.reversePayload = reversePayload;
	}

	return { type: 'ADD_UNDO_ACTION', payload: undoPayload };
};

const undo = () =>
{
	return { type: 'UNDO' };
};

const redo = () =>
{
	return { type: 'REDO' };
};


export { addRectangle, removeRectangle, addArrow, removeArrow, clearShapes, addUndoAction, undo, redo };
