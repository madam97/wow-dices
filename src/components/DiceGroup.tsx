import Dice from './Dice';

type DiceGroupProps = {
  willShowCount?: boolean, 
  willGroupDices?: boolean, 
  dices: TDicesOfColor, 
  color: TColor, 
  threat: number, 
  toggleDice(color: string, ind: number): void
};

const DiceGroup = ({ 
  willShowCount = false,
  willGroupDices = false,
  dices, 
  color, 
  threat, 
  toggleDice 
}: DiceGroupProps): JSX.Element => {

  /**
   * Sort the dices by their values using descending order
   * @returns {Map}
   */
  const sortDiceValues = (): Map<number, number> => {
    const diceValues = new Map();
    for (let i = 0; i < dices.count; ++i) {
      diceValues.set(i, dices.values[i]);
    }

    return new Map([...diceValues.entries()].sort((a, b) => b[1] - a[1]));
  }

  const diceElements: Array<JSX.Element> = [];

  // Show rolled dices values groupped and their count
  if (willGroupDices)
  {
    const diceValuesSorted = sortDiceValues();

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
          toggleDice={toggleDice}
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
        toggleDice={toggleDice}
      />
    ));
  }

  return (
    <div className="row-inner">
      {diceElements}
    </div>
  )
}

export default DiceGroup;
