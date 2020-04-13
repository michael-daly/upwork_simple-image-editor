import React, { Component } from 'react';

import { CustomPicker    } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';

import Window from '~/Popup/Window.jsx';

import { WINDOW_OK_CANCEL } from '~/Popup/constants.js';



const style =
{
	picker:
	{
		background: '#DCDCDC',
	}
};

class ToolbarColorPicker extends Component
{
	constructor ( props )
	{
		super (props);

		this.state = { currentColor: '#000', color: '#000', x: '32px', y: '64px' };
	}

	onChangeColor ({ hex })
	{
		this.setState ({ color: hex });
	}

	onAccept ()
	{
		this.props.onClickOK (this.state.color);
	}

	onCancel ()
	{
		this.props.onClickCancel ();
	}

	componentDidMount ()
	{
		this.setState ({ currentColor: this.props.color, color: this.props.color });
	}

	render ()
	{
		const { props, state } = this;

		const popupComponent =
		(
			<div className='image-editor-popup'>
				<div className='image-editor-popup-overlay'>
					<Window
						title='Color Picker'
						body=''
						windowType={WINDOW_OK_CANCEL}
					/>
				</div>
			</div>
		);

		return popupComponent;
	}
};


export default CustomPicker (ToolbarColorPicker);
