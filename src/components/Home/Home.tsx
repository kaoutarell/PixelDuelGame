"use client";
import { useState } from "react";
import Game from "../Game/Game";
import Rules from "./Rules";
import Alert from "../Alert/Alert";

export default function Home() {
  const [start, setStart] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const openRules = () => {
    new Audio("/sounds/retro-notif.mp3").play();
    setShowRules(true);
  };

  return start ? (
    <Game onBack={() => setStart(false)} playerName={playerName} />
  ) : (
    <>
      <div className="landing-wrapper">
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
              if (playerName.trim()) {
                const audio = new Audio("/sounds/game-start.mp3");
                audio.play();
                setStart(true);
              } else {
                setAlertMessage("Please enter your name to start the game");
                new Audio("/sounds/retro-notif.mp3").play(); // optional sound on alert
              }
            }}
          >
            Start Game
          </button>
        </div>

        <div className="rules-button-container">
          <button className="button rules-button" onClick={openRules}>
            📜 How the Game Works
          </button>
        </div>
      </div>

      {showRules && <Rules onClose={() => setShowRules(false)} />}
      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage("")} />
      )}
    </>
  );
}
