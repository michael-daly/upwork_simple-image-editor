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
	componentDidMount ()
	{
		this.setState ({ currentColor: this.props.color, color: this.props.color });
	}

	clickOK ( event )
	{
		this.props.onClickOK ();
	}

	clickCancel ( event )
	{
		this.props.onClickCancel ();
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
						windowSize='medium'

						onClickOK={this.clickOK.bind (this)}
						onClickCancel={this.clickCancel.bind (this)}
					/>
				</div>
			</div>
		);

		return popupComponent;
	}
};


export default CustomPicker (ToolbarColorPicker);
