import React, {Component} from 'react'
import Header from '../containers/header'
import { Grid } from 'react-bootstrap'

class App extends Component{
	render(){
		return (
			<div>
				<Header />
				<Grid>
					{this.props.children}
				</Grid>
			</div>
		)
	}
}

App.propTypes = {
	children: React.PropTypes.object
}

export default App