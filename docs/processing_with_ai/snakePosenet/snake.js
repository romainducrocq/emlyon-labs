

function Snake(){
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.lastdir = "RIGHT";

  this.getTotal = function(){
    return this.total;
  }

  this.resetGame = function(){
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    this.lastdir = "RIGHT";
  }

  this.canTurn = function(dir) {
    if(this.total === 0)
      return true;

      switch(dir) {
        case "UP":
          return (this.lastdir !== "DOWN" ? true : false);
        case "DOWN":
          return (this.lastdir !== "UP" ? true : false);
        case "LEFT":
          return (this.lastdir !== "RIGHT" ? true : false);
        case "RIGHT":
          return (this.lastdir !== "LEFT" ? true : false);
        default:
          return false;
      }
  }

  this.setLastDir = function (lastdir) {
    this.lastdir = lastdir;
  }

  this.dir = function(x, y){
    this.xspeed = x;
    this.yspeed = y;
  }

  this.eat = function(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1){
      this.total++;
      return true;
    }else{
      return false;
    }
  }

  this.death = function() {
    for(let i = 0; i < this.tail.length; i++){
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1){
        this.total = 0;
        this.tail = [];
        return true;
      }
    }
    return false;
  }

  this.update = function() {

    let death = this.death();

    if(this.total === this.tail.length){
      for(let i = 0; i < this.tail.length-1; i++){
        this.tail[i] = this.tail[i+1];
      }
    }

    this.tail[this.total-1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;

      if(this.x === xmax || this.y === ymax || this.x === -scl || this.y === -scl){
        this.resetGame();
        death = true;
      }

    return death;
  }

  this.show = function() {
    fill(lastcol);
    for(let i = 0; i < this.tail.length; i++){
      rect(xvideo + this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(xvideo + this.x, this.y, scl, scl);
  }
}
