import React, { Component, Fragment } from 'react';

import { GUI_TEXTBOX, GUI_NUMBER, GUI_INTEGER } from '~/Popup/constants.js';


class PopupInputCtrl extends Component
{
	setValue ( event )
	{
		const { type } = this.props;

		let value = event.target.value;
		let regex = null;

		if ( type === GUI_INTEGER )
		{
			regex = /[^0-9\-]/g;
		}
		else if ( type === GUI_NUMBER )
		{
			regex = /[^0-9\-.]/g;
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

		this.props.setControlValue (this.props.index, value);
	}

	render ()
	{
		const { value } = this.props;
		const { label } = this.props.controlData;

		const control =
		(
			<Fragment>
				<label>{label}</label>
				<input type='textbox' value={value} onChange={this.setValue.bind (this)} />
			</Fragment>
		);

		return control;
	}
};


export default PopupInputCtrl;