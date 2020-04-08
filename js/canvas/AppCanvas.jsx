import React, { Component } from 'react';

import 'konva/lib/shapes/Rect';
import { Layer, Rect } from 'react-konva/lib/ReactKonvaCore';


class AppCanvas extends Component
{
	render ()
	{
		const { name, rectangles } = this.props;

		const layer =
		(
			<Layer>
			{
				rectangles.map (( object, index ) =>
				{
					return <Rect key={`${name}-rect-${index}`} {...object} />;
				})
			}
			</Layer>
		);

		return layer;
	}
}


export default AppCanvas;
