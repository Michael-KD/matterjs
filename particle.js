function Particle(x, y, r, fixed) {
  var options = {
    friction: 0,
    restitution: 0.80,
    isStatic: fixed
  };
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  this.fade = 350;
  World.add(world, this.body);

  this.isOffScreen = function() {
    var pos = this.body.position;
    return pos.y > height + 100;
  };

  this.removeFromWorld = function() {
    World.remove(world, this.body);
  };

  this.scale = function(factorX, factorY) {
    Matter.Body.scale(this.body, factorX, factorY);
  };

  this.test = function() {
    // console.log(this.body.position.x, this.body.position.y);
  }

  this.show = function(r, g, b) {
    var defaultRGB = color(255, 255, 255, 255);
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    noStroke();
    this.fade = this.fade - 0.75;
    let c = color(r, g, b, this.fade)
    if (!r) {c = defaultRGB}
    fill(c||0);
    ellipse(0, 0, this.r * 2);
    line(0, 0, this.r, 0);
    pop();
  };

}
