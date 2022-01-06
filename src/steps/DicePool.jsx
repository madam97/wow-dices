import DiceGroup from '../components/DiceGroup';

export default function DicePool({ threat, dices, addDice, removeDice, stepAction }) {
  return (
    <div className="step">
      <div className="row row-centered">
        <p className="heading heading-threat">Threat {threat}</p>
      </div>

      {Object.keys(dices).map((color) => (
        <div key={color} className="row">
          <button className="row-btn" onClick={() => removeDice(color)}>-</button>
          
          <DiceGroup willShowCount={true} dices={dices[color]} color={color} />

          <button className="row-btn" onClick={() => addDice(color, 0)}>+</button>
        </div>
      ))}

      <div className="row row-centered">
        <button className="btn-roll" onClick={stepAction}>For the Alliance!</button>
      </div>
    </div>
  )
}
