import React, { Component } from 'react';

import { POPUP_OK_CANCEL } from '~/Popup/constants.js';


const Window = props =>
{
	let cancelButton = '';

	if ( props.popupType === POPUP_OK_CANCEL )
	{
		cancelButton =
		(
			<span className='image-editor-popup-button' onClick={props.clickCancel}>
				Cancel
			</span>
		);
	}

	const win =
	(
		<div className='image-editor-popup'>
			<div className='image-editor-popup-overlay'>
				<div className='image-editor-popup-window'>
					<h3 className='image-editor-popup-title'>
						{props.title}
					</h3>
					<div className='image-editor-popup-controls'>
						{props.body}
					</div>
					<div className='image-editor-popup-button-container'>
						<span className='image-editor-popup-button-accept' onClick={props.clickOK}>
							OK
						</span>
						{cancelButton}
					</div>
				</div>
			</div>
		</div>
	);

	return win;
}


export default Window;
