import React, { Component, Fragment } from 'react';

import
{
	INPUT_TEXTBOX,
	INPUT_NUMBER,
	INPUT_INTEGER,
	INPUT_SIGNED_INT,
}
from '~/Toolbar/constants.js';


class ToolbarInput extends Component
{
	setValue ( event )
	{
		const { type } = this.props;

		let value = event.target.value;
		let regex = null;

		if ( type === INPUT_SIGNED_INT )
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

		this.props.setInputValue (value);
	}

	render ()
	{
		const { label, value } = this.props;

		return <Fragment>
			<label>{label}</label>
			<input type='textbox' value={value} onChange={this.setValue.bind (this)} />
		</Fragment>;
	}
};


export default ToolbarInput;
