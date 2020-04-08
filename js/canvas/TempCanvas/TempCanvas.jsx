import React, { Component } from 'react';

import { connect } from 'react-redux';

import AppCanvas from '~/canvas/AppCanvas.jsx';

import { drawDataToRectangle } from '~/TempCanvas/drawDataToObject.js';


class TempCanvas extends Component
{
	render ()
	{
		const canvas =
		(
			<AppCanvas
				rectangles={[this.props.isDrawing ? drawDataToRectangle (this.props) : {}]}
			/>
		);

		return canvas;
	}
}


const mapStateToProps = ({ toolbar, tempCanvas }) =>
{
	const props =
	{
		color:     toolbar.drawColor,
		thickness: toolbar.drawThickness,
		type:      toolbar.toolType,

		isDrawing: tempCanvas.isDrawing,

		originX: tempCanvas.originX,
		originY: tempCanvas.originY,

		endX: tempCanvas.endX,
		endY: tempCanvas.endY,
	};

	return props;
};

const mapDispatchToProps = dispatch =>
{
	const props = {};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (TempCanvas);
