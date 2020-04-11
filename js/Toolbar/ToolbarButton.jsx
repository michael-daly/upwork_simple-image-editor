import React, { Component, Fragment } from 'react';


class ToolbarButton extends Component
{
	onFileUploaded ( event )
	{
		const { props } = this;

		const file   = event.target.files[0];
		const reader = new FileReader ();

		reader.readAsDataURL (file);

		reader.onload = loadedFile =>
		{
			props.onUpload (loadedFile);
		};
	}

	render ()
	{
		const { type, text, onClick = () => {}, onUpload = () => {}, misc = {} } = this.props;

		if ( type === 'file' )
		{
			return <input
				{...misc}
				type='file'
				onChange={this.onFileUploaded.bind (this)}
			/>;
		}

		return <input {...misc} type='button' value={text} onClick={onClick} />;
	}
};


export default ToolbarButton;
