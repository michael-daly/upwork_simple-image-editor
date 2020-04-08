const startDrawing = ( originX, originY ) =>
{
	return { type: 'START_DRAWING', payload: { endX: originX, endY: originY, originX, originY } };
}

const stopDrawing = () =>
{
	return { type: 'STOP_DRAWING' };
}

const setDrawEnd = ( endX, endY ) =>
{
	return { type: 'SET_DRAW_END', payload: { endX, endY } };
}


export { startDrawing, stopDrawing, setDrawEnd };
