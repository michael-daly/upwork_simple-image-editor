import { RECT_FILL } from '~/Toolbar/constants.js';


// Converts tool and mouse position data to rectangle data.
const drawDataToRectangle = ({ color, thickness, type, originX, originY, endX, endY }) =>
{
	const rectangle =
	{
		x: (originX <= endX) ? originX : endX,
		y: (originY <= endY) ? originY : endY,

		width:  Math.abs (originX - endX),
		height: Math.abs (originY - endY),
	};

	if ( type === RECT_FILL )
	{
		rectangle.fill = color;
	}

	rectangle.stroke      = color;
	rectangle.strokeWidth = thickness;

	return rectangle;
};


export { drawDataToRectangle };
