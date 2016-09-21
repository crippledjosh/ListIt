import React, {Component} from 'react'
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'

class FieldGroup extends Component {
	render(){
		const {id, label, help, ...props} = this.props
		return (
			<FormGroup controlId={id}>
				<ControlLabel>{label}</ControlLabel>
				<FormControl ref="input" {...props} />
				{help && <HelpBlock>{help}</HelpBlock>}
			</FormGroup>
		)
	}

}

FieldGroup.propTypes = {
	id: React.PropTypes.string,
	label: React.PropTypes.string,
	help: React.PropTypes.string
}

export default FieldGroup