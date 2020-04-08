import React, { Fragment } from 'react';


const ToolbarButton = ({ text, onClick }) =>
{
	const fragment =
	(
		<Fragment>
			<input type='button' value={text} onClick={onClick} />
		</Fragment>
	);

	return fragment;
};


export default ToolbarButton;
