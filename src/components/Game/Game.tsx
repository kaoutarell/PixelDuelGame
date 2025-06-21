"use client";

import { img } from "framer-motion/client";
import React, { useState } from "react";

const cards = [
  { name: "heart", img: "/assets/cards/heart.png", effect: "life" },
  { name: "fire", img: "/assets/cards/fire.png", effect: "boost" },
  { name: "diamond", img: "/assets/cards/diamond.png", effect: "point" },
  { name: "moon", img: "/assets/cards/moon.png", effect: "retry" },
];
export default function Game({ onBack }: { onBack: () => void }) {
  const [playerCard, setPlayerCard] = useState<{
    name: string;
    img: string;
    effect: string;
  } | null>(null); // either null or a drawn card
  const [score, setScore] = useState(0); // default = no score
  const [lives, setLives] = useState(3); //default = 3 lives
  const [message, setMessage] = useState("");

  //draw a card
  const drawCard = () => {
    const audio = new Audio("/sound/click.mp3");
    audio.play();

    const card = cards[Math.floor(Math.random() * cards.length)]; // draw a random card and assign it to the player to
    setPlayerCard(card);

    switch (card.effect) {
      case "life":
        setLives((l) => l + 1);
        setMessage("💖 Extra Life");
        break;
      case "boost":
        setScore((s) => s + 5);
        setMessage("🔥 +5");
        break;
      case "point":
        setScore((s) => s + 1);
        setMessage("💎 +1");
        break;
      case "retry":
        setLives((l) => l);
        setMessage("🌙 Retry granted!");
        break;
    }
  };

  const loseLife = () => {
    setLives((l) => l - 1);
    setMessage("💔 You skipped a turn and lost a life!");
  };

  return (
    <div className="game">
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      <h1>Pixel Duel</h1>
      <div className="card-row">
        {playerCard && (
          <img
            src={playerCard.img}
            alt={playerCard.name}
            className="card-img"
          />
        )}
      </div>
      <button className="button" onClick={drawCard}>
        Draw Card
      </button>
      <p>{message}</p>
      <p>Score : {lives}</p>
      {score >= 10 && <p className="win">YEEEEEY!</p>}
      {score >= 0 && <p className="lose">Game Over</p>}
    </div>
  );
}
