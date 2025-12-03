import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { questions, rewardList } from "./data/questions";

export default function App() {
  const [index, setIndex] = useState(0);
  const [balance, setBalance] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [wonAmount, setWonAmount] = useState(0);
  const [lifelines, setLifelines] = useState({ fiftyUsed: false, hintUsed: false });
const [shuffledQuestions, setShuffledQuestions] = useState(shuffleArray(questions));
  const q = shuffledQuestions[index];
  

  function handleAnswer(selected) {
    if (selected === q.answerIndex) {
      // correct
      const reward = rewardList[Math.min(index, rewardList.length - 1)];
      const newBalance = balance + reward;
      setBalance(newBalance);
      setIndex(prev => {
        const next = prev + 1;
        if (next >= questions.length) {
          setGameOver(true);
          setWonAmount(newBalance);
          return prev; // stay
        }
        return next;
      });
    } else {
      // wrong -> game over, show correct answer and final rupees (we keep balance)
      setGameOver(true);
      setWonAmount(balance);
    }
  }

  function resetGame() {
    setShuffledQuestions(shuffleArray(questions));
    setIndex(0);
    setBalance(0);
    setGameOver(false);
    setWonAmount(0);
    setLifelines({ fiftyUsed: false, hintUsed: false });
  
  }
  function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

  function useLifeline50() {
    setLifelines(prev => ({ ...prev, fiftyUsed: true }));
    return true;
  }
  function useHint() {
    setLifelines(prev => ({ ...prev, hintUsed: true }));
    return true;
  }
  
  function useLifeline50() {
    setLifelines(prev => ({ ...prev, fiftyUsed: true }));
    return true; // Returns true, but the primary job is updating state
  }


  return (
    <div className="app">
      <header>
        <h1>Hinglo — Translate & Earn (₹)</h1>
        <div className="status">
          <div>Question: {index + 1}/{questions.length}</div>
          <div>Balance: ₹{balance}</div>
           <div className="app"></div>
        </div>
      </header>
     
 

      {!gameOver ? (
        <QuestionCard
          q={q}
          onAnswer={handleAnswer}
          lifelines={lifelines}
          useLifeline50={useLifeline50}
          useHint={useHint}
        />
      ) : (
        <div className="gameover">
          <h2>Game Over</h2>
          <p>You won: <strong>₹{wonAmount}</strong></p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}

      <aside className="rewards">
        <h3>Reward Ladder</h3>
        <ol>
          {rewardList.map((r, i) => (
            <li key={i} className={i === index ? "active" : ""}>
              Q{i+1} — ₹{r}
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
