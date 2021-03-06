import React    from 'react';
import Dropdown from 'react-dropdown';


const ToolbarDropdown = ( props ) =>
{
	const { name, list, onSelect, className = '', misc = {} } = props;

	return <Dropdown
		{...misc}
		className={`image-editor-toolbar-dropdown ${className}`}
		menuClassName='image-editor-toolbar-dropdown-menu'
		placeholder='&#9660;'
		options={list}
		onChange={onSelect}
	/>;
};


export default ToolbarDropdown;
