import React, { useState, useEffect } from "react";

export default function QuestionCard({
  q,
  onAnswer,
  lifelines,
  useLifeline50,
  useHint
}) {
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [showHintWord, setShowHintWord] = useState(false);

  useEffect(() => {
    setDisabledOptions([]);
    setShowHintWord(false);
  }, [q]);

  function handle50() {
    console.log("50-50 clicked", { 
      fiftyUsed: lifelines.fiftyUsed,
      useLifeline50: !!useLifeline50 
    });
    
    if (lifelines.fiftyUsed) {
      console.log("Lifeline already used, returning");
      return;
    }
    
    console.log("Using 50-50 lifeline");
    
    if (useLifeline50) {
      useLifeline50();
    }
   
    const correct = q.answerIndex;
    const wrongIndexes = q.options.map((_, i) => i).filter(i => i !== correct);
    
    const shuffled = [...wrongIndexes].sort(() => 0.5 - Math.random());
    const toDisable = shuffled.slice(0, 2);
    
    console.log("Correct index:", correct);
    console.log("Wrong indexes:", wrongIndexes);
    console.log("Disabling options:", toDisable);
    
    setDisabledOptions(toDisable);
  }

  function handleHint() {
    if (lifelines.hintUsed) return;
    
    if (useHint) {
      useHint();
    }
    
    setShowHintWord(true);
  }

  return (
    <div className="card">
      <h2 className="hindi">{q.hindi}</h2>

      {showHintWord && (
        <div className="hint">Hint (first word): {q.options[q.answerIndex].split(" ")[0]}</div>
      )}

      <div className="options">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            className="opt"
            onClick={() => onAnswer(idx)}
            disabled={disabledOptions.includes(idx)}
          >
            {String.fromCharCode(65 + idx)}. {opt}
            {disabledOptions.includes(idx) && " (disabled)"}
          </button>
        ))}
      </div>

      <div className="lifelines">
        <button 
          onClick={handle50} 
          disabled={lifelines.fiftyUsed}
          style={{ 
            backgroundColor: lifelines.fiftyUsed ? '#ccc' : '#4CAF50',
            color: lifelines.fiftyUsed ? '#666' : 'white'
          }}
        >
          50-50 {lifelines.fiftyUsed ? '(Used)' : ''}
        </button>
        <button 
          onClick={handleHint} 
          disabled={lifelines.hintUsed}
          style={{ 
            backgroundColor: lifelines.hintUsed ? '#ccc' : '#2196F3',
            color: lifelines.hintUsed ? '#666' : 'white'
          }}
        >
          Hint {lifelines.hintUsed ? '(Used)' : ''}
        </button>
      </div>

      {/* Debug info */}
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <div>Disabled options: {disabledOptions.join(', ')}</div>
        <div>50-50 Used: {lifelines.fiftyUsed ? 'Yes' : 'No'}</div>
        <div>Hint Used: {lifelines.hintUsed ? 'Yes' : 'No'}</div>
      </div> 
      
      {/* Footer */}
    <div style={{ marginTop: '30px', textAlign: 'center', color: '#777' }}>
      &copy; 2025 MS Corporation — All Rights Reserved.
    </div>

    </div>



  );
}