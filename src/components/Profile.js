import React, { Component } from 'react';
import './Difficulty.css'
import {Button} from './Button'
import {setUrl} from 'redux-effects-location'
import {connect} from 'react-redux'
import NavBar from './NavBar'
import './Profile.css'

class Profile extends Component {

	render() {
		return (
			<div className="wrap">
				<NavBar/>
				<div className="intro">
					<img className="pic" src="http://i.imgur.com/KhySDOL.jpg" alt="Profile Picture"></img>
					<h1 className="header">{this.props.user}'s Profile</h1>
					<p className="bio">biography goes here</p>
				</div>
				<div className="stats">
					<p>High Score: </p>

				</div>
			</div>
		);
	}
}

export default connect(() => {}, {setUrl})(Profile);