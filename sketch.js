// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var particles = [];
var boundaries = [];

var ground;

var mConstraint;

function setup() {
  var canvas = createCanvas(800, 800);
  engine = Engine.create();
  engine.world.gravity.y = 1;
  world = engine.world;
  // Engine.run(engine);

  // var prev = null;
  // for (var x = 200; x < 400; x += 20) {
  //   var fixed = false;
  //   if (!prev) {
  //     fixed = true;
  //   }
  //   var p = new Particle(x, 100, 10, fixed);
  //   // var p2 = new Particle(200, 150, 10);
  //   particles.push(p);

  //   if (prev) {
  //     var options = {
  //       bodyA: p.body,
  //       bodyB: prev.body,
  //       length: 20,
  //       stiffness: 0.4
  //     };
  //     var constraint = Constraint.create(options);
  //     World.add(world, constraint);
  //   }

  //   prev = p;
  // }

  boundaries.push(new Boundary(400, height, width*2, 50, 0));
  boundaries.push(new Particle(200, 500, 100, true));
  boundaries.push(new Particle(600, 200, 150, true));
  boundaries.push(new Particle(100, 170, 50, true));
  boundaries.push(new Particle(500, 600, 75, true));


  var canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  var options = {
    mouse: canvasmouse
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
  console.log(mConstraint);
}

function draw() {
  background(200);
  Engine.update(engine);

  if (random(0, 1)> 0.97) {
    let circle = new Particle(random(1, width), -10, random(5, 30), false);
    particles.push(circle);
  }
  
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
    // Runs particles show for big circles in loop
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].show(255, 0, 0);
    if (particles[i].fade <= 0 || particles[i].isOffScreen()) {
      particles[i].removeFromWorld();
      particles.splice(i, 1);
      i--;
    }
  }

  // if (mConstraint.body) {
  //   var pos = mConstraint.body.position;
  //   var offset = mConstraint.constraint.pointB;
  //   var m = mConstraint.mouse.position;
  //   stroke(0, 255, 0);
  //   line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
  // }
}
