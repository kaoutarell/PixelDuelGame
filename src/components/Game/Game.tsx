"use client";
import { useEffect, useState } from "react";
import { Board } from "../Board/Board";
import cards from "./Card";

export default function Game({
  onBack,
  playerName,
}: {
  onBack: () => void;
  playerName: string;
}) {
  const [deck, setDeck] = useState(cards);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [badgeEarned, setBadgeEarned] = useState(false);
  const [allCorrect, setAllCorrect] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const removeCard = (effect: string) => {
    setDeck((prev) => prev.filter((c) => c.effect !== effect));
  };

  const handleCorrectAnswer = () => {
    setScore((s) => s + 1);
  };

  const handleWrongAnswer = () => {
    setAllCorrect(false);
  };

  const endGame = () => {
    const totalScore =
      score + (deck.find((c) => c.effect === "final-score") ? 1 : 0);
    const win = totalScore >= 10;
    const msg = win ? "🎉 You won the game!" : "💀 You lost the game.";
    if (allCorrect) setBadgeEarned(true);
    setTimeout(() => {
      alert(
        `${msg}\nFinal Score: ${totalScore}${
          allCorrect ? "\n🏅 Badge Earned!" : ""
        }`
      );
    }, 100);
  };

  return (
    <div className="game board-theme">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>
      <h1>Pixel Duel</h1>
      <div className="top-bar">
        <div className="player-name">
          {playerName} 💎 {score}
        </div>
        <div className="timer">
          ⏱️ {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
        </div>
        <button className="button finish-button" onClick={endGame}>
          Finish
        </button>
      </div>
      {timeLeft <= 120 && <div className="alert">⏳ Only 2 minutes left!</div>}
      <div className="card-deck">
        {deck.map((card, i) => (
          <img
            key={i}
            src={card.img}
            alt={card.name}
            className="card-img pixel-border"
          />
        ))}
      </div>
      <Board
        onCorrect={handleCorrectAnswer}
        onWrong={handleWrongAnswer}
        deck={deck}
        removeCard={removeCard}
      />
      {badgeEarned && (
        <img
          src="/assets/badge.png"
          alt="Badge"
          className="badge animate-badge"
        />
      )}
    </div>
  );
}
