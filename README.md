# 🎮 Pixel Duel

![Next.js](https://img.shields.io/badge/Next.js-13.4-blue?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)
![Platform](https://img.shields.io/badge/Platform-Web-222?logo=web)

**Pixel Duel** is a retro-inspired digital board game built using **React (Next.js)**. The user is prompted to answer pixel-art-themed questions, using card-based bonuses to strategically enhance gameplay.

---

## 🛠️ Tech Stack

- ![Next.js](https://img.shields.io/badge/Next.js-13.4-blue?logo=next.js) **Next.js**
- ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) **React**
- ![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript) **TypeScript**
- 🎨 CSS Modules & pixel-style design
- 🖼️ Static assets (sprites, tiles, and sound effects)

---

## 🚀 Gameplay Overview

### 🎯 Objective

Answer 36 questions correctly within the 20-minute time limit. Use bonus cards wisely to skip, reveal, or narrow down answers. Earn a badge for a perfect game (0 mistakes)!

### 🧠 How It Works

1. **Start the Game:** Enter your name and begin the game.
2. **Answer Questions:** Each tile on the board represents a question.
3. **Score Points:** Correct answers earn points. Total possible score: 36 (+1 bonus if "Final Score" card is used).
4. **Use Cards:**
   - 🔥 Fire → Skip a question
   - 💡 Heart → Reveal the correct answer
   - 🌙 Moon → Remove one wrong answer
   - 💎 Diamond → Adds +1 bonus to your final score _(if used before ending)_
5. **Finish the Game:** Either let the timer run out or click **Finish** to end early.
6. **Game Over Alert:** See your result, score, and badge (if earned), then return to the landing screen.

---

## 🃏 Bonus Card System

Cards can be used by clicking on them. Each card can **only** be used once.

| Card Name | Icon | Effect                         |
| --------- | ---- | ------------------------------ |
| Heart     | 💡   | Reveals the correct answer     |
| Fire      | 🔥   | Skips the current question     |
| Moon      | 🌙   | Removes one wrong answer       |
| Diamond   | 💎   | Adds +1 to final score if used |

> Cards disappear from the deck once used.

---

## 🏆 Badge System

- Earn a 🏅 **Perfect Badge** if you answer all 36 questions correctly **without using a wrong answer**.
- The badge is shown on the results screen.

---

## 🧩 Components Breakdown

### `Game.tsx`

- Core game logic
- Handles timer, score, card usage, and game over
- Triggers the `Board` via `ref`

### `Board.tsx`

- Manages current question, shuffles answers
- Exposes `triggerHint`, `triggerReveal`, `triggerSkip` to parent
- Tracks card effects visually and logically

### `Alert.tsx`

- Popup component (customized alert to replace the **UGLY** browser alert)
- Used for final score messages or alerts (like time warnings)

## 🧪 Development Notes

- Audio effects are triggered on correct/wrong answers and card usage.
- Board tracks current progress with an active tile and grid.
- Game logic prevents multiple uses of a single card.
- Final score includes conditional logic for using the "final-score" card (very optional).
- Game returns to the landing page after result alert is dismissed.

## How to Run Locally ?

```
git clone https://github.com/your-username/pixel-duel.git
cd pixel-duel
npm install
npm run dev
```

## 📜 License

**All rights reserved ©**

This project is the intellectual property of [Your Name].
You may not copy, redistribute, modify, or use any part of this code, assets, or game mechanics without explicit written permission.

This repository is provided for personal archival and demonstration purposes only.
