const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Events } = Matter;

// Set up Matter.js engine
const engine = Engine.create();

// Create a renderer
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false
  }
});

// Create boundaries for the box
const boxWidth = window.innerWidth;
const boxHeight = window.innerHeight;
const boundaryThickness = 50;

const boundaries = [
  // Top boundary
  Bodies.rectangle(boxWidth / 2, -boundaryThickness / 2, boxWidth + 2 * boundaryThickness, boundaryThickness, { isStatic: true }),
  // Bottom boundary
  Bodies.rectangle(boxWidth / 2, boxHeight + boundaryThickness / 2, boxWidth + 2 * boundaryThickness, boundaryThickness, { isStatic: true }),
  // Left boundary
  Bodies.rectangle(-boundaryThickness / 2, boxHeight / 2, boundaryThickness, boxHeight + 2 * boundaryThickness, { isStatic: true }),
  // Right boundary
  Bodies.rectangle(boxWidth + boundaryThickness / 2, boxHeight / 2, boundaryThickness, boxHeight + 2 * boundaryThickness, { isStatic: true })
];

// Add boundaries to the world
World.add(engine.world, boundaries);

// Create balls with random positions and speeds
const balls = [];
for (let i = 0; i < 20; i++) {
  const ball = Bodies.circle(
    Math.random() * (boxWidth - 2 * boundaryThickness) + boundaryThickness,
    Math.random() * (boxHeight - 2 * boundaryThickness) + boundaryThickness,
    30,
    {
      restitution: 0.9,
      friction: 0.01,
      velocity: {
        x: (Math.random() - 0.5) * 10, // Random horizontal speed
        y: Math.random() * 5 // Random vertical speed
      }
    }
  );
  balls.push(ball);
}

// Add balls to the world
World.add(engine.world, balls);

// Create a mouse
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});

// Add mouse interaction
World.add(engine.world, mouseConstraint);

// Keep the mouse in sync with rendering
render.mouse = mouse;

// Run the engine
Engine.run(engine);

// Run the renderer
Render.run(render);

// Listen for mousedown event
Events.on(mouseConstraint, 'mousedown', function (event) {
  const mousePosition = event.mouse.position;

  // Find the clicked ball
  const clickedBall = balls.find(ball => {
    return Matter.Bounds.contains(ball.bounds, mousePosition);
  });

  if (clickedBall) {
    // Apply an upward force to make the ball bounce
    const bounceForce = { x: 0, y: -1 };
    Matter.Body.applyForce(clickedBall, mousePosition, bounceForce);
  }
});
