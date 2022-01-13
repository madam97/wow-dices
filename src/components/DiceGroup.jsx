import Dice from "./Dice";

const DiceGroup = ({ willShowCount, willGroupDices, dices, color, threat, toggleDice }) => {

  /**
   * Sort the dices by their values using descending order
   * @returns {Map}
   */
  const sortDiceValues = () => {
    const diceValues = new Map();
    for (let i = 0; i < dices.count; ++i) {
      diceValues.set(i, dices.values[i]);
    }

    return new Map([...diceValues.entries()].sort((a, b) => b[1] - a[1]));
  }

  const diceElements = [];

  // Show rolled dices values groupped and their count
  if (willGroupDices)
  {
    const diceValuesSorted = sortDiceValues(true);

    const counts = new Map();
    for (const [key, value] of diceValuesSorted.entries()) {
      counts.set(value, counts.has(value) ? counts.get(value) + 1 : 1);
    }

    for (const [value, count] of counts.entries()) {
      diceElements.push((
        <Dice 
          key={value} 
          value={value} 
          color={color} 
          count={count}
        />
      ));
    }
  }
  // Show rolled dices
  else if (!willShowCount)
  {
    const diceValuesSorted = sortDiceValues();

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

  // Show empty dice with count of dices of the given color
  if (diceElements.length === 0) {
    diceElements.push((
      <Dice 
        key="no-dices" 
        color={color}
        count={dices.count} 
      />
    ));
  }

  return (
    <div className="row-inner">
      {diceElements}
    </div>
  )
}

DiceGroup.defaultProps = {
  willShowCount: false,
  willGroupDices: false
};

export default DiceGroup;
