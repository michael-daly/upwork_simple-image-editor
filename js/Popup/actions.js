import { deepcopy    } from '~/util/deepcopy.js';
import { isUndefined } from '~/util/typeChecks.js';


const showPopup = ( popupData = null ) =>
{
	return { type: 'SHOW_POPUP', payload: deepcopy (popupData) };
};

const hidePopup = ( actionType, actionPayload ) =>
{
	const action = { type: 'HIDE_POPUP' };

	if ( !isUndefined (actionType) )
	{
		action.payload = { type: actionType };

		if ( !isUndefined (actionPayload) )
		{
			action.payload.payload = actionPayload;
		}
	}

	return action;
};


export { showPopup, hidePopup };
