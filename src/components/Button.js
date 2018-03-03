import React, { Component } from 'react';

export class Button extends Component {
	render() {
		return (
			<button className={this.props.type} id={this.props.id} onClick={this.props.handleClick}>
				{this.props.text}
			</button>

		);
	}

}