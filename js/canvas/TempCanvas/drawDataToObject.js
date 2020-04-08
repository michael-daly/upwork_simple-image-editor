import { RECT_FILL } from '~/Toolbar/constants.js';


const drawDataToRectangle = ({ color, thickness, type, originX, originY, endX, endY }) =>
{
	const rectangle =
	{
		x: (originX <= endX) ? originX : endX,
		y: (originY <= endY) ? originY : endY,

		width:  Math.abs (originX - endX),
		height: Math.abs (originY - endY),
	};

	if ( type !== RECT_FILL )
	{
		rectangle.stroke      = color;
		rectangle.strokeWidth = thickness;
	}
	else
	{
		rectangle.fill = color;
	}

	return rectangle;
};


export { drawDataToRectangle };
