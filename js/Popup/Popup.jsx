import React, { Component } from 'react';

import { connect } from 'react-redux';

import Window       from '~/Popup/Window.jsx';
import InputControl from '~/controls/InputControl.jsx';

import { hidePopup } from '~/Popup/actions.js';


class Popup extends Component
{
	constructor ( props )
	{
		super (props);

		this.state = { controlValues: [] };
	}

	clickOK ()
	{
		const { controlValues } = this.state;
		const { controls      } = this.props;

		const { length } = controls;

		const payload = {};

		// Build payload according to control data described in {~/Popup/popupMenus.js}
		for ( let i = 0;  i < length;  i++ )
		{
			payload[controls[i].stateField] = controlValues[i];
		}

		this.props.hide (this.props.popupAction, payload);
	}

	clickCancel ()
	{
		this.props.hide ();
	}

	setControlValue ( index, value )
	{
		const controlValues = this.state.controlValues.slice ();

		controlValues[index] = value;

		this.setState ({ controlValues });
	}

	/**
	 * @see {~/Popup/middleware.js}
	 */
	componentDidMount ()
	{
		const { controls } = this.props;
		const { length   } = controls;

		const controlValues = [];

		for ( let i = 0;  i < length;  i++ )
		{
			controlValues.push (controls[i].value);
		}

		this.setState ({ controlValues });
	}

	render ()
	{
		const { props         } = this;
		const { controlValues } = this.state;
		const { controls      } = props;

		const emptyValues = controlValues.length <= 0;
		const popup       = this;

		const controlComponents = controls.map (( data, index ) =>
		{
			const value = emptyValues ? data.value : controlValues[index];
			const type  = data.type;

			const ctrl =
			(
				<div key={`popup-${type}-${index}`} className='image-editor-control-container'>
					<InputControl
						type={type}
						index={index}
						value={value}
						controlData={data}
						setValue={newValue => popup.setControlValue (index, newValue)}
					/>
				</div>
			);

			return ctrl;
		});

		const popupComponent =
		(
			<div className='image-editor-popup'>
				<div className='image-editor-popup-overlay'>
					<Window
						title={props.title}
						body={controlComponents}
						windowType={props.windowType}
						clickOK={this.clickOK.bind (this)}
						clickCancel={this.clickCancel.bind (this)}
					/>
				</div>
			</div>
		);

		return popupComponent;
	}
}


const mapStateToProps = ({ popup }) =>
{
	return { ...popup };
};

const mapDispatchToProps = dispatch =>
{
	const props =
	{
		hide ( ...args )
		{
			dispatch (hidePopup (...args));
		},
	};

	return props;
};


export default connect (mapStateToProps, mapDispatchToProps) (Popup);
