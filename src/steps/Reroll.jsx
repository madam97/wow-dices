import DiceGroup from '../components/DiceGroup';
import Header from '../components/Header';

export default function Reroll({ threat, reroll, dices, stepAction, setThreat, setReroll, addDice, removeDice, toggleDice }) {
  return (
    <div className="step">
      <Header threat={threat} reroll={reroll} setThreat={setThreat} setReroll={setReroll} />

      {Object.keys(dices).map((color) => (
        <div key={color} className="row">
          <button className="row-btn" onClick={() => removeDice(color)}>-</button>

          <DiceGroup willShowCount={dices[color].count === 0} dices={dices[color]} color={color} threat={threat} toggleDice={toggleDice} />

          <button className="row-btn" onClick={() => addDice(color)}>+</button>
        </div>
      ))}

      <div className="row row-centered">
        {reroll > 0 && <button className="btn btn-lg" onClick={() => stepAction()}>Reroll</button>}
        {reroll === 0 && <button className="btn btn-lg" onClick={() => stepAction(true)}>End</button>}
      </div>
    </div>
  )
}
