const { drawDataFromState } = require ('~/TempCanvas/drawDataFromState.js');
const { addRectangle }      = require ('~/MainCanvas/actions.js');

const { TOOL_RECTANGLE, RECT_FILL } = require ('~/Toolbar/constants.js');


module.exports = store => next => action =>
{
	const state = store.getState ();

	const { dispatch      } = store;
	const { type, payload } = action;

	switch ( type )
	{
		case 'STOP_DRAWING':
		{
			const { toolbar, tempCanvas } = state;

			if ( tempCanvas.originX - tempCanvas.endX === 0  ||
				 tempCanvas.originY - tempCanvas.endY === 0 )
			{
				break;
			}

			const drawData = drawDataFromState (toolbar, tempCanvas);
			const { tool } = toolbar;

			let addFunction = null;

			if ( tool === TOOL_RECTANGLE )
			{
				addFunction = addRectangle;
			}

			if ( addFunction !== null )
			{
				dispatch (addFunction (drawData));
			}

			break;
		}
	}

	return next (action);
}
