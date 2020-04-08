import React, { Component } from 'react';

import AppCanvas from '~/canvas/AppCanvas.jsx';

import { connect } from 'react-redux';


class MainCanvas extends Component
{
	render ()
	{
		return <AppCanvas name='mainCanvas' shapes={this.props.shapes} />;
	}
}


const mapStateToProps = ({ mainCanvas }) =>
{
	const props =
	{
		shapes: mainCanvas.shapes,
	};

	return props;
};

const mapDispatchToProps = dispatch =>
{
	const props = {};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (MainCanvas);
