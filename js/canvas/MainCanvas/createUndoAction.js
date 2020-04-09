const { addUndoAction } = require ('~/MainCanvas/actions.js');


const createUndoAction = ( dispatch, action, reverseType, reversePayload ) =>
{
	dispatch (addUndoAction (action, reverseType, reversePayload));
};


export { createUndoAction };
