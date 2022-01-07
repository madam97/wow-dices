import DiceGroup from '../components/DiceGroup';
import RowThreat from '../components/RowThreat';

export default function Reroll({ threat, dices, addDice, removeDice }) {
  return (
    <div className="step">
      <RowThreat threat={threat} />

      {Object.keys(dices).map((color) => (
        <div key={color} className="row">
          <button className="row-btn" onClick={() => removeDice(color)}>-</button>

          <DiceGroup willShowCount={dices[color].count === 0} dices={dices[color]} color={color} />

          <button className="row-btn" onClick={() => addDice(color)}>+</button>
        </div>
      ))}

      <div className="row row-centered">
        <button className="btn btn-lg">Reroll</button>
      </div>
    </div>
  )
}
