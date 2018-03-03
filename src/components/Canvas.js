import React, { Component } from 'react';

export class Canvas extends Component {

	componentDidMount() {
        this.updateCanvas();
    }
    
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(0,0, 100, 100);
    }

	render() {
		return (
			<canvas ref="canvas" width={300} height={300}/>
		);
	}
/*
	componentWillMount() {
		//dumping stuff here
		let analyser = this.state.analyser;
		let bufferLength = this.state.bufferLength;
		let dataArray = this.state.dataArray;
		let canvas = this.state.canvas;
		let canvasCtx = this.state.canvasCtx;
		// Create an analyser node in the Howler WebAudio context
		analyser = Howler.ctx.createAnalyser();

		// Connect the masterGain -> analyser (disconnecting masterGain -> destination)
		Howler.masterGain.connect(analyser);

		// Connect the analyser -> destination
		analyser.connect(Howler.ctx.destination);

		analyser.fftSize = 256;
		bufferLength = analyser.frequencyBinCount;
		dataArray = new Uint8Array(bufferLength);
		analyser.getByteTimeDomainData(dataArray);

		canvas = document.getElementById("canvas");
		canvasCtx = canvas.getContext("2d");
		canvasCtx.clearRect(0, 0, this.state.WIDTH, this.state.HEIGHT);
		this.setState({analyser: analyser, bufferLength: bufferLength, dataArray: dataArray,
			canvas: canvas, canvasCtx: canvasCtx});
	}

	function draw() {
      let drawVisual = requestAnimationFrame(draw);

      this.state.analyser.getByteFrequencyData(this.state.dataArray);

      this.state.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      this.state.canvasCtx.fillRect(0, 0, this.state.WIDTH, this.state.HEIGHT);
      let barWidth = (this.state.WIDTH / this.state.bufferLength) * 2.5;
      let barHeight = 0;
      let x = 0;

      for(let i = 0; i < this.state.bufferLength; i++) {
        barHeight = this.state.dataArray[i]/2;

        this.state.canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        this.state.canvasCtx.fillRect(x,this.state.HEIGHT-barHeight/2,barWidth,barHeight);

        x += barWidth + 1;
      }
    };
	*/


}