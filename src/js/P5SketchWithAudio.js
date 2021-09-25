import React, { useRef, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import { Midi } from '@tonejs/midi'

import audio from "../audio/circles-no-3.ogg";
import midi from "../audio/circles-no-3.mid";
import ShuffleArray from "./functions/ShuffleArray.js";
import RotatingCircle from "./classes/RotatingCircle.js";

const P5SketchWithAudio = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.audioLoaded = false;

        p.player = null;

        p.PPQ = 3840 * 4;

        p.rotatingCircles = [];

        p.rotatingCircleSize = 15;

        p.numOfRotatingCircles = 18;

        p.parts = [];

        p.mass = [];
        
        p.positionX = [];
        
        p.positionY = [];
        
        p.velocityX = [];
        
        p.velocityY = [];

        p.loadMidi = () => {
            Midi.fromUrl(midi).then(
                function(result) {
                    console.log(result);
                    const noteSet1 = result.tracks[7].notes.filter(note => note.midi !== 43); // Redrum 1 
                    const noteSet2 = result.tracks[1].notes; // Smapler 2
                    //const noteSet1 = result.tracks[5].notes; // Synth 1
                    p.scheduleCueSet(noteSet1, 'executeCueSet1', true);
                    p.scheduleCueSet(noteSet2, 'executeCueSet2');
                    p.audioLoaded = true;
                }
            );
            
        }

        p.preload = () => {
            p.song = p.loadSound(audio, p.loadMidi);
        }

        p.scheduleCueSet = (noteSet, callbackName, polyMode = false)  => {
            let lastTicks = -1, 
                currentCue = 1;
            for (let i = 0; i < noteSet.length; i++) {
                const note = noteSet[i],
                    { ticks, time } = note;
                if(ticks !== lastTicks || polyMode){
                    note.currentCue = currentCue;
                    p.song.addCue(time, p[callbackName], note);
                    lastTicks = ticks;
                    currentCue++;
                }
            }
        } 

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.colorMode(p.HSB);
            p.background(0);
            p.prepareRotatingCircles(p.rotatingCircleSize);
        }

        p.animationSequence = [
            'clockwise',
            'exit',
            'enter',
            'antiClockwise',
            'exit',
            'enter',
            'clockwise',
            'exit',
            'enter',
            'exit',
        ];

        p.currentAnimationIndex = 0;

        p.draw = () => {
            if(p.audioLoaded && p.song.isPlaying()){
                p.background(0);

                if(p.swarm){
                    for (let pA = 0; pA < p.mass.length; pA++) {
                        let accelerationX = 0, accelerationY = 0;
                        
                        for (let pB = 0; pB < p.mass.length; pB++) {
                            if (pA != pB) {
                                let distanceX = p.positionX[pB] - p.positionX[pA];
                                let distanceY = p.positionY[pB] - p.positionY[pA];

                                let distance = p.sqrt(distanceX * distanceX + distanceY * distanceY);
                                if (distance < 1) distance = 1;

                                let force = (distance - 320) * p.mass[pB] / distance;
                                accelerationX += force * distanceX;
                                accelerationY += force * distanceY;
                            }
                        }
                        
                        p.velocityX[pA] = p.velocityX[pA] * 0.99 + accelerationX * p.mass[pA];
                        p.velocityY[pA] = p.velocityY[pA] * 0.99 + accelerationY * p.mass[pA];
                    }
                }
                
                for (let particle = 0; particle < p.parts.length; particle++) {
                    p.positionX[particle] += p.velocityX[particle];
                    p.positionY[particle] += p.velocityY[particle];
                    const { size, hue1, hue2, hue3, hue4, strokeOpacity } = p.parts[particle];
                    console.log(hue1);
                    p.stroke(0, 0, 100, strokeOpacity);
                    p.fill(hue1, 100, 100, 0.25);
                    p.ellipse(p.positionX[particle], p.positionY[particle], p.parts[particle].size * 2000, p.parts[particle].size * 2000);
                    p.stroke(0, 0, 100, strokeOpacity);
                    p.fill(hue2, 100, 100, 0.25);
                    p.ellipse(p.positionX[particle], p.positionY[particle], p.parts[particle].size * 1000, p.parts[particle].size * 1000);
                    p.stroke(hue3, 100, 100, 1);
                    p.fill(hue3, 100, 100, 0.25);
                    p.ellipse(p.positionX[particle], p.positionY[particle], p.parts[particle].size * 500, p.parts[particle].size * 500);
                    p.stroke(hue3, 100, 100, 0);
                    p.fill(hue4, 100, 100, 0.25);
                    p.ellipse(p.positionX[particle], p.positionY[particle], p.parts[particle].size * 250, p.parts[particle].size * 250);
                }

                for(let i=0; i < p.rotatingCircles.length; i++){
                    const circle = p.rotatingCircles[i];
                    circle[p.animationSequence[p.currentAnimationIndex]]();
                    circle.draw();
                }
            }
        }

        p.executeCueSet1 = (note) => {
            const { midi } = note;
            let posX = 0, 
                posY = p.random(0, p.height);
            switch (midi) {
                case 36:
                    posX = p.random(0, p.width / 4 * 1);
                    break;
                case 37:
                    posX = p.random(p.width / 4 * 3, p.width);
                    break;
                default:
                    break;
            }
            p.addNewParticle(midi, posX, posY);
        }


        p.executeCueSet2 = (note) => {
            const { currentCue, durationTicks } = note;
            if(durationTicks > 4000) {
                p.swarm = true;
                p.currentAnimationIndex++;
                p.parts.forEach(particle => {
                    particle.strokeOpacity = 0; 
                });
            }
            else {
                p.swarm = false;
            }

            const changeCues = [3, 45];
            if(changeCues.includes(currentCue)){
                p.currentAnimationIndex++;
                for(let i=0; i < p.rotatingCircles.length; i++){
                    const circle = p.rotatingCircles[i];
                    circle.resetTime();
                }
            }
        }

        p.hueSet1 = [30, 60, 90, 120, 150, 180];

        p.hueSet2 = [210, 240, 270, 300, 330, 360];

        p.addNewParticle = (midi, posX, posY) => {
            let size = p.random(0.003, 0.03);
            let hueSet = [];
            switch (midi) {
                case 36:
                    hueSet = ShuffleArray(p.hueSet2);
                    break;
                case 37:
                    hueSet = ShuffleArray(p.hueSet1);
                    break;
            }
            p.parts.push(
                {
                    size: size,
                    hue1: hueSet[0],
                    hue2: hueSet[1],
                    hue3: hueSet[2],
                    hue4: hueSet[3],
                    strokeOpacity: p.swarm ? 0 : 1
                } 
            );
            p.mass.push(size);
            p.positionX.push(posX);
            p.positionY.push(posY);
            p.velocityX.push(0);
            p.velocityY.push(0);
        }

        p.prepareRotatingCircles = () => {
            p.rotatingCircles = [];
            const rad = p.min(p.width, p.height) * 0.4;
            for(let i=0; i < p.numOfRotatingCircles; i++){
                const ang = p.TWO_PI / p.numOfRotatingCircles * (i  + 0.5) + p.PI,
                    hue = i * (360 / p.numOfRotatingCircles),
                    circle = new RotatingCircle(p, ang, rad, p.numOfRotatingCircles, p.rotatingCircleSize, hue);
                p.rotatingCircles.push(circle);
            }
        }

        p.mousePressed = () => {
            if(p.audioLoaded){
                if (p.song.isPlaying()) {
                    p.song.pause();
                } else {
                    if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                        p.reset();
                    }
                    //document.getElementById("play-icon").classList.add("fade-out");
                    p.canvas.addClass("fade-in");
                    p.song.play();
                }
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

export default P5SketchWithAudio;
