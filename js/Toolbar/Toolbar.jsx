import React, { Component } from 'react';

import { connect } from 'react-redux';

import ToolbarButton      from '~/Toolbar/ToolbarButton.jsx';
import ToolbarDropdown    from '~/ToolbarDropdown/ToolbarDropdown.jsx';
import ToolbarColorPicker from '~/Toolbar/ToolbarColorPicker.jsx';
import InputControl       from '~/controls/InputControl.jsx';

import { rectangleOptions   } from '~/ToolbarDropdown/rectangleOptions.js';
import { showPopup          } from '~/Popup/actions.js';
import { editImageMenu      } from '~/Popup/popupMenus.js';
import { setCanvasSize      } from '~/App/actions.js';
import { serializeShapeData } from '~/misc/serializeShapeData.js';

import { setImageURL, clearShapes, undo, redo } from '~/MainCanvas/actions.js';

import { POPUP_OK_CANCEL } from '~/Popup/constants.js';
import { GUI_SIGNED_INT  } from '~/controls/constants.js';

import
{
	setDrawThickness,
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
	RECT_FILL,
	RECT_OUTLINE,
	MAX_DRAW_THICKNESS,
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

	clickSendButton ()
	{
		const serialized = serializeShapeData (this.props.global, this.props.mainCanvas);

		// REPLACEME: Replace with something to send this data to a server!
		prompt ('This is the data that will have been sent:', JSON.stringify (serialized));
	}

	clickEditButton ()
	{
		this.props.showPopup (editImageMenu);
	}

	setDrawColor ( color )
	{
		this.props.setDrawColor (color);
		this.props.hideColorPicker ();
	}

	render ()
	{
		const { props } = this;

		const controlData =
		{
			label:     'Line Thickness:',
			width:     '2vw',
			maxLength: MAX_DRAW_THICKNESS.toString ().length,
		};

		return <div>
			{
				props.renderColorPicker ?
					<ToolbarColorPicker
						color={props.drawColor}
						onClickOK={this.setDrawColor.bind (this)}
						onClickCancel={props.hideColorPicker.bind (this)}
					/> : ''
			}

			<div className='image-editor-toolbar'>
				<ToolbarButton
					id='upload-image'
					type='file'
					icon='folder-open'
					onUpload={this.onImageUploaded.bind (this)}
				/>

				<ToolbarButton icon='envelop' onClick={this.clickSendButton.bind (this)} />

				<ToolbarButton icon='pencil' onClick={this.clickEditButton.bind (this)} />
				<ToolbarButton icon='undo2' onClick={props.undo.bind (this)} />
				<ToolbarButton icon='redo2' onClick={props.redo.bind (this)} />

				<ToolbarButton icon='bin' onClick={props.clear.bind (this)} />

				<ToolbarButton
					icon='eraser'
					iconSize='1.2%'

					onClick={() => props.setTool (TOOL_DELETE)}
				/>

				<ToolbarButton icon='eyedropper' onClick={props.showColorPicker.bind (this)} />

				<InputControl
					type={GUI_SIGNED_INT}
					value={props.drawThickness}
					controlData={controlData}
					setValue={props.setDrawThickness.bind (this)}
				/>

				<ToolbarButton
					className='image-editor-toolbar-button-combo'
					icon={props.toolType === RECT_FILL ? 'stop2' : 'checkbox-unchecked'}
					onClick={() => props.setTool (TOOL_RECTANGLE)}
				>
					<ToolbarDropdown
						className='image-editor-toolbar-dropdown-combo'
						name='rectangleOptions'
						list={rectangleOptions}

						onSelect={event => props.setToolType (event.value)}
					/>
				</ToolbarButton>

				<ToolbarButton
					icon='arrow-up-right'
					onClick={() => props.setTool (TOOL_ARROW)}
				/>
			</div>
		</div>;
	}
}


const mapStateToProps = state =>
{
	const { toolbar } = state;

	const props =
	{
		tool:              toolbar.tool,
		toolType:          toolbar.toolType,
		renderColorPicker: toolbar.showColorPicker,
		drawColor:         toolbar.drawColor,
		drawThickness:     toolbar.drawThickness,

		global:     state.global,
		mainCanvas: state.mainCanvas,
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

		setDrawThickness ( ...args )
		{
			dispatch (setDrawThickness (...args));
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
