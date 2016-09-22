import React, {Component} from 'react'
import {Grid, Row} from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import {Slingshot} from 'meteor/edgee:slingshot'

class ImageUpload extends Component{
	constructor(props){
		super(props)

		this.state = {file: undefined}
	}
	componentWillMount(){
		Slingshot.fileRestrictions('image', {
			allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
			maxSize: 2 * 500 * 5000
		})
	}

	onDrop = (files) => {
		const file = files[0]
		this.setState({file})
		if(this.props.onDrop){
			this.props.onDrop(file)		
		}
	}
	upload = () => {
		return new Promise((resolve, reject) => {
			const uploader = new Slingshot.Upload('Images')
			uploader.send(this.state.file, function (error, downloadUrl) { // you can use refs if you like
				debugger
				if (error) {
					reject(error, uploader.xhr.response)
				}
				else {
				// we use $set because the user can change their avatar so it overwrites the url :)
					console.log(downloadUrl) 
					resolve()
				}
				// you will need this in the event the user hit the update button because it will remove the avatar url
				this.setState({avatar: downloadUrl})
			}.bind(this))
		})
	}
	openDrop = () => {
		this.refs.dropzone.open()
	}
	renderImage = () => {
		return this.state.file ? <img className="image-preview" src={this.state.file.preview} /> : <div></div>
	}
	render(){
		return (
			<div>
			<Grid>
				<Row>
					<Dropzone className="image-dropzone" ref="dropzone" onDrop={this.onDrop} multiple={false} accept="image/*">
						<div>Try dropping some files here, or click to select files to upload.</div>
					</Dropzone>
					{this.renderImage()}
				</Row>
			</Grid>

				
			</div>
		)
	}
}

ImageUpload.propTypes = {
	onDrop: React.PropTypes.func
}

export default ImageUpload