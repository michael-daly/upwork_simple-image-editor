import React, { Component } from 'react';

import { connect } from 'react-redux';

import ToolbarButton   from '~/Toolbar/ToolbarButton.jsx';
import ToolbarDropdown from '~/ToolbarDropdown/ToolbarDropdown.jsx';

import { rectangleOptions} from '~/ToolbarDropdown/rectangle.js';

import { setTool, setToolType } from '~/Toolbar/actions.js';
import { undo,    redo        } from '~/MainCanvas/actions.js';

import
{
	TOOL_RECTANGLE,
	TOOL_ARROW,
	TOOL_ERASER,
	RECT_FILL,
	RECT_EMPTY
}
from '~/Toolbar/constants.js';


class Toolbar extends Component
{
	render ()
	{
		const { props } = this;

		return <div>
			<ToolbarButton text='Undo' onClick={props.undo.bind (this)} />
			<ToolbarButton text='Redo' onClick={props.redo.bind (this)} />

			<ToolbarButton
				text='Rectangle'
				misc={{ disabled: props.tool === TOOL_RECTANGLE }}

				onClick={() => props.setTool (TOOL_RECTANGLE)}
			/>
			<ToolbarDropdown
				name='rectangleOptions'
				list={rectangleOptions}

				misc={{ disabled: props.tool !== TOOL_RECTANGLE }}

				onSelect={event => props.setToolType (event.target.value)}
			/>

			<ToolbarButton
				text='Arrow'
				misc={{ disabled: props.tool === TOOL_ARROW }}

				onClick={() => props.setTool (TOOL_ARROW)}
			/>

			<ToolbarButton
				text='Eraser'
				misc={{ disabled: props.tool === TOOL_ERASER }}

				onClick={() => props.setTool (TOOL_ERASER)}
			/>
		</div>;
	}
}


const mapStateToProps = ({ toolbar }) =>
{
	const props =
	{
		tool: toolbar.tool,
	};

	return props;
};

const mapDispatchToProps = dispatch =>
{
	const props =
	{
		undo ()
		{
			dispatch (undo ());
		},

		redo ()
		{
			dispatch (redo ());
		},

		setTool ( ...args )
		{
			dispatch (setTool (...args));
		},

		setToolType ( ...args )
		{
			dispatch (setToolType (...args));
		},
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (Toolbar);
