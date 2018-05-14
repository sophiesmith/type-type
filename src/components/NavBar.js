import React, { Component } from 'react';
import './NavBar.css';
import {setUrl} from 'redux-effects-location';
import {connect} from 'react-redux';

class NavBar extends Component {
	render() {
		return (
			
				<ul>
					<li className="link" onClick={() => this.props.setUrl('/')}>Home</li>
					<li className="link" onClick={() => this.props.setUrl('/u/username')}>Profile</li>
					<li className="link" onClick={() => this.props.setUrl('/')}>About</li>
				</ul>
			
		);
	}
}

export default connect(() => {}, {setUrl})(NavBar);