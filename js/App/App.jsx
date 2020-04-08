import React, { Component } from 'react';

import { Stage   } from 'react-konva/lib/ReactKonvaCore';
import { connect } from 'react-redux';

import Toolbar    from '~/Toolbar/Toolbar.jsx';
import MainCanvas from '~/MainCanvas/MainCanvas.jsx';
import TempCanvas from '~/TempCanvas/TempCanvas.jsx';

import { startDrawing, stopDrawing, setDrawEnd } from '~/TempCanvas/actions.js';


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

		/*
			We add listen events to the document instead of the App component so users can move
			their mouse outside the canvas's boundaries and have it still work. 
		*/

		this.boundMouseMove = this.onMouseMove.bind (this);
		this.boundMouseUp   = this.onMouseUp.bind (this);

		document.addEventListener ('mousemove', this.boundMouseMove);
		document.addEventListener ('mouseup',   this.boundMouseUp);
	}

	componentWillUnmount ()
	{
		document.removeEventListener ('mousemove', this.boundMouseMove);
		document.removeEventListener ('mouseup',   this.boundMouseUp);
	}

	onMouseMove ( event )
	{
		if ( this.props.isDrawing )
		{
			const { state } = this;

			const endX = event.clientX - state.canvasX;
			const endY = event.clientY - state.canvasY;

			this.props.setDrawEnd (endX, endY);
		}
	}

	onMouseUp ()
	{
		if ( this.props.isDrawing )
		{
			this.props.stopDrawing ();
		}
	}

	onCanvasMouseDown ({ evt })
	{
		this.props.startDrawing (evt.offsetX, evt.offsetY);
	}

	render ()
	{
		const { props } = this;

		const app =
		(
			<div>
				<Toolbar />
				<Stage
					ref='drawingArea'

					width={props.canvasWidth}
					height={props.canvasHeight}

					onMouseDown={this.onCanvasMouseDown.bind (this)}
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
