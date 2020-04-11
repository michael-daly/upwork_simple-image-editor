const { has } = require ('~/util/has.js');

const { POPUP_OK } = require ('~/Popup/constants.js');


const defaultState =
{
	canvasWidth:  0,
	canvasHeight: 0,

	imageNumber:      0,
	imageDescription: '',
};


module.exports = ( state = defaultState, action ) =>
{
	const { type, payload } = action;

	switch ( type )
	{
		case 'SET_CANVAS_SIZE':
		{
			return { ...state, canvasWidth: payload.width, canvasHeight: payload.height };
		}

		case 'SET_IMAGE_DATA':
		{
			const { imageNumber, imageDescription } = payload;

			return { ...state, imageNumber, imageDescription };
		}
	}

	return state;
};
