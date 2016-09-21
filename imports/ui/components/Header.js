import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router'
import { PublicNavigation } from './PublicNavigation'
import { AuthenticatedNavigation } from './AuthenticatedNavigation'

const renderNavigation = (hasUser) => {
	return hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />
}

const Header = (props) => {
	return (
		<Navbar className="header">
			<Navbar.Header>
				<Navbar.Brand>
					<Link to="/">List It</Link>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				{ renderNavigation(props.hasUser) }
			</Navbar.Collapse>
		</Navbar>
	)
}

Header.propTypes = {
	hasUser: React.PropTypes.object
}

export default Header