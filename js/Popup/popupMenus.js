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
			value:        0,
			stateField:   'imageNumber',
			stateReducer: 'global',
		},

		{
			type:         GUI_TEXTBOX,
			label:        'Image Description:',
			value:        '',
			stateField:   'imageDescription',
			stateReducer: 'global',
		},
	],
});


export { editImageMenu };
