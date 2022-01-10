import { useState } from 'react';
import DiceGroup from '../components/DiceGroup';
import Threat from '../components/Threat';
import PopupNumber from '../components/PopupNumber';

export default function Reroll({ threat, reroll, dices, stepAction, setThreat, setReroll, addDice, removeDice, toggleDice }) {
  
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="step">
      <Threat threat={threat} setThreat={setThreat} />

      {Object.keys(dices).map((color) => (
        <div key={color} className="row">
          <button className="row-btn" onClick={() => removeDice(color)}>-</button>

          <DiceGroup willShowCount={dices[color].count === 0} dices={dices[color]} color={color} threat={threat} toggleDice={toggleDice} />

          <button className="row-btn" onClick={() => addDice(color)}>+</button>
        </div>
      ))}

      <div className="row row-centered">
        <button className="heading heading-value" onClick={() => setShowPopup(true)}>Reroll {reroll}</button>
        {showPopup && <PopupNumber value={reroll} max="30" setValue={setReroll} setShowPopup={setShowPopup} />}

        {reroll > 0 && <button className="btn btn-lg" onClick={() => stepAction()}>Reroll</button>}
        {reroll === 0 && <button className="btn btn-lg" onClick={() => stepAction(true)}>End</button>}
      </div>
    </div>
  )
}
