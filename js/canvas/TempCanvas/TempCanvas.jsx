import React, { Component } from 'react';

import { connect } from 'react-redux';

import AppCanvas from '~/canvas/AppCanvas.jsx';

import { getDrawDataFromState } from '~/TempCanvas/getDrawDataFromState.js';
import { drawDataToRectangle  } from '~/TempCanvas/drawDataToObject.js';


class TempCanvas extends Component
{
	render ()
	{
		const { props } = this;

		const canvas =
		(
			<AppCanvas
				name='tempCanvas'
				rectangles={props.isDrawing ? [drawDataToRectangle (props)] : []}
			/>
		);

		return canvas;
	}
}


const mapStateToProps = ({ toolbar, tempCanvas }) =>
{
	const props = getDrawDataFromState (toolbar, tempCanvas);

	props.isDrawing = tempCanvas.isDrawing;

	return props;
};

const mapDispatchToProps = dispatch =>
{
	const props = {};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (TempCanvas);
