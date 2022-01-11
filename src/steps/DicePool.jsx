import DiceGroup from '../components/DiceGroup';
import Header from '../components/Header';

export default function DicePool({ threat, reroll, dices, stepAction, setThreat, setReroll, addDice, removeDice, toggleDice }) {
  return (
    <div className="step">
      <Header threat={threat} reroll={reroll} setThreat={setThreat} setReroll={setReroll} />

      {Object.keys(dices).map((color) => (
        <div key={color} className="row">
          <button className="row-btn" onClick={() => removeDice(color)}>-</button>
          
          <DiceGroup willShowCount={true} dices={dices[color]} color={color} threat={threat} toggleDice={toggleDice} />

          <button className="row-btn" onClick={() => addDice(color, 0)}>+</button>
        </div>
      ))}

      <div className="row row-centered">
        <button className="btn btn-lg" onClick={stepAction}>For the Alliance!</button>
      </div>
    </div>
  )
}
