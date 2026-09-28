# Red Hat Runner

<p align="center"><img src="./assets/banner.svg" alt="Red Hat Runner banner" width="100%"></p>

<p align="center">A browser-based endless runner built with HTML, CSS and JavaScript.</p>

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

## Overview

Red Hat Runner is a lightweight arcade game built without a game engine. The project focuses on **browser game loops, sprite animation, collision detection, score systems, audio feedback and responsive controls**.

## Features

- Endless runner gameplay
- Animated running, jumping and death states
- Randomised obstacle spacing
- Collision detection
- Live score and persistent best score
- Keyboard controls
- Pointer/touch controls
- Restart flow
- Responsive game UI
- Audio feedback
- No framework required

## Controls

| Input | Action |
|---|---|
| Enter | Start the game |
| Space / Arrow Up | Jump |
| Touch / pointer | Start or jump |
| Try Again | Restart after game over |

## Project Structure

    index.html   # Game shell and UI
    style.css    # Responsive visual system
    script.js    # Game state, animation, physics and collision logic
    *.png        # Character sprite frames and background assets
    *.gif        # Obstacle animation
    *.mp3        # Game audio

## Run Locally

No build step is required.

Open index.html in a modern browser, or serve the directory through a local static server for a production-like browser environment.

## Engineering Focus

This project demonstrates how a small game can be structured around explicit state transitions:

**Idle → Running → Jumping → Running → Game Over → Restart**

It also uses browser storage to preserve the best score between sessions.

## Project Status

**Completed portfolio mini-project.**

The core gameplay loop, responsive UI, scoring, persistence, controls and restart experience are implemented.

## Author

**Chanul Dewdisa**

[GitHub](https://github.com/DewdisaC) • [Portfolio](https://chanul-portfolio-2027.vercel.app/)
