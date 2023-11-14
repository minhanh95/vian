const { Engine, Render, World, Bodies, Mouse, MouseConstraint } = Matter;

// Create an engine
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

// Create ground
const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 10, window.innerWidth, 20, { isStatic: true });
World.add(engine.world, ground);

// Create balls with random positions and speeds
const balls = [];
for (let i = 0; i < 20; i++) {
  const ball = Bodies.circle(
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight,
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
