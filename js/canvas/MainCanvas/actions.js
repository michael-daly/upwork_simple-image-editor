import { drawDataToRectangle } from '~/TempCanvas/drawDataToObject.js';


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

const addUndoAction = ( action, reverseType, reversePayload ) =>
{
	const undoPayload =
	{
		reverseType,

		type:    action.type,
		payload: action.payload,
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


export { addRectangle, removeRectangle, addUndoAction, undo, redo };
