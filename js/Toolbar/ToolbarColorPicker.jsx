import React, { Component } from 'react';

import { PhotoshopPicker } from 'react-color';


class ToolbarColorPicker extends Component
{
	constructor ( props )
	{
		super (props);

		this.state = { color: '#000' };
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
		this.setState ({ color: this.props.color });
	}

	render ()
	{
		const { props } = this;

		return <div className='image-editor-color-picker'>
			<PhotoshopPicker
				color={this.state.color}
				onChangeComplete={this.onChangeColor.bind (this)}
				onAccept={this.onAccept.bind (this)}
				onCancel={this.onCancel.bind (this)}
			/>
		</div>;
	}
};


export default ToolbarColorPicker;
