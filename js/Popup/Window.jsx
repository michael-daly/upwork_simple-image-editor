import React, { Component } from 'react';

import { WINDOW_OK_CANCEL } from '~/Popup/constants.js';


const Window = props =>
{
	let cancelButton = '';

	if ( props.windowType === WINDOW_OK_CANCEL )
	{
		cancelButton =
		(
			<span className='image-editor-window-button' onClick={props.clickCancel}>
				Cancel
			</span>
		);
	}

	const win =
	(
		<div className='image-editor-window'>
			<h3 className='image-editor-window-title'>
				{props.title}
			</h3>
			<div className='image-editor-window-controls'>
				{props.body}
			</div>
			<div className='image-editor-window-button-container'>
				<span className='image-editor-window-button-accept' onClick={props.clickOK}>
					OK
				</span>
				{cancelButton}
			</div>
		</div>
	);

	return win;
}


export default Window;
