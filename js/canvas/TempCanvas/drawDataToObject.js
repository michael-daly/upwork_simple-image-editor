import { RECT_FILL } from '~/Toolbar/constants.js';


// Converts tool and mouse position data to rectangle data.
const drawDataToRectangle = ({ color, thickness, type, originX, originY, endX, endY }) =>
{
	const rectangle =
	{
		type: 'rectangle',

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

// Converts tool and mouse position data to arrow data.
const drawDataToArrow = ({ color, thickness, originX, originY, endX, endY }) =>
{
	const arrow =
	{
		type: 'arrow',

		x: 0,
		y: 0,

		points: [originX, originY, endX, endY],

		fill:        color,
		stroke:      color,
		strokeWidth: thickness,
	};

	return arrow;
};


export { drawDataToRectangle, drawDataToArrow };
