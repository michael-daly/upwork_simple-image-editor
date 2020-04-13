import { isArray, isObject } from '~/util/typeChecks.js';


const deepcopy = value =>
{
	if ( isArray (value) )
	{
		const { length } = value;

		let newArray = [];

		for ( let i = 0;  i < length;  i++ )
		{
			newArray.push (deepcopy (value[i]));
		}

		return newArray;
	}
	else if ( isObject (value) )
	{
		let newObject = {};

		for ( let i in value )
		{
			newObject[i] = deepcopy (value[i]);
		}

		return newObject;
	}

	return value;
};


export { deepcopy };
