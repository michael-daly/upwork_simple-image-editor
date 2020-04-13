import React, { Component } from 'react';

import { WINDOW_OK, WINDOW_OK_CANCEL } from '~/Popup/constants.js';


const Window = props =>
{
	const { windowType = WINDOW_OK, clickOK = () => {}, clickCancel = () => {} } = props;

	let cancelButton = '';

	if ( windowType === WINDOW_OK_CANCEL )
	{
		cancelButton =
		(
			<span className='image-editor-window-button' onClick={clickCancel}>
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
				<span className='image-editor-window-button-accept' onClick={clickOK}>
					OK
				</span>
				{cancelButton}
			</div>
		</div>
	);

	return win;
}


export default Window;
