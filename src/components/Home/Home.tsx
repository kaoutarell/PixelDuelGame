"use client";
import { useState } from "react";
import React from "react";
import Game from "../Game/Game";

const Home = () => {
  const [start, setStart] = useState(false);
  const [playerName, setPlayerName] = useState("");

  return start ? (
    <Game onBack={() => setStart(false)} playerName={playerName} />
  ) : (
    <div className="landing">
      <h1>Welcome to Pixel-Duel</h1>
      <h3>Enter your name to begin</h3>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Your Name"
        className="input"
      />
      <button
        className="button"
        onClick={() => {
          if (playerName) {
            const audio = new Audio("/sounds/game-start.mp3");
            audio.play();
            setStart(true);
          }
        }}
      >
        Start Game
      </button>
    </div>
  );
};

export default Home;
