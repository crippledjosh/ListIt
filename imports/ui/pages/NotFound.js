import React from 'react'
import {Alert} from 'react-bootstrap'

const NotFound = () => {
	const redirected = location.state && location.state.pathname
	return(
		<Alert bsStyle="danger">
			<p><strong>Error [404]</strong>: { redirected ? location.state.pathname : window.location.pathname } does not exist.</p>
		</Alert>
	)
}

NotFound.propTypes = {
	location: React.PropTypes.object
}

export default NotFound