import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Stage } from 'react-konva/lib/ReactKonvaCore';

import * as tempCanvasActions from '~/TempCanvas/actions.js';

import Toolbar    from '~/Toolbar/Toolbar.jsx';
import MainCanvas from '~/MainCanvas/MainCanvas.jsx';
import TempCanvas from '~/TempCanvas/TempCanvas.jsx';

import { clamp } from '~/util/clamp.js';

// ------------------------------------------------


class App extends Component
{
	constructor ( props )
	{
		super (props);

		this.state =
		{
			canvasX:      0,
			canvasY:      0,
			canvasWidth:  0,
			canvasHeight: 0,
		};
	}

	componentDidMount ()
	{
		const { content } = this.refs.drawingArea;

		this.setState (
		{
			canvasX:      content.offsetLeft,
			canvasY:      content.offsetTop,
			canvasWidth:  content.offsetWidth,
			canvasHeight: content.offsetHeight,
		});
	}

	onMouseMove ( event )
	{
		if ( this.props.isDrawing )
		{
			const { state } = this;

			const endX = clamp (event.clientX - state.canvasX, 0, state.canvasWidth);
			const endY = clamp (event.clientY - state.canvasY, 0, state.canvasHeight);

			this.props.setDrawEnd (endX, endY);
		}
	}

	onCanvasMouseDown ({ evt })
	{
		this.props.startDrawing (evt.offsetX, evt.offsetY);
	}

	onCanvasMouseUp ()
	{
		this.props.stopDrawing ();
	}

	render ()
	{
		const { props } = this;

		const app =
		(
			<div onMouseMove={this.onMouseMove.bind (this)}>
				<Toolbar />
				<Stage
					ref='drawingArea'

					width={props.canvasWidth}
					height={props.canvasHeight}

					onMouseDown={this.onCanvasMouseDown.bind (this)}
					onMouseUp={this.onCanvasMouseUp.bind (this)}
				>
					<TempCanvas store={props.store} />
					<MainCanvas store={props.store} />
				</Stage>
			</div>
		);

		return app;
	}
}


const mapStateToProps = ({ global, tempCanvas }) =>
{
	const props =
	{
		canvasWidth:  global.canvasWidth,
		canvasHeight: global.canvasHeight,

		isDrawing: tempCanvas.isDrawing,
	};

	return props;
};

const mapDispatchToProps = dispatch =>
{
	const { startDrawing, stopDrawing, setDrawEnd } = tempCanvasActions;

	const props =
	{
		startDrawing ( ...args )
		{
			dispatch (startDrawing (...args));
		},

		stopDrawing ( ...args )
		{
			dispatch (stopDrawing (...args));
		},

		setDrawEnd ( ...args )
		{
			dispatch (setDrawEnd (...args));
		},
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (App);
