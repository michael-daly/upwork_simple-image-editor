import React, { Component } from 'react';

import { connect } from 'react-redux';

import ToolbarButton   from '~/Toolbar/ToolbarButton.jsx';
import ToolbarDropdown from '~/ToolbarDropdown/ToolbarDropdown.jsx';

import { rectangleOptions     } from '~/ToolbarDropdown/rectangle.js';
import { setTool, setToolType } from '~/Toolbar/actions.js';

import { TOOL_RECTANGLE, RECT_FILL, RECT_EMPTY } from '~/Toolbar/constants.js';


class Toolbar extends Component
{
	setTool ( tool )
	{
		this.props.setTool (tool);
	}

	setToolType ( event )
	{
		this.props.setToolType (event.target.value);
	}

	render ()
	{
		const canvas =
		(
			<div>
				<ToolbarButton text='Rectangle' onClick={() => this.setTool (TOOL_RECTANGLE)}/>
				<ToolbarDropdown
					name='rectangleOptions'
					list={rectangleOptions}
					onSelect={this.setToolType.bind (this)}
				/>
			</div>
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
			dispatch (setTool (...args));
		},

		setToolType ( ...args )
		{
			dispatch (setToolType (...args));
		},
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (Toolbar);
