import React, { Component } from 'react';

import { connect } from 'react-redux';

import AppCanvas from '~/canvas/AppCanvas.jsx';

import { drawDataFromState   } from '~/TempCanvas/drawDataFromState.js';
import { drawDataToRectangle } from '~/TempCanvas/drawDataToObject.js';


class TempCanvas extends Component
{
	render ()
	{
		const canvas =
		(
			<AppCanvas rectangles={[drawDataToRectangle (this.props)]} />
		);

		return canvas;
	}
}


const mapStateToProps = ({ toolbar, tempCanvas }) =>
{
	const props = drawDataFromState (toolbar, tempCanvas);

	props.isDrawing = tempCanvas.isDrawing;

	return props;
};

const mapDispatchToProps = dispatch =>
{
	const props = {};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (TempCanvas);
