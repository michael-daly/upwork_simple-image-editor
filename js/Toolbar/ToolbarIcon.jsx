import React   from 'react';
import IcoMoon from 'react-icomoon';

const iconSet = require ('~/icons.js');


const ToolbarIcon = ({ ...props }) =>
{
	return <IcoMoon className='image-editor-toolbar-button-icon' iconSet={iconSet} {...props} />;
};
 

export default ToolbarIcon;
