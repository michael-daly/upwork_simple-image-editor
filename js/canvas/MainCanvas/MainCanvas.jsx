import React, { Component } from 'react';

import { connect } from 'react-redux';

import AppCanvas from '~/canvas/AppCanvas.jsx';

import { removeRectangle, removeArrow } from '~/MainCanvas/actions.js';

import { TOOL_DELETE } from '~/Toolbar/constants.js';


class MainCanvas extends Component
{
	onShapeClick ( event )
	{
		if ( this.props.tool === TOOL_DELETE )
		{
			this.props.onShapeClick (event.target.attrs);
		}
	}

	render ()
	{
		return <AppCanvas
			name='mainCanvas'
			imageURL={this.props.imageURL}
			shapes={this.props.shapes}
			onShapeClick={this.onShapeClick.bind (this)}
		/>;
	}
}


const mapStateToProps = ({ toolbar, mainCanvas }) =>
{
	const props =
	{
		imageURL: mainCanvas.imageURL,
		shapes:   mainCanvas.shapes,
		tool:     toolbar.tool,
	};

	return props;
};

const mapDispatchToProps = dispatch =>
{
	const props =
	{
		onShapeClick ( shape )
		{
			let removeShape = null;

			if ( shape.type === 'rectangle' )
			{
				removeShape = removeRectangle;
			}
			else if ( shape.type === 'arrow' )
			{
				removeShape = removeArrow;
			}
			else
			{
				return;
			}

			dispatch (removeShape (shape.id));
		}
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (MainCanvas);
