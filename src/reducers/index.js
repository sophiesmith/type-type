import {combineReducers} from 'redux'
import locationReducer from './location'
import {firebaseStateReducer} from 'react-redux-firebase'

export const initialState = {
}

function main (state = initialState, action) {
	return state
}

export default combineReducers({
	main,
	location: locationReducer,
	firebase: firebaseStateReducer
})