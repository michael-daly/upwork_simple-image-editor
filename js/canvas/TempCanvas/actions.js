const startDrawing = ( originX, originY ) =>
{
	return { type: 'START_DRAWING', payload: { originX, originY, endX: originX, endY: originY } };
}

const stopDrawing = () =>
{
	return { type: 'STOP_DRAWING' };
}

// Sets the endpoint of the shape we're drawing.
const setDrawEnd = ( endX, endY ) =>
{
	return { type: 'SET_DRAW_END', payload: { endX, endY } };
}


export { startDrawing, stopDrawing, setDrawEnd };
