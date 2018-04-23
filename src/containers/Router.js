import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import enroute from 'enroute';
import App from '../components/App'
import Difficulty from '../components/Difficulty'
import SongSelect from '../components/SongSelect'
import Game from '../components/Game'
import Profile from '../components/Profile'
import  {Howl, Howler} from 'howler';


const router = enroute({
	'/': (params, props) => (
	    <App />
	      
  	),
  	'/difficulty': (params, props) => (
  		<Difficulty/>
  	),
  	'/songselect': (params, props) => (
  		<SongSelect/>
  	),
  	'/play/:song': (params, props) => (
  		<Game song={params.song}/>
  	),
  	'/u/:user': (params, props) => (
	      <Profile user={params.user}/>
  	),
})

class AppRouter extends Component {

 /*componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      if (prevProps.location === '/play') {
        this.onRouteChanged();
      }
    }
  }

  onRouteChanged() {
    console.log("unloading")
    Howler.unload();
  }*/

  render () {
    return router(this.props.location)
  }
}

export default connect(({location}) => ({location}))(AppRouter)

/*
function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {

}

export default compose(
	connect(mapStateToProps, mapDispatchToProps)
)()*/