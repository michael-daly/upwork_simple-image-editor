import { RECT_FILL } from '~/Toolbar/constants.js';


// Converts tool and mouse position data to rectangle data.
const drawDataToRectangle = ({ color, thickness, subtype, originX, originY, endX, endY }) =>
{
	const x = (originX <= endX) ? originX : endX;
	const y = (originY <= endY) ? originY : endY;

	const width  = Math.abs (originX - endX);
	const height = Math.abs (originY - endY);

	const rectangle =
	{
		type: 'rectangle',

		subtype,

		width,
		height,
	};

	if ( subtype !== RECT_FILL )
	{
		rectangle.stroke      = color;
		rectangle.strokeWidth = thickness;

		// We use a line with points instead of an outline rectangle so when we get more accurate
		// click detection.
		rectangle.points =
		[
			x,         y,
			x + width, y,
			x + width, y + height,
			x,         y + height,
			x,         y - (thickness / 2),
		];
	}
	else
	{
		rectangle.fill = color;
		rectangle.x    = x;
		rectangle.y    = y;
	}

	return rectangle;
};

// Converts tool and mouse position data to arrow data.
const drawDataToArrow = ({ color, thickness, originX, originY, endX, endY }) =>
{
	const arrow =
	{
		type: 'arrow',

		points: [originX, originY, endX, endY],

		fill:        color,
		stroke:      color,
		strokeWidth: thickness,
	};
	

	return arrow;
};


export { drawDataToRectangle, drawDataToArrow };
