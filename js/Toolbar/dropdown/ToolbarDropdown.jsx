import React from 'react';


const ToolbarDropdown = ( props ) =>
{
	const { name, list, onSelect, misc = {} } = props;

	return <select {...misc} onChange={onSelect}>
	{
		list.map (({ value, text }, index ) =>
		{
			return <option key={`dropdown-${name}-${index}`}value={value}>{text}</option>;
		})
	}
	</select>;
};


export default ToolbarDropdown;
