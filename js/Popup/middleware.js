const { has } = require ('~/util/has.js');


module.exports = store => next => action =>
{
	const state = store.getState ();

	const { type, payload } = action;

	switch ( type )
	{
		/**
		 * Intercept SHOW_POPUP to set the controls' values to the current value of the state field
		 * they're assigned to.
		 */
		case 'SHOW_POPUP':
		{
			if ( payload !== null )
			{
				const { controls } = payload;
				const { length   } = controls;

				for ( let i = 0;  i < length;  i++ )
				{
					const ctrl = controls[i];

					ctrl.value = state[ctrl.stateReducer][ctrl.stateField];
				}
			}

			break;
		}

		/* Intercept HIDE_POPUP to dispatch any attached action. */

		case 'HIDE_POPUP':
		{
			if ( has (action, 'payload') )
			{
				store.dispatch (payload);
			}

			break;
		}
	}

	return next (action);
};
