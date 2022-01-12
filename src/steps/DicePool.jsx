import { useEffect, useState } from 'react';
import DiceGroup from '../components/DiceGroup';

export default function DicePool({ character, threat, dices, stepAction, addDice, removeDice, toggleDice }) {

  const [selectedRow, setSelectedRow] = useState('');
  const [lastClientX, setLastClientX] = useState(0);
  const [btnText, setBtnText] = useState();

  useEffect(() => {
    const texts = {
      faction: {
        alliance: [
          'For the Alliance!',
        ],
        horde: [
          'For the Horde!',
        ]
      },
      class: {
        warrior: [],
        hunter: [],
        rogue: [],
        paladin: [
          'Light give me strength!',
          'Light give me hope!',
          'Justice will be served!'
        ],
        priest: [
          'By the power of the Light, burn!',
          'Begone, spawn of darkness!'
        ],
        mage: [],
        warlock: [],
        druid: [],
        shaman: []
      }
    };

    let text = '';
    let ind = Math.floor(Math.random() * (texts.class[character.class].length + texts.faction[character.faction].length));

    // Class text
    if (ind < texts.class[character.class].length) {
      text = texts.class[character.class][ind];
    }
    // Faction text
    else {
      text = texts.faction[character.faction][ind - texts.class[character.class].length];
    }

    console.log(texts.class[character.class].length,' + ',texts.faction[character.faction].length, ind, text);

    setBtnText(text);
  }, []);

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

      {dices.red.count + dices.blue.count + dices.green.count > 0 && 
        <div className="row row-centered">
          <button className="btn" onClick={stepAction}>{btnText}</button>
        </div>
      }
    </>
  )
}
