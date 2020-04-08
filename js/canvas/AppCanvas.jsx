import React, { Component } from 'react';

import 'konva/lib/shapes/Rect';
import 'konva/lib/shapes/Line';

import { Layer, Rect, Line } from 'react-konva/lib/ReactKonvaCore';


class AppCanvas extends Component
{
	render ()
	{
		const { name, shapes } = this.props;

		const layer =
		(
			<Layer>
			{
				Object.keys (shapes).map (( key, index ) =>
				{
					const object   = shapes[key];
					const { type } = object;

					if ( type === 'rectangle' )
					{
						return <Rect key={`${name}-rect-${index}`} {...object} />;
					}
					else if ( type === 'arrow' )
					{
						return <Line key={`${name}-line-${index}`} {...object} />;
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
