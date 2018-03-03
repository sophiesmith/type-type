import React, { Component } from 'react';
import './NavBar.css';

export class NavBar extends Component {
	render() {
		return (
			
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/">Profile</a></li>
					<li><a href="/">About</a></li>
				</ul>
			
		);
	}
}