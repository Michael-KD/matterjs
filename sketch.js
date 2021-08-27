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

let spawnRate = 1.66;

let ball1;
let ball2;
let ball3;
let ball4;
let ball5;
let ball6;
let ball7;
let sling1;
let sling4;

let animate;

function setup() {
  

  // document.body.style.zoom = "50%";

  var canvas = createCanvas(1920, 937);
  
  console.log(windowWidth, windowHeight);
  engine = Engine.create();
  engine.world.gravity.y = 1;
  world = engine.world;

  animate = lottie.loadAnimation({
    container: document.querySelector('.anim'), // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'js.json' // the path to the animation json
  });
  animate.setSpeed(0.4);
  
  var visited = localStorage.getItem('visited');
  if (!visited) {
    alert("Use control+ or control- to resize the page");
    localStorage.setItem('visited', true);
  }
    
  // engine.world.gravity.x = 1;

  // document.body.addEventListener("wheel", function(e) {
  //   // console.log('wheel', e);
  //   engine.world.gravity.x = 1;
  // });


  function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


  document.querySelector('.rate').addEventListener('input', updateValue);
  function updateValue(e) {
    spawnRate = scale(e.target.value, 0, 9, -0.0000001, 15);
    console.log(spawnRate);
  }

  // var scrollableElement = document.body; //document.getElementById('scrollableElement');

  // scrollableElement.addEventListener('wheel', checkScrollDirection);
  
  // function checkScrollDirection(event) {
  //   if (checkScrollDirectionIsUp(event)) {
  //     console.log('UP');
  //     engine.world.gravity.x = -1;
  //   } else {
  //     console.log('Down');
  //     engine.world.gravity.x = 1;
  //   }
  // }
  
  // function checkScrollDirectionIsUp(event) {
  //   if (event.wheelDelta) {
  //     return event.wheelDelta > 0;
  //   }
  //   return event.deltaY < 0;
  // }

  // document.body.addEventListener("auxclick", function(e) {
  //   engine.world.gravity.x = 0;
  // });

  
  boundaries.push(new Boundary(400, height+25, width*2, 50, 0));
  
  
  
  ball2 = new Obstacle(1960, 400, 300, true)
  boundaries.push(ball2);
  ball3 = new Obstacle(1100, 350, 420, true)
  boundaries.push(ball3);
  ball4 = new Obstacle(1600, 180, 30, false)
  boundaries.push(ball4);
  ball5 = new Obstacle(1500, 900, 100, true)
  boundaries.push(ball5);
  ball6 = new Obstacle(250, 600, 200, true)
  boundaries.push(ball6);

  ball1 = new Obstacle(600, 750, 50, false);
  boundaries.push(ball1);

  
  sling1 = Constraint.create({ 
    pointA: { x: ball1.body.position.x, y: ball1.body.position.y }, 
    bodyB: ball1.body, 
    length: 0,
    stiffness: 0.15,
    damping: 1
  });

  sling4 = Constraint.create({ 
    pointA: { x: ball4.body.position.x, y: ball4.body.position.y }, 
    bodyB: ball4.body, 
    length: 0,
    stiffness: 0.15,
    damping: 1
  });

  World.add(world, sling1);
  World.add(world, sling4);

console.log(sling1);



  var canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  var options = {
    mouse: canvasmouse
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function draw() {
  spawnRate = spawnRate || 1.5;
  let minSize = 7;
  let maxSize = 37;

  
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
    let circle = new Particle(random(1, width), - 30, random(minSize, maxSize), false);
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

  // line(sling1.bodyB.position.x, sling1.bodyB.position.y, sling1.pointA.x, sling1.pointA.y);
  // line(sling4.bodyB.position.x, sling4.bodyB.position.y, sling4.pointA.x, sling4.pointA.y);


}

function windowResized() {
  location.reload();
}
