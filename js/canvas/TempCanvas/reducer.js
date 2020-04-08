const defaultState =
{
	isDrawing: false,

	originX: 0,
	originY: 0,

	endX: 10,
	endY: 20,
};


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'START_DRAWING': return { ...state, ...payload, isDrawing: true  };
		case 'STOP_DRAWING':  return { ...state, ...payload, isDrawing: false };
		case 'SET_DRAW_END':  return { ...state, ...payload                   };
	}

	return state;
};
