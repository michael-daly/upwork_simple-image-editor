import React, { Component } from 'react';

import { EditableInput } from 'react-color/lib/components/common';


class ThreeValuesColorCtrl extends Component
{
	render ()
	{
		const { style, labels, values, onChange } = this.props;

		const controls = labels.map (( label, index ) =>
		{
			return <EditableInput
				style={style}
				key={`color-picker-control-${label}-${index}`}
				label={label}
				value={values[index]}
				onChange={object => onChange (object, label, index)}
			/>;
		});

		return <div className='image-editor-color-controls-three'>{controls}</div>;
	}
}


export default ThreeValuesColorCtrl;
