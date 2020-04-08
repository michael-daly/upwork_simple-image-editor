import { drawDataToRectangle, drawDataToArrow } from '~/TempCanvas/drawDataToObject.js';


const addRectangle = drawData =>
{
	const action =
	{
		type:        'ADD_RECTANGLE',
		payload:     drawDataToRectangle (drawData),
		reverseType: 'REMOVE_RECTANGLE',
	};

	return action;
};

const removeRectangle = () =>
{
	return { type: 'REMOVE_RECTANGLE', reverseType: 'ADD_RECTANGLE' };
};

const addArrow = drawData =>
{
	const action =
	{
		type:        'ADD_ARROW',
		payload:     drawDataToArrow (drawData),
		reverseType: 'REMOVE_ARROW',
	};

	return action;
};

const removeArrow = () =>
{
	return { type: 'REMOVE_ARROW', reverseType: 'ADD_ARROW' };
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


export { addRectangle, removeRectangle, addArrow, removeArrow, addUndoAction, undo, redo };
