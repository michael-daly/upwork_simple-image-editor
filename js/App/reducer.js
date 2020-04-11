const { has } = require ('~/util/has.js');

const { POPUP_OK } = require ('~/Popup/constants.js');


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
		case 'SET_IMAGE_DATA':
		{
			const { imageNumber, imageDescription } = payload;

			return { ...state, imageNumber, imageDescription };
		}
	}

	return state;
};
