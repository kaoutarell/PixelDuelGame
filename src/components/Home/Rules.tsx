"use client";
import React from "react";
import "./Rules.css";

export default function Rules({ onClose }: { onClose: () => void }) {
  return (
    <div className="rules-overlay fade-in">
      <div className="rules-modal pixel-border">
        <h2>📜 How the Game Works</h2>
        <ul>
          <li>🎯 You must answer 36 questions correctly on a 6x6 board.</li>
          <li>⏳ You have 20 minutes to finish the game.</li>
          <li>💎 Earn score for each correct answer.</li>
          <li>
            💡 Use bonus cards:
            <ul>
              <li>
                🔥 <strong>Fire</strong> — Skip the question
              </li>
              <li>
                ❤️ <strong>Heart</strong> — Reveal the answer
              </li>
              <li>
                🌙 <strong>Moon</strong> — Remove one wrong answer
              </li>
              <li>
                💎 <strong>Diamond</strong> — Bonus point at the end
              </li>
            </ul>
          </li>
          <li>🏅 Answer all correctly with no errors to earn a badge!</li>
        </ul>
        <button className="button" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
}
