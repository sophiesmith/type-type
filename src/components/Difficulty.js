import React, { Component } from 'react';
import './Difficulty.css'
import {Button} from './Button'
import {setUrl} from 'redux-effects-location'
import {connect} from 'react-redux'
import NavBar from './NavBar'

class Difficulty extends Component {
	render() {
		return (
			<div>
				<NavBar/>
				<div className="outer">
				<h1 className="header2">what's your speed?</h1>
				<div className="buttons">
					<Button type="option" text="novice" handleClick={() => this.props.setUrl('/songselect')}/>
					<Button type="option" text="apprentice" handleClick={() => this.props.setUrl('/songselect')}/>
					<Button type="option" text="master" handleClick={() => this.props.setUrl('/songselect')}/>
				</div>
				</div>
			</div>
		);
	}
}

export default connect(() => {}, {setUrl})(Difficulty);