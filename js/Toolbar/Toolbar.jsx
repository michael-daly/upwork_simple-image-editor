import React, { Component } from 'react';

import { connect } from 'react-redux';

import ToolbarButton   from '~/Toolbar/ToolbarButton.jsx';
import ToolbarDropdown from '~/ToolbarDropdown/ToolbarDropdown.jsx';

import { rectangleOptions } from '~/ToolbarDropdown/rectangle.js';
import { showPopup        } from '~/Popup/actions.js';
import { editImageMenu    } from '~/Popup/popupMenus.js';

import { setTool, setToolType } from '~/Toolbar/actions.js';

import { clearShapes, undo, redo } from '~/MainCanvas/actions.js';

import { POPUP_OK_CANCEL } from '~/Popup/constants.js';

import
{
	TOOL_RECTANGLE,
	TOOL_ARROW,
	TOOL_ERASER,
}
from '~/Toolbar/constants.js';


class Toolbar extends Component
{
	clickEditButton ()
	{
		this.props.showPopup (editImageMenu);
	}

	render ()
	{
		const { props } = this;

		return <div>
			<ToolbarButton text='Edit'  onClick={this.clickEditButton.bind (this)} />
			<ToolbarButton text='Undo'  onClick={props.undo.bind (this)} />
			<ToolbarButton text='Redo'  onClick={props.redo.bind (this)} />

			<ToolbarButton text='Clear' onClick={props.clear.bind (this)} />
			<ToolbarButton
				text='Eraser'
				misc={{ disabled: props.tool === TOOL_ERASER }}

				onClick={() => props.setTool (TOOL_ERASER)}
			/>

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
		clear ()
		{
			dispatch (clearShapes ());
		},

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

		showPopup ( ...args )
		{
			dispatch (showPopup (...args));
		},
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (Toolbar);
