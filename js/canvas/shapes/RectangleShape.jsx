import React, { Fragment } from 'react';

import 'konva/lib/shapes/Rect';
import 'konva/lib/shapes/Line';

import { Rect, Line } from 'react-konva/lib/ReactKonvaCore';

import { RECT_OUTLINE } from '~/Toolbar/constants.js';


const RectangleShape = props =>
{
	const { shapeData, onClick } = props;
	const { subtype } = shapeData;

	let rect;

	if ( subtype === RECT_OUTLINE )
	{
		// We use a line with points instead of an outline rectangle so when we get more accurate
		// click detection.
		rect = <Line onClick={onClick} {...shapeData} />;
	}
	else
	{
		rect = <Rect onClick={onClick} {...shapeData} />;
	}

	return rect;
};


export default RectangleShape;
