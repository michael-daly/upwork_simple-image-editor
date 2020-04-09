const { addUndoAction } = require ('~/MainCanvas/actions.js');


const dispatchUndoAction = ( dispatch, action, reverseType, reversePayload ) =>
{
	dispatch (addUndoAction (action, reverseType, reversePayload));
};


export { dispatchUndoAction };
