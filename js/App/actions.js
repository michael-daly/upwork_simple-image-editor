const setImageNumber = number =>
{
	return { type: 'SET_IMAGE_NUMBER', payload: number };
};

const setImageDescription = description =>
{
	return { type: 'SET_IMAGE_DESCRIPTION', payload: description };
};


export { setImageNumber, setImageDescription };
