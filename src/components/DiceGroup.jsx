import Dice from "./Dice";

export default function DiceGroup({ willShowCount, dices, color, threat, toggleDice }) {

  const diceElements = [];

  if (!willShowCount) {
    const diceValues = new Map();
    for (let i = 0; i < dices.count; ++i) {
      diceValues.set(i, dices.values[i]);
    }

    const diceValuesSorted = new Map([...diceValues.entries()].sort((a, b) => b[1] - a[1]));

    for (const [key, value] of diceValuesSorted.entries()) {
      diceElements.push((
        <Dice 
          key={key} 
          index={key} 
          value={value} 
          color={color} 
          threat={threat}
          selectedDices={dices.selected}
          rerolledDices={dices.rerolled}
          toggleDice={toggleDice}
        />
      ));
    }
  }

  return (
    <>
      {willShowCount && 
        <div className="row-inner">
          <p className="heading heading-dice-count">{dices.count}</p>
          <Dice key="no-dices" color={color} />
        </div>
      }

      {!willShowCount &&
        <div className="row-inner">
          {diceElements}
        </div>
      }
    </>
  )
}
