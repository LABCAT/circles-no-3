(this["webpackJsonpreact-p5js-tonejs-starter-kit"]=this["webpackJsonpreact-p5js-tonejs-starter-kit"]||[]).push([[0],{17:function(t,i,e){},30:function(t,i,e){"use strict";e.r(i);var s=e(0),n=e.n(s),o=e(9),a=e.n(o),r=(e(17),e(2));window.p5=r;e(19);var h=e(10),c=e.p+"static/media/circles-no-3.24a5bbf5.ogg",p=e.p+"static/media/circles-no-3.ba7fefd4.mid";var u=function(t){for(var i,e,s=t.length;0!==s;)e=Math.floor(Math.random()*s),i=t[s-=1],t[s]=t[e],t[e]=i;return t},d=e(11),l=e(12),g=function(){function t(i,e,s,n,o,a){Object(d.a)(this,t),this.p=i,this.origpos=this.p.createVector(this.p.width/2,this.p.height/2,0),this.pos=this.origpos.copy(),this.gap=o,this.origang=e,this.ang=e,this.origrad=s,this.rad=s,this.radmult=1,this.size=2*this.rad*this.p.sin(this.p.TWO_PI/n/2)-this.gap,this.sep=n,this.time=0,this.rottime=8,this.movetime=4,this.gathertime=2,this.opacity=0,this.hue=a}return Object(l.a)(t,[{key:"resetTime",value:function(){this.time=0,this.opacity=0}},{key:"clockwise",value:function(){var t=this.p.map(this.p.min(this.time,this.rottime),0,this.rottime,0,1),i=(t=this.easeInExpo(t))*this.p.TWO_PI;this.ang=this.origang+i,this.rad=this.origrad,this.pos=window.p5.Vector.add(this.origpos,this.p.createVector(this.rad*this.p.cos(this.ang),this.rad*this.p.sin(this.ang),0)),this.time+=.001*this.p.deltaTime}},{key:"antiClockwise",value:function(){var t=this.p.map(this.p.min(this.time,this.rottime),0,this.rottime,0,1),i=(t=this.easeInExpo(t))*this.p.TWO_PI;this.ang=this.origang+i,this.rad=this.origrad,this.pos=window.p5.Vector.add(this.origpos,this.p.createVector(this.rad*this.p.cos(-this.ang),this.rad*this.p.sin(-this.ang),0)),this.time+=.001*this.p.deltaTime}},{key:"exit",value:function(){var t=this.p.map(this.time+3.5,this.rottime+this.movetime,this.rottime+this.movetime+this.gathertime,0,1);t=this.p.constrain(t,0,1),t=this.easeInOutCubic(t),this.rad=this.p.map(t,1,0,1.5*this.p.max(this.p.width,this.p.height),this.origrad),this.pos=window.p5.Vector.add(this.origpos,this.p.createVector(this.rad*this.p.cos(this.ang),this.rad*this.p.sin(this.ang),0)),this.time+=.001*this.p.deltaTime}},{key:"enter",value:function(){var t=this.p.map(this.time,this.rottime+this.movetime,this.rottime+this.movetime+this.gathertime,0,1);t=this.p.constrain(t,0,1),t=this.easeInOutCubic(t),this.rad=this.p.map(t,0,1,1.5*this.p.max(this.p.width,this.p.height),this.origrad),this.pos=window.p5.Vector.add(this.origpos,this.p.createVector(this.rad*this.p.cos(this.ang),this.rad*this.p.sin(this.ang),0)),this.time+=.001*this.p.deltaTime}},{key:"draw",value:function(){this.p.strokeWeight(2),this.p.fill(this.hue,100,100,this.opacity),this.p.stroke(this.hue,100,100,2*this.opacity),this.p.circle(this.pos.x,this.pos.y,this.size),this.p.circle(this.pos.x,this.pos.y,this.size/2),this.p.circle(this.pos.x,this.pos.y,this.size/4),this.opacity<.25&&(this.opacity=this.opacity+5e-4)}},{key:"easeOutCubic",value:function(t){return 1-this.p.pow(1-t,3)}},{key:"easeInExpo",value:function(t){return 0===t?0:this.p.pow(2,10*t-10)}},{key:"easeInOutCubic",value:function(t){return t<.5?4*t*t*t:1-this.p.pow(-2*t+2,3)/2}},{key:"easeInQuad",value:function(t){return t*t}},{key:"easeInOutQuint",value:function(t){return t<.5?16*t*t*t*t*t:1-this.p.pow(-2*t+2,5)/2}}]),t}(),m=e(1),v=function(){var t=Object(s.useRef)(),i=function(t){t.canvas=null,t.canvasWidth=window.innerWidth,t.canvasHeight=window.innerHeight,t.audioLoaded=!1,t.songHasFinished=!1,t.player=null,t.PPQ=15360,t.rotatingCircles=[],t.rotatingCircleSize=15,t.numOfRotatingCircles=18,t.parts=[],t.mass=[],t.positionX=[],t.positionY=[],t.velocityX=[],t.velocityY=[],t.loadMidi=function(){h.Midi.fromUrl(p).then((function(i){console.log(i);var e=i.tracks[5].notes,s=i.tracks[1].notes;t.scheduleCueSet(e,"executeCueSet1",!0),t.scheduleCueSet(s,"executeCueSet2"),t.audioLoaded=!0}))},t.preload=function(){t.song=t.loadSound(c,t.loadMidi),t.song.onended(t.logCredits)},t.scheduleCueSet=function(i,e){for(var s=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=-1,o=1,a=0;a<i.length;a++){var r=i[a],h=r.ticks,c=r.time;(h!==n||s)&&(r.currentCue=o,t.song.addCue(c,t[e],r),n=h,o++)}},t.setup=function(){t.canvas=t.createCanvas(t.canvasWidth,t.canvasHeight),t.colorMode(t.HSB),t.background(0),t.prepareRotatingCircles(t.rotatingCircleSize)},t.animationSequence=["clockwise","exit","enter","antiClockwise","exit","enter","clockwise","exit","enter","exit"],t.currentAnimationIndex=0,t.draw=function(){if(t.audioLoaded&&t.song.isPlaying()||t.songHasFinished){if(t.background(0),t.swarm)for(var i=0;i<t.mass.length;i++){for(var e=0,s=0,n=0;n<t.mass.length;n++)if(i!=n){var o=t.positionX[n]-t.positionX[i],a=t.positionY[n]-t.positionY[i],r=t.sqrt(o*o+a*a);r<1&&(r=1);var h=(r-320)*t.mass[n]/r;e+=h*o,s+=h*a}t.velocityX[i]=.99*t.velocityX[i]+e*t.mass[i],t.velocityY[i]=.99*t.velocityY[i]+s*t.mass[i]}for(var c=0;c<t.parts.length;c++){t.positionX[c]+=t.velocityX[c],t.positionY[c]+=t.velocityY[c];var p=t.parts[c],u=(p.size,p.hue1),d=p.hue2,l=p.hue3,g=p.hue4,m=p.strokeOpacity;t.strokeWeight(1),t.stroke(0,0,100,m),t.fill(u,100,100,.25),t.ellipse(t.positionX[c],t.positionY[c],2e3*t.parts[c].size,2e3*t.parts[c].size),t.stroke(0,0,100,m),t.fill(d,100,100,.25),t.ellipse(t.positionX[c],t.positionY[c],1e3*t.parts[c].size,1e3*t.parts[c].size),t.stroke(l,100,100,1),t.fill(l,100,100,.25),t.ellipse(t.positionX[c],t.positionY[c],500*t.parts[c].size,500*t.parts[c].size),t.stroke(l,100,100,0),t.fill(g,100,100,.25),t.ellipse(t.positionX[c],t.positionY[c],250*t.parts[c].size,250*t.parts[c].size)}for(var v=0;v<t.rotatingCircles.length;v++){var f=t.rotatingCircles[v];f[t.animationSequence[t.currentAnimationIndex]](),f.draw()}}},t.cueSet1DirectionDown=!1,t.executeCueSet1=function(i){var e=i.currentCue,s=i.ticks;if(s%122880===0&&(t.cueSet1DirectionDown=!t.cueSet1DirectionDown),!t.swarm||e>200){var n=i.midi,o=t.cueSet1DirectionDown?0:122880,a=t.cueSet1DirectionDown?122880:0,r=0,h=t.map(s%122880,o,a,0+t.height/20,t.height-t.height/20);switch(n){case 60:r=t.random(0+t.width/40,t.width/4*1);break;case 62:r=t.random(t.width/4*3,t.width-t.width/40)}t.addNewParticle(n,r,h)}},t.executeCueSet2=function(i){var e=i.currentCue;i.durationTicks>4e3?(t.swarm=!0,t.currentAnimationIndex++,t.parts.forEach((function(t){t.strokeOpacity=0}))):t.swarm=!1;if([3,45].includes(e)){t.currentAnimationIndex++;for(var s=0;s<t.rotatingCircles.length;s++){t.rotatingCircles[s].resetTime()}}},t.hueSet1=[30,60,90,120,150,180],t.hueSet2=[210,240,270,300,330,360],t.addNewParticle=function(i,e,s){var n=t.random(.003,.03),o=[];switch(i){case 60:o=u(t.hueSet2);break;case 62:o=u(t.hueSet1)}t.parts.push({size:n,hue1:o[0],hue2:o[1],hue3:o[2],hue4:o[3],strokeOpacity:1}),t.mass.push(n),t.positionX.push(e),t.positionY.push(s),t.velocityX.push(0),t.velocityY.push(0)},t.prepareRotatingCircles=function(){t.rotatingCircles=[];for(var i=.4*t.min(t.width,t.height),e=0;e<t.numOfRotatingCircles;e++){var s=t.TWO_PI/t.numOfRotatingCircles*(e+.5)+t.PI,n=e*(360/t.numOfRotatingCircles),o=new g(t,s,i,t.numOfRotatingCircles,t.rotatingCircleSize,n);t.rotatingCircles.push(o)}},t.logCredits=function(){t.songHasFinished=!0},t.mousePressed=function(){t.audioLoaded&&(t.song.isPlaying()?t.song.pause():(parseInt(t.song.currentTime()),parseInt(t.song.buffer.duration),t.canvas.addClass("fade-in"),t.song.play()))},t.updateCanvasDimensions=function(){t.canvasWidth=window.innerWidth,t.canvasHeight=window.innerHeight,t.createCanvas(t.canvasWidth,t.canvasHeight),t.redraw()},window.attachEvent?window.attachEvent("onresize",(function(){t.updateCanvasDimensions()})):window.addEventListener&&window.addEventListener("resize",(function(){t.updateCanvasDimensions()}),!0)};return Object(s.useEffect)((function(){new r(i,t.current)}),[]),Object(m.jsx)("div",{ref:t})};var f=function(){return Object(m.jsx)(v,{})};a.a.render(Object(m.jsx)(n.a.StrictMode,{children:Object(m.jsx)(f,{})}),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.16cf6834.chunk.js.map