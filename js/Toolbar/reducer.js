const { TOOL_RECTANGLE, RECT_EMPTY } = require ('~/Toolbar/constants.js');


const defaultState =
{
	drawColor:     '#3300AA',
	drawThickness: 8,

	currentTool: TOOL_RECTANGLE,
	toolType:    RECT_EMPTY,
};


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'SET_DRAW_COLOR':     return { ...state, drawColor:     payload };
		case 'SET_DRAW_THICKNESS': return { ...state, drawThickness: payload };
		case 'SET_CURRENT_TOOL':   return { ...state, currentTool:   payload };
		case 'SET_TOOL_TYPE':      return { ...state, toolType:      payload };
	}

	return state;
};
