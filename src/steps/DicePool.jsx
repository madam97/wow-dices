import { useState } from 'react';
import DiceGroup from '../components/DiceGroup';

export default function DicePool({ threat, dices, stepAction, addDice, removeDice, toggleDice }) {

  const [selectedRow, setSelectedRow] = useState('');
  const [lastClientX, setLastClientX] = useState(0);

  const handleTouchStart = (clientX) => {
    setLastClientX(clientX);
  }

  const handleTouchMove = (clientX, color) => {
    let diff = clientX - lastClientX;

    if (Math.abs(diff) >= 30) {
      // Left swipe
      if (diff < 0) {
        removeDice(color);
      }
      // Right swipe
      else {
        addDice(color, 0);
      }
      
      setLastClientX(clientX);
    }

    setSelectedRow(color);
  }

  const handleTouchEnd = () => {
    setSelectedRow('');
  }

  return (
    <>
      {Object.keys(dices).map((color) => (
        <div 
          key={color} 
          className={`row ${selectedRow === color ? 'row-selected' : ''}`}
          onTouchStart={(e) => handleTouchStart(e.changedTouches[0].clientX)}
          onTouchMove={(e) => handleTouchMove(e.changedTouches[0].clientX, color)}
          onTouchEnd={() => handleTouchEnd()}
        >
          <button 
            className={`row-btn ${dices[color].count === 0 ? 'hidden' : ''}`}
            onClick={() => removeDice(color)}
          >-</button>
          
          <DiceGroup willShowCount={true} dices={dices[color]} color={color} threat={threat} toggleDice={toggleDice} />

          <button 
            className={`row-btn ${dices[color].count === 10 ? 'hidden' : ''}`}
            onClick={() => addDice(color, 0)}
          >+</button>
        </div>
      ))}

      <div className="row row-centered">
        <button className="btn" onClick={stepAction}>For the Alliance!</button>
      </div>
    </>
  )
}
