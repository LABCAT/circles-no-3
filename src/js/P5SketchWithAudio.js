import React, { useRef, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import { Midi } from '@tonejs/midi'

import audio from "../audio/circles-no-3.ogg";
import midi from "../audio/circles-no-3.mid";
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

        p.rotatingCircleSize = 30;

        p.numOfRotatingCircles = 16;

        p.loadMidi = () => {
            Midi.fromUrl(midi).then(
                function(result) {
                    const noteSet1 = result.tracks[5].notes; // Synth 1
                    p.scheduleCueSet(noteSet1, 'executeCueSet1');
                    p.audioLoaded = true;
                }
            );
            
        }

        p.preload = () => {
            p.song = p.loadSound(audio, p.loadMidi);
        }

        p.scheduleCueSet = (noteSet, callbackName)  => {
            let lastTicks = -1;
            for (let i = 0; i < noteSet.length; i++) {
                const note = noteSet[i],
                    { ticks, time } = note;
                if(ticks !== lastTicks){
                    note.currentCue = i + 1;
                    p.song.addCue(time, p[callbackName], note);
                    lastTicks = ticks;
                }
            }
        } 

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.prepareRotatingCircles(p.rotatingCircleSize);
        }

        p.draw = () => {
            if(p.audioLoaded && p.song.isPlaying()){
                p.background(255);
                for(let i=0; i < p.rotatingCircles.length; i++){
                    const circle = p.rotatingCircles[i];
                    circle.update();
                    circle.draw();
                }
            }
        }

        p.executeCueSet1 = (note) => {
        }

        p.prepareRotatingCircles = () => {
            p.rotatingCircles = [];
            const rad = p.min(p.width, p.height) * 0.3;
            for(let i=0; i < p.numOfRotatingCircles; i++){
                const ang = p.TWO_PI / p.numOfRotatingCircles * (i  + 0.5) + p.PI,
                    circle = new RotatingCircle(p, ang, rad, p.numOfRotatingCircles, p.rotatingCircleSize);
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
