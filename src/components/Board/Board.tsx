"use client";
import React from "react";
import { useState, useEffect } from "react";
import Questions from "./Questions";
import cards from "../Game/Card";
type Card = (typeof cards)[number];

function shuffleArray<T>(arr: T[]): T[] {
  //T for any type | Generic type
  return arr.sort(() => Math.random() - 0.5);
}

export const Board = ({ onCorrect, onWrong, deck, removeCard }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const shuffledQuestions = useState(() =>
    shuffleArray(Questions).slice(0, 36)
  )[0];
  const current = shuffledQuestions[currentIndex];
  const [shuffledOptions, setShuffledOptions] = useState(current.options);

  useEffect(() => {
    setShuffledOptions(current.options.sort(() => 0.5 - Math.random()));
    setShowQuestion(true);
  }, [currentIndex]);

  const next = () => {
    setUsedHint(false);
    setCurrentIndex((i) => i + 1);
  };

  const useHint = () => {
    const sound = new Audio("sounds/won-boost.mp3");
    sound.play();
    removeCard("hint"); //there's no hint card .. --> moon card?
    const wrongOptions = shuffledOptions.filter(
      (opt) => opt !== current.answer
    );
    const toDisable = wrongOptions[0];
    setShuffledOptions((opts) => opts.map((o) => (o === toDisable ? "" : o)));
    setUsedHint(true);
  };

  const useReveal = () => {
    const sound = new Audio("/sounds/retro-notif.mp3");
    sound.play();
    removeCard("reveal"); //heart card
    alert(`Answer: ${current.answer}`);
    next();
  };

  const useSkip = () => {
    const sound = new Audio("/sounds/fire.mp3");
    sound.play();
    removeCard("skip"); //fire card
    next();
  };

  const answerQuestion = (opt: string) => {
    if (opt === current.answer) {
      const sound = new Audio("/sounds/won-diamond.mp3");
      sound.play();
      onCorrect();
    } else {
      const sound = new Audio("/sounds/lost.mp3");
      sound.play();
      onWrong();
    }
    next();
  };

  return (
    <div className="board">
      <div className="grid">
        {[...Array(36)].map((_, idx) => (
          <div
            key={idx}
            className={`cell ${idx === currentIndex ? "active" : ""}`}
            style={{
              backgroundImage: `url(/assets/tiles/${shuffledQuestions[idx]?.type}.png)`,
            }}
          />
        ))}
      </div>
      {showQuestion && (
        <div className="question-popup">
          <h3>{current.question}</h3>
          <div className="options">
            {shuffledOptions.map(
              (opt, i) =>
                opt !== "" && (
                  <button key={i} onClick={() => answerQuestion(opt)}>
                    {opt}
                  </button>
                )
            )}
          </div>
          <div className="tools">
            {deck.find((c: Card) => c.effect === "hint") && !usedHint && (
              <button onClick={useHint}>Use Moon</button>
            )}
            {deck.find((c: Card) => c.effect === "reveal") && (
              <button onClick={useReveal}>Use Heart</button>
            )}
            {deck.find((c: Card) => c.effect === "skip") && (
              <button onClick={useSkip}>Use Fire</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
