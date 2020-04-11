const setTool = tool =>
{
	return { type: 'SET_TOOL', payload: tool };
};

const setToolType = toolType =>
{
	return { type: 'SET_TOOL_TYPE', payload: toolType };
};

const showColorPicker = () =>
{
	return { type: 'SHOW_COLOR_PICKER' };
};

const hideColorPicker = () =>
{
	return { type: 'HIDE_COLOR_PICKER' };
};

const setDrawColor = color =>
{
	return { type: 'SET_DRAW_COLOR', payload: color };
};

const setDrawThickness = thickness =>
{
	return { type: 'SET_DRAW_THICKNESS', payload: thickness };
};


export { setTool, setToolType, showColorPicker, hideColorPicker, setDrawColor, setDrawThickness };
