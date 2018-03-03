import createAction from '@f/create-action'

const setNewRoute = createAction('<locationReducer/>: SET_NEW_ROUTE')

export default function (state = '/', action) {
	if (action.type === setNewRoute.type) {
		return action.payload
	}
	return state
}

export {
	setNewRoute
}