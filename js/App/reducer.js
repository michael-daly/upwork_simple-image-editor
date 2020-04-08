const defaultState =
{
	canvasWidth:  1440,
	canvasHeight: 810,

	imageNumber:      0,
	imageDescription: '',
};


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'SET_IMAGE_NUMBER':      return { ...state, imageNumber:      payload };
		case 'SET_IMAGE_DESCRIPTION': return { ...state, imageDescription: payload };
	}

	return state;
};
