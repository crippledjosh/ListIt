import React, {Component} from 'react'
import {Grid, Row} from 'react-bootstrap'
import DropZone from 'react-dropzone'
import {Slingshot} from 'meteor/edgee:slingshot'

class ImageUpload extends Component{
	constructor(props){
		super(props);

		this.state = {file: undefined}
	}
	componentWillMount(){
		Slingshot.fileRestrictions('Images', {
			allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
			maxSize: 2 * 500 * 5000
		})
	}

	onDrop = (files) => {
		const file = files[0];
		this.setState({file});
		if(this.props.onDrop){
			this.props.onDrop(file)
		}
	}

	upload = (meta) => {
		return new Promise((resolve, reject) => {
			const uploader = new Slingshot.Upload('Images', meta);
			uploader.send(this.state.file, function (error, downloadUrl) {
				if (error) {
					reject(error, uploader.xhr.response)
				}
				else {
					resolve(downloadUrl)
				}
			}.bind(this))
		})
	}
	renderImage = () => {
		return this.state.file ? <img className="image-preview" src={this.state.file.preview} /> : <div></div>
	}
	render(){
		return (
			<div>
				<Grid>
					<Row>
						<DropZone className="image-dropzone" ref="dropzone" onDrop={this.onDrop} multiple={false} accept="image/*">
							<div>Try dropping some files here, or click to select files to upload.</div>
						</DropZone>
						{this.renderImage()}
					</Row>
				</Grid>
			</div>
		)
	}
}

ImageUpload.propTypes = {
	onDrop: React.PropTypes.func
};

export {ImageUpload};
