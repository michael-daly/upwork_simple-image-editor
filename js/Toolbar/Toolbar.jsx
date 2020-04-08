import React, { Component } from 'react';

import { connect } from 'react-redux';

import ToolbarButton   from '~/Toolbar/ToolbarButton.jsx';
import ToolbarDropdown from '~/ToolbarDropdown/ToolbarDropdown.jsx';

import { rectangleOptions} from '~/ToolbarDropdown/rectangle.js';

import { setTool, setToolType } from '~/Toolbar/actions.js';
import { undo,    redo        } from '~/MainCanvas/actions.js';

import { TOOL_RECTANGLE, RECT_FILL, RECT_EMPTY } from '~/Toolbar/constants.js';


class Toolbar extends Component
{
	render ()
	{
		const canvas =
		(
			<div>
				<ToolbarButton text='Undo' onClick={this.props.undo.bind (this)} />
				<ToolbarButton text='Redo' onClick={this.props.redo.bind (this)} />

				<ToolbarButton text='Rectangle' onClick={() => this.props.setTool (TOOL_RECTANGLE)} />
				<ToolbarDropdown
					name='rectangleOptions'
					list={rectangleOptions}

					onSelect={event => this.props.setToolType (event.target.value)}
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
		undo ()
		{
			dispatch (undo ());
		},

		redo ()
		{
			dispatch (redo ());
		},

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
