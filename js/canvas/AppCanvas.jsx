import React, { Component } from 'react';

import 'konva/lib/shapes/Rect';
import 'konva/lib/shapes/Line';

import { Layer, Rect, Line } from 'react-konva/lib/ReactKonvaCore';

import RectangleShape from '~/shapes/RectangleShape.jsx';


class AppCanvas extends Component
{
	render ()
	{
		const { name, shapes } = this.props;

		let { onShapeClick } = this.props;

		if ( onShapeClick === null )
		{
			onShapeClick = function () {};
		}

		const layer =
		(
			<Layer>
			{
				Object.keys (shapes).map (( key, index ) =>
				{
					const shape = shapes[key];

					const { id, type } = shape;

					if ( type === 'rectangle' )
					{
						return <RectangleShape
							key={`${name}-rect-${id}`}
							shapeData={shape}
							onClick={onShapeClick}
						/>;
					}
					else if ( type === 'arrow' )
					{
						return <Line key={`${name}-line-${id}`} {...shape} onClick={onShapeClick} />;
					}
					else
					{
						return '';
					}
				})
			}
			</Layer>
		);

		return layer;
	}
}


export default AppCanvas;
