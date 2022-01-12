import DiceGroup from '../components/DiceGroup';

export default function Reroll({ threat, reroll, dices, stepAction, addDice, removeDice, toggleDice }) {
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
        {reroll > 0 && <button className="btn" onClick={() => stepAction()}>Reroll</button>}
        <button className="btn" onClick={() => stepAction(true)}>End</button>
      </div>
    </>
  )
}
