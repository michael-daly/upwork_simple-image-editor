import React, { Component } from 'react';

import 'konva/lib/shapes/Rect';
import 'konva/lib/shapes/Arrow';

import { Layer, Rect, Arrow } from 'react-konva/lib/ReactKonvaCore';

import BackgroundImage from '~/canvas/BackgroundImage.jsx';
import RectangleShape  from '~/shapes/RectangleShape.jsx';


class AppCanvas extends Component
{
	render ()
	{
		const { name, shapes, imageURL = null, onShapeClick = () => {} } = this.props;

		const layer =
		(
			<Layer>
				<BackgroundImage imageURL={imageURL} />
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
						return <Arrow
							key={`${name}-arrow-${id}`}
							{...shape}
							onClick={onShapeClick}
						/>;
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
