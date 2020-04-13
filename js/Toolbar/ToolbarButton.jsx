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

			iconSize = '1%',
			misc     = {},
			onClick  = () => {},
			onUpload = () => {},
		}
		= this.props;

		if ( type === 'file' )
		{
			return <input
				{...misc}
				type='file'
				onChange={this.onFileUploaded.bind (this)}
			/>;
		}

		return <span className='image-editor-toolbar-button' onClick={onClick}>
			<ToolbarIcon icon={icon} size={iconSize} />
		</span>;
	}
};


export default ToolbarButton;
