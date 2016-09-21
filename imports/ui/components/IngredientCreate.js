import React, {Component} from 'react'
import {Button, Modal, Checkbox, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import FieldGroup from './helpers/FieldGroup'
import addIngrdient from '../../modules/add-ingredient'
import _ from 'lodash'

class IngredientCreate extends Component{
	constructor(props){
		super(props)
		let state = {
			showModal: false,
			included: true,
			measurementType: {index:0, name:this.props.measurements[0].name},
			measurementSubtype:{index:0, name:this.props.measurements[0].subtypes[0].name},
			name: '',
			image: ''
		}

		if(!this.props.creating){
			const {name, included, image, measurement} = this.props.ingredient
			const measurementType = {
				name: measurement.defaultType,
				index: this._getListIndexByName(this.props.measurements, measurement.defaultType)
			}
			const measurementSubtype = {
				name: measurement.defaultSubtype,
				index: this._getListIndexByName(this.props.measurements[measurementType.index].subtypes, measurement.defaultSubtype)
			}
			_.assign(state,
				{
					name,
					included,
					image,
					measurementType,
					measurementSubtype
				}
			)
		}

		this.state = state
	}

	_getListIndexByName = (array, name) => {
		return _.findIndex(array, (measurement) => {
			return measurement.name == name
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
	}

	close = () => {
		this.setState({ showModal: false })
	}

	open = () => {
		this.setState({ showModal: true })
	}

	save = () => {
		addIngrdient({ component: this })
	}
	checkboxHandler = (event) => {
		this.setState({included:event.target.checked})
	}
	renderOption = (measurement) => {
		return <option key={measurement.name} value={measurement.name}>{measurement.name}</option>
	}
	renderMeasurementTypes = () => {
		return (
			this.props.measurements.map((measurement) => {
				return(
					this.renderOption(measurement)
				)
			})
		)
	}

	renderMeasurementSubtypes = () =>{
		return (
			this.props.measurements[this.state.measurementType.index].subtypes.map((measurement) => {
				return(
					this.renderOption(measurement)	
				)
			})
		)
	}

	controlChangeHandler = (e) =>{
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	measurementTypeSelectHandler = (e) =>{
		const name = e.target.value
		const index = this._getListIndexByName(this.props.measurements, name)
		this.setState(
			{
				measurementType:
				{
					index,
					name
				},
				measurementSubtype:{
					index: 0,
					name: this.props.measurements[index].subtypes[0].name
				}
			}
		)
	}
	measurementSubtypeSelectHandler = (e) =>{
		const name = e.target.value
		const index = this._getListIndexByName(this.props.measurements[this.state.measurementType.index].subtypes, name)
		this.setState(
			{
				measurementSubtype:
				{
					
					name,
					index
				}
			}
		)
	}
	render() {
		return (
			<div>
				<Button
					bsStyle="primary"
					onClick={this.open}
					className={this.props.buttonClass}
				>
				{this.props.creating ? 'Add Ingredient' : 'Edit'}
				</Button>

				<Modal show={this.state.showModal} onHide={this.close}>
					<form ref="addIngredient" className="add-ingredient" onSubmit={ this.handleSubmit }>
						<Modal.Header closeButton>
							<Modal.Title>Add New Ingredient</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<FieldGroup
								id="IngredientNameControl"
								type="text"
								label="Name"
								placeholder="Enter name of ingredient"
								ref="name"
								name="name"
								value={this.state.name}
								onChange={this.controlChangeHandler}
							/>
							<FieldGroup
								id="ingredientImageControl"
								type="file"
								label="Image of food"
								help="This is just an image of your ingredient"
								ref="image"
								name="image"
								onChange={this.controlChangeHandler}
							/>
							<FormGroup controlId="measurementSelectType">
								<ControlLabel>Default Measurement Type</ControlLabel>
								<FormControl componentClass="select" placeholder="select" value={this.state.measurementType.name} onChange={this.measurementTypeSelectHandler}>
									{this.renderMeasurementTypes()}
								</FormControl>
							</FormGroup>

							<FormGroup controlId="measurementSelectSubtype">
								<ControlLabel>Default Measurement Subtype</ControlLabel>
								<FormControl componentClass="select" placeholder="select" value={this.state.measurementSubtype.name} onChange={this.measurementSubtypeSelectHandler}>
									{this.renderMeasurementSubtypes()}
								</FormControl>
							</FormGroup>
							<Checkbox name="included" defaultChecked onChange={this.checkboxHandler} ref="included" inputRef={ref => { this.included = ref}}>
								Include ingredient in shopping lists by default
							</Checkbox>
						</Modal.Body>
						<Modal.Footer>
							<Button type="submit" onClick={this.save}>Save</Button>
							<Button onClick={this.close}>Cancel</Button>
						</Modal.Footer>
					</form>
				</Modal>
			</div>
		)
	}
}

IngredientCreate.propTypes = {
	measurements: React.PropTypes.array,
	creating: React.PropTypes.bool,
	ingredient: React.PropTypes.object,
	buttonClass: React.PropTypes.string

}

export default IngredientCreate