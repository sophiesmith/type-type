import React, { Component } from 'react';
import './Game.css';
import  {Howl, Howler, playing} from 'howler';
import NavBar from './NavBar';
import {analyze, guess} from 'web-audio-beat-detector';
import Pulse from 'pulsejs';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			words: [
				{word: 'these', status: 'active', activeLetterIndex: 0}, 
				{word: 'are', status: 'waiting', activeLetterIndex: 0},
				{word: 'words', status: 'waiting', activeLetterIndex: 0},
				{word: 'battery', status: 'waiting', activeLetterIndex: 0},
				{word: 'villanova', status: 'waiting', activeLetterIndex: 0},
				{word: 'confidential', status: 'waitingHidden', activeLetterIndex: 0},
				{word: 'susurration', status: 'waitingHidden', activeLetterIndex: 0},
				{word: 'scrimshank', status: 'waitingHidden', activeLetterIndex: 0},
				{word: 'intercollegiate', status: 'waitingHidden', activeLetterIndex: 0},
				{word: 'ethereal', status: 'waitingHidden', activeLetterIndex: 0},
				{word: 'treacherous', status: 'waitingHidden', activeLetterIndex: 0},
				{word: 'isinglass', status: 'waitingHidden', activeLetterIndex: 0},
				{word: 'philately', status: 'waitingHidden', activeLetterIndex: 0},
				{word: 'abomination', status: 'waitingHidden', activeLetterIndex: 0},
				{word: 'serendipity', status: 'waitingHidden', activeLetterIndex: 0},
				{word: 'algorithm', status: 'waitingHidden', activeLetterIndex: 0},
				],
			song: require(`../music/${props.song}.mp3`),
			wordIndex: 0, //the current word
			lastWordIndex: 4, //the last word that is currently displayed
			gameProgress: 'pending',
			songID: 0,
			music: {},
			numErrors: 0,
			numKeyPresses: 0
		}
	}

	componentWillMount() {
		const music = new Howl({
  			src: [this.state.song],
		});
		const songID = music.play();

		/*
		const pulse = new Pulse({
  
    	// when Pulse has finished to compute main data: beat, significant peaks...
		    onComplete: function(event, pulse) {
		        const extrapolatedPeaks = pulse.getExtrapolatedPeaks(
		            pulse.renderedBuffer,
		            pulse.significantPeaks,
		            pulse.beat
		        );

		        // beat (ms and bpm properties)
		        console.log(pulse.beat);

		        // extrapolated peaks
		        console.log(extrapolatedPeaks);
	    	}
		});

		pulse.loadBufferFromURI(this.state.song);*/

		/*
		const buffer = Howler.ctx.createBuffer(1, 22050, 44100);
		guess(buffer)
	    .then(({ bpm, offset }) => {
	        // the bpm and offset could be guessed
	        console.log("here's bpm")
	        console.log(bpm);
	    })
	    .catch((err) => {
	        // something went wrong
	        console.log("error!")
	    });*/

		window.addEventListener("keypress", this.handleKeyPress);
		window.setInterval(this.updateWords, 1000);

		this.setState({music: music, songID: songID});
	}

	componentWillUnmount() {
		Howler.unload();
	}

	endGame = () => {
		this.setState({gameProgress: 'win'});
	}

	updateWords = () => {
		//maybe can move words up in this function?
		if (!(this.state.music.playing(this.state.songID))) {
			return;
		}
		let words = this.state.words;
		let last = this.state.lastWordIndex;
		if (last < words.length-1) {
			last++;
		}
		words[last].status = 'waiting';
		if (this.state.wordIndex === last) {
			words[last].status = 'active';
		}
		this.setState({words: words, lastWordIndex: last});
	}

	setNextWord = () => {
		const {words, wordIndex} = this.state
		this.setState({
			wordIndex: wordIndex + 1,
			words: words.map((word, i) => {
				if (i === wordIndex) {
					return {...word, status: 'done'}
				}
				if (i === wordIndex + 1) {
					return {...word, status: 'active'}
				}
				return word
			})
		})
	}

	incrementLetterIndex = () => {
		const {words, wordIndex, numKeyPresses} = this.state
		this.setState({
			words: words.map((word, i) => (
				i === wordIndex
					? {...word, status: 'active', activeLetterIndex: word.activeLetterIndex + 1}
					: word
				)
			),
			numKeyPresses: numKeyPresses + 1
		})
	}

	setWrong = () => {
		const {words, wordIndex, numErrors, numKeyPresses} = this.state
		this.setState({
			words: words.map((word, i) => (
				i === wordIndex
					? {...word, status: 'activeWrong'}
					: word
				)
			), 
			numErrors: numErrors + 1,
			numKeyPresses: numKeyPresses + 1
		})
	}

	handleKeyPress = (e) => {
		let {words, wordIndex, gameProgress} = this.state
		console.log(words[wordIndex])
		let curr = words[wordIndex].word;
		let letterIndex = words[wordIndex].activeLetterIndex;
		if (gameProgress === 'pending') {
			if (e.key === curr[letterIndex]) {
				console.log("yeet")
				if (letterIndex === curr.length-1) {
					console.log("next word");
					if (wordIndex === words.length-1) {
						return this.endGame();
					}
					this.setNextWord()
				} else {
					this.incrementLetterIndex()
				}
			} else {
				console.log("no")
				this.setWrong()
			}
		}
	}

	render() {

		const {words, numErrors, numKeyPresses} = this.state

		return (
			<div>
				<NavBar/>
				<div className="outer3">
				{this.state.gameProgress !== 'win' && (<h1 id="instructions">type the words as they appear on screen!
					</h1>)}
				
				<div className={this.state.gameProgress}>
					<p>You won!!!! nice</p>
					<p>Your accuracy is {(1 - numErrors/numKeyPresses).toFixed(2) * 100}%</p>
				
				</div>
				{this.state.gameProgress !== 'win' && (
					<ul id="game">
						{words.map((word, i) => (
							<div className="word"><li className={word.status} key={i}>{
								word.word.split('').map((letter, i) => (
									i === word.activeLetterIndex && (word.status === 'active' || word.status === 'activeWrong')
										? <span className='activeLetter'>{letter}</span>
										: <span>{letter}</span>
								))
							}</li><br/>
							</div>
						))}
					</ul>)
				}
				</div>

			</div>
		);
	}

}

export default Game