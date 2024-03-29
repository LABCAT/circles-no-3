
export default class AnimatedCicle{
  constructor(p5, ang, rad, sep, gap, hue){
    this.p = p5;
    this.origpos = this.p.createVector(this.p.width / 2, this.p.height / 2,0);
    this.pos = this.origpos.copy();
    this.gap = gap;
    this.origang = ang;
    this.ang = ang ;
    this.origrad = rad;
    this.rad = rad;
    this.radmult = 1.0;
    this.size = 2 * this.rad * this.p.sin(this.p.TWO_PI / sep / 2) - this.gap;
    this.sep = sep;
    this.time = 0.0;
    this.rottime = 8.0;
    this.movetime = 4.0;
    this.gathertime = 2.0;
    this.opacity = 0;
    this.hue = hue;
  }

  resetTime() {
    this.time = 0;
    this.opacity = 0
  }

  clockwise(){
    let t = this.p.map(this.p.min(this.time, this.rottime), 0.0, this.rottime, 0.0, 1.0);
    t = this.easeInExpo(t);
    let rotang = t * this.p.TWO_PI;
    this.ang = this.origang + rotang;
    this.rad = this.origrad;
    //forward
    this.pos = window.p5.Vector.add(this.origpos, this.p.createVector(this.rad * this.p.cos(this.ang), this.rad * this.p.sin(this.ang), 0));
    this.time += this.p.deltaTime * 0.001;
  }

  antiClockwise(){
    let t = this.p.map(this.p.min(this.time, this.rottime), 0.0, this.rottime, 0.0, 1.0);
    t = this.easeInExpo(t);
    let rotang = t * this.p.TWO_PI;
    this.ang = this.origang + rotang;
    this.rad = this.origrad;
    //reverse
    this.pos = window.p5.Vector.add(this.origpos, this.p.createVector(this.rad * this.p.cos(-this.ang), this.rad * this.p.sin(-this.ang), 0));
    this.time += this.p.deltaTime * 0.001;
  }

  exit(){
    let t3 = this.p.map(this.time + 3.5, this.rottime + this.movetime, this.rottime + this.movetime + this.gathertime, 0.0, 1.0);
    t3 = this.p.constrain(t3, 0.0, 1.0);
    t3 = this.easeInOutCubic(t3);
    //leave
    this.rad = this.p.map(t3, 1.0, 0, this.p.max(this.p.width, this.p.height) * 1.5, this.origrad);
    this.pos = window.p5.Vector.add(this.origpos, this.p.createVector(this.rad * this.p.cos(this.ang), this.rad * this.p.sin(this.ang), 0));
    this.time += this.p.deltaTime * 0.001;
  }

  enter(){
    let t3 = this.p.map(this.time, this.rottime + this.movetime, this.rottime + this.movetime + this.gathertime, 0.0, 1.0);
    t3 = this.p.constrain(t3, 0.0, 1.0);
    t3 = this.easeInOutCubic(t3);
    //enter
    this.rad = this.p.map(t3, 0, 1.0, this.p.max(this.p.width, this.p.height) * 1.5, this.origrad);
    this.pos = window.p5.Vector.add(this.origpos, this.p.createVector(this.rad * this.p.cos(this.ang), this.rad * this.p.sin(this.ang), 0));
    this.time += this.p.deltaTime * 0.001;
  }

  draw(){
    this.p.strokeWeight(2);
    this.p.fill(this.hue, 100, 100, this.opacity);
    this.p.stroke(this.hue, 100, 100, this.opacity * 2);
    this.p.circle(this.pos.x, this.pos.y, this.size);
    this.p.circle(this.pos.x, this.pos.y, this.size / 2);
    this.p.circle(this.pos.x, this.pos.y, this.size / 4);

    if(this.opacity < 0.25){
      this.opacity = this.opacity + 0.0005;
    }
  }

  easeOutCubic(x) {
      return 1 - this.p.pow(1 - x, 3);
  }

  easeInExpo(x) {
      return x === 0 ? 0 : this.p.pow(2, 10 * x - 10);
  }

  easeInOutCubic(x) {
      return x < 0.5 ? 4 * x * x * x : 1 - this.p.pow(-2 * x + 2, 3) / 2;
  }

  easeInQuad(x) {
      return x * x;
  }

  easeInOutQuint(x) {
      return x < 0.5 ? 16 * x * x * x * x * x : 1 - this.p.pow(-2 * x + 2, 5) / 2;
  }
}


