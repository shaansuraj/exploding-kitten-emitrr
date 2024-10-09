# Exploding Kitten - Frontend

This is the assignment that I built for Emitrr Recruitment 

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Installation & Running](#installation-and-running)
5. [Folder Structure](#folder-structure)
6. [Screenshots](#screenshots)


---

## Project Overview

**Exploding Kitten** is an online single-player card game where users can play with a deck of cards and try to avoid drawing the "Exploding Kitten" card 💣. The game is built using React and Redux for the frontend. It integrates with a Redis-based backend using Golang, allowing users to create accounts, track scores, and view leaderboards. The game has real-time features, including saving user progress and real-time leaderboard updates.

## Features

- **Single-player game mechanics**: Draw cards, avoid the Exploding Kitten card, and use the Defuse and Shuffle cards strategically.
- **Authentication**: Users can create an account and log in to track their progress and scores.
- **Leaderboard**: View the top players and their scores.
- **Real-time updates**: Live leaderboard updates when multiple users are playing.
- **Game Save/Resume**: The user's progress is automatically saved, allowing them to resume the game at any point.

## Technologies Used

- **Frontend**: React, Redux, Vite
- **State Management**: Redux
- **Styling**: Custom CSS
- **Backend**: [Exploding Kitten Backend](https://github.com/shaansuraj/exploding-kitten-server) (NodeJS with Redis)

## Getting Started

### Prerequisites

To run this project locally, you will need to know:

- Node.js (>=14.x)
- npm (or yarn)
- Redis Insight

### Installation and Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/exploding-kitten.git 
   

2. **Install dependencies: Using npm or yarn:**:
    ```bash
    npm install
    yarn install 
    

3. **Build the frontend**:
    ```bash
    vite build
    

4. **Preview**:
    ```bash
    vite preview
    

## Folder Structure

```
📁client
├── 📁public
│   └── vite.svg
├── 📁src
│   ├── 📁assets
│   │   └── react.svg
│   ├── 📁components
│   │   ├── authStyle.css
│   │   ├── componentsStyle.css
│   │   ├── Highscore.css
│   │   ├── Highscore.jsx
│   │   ├── Login.jsx
│   │   ├── loginstyle.css
│   │   ├── Navbar.css
│   │   ├── Navbar.jsx
│   │   ├── notificationStyle.css
│   │   ├── notificationStyle.jsx
│   │   ├── Signup.jsx
│   │   └── signupstyle.css
│   ├── 📁redux
│   │   ├── 📁slices
│   │   │   └── userSlice.js
│   │   └── store.js
│   ├── App.css
│   ├── App.jsx
│   ├── Board.css
│   ├── Board.jsx
│   ├── index.css
│   └── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

## Screenshots
![Exploding Kitten](./src/assets/main.jpg) 
![Exploding Kitten](./src/assets/rules.jpg) 
![Exploding Kitten](./src/assets/login.jpg) 
![Exploding Kitten](./src/assets/signup.jpg)