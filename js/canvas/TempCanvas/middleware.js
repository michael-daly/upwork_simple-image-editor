const { getDrawDataFromState } = require ('~/TempCanvas/getDrawDataFromState.js');
const { addRectangle }         = require ('~/MainCanvas/actions.js');

const { TOOL_RECTANGLE, RECT_FILL } = require ('~/Toolbar/constants.js');


/**
 * The main purpose of this middleware is to add the temporary "drawing" canvas shape to the "main"
 * canvas where all the permanent shapes are (ones that can be undone, redone, and deleted).
 */
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

			// If the object's width or height is 0, don't add it.
			if ( tempCanvas.originX - tempCanvas.endX === 0  ||
				 tempCanvas.originY - tempCanvas.endY === 0 )
			{
				break;
			}

			const drawData = getDrawDataFromState (toolbar, tempCanvas);
			const { tool } = toolbar;

			let addShape = null;

			if ( tool === TOOL_RECTANGLE )
			{
				addShape = addRectangle;
			}

			if ( addShape !== null )
			{
				dispatch (addShape (drawData));
			}

			break;
		}
	}

	return next (action);
}
