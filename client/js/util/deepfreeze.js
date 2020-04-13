import { isArray, isObject } from '~/util/typeChecks.js';


const deepfreeze = value =>
{
	if ( (!isArray (value)  &&  !isObject (value))  ||  Object.isFrozen (value) )
	{
		return value;
	}

	if ( isArray (value) )
	{
		const { length } = value;

		for ( let i = 0;  i < length;  i++ )
		{
			deepfreeze (value[i]);
		}
	}
	else if ( isObject (value) )
	{
		for ( let i in value )
		{
			deepfreeze (value[i]);
		}
	}

	return Object.freeze (value);
};


export { deepfreeze };
