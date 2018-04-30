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
					<img className="pic" src="https://www.solartis.com/wp-content/uploads/2017/02/user-icon-solartis-sandbox-orange-circle-300-300.png" alt="Profile Picture"></img>
					<h1 className="header">{this.props.user}'s Profile</h1>
					<p className="bio">biography goes here</p>
				</div>
				<div className="stats">
					<h2>Your Records</h2>
					<p>High Score: </p>
					<p>Average Score: </p>
					<p>Average Accuracy: </p>
					<p># of Games Completed: </p>
					<p>Favorite Beat: </p>

				</div>
			</div>
		);
	}
}

export default connect(() => {}, {setUrl})(Profile);