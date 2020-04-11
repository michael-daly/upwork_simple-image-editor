const { deepcopy   } = require ('~/util/deepcopy.js');
const { deepfreeze } = require ('~/util/deepfreeze.js');


const defaultState = deepfreeze (
{
	isDrawing: false,

	originX: 0,
	originY: 0,

	endX: 0,
	endY: 0,
});


module.exports = ( state = deepcopy (defaultState), action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'START_DRAWING':
		{
			return { ...state, ...payload, isDrawing: true };
		}

		case 'STOP_DRAWING':
		{
			return { ...state, isDrawing: false, originX: 0, originY: 0, endX: 0, endY: 0 };
		}

		case 'SET_DRAW_END':
		{
			return { ...state, ...payload };
		}

		case 'SET_CANVAS_SIZE':
		{
			return deepcopy (defaultState);
		}
	}

	return state;
};
