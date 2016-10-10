import React, {Component} from 'react';
import { HeaderContainer } from '../containers/header';
import { Grid } from 'react-bootstrap';

export class App extends Component{
	render(){
		return (
			<div>
				<HeaderContainer />
				<Grid>
					{this.props.children}
				</Grid>
			</div>
		)
	}
}

App.propTypes = {
	children: React.PropTypes.object
};
