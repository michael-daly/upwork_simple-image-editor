const getDrawDataFromState = ( toolbar, tempCanvas ) =>
{
	const drawData =
	{
		color:     toolbar.drawColor,
		thickness: toolbar.drawThickness,
		type:      toolbar.toolType,

		originX: tempCanvas.originX,
		originY: tempCanvas.originY,

		endX: tempCanvas.endX,
		endY: tempCanvas.endY,
	};

	return drawData;
};


export { getDrawDataFromState };
