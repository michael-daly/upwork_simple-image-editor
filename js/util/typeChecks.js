const isArray = value =>
{
	return Array.isArray (value);
};

const isObject = value => 
{
	return typeof value === 'object'  &&  !Array.isArray (value);
};

const isString = value =>
{
	return typeof value === 'string';
};

const isNumber = value =>
{
	typeof value === 'number'  &&  !isNaN (value)  &&  isFinite (value);
};

const isInteger = value =>
{
	return isNumber (value)  &&  Number.isInteger (value);
};

const isNothing = value =>
{
	return typeof value === 'undefined'  ||  value === null;
};


export { isArray, isObject, isString, isNumber, isInteger, isNothing };
