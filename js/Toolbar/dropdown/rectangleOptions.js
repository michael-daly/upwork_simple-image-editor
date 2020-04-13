import { deepfreeze } from '~/util/deepfreeze.js';

import { RECT_FILL, RECT_OUTLINE } from '~/Toolbar/constants.js';


const rectangleOptions = deepfreeze (
[
	{ label: 'Fill',    value: RECT_FILL    },
	{ label: 'Outline', value: RECT_OUTLINE },
]);


export { rectangleOptions };
