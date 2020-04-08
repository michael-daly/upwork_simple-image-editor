import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import ToolbarButton   from '~/Toolbar/ToolbarButton.jsx';
import ToolbarDropdown from '~/Toolbar/ToolbarDropdown.jsx';

import { TOOL_RECTANGLE } from '~/Toolbar/constants.js';


class Toolbar extends Component
{
	setTool ( tool )
	{
		this.props.setTool (tool);
	}

	render ()
	{
		const canvas =
		(
			<Fragment>
				<ToolbarButton text='Rectangle' onClick={() => this.setTool (TOOL_RECTANGLE)}/>
				<ToolbarDropdown dropdownList={[{ text: 'Test', value: 'test' }]} />
			</Fragment>
		);

		return canvas;
	}
}


const mapStateToProps = ({ toolbar }) =>
{
	const props =
	{

	};

	return props;
};

const mapDispatchToProps = dispatch =>
{
	const props =
	{
		setTool ( ...args )
		{
			dispatch (setCurrentTool (...args));
		}
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (Toolbar);
