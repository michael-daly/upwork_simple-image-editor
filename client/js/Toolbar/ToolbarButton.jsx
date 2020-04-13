import React, { Component, Fragment } from 'react';

import ToolbarIcon from '~/Toolbar/ToolbarIcon.jsx';


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
		const
		{
			type,
			icon,

			id        = '',
			className = '',
			iconSize  = '1%',
			misc      = {},

			onClick   = () => {},
			onUpload  = () => {},

			children  = [],
		}
		= this.props;

		let button = '';

		if ( type === 'file' )
		{
			button =
			(
				<label
					{...misc}
					htmlFor={id}
					className={`image-editor-toolbar-button ${className}`}
					onClick={onClick}
				>
					{children}
					<ToolbarIcon icon={icon} size={iconSize} />
					<input
						id={id}
						type='file'
						style={{ display: 'none' }}
						onChange={this.onFileUploaded.bind (this)}
					/>
				</label>
			);
		}
		else
		{
			button =
			(
				<span
					{...misc}
					id={id}
					className={`image-editor-toolbar-button ${className}`}
					onClick={onClick}
				>
					{children}
					<ToolbarIcon icon={icon} size={iconSize} />
				</span>
			);
		}

		return button;
	}
};


export default ToolbarButton;
