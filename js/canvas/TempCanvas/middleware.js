const { getDrawDataFromState   } = require ('~/TempCanvas/getDrawDataFromState.js');
const { addRectangle, addArrow } = require ('~/MainCanvas/actions.js');

const { TOOL_RECTANGLE, TOOL_ARROW, RECT_FILL } = require ('~/Toolbar/constants.js');


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
			const { tool } = toolbar;

			const diffX = tempCanvas.originX - tempCanvas.endX;
			const diffY = tempCanvas.originY - tempCanvas.endY;

			// If the rectangle's width or height is 0, don't add it.
			if ( tool === TOOL_RECTANGLE  &&  (diffX === 0  ||  diffY === 0) )
			{
				break;
			}

			// If the arrow's size is 0, don't add it.
			if ( tool === TOOL_ARROW  &&  diffX === 0  &&  diffY === 0 )
			{
				break;
			}

			const drawData = getDrawDataFromState (toolbar, tempCanvas);

			let addShape = null;

			if ( tool === TOOL_RECTANGLE )
			{
				addShape = addRectangle;
			}
			else if ( tool === TOOL_ARROW )
			{
				addShape = addArrow;
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
