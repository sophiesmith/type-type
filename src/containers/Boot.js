import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindUrl} from 'redux-effects-location'
import {bindActionCreators} from 'redux'
import {setNewRoute} from '../reducers/location'
import Router from './Router'

class Boot extends Component {
	 componentWillMount () {
    	this.props.bindUrl(this.props.setNewRoute)
  	}
	render () {
		return <Router/>
	}
}

export default connect(
	() => {},
	{bindUrl, setNewRoute}
)(Boot)