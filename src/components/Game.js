import React, { Component } from 'react';
import './Game.css'
import  {Howl, Howler, playing} from 'howler';
import {NavBar} from './NavBar';

class Game extends Component {
	constructor(props) {
		super(props);
		console.log("here's the props")
		console.log(props, props.song);
		this.state = {
			words: [
				{word: 'these', active: 'active'}, 
				{word: 'are', active: 'waiting'},
				{word: 'words', active: 'waiting'},
				{word: 'battery', active: 'waiting'},
				{word: 'villanova', active: 'waiting'},
				{word: 'confidential', active: 'waitingHidden'},
				{word: 'susurration', active: 'waitingHidden'},
				{word: 'scrimshank', active: 'waitingHidden'},
				{word: 'intercollegiate', active: 'waitingHidden'},
				{word: 'ethereal', active: 'waitingHidden'},
				{word: 'treacherous', active: 'waitingHidden'},],
			song: require(`../music/${props.song}.mp3`),
			activeWordIndex: 0,
			activeLetterIndex: 0,
			lastWordIndex: 4,
			gameProgress: 'pending',
			songID: 0,
			music: {}
		}
		window.addEventListener("keypress", this.handleKeyPress);
		window.setInterval(this.updateWords, 1000);
	}

	componentWillMount() {
		let music = new Howl({
  			src: [this.state.song],
		});
		const songID = music.play();

		this.setState({music: music, songID: songID});
	}

	componentWillUnmount() {
		Howler.unload();
	}

	endGame = () => {
		const instr = document.getElementById('instructions');
		const game = document.getElementById('game');
		instr.style.display = "none";
		game.style.display = "none";
		this.setState({gameProgress: 'win'});
	}

	updateWords = () => {
		if (!(this.state.music.playing(this.state.songID))) {
			return;
		}
		let words = this.state.words;
		let last = this.state.lastWordIndex;
		console.log(last);
		if (last < words.length-1) {
			last++;
		}
		words[last].active = 'waiting';
		if (this.state.activeWordIndex === last) {
			words[last].active = 'active';
		}
		this.setState({words: words, lastWordIndex: last});
	}

	handleKeyPress = (e) => {
		let words = this.state.words;
		let wordIndex = this.state.activeWordIndex;
		let letterIndex = this.state.activeLetterIndex;
		let curr = words[wordIndex].word;

		if (e.key === curr[letterIndex]) {
			console.log("yeet");
			letterIndex++;
			words[wordIndex].active = 'active';
			if (letterIndex === curr.length) {
				console.log("next word");
				words[wordIndex].active = 'done';
				wordIndex++;
				if (wordIndex === words.length) {
					wordIndex--;
					this.endGame();
				}
				let newLI = 0;
				words[wordIndex].active = 'active';

				this.setState({words: words, activeWordIndex: wordIndex, activeLetterIndex: newLI});
			} else {
				this.setState({words: words, activeLetterIndex: letterIndex});
			}
		} else {
			words[wordIndex].active = 'activeWrong';
			this.setState({words: words});
		}
	}

	render() {

		let words = this.state.words;

		return (
			<div>
				<NavBar/>
				<div className="outer3">
				<h1 id="instructions">type the words as they appear on screen!</h1>
				
				<div className={this.state.gameProgress}>
					<p>You won!!!! nice</p>
				</div>

				<ul id="game">
					{words.map((word, i) => (
						<li className={word.active} key={i}>{word.word}</li>
					))}
				</ul>
				</div>

			</div>
		);
	}

}

export default Game