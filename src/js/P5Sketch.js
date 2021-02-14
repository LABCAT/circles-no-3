import React, { useRef, useEffect } from "react";
import DrumHit from './DrumHit.js';
import './globals';
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import audio from '../audio/circles-no-3.ogg'
import cueSet1 from './cueSet1.js'

const P5Sketch = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.song = null;

        p.tempo = 108;

        p.barAsSeconds = Math.floor(((60 / p.tempo) * 4) * 100000) / 100000;

        p.drumHits = [];

        p.circles = [];

        p.cueSet1Completed = [];

        p.preload = () => {
            p.song = p.loadSound(audio);
        }

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.background(0);
            // p.circles[0] = {
            //     'x': p.random(p.width),
            //     'y': p.random(p.height),
            //     'shapeSize': p.width / p.random(10, 50),
            //     'r': p.random(255),
            //     'g': p.random(255),
            //     'b': p.random(255),
            // }
            // p.circles[1] = {
            //     'x': p.random(p.width),
            //     'y': p.random(p.height),
            //     'shapeSize': p.width / p.random(10, 50),
            //     'r': p.random(255),
            //     'g': p.random(255),
            //     'b': p.random(255),
            // }
            // p.circles[2] = {
            //     'x': p.random(p.width),
            //     'y': p.random(p.height),
            //     'shapeSize': p.width / p.random(10, 50),
            //     'r': p.random(255),
            //     'g': p.random(255),
            //     'b': p.random(255),
            // }
            //p.song.onended(p.logCredits);

            for(let i = 0; i < cueSet1.length; i++){
                let vars = {
                    'currentCue': (i + 1), 
                    'time': cueSet1[i].time, 
                    'midi': cueSet1[i].midi, 
                }
                p.song.addCue(cueSet1[i].time, p.executeCueSet1, vars);
            }

        };
        
        p.draw = () => {
            if (p.song.isPlaying()) {
                console.log(p.drumHits.length);
                for (var i = 0; i < p.drumHits.length; i++) {
                    p.drumHits[i].update();
                    p.drumHits[i].draw();

                    // if (p.drumHits[i].size < 1) {
                    //     p.drumHits.splice(i, 1);
                    // }
                }
            }
            
        };
        p.executeCueSet1 = (vars) => {
            if (!p.cueSet1Completed.includes(vars.currentCue)){
                p.cueSet1Completed.push(vars.currentCue);
                let xPos = Math.floor(vars.time * 100000) / 100000;
                if(parseFloat(xPos) >= parseFloat(p.barAsSeconds)){
                    while(xPos >= p.barAsSeconds){
                        xPos = xPos - p.barAsSeconds;
                    }

                    xPos = xPos > 0 ? xPos : 0;
                }

                let x = (p.width/32) + (p.width / p.barAsSeconds * xPos);
                let y = 0;
                let fill = 255;

                switch(vars.midi) {
                    case 36:
                        y = (p.height / 6) * 1;
                        fill = 255;
                        break;
                    case 37:
                        y = (p.height / 6) * 3;
                        fill = 191;
                        break;
                    case 44:
                        y = (p.height / 6) * 5;
                        fill = 127;
                        break;
                } 

                p.drumHits.push(new DrumHit(p, x, y, p.width / 16, fill));     
                
            }
        }

        p.drawCircleGroup = (circleGroup) => {
            let i = p.random(0.5, 0.99);
            let limit = p.random(5);
            let x = circleGroup.x;
            let y = circleGroup.y;
            let shapeSize = circleGroup.shapeSize;
            
            p.stroke(circleGroup.r, circleGroup.g, circleGroup.b);
            p.fill(circleGroup.b, circleGroup.g, circleGroup.r, 63);
            
            for(var j = 0; j <= limit; j++){
                p.ellipse(x, y, shapeSize * i);
                i = i * 2;
            }
        }

         p.mousePressed = () => {
            if (p.song.isPlaying()) {
                p.song.pause();
            } else {
                if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)){
                    p.reset();
                }
                //document.getElementById("play-icon").classList.add("fade-out");
                p.canvas.addClass('fade-in');
                p.song.play();
            }
        }

        p.creditsLogged = false;

        p.logCredits = () => {
            if (!p.creditsLogged && parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                p.creditsLogged = true;
                console.log(
                    'Music: http://labcat.nz/',
                    '\n',
                    'Animation: https://github.com/LABCAT/circles-no-3',
                );
            }
            
        }

        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.redraw();
        }

        if (window.attachEvent) {
            window.attachEvent(
                'onresize',
                function () {
                    p.updateCanvasDimensions();
                }
            );
        }
        else if (window.addEventListener) {
            window.addEventListener(
                'resize',
                function () {
                    p.updateCanvasDimensions();
                },
                true
            );
        }
        else {
            //The browser does not support Javascript event binding
        }
    };

    useEffect(() => {
        new p5(Sketch, sketchRef.current);
    }, []);

    return (
        <div ref={sketchRef}>
        </div>
    );
};

export default P5Sketch;
