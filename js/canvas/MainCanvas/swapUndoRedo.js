import { has } from '~/util/has.js';


const swapUndoRedo = action =>
{
	const swapped =
	{
		type:        action.reverseType,
		reverseType: action.type,
		isUndoRedo:  action.isUndoRedo,
	};

	if ( has (action, 'payload') )
	{
		swapped.reversePayload = action.payload;
	}

	if ( has (action, 'reversePayload') )
	{
		swapped.payload = action.reversePayload;
	}

	return swapped;
};


export { swapUndoRedo };
