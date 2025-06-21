"use client";
import { useState } from "react";
import React from "react";
import Game from "../Game/Game";

const Home = () => {
  const [start, setStart] = useState(false);
  return start ? (
    <Game onBack={() => setStart(false)} />
  ) : (
    <div className="landing">
      <h1>Welcome to Pixel-Duel</h1>
      <p>Draw a magical symbol. Reach 10 points to win!</p>
      <button className="button" onClick={() => setStart(true)}>
        Start Game
      </button>
    </div>
  );
};

export default Home;
