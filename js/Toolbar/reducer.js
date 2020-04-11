const { TOOL_RECTANGLE, RECT_FILL } = require ('~/Toolbar/constants.js');


const defaultState =
{
	showColorPicker: false,
	drawColor:       '#FF0000',
	drawThickness:   8,

	tool:     TOOL_RECTANGLE,
	toolType: RECT_FILL,
};


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'SET_TOOL':           return { ...state, tool:          payload };
		case 'SET_TOOL_TYPE':      return { ...state, toolType:      payload };
		case 'SET_DRAW_COLOR':     return { ...state, drawColor:     payload };
		case 'SET_DRAW_THICKNESS': return { ...state, drawThickness: payload };

		case 'SHOW_COLOR_PICKER': return { ...state, showColorPicker: true  };
		case 'HIDE_COLOR_PICKER': return { ...state, showColorPicker: false };
	}

	return state;
};
