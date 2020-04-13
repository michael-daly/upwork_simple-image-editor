/**
 * Initialize Font Awesome icons.
 */

import { library } from '@fortawesome/fontawesome-svg-core';

const icons = require ('@fortawesome/free-solid-svg-icons');


const useIcons  =
[
	'faPaperPlane',
	'faEdit',
	'faUndo',
	'faRedo',
	'faTrashAlt',
	'faEraser',
	'faEyeDropper',
	'faSquare',
	'faLongArrowAltRight',
];

const { length } = useIcons;

for ( let i = 0;  i < length;  i++ )
{
	const iconName = useIcons[i];

	library.add (icons[iconName]);	
}
