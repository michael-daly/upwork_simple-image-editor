const { has      } = require ('~/util/has.js');
const { deepcopy } = require ('~/util/deepcopy.js');

const { WINDOW_OK } = require ('~/Popup/constants.js');


const defaultState =
{
	showPopup:   false,
	title:       'Popup',
	windowType:  WINDOW_OK,
	popupAction: '',
	controls:    [],
};


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'SHOW_POPUP':
		{
			if ( payload === null )
			{
				return state;
			}

			return { ...state, ...deepcopy (payload), showPopup: true };
		}

		case 'HIDE_POPUP':
		{
			return { ...state, showPopup: false };
		}
	}

	return state;
};
