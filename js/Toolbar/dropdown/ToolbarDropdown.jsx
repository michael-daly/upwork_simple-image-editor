import React from 'react';


const ToolbarDropdown = ({ name, list, onSelect }) =>
(
	<select onChange={onSelect}>
	{
		list.map (({ value, text }, index ) =>
		{
			return <option key={`dropdown-${name}-${index}`}value={value}>{text}</option>;
		})
	}
	</select>
);


export default ToolbarDropdown;
