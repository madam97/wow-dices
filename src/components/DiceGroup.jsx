import Dice from "./Dice";

export default function DiceGroup({ willShowCount, dices, color }) {

  const diceElements = [];

  if (!willShowCount) {
    const diceValues = new Map();
    for (let i = 0; i < dices.count; ++i) {
      diceValues.set('d'+i, dices.values[i]);
    }

    const diceValuesSorted = new Map([...diceValues.entries()].sort((a, b) => b[1] - a[1]));

    for (const [key, value] of diceValuesSorted.entries()) {
      diceElements.push((
        <Dice key={key} value={value} color={color} />
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
