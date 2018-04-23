import React, { Component } from 'react';
import './SongSelect.css'
import {Button} from './Button'
import {setUrl} from 'redux-effects-location'
import {connect} from 'react-redux'
import * as songs from '../music/index.js'
import  {Howl, Howler} from 'howler';
import {Canvas} from './Canvas';
import NavBar from './NavBar';

class SongSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '/play',
			songID: 0,
			music: {}
		};
	}

	componentWillUnmount() {
		if (this.state.songID !== 0) {
			this.state.music.stop(this.state.songID);
		}
	}


	createVisualization = () => {
        let analyser = Howler.ctx.createAnalyser();
        let canvas = document.getElementById("frequency");
        let canvasCtx = canvas.getContext('2d');
        // Connect the masterGain -> analyser (disconnecting masterGain -> destination)
		Howler.masterGain.connect(analyser);

		// Connect the analyser -> destination
		analyser.connect(Howler.ctx.destination);

        function renderFrame(){
            let freqData = new Uint8Array(analyser.frequencyBinCount);
            requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(freqData);
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            canvasCtx.fillStyle = '#F79824';
            let bars = 25;
            for (var i = 0; i < bars; i++) {
                let bar_x = i * 11;
                let bar_width = 10;
                let bar_height = -(freqData[i] / 2);
                canvasCtx.fillRect(bar_x, canvas.height, bar_width, bar_height);
            }
        };
        renderFrame();
    }

	render() {
		return ( 
			<div>
				<NavBar/>
				<div className="outer2">
				<h1 className="header2">pick your beat!</h1>
				<div className="songs">
					
						<Button type="song" text="Getting to Know You - Spazzkid" handleClick={this.playSong.bind(this, 'song1')}/>
						<Button type="song" text="DNA - BTS" handleClick={this.playSong.bind(this, 'song2')}/>
						<Button type="song" text="She's a Baby - Zico" handleClick={this.playSong.bind(this, 'song3')}/>
						<Button type="song" text="4 Walls - f(x)" handleClick={this.playSong.bind(this, 'song4')}/>
						<Button type="song" text="TT - Twice" handleClick={this.playSong.bind(this, 'song5')}/>
						<Button type="song" text="Dream in a Dream - Ten" handleClick={this.playSong.bind(this, 'song6')}/>
						<Button type="song" text="Heard a Song - Kero Kero Bonito" handleClick={this.playSong.bind(this, 'song7')}/>
						<Button type="song" text="Cinema - Kero Kero Bonito" handleClick={this.playSong.bind(this, 'song8')}/>
	
					
				</div>
				<div className="right">
					{/*<img className="animation" src="https://78.media.tumblr.com/969305db596de7e6c1f842cda9a30fa6/tumblr_oos7rxyEsw1wna8nxo1_500.gif"/>*/}
					<canvas id="frequency"></canvas>
					<Button type="navigate" text="← change difficulty" handleClick={() => this.props.setUrl('/difficulty')}/>
					<Button type="navigate" text="START →" handleClick={this.handleStart}/>
				</div>
				</div>
			</div>

		);
	}

	handleStart = () => {
		Howler.unload();
		this.props.setUrl(this.state.url);
	}

	
	playSong(name) {
		Howler.unload();
		let song = songs.songs[name];
		let music = new Howl({
  			src: [song],
		});
		let songID = music.play();
		let newUrl = '/play/' + name;
		this.setState({url: newUrl, songID: songID, music: music});
		this.createVisualization();
	}


}

export default connect(() => {}, {setUrl})(SongSelect);