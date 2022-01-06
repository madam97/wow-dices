import DiceGroup from '../components/DiceGroup';

export default function Reroll({ threat, dices, addDice, removeDice }) {
  return (
    <div className="step">
      <div className="row row-centered">
        <p className="heading heading-threat">Threat {threat}</p>
      </div>

      {Object.keys(dices).map((color) => (
        <div key={color} className="row">
          <button className="row-btn" onClick={() => removeDice(color)}>-</button>

          <DiceGroup willShowCount={dices[color].count === 0} dices={dices[color]} color={color} />

          <button className="row-btn" onClick={() => addDice(color)}>+</button>
        </div>
      ))}

      <div className="row row-centered">
        <button className="btn-roll">Reroll</button>
      </div>
    </div>
  )
}
