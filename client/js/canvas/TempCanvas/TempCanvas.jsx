import React, { Component } from 'react';

import { connect } from 'react-redux';

import AppCanvas from '~/canvas/AppCanvas.jsx';

import { getDrawDataFromState } from '~/TempCanvas/getDrawDataFromState.js';

import { drawDataToRectangle, drawDataToArrow } from '~/TempCanvas/drawDataToObject.js';

import { TOOL_RECTANGLE, TOOL_ARROW } from '~/Toolbar/constants.js';


class TempCanvas extends Component
{
	render ()
	{
		const { props } = this;
		const { tool  } = props;

		let shapes = {};

		if ( props.isDrawing )
		{
			if ( tool === TOOL_RECTANGLE )
			{
				shapes = { 0: drawDataToRectangle (props) };
			}
			else if ( tool == TOOL_ARROW )
			{
				shapes = { 0: drawDataToArrow (props) };
			}
		}

		return <AppCanvas name='tempCanvas' shapes={shapes} />;
	}
}


const mapStateToProps = ({ toolbar, tempCanvas }) =>
{
	const props = getDrawDataFromState (toolbar, tempCanvas);

	props.isDrawing = tempCanvas.isDrawing;
	props.tool      = toolbar.tool;

	return props;
};

const mapDispatchToProps = dispatch =>
{
	const props = {};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (TempCanvas);
