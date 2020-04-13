import React, { Component, Fragment } from 'react';

import { CustomPicker } from 'react-color';

import { Hue, Saturation, EditableInput } from 'react-color/lib/components/common';

import Window               from '~/Popup/Window.jsx';
import InputControl         from '~/controls/InputControl.jsx';
import ThreeValuesColorCtrl from '~/controls/ThreeValuesColorCtrl.jsx';

import { has } from '~/util/has.js';

import { WINDOW_OK_CANCEL } from '~/Popup/constants.js';


const textboxStyle = Object.freeze (
{
	border: 'none',

	fontFamily: "'Titillium Web', sans-serif'",
	fontSize:   '0.9vw',

	padding:      '0.3vw',
	paddingLeft:  '0.4vw',
	paddingRight: '0.4vw',
	marginRight:  '0.5vw',

	verticalAlign: 'text-bottom',

});

const threeValuesStyle =
{
	input:
	{
		...textboxStyle,
		width: '2vw',
	}
};


const hexStyle =
{
	input:
	{
		...textboxStyle,
		width: '4vw',
	}
};


class ToolbarColorPicker extends Component
{
	constructor ( props )
	{
		super (props);

		this.labelsToFields =
		{
			'Red':   'r',
			'Green': 'g',
			'Blue':  'b',
			'Hue':   'h',
			'Sat.':  's',
			'Value': 'v',
			'Hex':   'hex',
		};
	}

	onColorChange ( data, event )
	{
		this.props.onChange ({ ...data, h: Math.round (data.h) }, event);
	}

	onColorTyped ( type, object, label )
	{
		let maxLength = 0;
		let regex     = '';

		if ( type === 'rgb' )
		{
			regex     = /[^0-9]/g;
			maxLength = 3;
		}
		else if ( type === 'hsv')
		{
			regex     = /[^0-9\.]/g;
			maxLength = 3;
		}
		else if ( type === 'hex' )
		{
			regex     = /[^A-Za-z0-9#]/g;
			maxLength = 7;
		}

		let value = object[label].replace (regex, '');

		if ( value.toString ().length > maxLength )
		{
			value = value.substring (0, maxLength);
		}

		const field = this.labelsToFields[label];

		if ( type === 'hsv' )
		{
			value = Math.round (value);

			if ( field !== 'h' )
			{
				value /= 100;
			}
		}

		if ( type !== 'hex' )
		{
			value = Number (value);
		}

		this.props.onChange ({ ...this.props[type], [field]: value });
	}

	clickOK ( event )
	{
		this.props.onClickOK (this.props.hex);
	}

	clickCancel ( event )
	{
		this.props.onClickCancel ();
	}

	render ()
	{
		const { props, state } = this;

		const { color, hex, rgb, hsl, hsv } = props;

		const onChange   = this.onColorChange.bind (this);
		const colorProps = { color, hex, rgb, hsl, hsv, onChange };

		const controls =
		(
			<Fragment>
				<div className='image-editor-color-controls-left'>
					<div className='image-editor-color-picker-saturation'>
						<Saturation {...colorProps} />
					</div>
					<div className='image-editor-color-picker-hue'>
						<Hue {...colorProps} />
					</div>
				</div>
				<div className='image-editor-color-controls-right'>
					<ThreeValuesColorCtrl
						style={threeValuesStyle}
						values={[rgb.r, rgb.g, rgb.b]}
						labels={['Red', 'Green', 'Blue']}
						onChange={( ...args ) => this.onColorTyped ('rgb', ...args)}
					/>
					<ThreeValuesColorCtrl
						style={threeValuesStyle}
						values={[hsv.h, Math.round (hsv.s * 100), Math.round (hsv.v * 100)]}
						labels={['Hue', 'Sat.', 'Value']}
						onChange={( ...args ) => this.onColorTyped ('hsv', ...args)}
					/>
					<div className='image-editor-color-controls-hex'>
						<EditableInput
							style={hexStyle}
							label='Hex'
							value={hex}
							onChange={object => this.onColorTyped ('hex', object, 'Hex')}
						/>
					</div>
				</div>
			</Fragment>
		);

		const popupComponent =
		(
			<div className='image-editor-popup'>
				<div className='image-editor-popup-overlay'>
					<Window
						title='Color Picker'
						body={controls}
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
