import { useEffect, useState } from 'react';
import DiceGroup from '../components/DiceGroup';
import { texts } from '../data/character.js';

export default function DicePool({ character, threat, dices, stepAction, addDice, removeDice, toggleDice }) {

  /** The selected row's color: blue, red or green */
  const [selectedRow, setSelectedRow] = useState('');

  /** The X coordinate of the last touch event */
  const [lastClientX, setLastClientX] = useState(0);

  /** The step's button text */
  const [btnText, setBtnText] = useState();

  useEffect(() => {
    /**
     * Returns the randomized dice pool step btn text
     * @returns {string}
     */
    const getBtnText = () => {
      let text = '';
      let ind = Math.floor(
        Math.random() * (
          texts.class[character.class].length + 
          texts.faction[character.faction].length + 
          texts.species[character.species].length
        )
      );

      // Class text
      if (ind < texts.class[character.class].length) {
        text = texts.class[character.class][ind];
      }
      // Faction text
      else if (ind - texts.class[character.class].length < texts.faction[character.faction].length) {
        text = texts.faction[character.faction][ ind - texts.class[character.class].length ];
      }
      // Species text
      else {
        text = texts.species[character.species][ ind - texts.class[character.class].length - texts.faction[character.faction].length ];
      }
  
      return text;
    }
  
    setBtnText(getBtnText());
  }, [character]);

  /**
   * Saves the X coord of the last touch event
   * @param {number} clientX 
   */
  const handleTouchStart = (clientX) => {
    setLastClientX(clientX);
  }

  /**
   * Adds or removes a dice based on the X coord of the last touch event
   * @param {number} clientX 
   * @param {color} color blue, red or green
   */
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

  /**
   * Removes the selected row's color after the touch event ends
   */
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

      {dices.red.count + dices.blue.count + dices.green.count > 0 && 
        <div className="row row-centered">
          <button className="btn" onClick={stepAction}>{btnText}</button>
        </div>
      }
    </>
  )
}
