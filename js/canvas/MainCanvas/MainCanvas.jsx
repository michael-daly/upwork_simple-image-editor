import React, { Component } from 'react';

import AppCanvas from '~/canvas/AppCanvas.jsx';

import { connect } from 'react-redux';


class MainCanvas extends Component
{
	render ()
	{
		return <AppCanvas rectangles={this.props.rectangles} />;
	}
}


const mapStateToProps = ({ mainCanvas }) =>
{
	const props =
	{
		rectangles: mainCanvas.rectangles,
	};

	return props;
};

const mapDispatchToProps = dispatch =>
{
	const props = {};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (MainCanvas);
