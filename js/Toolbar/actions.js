const setTool = tool =>
{
	return { type: 'SET_TOOL', payload: tool };
};

const setToolType = toolType =>
{
	return { type: 'SET_TOOL_TYPE', payload: toolType };
};

const setDrawColor = color =>
{
	return { type: 'SET_DRAW_END', payload: color };
};

const setDrawThickness = thickness =>
{
	return { type: 'SET_DRAW_THICKNESS', payload: thickness };
};


export { setTool, setToolType, setDrawColor, setDrawThickness };
