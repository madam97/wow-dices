import DiceGroup from '../components/DiceGroup';
import RowThreat from '../components/RowThreat';

export default function DicePool({ threat, dices, addDice, setThreat, removeDice, stepAction }) {
  return (
    <div className="step">
      <RowThreat threat={threat} setThreat={setThreat} />

      {Object.keys(dices).map((color) => (
        <div key={color} className="row">
          <button className="row-btn" onClick={() => removeDice(color)}>-</button>
          
          <DiceGroup willShowCount={true} dices={dices[color]} color={color} />

          <button className="row-btn" onClick={() => addDice(color, 0)}>+</button>
        </div>
      ))}

      <div className="row row-centered">
        <button className="btn btn-lg" onClick={stepAction}>For the Alliance!</button>
      </div>
    </div>
  )
}
