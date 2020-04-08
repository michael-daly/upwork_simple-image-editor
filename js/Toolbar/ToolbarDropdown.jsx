import React from 'react';


const ToolbarDropdown = ({ name, dropdownList, onDropdownSelect }) =>
(
	<select onChange={onDropdownSelect}>
	{
		dropdownList.map (({ value, text }, index ) =>
		{
			return <option key={`dropdown-${name}-${index}`}value={value}>{text}</option>;
		})
	}
	</select>
);


export default ToolbarDropdown;
