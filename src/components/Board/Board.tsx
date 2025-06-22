"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Questions from "./Questions";
import cards from "../Game/Card";
type Card = (typeof cards)[number];

function shuffleArray<T>(arr: T[]): T[] {
  return arr.sort(() => Math.random() - 0.5);
}

const Board = forwardRef(function Board(
  {
    onCorrect,
    onWrong,
    deck,
    removeCard,
    setAlertMessage,
    onAllQuestionsDone,
  }: any,
  ref
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const shuffledQuestions = useState(() =>
    shuffleArray(Questions).slice(0, 36)
  )[0];
  const current = shuffledQuestions[currentIndex] ?? null;

  const [shuffledOptions, setShuffledOptions] = useState<string[]>(
    current?.options || []
  );

  useEffect(() => {
    if (!current) {
      // Positive end of the game (aka: finished all the tiles)
      setShowQuestion(false);
      setShuffledOptions([]); // clear options safely
      setTimeout(() => {
        setAlertMessage("✅ All questions answered!");
      }, 200); // --- slight delay to avoid race conditions
      return;
    }

    setShuffledOptions(current.options.sort(() => 0.5 - Math.random()));
    setShowQuestion(true);
  }, [currentIndex]);

  useImperativeHandle(ref, () => ({
    triggerHint: () => useHint(),
    triggerReveal: () => useReveal(),
    triggerSkip: () => useSkip(),
  }));

  const next = () => {
    setUsedHint(false);
    setCurrentIndex((i) => i + 1);
  };

  const useHint = () => {
    new Audio("sounds/won-boost.mp3").play();
    removeCard("hint");
    const wrongOptions = shuffledOptions.filter(
      (opt) => opt !== current.answer
    );
    const toDisable = wrongOptions[0];
    setShuffledOptions((opts) => opts.map((o) => (o === toDisable ? "" : o)));
    setUsedHint(true);
    setAlertMessage(`🌙 One wrong option was removed!`);
  };

  const useReveal = () => {
    new Audio("/sounds/retro-notif.mp3").play();
    removeCard("reveal");
    setAlertMessage(`💡 The answer was: ${current.answer}`);
    next();
  };

  const useSkip = () => {
    new Audio("/sounds/fire.mp3").play();
    removeCard("skip");
    setAlertMessage(`🔥 You skipped the question!`);
    next();
  };

  const answerQuestion = (opt: string) => {
    if (opt === current.answer) {
      new Audio("/sounds/won-diamond.mp3").play();
      onCorrect();
    } else {
      new Audio("/sounds/lost.mp3").play();
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
      {showQuestion && current && (
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
        </div>
      )}
    </div>
  );
});

export default Board;
