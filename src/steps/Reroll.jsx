import { useEffect, useState } from 'react';
import DiceGroup from '../components/DiceGroup';

export default function Reroll({ threat, reroll, dices, stepAction, addDice, removeDice, toggleDice }) {

  const [canReroll, setCanReroll] = useState(true);

  useEffect(() => {
    // Reroll btn is hidden if all of the dices are rerolled
    if (reroll > 0) {
      let countOfDices = 0;
      let countOfRerolledDices = 0;

      for (const color in dices) {
        countOfDices += dices[color].count;
        countOfRerolledDices += dices[color].rerolled.length;
      }

      setCanReroll(countOfRerolledDices < countOfDices);
    }
    // Reroll btn is hidden, because there are no more rerolls
    else {
      setCanReroll(false);
    }
  }, [reroll, dices]);

  return (
    <>
      {Object.keys(dices).map((color) => (
        <div key={color} className="row">
          <button 
            className={`row-btn ${dices[color].count === 0 ? 'hidden' : ''}`}
            onClick={() => removeDice(color)}
          >-</button>

          <DiceGroup willShowCount={dices[color].count === 0} dices={dices[color]} color={color} threat={threat} toggleDice={toggleDice} />

          <button
            className={`row-btn ${dices[color].count === 10 ? 'hidden' : ''}`}
            onClick={() => addDice(color)}
          >+</button>
        </div>
      ))}

      <div className="row row-centered">
        <button className="btn" onClick={() => stepAction(true)}>End</button>
        {canReroll && <button className="btn" onClick={() => stepAction()}>Reroll</button>}
      </div>
    </>
  )
}
