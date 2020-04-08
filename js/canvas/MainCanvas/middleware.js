const { addUndoAction } = require ('~/MainCanvas/actions.js');


module.exports = store => next => action =>
{
	const { dispatch      } = store;
	const { type, payload } = action;

	switch ( type )
	{
		case 'ADD_RECTANGLE':
		{
			dispatch (addUndoAction (action, 'REMOVE_RECTANGLE'));
			break;
		}
	}

	return next (action);
}
