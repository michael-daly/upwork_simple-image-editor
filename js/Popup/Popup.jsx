import React, { Component } from 'react';

import { connect } from 'react-redux';

import InputControl from '~/controls/InputControl.jsx';

import { hidePopup } from '~/Popup/actions.js';

import { POPUP_OK_CANCEL } from '~/Popup/constants.js';


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

		let cancelButton = '';

		if ( props.popupType === POPUP_OK_CANCEL )
		{
			cancelButton =
			(
				<span className='image-editor-popup-button' onClick={this.clickCancel.bind (this)}>
					Cancel
				</span>
			);
		}

		const popup = this;

		const popupComponent =
		(
			<div className='image-editor-popup'>
				<div className='image-editor-popup-overlay'>
					<div className='image-editor-popup-window'>
						<h3 className='image-editor-popup-title'>{props.title}</h3>
						<div className='image-editor-popup-controls'>
						{
							controls.map (( data, index ) =>
							{
								const value = emptyValues ? data.value : controlValues[index];
								const type  = data.type;

								return <div
									key={`popup-${type}-${index}`}
									className='image-editor-control-container'
								>
									<InputControl
										type={type}
										index={index}
										value={value}
										controlData={data}
										setValue={newValue => popup.setControlValue (index, newValue)}
									/>
								</div>;
							})
						}
						</div>
						<div className='image-editor-popup-button-container'>
							<span
								className='image-editor-popup-button'
								onClick={this.clickOK.bind (this)}
							>
								OK
							</span>
							{cancelButton}
						</div>
					</div>
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
