import React, { Component } from 'react';

import { connect } from 'react-redux';

import ToolbarButton      from '~/Toolbar/ToolbarButton.jsx';
import ToolbarDropdown    from '~/ToolbarDropdown/ToolbarDropdown.jsx';
import ToolbarColorPicker from '~/Toolbar/ToolbarColorPicker.jsx';

import { rectangleOptions } from '~/ToolbarDropdown/rectangle.js';
import { showPopup        } from '~/Popup/actions.js';
import { editImageMenu    } from '~/Popup/popupMenus.js';
import { setCanvasSize    } from '~/App/actions.js';

import { setImageURL, clearShapes, undo, redo } from '~/MainCanvas/actions.js';

import { POPUP_OK_CANCEL } from '~/Popup/constants.js';

import
{
	setDrawColor,
	showColorPicker,
	hideColorPicker,
	setTool,
	setToolType
}
from '~/Toolbar/actions.js';

import
{
	TOOL_RECTANGLE,
	TOOL_ARROW,
	TOOL_DELETE,
}
from '~/Toolbar/constants.js';


class Toolbar extends Component
{
	onImageUploaded ( file )
	{
		const { props } = this;

		const tempImage = new Image ();

		tempImage.src    = file.target.result;
		tempImage.onload = function ()
		{
			props.setCanvasSize (tempImage.width, tempImage.height);
			props.setImageURL (file.target.result);
		};
	}

	setDrawColor ( color )
	{
		this.props.setDrawColor (color);
		this.props.hideColorPicker ();
	}

	clickEditButton ()
	{
		this.props.showPopup (editImageMenu);
	}

	render ()
	{
		const { props } = this;

		return <div>
			{
				props.renderColorPicker ?
					<ToolbarColorPicker
						color={props.drawColor}
						onClickOK={this.setDrawColor.bind (this)}
						onClickCancel={props.hideColorPicker.bind (this)}
					/> : ''
			}

			<ToolbarButton
				type='file'
				text='Upload Image'
				onUpload={this.onImageUploaded.bind (this)}
			/>

			<ToolbarButton text='Edit' onClick={this.clickEditButton.bind (this)} />
			<ToolbarButton text='Undo' onClick={props.undo.bind (this)} />
			<ToolbarButton text='Redo' onClick={props.redo.bind (this)} />

			<ToolbarButton text='Clear' onClick={props.clear.bind (this)} />
			<ToolbarButton
				text='Delete Shape'
				misc={{ disabled: props.tool === TOOL_DELETE }}

				onClick={() => props.setTool (TOOL_DELETE)}
			/>

			<ToolbarButton text='Set Draw Color' onClick={props.showColorPicker.bind (this)} />

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
		tool:              toolbar.tool,
		renderColorPicker: toolbar.showColorPicker,
		drawColor:         toolbar.drawColor,
	};

	return props;
};

const mapDispatchToProps = dispatch =>
{
	const props =
	{
		setCanvasSize ( ...args )
		{
			dispatch (setCanvasSize (...args));
		},

		setImageURL ( ...args )
		{
			dispatch (setImageURL (...args));
		},

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

		setDrawColor ( ...args )
		{
			dispatch (setDrawColor (...args));
		},

		showColorPicker ()
		{
			dispatch (showColorPicker ());
		},

		hideColorPicker ()
		{
			dispatch (hideColorPicker ());
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
