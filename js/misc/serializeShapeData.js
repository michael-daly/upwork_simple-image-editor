import { deepcopy } from '~/util/deepcopy.js';


const serializeShapeData = ( globalState, mainCanvasState ) =>
{
	const serialized =
	{
		imageNumber:      globalState.imageNumber,
		imageDescription: globalState.imageDescription,
		shapes:           deepcopy (mainCanvasState.shapes),
		shapeIndex:       mainCanvasState.shapeIndex,
	};

	return serialized;
};


export { serializeShapeData };
