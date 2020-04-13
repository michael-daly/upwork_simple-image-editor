import { deepfreeze } from '~/util/deepfreeze.js';

import { POPUP_OK_CANCEL } from '~/Popup/constants.js';

import { GUI_TEXTBOX, GUI_NUMBER, GUI_INTEGER } from '~/controls/constants.js';


const editImageMenu = deepfreeze (
{
	title:         'Edit Image Data',
	popupType:     POPUP_OK_CANCEL,
	popupAction:   'SET_IMAGE_DATA',

	controls:
	[
		{
			type:         GUI_INTEGER,
			label:        'Image Number:',
			width:        '5vw',
			value:        0,
			maxLength:    12,
			stateField:   'imageNumber',
			stateReducer: 'global',
		},

		{
			type:         GUI_TEXTBOX,
			label:        'Image Description:',
			width:        '18vw',
			value:        '',
			maxLength:    300,
			stateField:   'imageDescription',
			stateReducer: 'global',
		},
	],
});


export { editImageMenu };
