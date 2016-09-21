import React from 'react'
import { browserHistory } from 'react-router'
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'
import { Nav, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap'
import IngredientCreate from '../containers/ingredient-create'
import { Meteor } from 'meteor/meteor'

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'))

const userName = () => {
	const user = Meteor.user()
	const name = user && user.profile ? user.profile.name : ''
	return user ? `${name.first} ${name.last}` : ''
}

export const AuthenticatedNavigation = () => (
	<div>
		<Nav>
			<IndexLinkContainer to="/ingredients">
				<NavItem eventKey={ 1 } href="#">Ingredients</NavItem>
			</IndexLinkContainer>
			<LinkContainer to="/recipes">
				<NavItem eventKey={ 2 } href="#">Recipes</NavItem>
			</LinkContainer>
			<LinkContainer to="/shopping-list">
				<NavItem eventKey={ 2 } href="#">Shopping List</NavItem>
			</LinkContainer>
		</Nav>
		<Nav pullRight>
			<NavDropdown eventKey={ 3 } title={ userName() } id="basic-nav-dropdown">
				<MenuItem eventKey={ 3.1 } onClick={ handleLogout }>Logout</MenuItem>
			</NavDropdown>
		</Nav>
		<div className="navbar-form navbar-right">
			<Button bsStyle="primary">Add Recipe</Button>
		</div>
		<div className="navbar-form navbar-right">
			<IngredientCreate />
		</div>
	</div>
)
