"use client";
import { useEffect, useState, useRef } from "react";
import Board from "../Board/Board";
import cards from "./Card";
import Alert from "../Alert/Alert";

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
  const [alertMessage, setAlertMessage] = useState("");
  const boardRef = useRef<any>(null);
  //fix the game over issue ==> the UI don't ACTUALLY end the party .. it just shows the alert
  const [gameOver, setGameOver] = useState(false);

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
    const hasUsedFinalScoreCard = !deck.find((c) => c.effect === "final-score");
    const totalScore = score + (hasUsedFinalScoreCard ? 1 : 0);
    const win = totalScore >= 10;
    const msg = win ? "🎉 You won the game!" : "💀 You lost the game.";
    if (!win) {
      //loss sound effect
      new Audio("sounds/lost.mp3").play();
    }
    if (allCorrect && score === 36) setBadgeEarned(true);
    setTimeout(() => {
      setAlertMessage(
        `${msg}\n Final Score: ${totalScore}${
          allCorrect && score === 36 ? "\n🏅 Badge Earned!" : ""
        }`
      );
      setGameOver(true); // trigger navigation after alert closes !!!
    }, 100);
  };

  const useHint = () => {
    boardRef.current?.triggerHint();
  };

  const useReveal = () => {
    boardRef.current?.triggerReveal();
  };

  const useSkip = () => {
    boardRef.current?.triggerSkip();
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
            onClick={() => {
              if (card.effect === "reveal") useReveal();
              else if (card.effect === "skip") useSkip();
              else if (card.effect === "hint") useHint();
              else console.warn("No handler for card effect:", card.effect);
            }}
          />
        ))}
      </div>
      <Board
        ref={boardRef}
        onCorrect={handleCorrectAnswer}
        onWrong={handleWrongAnswer}
        deck={deck}
        removeCard={removeCard}
        setAlertMessage={setAlertMessage}
      />
      {alertMessage && (
        <Alert
          message={alertMessage}
          onClose={() => {
            setAlertMessage("");
            if (gameOver) {
              onBack(); // Go back to landing page !!!
            }
          }}
        />
      )}
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
