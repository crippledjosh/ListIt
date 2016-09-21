import React from 'react'
import {Bert} from 'meteor/themeteorchef:bert'
import {Media, Grid, Row, Col, ListGroup, ListGroupItem, Checkbox, Button, Panel, Label} from 'react-bootstrap'
import IngredientCreate from '../containers/ingredient-create'


const handleRemoveIngredient = (remove) => {

	if (confirm('Are you sure? This is permanent.')) {
		remove((error) => {
			if (error) {
				Bert.alert(error.reason, 'danger')
			}
			else {
				Bert.alert('Ingredient removed!', 'success')
			}
		})
	}
}

const IngredientView = ({ingredient,handleDelete}) => {
	return(
		<Panel header={ingredient.name}>
			<Grid>
				<Media>
					<Media.Left align="middle">
						<img width={150} height={150} src={ingredient.image}/>
					</Media.Left>
					<Media.Body>
						<Row>
							<Col sm={6} md={3}>
								<h4>Recipes</h4>
								<ListGroup>
								<ListGroupItem>Item 1</ListGroupItem>
								<ListGroupItem>Item 2</ListGroupItem>
								<ListGroupItem>...</ListGroupItem>
								</ListGroup>
							</Col>
							<Col sm={12} md={6}>
								<Row>
									<Checkbox checked readOnly>
									Include in Shopping Lists by Default
									</Checkbox>
								</Row>
								<Row>
									<h4>Default Measurement Type: <Label>{ingredient.measurement.defaultType}</Label></h4>
								</Row>
								<Row>
									<h4>Default Measurement Subtype: <Label>{ingredient.measurement.defaultSubtype}</Label></h4>
								</Row>
							</Col>
						</Row>
					</Media.Body>
				</Media>
			</Grid>
			<div className="ingredient-button-wrapper">
				<IngredientCreate buttonClass="ingredient-edit" ingredient={ingredient} />
				<Button className="ingredient-delete" bsStyle="danger" onClick={handleRemoveIngredient.bind(null, handleDelete)}>Delete</Button>
			</div>
		</Panel>
	)
}
	
IngredientView.propTypes = {
	ingredient: React.PropTypes.object,
	handleDelete: React.PropTypes.func
}

export default IngredientView