const setCanvasSize = ( width, height ) =>
{
	return { type: 'SET_CANVAS_SIZE', payload: { width, height } };
};


export { setCanvasSize };
