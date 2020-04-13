import React    from 'react';
import useImage from 'use-image';

import 'konva/lib/shapes/Image';

import { Image } from 'react-konva/lib/ReactKonvaCore';


const BackgroundImage = ({ imageURL = null }) =>
{
	if ( imageURL !== null )
	{
		const [image] = useImage (imageURL);

		return <Image image={image} />;
	}

	return null;
};


export default BackgroundImage;
