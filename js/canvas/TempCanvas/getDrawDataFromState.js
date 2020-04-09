// Gets data from toolbar and tempCanvas states and converts them into tool and mouse position data.
const getDrawDataFromState = ( toolbar, tempCanvas ) =>
{
	const drawData =
	{
		color:     toolbar.drawColor,
		thickness: toolbar.drawThickness,
		subtype:   toolbar.toolType,

		originX: tempCanvas.originX,
		originY: tempCanvas.originY,

		endX: tempCanvas.endX,
		endY: tempCanvas.endY,
	};

	return drawData;
};


export { getDrawDataFromState };
