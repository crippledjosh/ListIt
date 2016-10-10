import React, {Component} from 'react';
import { Link } from 'react-router';
import { InputGroup, FormControl, Glyphicon, Button} from 'react-bootstrap';

export class IngredientsList extends Component{

	onSearchChange(event){
		this.props.onSearchChange(event.target.value)
	}

	ingredientThumbNail(ingredient){
		const url = `/ingredient/${ingredient._id}`;
		return(
			<div className="ingredient-thumb-nail" key={ingredient._id}>
				<Link to={url}>
					<img src={ingredient.image} alt="" className="ingredient"/>
					<span className="display-property">{ingredient.name}</span>
				</Link>

			</div>
		)
	}
	renderedIngredientList(){
		return this.props.ingredients.map((ingredient) => {
			return this.ingredientThumbNail(ingredient)
		})
	}
	render(){
		return(
			<div>
				<h3>Your Ingredients</h3>
				<div>
					<InputGroup>
						<FormControl
							type="text"
							placeholder="Ingredient Name"
							onChange={this.onSearchChange.bind(this)}

						/>
						<InputGroup.Addon>
							<Glyphicon glyph="search" />
						</InputGroup.Addon>
					</InputGroup>
				</div>
				<div className="ingredient-list">
					{this.renderedIngredientList.bind(this)()}
				</div>
				<Button onClick={this.props.loadMoreHandler}>Load More</Button>
			</div>
		)
	}
}

IngredientsList.propTypes = {
	ingredients: React.PropTypes.array,
	loadMoreHandler: React.PropTypes.func,
	onSearchChange: React.PropTypes.func
};
