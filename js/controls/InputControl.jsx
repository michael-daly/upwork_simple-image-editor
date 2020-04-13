import React, { Component, Fragment } from 'react';

import { GUI_TEXTBOX, GUI_NUMBER, GUI_INTEGER, GUI_SIGNED_INT } from '~/controls/constants.js';


class InputControl extends Component
{
	setValue ( event )
	{
		const { type } = this.props;

		let value = event.target.value;
		let regex = null;

		if ( type === GUI_NUMBER )
		{
			regex = /[^0-9\-.]/g;
		}
		else if ( type === GUI_INTEGER )
		{
			regex = /[^0-9\-]/g;
		}
		else if ( type === GUI_SIGNED_INT )
		{
			regex = /[^0-9]/g;
		}

		if ( regex !== null )
		{
			value = value.replace (regex, '');

			// We don't want to convert the value to a number just yet if the user has backspaced,
			// is typing a negative number, or is typing a decimal number.  It's not perfect, but
			// it gets the job done.
			if ( value !== ''  &&  value !== '-'  &&  value.charAt (value.length - 1) !== '.' )
			{
				value = Number (value);
			}
		}

		this.props.setValue (value);
	}

	render ()
	{
		const { value } = this.props;
		const { label } = this.props.controlData;

		const control =
		(
			<span className='image-editor-input-control'>
				<label className='image-editor-textbox-label'>{label}</label>
				<input type='textbox' value={value} onChange={this.setValue.bind (this)} />
			</span>
		);

		return control;
	}
};


export default InputControl;
