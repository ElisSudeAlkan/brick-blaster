# Brick Blaster

A minimal browser arcade game built with **HTML5 Canvas** and **vanilla JavaScript**.

Brick Blaster is a simple Breakout-style game where the player controls a paddle to bounce a ball and destroy bricks. The project is intentionally lightweight and has **no external dependencies**, making it easy to run completely offline.

## Features

* Classic brick-breaking gameplay
* Paddle movement with keyboard controls
* Ball physics and brick collision
* Score and lives tracking
* Pause and resume functionality
* Runs entirely in the browser with no external libraries

## Controls

| Key   | Action                 |
| ----- | ---------------------- |
| ← →   | Move paddle            |
| Space | Start / Serve the ball |
| P     | Pause / Resume         |

## How to Run

### Option 1 — Open directly

Simply open the `index.html` file in your browser.

### Option 2 — Run a local server

If you prefer running the game through a local server:

```bash
python -m http.server 8000
```

Then open:

```
http://localhost:8000
```

## Project Structure

```
brick-blaster
│
├── index.html        # Main game page
├── style.css         # Basic styling
├── game.js           # Game logic and rendering
├── tests
│   └── scoring.test.js
└── README.md
```

## Testing

This project includes simple logic tests using Node's built-in `assert` module.

Run tests with:

```bash
node tests/scoring.test.js
```

## Technical Notes

* The game uses the **HTML5 Canvas API** for rendering.
* All logic runs locally in the browser.
* No network calls or external APIs are required.

## License

This project is provided for educational and demonstration purposes.
