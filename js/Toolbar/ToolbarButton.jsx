import React, { Fragment } from 'react';


const ToolbarButton = ( props ) =>
{
	const { text, disabled, onClick, misc = {} } = props;

	return <input {...misc} type='button' value={text} onClick={onClick} />;
};


export default ToolbarButton;
