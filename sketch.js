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

  
  var canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  engine.world.gravity.y = 1;
  world = engine.world;

  // engine.world.gravity.x = 1;

  // document.body.addEventListener("wheel", function(e) {
  //   // console.log('wheel', e);
  //   engine.world.gravity.x = 1;
  // });

  var scrollableElement = document.body; //document.getElementById('scrollableElement');

  scrollableElement.addEventListener('wheel', checkScrollDirection);
  
  function checkScrollDirection(event) {
    if (checkScrollDirectionIsUp(event)) {
      console.log('UP');
      engine.world.gravity.x = -1;
    } else {
      console.log('Down');
      engine.world.gravity.x = 1;
    }
  }
  
  function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
      return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
  }

  document.body.addEventListener("auxclick", function(e) {
    engine.world.gravity.x = 0;
  });


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

  boundaries.push(new Boundary(400, height+25, width*2, 50, 0));
  boundaries.push(new Obstacle(1960, 400, 300, true));
  boundaries.push(new Obstacle(1100, 350, 420, true));
  boundaries.push(new Obstacle(1600, 180, 30, true));
  boundaries.push(new Obstacle(1500, 900, 100, true));
  boundaries.push(new Obstacle(250, 600, 200, true));

  var canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  var options = {
    mouse: canvasmouse
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function draw() {
  let spawnRate = 15;
  let minSize = 7;
  let maxSize = 30;


  background(color('#f83d0c'));
  Engine.update(engine);

  // // Spawn Rate Slider
  // let rateSlider = document.getElementById('spawnRate');
  // spawnRate = rateSlider.value;

  // // Min Size Slider
  // let minSizeSlider = document.getElementById('minSize');
  // minSize = minSizeSlider.value;

  // // Max Size Slider
  // let maxSizeSlider = document.getElementById('maxSize');
  // maxSize = maxSizeSlider.value;

  


  if (random(0, 100)< spawnRate) {
    let circle = new Particle(random(1, width), -10, random(minSize, maxSize), false);
    particles.push(circle);
  }
  
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].show(19, 19, 19);
    // Runs particles show for big circles in loop
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].show(19, 19, 19);
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
